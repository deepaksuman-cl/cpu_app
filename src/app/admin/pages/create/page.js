import PageBuilderForm from '@/components/admin/pages/PageBuilderForm';

export const metadata = { title: 'Create Page | Admin' };

export default function CreatePageRoute() {
  return (
    <PageBuilderForm mode="create" />
  );
}

