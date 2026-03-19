import Breadcrumb from '@/components/ui/Breadcrumb';
import ProgrammesClient from '@/components/pages/programmes/ProgrammesClient';
import { getProgrammeSettings, getCategories, getCourses, getSidebarLinks } from '@/lib/actions/programmeActions';
import { Suspense } from 'react';

export async function generateMetadata() {
  const res = await getProgrammeSettings();
  const settings = res.success && res.data ? res.data : {};
  return {
    title: settings.metaTitle || 'Programmes | Career Point University',
    description: settings.metaDescription || 'Explore our world-class Diploma, UG, PG, and Doctoral programmes.'
  };
}

export default async function ProgrammesPage() {
  const [catRes, courseRes, linkRes, setRes] = await Promise.all([
    getCategories(),
    getCourses(),
    getSidebarLinks(),
    getProgrammeSettings()
  ]);
  const categories = catRes.success ? catRes.data : [];
  const courses = courseRes.success ? courseRes.data : [];
  const links = linkRes.success ? linkRes.data : [];
  const settings = setRes.success && setRes.data ? setRes.data : {};

  const breadcrumbs = settings.breadcrumbs?.length > 0
    ? settings.breadcrumbs
    : [ { label: 'Home', link: '/' }, { label: 'Programmes', link: '/programmes' } ];

  return (
    <div>
      {/* ── Global Breadcrumb ── */}
      <div className="bg-gray-100 border-b border-gray-200">
        <Breadcrumb paths={breadcrumbs} />
      </div>

      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-br from-[#00588b] to-[#003d63] text-white px-4 sm:px-12 pt-10 pb-12 relative overflow-hidden">
        <div className="absolute -top-14 -right-14 w-64 h-64 rounded-full bg-[#ffb900]/10 pointer-events-none" />
        <div className="absolute -bottom-20 left-[42%] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        
        <div className="relative max-w-[1400px] mx-auto">
          <h1 className="text-3xl font-black leading-tight mb-2">
            Explore Our <span className="text-[#ffb900]">Programmes</span>
          </h1>
          <p className="text-white/75 text-base leading-relaxed max-w-lg">
            Discover world-class programmes crafted for future leaders.
            Choose from specialisations across multiple distinct master schools.
          </p>
        </div>
      </div>

      {/* ── Interactive Client Component ── */}
      <Suspense fallback={<div className="p-20 text-center font-bold text-[#00588b]">Loading Programmes...</div>}>
        <ProgrammesClient categories={categories} courses={courses} links={links} settings={settings} />
      </Suspense>

    </div>
  );
}