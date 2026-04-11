import heroData from '../../../data/courses.json';
import { Laptop, FlaskConical, Bot, Code, Users } from 'lucide-react';

const iconMap = {
  'fa-solid fa-laptop-code': Laptop,
  'fa-solid fa-flask': FlaskConical,
  'fa-solid fa-robot': Bot,
  'fa-solid fa-code': Code,
  'fa-solid fa-users': Users,
};

function DarkHighlights() {
  const highlights = heroData.highlights;

  return (
    <section className="relative dark-highlights bg-[#0a3a8d] py-20 lg:py-28 overflow-hidden">
      {/* Subtle Tech/Network Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
        backgroundSize: '120px 120px'
      }} />

      <div className="relative z-10 dark-highlights-grid max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7">
          {highlights.map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon] || Code;
            return (
              <div 
                key={index} 
                className="dh-card group bg-[#1c4998] rounded-[24px] p-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-[#2356b2] hover:-translate-y-2"
              >
                <div className="dh-icon text-[#facc15] mb-6 transition-all duration-500 group-hover:scale-110">
                  <IconComponent size={46} strokeWidth={2.5} />
                </div>
                <h4 className="dh-title text-[21px] font-[900] text-[#facc15] mb-5 leading-tight tracking-tight">
                  {highlight.title}
                </h4>
                <p className="dh-desc text-white/80 text-[14px] font-medium leading-[1.7] pr-2">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DarkHighlights;
