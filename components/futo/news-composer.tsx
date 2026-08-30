'use client'

import { useState } from 'react'
import { ImagePlus, LoaderCircle, Save, UploadCloud } from 'lucide-react'
import { createDraft, updateArticle } from '@/app/editorial/actions'
import type { Article } from './data'

type Option = { id: string; name: string }

export function NewsComposer({ categories, authors, article }: { categories: Option[]; authors: Option[]; article?: Article }) {
  const [image, setImage] = useState(article?.image || '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function upload(file: File) {
    setUploading(true); setError('')
    try {
      const signature = await fetch('/api/cloudinary/signature').then((res) => res.json())
      if (!signature.signature) throw new Error(signature.error || 'Cloudinary is not configured.')
      const body = new FormData(); body.append('file', file); body.append('api_key', signature.apiKey); body.append('timestamp', String(signature.timestamp)); body.append('signature', signature.signature); body.append('folder', signature.folder)
      const response = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/auto/upload`, { method: 'POST', body })
      const result = await response.json(); if (!response.ok) throw new Error(result.error?.message || 'Upload failed.')
      setImage(result.secure_url)
    } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.') } finally { setUploading(false) }
  }

  const action = article ? updateArticle.bind(null, article.id) : createDraft
  return <form className="news-composer" action={action}>
    <div className="composer-main">
      <div className="composer-heading"><div><p className="eyebrow">EDITORIAL / NEWS</p><h1>{article ? 'Edit story' : 'New story'}</h1><p className="muted">{article ? 'Update this story from the FUTO Central newsroom.' : 'Shape the next story from the FUTO Central newsroom.'}</p></div><button className="button button-green" type="submit"><Save size={15} /> Save draft</button></div>
      <label className="form-field"><span>Headline</span><input name="title" required maxLength={180} defaultValue={article?.title} placeholder="Write a clear editorial headline" /></label>
      <label className="form-field"><span>Standfirst</span><textarea name="excerpt" required maxLength={500} rows={3} defaultValue={article?.excerpt} placeholder="A concise summary for cards, search and social previews" /></label>
      <label className="form-field"><span>Article content</span><textarea name="content" required maxLength={100000} rows={18} defaultValue={article?.content} placeholder="Write the full story. Markdown is supported." /></label>
      <details className="seo-panel"><summary>Search optimisation</summary><div className="form-grid"><label className="form-field"><span>SEO title</span><input name="seoTitle" maxLength={180} placeholder="Optional search title" /></label><label className="form-field"><span>Meta description</span><textarea name="metaDescription" maxLength={500} rows={3} /></label></div></details>
    </div>
    <aside className="composer-sidebar">
      <div className="editorial-card"><h2>Publishing</h2><label className="form-field"><span>Status</span><select name="status" defaultValue="draft"><option value="draft">Draft</option><option value="published">Publish now</option><option value="scheduled">Scheduled</option></select></label><label className="form-field"><span>Schedule for</span><input name="scheduledFor" type="datetime-local" /></label><label className="check-field"><input name="isFeatured" type="checkbox" /> <span>Feature this story</span></label></div>
      <div className="editorial-card"><h2>Story details</h2><label className="form-field"><span>Category</span><select name="categoryId" required defaultValue=""><option value="" disabled>Select a category</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="form-field"><span>Author</span><select name="authorId" defaultValue=""><option value="">FUTO Central Desk</option>{authors.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="form-field"><span>Reading time (minutes)</span><input name="readingTime" type="number" min="1" max="120" defaultValue="4" /></label></div>
      <div className="editorial-card"><h2>Featured image</h2><div className="upload-box">{image ? <img src={image} alt="Selected featured image preview" /> : <ImagePlus aria-hidden="true" size={28} />}<label className="upload-label"><UploadCloud size={15} /> {uploading ? <><LoaderCircle size={14} className="spin" /> Uploading…</> : 'Upload image'}<input type="file" accept="image/*" disabled={uploading} onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])} /></label><p>JPG, PNG or WebP. Cloudinary delivery enabled.</p></div><input type="hidden" name="featuredImage" value={image} /><label className="form-field"><span>Image alt text</span><input name="featuredImageAlt" maxLength={180} placeholder="Describe the image" /></label>{error && <p className="form-error" role="alert">{error}</p>}</div>
    </aside>
  </form>
}

export default NewsComposer
