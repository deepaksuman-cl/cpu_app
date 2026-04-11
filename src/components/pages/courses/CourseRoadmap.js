"use client"
import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';

// ==========================================
// 1. DEFAULT DATA (DO NOT MODIFY - For Admin Panel)
// ==========================================
const defaultConfig = {
  sectionTitle: "Career Point University 4 Year Learning Roadmap",
  labels: {
    whatYouWillLearn: "What you'll learn",
    aiTools: "AI Tools & Technologies",
    inClassroom: "In Classroom Concepts",
    projects: "Projects You'll Work On",
    viewAllSubjects: "View All Subjects"
  }
};

const fallbackYears = [
  {
    id: "1", tabLabel: "YEAR 1", tabTitle: "Foundation", contentTitle: "AI Foundations", contentDesc: "Learn by building from day 1, strengthening your foundations in core CS concepts and AI thinking.", badge: "YEAR-1",
    skills: ["Advanced Legal Drafting", "Courtroom Advocacy", "Arbitration & Mediation", "C++", "HTML & CSS"],
    aiTools: [
      { name: "ChatGPT", desc: "Prompt engineering & AI-assisted learning", iconName: "fa-robot", iconColor: "#10a37f" },
      { name: "Notion AI", desc: "Smart documentation & notes", iconName: "fa-file-lines", iconColor: "#000" }
    ],
    concepts: [
      { title: "Data Structures & Algorithms", desc: "Unlock the building blocks of any form of programming", emoji: "🖥️" },
      { title: "Web Development", desc: "Learn to build modern, fully functional websites from scratch", emoji: "🌐" },
      { title: "Core Maths", desc: "Explore the math behind computers and how 1s and 0s come to life", emoji: "📐" }
    ],
    projects: [
      { name: "Personal Portfolio Website", desc: "Design and build your developer portfolio from scratch", companies: "Google · Airbnb · Stripe", accentColor: "rgb(60, 204, 139)" },
      { name: "E-Commerce Product Page", desc: "Build a fully responsive product showcase with cart functionality", companies: "Amazon · Flipkart · Shopify", accentColor: "rgb(59, 195, 226)" },
      { name: "AI-Powered Quiz App", desc: "Create an interactive quiz app using ChatGPT API", companies: "Duolingo · Quizlet · Khan Academy", accentColor: "rgb(252, 192, 50)" },
      { name: "Task Management Dashboard", desc: "Full-stack CRUD app with React and local storage", companies: "Notion · Asana · Trello", accentColor: "rgb(34, 172, 209)" }
    ],
    subjects: [
      "Programming Fundamentals (C++)", "Web Essentials (HTML, CSS, JS)", "Discrete Mathematics", 
      "Computer Organization", "Data Structures & Algorithms I", "Frontend Development (React.js)", 
      "Probability & Statistics", "Communication Skills"
    ]
  },
  {
    id: "2", tabLabel: "YEAR 2", tabTitle: "Development", contentTitle: "Building AI Products", contentDesc: "Go deeper into backend systems, databases, and start your AI engineering journey with hands-on LLM projects.", badge: "YEAR-2",
    skills: ["Node.js", "MongoDB", "SQL", "Java", "REST APIs", "Express.js", "LLM APIs", "Agile"],
    aiTools: [
      { name: "Google Gemini API", desc: "Build applications powered by Gemini", iconName: "fa-brain", iconColor: "#4285f4" },
      { name: "OpenAI API", desc: "Integrate GPT models into your apps", iconName: "fa-bolt", iconColor: "#000" },
      { name: "Hugging Face", desc: "Access pre-trained AI models", iconName: "fa-face-smile", iconColor: "#ffd21e" }
    ],
    concepts: [
      { title: "Backend Engineering", desc: "Build scalable server-side applications and REST APIs", emoji: "⚙️" },
      { title: "AI Engineering with LLMs", desc: "Learn to build AI-powered products using large language models", emoji: "🤖" },
      { title: "Database Systems", desc: "Master SQL, NoSQL, and data modeling for real applications", emoji: "🗄️" }
    ],
    projects: [
      { name: "Social Media Platform", desc: "Full-stack social app with feeds, auth, and real-time features", companies: "Meta · Twitter · LinkedIn", accentColor: "rgb(59, 195, 226)" },
      { name: "AI Chatbot Assistant", desc: "Build a conversational AI bot using OpenAI API & LangChain", companies: "OpenAI · Intercom · Drift", accentColor: "rgb(252, 192, 50)" },
      { name: "Food Ordering System", desc: "End-to-end food delivery app with payment integration", companies: "Zomato · Swiggy · DoorDash", accentColor: "rgb(60, 204, 139)" },
      { name: "GenAI-Powered CRM", desc: "Build an AI CRM that auto-generates customer insights", companies: "Salesforce · HubSpot · Zoho", accentColor: "rgb(34, 172, 209)" }
    ],
    subjects: [
      "Object Oriented Programming (Java)", "Data Structures & Algorithms II", "Backend Development (Node.js)",
      "Database Management Systems", "Operating Systems", "AI Engineering with LLMs", 
      "Computer Networks", "API Design & Microservices"
    ]
  },
  {
    id: "3", tabLabel: "YEAR 3", tabTitle: "AI Immersed Learning", contentTitle: "Scaling AI Systems", contentDesc: "Dive deep into AI/ML, system design, and cloud — while gaining real industry exposure through internships.", badge: "YEAR-3",
    skills: ["TensorFlow", "PyTorch", "AWS", "Docker", "Kubernetes", "System Design", "NLP"],
    aiTools: [
      { name: "TensorFlow", desc: "Build & train production ML models", iconName: "fa-network-wired", iconColor: "#ff6f00" },
      { name: "Stable Diffusion", desc: "Generate images with AI diffusion models", iconName: "fa-image", iconColor: "#8b5cf6" },
      { name: "AutoML", desc: "Automated machine learning pipelines", iconName: "fa-gears", iconColor: "#0ea5e9" }
    ],
    concepts: [
      { title: "Machine Learning & Deep Learning", desc: "Build intelligent systems that learn from data", emoji: "🧠" },
      { title: "System Design", desc: "Architect scalable, distributed systems like the pros", emoji: "🏗️" },
      { title: "DevOps & Cloud", desc: "Deploy, monitor, and scale applications on AWS", emoji: "☁️" }
    ],
    projects: [
      { name: "AI Image Generator", desc: "Build a Stable Diffusion-powered image generation tool", companies: "Midjourney · Adobe · Canva", accentColor: "rgb(252, 192, 50)" },
      { name: "Video Streaming Platform", desc: "Netflix-like app with adaptive streaming and recommendations", companies: "Netflix · YouTube · Hotstar", accentColor: "rgb(59, 195, 226)" },
      { name: "Real-time Chat Application", desc: "WebSocket-based chat with AI-powered smart replies", companies: "Slack · Discord · WhatsApp", accentColor: "rgb(60, 204, 139)" },
      { name: "ML Model Deployment Pipeline", desc: "End-to-end MLOps pipeline on AWS with CI/CD", companies: "Google · Amazon · Microsoft", accentColor: "rgb(34, 172, 209)" }
    ],
    subjects: [
      "System Design & Architecture", "DevOps & Cloud Computing (AWS)", "Machine Learning Fundamentals",
      "Natural Language Processing", "Entrepreneurship & Product Thinking", "Software Engineering & Testing",
      "Computer Vision"
    ]
  },
  {
    id: "4", tabLabel: "YEAR 4", tabTitle: "Career Ready", contentTitle: "Autonomous AI & Future", contentDesc: "Get placement-ready with intensive bootcamps, capstone projects, and real-world industry immersion.", badge: "YEAR-4",
    skills: ["System Design", "Selenium", "CI/CD", "Git", "Interview Prep", "Portfolio Dev", "Leadership"],
    aiTools: [
      { name: "Claude AI", desc: "Advanced AI reasoning & code generation", iconName: "fa-message", iconColor: "#d97757" },
      { name: "Cursor", desc: "AI-first code editor for 10x productivity", iconName: "fa-terminal", iconColor: "#000" },
      { name: "Vercel AI SDK", desc: "Build & deploy AI-powered web apps", iconName: "fa-triangle-exclamation", iconColor: "#000" }
    ],
    concepts: [
      { title: "Placement Bootcamps", desc: "Intensive interview prep with mock drives and DSA drills", emoji: "🎯" },
      { title: "AI Product Development", desc: "Build and ship a complete AI product from idea to launch", emoji: "🚀" },
      { title: "Industry Capstone", desc: "Work on a real company problem as your final project", emoji: "💼" }
    ],
    projects: [
      { name: "AI Code Assistant", desc: "Build an intelligent coding assistant like GitHub Copilot", companies: "GitHub · Cursor · Replit", accentColor: "rgb(252, 192, 50)" },
      { name: "Job Portal Platform", desc: "Full-stack job board with AI-powered resume matching", companies: "LinkedIn · Naukri · Indeed", accentColor: "rgb(59, 195, 226)" },
      { name: "Final Capstone Project", desc: "Industry-grade project solving a real business problem", companies: "Google · Razorpay · Zerodha", accentColor: "rgb(60, 204, 139)" }
    ],
    subjects: [
      "Software Quality Assurance", "AI Product Development", "Placement Bootcamp II", 
      "Interview Preparation", "Portfolio Development", "Capstone Project"
    ]
  }
];

