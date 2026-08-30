import type { Metadata } from 'next'
import AboutPage from '@/components/futo/about-page'

export const metadata: Metadata = {
  title: 'About FUTO Central — Our Story, Mission & Vision',
  description: 'Learn about FUTO Central, its mission, editorial approach, and the founder and developer behind the platform dedicated to connecting the FUTO community.',
  openGraph: { title: 'About FUTO Central — Our Story, Mission & Vision', description: 'The story, mission and editorial approach behind FUTO Central.' },
}

export default function Page() { return <AboutPage /> }
