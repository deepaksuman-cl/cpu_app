import { notFound } from 'next/navigation';
import Breadcrumb from "@/components/ui/Breadcrumb";
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
import SchoolTestimonials from "@/components/pages/schools/SchoolTestimonials";
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

  // Render components using structured fields
  return (
    <main className="min-h-screen bg-white">
      <Breadcrumb paths={school.breadcrumb || [
        { label: "Home", link: "/" },
        { label: "Schools & Departments", link: "/schools" },
        { label: school.name || school.hero?.title?.main, link: `/schools/${currentSlug}` }
      ]} />
      
      {school.hero && <SchoolHero data={school.hero} />}
      {school.stats && <SchoolStats data={school.stats} />}
      {school.about && <SchoolAbout data={school.about} />}
      
      {/* Programmes section links to courses, uses school.programmes header data */}
      {school.programmes && (
        <SchoolProgrammes data={school.programmes} schoolSlug={currentSlug} />
      )}

      {school.placements && <SchoolPlacements data={school.placements} />}
      {school.alumni && <SchoolAlumni data={school.alumni} />}
      {school.industry && <SchoolPartners data={school.industry} />}
      {school.research && <SchoolResearch data={school.research} />}
      {school.community && <SchoolCommunity data={school.community} />}
      {school.infrastructure && <SchoolInfrastructure data={school.infrastructure} />}
      {school.testimonials && <SchoolTestimonials data={school.testimonials} />}
      {school.exploreDepartment && <SchoolExploreDepartment data={school.exploreDepartment} />}
    </main>
  );
}

