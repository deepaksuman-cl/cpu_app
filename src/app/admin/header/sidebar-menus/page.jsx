import { getNavigationData } from '@/lib/actions/navigation';
import SidebarMenuManager from '@/components/admin/header/SidebarMenuManager';

export default async function SidebarMenusPage() {
  const data = await getNavigationData();
  
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SidebarMenuManager initialData={data} initialSideMenu={data.sideMenu} />
    </div>
  );
}
