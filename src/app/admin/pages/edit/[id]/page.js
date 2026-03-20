import { connectToDatabase } from '@/lib/db';
import Page from '@/models/Page';
import PageBuilderForm from '@/components/admin/pages/PageBuilderForm';
import { notFound } from 'next/navigation';

export const metadata = { title: 'Edit Page | Admin' };

export default async function EditPage(props) {
  const params = await props.params;
  const id = params.id;

  await connectToDatabase();
  const rawPage = await Page.findById(id).lean();
  
  if (!rawPage) {
    return notFound();
  }

  const pageData = JSON.parse(JSON.stringify(rawPage));

  return (
    <PageBuilderForm mode="edit" initialData={pageData} />
  );
}

