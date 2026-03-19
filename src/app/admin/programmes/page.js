import { getCategories, getCourses, getSidebarLinks, getProgrammeSettings } from '@/lib/actions/programmeActions';
import ProgrammesManager from '@/components/admin/programmes/ProgrammesManager';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export const metadata = { title: 'Manage Programmes | Admin' };

export default async function AdminProgrammesPage() {
  // Ek sath teeno tables se data fetch kar rahe hain (Super fast)
  const [catRes, courseRes, linkRes, setRes] = await Promise.all([
    getCategories(),
    getCourses(),
    getSidebarLinks(),
    getProgrammeSettings()
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <nav className="flex items-center text-sm text-gray-400 mb-3 gap-2">
          <Link href="/admin" className="hover:text-[#00588b] transition flex items-center gap-1"><Home size={14} /> Dashboard</Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-gray-800">Academic Catalog Manager</span>
        </nav>
        <h1 className="text-2xl font-black text-gray-900 uppercase">Academic Catalog</h1>
        <p className="text-sm text-gray-500">Manage Categories, Programmes, and Quick Links all in one place.</p>
      </div>

      <ProgrammesManager 
        initialCategories={catRes.success ? catRes.data : []} 
        initialCourses={courseRes.success ? courseRes.data : []} 
        initialLinks={linkRes.success ? linkRes.data : []} 
        initialSettings={setRes.success && setRes.data ? setRes.data : {}}
      />
    </div>
  );
}