import { getNavigationData } from '@/lib/actions/navigation';
import TopBarManager from '@/components/admin/header/TopBarManager';

export default async function TopBarPage() {
  const data = await getNavigationData();
  
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <TopBarManager initialData={data} initialTopBar={data.topBarInfo} />
    </div>
  );
}
