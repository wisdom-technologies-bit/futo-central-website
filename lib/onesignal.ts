import 'server-only'

const appId = process.env.ONESIGNAL_APP_ID
const apiKey = process.env.ONESIGNAL_API_KEY

export async function sendNewsNotification(article: { title: string; slug: string; image?: string }) {
  if (!appId || !apiKey) throw new Error('ONESIGNAL_NOT_CONFIGURED')
  const response = await fetch('https://api.onesignal.com/notifications', { method: 'POST', headers: { Authorization: `Key ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ app_id: appId, target_channel: 'push', included_segments: ['Subscribed Users'], headings: { en: 'FUTO Central — New News' }, contents: { en: `New FUTO news: ${article.title}` }, url: `https://futocentral.name.ng/news/${encodeURIComponent(article.slug)}`, chrome_web_image: article.image || undefined, big_picture: article.image || undefined }), cache: 'no-store' })
  if (!response.ok) throw new Error(`ONESIGNAL_${response.status}`)
}
