import { NextResponse } from 'next/server'
import { logoutAdmin } from '@/lib/editorial-auth'

export async function POST(request: Request) {
  await logoutAdmin()
  return NextResponse.redirect(new URL('/editorial/login', request.url))
}
