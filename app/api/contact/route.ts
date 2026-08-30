import { NextResponse } from 'next/server'
import { validateContact } from '@/lib/config/site'
import { sendContactMessage } from '@/lib/form-storage'
export async function POST(request: Request){ try { const body=await request.json(); if(body.website) return NextResponse.json({error:'Invalid request'},{status:400}); const errors=validateContact(body); if(Object.keys(errors).length) return NextResponse.json({errors},{status:422}); await sendContactMessage(body); return NextResponse.json({ok:true}) } catch { return NextResponse.json({error:'Contact delivery is not configured yet.'},{status:503}) } }
