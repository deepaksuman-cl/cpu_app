// Course detail page - DB-first with static JSON fallback
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
import { notFound } from "next/navigation";

// Shared School components
import SchoolHero from "@/components/pages/schools/SchoolHero";
import SchoolPartners from "@/components/pages/schools/SchoolPartners";
import SchoolPlacements from "@/components/pages/schools/SchoolPlacements";
import SchoolTestimonials from "@/components/pages/schools/SchoolTestimonials";

// Modular Course components
import CourseAdmissionFee from "@/components/pages/courses/CourseAdmissionFee";
import CourseApplySteps from "@/components/pages/courses/CourseApplySteps";
import { CourseCurriculum, CourseDeptSlider } from "@/components/pages/courses/CourseCurriculum";
import CourseFAQ from "@/components/pages/courses/CourseFAQ";
import CourseOverview from "@/components/pages/courses/CourseOverview";
import CourseRoadmap from "@/components/pages/courses/CourseRoadmap";
import CourseScholarships from "@/components/pages/courses/CourseScholarships";
import CourseScope from "@/components/pages/courses/CourseScope";
import CourseUniqueFeatures from "@/components/pages/courses/CourseUniqueFeatures";
import CourseWhyJoin from "@/components/pages/courses/CourseWhyJoin";
import { getCourseBySlug } from "@/lib/actions/courseActions";

export async function generateMetadata({ params }) {
  const { slug, courseSlug } = await params;
  const { data: course } = await getCourseBySlug(courseSlug);

  return {
    title: course?.metaTitle || `${course?.name || 'Course'} | CP University`,
    description: course?.metaDescription || `Read about eligibility, fee structure and syllabus for ${course?.name || 'this course'} at CP University.`,
  };
}

import * as LucideIcons from "lucide-react";
import { Star } from "lucide-react";

/* ── "University's Accomplishments & Impact" right-side card ── */
function AccomplishmentsCard({ data }) {
  if (!data) return null;
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/20 shadow-2xl">
      <h3 className="text-[#ffb900] font-extrabold text-md mb-5 text-center flex items-center justify-center gap-2">
        {data.heading}
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {data.stats?.map((s, i) => {
          const Icon = LucideIcons[s.icon] || Star;
          return (
            <div key={i} className="bg-white/10 rounded-2xl p-3 text-center hover:bg-white/20 transition cursor-default">
              <Icon size={30} className="mx-auto mb-1.5 text-[#ffb900]" />
              <div className="text-white font-black text-md leading-tight">{s.value}</div>
              <div className="text-blue-200 text-[14px] mt-0.5 leading-tight">{s.label}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 bg-[#ffb900] text-[#00588b] text-center rounded-2xl py-2.5 text-xs font-extrabold">
        {data.trustBadge}
      </div>
    </div>
  );
}

import RichTextRenderer from "@/components/common/RichTextRenderer";

/* ══════════ PAGE ══════════ */
export default async function CourseSlugPage({ params }) {
  const resolvedParams = await params;
  const { slug, courseSlug } = resolvedParams;

  // Fetch from DB
  const { data: course } = await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  // Fallback layout if not defined
  const layoutOrder = course.layoutOrder || [
    'hero', 'overview', 'scope', 'curriculum', 'roadmap', 
    'exploreDepartment', 'admissionFee', 'scholarships', 
    'whyJoin', 'uniqueFeatures', 'applySteps', 'faq', 
    'placements', 'industry', 'testimonials'
  ];

  const renderSection = (id) => {
    // 1. Handle Custom Blocks
    if (id.startsWith('custom_')) {
      const custom = course.customSections?.[id];
      if (!custom || !custom.content) return null;
      return (
        <section key={id} className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            {custom.title && <h2 className="text-3xl font-black text-[#00588b] mb-8 uppercase tracking-tight">{custom.title}</h2>}
            <RichTextRenderer content={custom.content} useProse={custom.useProse !== false} />
          </div>
        </section>
      );
    }

    // 2. Handle System Sections
    switch (id) {
      case 'hero':
        if (!course.hero || course.hero.hide) return null;
        // In Course detail pages, accomplishments are historically nested in hero for the "Premium Card" look
        // We render it inside hero if it exists in data and isn't hidden elsewhere
        return (
          <SchoolHero key="hero" data={{ ...course.hero, duration: course.duration, eligibility: course.eligibility }}>
            {course.accomplishments && !course.accomplishments.hide && <AccomplishmentsCard data={course.accomplishments} />}
          </SchoolHero>
        );
      
      case 'accomplishments':
        // Handled inside hero for fixed design consistency
        return null;

      case 'overview':
        return course.overview && !course.overview.hide ? <CourseOverview key="overview" data={course.overview} /> : null;
      
      case 'scope':
        return course.scope && !course.scope.hide ? <CourseScope key="scope" data={course.scope} /> : null;
      
      case 'curriculum':
        return course.curriculum && !course.curriculum.hide ? <CourseCurriculum key="curriculum" data={course.curriculum} /> : null;
      
      case 'roadmap':
        return course.roadmap && !course.roadmap.hide ? <CourseRoadmap key="roadmap" data={course.roadmap} /> : null;
      
      case 'exploreDepartment':
        return course.exploreDepartment && !course.exploreDepartment.hide ? <CourseDeptSlider key="exploreDepartment" data={course.exploreDepartment} /> : null;
      
      case 'admissionFee':
        return course.admissionFee && !course.admissionFee.hide ? <CourseAdmissionFee key="admissionFee" data={course.admissionFee} /> : null;
      
      case 'scholarships':
        return course.scholarships && !course.scholarships.hide ? <CourseScholarships key="scholarships" data={course.scholarships} /> : null;
      
      case 'whyJoin':
        return course.whyJoin && !course.whyJoin.hide ? <CourseWhyJoin key="whyJoin" data={course.whyJoin} /> : null;
      
      case 'uniqueFeatures':
        return course.uniqueFeatures && !course.uniqueFeatures.hide ? <CourseUniqueFeatures key="uniqueFeatures" data={course.uniqueFeatures} /> : null;
      
      case 'applySteps':
        return course.applySteps && !course.applySteps.hide ? <CourseApplySteps key="applySteps" data={course.applySteps} /> : null;
      
      case 'faq':
        return course.faq && !course.faq.hide ? <CourseFAQ key="faq" data={course.faq} /> : null;
      
      case 'placements':
        return course.placements && !course.placements.hide ? <SchoolPlacements key="placements" data={course.placements} /> : null;
      
      case 'industry':
        return course.industry && !course.industry.hide ? <SchoolPartners key="industry" data={course.industry} /> : null;
      
      case 'testimonials':
        return course.testimonials && !course.testimonials.hide ? <SchoolTestimonials key="testimonials" data={course.testimonials} /> : null;
      
      default:
        return null;
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden">
      {layoutOrder.map(sectionId => renderSection(sectionId))}
    </div>
  );
}

