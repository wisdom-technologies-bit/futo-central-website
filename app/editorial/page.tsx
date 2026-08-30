import { requireAdmin } from '@/lib/editorial-auth'
import { EditorialDashboard } from '@/components/futo/editorial-dashboard'
import { getEditorialOverview } from '@/lib/editorial-data'

export const metadata = { title: 'Editorial Dashboard | FUTO Central', robots: { index: false, follow: false } }

export default async function EditorialPage() {
  await requireAdmin()
  const overview = await getEditorialOverview()
  return <EditorialDashboard overview={overview} />
}
