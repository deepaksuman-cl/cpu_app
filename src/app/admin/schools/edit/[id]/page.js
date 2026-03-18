import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import SchoolBuilderForm from '@/components/admin/schools/SchoolBuilderForm';
import { getSchoolById } from '@/lib/actions/schoolActions';
import { notFound } from 'next/navigation';

export default async function EditSchoolPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const { data: school, success } = await getSchoolById(id);
  
  if (!success || !school) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <Link 
          href="/admin/schools"
          className="p-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors rounded-none"
          title="Back to Schools"
        >
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit School</h1>
      </div>
      
      <SchoolBuilderForm initialData={school} />
    </div>
  );
}
