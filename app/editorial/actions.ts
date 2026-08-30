'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin, requireRole, logoutAdmin } from '@/lib/editorial-auth'
import { withDatabase } from '@/lib/db'

const text = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : ''

export async function signOutEditorial() { await logoutAdmin(); revalidatePath('/editorial') }

export async function createDraft(formData: FormData) {
  const admin = await requireAdmin()
  const title = text(formData.get('title'), 180)
  const excerpt = text(formData.get('excerpt'), 500)
  const content = text(formData.get('content'), 100000)
  if (!title || !excerpt || !content) throw new Error('Title, excerpt and content are required.')
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`
  await withDatabase((db) => db.query(`INSERT INTO articles (title, slug, excerpt, content, status, author_id) VALUES ($1, $2, $3, $4, 'draft', NULL)`, [title, slug, excerpt, content]))
  revalidatePath('/editorial/news')
  return { ok: true }
}

export async function deleteArticle(id: string) {
  await requireRole('super_admin')
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error('Invalid article id')
  await withDatabase((db) => db.query(`DELETE FROM articles WHERE id = $1`, [id]))
  revalidatePath('/editorial/news')
}
