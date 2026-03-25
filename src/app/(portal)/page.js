import HeroSection from "../../components/sections/HeroSection";
import StatsSection from "../../components/sections/StatsSection";
import AboutSection from "../../components/sections/AboutSection";
import ProgramsSection from "../../components/sections/ProgramsSection";
import PlacementSection from "../../components/sections/PlacementSection";
import AlumniSection from "../../components/sections/AlumniSection";
import VirtuallyNews from "../../components/sections/VirtuallyNews";
import TestimonialSection from "../../components/sections/TestimonialSection";
import CampusLifeSection from "../../components/sections/CampusLifeSection";
import { ResearchSection, HappeningsSection, FAQSection, SocialWallSection, CTASection } from "../../components/sections/MiscSections";
import { getHomePageData } from "@/lib/actions/homeActions";

export async function generateMetadata() {
  const { data: homeData } = await getHomePageData();
  const seo = homeData?.seo || {};

  return {
    title: seo.title || 'Career Point University, Kota | Premier Private University in Rajasthan',
    description: seo.description || 'CPU Kota offers world-class education with 25+ years of academic legacy. Industry-aligned programs in Engineering, Management, Law, Pharmacy & more.',
    keywords: seo.keywords || 'University in Kota, CPU Kota, Career Point University, Best Engineering College Rajasthan',
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [{ url: seo.ogImage }] : [],
    },
  };
}

export default async function Home() {
  const { data: homeData, success } = await getHomePageData();
  const sections = homeData?.sections || {};

  return (
    <>
      <HeroSection data={sections.heroConfig} />
      <StatsSection data={sections.statsConfig} />
      <AboutSection data={sections.aboutConfig} />
      <ProgramsSection data={sections.programsConfig} />
      <PlacementSection data={sections.placementConfig} />
      <AlumniSection data={sections.alumniConfig} />
      <TestimonialSection data={sections.testimonialConfig} />
      <CampusLifeSection data={sections.campusConfig} />
      <ResearchSection data={sections.researchConfig} />
      <VirtuallyNews data={sections.virtuallyNewsConfig} />
      <HappeningsSection data={sections.happeningsConfig} />
      <FAQSection data={sections.faqConfig} />
      <SocialWallSection data={sections.socialWallConfig} />
      <CTASection data={sections.ctaConfig} />
    </>
  );
}
