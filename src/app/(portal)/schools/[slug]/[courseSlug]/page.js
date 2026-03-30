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
              <Icon size={26} className="mx-auto mb-1.5 text-[#ffb900]" />
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

/* ══════════ PAGE ══════════ */
export default async function CourseSlugPage({ params }) {
  const resolvedParams = await params;
  const { slug, courseSlug } = resolvedParams;

  // Fetch from DB
  const { data: course } = await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }
  

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden">
      
      {course.hero && !course.hero.hide && (
        <SchoolHero data={{ ...course.hero, duration: course.duration, eligibility: course.eligibility }}>
          {course.accomplishments && !course.accomplishments.hide && <AccomplishmentsCard data={course.accomplishments} />}
        </SchoolHero>
      )}

      {course.overview && !course.overview.hide && <CourseOverview data={course.overview} />}
      {course.scope && !course.scope.hide && <CourseScope data={course.scope} />}
      {course.curriculum && !course.curriculum.hide && <CourseCurriculum data={course.curriculum} />}
      {course.roadmap && !course.roadmap.hide && <CourseRoadmap data={course.roadmap} />}
      {course.exploreDepartment && !course.exploreDepartment.hide && <CourseDeptSlider data={course.exploreDepartment} />}
      {course.admissionFee && !course.admissionFee.hide && <CourseAdmissionFee data={course.admissionFee} />}
      {course.scholarships && !course.scholarships.hide && <CourseScholarships data={course.scholarships} />}
      {course.whyJoin && !course.whyJoin.hide && <CourseWhyJoin data={course.whyJoin} />}
      {course.uniqueFeatures && !course.uniqueFeatures.hide && <CourseUniqueFeatures data={course.uniqueFeatures} />}
      {course.applySteps && !course.applySteps.hide && <CourseApplySteps data={course.applySteps} />}
      {course.faq && !course.faq.hide && <CourseFAQ data={course.faq} />}


      {/* Course specific versions of common sections if available */}
      {course.placements && !course.placements.hide && <SchoolPlacements data={course.placements} />}
      {course.industry && !course.industry.hide && <SchoolPartners data={course.industry} />}
      {course.testimonials && !course.testimonials.hide && <SchoolTestimonials data={course.testimonials} />}
    </div>
  );
}

