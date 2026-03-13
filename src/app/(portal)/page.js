import HeroSection from "../../components/sections/HeroSection";
import StatsSection from "../../components/sections/StatsSection";
import AboutSection from "../../components/sections/AboutSection";
import ProgramsSection from "../../components/sections/ProgramsSection";
import PlacementSection from "../../components/sections/PlacementSection";
import AlumniSection from "../../components/sections/AlumniSection";
import TestimonialSection from "../../components/sections/TestimonialSection";
import CampusLifeSection from "../../components/sections/CampusLifeSection";
import { ResearchSection, HappeningsSection, FAQSection, SocialWallSection, CTASection } from "../../components/sections/MiscSections";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ProgramsSection />
      <PlacementSection />
      <AlumniSection />
      <TestimonialSection />
      <CampusLifeSection />
      <ResearchSection />
      <HappeningsSection />
      <FAQSection />
      <SocialWallSection />
      <CTASection />
      
    </>
  );
}
