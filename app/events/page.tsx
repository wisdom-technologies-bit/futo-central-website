import type { Metadata } from 'next'
import { EventsPage } from '@/components/futo/publishing-pages'
export const metadata:Metadata={title:'FUTO Events — Upcoming Events, Activities & Programs | FUTO Central',description:'Discover upcoming events, activities, competitions, workshops, academic programs and community events at FUTO.'}
export default function Page(){return <EventsPage/>}
