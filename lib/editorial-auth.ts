import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHash, randomBytes } from 'node:crypto'
import argon2 from 'argon2'
import { getDatabase } from '@/lib/db'

export const SESSION_COOKIE = 'futo_editorial_session'
const SESSION_DAYS = 7
const hashToken = (token: string) => createHash('sha256').update(token).digest('hex')

export type AdminRole = 'admin' | 'super_admin'
export type CurrentAdmin = { id: string; email: string; name: string | null; role: AdminRole }

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  const pool = getDatabase()
  if (!token || !pool) return null
  const result = await pool.query<CurrentAdmin>(
    `SELECT a.id, a.email, a.name, a.role FROM sessions s JOIN admins a ON a.id = s.admin_id WHERE s.token_hash = $1 AND s.expires_at > now() AND a.is_active = true LIMIT 1`,
    [hashToken(token)],
  )
  return result.rows[0] ?? null
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/editorial/login?error=expired')
  return admin
}

export async function requireRole(role: AdminRole) {
  const admin = await requireAdmin()
  if (role === 'super_admin' && admin.role !== 'super_admin') throw new Error('FORBIDDEN')
  return admin
}

export async function authenticateAdmin(email: string, password: string) {
  const pool = getDatabase()
  if (!pool) return null
  const result = await pool.query<{ id: string; email: string; name: string | null; role: AdminRole; password_hash: string | null }>(
    `SELECT id, email, name, role, password_hash FROM admins WHERE lower(email) = lower($1) AND is_active = true LIMIT 1`, [email],
  )
  const admin = result.rows[0]
  if (!admin?.password_hash || !(await argon2.verify(admin.password_hash, password))) return null
  const token = randomBytes(32).toString('hex')
  await pool.query(`INSERT INTO sessions (admin_id, token_hash, expires_at) VALUES ($1, $2, now() + $3::interval)`, [admin.id, hashToken(token), `${SESSION_DAYS} days`])
  await pool.query(`UPDATE admins SET last_login_at = now(), updated_at = now() WHERE id = $1`, [admin.id])
  const jar = await cookies()
  jar.set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'development' ? 'none' : 'lax', path: '/', maxAge: SESSION_DAYS * 86400 })
  return { id: admin.id, email: admin.email, name: admin.name, role: admin.role }
}

export async function logoutAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  const pool = getDatabase()
  if (token && pool) await pool.query(`DELETE FROM sessions WHERE token_hash = $1`, [hashToken(token)])
  const jar = await cookies()
  jar.set(SESSION_COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 })
}

export async function verifyPasswordHash(password: string) { return argon2.hash(password) }
export { hashToken }
