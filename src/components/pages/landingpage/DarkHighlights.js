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
    <section className="dark-highlights bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 lg:py-24">
      <div className="dark-highlights-grid max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {highlights.map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon] || Code;
            return (
              <div 
                key={index} 
                className="dh-card group bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 hover:bg-slate-800/70"
              >
                <div className="dh-icon text-blue-400 mb-4 group-hover:text-blue-300 transition-all duration-300 group-hover:scale-110">
                  <IconComponent size={40} strokeWidth={1.5} />
                </div>
                <h4 className="dh-title text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {highlight.title}
                </h4>
                <p className="dh-desc text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
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
