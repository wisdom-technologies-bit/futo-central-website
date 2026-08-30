import type { MetadataRoute } from 'next'
import { getPublishedArticles } from '@/lib/news-db'
import { absoluteUrl } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const staticRoutes = ['/', '/news', '/news/academics', '/news/campus-news', '/news/student-life', '/news/events', '/news/sports', '/news/technology-innovation', '/news/opportunities', '/news/community', '/about', '/contact', '/submit-story', '/search', '/events', '/privacy', '/terms', '/editorial-policy'].map((path) => ({ url: absoluteUrl(path), lastModified: now, changeFrequency: path === '/' || path === '/news' ? 'daily' as const : 'monthly' as const, priority: path === '/' ? 1 : path === '/news' ? 0.9 : 0.5 }))
  const articles = await getPublishedArticles()
  return [...staticRoutes, ...articles.map((article) => ({ url: absoluteUrl(`/news/${article.slug}`), lastModified: new Date(article.publishedAt), changeFrequency: 'weekly' as const, priority: 0.8 }))]
}
