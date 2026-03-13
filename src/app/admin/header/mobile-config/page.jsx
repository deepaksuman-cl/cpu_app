import { getNavigationData } from '@/lib/actions/navigation';
import MobileConfigManager from '@/components/admin/header/MobileConfigManager';

export default async function MobileConfigPage() {
  const data = await getNavigationData();
  
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <MobileConfigManager initialData={data} initialMobileConfig={data.mobileConfig} />
    </div>
  );
}
