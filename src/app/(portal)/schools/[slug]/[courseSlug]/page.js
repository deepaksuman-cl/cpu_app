// Course detail page - DB-first with static JSON fallback
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
import { notFound } from "next/navigation";

// Shared School components
import SchoolHero from "@/components/pages/schools/SchoolHero";
import SchoolPartners from "@/components/pages/schools/SchoolPartners";
import SchoolPlacements from "@/components/pages/schools/SchoolPlacements";
import TestimonialSection from "@/components/sections/TestimonialSection";

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

// Specialization (AI-First) Components
import AiHero from "@/components/pages/courses/specialization/Hero";
import AiHighlights from "@/components/pages/courses/specialization/DarkHighlights";
import AiFeatures from "@/components/pages/courses/specialization/FeaturesFlipCards";
import AiCurriculum from "@/components/pages/courses/specialization/Curriculum";
import AiAdmissions from "@/components/pages/courses/specialization/Admissions";
import AiPlacements from "@/components/pages/courses/specialization/Placements";
import AiComparison from "@/components/pages/courses/specialization/Comparison";
import AiTeam from "@/components/sections/TeamSlider";
import AiCTA from "@/components/pages/courses/specialization/CTA";
import AiFAQ from "@/components/pages/courses/specialization/FAQ";
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
      
      const pTop = custom.sectionPaddingTop || '60';
      const pBottom = custom.sectionPaddingBottom || '60';
      const pyStyle = {
        paddingTop: isNaN(pTop) ? pTop : `${pTop}px`,
        paddingBottom: isNaN(pBottom) ? pBottom : `${pBottom}px`,
      };

      if (custom.sectionBgColor) pyStyle.backgroundColor = custom.sectionBgColor;
      if (custom.sectionBgImage) {
        pyStyle.backgroundImage = `url(${custom.sectionBgImage})`;
        pyStyle.backgroundSize = 'cover';
        pyStyle.backgroundPosition = 'center';
      }

      const isFull = custom.sectionContainer === 'full';
      const wrapperClass = isFull ? 'w-full' : 'max-w-7xl mx-auto px-4';

      return (
        <section 
          key={id} 
          id={custom.cssId || undefined}
          className={`relative ${custom.cssClass || ''}`}
          style={pyStyle}
        >
          <div className={wrapperClass}>
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
        return course.testimonials && !course.testimonials.hide ? <TestimonialSection key="testimonials" data={course.testimonials} /> : null;
      
      // 3. Handle Specialization (AI-First) Sections
      case 'ai_hero':
        return course.ai_hero && !course.ai_hero.hide ? <AiHero key="ai_hero" data={course.ai_hero} /> : null;
      
      case 'ai_highlights':
        return course.ai_highlights && !course.ai_highlights.hide ? <AiHighlights key="ai_highlights" data={course.ai_highlights} /> : null;
      
      case 'ai_features':
        return course.ai_features && !course.ai_features.hide ? <AiFeatures key="ai_features" data={course.ai_features} /> : null;
      
      case 'ai_curriculum':
        return course.ai_curriculum && !course.ai_curriculum.hide ? <AiCurriculum key="ai_curriculum" data={course.ai_curriculum} /> : null;
      
      case 'ai_admissions':
        return course.ai_admissions && !course.ai_admissions.hide ? <AiAdmissions key="ai_admissions" data={course.ai_admissions} /> : null;
      
      case 'ai_placements':
        return course.ai_placements && !course.ai_placements.hide ? <AiPlacements key="ai_placements" data={course.ai_placements} /> : null;
      
      case 'ai_comparison':
        return course.ai_comparison && !course.ai_comparison.hide ? <AiComparison key="ai_comparison" data={course.ai_comparison} /> : null;
      
      case 'ai_team':
        return course.ai_team && !course.ai_team.hide ? <AiTeam key="ai_team" data={course.ai_team} /> : null;
      
      case 'ai_cta':
        return course.ai_cta && !course.ai_cta.hide ? <AiCTA key="ai_cta" data={course.ai_cta} /> : null;
      
      case 'ai_faq':
        return course.ai_faq && !course.ai_faq.hide ? <AiFAQ key="ai_faq" data={course.ai_faq} /> : null;
      
      default:
        return null;
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-white ">
      {layoutOrder.map(sectionId => renderSection(sectionId))}
    </div>
  );
}

