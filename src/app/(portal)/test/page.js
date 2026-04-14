<<<<<<< HEAD
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
            <button onClick={() => scrollAdvisors('prev')} className="absolute -left-4 top-1/2 -translate-y-12 bg-[#003b71] text-white p-3 rounded-md z-20 shadow-xl hover:bg-blue-900"><ChevronLeft size={24} /></button>
            <button onClick={() => scrollAdvisors('next')} className="absolute -right-4 top-1/2 -translate-y-12 bg-[#003b71] text-white p-3 rounded-md z-20 shadow-xl hover:bg-blue-900"><ChevronRight size={24} /></button>

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
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center"><Trophy size={14} className="text-[#003b71]" /></div>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center"><Shield size={14} className="text-[#003b71]" /></div>
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
=======
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
            <button onClick={() => scrollAdvisors('prev')} className="absolute -left-4 top-1/2 -translate-y-12 bg-[#003b71] text-white p-3 rounded-md z-20 shadow-xl hover:bg-blue-900"><ChevronLeft size={24} /></button>
            <button onClick={() => scrollAdvisors('next')} className="absolute -right-4 top-1/2 -translate-y-12 bg-[#003b71] text-white p-3 rounded-md z-20 shadow-xl hover:bg-blue-900"><ChevronRight size={24} /></button>

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
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center"><Trophy size={14} className="text-[#003b71]" /></div>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center"><Shield size={14} className="text-[#003b71]" /></div>
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
>>>>>>> e3ce85c226dfa631032ac93218a7411e90b17685
