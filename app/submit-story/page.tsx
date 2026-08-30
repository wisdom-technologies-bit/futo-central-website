import type { Metadata } from 'next'
import { SubmitStoryPage } from '@/components/futo/support-pages'
export const metadata: Metadata = { title: 'Submit a Story | FUTO Central', description: 'Share news, achievements, events, opportunities and important updates from the FUTO community with FUTO Central.' }
export default function Page(){ return <SubmitStoryPage /> }
