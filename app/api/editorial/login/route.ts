import { NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/editorial-auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const password = typeof body.password === 'string' ? body.password : ''
    if (!email || !password || email.length > 254 || password.length > 128) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    const admin = await authenticateAdmin(email, password)
    if (!admin) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    return NextResponse.json({ ok: true, admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } })
  } catch {
    return NextResponse.json({ error: 'Editorial authentication is unavailable until DATABASE_URL is configured.' }, { status: 503 })
  }
}
