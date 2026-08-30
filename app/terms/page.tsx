import type { Metadata } from 'next'
import { LegalPage } from '@/components/futo/support-pages'
export const metadata: Metadata = { title: 'Terms of Use | FUTO Central', description: 'These terms explain the rules and conditions for using FUTO Central.' }
export default function Page(){ return <LegalPage kind="terms" /> }
