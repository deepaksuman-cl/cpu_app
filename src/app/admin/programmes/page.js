import ProgrammesManager from '@/components/admin/programmes/ProgrammesManager';
import { getCategories, getCourses, getProgrammeSettings, getSidebarLinks } from '@/lib/actions/programmeActions';

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
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)]">
      <ProgrammesManager 
        initialCategories={catRes.success ? catRes.data : []} 
        initialCourses={courseRes.success ? courseRes.data : []} 
        initialLinks={linkRes.success ? linkRes.data : []} 
        initialSettings={setRes.success && setRes.data ? setRes.data : {}}
      />
    </div>
  );
}