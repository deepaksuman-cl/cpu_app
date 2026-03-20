import { getNavigationData } from '@/lib/actions/navigation';
import SidebarMenuManager from '@/components/admin/header/SidebarMenuManager';

export default async function SidebarMenusPage() {
  const data = await getNavigationData();
  
  return (
    <SidebarMenuManager initialData={data} initialSideMenu={data.sideMenu} />
  );
}
