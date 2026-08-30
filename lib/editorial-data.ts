import { getDatabase } from '@/lib/db'

export type EditorialOverview = {
  articles: number
  published: number
  drafts: number
  submissions: number
  recentArticles: { id: string; title: string; status: string; created_at: string }[]
}

export async function getEditorialOverview(): Promise<EditorialOverview> {
  const db = getDatabase()
  if (!db) throw new Error('DATABASE_NOT_CONFIGURED')
  const [counts, recent] = await Promise.all([
    db.query<{ articles: string; published: string; drafts: string; submissions: string }>(`SELECT (SELECT count(*) FROM articles) AS articles, (SELECT count(*) FROM articles WHERE status = 'published') AS published, (SELECT count(*) FROM articles WHERE status = 'draft') AS drafts, (SELECT count(*) FROM story_submissions WHERE status IN ('pending','under_review')) AS submissions`),
    db.query<{ id: string; title: string; status: string; created_at: string }>(`SELECT id, title, status, created_at FROM articles ORDER BY created_at DESC LIMIT 5`),
  ])
  const row = counts.rows[0]
  return { articles: Number(row?.articles ?? 0), published: Number(row?.published ?? 0), drafts: Number(row?.drafts ?? 0), submissions: Number(row?.submissions ?? 0), recentArticles: recent.rows }
}

export async function getEditorialSection(section: string) {
  const db = getDatabase()
  if (!db) throw new Error('DATABASE_NOT_CONFIGURED')
  if (section === 'news') return (await db.query(`SELECT id, title, slug, status, created_at, published_at FROM articles ORDER BY created_at DESC LIMIT 50`)).rows
  if (section === 'categories') return (await db.query(`SELECT id, name, slug, description FROM categories ORDER BY name`)).rows
  if (section === 'events') return (await db.query(`SELECT id, title, category, starts_at, status, location FROM events ORDER BY starts_at DESC LIMIT 50`)).rows
  if (section === 'submissions') return (await db.query(`SELECT id, full_name, email, title, category, status, created_at FROM story_submissions ORDER BY created_at DESC LIMIT 50`)).rows
  if (section === 'media') return (await db.query(`SELECT id, public_id, secure_url, resource_type, created_at FROM media ORDER BY created_at DESC LIMIT 50`)).rows
  if (section === 'admins') return (await db.query(`SELECT id, email, name, role, is_active, last_login_at FROM admins ORDER BY created_at DESC`)).rows
  if (section === 'settings') return (await db.query(`SELECT key, value, updated_at FROM site_settings ORDER BY key`)).rows
  return []
}

export function formatEditorialDate(value: string | null) {
  return value ? new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium' }).format(new Date(value)) : '—'
}
