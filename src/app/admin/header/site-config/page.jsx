import { getNavigationData } from '@/lib/actions/navigation';
import SiteConfigManager from '@/components/admin/header/SiteConfigManager';

export default async function SiteConfigPage() {
  const data = await getNavigationData();

  return (
    <SiteConfigManager initialData={data} />
  );
}
