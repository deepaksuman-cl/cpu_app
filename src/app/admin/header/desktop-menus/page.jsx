import { getNavigationData } from '@/lib/actions/navigation';
import DesktopMenuManager from '@/components/admin/header/DesktopMenuManager';

export default async function DesktopMenusPage() {
  // Fetch data on the server
  const data = await getNavigationData();
  
  return (
    <DesktopMenuManager initialData={data} initialTopMenu={data.topMenu} />
  );
}
