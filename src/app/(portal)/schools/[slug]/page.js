import React from "react";
import SchoolHero from "@/components/pages/schools/SchoolHero";
import SchoolStats from "@/components/pages/schools/SchoolStats";
import SchoolAbout from "@/components/pages/schools/SchoolAbout";
import SchoolProgrammes from "@/components/pages/schools/SchoolProgrammes";
import SchoolPlacements from "@/components/pages/schools/SchoolPlacements";
import SchoolAlumni from "@/components/pages/schools/SchoolAlumni";
import SchoolPartners from "@/components/pages/schools/SchoolPartners";
import SchoolResearch from "@/components/pages/schools/SchoolResearch";
import SchoolCommunity from "@/components/pages/schools/SchoolCommunity";
import SchoolInfrastructure from "@/components/pages/schools/SchoolInfrastructure";
import SchoolTestimonials from "@/components/pages/schools/SchoolTestimonials";
import schoolsData from "@/data/schoolsData.json";
import { Home, ChevronRight } from "lucide-react";

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
      {/* Dynamic Breadcrumb */}
      {data.breadcrumb && (
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 lg:px-16 py-2.5 flex items-center gap-2 flex-wrap text-sm">
            {data.breadcrumb.map((b, i) => (
              <React.Fragment key={i}>
                <a href={b.link} className={`flex items-center gap-1 font-medium no-underline hover:opacity-70 ${i === data.breadcrumb.length - 1 ? 'text-slate-800' : 'text-[#00588b]'}`}>
                  {i === 0 && <Home className="w-3.5 h-3.5" />} {b.label}
                </a>
                {i < data.breadcrumb.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Modularized Sections */}
      <SchoolHero data={data.hero} />
      <SchoolStats data={data.stats} />
      <SchoolAbout data={data.about} />
      <SchoolProgrammes data={data.programmes} />
      <SchoolPlacements data={data.placements} />
      <SchoolAlumni data={data.alumni} />
      <SchoolPartners data={data.industry} />
      <SchoolResearch data={data.research} />
      <SchoolCommunity data={data.community} />
      <SchoolInfrastructure data={data.infrastructure} />
      <SchoolTestimonials data={data.testimonials} />

      {/* Legacy/Custom Sections for Specific Schools */}
      {currentSlug === "legal-studies-governance" && (
        <section className="bg-amber-100 p-10 my-5 border-l-4 border-amber-800">
           <h2 className="text-3xl font-bold">Moot Court Practice Area</h2>
           <p>This is a custom section specifically for Law students.</p>
        </section>
      )}
    </main>
  );
}