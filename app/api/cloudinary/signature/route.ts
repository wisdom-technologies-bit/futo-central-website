import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/editorial-auth'

export async function GET() {
  await requireAdmin()
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const secret = process.env.CLOUDINARY_API_SECRET
  if (!cloudName || !apiKey || !secret) return NextResponse.json({ error: 'Cloudinary is not configured.' }, { status: 503 })
  const timestamp = Math.floor(Date.now() / 1000)
  const folder = 'futo-central/news'
  const signature = createHash('sha1').update(`folder=${folder}&timestamp=${timestamp}${secret}`).digest('hex')
  return NextResponse.json({ cloudName, apiKey, timestamp, folder, signature })
}
