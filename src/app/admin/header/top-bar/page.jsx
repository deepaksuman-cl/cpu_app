import { getNavigationData } from '@/lib/actions/navigation';
import TopBarManager from '@/components/admin/header/TopBarManager';

export default async function TopBarPage() {
  const data = await getNavigationData();
  
  return (
    <TopBarManager initialData={data} initialTopBar={data.topBarInfo} />
  );
}
