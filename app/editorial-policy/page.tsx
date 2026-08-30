import type { Metadata } from 'next'
import { LegalPage } from '@/components/futo/support-pages'
export const metadata: Metadata = { title: 'Editorial Policy | FUTO Central', description: 'Learn about FUTO Central editorial standards, accuracy, verification, corrections and responsible journalism.' }
export default function Page(){ return <LegalPage kind="editorial" /> }
