"use client";

import { use } from "react";
import schoolsData from "@/data/schoolsData.json";
import { notFound } from "next/navigation";

// UI
import Breadcrumb from "@/components/ui/Breadcrumb";

// Shared School components (now powered by children prop on Hero)
import SchoolHero from "@/components/pages/schools/SchoolHero";
import SchoolPlacements from "@/components/pages/schools/SchoolPlacements";
import SchoolPartners from "@/components/pages/schools/SchoolPartners";
import SchoolTestimonials from "@/components/pages/schools/SchoolTestimonials";

// Modular Course components
import CourseOverview from "@/components/pages/courses/CourseOverview";
import CourseScope from "@/components/pages/courses/CourseScope";
import { CourseCurriculum, CourseDeptSlider } from "@/components/pages/courses/CourseCurriculum";
import CourseAdmissionFee from "@/components/pages/courses/CourseAdmissionFee";
import CourseScholarships from "@/components/pages/courses/CourseScholarships";
import CourseWhyJoin from "@/components/pages/courses/CourseWhyJoin";
import CourseUniqueFeatures from "@/components/pages/courses/CourseUniqueFeatures";
import CourseApplySteps from "@/components/pages/courses/CourseApplySteps";

// Lucide icons for the Accomplishments card
import {
  Users, BookOpen, Award, FileText, Globe, Star,
} from "lucide-react";

/* ── Icon resolver for the Accomplishments stat grid ── */
const STAT_ICONS = { Users, BookOpen, Award, FileText, Globe, Star };

/* ── "University's Accomplishments & Impact" right-side card (injected as children into SchoolHero) ── */
function AccomplishmentsCard({ data }) {
  if (!data) return null;
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/20 shadow-2xl">
      <h3 className="text-[#ffb900] font-extrabold text-sm mb-5 text-center flex items-center justify-center gap-2">
        <Award size={16} /> {data.heading}
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {data.stats?.map((s, i) => {
          const Icon = STAT_ICONS[s.icon] || Star;
          return (
            <div
              key={i}
              className="bg-white/10 rounded-2xl p-3 text-center hover:bg-white/20 transition cursor-default"
            >
              <Icon size={18} className="mx-auto mb-1.5 text-[#ffb900]" />
              <div className="text-white font-black text-sm leading-tight">{s.value}</div>
              <div className="text-blue-200 text-[10px] mt-0.5 leading-tight">{s.label}</div>
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
export default function CourseSlugPage({ params }) {
  const { slug, courseSlug } = use(params);

  // 1. Resolve school
  const schoolData = schoolsData[slug];
  if (!schoolData) notFound();

  // 2. Resolve course within courseDetails
  const courseData = schoolData.courseDetails?.[courseSlug];
  if (!courseData) notFound();

  // 3. Build breadcrumb
  const breadcrumbPaths = [
    { label: "Home", link: "/" },
    { label: "Schools & Departments", link: "/schools" },
    { label: schoolData.hero?.title?.main || slug, link: `/schools/${slug}` },
    { label: courseData.title || courseSlug, link: `/schools/${slug}/${courseSlug}` },
  ];

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden">
      {/* ── Breadcrumb ── */}
      <Breadcrumb paths={breadcrumbPaths} />

      {/* ── Hero  (Accomplishments card injected as children) ── */}
      <SchoolHero data={courseData.hero}>
        <AccomplishmentsCard data={courseData.accomplishments} />
      </SchoolHero>

      {/* ── Overview ── */}
      <CourseOverview data={courseData.overview} />

      {/* ── Scope (BG2 dark section) ── */}
      <CourseScope data={courseData.scope} />

      {/* ── Curriculum: Course Structure + Value Added + Semester Accordions ── */}
      <CourseCurriculum data={courseData.curriculum} />

      {/* ── Department Slider (BG2 washed section) ── */}
      <CourseDeptSlider slides={courseData.deptSlides} />

      {/* ── Admission & Fee ── */}
      <CourseAdmissionFee data={courseData.admissionFee} />

      {/* ── Scholarships ── */}
      <CourseScholarships data={courseData.scholarships} />

      {/* ── Why Join ── */}
      <CourseWhyJoin data={courseData.whyJoin} />

      {/* ── Unique Features (BG1 washed section) ── */}
      <CourseUniqueFeatures data={courseData.uniqueFeatures} />

      {/* ── How to Apply (BG2 dark slider) ── */}
      <CourseApplySteps data={courseData.applySteps} />

      {/* ── Placements ── */}
      <SchoolPlacements data={courseData.placements} />

      {/* ── Industry Partners ── */}
      <SchoolPartners data={courseData.industry} />

      {/* ── Testimonials ── */}
      <SchoolTestimonials data={courseData.testimonials} />
    </div>
  );
}
