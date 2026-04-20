import { notFound } from 'next/navigation';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
import SchoolHero from "@/components/pages/schools/SchoolHero";
import SchoolStats from "@/components/pages/schools/SchoolStats";
import SchoolAbout from "@/components/pages/schools/SchoolAbout";
import SchoolProgrammes from "@/components/pages/schools/SchoolProgrammes";
import SchoolPlacements from "@/components/pages/schools/SchoolPlacements";
import SchoolAlumni from "@/components/pages/schools/SchoolAlumni";
import SchoolPartners from "@/components/pages/schools/SchoolPartners";
import SchoolExploreDepartment from "@/components/pages/schools/SchoolExploreDepartment";
import SchoolResearch from "@/components/pages/schools/SchoolResearch";
import SchoolCommunity from "@/components/pages/schools/SchoolCommunity";
import SchoolInfrastructure from "@/components/pages/schools/SchoolInfrastructure";
import TestimonialSection from "@/components/sections/TestimonialSection";
import RichTextRenderer from "@/components/common/RichTextRenderer";
import { getSchoolBySlug } from "@/lib/actions/schoolActions";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: school } = await getSchoolBySlug(slug);

  return {
    title: school?.metaTitle || `${school?.name || 'School'} | CP University`,
    description: school?.metaDescription || `Explore programs and campus life at ${school?.name || 'CP University'}.`,
  };
}

export default async function SchoolPage({ params }) {
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;

  // Fetch only from DB
  const { data: school } = await getSchoolBySlug(currentSlug);

  if (!school) {
    notFound();
  }

  // --- Dynamic Layout Logic ---
  const layout = school.layoutOrder || [
    'hero', 'stats', 'about', 'programmes', 'placements', 'alumni',
    'industry', 'research', 'community', 'infrastructure', 'testimonials', 'exploreDepartment'
  ];
  const customSections = school.customSections || {};

  const renderSection = (id) => {
    // 1. Check for Custom Blocks
    if (id.startsWith('custom_')) {
      const block = customSections[id];
      if (!block || !block.content) return null;
      return (
        <section key={id} className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {block.title && <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">{block.title}</h2>}
            <RichTextRenderer content={block.content} useProse={block.useProse !== false} />
          </div>
        </section>
      );
    }

    // 2. Map Fixed Sections
    switch (id) {
      case 'hero':
        return school.hero && !school.hero.hide && <SchoolHero key={id} data={school.hero} />;
      case 'stats':
        return school.stats && !school.stats[0]?.hide && <SchoolStats key={id} data={school.stats} />;
      case 'about':
        return school.about && !school.about.hide && <SchoolAbout key={id} data={school.about} />;
      case 'programmes':
        return school.programmes && !school.programmes.hide && <SchoolProgrammes key={id} data={school.programmes} schoolSlug={currentSlug} />;
      case 'placements':
        return school.placements && !school.placements.hide && <SchoolPlacements key={id} data={school.placements} />;
      case 'alumni':
        return school.alumni && !school.alumni.hide && <SchoolAlumni key={id} data={school.alumni} />;
      case 'industry':
        return school.industry && !school.industry.hide && <SchoolPartners key={id} data={school.industry} />;
      case 'research':
        return school.research && !school.research.hide && <SchoolResearch key={id} data={school.research} />;
      case 'community':
        return school.community && !school.community.hide && <SchoolCommunity key={id} data={school.community} />;
      case 'infrastructure':
        return school.infrastructure && !school.infrastructure.hide && <SchoolInfrastructure key={id} data={school.infrastructure} />;
      case 'testimonials':
        return school.testimonials && !school.testimonials.hide && <TestimonialSection key={id} data={school.testimonials} />;
      case 'exploreDepartment':
        return school.exploreDepartment && !school.exploreDepartment.hide && <SchoolExploreDepartment key={id} data={school.exploreDepartment} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {layout.map(id => renderSection(id))}
    </main>
  );
}

