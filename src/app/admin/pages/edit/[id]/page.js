import { connectToDatabase } from '@/lib/db';
import Page from '@/models/Page';
import PageBuilderForm from '@/components/admin/pages/PageBuilderForm';
import { notFound } from 'next/navigation';

export const metadata = { title: 'Edit Page | Admin' };

export default async function EditPage(props) {
  // Await params completely to support Next 15 Async Route Params properly
  const params = await props.params;
  const id = params.id;

  await connectToDatabase();
  const rawPage = await Page.findById(id).lean();
  
  if (!rawPage) {
    return notFound();
  }

  // Serialize to avoid passing ObjectIds directly to Client Component
  const pageData = JSON.parse(JSON.stringify(rawPage));

  return (
    <div className="p-6">
      <div className="mb-6 border-b border-gray-300 pb-4">
        <h1 className="text-2xl font-bold text-[#00588b]">Edit Page: {pageData.title}</h1>
        <p className="text-sm text-gray-500 mt-1">Modify structural blocks and content for /{pageData.slug}</p>
      </div>
      
      <PageBuilderForm mode="edit" initialData={pageData} />
    </div>
  );
}
