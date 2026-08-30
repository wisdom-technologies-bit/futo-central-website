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
  const categoryId = text(formData.get('categoryId'), 36) || null
  const authorId = text(formData.get('authorId'), 36) || null
  const image = text(formData.get('featuredImage'), 2000) || null
  const imageAlt = text(formData.get('featuredImageAlt'), 180) || null
  const seoTitle = text(formData.get('seoTitle'), 180) || null
  const metaDescription = text(formData.get('metaDescription'), 500) || null
  const readingTime = Math.max(1, Math.min(120, Number(formData.get('readingTime')) || 4))
  const isFeatured = formData.get('isFeatured') === 'on'
  const status = ['draft', 'published', 'scheduled'].includes(String(formData.get('status'))) ? String(formData.get('status')) : 'draft'
  const scheduledFor = text(formData.get('scheduledFor'), 40) || null
  if (!title || !excerpt || !content || (image && !imageAlt)) throw new Error('Title, excerpt, content and image alt text are required.')
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`
  const publishedAt = status === 'published' ? new Date().toISOString() : null
  await withDatabase((db) => db.query(`INSERT INTO articles (title, slug, excerpt, content, category_id, author_id, featured_image, featured_image_alt, status, published_at, scheduled_for, reading_time, seo_title, meta_description, is_featured) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`, [title, slug, excerpt, content, categoryId, authorId, image, imageAlt, status, publishedAt, scheduledFor, readingTime, seoTitle, metaDescription, isFeatured]))
  revalidatePath('/editorial/news')
  return { ok: true }
}

export async function deleteArticle(id: string) {
  await requireRole('super_admin')
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error('Invalid article id')
  await withDatabase((db) => db.query(`DELETE FROM articles WHERE id = $1`, [id]))
  revalidatePath('/editorial/news')
}
