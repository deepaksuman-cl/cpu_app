import { getNavigationData } from '@/lib/actions/navigation';
import MobileConfigManager from '@/components/admin/header/MobileConfigManager';

export default async function MobileConfigPage() {
  const data = await getNavigationData();
  
  return (
    <MobileConfigManager initialData={data} initialMobileConfig={data.mobileConfig} />
  );
}
