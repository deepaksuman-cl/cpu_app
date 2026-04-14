'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Laptop, FlaskConical, Bot, Code2, Users, BookOpenCheck, UsersRound,
  Building2, TrendingUp, ChevronDown, ArrowRight, Phone, Star,
  FileText, Github, Rocket, Shield, ThumbsUp, ThumbsDown, GraduationCap,
  BookOpen, Briefcase, IndianRupee, University, Lightbulb, Globe,
  ArrowUp, Clock, MapPin, Award, CheckCircle2, ChevronLeft, ChevronRight, Trophy
} from 'lucide-react';

const DATA = {
  meta: {
    primaryColor: "#003b71",
    secondaryColor: "#ffcc00",
    batch: "2026"
  },
  hero: {
    badge: "AI-First Program · Batch 2026",
    title: "AI-First B.Tech in CS",
    tagline: "Learn AI. Build AI. Become AI-Ready.",
    stats: [
      { label: "Duration", value: "4 Years" },
      { label: "Degree", value: "B.Tech · UGC Recognised" },
      { label: "Campus", value: "Kota, Rajasthan" }
    ],
    specializations: ["🤖 AI & ML", "💻 Full Stack Dev", "🔐 Cyber Security"],
  },
  highlights: [
    { icon: Laptop, title: "Learn by Building", desc: "Future-proof curriculum with AI embedded from day one" },
    { icon: FlaskConical, title: "Industry Innovation Lab", desc: "India's only deep tech lab for UG with startup funding" },
    { icon: Bot, title: "AI First", desc: "Every semester built around real AI tools, APIs & projects" },
    { icon: Code2, title: "70% Coding", desc: "Hands-on coding from Day 1 - no theory overload" },
    { icon: Users, title: "250+ Partners", desc: "Hiring partners across India's top tech companies" }
  ],
  features: [
    { id: "01", icon: BookOpenCheck, title: "AI First Curriculum", desc: "Every course integrates AI tools and concepts from semester one. Build AI-powered projects that solve real problems." },
    { id: "02", icon: Code2, title: "Coding from Day One", desc: "No theory overload. 70% hands-on coding with industry-standard tools and practices from the start." },
    { id: "03", icon: UsersRound, title: "Learn from Industry experts", desc: "Learn from engineers at Google, Microsoft, and Amazon. Real insights, real experience, real connections." },
    { id: "04", icon: Building2, title: "Campus Built for Techies", desc: "AI-powered smart classrooms, 24/7 coding labs, high-speed internet. Spaces designed for innovation." },
    { id: "05", icon: TrendingUp, title: "Career Launch Ecosystem", desc: "250+ hiring partners, resume workshops, mock interviews. Your career journey starts from year one." },
    { id: "06", icon: Users, title: "Selective Peer Group", desc: "Rigorous CPUEST selection ensures you learn alongside motivated, talented future tech leaders." }
  ],
  advisors: [
    { name: "Shailendra Upadhyay", role: "B.Tech + M.Tech, IIT(BHU) Varanasi | AI Engineer at IBM", img: "https://cpur.in/lp/b-tech/assets/img/team/shailendraupadhyay.jpg" },
    { name: "Avinash Raju", role: "BE, University of Illinois Urbana-Champaign USA | AI and Tech Advisory at KPMG", img: "https://cpur.in/lp/b-tech/assets/img/team/Avinash%20Raju.jpg" },
    { name: "Davis Zhu", role: "AI Advisor Associated with KPMG USA", img: "https://cpur.in/lp/b-tech/assets/img/team/shailendraupadhyay.jpg" }, // Dummy fallback
    { name: "Pramod Maheshwari", role: "B.Tech., IIT Delhi | OPM, Harvard Business School | Founder-Career Point Group", img: "https://cpur.in/lp/b-tech/assets/img/team/pm-sir.jpg" },
    { name: "Puneet Sharma", role: "IIT Delhi | Ph.D., USC | HPE Fellow & VP – Hewlett Packard Enterprise", img: "https://cpur.in/lp/b-tech/assets/img/team/puneet-sharma.jpg" },
    { name: "Vidushi Maheshwari", role: "Georgia Tech | Software Engineer at Google", img: "https://cpur.in/lp/b-tech/assets/img/team/Vidushi%20Maheshwari.jpg" },
    { name: "Abhishek Soni", role: "IIT Delhi | Co-Founder & CEO, Upwards | Times 40U40", img: "https://cpur.in/lp/b-tech/assets/img/team/Abhishek%20Soni.jpg" }
  ],
  admission: {
    eligibility: "Class 10+2 with PCM and 50%+ marks. Admission via CPUEST and personal interview. Top 20-25% of applicants are selected.",
    steps: [
      { id: "01", title: "Register & Apply Online", desc: "Submit application with 10+2 marksheet and PCM details.", date: "Opens March 2025" },
      { id: "02", title: "Appear for CPUEST", desc: "Career Point Scholastic Aptitude Test — Maths, English & Aptitude. Online and on-campus at Kota.", date: "March 28, 2026" },
      { id: "03", title: "Personal Interview", desc: "Faculty panel interview — tests problem-solving ability and passion for building with technology." },
      { id: "04", title: "Counselling & Seat Confirmation", desc: "One-on-one counselling session. Submit documents and confirm your seat." }
    ]
  },
  placements: {
    pillars: [
      { icon: FileText, title: "Semester Assessments", desc: "Regular evaluations every semester to track your technical growth." },
      { icon: Code2, title: "Coding Tracking", desc: "We monitor your LeetCode & Codeforces to ensure consistent practice." },
      { icon: Github, title: "GitHub Tracking", desc: "Your projects are tracked on GitHub to build a recruiter-ready profile." },
      { icon: Rocket, title: "MAANG Ready", desc: "DSA bootcamps, mock interviews, and resume building workshops." }
    ]
  },
  comparison: [
    { label: "Internships & Jobs", cpu: "Internship-ready by Year 2 via 250+ partners", other: "<25% get internships by 3rd year" },
    { label: "AI Tools", cpu: "12+ AI tools in real projects from Sem 1", other: "Introduced in Year 3-4 as late elective" },
    { label: "Career Prep", cpu: "LeetCode/GitHub tracking from Week 1", other: "Prep begins only in final years" },
    { label: "Portfolio", cpu: "15 portfolio-grade deployed projects", other: "1-2 academic projects, rarely deployed" },
    { label: "Faculty", cpu: "Experts from Google, Amazon & Microsoft", other: "Academic-only, rarely updated curriculum" },
    { label: "Entrepreneurship", cpu: "₹1 Cr StartX fund & expert mentors", other: "Limited funding support available" },
    { label: "Exposure", cpu: "Frequent sessions with CTOs & VCs", other: "Limited to top performing students" }
  ],
  ctaBanner: {
    points: [
      "Understand the admission process step by step",
      "Explore scholarships — up to 100% tuition waiver",
      "Discover if CPU is the right fit for your goals",
      "Learn about AI-First B.Tech curriculum & career outcomes"
    ]
  },
  faq: {
    tabs: [
      { id: 'admission', label: 'Admission', icon: GraduationCap },
      { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
      { id: 'placements', label: 'Placements', icon: Briefcase },
      { id: 'fees', label: 'Fees & Scholarships', icon: IndianRupee },
      { id: 'campus', label: 'Campus & Life', icon: University }
    ],
    content: {
      admission: [
        { q: "What are the eligibility criteria for admission?", a: "You must have completed Class 10+2 with Physics, Chemistry & Mathematics (PCM) and secured a minimum of 50% marks. Only the top 20–25% of applicants are selected via CPUEST and a Personal Interview." },
        { q: "What is the CPUEST and how do I prepare for it?", a: "CPUEST (Career Point Scholastic Aptitude Test) covers Maths, English & Aptitude at Class 11–12 level. It is designed to test your core logic and problem-solving skills." }
      ],
      placements: [
        { 
          q: "What is the internship and placement track record?", 
          a: "Our placement ecosystem is designed for Day 1 readiness.",
          details: [
            { highlight: "93%", text: "of 2nd year students secured paid internships" },
            { highlight: "₹25,000/month", text: "Average internship stipend" },
            { highlight: "", text: "6-month formal internship in Year 3 with a partner company" },
            { highlight: "1000+", text: "hiring partner companies in the network" }
          ],
          comparison: "Compare this to Tier 1 colleges where fewer than 50% of students receive an internship by their 3rd year."
        }
      ],
      curriculum: [
        { q: "When does AI learning begin?", a: "AI learning starts from Day 1 of Semester 1. We integrate tools like Cursor, ChatGPT, and LangChain into every core coding subject." }
      ]
    }
  }
};

const FlipCard = ({ id, icon: Icon, title, desc }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="relative h-[220px] w-full cursor-pointer perspective-1000 group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white border border-slate-100 rounded-2xl p-8 flex items-center shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-10 bg-[#ffcc00] px-3 py-1 rounded-b-lg text-[12px] font-black text-[#003b71] z-10">
            {id}
          </div>
          <div className="flex items-center gap-6">
            <div className="bg-slate-50 p-4 rounded-xl group-hover:bg-[#003b71] group-hover:text-white transition-colors">
              <Icon size={32} className="text-[#003b71] group-hover:text-white" />
            </div>
            <div className="h-10 w-[2px] bg-slate-200"></div>
            <h4 className="text-xl font-bold text-[#003b71] leading-tight max-w-[150px]">{title}</h4>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#003b71] text-white rounded-2xl p-8 flex flex-col justify-center shadow-2xl">
           <h4 className="text-[#ffcc00] font-bold mb-3 text-lg">{title}</h4>
           <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeFaqTab, setActiveFaqTab] = useState('placements');
  const [openFaq, setOpenFaq] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const advisorContainerRef = useRef(null);

  // Admission Process scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const steps = document.querySelectorAll('.admission-step');
      steps.forEach((step, idx) => {
        const rect = step.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          setActiveStep(idx);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollAdvisors = (dir) => {
    if (advisorContainerRef.current) {
      const scrollAmount = 300;
      advisorContainerRef.current.scrollBy({ left: dir === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-yellow-200 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .hero-bg { background: radial-gradient(circle at top right, #005a9c, #003b71, #002244); }
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .advisor-card-mask { clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="hero-bg relative pt-20 pb-16 md:pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center relative z-10">
          <div className="md:col-span-7 text-white">
            <div className="inline-block bg-yellow-400/20 border border-yellow-400 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
              ✦ {DATA.hero.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6">
              <span className="text-yellow-400">AI-First</span><br />
              B.Tech in CS
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-medium mb-10">
              {DATA.hero.tagline}
            </p>
            <div className="flex flex-wrap gap-8 mb-10">
              {DATA.hero.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">{s.label}</p>
                  <p className="text-lg font-bold">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-950 px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-yellow-400/20 active:scale-95 uppercase text-sm tracking-wider">
                Apply Now
              </button>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
              <h3 className="text-white text-2xl font-bold text-center mb-8">Apply Now for {DATA.meta.batch}</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 transition-colors" />
                <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 transition-colors" />
                <input type="tel" placeholder="Mobile Number" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 transition-colors" />
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-bold py-4 rounded-xl transition-all uppercase text-sm tracking-widest">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- HIGHLIGHTS --- */}
      <section className="bg-[#003b71] py-12 px-4 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
          {DATA.highlights.map((h, i) => (
            <div key={i} className="text-center md:text-left space-y-3 p-4 rounded-2xl bg-white/5 border border-white/5 transition-transform hover:-translate-y-1">
              <h.icon className="text-yellow-400 w-8 h-8 mx-auto md:mx-0" />
              <h4 className="text-yellow-400 font-extrabold text-sm uppercase tracking-tight">{h.title}</h4>
              <p className="text-slate-300 text-xs leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- WHY CHOOSE CPU (FLIP CARDS) --- */}
      <section className="py-24 px-4 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-[#003b71] mb-6">Why Choose Career Point University?</h2>
            <p className="text-slate-500 font-medium">AI First B.Tech Program in collaboration with UGC/AICTE approved campuses</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {DATA.features.map((f) => (
              <FlipCard key={f.id} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* --- BOARD OF ADVISORS (SAME DESIGN AS IMAGE) --- */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-[#003b71] mb-4">Meet the Board of Advisors</h2>
            <p className="text-slate-500 max-w-3xl mx-auto leading-relaxed">
              An accomplished panel of entrepreneurs and AI practitioners with deep industry experience. They bridge the gap between academia and real-world technology.
            </p>
          </div>
          
          <div className="relative">
            <button onClick={() => scrollAdvisors('prev')} className="absolute -left-4 top-1/2 -translate-y-12 bg-[#003b71] text-white p-3 rounded-md z-20 shadow-xl hover:bg-blue-900"><ChevronLeft size={24}/></button>
            <button onClick={() => scrollAdvisors('next')} className="absolute -right-4 top-1/2 -translate-y-12 bg-[#003b71] text-white p-3 rounded-md z-20 shadow-xl hover:bg-blue-900"><ChevronRight size={24}/></button>
            
            <div ref={advisorContainerRef} className="flex gap-6 overflow-x-auto hide-scrollbar pb-12 snap-x px-4">
              {DATA.advisors.map((adv, idx) => (
                <div key={idx} className="min-w-[280px] md:min-w-[320px] bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden snap-start group">
                  <div className="h-44 bg-[#003b71] relative flex items-center justify-center">
                    <div className="absolute top-10 w-44 h-44 bg-white rounded-3xl shadow-xl overflow-hidden p-1 border-2 border-slate-50 transform group-hover:scale-105 transition-transform">
                      <img src={adv.img} alt={adv.name} className=" h-full object-cover object-top rounded-2xl grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                  </div>
                  <div className="pt-24 pb-10 px-6 text-center">
                    <h4 className="text-xl font-black text-[#003b71] mb-2">{adv.name}</h4>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6 px-4">{adv.role}</p>
                    <div className="flex justify-center gap-3 opacity-60">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center"><Trophy size={14} className="text-[#003b71]"/></div>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center"><Shield size={14} className="text-[#003b71]"/></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- ADMISSION PROCESS (VERTICAL TIMELINE) --- */}
      <section className="py-24 px-4 bg-slate-50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div className="sticky top-24 self-start">
              <h2 className="text-5xl font-black text-[#003b71] mb-12">How to join</h2>
              <div className="bg-[#003b71] text-white p-10 rounded-3xl shadow-2xl relative">
                <div className="flex items-center gap-3 text-yellow-400 font-black mb-6 uppercase tracking-wider">
                  <CheckCircle2 size={24} /> Eligibility
                </div>
                <p className="text-slate-200 text-lg leading-relaxed mb-8">
                  {DATA.admission.eligibility}
                </p>
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group">
                  Apply Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="relative">
              {/* Central Line */}
              <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-slate-200 z-0">
                <div 
                  className="absolute top-0 left-0 w-full bg-[#ffcc00] transition-all duration-300" 
                  style={{ height: `${(activeStep + 1) * 25}%` }} 
                />
              </div>

              <div className="space-y-16">
                {DATA.admission.steps.map((step, idx) => (
                  <div key={idx} className={`admission-step relative z-10 flex gap-10 transition-all duration-500 ${activeStep >= idx ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black border-4 transition-all ${activeStep >= idx ? 'bg-[#ffcc00] border-[#ffcc00] text-[#003b71]' : 'bg-white border-slate-200 text-slate-300'}`}>
                      {step.id}
                    </div>
                    <div className={`flex-1 bg-white p-8 rounded-2xl border-2 shadow-sm transition-all ${activeStep === idx ? 'border-[#ffcc00] shadow-xl -translate-y-2' : 'border-transparent'}`}>
                      <h4 className="text-2xl font-black text-[#003b71] mb-4">{step.title}</h4>
                      <p className="text-slate-500 text-sm leading-loose mb-4">{step.desc}</p>
                      {step.date && (
                        <div className="text-blue-600 font-bold text-sm tracking-wider uppercase">{step.date}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PLACEMENT ECOSYSTEM --- */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black text-[#003b71] mb-4">Placement Ecosystem</h2>
          <p className="text-slate-500 mb-16">Your career journey starts from Day 1 — not in the final year</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
            {DATA.placements.pillars.map((p, i) => (
              <div key={i} className="bg-white border border-slate-100 p-8 rounded-3xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="bg-yellow-100 text-yellow-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-400 group-hover:text-[#003b71] transition-all">
                  <p.icon size={24} />
                </div>
                <h4 className="text-[#003b71] font-bold text-sm mb-3">{p.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Partners Logos Placeholder */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 grayscale opacity-40 items-center border-t border-slate-100 pt-16">
            <span className="text-2xl font-black tracking-tighter">TATA</span>
            <span className="text-2xl font-black tracking-tighter">Infosys</span>
            <span className="text-2xl font-black tracking-tighter">BAJAJ</span>
            <span className="text-2xl font-black tracking-tighter">Microsoft</span>
          </div>
        </div>
      </section>

      {/* --- COMPARISON TABLE --- */}
      <section className="py-24 px-4 bg-[#003b71]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-16">CPU Curated vs Traditional College Experience</h2>
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_1fr] bg-white/5 border-b border-white/10 hidden md:grid">
              <div className="p-6"></div>
              <div className="p-6 bg-yellow-400 text-[#003b71] font-black text-center flex items-center justify-center gap-2">
                <Shield size={18} /> Career Point University
              </div>
              <div className="p-6 text-yellow-400 font-black text-center">Other Colleges</div>
            </div>
            {/* Rows */}
            {DATA.comparison.map((row, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[250px_1fr_1fr] border-b border-white/10 bg-white/5 group hover:bg-white/10 transition-colors">
                <div className="p-6 text-yellow-400 font-bold text-xs flex items-center gap-3 border-r border-white/5 md:bg-transparent bg-blue-900/50">
                   <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0"></div> {row.label}
                </div>
                <div className="p-6 bg-yellow-400 text-[#003b71] text-sm font-semibold flex items-start gap-3">
                  <ThumbsUp size={16} className="mt-1 flex-shrink-0" /> {row.cpu}
                </div>
                <div className="p-6 text-slate-300 text-sm flex items-start gap-3">
                  <ThumbsDown size={16} className="mt-1 flex-shrink-0 text-yellow-400/50" /> {row.other}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto bg-[#003b71] rounded-[40px] overflow-hidden flex flex-col md:flex-row relative group shadow-2xl">
          <div className="p-12 md:p-16 flex-1 text-white relative z-10">
            <h2 className="text-3xl font-black mb-6 leading-tight">Plan your next step with confidence</h2>
            <p className="text-slate-300 mb-8">Connect with our Admission Counsellor to:</p>
            <ul className="space-y-4 mb-10">
              {DATA.ctaBanner.points.map((txt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium">
                  <Star size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" /> {txt}
                </li>
              ))}
            </ul>
            <button className="bg-white text-[#003b71] hover:bg-yellow-400 hover:text-[#003b71] px-10 py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest shadow-lg">
              <Phone size={18} /> Request Callback
            </button>
          </div>
          <div className="md:w-1/3 bg-yellow-400 flex items-center justify-center relative min-h-[300px]">
            {/* Circle Cutout Effect */}
            <div className="absolute -left-20 inset-y-0 w-40 bg-yellow-400 rounded-full scale-y-125 hidden md:block"></div>
            <div className="z-10 text-center">
               <GraduationCap size={100} className="text-[#003b71] mx-auto mb-4" />
               <p className="font-black text-[#003b71] text-2xl tracking-tighter uppercase">Join The Future</p>
               <p className="text-[#003b71]/80 font-bold tracking-widest">BATCH 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION (FUNCTIONAL TABS) --- */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-[#003b71] mb-6 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-500 font-medium">Everything you need to know about CPU's AI-First B.Tech before you take the next step.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16 overflow-x-auto pb-4">
            {DATA.faq.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveFaqTab(tab.id); setOpenFaq(0); }}
                className={`flex items-center gap-3 px-8 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap border-2 ${activeFaqTab === tab.id ? 'bg-[#003b71] border-[#003b71] text-white shadow-xl' : 'bg-white border-slate-100 text-[#003b71] hover:border-[#003b71]'}`}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {(DATA.faq.content[activeFaqTab] || []).map((faq, idx) => (
              <div key={idx} className="bg-[#f8faff] rounded-[32px] overflow-hidden border border-slate-100">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-8 text-left flex justify-between items-center group"
                >
                  <span className="text-xl font-black text-[#003b71] group-hover:text-blue-600 transition-colors">{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openFaq === idx ? 'bg-[#ffcc00] text-[#003b71] rotate-180' : 'bg-slate-200 text-slate-500'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                
                <div className={`transition-all duration-300 overflow-hidden ${openFaq === idx ? 'max-h-[1000px] border-t border-slate-100' : 'max-h-0'}`}>
                  <div className="p-8 space-y-8">
                    <p className="text-slate-600 leading-relaxed font-medium">{faq.a}</p>
                    
                    {faq.details && (
                      <div className="grid gap-4">
                        {faq.details.map((d, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-[#ffcc00]" />
                            {d.highlight && <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg text-sm font-black border border-yellow-200">{d.highlight}</span>}
                            <span className="text-slate-500 text-sm font-semibold">{d.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {faq.comparison && (
                      <div className="mt-8 p-6 bg-white border-l-4 border-blue-900 rounded-xl flex gap-4 items-start shadow-sm">
                        <Trophy className="text-blue-900 flex-shrink-0" size={24} />
                        <p className="text-slate-500 text-sm font-medium italic">{faq.comparison}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll to Top */}
      {true && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-10 right-10 bg-[#ffcc00] text-[#003b71] p-4 rounded-full shadow-2xl z-50 hover:scale-110 active:scale-95 transition-all"><ArrowUp size={24} /></button>
      )}
    </div>
  );
}