import { BookOpen, Code, Landmark, TrendingUp, UserCog, Users } from 'lucide-react';

const featuresData = [
  {
    id: 1,
    number: '01',
    title: 'AI First Curriculum',
    desc: 'Every course integrates AI tools and concepts from semester one. Build AI-powered projects that solve real problems.',
    icon: <BookOpen className="w-11 h-11 text-[#0c4088]" strokeWidth={2.5} />
  },
  {
    id: 2,
    number: '02',
    title: 'Coding from Day One',
    desc: 'No theory overload. 70% hands-on coding with industry-standard tools and practices from the start.',
    icon: <Code className="w-11 h-11 text-[#0c4088]" strokeWidth={2.5} />
  },
  {
    id: 3,
    number: '03',
    title: 'Learn from Industry experts',
    desc: 'Learn from engineers at Google, Microsoft, and Amazon. Real insights, real experience, real connections.',
    icon: <UserCog className="w-11 h-11 text-[#0c4088]" strokeWidth={2.5} />
  },
  {
    id: 4,
    number: '04',
    title: 'Campus Built for Techies',
    desc: 'AI-powered smart classrooms, 24/7 coding labs, high-speed internet. Spaces designed for innovation.',
    icon: <Landmark className="w-11 h-11 text-[#0c4088]" strokeWidth={2.5} />
  },
  {
    id: 5,
    number: '05',
    title: 'Career Launch Ecosystem',
    desc: '250+ hiring partners, resume workshops, mock interviews. Your career journey starts from year one.',
    icon: <TrendingUp className="w-11 h-11 text-[#0c4088]" strokeWidth={2.5} />
  },
  {
    id: 6,
    number: '06',
    title: 'Selective Peer Group',
    desc: 'Rigorous CPUEST selection ensures you learn alongside motivated, talented future tech leaders.',
    icon: <Users className="w-11 h-11 text-[#0c4088]" strokeWidth={2.5} />
  }
];

export default function FeaturesFlipCards() {
  return (
    // Main Section Background
    <section className="py-24 px-8 bg-[#fdfdfd] font-sans">
      
      {/* Section Header */}
      <div className="text-center mb-[50px]">
        {/* Main Heading - Bold */}
        <h2 className="text-[2.2rem] md:text-[2.8rem] font-[800] text-[#0c4088] mb-3 leading-tight">
          Why Choose Career Point University?
        </h2>
        {/* Sub Heading - Very Light weight as per screenshot */}
        <p className="text-[1.1rem] text-[#333333] font-[300] max-w-3xl mx-auto tracking-wide">
          AI First B.Tech Program in collaboration with UGC/AICTE approved campuses
        </p>
      </div>

      {/* Grid Container */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[35px] mt-[30px] [perspective:1000px]">
        
        {featuresData.map((item) => (
          // Card Wrapper (Perspective for 3D)
          <div 
            key={item.id} 
            className="group relative h-[180px] cursor-pointer [perspective:1000px]"
          >
            {/* Card Inner (Handles Flip Animation) */}
            <div className="relative w-full h-full transition-transform duration-[600ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-[16px] shadow-[0_5px_20px_rgba(0,0,0,0.04)] group-hover:shadow-[0_10px_25px_rgba(34,172,209,0.15)]">
              
              {/* === FRONT FACE === */}
              <div className="absolute w-full h-full [backface-visibility:hidden] bg-white border border-[#e5e7eb] flex items-center px-[30px] py-[35px] rounded-[16px]">
                
                {/* Ribbon / Badge (Yellow) */}
                <div className="absolute -top-[12px] right-[30px] w-[42px] h-[50px] bg-[#f1bd0e] text-white flex justify-center items-center font-[800] text-[1.1rem] rounded-t-[4px] z-10 pb-[5px]">
                  {item.number}
                  
                  {/* Ribbon Cut Bottom */}
                  <div className="absolute -bottom-[14px] left-0 w-0 h-0 border-l-[21px] border-r-[21px] border-b-[15px] border-l-[#f1bd0e] border-r-[#f1bd0e] border-b-transparent"></div>
                  
                  {/* Ribbon Top-Left Fold Effect */}
                  <div className="absolute top-0 -left-[9px] w-0 h-0 border-b-[12px] border-l-[10px] border-b-[#c4980a] border-l-transparent -z-10"></div>
                </div>

                {/* Lucide Icon */}
                <div className="w-[60px] text-center shrink-0 flex justify-center items-center">
                  {item.icon}
                </div>

                {/* Divider Line & Title */}
                <div className="flex-1 pl-[25px] ml-[15px] border-l border-[#e0e0e0] font-[600] text-[1.15rem] text-[#111111] leading-[1.4]">
                  {item.title}
                </div>

              </div>

              {/* === BACK FACE === */}
              <div className="absolute w-full h-full [backface-visibility:hidden] bg-[#0c4088] text-white [transform:rotateY(180deg)] flex flex-col justify-center items-center p-[30px] text-center rounded-[16px] shadow-lg">
                <h4 className="text-[#f1bd0e] text-[1.15rem] font-[800] mb-[10px]">
                  {item.title}
                </h4>
                <p className="text-[0.95rem] text-[#ffffffd9] leading-[1.6] m-0 font-[300]">
                  {item.desc}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}