// ==========================================
// 1.5. HELPER COMPONENTS
// ==========================================
const DynamicIcon = ({ icon, color, size = 18 }) => {
  if (!icon) return null;

  if (typeof icon === 'string' && icon.startsWith('fa-')) {
    return (
      <i 
        className={`fa-solid ${icon} block`} 
        style={{ color: color, fontSize: `${size}px` }}
      ></i>
    );
  }

  const LucideIcon = LucideIcons[icon];
  if (LucideIcon) {
    return (
      <div className="block" style={{ color: color }}>
        <LucideIcon size={size} strokeWidth={2.5} />
      </div>
    );
  }

  return <span className="block" style={{ fontSize: `${size}px` }}>{icon}</span>;
};

// ==========================================
// 2. MAIN REACT COMPONENT
// ==========================================
export default function CourseRoadmap({ data }) {
  const roadmapData = data && !Array.isArray(data) ? data : { years: data || [] };
  const yearsData = roadmapData.years && roadmapData.years.length > 0 ? roadmapData.years : fallbackYears;
  
  const titleData = roadmapData.sectionTitle || {};
  const displayTitle = titleData.main ? titleData.main : "The Curriculum";
  const highlightText = titleData.highlight || "";
  const subtitleText = roadmapData.subtitle || "8 semesters of hands-on learning. Designed by AI researchers. Updated annually.";
  
  const getInitialActive = () => yearsData[0]?.id || 0;
  const [activeYear, setActiveYear] = useState(getInitialActive());
  const [expandedSubjects, setExpandedSubjects] = useState({});

  useEffect(() => {
    // Inject FontAwesome securely
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    if (!document.head.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link);
    }

    // Flawless Scroll Tracker using invisible anchors
    const handleScroll = () => {
      // Adjusted offset to match the new lowered positioning
      const stickyOffset = 120; 
      let currentActive = activeYear;

      yearsData.forEach((year) => {
        const anchor = document.getElementById(`anchor-${year.id}`);
        if (anchor) {
          const rect = anchor.getBoundingClientRect();
          if (rect.top <= stickyOffset + 20) {
            currentActive = year.id;
          }
        }
      });
      
      if (currentActive !== activeYear) {
         setActiveYear(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [yearsData, activeYear]);

  // SMART TOGGLE: Auto-scrolls internal card content so View All Subjects is never hidden
  const toggleSubjects = (id) => {
    setExpandedSubjects(prev => {
      const isExpanding = !prev[id];
      
      if (isExpanding) {
        setTimeout(() => {
          // Scroll the inner card container to the bottom so the accordion is fully visible
          const innerCard = document.getElementById(`card-inner-${id}`);
          if (innerCard) {
            innerCard.scrollTo({
              top: innerCard.scrollHeight,
              behavior: 'smooth'
            });
          }
          
          // Also gently align the main window if it's slightly off
          const anchor = document.getElementById(`anchor-${id}`);
          if (anchor) {
            const offsetPosition = anchor.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100); 
      }
      
      return { ...prev, [id]: isExpanding };
    });
  };

  const handleTabClick = (e, id) => {
    e.preventDefault();
    const anchor = document.getElementById(`anchor-${id}`);
    if (anchor) {
      const offsetPosition = anchor.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetPosition, 
        behavior: 'smooth'
      });
    }
  };

  if (!yearsData || yearsData.length === 0) return null;

  return (
    <section id="curriculum" className="py-16 md:py-24 px-4 md:px-8 bg-gray-50 font-sans text-[#0c4088]">
      <div className="max-w-6xl mx-auto mb-12 text-center lg:text-left lg:ml-[280px]">
        <span className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-2 block">
          4-Year Journey
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0c4088] mb-3 leading-tight tracking-tight">
          {displayTitle} <span className="text-[#f1bd0e]">{highlightText}</span>
        </h2>
        {subtitleText && <p className="text-gray-600 text-[15px] max-w-2xl mx-auto lg:mx-0">{subtitleText}</p>}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 max-w-6xl mx-auto relative">
        
        {/* ==========================================
            LEFT SIDEBAR (STICKY TRACKER)
            LOWERED to top-[130px] for better centering
            ========================================== */}
        <div className="w-full lg:w-[240px] flex-shrink-0 z-50">
          <div className="sticky top-[130px] bg-gray-50/95 lg:bg-transparent backdrop-blur-sm py-4 lg:py-0 w-full -mx-4 px-4 lg:mx-0 lg:px-0">
            <div className="flex flex-row lg:flex-col gap-1 lg:gap-3 overflow-x-auto lg:overflow-visible hide-scrollbar border-l-0 lg:border-l-[2px] lg:border-gray-200 lg:pl-5 relative">
              
              {yearsData.map((year) => {
                const isActive = activeYear === year.id;
                
                return (
                  <a
                    key={`tab-${year.id}`}
                    href={`#anchor-${year.id}`}
                    onClick={(e) => handleTabClick(e, year.id)}
                    className={`group flex flex-col cursor-pointer transition-all duration-300 ease-in-out no-underline relative pr-6 lg:pr-0 lg:pl-2 py-2 whitespace-nowrap lg:whitespace-normal
                    ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  >
                    {/* Desktop Active Line Indicator */}
                    <div className={`hidden lg:block absolute left-[-22px] top-0 bottom-0 w-[3px] rounded-r-full transition-all duration-300 ease-out ${isActive ? 'bg-[#f1bd0e] h-full' : 'bg-transparent h-0 group-hover:h-1/2 group-hover:bg-gray-300'}`}></div>
                    
                    {/* Mobile Bottom Line Indicator */}
                    <div className={`block lg:hidden absolute left-0 right-5 bottom-0 h-[3px] rounded-full transition-all duration-300 ${isActive ? 'bg-[#f1bd0e] w-full' : 'bg-transparent w-0'}`}></div>

                    <span className={`text-[11px] font-extrabold uppercase tracking-widest mb-1 transition-colors ${isActive ? 'text-[#f1bd0e]' : 'text-gray-500'}`}>
                      {year.tabLabel || year.yearLabel}
                    </span>
                    <span className={`text-[15px] font-bold transition-colors leading-snug ${isActive ? 'text-[#0c4088]' : 'text-gray-600'}`}>
                      {year.tabTitle}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==========================================
            RIGHT CONTENT (FLAWLESS STACKING CARDS)
            ========================================== */}
        <div className="flex-1 w-full min-w-0 flex flex-col relative pb-[20vh]">
          {yearsData.map((year, idx) => {
            
            return (
              <React.Fragment key={`fragment-${year.id}`}>
                
                {/* INVISIBLE ANCHOR */}
                <div id={`anchor-${year.id}`} className="w-full h-0 pointer-events-none"></div>

                <div 
                  id={`card-${year.id}`}
                  // Card sticks at top-[110px] providing spacing matching the lowered left menu
                  className="sticky-card sticky top-[110px] w-full mb-[20vh] transition-all duration-500"
                  style={{ zIndex: 10 + idx }}
                >
                  
                  {/* INNER CARD WRAPPER: Handles viewport clipping gracefully */}
                  {/* max-h calculates screen height minus top/bottom space, allowing internal scroll if needed */}
                  <div 
                    id={`card-inner-${year.id}`}
                    className="card-inner bg-white rounded-2xl border border-gray-100 overflow-y-auto hide-scrollbar w-full flex flex-col"
                    style={{ 
                      maxHeight: 'calc(100vh - 130px)',
                      boxShadow: idx > 0 ? "0 -15px 30px -10px rgba(0,0,0,0.06)" : "0 5px 20px rgba(0,0,0,0.03)"
                    }}
                  >
                    
                    <div className="p-5 md:p-7 w-full flex flex-col gap-5">
                      
                      {/* Header */}
                      <div className="flex flex-col md:flex-row items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#0c4088] text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-inner">
                          {idx + 1}
                        </div>
                        <div className="pt-1">
                          <h3 className="text-xl md:text-2xl font-extrabold text-[#0c4088] mb-1.5 tracking-tight">
                            {year.contentTitle || year.mainHeading}
                          </h3>
                          <p className="text-gray-600 text-sm md:text-[14px] leading-relaxed m-0 max-w-2xl">
                            {year.contentDesc || year.description}
                          </p>
                        </div>
                      </div>

                      {/* Compact Skills Pills */}
                      {year.skills && year.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {year.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="bg-gray-100/80 px-3 py-1.5 rounded-md text-[12px] font-semibold text-[#0c4088] border border-gray-200/60 cursor-default hover:bg-gray-200 transition-colors">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Grid Layout for Concepts & Tools */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                        
                        {/* Concepts Column */}
                        {year.concepts && year.concepts.length > 0 && (
                          <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4 md:p-5">
                            <h4 className="text-[11px] font-bold text-[#0c4088] mb-3 uppercase tracking-widest flex items-center gap-2">
                              <LucideIcons.BookOpen size={13} className="text-[#22acd1]" /> 
                              {defaultConfig.labels.inClassroom}
                            </h4>
                            <div className="flex flex-col gap-3">
                              {year.concepts.map((concept, cIdx) => (
                                <div key={cIdx} className="flex items-start gap-3">
                                  <div className="mt-0.5 bg-white p-1.5 rounded-md border border-gray-200 shadow-sm shrink-0">
                                    <DynamicIcon icon={concept.icon || concept.emoji} size={15} />
                                  </div>
                                  <div>
                                    <h5 className="font-bold text-[#0c4088] text-[13px] mb-0.5 leading-tight">{concept.title}</h5>
                                    <p className="text-[12px] text-gray-500 m-0 leading-snug">{concept.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* AI Tools Column */}
                        {year.aiTools && year.aiTools.length > 0 && (
                          <div className="bg-[#fffdf8] border border-[#fef1c7] rounded-xl p-4 md:p-5">
                            <h4 className="text-[11px] font-bold text-[#0c4088] mb-3 uppercase tracking-widest flex items-center gap-2">
                              <LucideIcons.Sparkles size={13} className="text-[#f1bd0e]" /> 
                              {defaultConfig.labels.aiTools}
                            </h4>
                            <div className="flex flex-col gap-3">
                              {year.aiTools.map((tool, tIdx) => (
                                <div key={tIdx} className="flex items-start gap-3">
                                  <div className="mt-0.5 bg-white p-1.5 rounded-md border border-gray-200 shadow-sm shrink-0">
                                    <DynamicIcon icon={tool.icon || tool.iconName} color={tool.color || tool.iconColor} size={15} />
                                  </div>
                                  <div>
                                    <span className="font-bold text-[#0c4088] text-[13px] block mb-0.5 leading-tight">{tool.name}</span>
                                    <span className="text-[12px] text-gray-500 block leading-snug">{tool.desc}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Outcomes Section */}
                      {year.projects && year.projects.length > 0 && (
                        <div className="bg-[#0c4088] rounded-xl p-4 md:p-5 text-white relative overflow-hidden mt-1">
                          <div className="absolute top-0 left-0 w-full h-1 bg-[#f1bd0e]"></div>

                          <h4 className="text-[10px] font-bold text-[#f1bd0e] mb-3 uppercase tracking-[0.15em] flex items-center gap-1.5">
                            <LucideIcons.Trophy size={13} /> YEAR {year.id || idx + 1} OUTCOMES
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {year.projects.map((project, pIdx) => (
                              <div key={pIdx} className="bg-white/10 border border-white/10 p-3 rounded-lg">
                                <h5 className="font-bold text-white text-[13px] mb-1.5 leading-tight">{project.name}</h5>
                                <p className="text-[12px] text-blue-100/70 mb-2.5 leading-snug line-clamp-2">{project.desc}</p>
                                <span className="inline-block px-2 py-1 bg-white/5 rounded text-[9px] font-semibold text-[#f1bd0e] uppercase tracking-wider">{project.companies}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Expandable View All Subjects */}
                      {year.subjects && year.subjects.length > 0 && (
                        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden mt-1 shrink-0">
                          <div 
                            className="flex justify-between items-center px-5 py-3.5 cursor-pointer font-medium text-[#0c4088] hover:bg-gray-50 transition-colors" 
                            onClick={() => toggleSubjects(year.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="opacity-40"><LucideIcons.List size={16} /></div>
                              <span className="text-[13.5px] font-semibold">{defaultConfig.labels.viewAllSubjects}</span>
                            </div>
                            <LucideIcons.ChevronDown size={18} className={`transition-transform duration-300 text-gray-400 ${expandedSubjects[year.id] ? 'rotate-180' : ''}`} />
                          </div>
                          
                          <div 
                            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${expandedSubjects[year.id] ? 'grid-rows-[1fr] border-t border-gray-100' : 'grid-rows-[0fr]'}`}
                          >
                            <div className="overflow-hidden">
                              <div className="p-4 bg-gray-50/30">
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 list-none m-0">
                                  {year.subjects.map((subject, subIdx) => (
                                    <li key={subIdx} className="text-[12px] text-gray-600 flex items-start gap-2 font-medium">
                                      <span className="text-gray-300 font-bold mt-0.5 text-sm leading-none">|</span>
                                      {subject}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        html {
          scroll-behavior: smooth;
        }

        /* Smooth scroll for the inner cards */
        .card-inner {
          scroll-behavior: smooth;
        }

        /* Mobile specific adjustments where stacking doesn't make sense */
        @media (max-width: 768px) {
          .sticky-card {
             position: relative !important;
             top: 0 !important;
             margin-bottom: 24px !important;
          }
          .card-inner {
             max-height: none !important;
             overflow-y: visible !important;
             box-shadow: 0 4px 15px rgba(0,0,0,0.03) !important;
          }
        }
      `}</style>
    </section>
  );
}