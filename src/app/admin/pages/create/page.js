import PageBuilderForm from '@/components/admin/pages/PageBuilderForm';

export const metadata = { title: 'Create Page | Admin' };

export default function CreatePageRoute() {
  return (
    <div className="p-6">
      <div className="mb-6 border-b border-gray-300 pb-4">
        <h1 className="text-2xl font-bold text-[#00588b]">Create New Page</h1>
        <p className="text-sm text-gray-500 mt-1">Construct a new dynamic page from blocks.</p>
      </div>
      
      <PageBuilderForm mode="create" />
    </div>
  );
}
