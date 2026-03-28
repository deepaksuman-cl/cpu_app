"use client"
import { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';

// ==========================================
// 1. DEFAULT DATA (Fallback)
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
    id: "1", tabLabel: "YEAR 1", tabTitle: "Foundation", contentTitle: "Build", contentDesc: "Learn by building from day 1, strengthening your foundations in core CS concepts and AI thinking.", badge: "YEAR-1",
    skills: ["C++", "HTML", "CSS", "JavaScript", "Git & GitHub", "VS Code", "Figma Basics", "Command Line", "Linux Basics"],
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
    id: "2", tabLabel: "YEAR 2", tabTitle: "Development", contentTitle: "Develop", contentDesc: "Go deeper into backend systems, databases, and start your AI engineering journey with hands-on LLM projects.", badge: "YEAR-2",
    skills: ["Node.js", "MongoDB", "SQL", "Java", "REST APIs", "Express.js", "LLM APIs", "Postman", "Docker Basics", "Agile"],
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
    id: "3", tabLabel: "YEAR 3", tabTitle: "AI Immersed Learning", contentTitle: "Specialize", contentDesc: "Dive deep into AI/ML, system design, and cloud — while gaining real industry exposure through internships.", badge: "YEAR-3",
    skills: ["TensorFlow", "PyTorch", "AWS", "Docker", "Kubernetes", "System Design", "NLP", "Computer Vision", "MLOps", "CI/CD", "Redis", "GraphQL"],
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
    id: "4", tabLabel: "YEAR 4", tabTitle: "Career Ready", contentTitle: "Launch", contentDesc: "Get placement-ready with intensive bootcamps, capstone projects, and real-world industry immersion.", badge: "YEAR-4",
    skills: ["System Design", "Selenium", "CI/CD", "Git", "Interview Prep", "Portfolio Dev", "Leadership", "AI Product Mgmt", "QA Testing", "Agile/Scrum"],
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
const DynamicIcon = ({ icon, color, size = 26 }) => {
  if (!icon) return null;

  // Handle FontAwesome (starts with fa-)
  if (typeof icon === 'string' && icon.startsWith('fa-')) {
    return (
      <i 
        className={`fa-solid ${icon} mb-2.5 block`} 
        style={{ color: color, fontSize: typeof size === 'number' ? `${size}px` : size }}
      ></i>
    );
  }

  // Handle Lucide Icons
  const LucideIcon = LucideIcons[icon];
  if (LucideIcon) {
    return (
      <div className="mb-2.5 block" style={{ color: color }}>
        <LucideIcon size={size} strokeWidth={2.5} />
      </div>
    );
  }

  // Fallback to text/emoji
  return <span className="mb-2.5 block" style={{ fontSize: typeof size === 'number' ? `${size}px` : size }}>{icon}</span>;
};

// ==========================================
// 2. REACT COMPONENT
// ==========================================
export default function CourseRoadmap({ data }) {
  // Handle both old array format and new object format
  const roadmapData = data && !Array.isArray(data) ? data : { years: data || [] };
  const yearsData = roadmapData.years && roadmapData.years.length > 0 ? roadmapData.years : fallbackYears;
  
  // Dynamic Titles
  const titleData = roadmapData.sectionTitle || {};
  const displayTitle = titleData.main ? titleData.main : defaultConfig.sectionTitle;
  const highlightText = titleData.highlight || "";
  const subtitleText = roadmapData.subtitle || "";
  
  // Set initial active state based on either string ID or numeric index
  const getInitialActive = () => yearsData[0]?.id || 0;
  const [activeYear, setActiveYear] = useState(getInitialActive());
  const [expandedSubjects, setExpandedSubjects] = useState({});

  useEffect(() => {
    // Ensure FontAwesome is available
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    if (!document.head.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link);
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      yearsData.forEach((year, idx) => {
        const idToMatch = year.id || idx;
        const el = document.getElementById(`content-year-${idToMatch}`);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveYear(idToMatch);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [yearsData]);

  const handleTabClick = (e, id) => {
    e.preventDefault();
    setActiveYear(id);
    const target = document.getElementById(`content-year-${id}`);
    if (target) {
         window.scrollTo({
        top: target.offsetTop - 140, // Match your original offset
        behavior: 'smooth'
      });
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleSubjects = (id) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!yearsData || yearsData.length === 0) return null;

  return (
    <section id="curriculum" className="py-16 md:py-20 px-4 md:px-8 bg-white font-sans text-[#0c4088]">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-[2.5rem] font-extrabold text-[#0c4088] mb-4 leading-tight">
          {displayTitle} <span className="text-[#f1bd0e]">{highlightText}</span>
        </h2>
        {subtitleText && <p className="text-gray-500 text-lg max-w-2xl mx-auto">{subtitleText}</p>}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 max-w-[1200px] mx-auto items-start">
        {/* TABS SIDEBAR */}
        <div className="flex flex-row lg:flex-col gap-2 lg:gap-4 sticky top-[63px] lg:top-[120px] z-[99] bg-[#f8fbff] lg:bg-transparent p-2 lg:p-0 rounded-lg lg:rounded-none overflow-x-auto lg:overflow-visible">
          {yearsData.map((year, idx) => {
            const idToMatch = year.id || idx;
            const isActive = activeYear === idToMatch;
            return (
              <a
                key={`tab-${idToMatch}`}
                href={`#content-year-${idToMatch}`}
                onClick={(e) => handleTabClick(e, idToMatch)}
                className={`flex-none lg:flex-auto px-3 py-2 lg:px-6 lg:py-[18px] rounded-xl border cursor-pointer flex flex-col lg:flex-row items-start lg:items-center gap-1 lg:gap-3 font-bold transition-all duration-300 text-[13px] lg:text-base no-underline 
                ${isActive 
                  ? 'bg-white border-[#f1bd0e] shadow-[0_5px_20px_rgba(34,172,209,0.15)] lg:translate-x-2.5 text-[#0c4088]' 
                  : 'bg-gray-50 border-gray-200 text-inherit hover:bg-white hover:border-[#f1bd0e]'}`}
              >
                <span className={`text-[12px] lg:text-[0.8rem] font-extrabold uppercase tracking-widest ${isActive ? 'text-[#f1bd0e]' : 'text-gray-500'}`}>
                  {year.tabLabel || year.yearLabel}
                </span> 
                {year.tabTitle}
              </a>
            );
          })}
        </div>

        {/* CONTENT STACK */}
        <div className="relative flex flex-col gap-10">
          {yearsData.map((year, idx) => {
            const idToMatch = year.id || idx;
            const isActive = activeYear === idToMatch;
            return (
              <div 
                key={`content-${idToMatch}`} 
                id={`content-year-${idToMatch}`}
                className={`block bg-white rounded-2xl p-4 md:p-10 shadow-[0_5px_30px_rgba(0,0,0,0.03)] border border-gray-100 ${isActive ? 'opacity-100' : 'opacity-100'}`} 
              >
                
                {/* Header */}
                <div className="block md:flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-[1.6rem] md:text-[2.2rem] font-extrabold text-[#0c4088] mb-2 leading-tight mt-0">
                      {year.contentTitle || year.mainHeading}
                    </h3>
                    <p className="text-base text-black max-w-[500px] leading-relaxed m-0">
                      {year.contentDesc || year.description}
                    </p>
                  </div>
                  <span className="bg-[#f1bd0e]/15 text-[#f1bd0e] px-4 py-1.5 rounded-md text-[0.85rem] font-extrabold uppercase tracking-widest inline-block mt-2 md:mt-0 w-fit h-fit">
                    {year.badge || year.yearLabel}
                  </span>
                </div>
                
                {/* Skills Section */}
                {year.skills && year.skills.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-[0.95rem] font-extrabold text-[#0c4088] mb-4 uppercase tracking-[0.5px]">
                      {defaultConfig.labels.whatYouWillLearn}
                    </h4>
                    <div className="flex flex-wrap gap-2.5 mb-8">
                      {year.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="bg-gray-50 px-4 py-2 rounded-lg text-[0.85rem] font-bold text-[#0c4088] border border-gray-200 transition-all duration-300 hover:bg-[#22acd1]/10 hover:border-[#f1bd0e] hover:text-[#f1bd0e]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* AI Tools Section */}
                {year.aiTools && year.aiTools.length > 0 && (
                  <div className="bg-[#f8fbff] border border-[#e0f0ff] rounded-xl p-4 mb-8">
                    <div className="flex items-center gap-2.5 mb-5">
                      <span className="text-[#fcc032] text-[1.2rem]">
                        <i className="fa-solid fa-sparkles"></i>
                      </span>
                      <h4 className="text-[1.1rem] font-extrabold text-[#0c4088] m-0">
                        {defaultConfig.labels.aiTools}
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {year.aiTools.map((tool, tIdx) => (
                        <div key={tIdx} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:border-[#f1bd0e]">
                          <DynamicIcon 
                            icon={tool.icon || tool.iconName} 
                            color={tool.color || tool.iconColor} 
                            size={tool.size || 26} 
                          />
                          <span className="font-extrabold text-[#0c4088] text-[0.95rem] mb-1.5">{tool.name}</span>
                          <span className="text-base text-black leading-relaxed m-0">{tool.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Concepts Section */}
                {year.concepts && year.concepts.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-[0.95rem] font-extrabold text-[#0c4088] mb-4 uppercase tracking-[0.5px]">
                      {defaultConfig.labels.inClassroom}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                      {year.concepts.map((concept, cIdx) => (
                        <div key={cIdx} className="border border-gray-200 p-5 rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#f1bd0e]">
                          <DynamicIcon icon={concept.icon || concept.emoji} size={32} />
                          <h5 className="font-extrabold text-[1.05rem] text-[#0c4088] mb-2.5 leading-tight">{concept.title}</h5>
                          <p className="text-base text-black m-0 leading-relaxed">{concept.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Projects Section */}
                {year.projects && year.projects.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-[0.95rem] font-extrabold text-[#0c4088] mb-4 uppercase tracking-[0.5px]">
                      {defaultConfig.labels.projects}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                      {year.projects.map((project, pIdx) => (
                        <div key={pIdx} className="border border-gray-200 p-6 rounded-xl bg-white transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-lg">
                          <div className="absolute top-0 left-0 w-full h-1" style={{ background: project.accentColor || project.color }}></div>
                          <h5 className="font-extrabold text-[1.15rem] text-[#0c4088] mb-2 mt-1.5">{project.name}</h5>
                          <p className="text-[0.9rem] text-black mb-4 leading-relaxed">{project.desc}</p>
                          <span className="block text-[0.75rem] font-extrabold text-black uppercase tracking-[0.5px]">{project.companies}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Subjects Toggle Section */}
                {year.subjects && year.subjects.length > 0 && (
                  <div className="border border-gray-200 rounded-xl bg-white">
                    <div 
                      className="flex justify-between items-center p-4 lg:p-[18px_25px] cursor-pointer font-extrabold text-[#0c4088] transition-all duration-300 hover:bg-gray-50 hover:rounded-xl" 
                      onClick={() => toggleSubjects(idToMatch)}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[#f1bd0e] text-[1.2rem]">☰</span>
                        <span>{defaultConfig.labels.viewAllSubjects}</span>
                      </div>
                      <span className={`transition-transform duration-300 text-[0.8rem] text-gray-500 ${expandedSubjects[idToMatch] ? 'rotate-180' : ''}`}>
                        <i className="fa-solid fa-chevron-down"></i>
                      </span>
                    </div>
                    
                    {/* Animated Dropdown Body */}
                    <div className={`transition-all duration-300 ease-in-out ${expandedSubjects[idToMatch] ? 'max-h-[1000px] border-t border-gray-200 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <div className="px-6 pb-6">
                        <ul className="list-none m-0 pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {year.subjects.map((subject, subIdx) => (
                            <li key={subIdx} className="text-[0.95rem] text-gray-600 flex items-center gap-2.5 font-medium">
                              <span className="text-[#f1bd0e] font-extrabold text-[1.2rem]">›</span>{subject}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}