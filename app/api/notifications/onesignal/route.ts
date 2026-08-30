import { NextResponse } from 'next/server'
import { withDatabase } from '@/lib/db'

export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const subscriptionId = typeof body.subscriptionId === 'string' ? body.subscriptionId.trim().slice(0, 200) : ''
    const userId = typeof body.userId === 'string' ? body.userId.trim().slice(0, 200) : null
    const enabled = body.enabled === true
    if (!subscriptionId) return NextResponse.json({ error: 'subscriptionId is required' }, { status: 400 })
    await withDatabase((db) => db.query(`INSERT INTO onesignal_subscriptions (onesignal_subscription_id, onesignal_user_id, notification_enabled, last_seen_at, updated_at) VALUES ($1,$2,$3,NOW(),NOW()) ON CONFLICT (onesignal_subscription_id) DO UPDATE SET onesignal_user_id=EXCLUDED.onesignal_user_id, notification_enabled=EXCLUDED.notification_enabled, last_seen_at=NOW(), updated_at=NOW()`, [subscriptionId, userId, enabled]))
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ error: 'Unable to save subscription' }, { status: 500 }) }
}
