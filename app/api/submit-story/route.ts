import { NextResponse } from 'next/server'
import { validateSubmission } from '@/lib/config/site'
import { createStorySubmission } from '@/lib/form-storage'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const errors = validateSubmission(body)
    if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 })
    await createStorySubmission({ ...body, media: Array.isArray(body.media) ? body.media : [] })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unable to save your submission right now.' }, { status: 503 })
  }
}
