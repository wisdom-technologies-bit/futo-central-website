export const siteName = 'FUTO Central'
export const siteDescription = 'Independent news and information for the FUTO community.'

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (configured) return configured.startsWith('http') ? configured.replace(/\/$/, '') : `https://${configured}`
  return 'https://futocentral.name.ng'
}

export function absoluteUrl(path = '/') {
  return `${getSiteUrl()}${path.startsWith('/') ? path : `/${path}`}`
}

export function truncateDescription(value: string, max = 160) {
  const clean = value.replace(/\s+/g, ' ').trim()
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`
}

export const publisherJsonLd = {
  '@type': 'Organization',
  name: siteName,
  url: absoluteUrl('/'),
  logo: { '@type': 'ImageObject', url: absoluteUrl('/icon.png') },
}
