# OneSignal setup for FUTO Central

## Environment variables

Set these in Vercel for Production, Preview, and Development as appropriate:

- `NEXT_PUBLIC_ONESIGNAL_APP_ID` — **public**, the OneSignal Web app ID used by the browser SDK.
- `ONESIGNAL_APP_ID` — **server-only**, the same app ID used by the REST API.
- `ONESIGNAL_API_KEY` — **secret**, the OneSignal REST API key. Never prefix it with `NEXT_PUBLIC_`.

The application URL is configured as `https://futocentral.name.ng`. Do not use an HTTP URL. The root service worker is available at `/OneSignalSDKWorker.js` after deployment.

## OneSignal dashboard

1. Create or sign into an account at https://onesignal.com.
2. Create an app named **FUTO Central** and choose **Web**.
3. Set Site Name to **FUTO Central** and Site URL to `https://futocentral.name.ng`.
4. Configure the canonical host used by the site. If `www` redirects, use the final canonical hostname consistently.
5. Complete the Web SDK setup and copy the App ID into the public and server variables above.
6. Keep permission prompts user-initiated. FUTO Central displays an Enable Notifications control instead of prompting on page load.
7. Confirm the service worker URL returns JavaScript from the production root.

## Testing

Open the production site in a supported browser, choose **Enable Notifications**, and grant permission. In OneSignal, confirm the browser appears under Audience / Subscriptions. Create a test notification with a title, message, and launch URL such as `https://futocentral.name.ng/news/example-slug`, send it to the test subscription, and verify the click opens that article.

Local development generally works on `localhost`; production push requires HTTPS and a correctly configured site origin. Add the public App ID to Development and the server variables wherever server publishing actions are tested. Publishing remains successful if OneSignal is unavailable; the server logs the delivery failure.

## Publishing behavior

A publish action sends one notification only when `notification_sent_at` is null. Draft saves do not notify, and editing an already-notified published story does not notify again. Run `migrations/20260830_news_views_onesignal.sql` against the external Neon database before using the feature.
