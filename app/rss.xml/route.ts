import { getPublishedArticles } from '@/lib/news-db'
import { absoluteUrl, siteDescription, siteName } from '@/lib/seo'

export const dynamic = 'force-dynamic'

function escapeXml(value: string) { return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;') }

export async function GET() {
  const articles = await getPublishedArticles()
  const items = articles.map((article) => { const link = absoluteUrl(`/news/${article.slug}`); return `<item><title>${escapeXml(article.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate><description>${escapeXml(article.excerpt)}</description><author>${escapeXml(article.author)}</author></item>` }).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${siteName}</title><link>${absoluteUrl('/')}</link><description>${escapeXml(siteDescription)}</description><language>en</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}</channel></rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'no-store' } })
}
