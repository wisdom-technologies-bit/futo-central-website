import type { Metadata } from 'next'
import { LegalPage } from '@/components/futo/support-pages'
export const metadata: Metadata = { title: 'Privacy Policy | FUTO Central', description: 'Learn how FUTO Central handles information shared through this website.' }
export default function Page(){ return <LegalPage kind="privacy" /> }
