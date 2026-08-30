import type { Metadata } from 'next'
import { ContactPage } from '@/components/futo/support-pages'
export const metadata: Metadata = { title: 'Contact FUTO Central | Get in Touch', description: 'Contact FUTO Central with questions, story tips, corrections, feedback and partnership enquiries.' }
export default function Page(){ return <ContactPage /> }
