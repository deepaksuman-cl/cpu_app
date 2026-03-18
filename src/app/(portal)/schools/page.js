import React from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getSchools } from '@/lib/actions/schoolActions';

export default async function AllSchoolsPage() {
  const breadcrumbPaths = [
    { label: "Home", link: "/" },
    { label: "Schools & Departments", link: "#" }
  ];

  // Fetch from DB
  const { data: schools } = await getSchools();

  return (
    <main className="min-h-screen bg-gray-50">
      <Breadcrumb paths={breadcrumbPaths} />

      {/* Hero Section for All Schools */}
      <div className="bg-[#001e46] py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Explore Our <span className="text-[#fec53a]">Schools & Faculties</span>
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg">
          Discover a world of opportunities across our diverse academic departments, designed to foster innovation and leadership.
        </p>
      </div>

      {/* Cards Grid Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-16 py-16">
        {!schools || schools.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl font-semibold mb-2">No schools found.</p>
            <p className="text-sm">Please seed the database from the Admin CMS panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schools.map((school) => {
              // Use new hero schema for card data
              const bgImage = school.hero?.bgImage || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80";
              const description = school.hero?.description || school.metaDescription || "Explore our comprehensive programs and world-class faculty.";
              const title = school.name;

              return (
                <div key={school._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                  {/* Card Image */}
                  <div className="h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#001e46]/20 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={bgImage}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                      <GraduationCap className="text-[#001e46] w-6 h-6" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-[#0a1628] mb-3 leading-tight group-hover:text-[#00588b] transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                      {description}
                    </p>

                    <Link
                      href={`/schools/${school.slug}`}
                      className="inline-flex items-center gap-2 text-[#00588b] font-bold text-sm hover:text-[#fec53a] transition-colors mt-auto"
                    >
                      Explore School <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}