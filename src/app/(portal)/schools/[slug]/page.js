import SchoolAbout from "@/components/pages/schools/SchoolAbout";
import SchoolAlumni from "@/components/pages/schools/SchoolAlumni";
import SchoolCommunity from "@/components/pages/schools/SchoolCommunity";
import SchoolHero from "@/components/pages/schools/SchoolHero";
import SchoolInfrastructure from "@/components/pages/schools/SchoolInfrastructure";
import SchoolPartners from "@/components/pages/schools/SchoolPartners";
import SchoolPlacements from "@/components/pages/schools/SchoolPlacements";
import SchoolProgrammes from "@/components/pages/schools/SchoolProgrammes";
import SchoolResearch from "@/components/pages/schools/SchoolResearch";
import SchoolStats from "@/components/pages/schools/SchoolStats";
import SchoolTestimonials from "@/components/pages/schools/SchoolTestimonials";
import Breadcrumb from "@/components/ui/Breadcrumb";
import schoolsData from "@/data/schoolsData.json";

export default async function SchoolPage({ params }) {
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;
  const data = schoolsData[currentSlug];

  if (!data) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gray-50 p-10 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">🚨 Error: School Not Found!</h1>
        <p className="text-lg mb-6">The school slug <strong className="bg-yellow-200 px-2">{currentSlug}</strong> is not defined in our data.</p>
        <a href="/" className="bg-[#00588b] text-white px-6 py-2 rounded-lg font-bold">Go Back Home</a>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
     <Breadcrumb paths={data.breadcrumb} />

      {/* Modularized Sections */}
      <SchoolHero data={data.hero} />
      <SchoolStats data={data.stats} />
      <SchoolAbout data={data.about} />
      <SchoolProgrammes data={data.programmes}  schoolSlug={currentSlug}/>
      <SchoolPlacements data={data.placements} />
      <SchoolAlumni data={data.alumni} />
      <SchoolPartners data={data.industry} />
      <SchoolResearch data={data.research} />
      <SchoolCommunity data={data.community} />
      <SchoolInfrastructure data={data.infrastructure} />
      <SchoolTestimonials data={data.testimonials} />

      {/* Custom Section Rendering (CMS-ready) */}
      {data.customSections?.map((section, idx) => (
        <section key={idx} className={`${section.bgClass} p-10 my-5 border-l-4 ${section.borderClass}`}>
           <h2 className="text-3xl font-bold">{section.title}</h2>
           <p>{section.content}</p>
        </section>
      ))}
    </main>
  );
}
