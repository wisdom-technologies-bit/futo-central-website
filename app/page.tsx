export const dynamic = 'force-dynamic'

import FutoHomepage from '@/components/futo/futo-homepage'
import { getNewsHomeData } from '@/lib/news-db'

export default async function Home() {
  return <FutoHomepage data={await getNewsHomeData()} />
}
