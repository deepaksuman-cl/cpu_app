import FooterManagerForm from '@/components/admin/footer/FooterManagerForm';
import { getFooter } from '@/lib/actions/footerActions';

export const metadata = {
  title: 'Footer Manager | Admin Panel',
  description: 'Manage global footer configuration, links, and branding.',
};

export default async function FooterManagerPage() {
  const result = await getFooter();
  
  // Even if it fails, the form should handle the default structure
  const initialData = result.success ? result.data : {};

  return (
    <FooterManagerForm initialData={initialData} />
  );
}
