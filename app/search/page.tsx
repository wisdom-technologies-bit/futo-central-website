import type { Metadata } from 'next'
import { SearchPage } from '@/components/futo/publishing-pages'
export const metadata:Metadata={title:'Search FUTO Central',description:'Find news, stories, events, opportunities and updates from the FUTO community.',robots:{index:false,follow:true}}
export default async function Page({searchParams}:{searchParams:Promise<{q?:string}>}){const params=await searchParams;return <SearchPage initialQuery={params.q||''}/>}
