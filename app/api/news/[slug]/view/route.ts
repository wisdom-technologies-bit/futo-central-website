import { NextResponse } from 'next/server'
import { withDatabase } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug) || slug.length > 220) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  const result = await withDatabase((db) => db.query(`UPDATE articles SET views = COALESCE(views, 0) + 1 WHERE slug = $1 AND status = 'published' RETURNING id, views`, [slug]))
  if (!result.rowCount) return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  return NextResponse.json({ ok: true, views: result.rows[0].views }, { headers: { 'Cache-Control': 'no-store' } })
}

export async function GET() { return NextResponse.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } }) }
