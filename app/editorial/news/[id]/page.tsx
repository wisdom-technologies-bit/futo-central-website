import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { requireAdmin } from '@/lib/editorial-auth'
import { getArticleById, getNewsAuthors, getNewsCategories } from '@/lib/news-db'
import NewsComposer from '@/components/futo/news-composer'

export const dynamic = 'force-dynamic'

export default async function EditorialNewsEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const [article, categories, authors] = await Promise.all([getArticleById(id), getNewsCategories(), getNewsAuthors()])
  if (!article) notFound()
  return <main className="editorial-main standalone-editor"><Link className="text-link" href="/editorial/news"><ArrowLeft size={16} data-icon="inline-start" />Back to newsroom</Link><NewsComposer article={article} categories={categories} authors={authors} /></main>
}
