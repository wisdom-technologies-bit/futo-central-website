import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import NewsComposer from '@/components/futo/news-composer'
import { getNewsAuthors, getNewsCategories } from '@/lib/news-db'
import { requireAdmin } from '@/lib/editorial-auth'

export const metadata = { title: 'New Story | FUTO Central', robots: { index: false, follow: false } }

export default async function NewPostPage() {
  await requireAdmin()
  const [categories, authors] = await Promise.all([getNewsCategories(), getNewsAuthors()])
  return <main className="editorial-main standalone-editor"><Link className="text-link" href="/editorial"><ArrowLeft size={16} /> Back to dashboard</Link><NewsComposer categories={categories} authors={authors} /></main>
}
