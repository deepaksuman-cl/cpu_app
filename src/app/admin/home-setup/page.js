import HomeSetupForm from '@/components/admin/home/HomeSetupForm';
import { getHomePageData } from '@/lib/actions/homeActions';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function HomeSetupPage() {
  const { data: homeData, success } = await getHomePageData();
  
  if (!success) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error Loading Home Page Data</h1>
        <p className="text-gray-600 mt-2">Please check the database connection or home.json file.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)]">
      
      {/* ── Fixed Top Header ── */}
      <div className="fixed top-[72px] z-30 flex items-center h-[42px] bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm w-full">
        
        {/* Back Button */}
        <Link 
          href="/admin"
          className="flex items-center justify-center h-full px-4 border-r border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors group rounded-none"
          title="Back to Dashboard"
        >
          <ChevronLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:block text-[12px] font-bold uppercase tracking-widest ml-1">
            Back
          </span>
        </Link>
        
        {/* Title */}
        <div className="flex items-center h-full px-4 gap-3">
          <h1 className="text-[14px] sm:text-[15px] font-black text-[var(--text-primary)] uppercase tracking-wide">
            Home Page Setup
          </h1>
          
          <div className="hidden md:block w-[1px] h-4 bg-[var(--border-default)]"></div>
          
          <span className="hidden md:inline-block text-[12px] text-[var(--text-secondary)] font-bold tracking-wide italic">
            Centralized Dynamic Configuratio
          </span>
        </div>

      </div>

      <div className="pt-[42px] w-full">
        <div className="pt-2 sm:pt-4">
          <HomeSetupForm initialData={homeData} />
        </div>
      </div>

    </div>
  );
}
