'use client'

import { useOneSignal } from './onesignal-provider'
import { useState } from 'react'

export function NewsNotificationPrompt() {
  const { supported, enabled, request } = useOneSignal()
  const [state, setState] = useState<'idle' | 'working' | 'denied'>('idle')
  if (!supported || enabled) return enabled ? <p className="notification-success">News notifications enabled</p> : null
  async function enable() { setState('working'); const ok = await request(); setState(ok ? 'idle' : 'denied') }
  return <section className="notification-prompt" aria-label="FUTO Central news notifications"><div><span className="eyebrow">STAY INFORMED</span><h2>Get FUTO News Notifications</h2><p>Stay updated with the latest FUTO news, announcements and important campus information.</p>{state === 'denied' && <small>Notifications were not enabled. You can allow them in your browser settings.</small>}</div><button className="button button-green" onClick={enable} disabled={state === 'working'}>{state === 'working' ? 'Enabling…' : 'Enable Notifications'}</button></section>
}
