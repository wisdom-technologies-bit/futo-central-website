'use client'

import Script from 'next/script'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type OneSignalApi = { init: (options: { appId: string; notifyButton?: { enable: boolean } }) => Promise<void>; Notifications: { requestPermission: () => Promise<void>; permission: boolean }; User: { PushSubscription: { optedIn: boolean; id?: string; addEventListener?: (event: string, listener: (event: { current?: { id?: string; optedIn?: boolean } }) => void) => void }; onesignalId?: string } }
declare global { interface Window { OneSignalDeferred?: ((callback: (oneSignal: OneSignalApi) => void) => void)[]; __futoOneSignalInitialized?: boolean } }
const OneSignalContext = createContext<{ supported: boolean; enabled: boolean; request: () => Promise<boolean> }>({ supported: false, enabled: false, request: async () => false })

export function OneSignalProvider({ children }: { children: React.ReactNode }) {
  const [api, setApi] = useState<OneSignalApi | null>(null)
  const [supported, setSupported] = useState(false)
  useEffect(() => {
    const publicAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID
    if (!publicAppId || !('Notification' in window) || !('serviceWorker' in navigator) || window.__futoOneSignalInitialized) return
    setSupported(true)
    window.__futoOneSignalInitialized = true
    window.OneSignalDeferred = window.OneSignalDeferred || []
    window.OneSignalDeferred.push(async (oneSignal) => { try { await oneSignal.init({ appId: publicAppId, notifyButton: { enable: false }, ...(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? { allowLocalhostAsSecureOrigin: true } : {}) }); oneSignal.User.PushSubscription.addEventListener?.('change', (event) => { const subscriptionId = event.current?.id; if (subscriptionId) void fetch('/api/notifications/onesignal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subscriptionId, userId: oneSignal.User.onesignalId, enabled: Boolean(event.current?.optedIn) }) }) }); setApi(oneSignal) } catch (error) { window.__futoOneSignalInitialized = false; console.error('[v0] OneSignal initialization failed:', error) } })
  }, [])
  const request = useCallback(async () => { if (!api) return false; await api.Notifications.requestPermission(); return Boolean(api.User.PushSubscription.optedIn) }, [api])
  const value = useMemo(() => ({ supported, enabled: Boolean(api?.User.PushSubscription.optedIn), request }), [supported, api, request])
  return <OneSignalContext.Provider value={value}>{children}<Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" strategy="afterInteractive" /></OneSignalContext.Provider>
}
export const useOneSignal = () => useContext(OneSignalContext)
