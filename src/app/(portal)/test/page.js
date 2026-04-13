import React from 'react'
import Hero from '@/components/pages/landingpage/Hero'
import DarkHighlights from '@/components/pages/landingpage/DarkHighlights'
import FeaturesFlipCards from '@/components/pages/landingpage/FeaturesFlipCards'
import Curriculum from '@/components/pages/landingpage/Curriculum'
import Admissions from '@/components/pages/landingpage/Admissions'
import Placements from '@/components/pages/landingpage/Placements'
import Comparison from '@/components/pages/landingpage/Comparison'
import TeamSlider from '@/components/pages/landingpage/TeamSlider'
import CTA from '@/components/pages/landingpage/CTA'
import FAQ from '@/components/pages/landingpage/FAQ'

const page = () => {
  return (
   <div>
        <Hero />
      <DarkHighlights />
      <FeaturesFlipCards />
      <Curriculum />
      <Admissions />
      <Placements />
      <Comparison />
      <TeamSlider />
      <CTA />
      <FAQ />
   </div>
  )
}

export default page