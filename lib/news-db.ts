import { getDatabase } from '@/lib/db'
import type { Article } from '@/components/futo/data'

function mapRow(row: any): Article {
  const publishedAt = new Date(row.published_at).toISOString().slice(0, 10)
  const readingTime = Number(row.reading_time || 4)
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category_name || 'Uncategorized',
    excerpt: row.excerpt,
    content: row.content || '',
    publishedAt,
    date: new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(row.published_at)),
    readingTime,
    readTime: `${readingTime} min read`,
    author: row.author_name || 'FUTO Central Desk',
    image: row.featured_image || '',
    alt: row.featured_image_alt || row.title,
    tags: Array.isArray(row.tags) ? row.tags : [],
    featured: Boolean(row.is_featured),
    views: Number(row.views || 0),
  }
}
const select = `SELECT a.id,a.slug,a.title,a.excerpt,a.content,a.featured_image,a.featured_image_alt,a.status,a.published_at,a.reading_time,a.is_featured,a.views,c.name AS category_name,au.name AS author_name,COALESCE((SELECT array_agg(t.name ORDER BY t.name) FROM article_tags at JOIN tags t ON t.id=at.tag_id WHERE at.article_id=a.id),'{}') AS tags FROM articles a LEFT JOIN categories c ON c.id=a.category_id LEFT JOIN authors au ON au.id=a.author_id`
async function query(sql: string, values: unknown[] = []) { const db = getDatabase(); if (!db) throw new Error('DATABASE_NOT_CONFIGURED'); return db.query(sql, values) }
export async function getPublishedArticles(limit?: number) { const suffix = limit ? ` LIMIT ${Math.max(1, Math.min(limit, 100))}` : ''; const result = await query(`${select} WHERE a.status='published' AND a.published_at IS NOT NULL ORDER BY a.published_at DESC${suffix}`); return result.rows.map(mapRow) }
export async function getPublishedArticleBySlug(slug: string) { const result = await query(`${select} WHERE a.status='published' AND a.slug=$1 LIMIT 1`, [slug]); return result.rows[0] ? mapRow(result.rows[0]) : undefined }
export async function getPublishedArticlesByCategory(category: string) { const result = await query(`${select} WHERE a.status='published' AND c.name=$1 ORDER BY a.published_at DESC`, [category]); return result.rows.map(mapRow) }
export async function searchPublishedArticles(search: string, category?: string) { const values: string[] = []; const filters = ["a.status='published'", 'a.published_at IS NOT NULL']; if (search.trim()) { values.push(`%${search.trim()}%`); filters.push(`(a.title ILIKE $${values.length} OR a.excerpt ILIKE $${values.length} OR a.content ILIKE $${values.length})`) } if (category && category !== 'All') { values.push(category); filters.push(`c.name=$${values.length}`) } const result = await query(`${select} WHERE ${filters.join(' AND ')} ORDER BY a.published_at DESC`, values); return result.rows.map(mapRow) }
export type NewsHomeData = { latestNews: Article[]; featuredStories: Article[]; breakingStory?: Article; campusStories: Article[]; innovationStories: Article[]; mostRead: string[] }
export async function getNewsHomeData(): Promise<NewsHomeData> { const articles = await getPublishedArticles(); const breakingStory = articles.find(a => a.featured) || articles[0]; return { latestNews: articles, featuredStories: articles.filter(a => a.featured).slice(0, 3), breakingStory, campusStories: articles.filter(a => ['Campus News', 'Student Life'].includes(a.category)).slice(0, 3), innovationStories: articles.filter(a => ['Academics', 'Technology & Innovation'].includes(a.category)).slice(0, 3), mostRead: [...articles].sort((a, b) => b.views - a.views).slice(0, 5).map(a => a.title) } }
export async function getRelatedPublishedArticles(article: Article, limit = 3) { const all = await getPublishedArticles(); return all.filter(item => item.id !== article.id && item.category === article.category).slice(0, limit) }
export { mapRow }
