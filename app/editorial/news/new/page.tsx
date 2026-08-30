import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createDraft } from '@/app/editorial/actions'
import { requireAdmin } from '@/lib/editorial-auth'

export const metadata = { title: 'Create Post | FUTO Central', robots: { index: false, follow: false } }

export default async function NewPostPage() {
  await requireAdmin()
  return <main className="editorial-main standalone-editor"><Link className="text-link" href="/editorial"><ArrowLeft size={16}/>Back to dashboard</Link><p className="eyebrow">NEWSROOM</p><h1>Create a post</h1><p className="muted">Draft an article for the FUTO Central editorial desk.</p><form className="post-editor" action={createDraft}><label>Title<input name="title" required maxLength={180} placeholder="Write a clear editorial headline" /></label><label>Excerpt<textarea name="excerpt" required maxLength={500} rows={3} placeholder="A concise summary for cards and search results" /></label><label>Content<textarea name="content" required maxLength={100000} rows={16} placeholder="Markdown is supported for long-form articles" /></label><div className="editor-actions"><Link className="button button-quiet" href="/editorial">Cancel</Link><button className="button button-green" type="submit">Save draft</button></div></form></main>
}
