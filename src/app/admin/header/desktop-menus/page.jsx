import { getNavigationData } from '@/lib/actions/navigation';
import DesktopMenuManager from '@/components/admin/header/DesktopMenuManager';

export default async function DesktopMenusPage() {
  // Fetch data on the server
  const data = await getNavigationData();
  
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DesktopMenuManager initialData={data} initialTopMenu={data.topMenu} />
    </div>
  );
}
