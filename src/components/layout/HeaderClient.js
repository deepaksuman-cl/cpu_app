// File: src/components/layout/HeaderClient.js
'use client';

import {
  ArrowRight, BookOpen, Building2, ChevronDown, ChevronRight, GraduationCap,
  Mail, Menu, MessageSquare, Phone, Search, X,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeaderClient({ navData }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  
  const [activeSidebarDropdown, setActiveSidebarDropdown] = useState(null);
  const [activeNestedDropdown, setActiveNestedDropdown] = useState(null);

  // --- SMART SCROLL LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (currentScrollY < 50) {
        setShowTopBar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowTopBar(false);
      } else {
        setShowTopBar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (mobileMenuOpen || searchOpen || desktopSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen, searchOpen, desktopSidebarOpen]);

  const toggleAccordion = (menu) => {
    setMobileAccordion(mobileAccordion === menu ? null : menu);
  };

  const toggleSidebarDropdown = (title) => {
    setActiveSidebarDropdown(activeSidebarDropdown === title ? null : title);
  };
  const toggleNestedDropdown = (label) => {
      setActiveNestedDropdown(activeNestedDropdown === label ? null : label);
  }

  // Helper variables for mobile specific popups
  const academicMenu = navData.topMenu.find(m => m.title === 'Academic');
  const admissionMenu = navData.topMenu.find(m => m.title === 'Admission');

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .desktop-mega-scroll { overflow-y: auto; pointer-events: auto; overscroll-behavior: contain; }
        .desktop-mega-scroll::-webkit-scrollbar { width: 6px; }
        .desktop-mega-scroll::-webkit-scrollbar-track { background-color: rgba(255,255,255,0.05); border-radius: 8px; }
        .desktop-mega-scroll::-webkit-scrollbar-thumb { background-color: #fec53a; border-radius: 8px; cursor: pointer; }
        .desktop-mega-scroll::-webkit-scrollbar-thumb:hover { background-color: #d19e26; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .news-ticker-container { overflow: hidden; white-space: nowrap; width: 100%; max-width: 450px; position: relative; display: flex; align-items: center; }
        .news-ticker-content { display: inline-block; white-space: nowrap; animation: ticker 25s linear infinite; }
        .news-ticker-content:hover { animation-play-state: paused; }
        @keyframes ticker { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
      `,
        }}
      />

      {/* --- DESKTOP SEARCH OVERLAY --- */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col justify-center items-center px-4 backdrop-blur-sm">
          <button onClick={() => setSearchOpen(false)} className="absolute top-10 right-10 text-white hover:text-[#fec53a] transition-colors">
            <X size={40} strokeWidth={1.5} />
          </button>
          <div className="w-full max-w-4xl relative border-b border-gray-600 pb-2">
            <input type="text" placeholder="Search Career Point University..." className="w-full bg-transparent text-white text-3xl md:text-5xl outline-none placeholder-gray-600 pr-12" autoFocus />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-[#fec53a]" size={36} />
          </div>
        </div>
      )}

      {/* --- DESKTOP RIGHT SIDEBAR OVERLAY (Dynamic with Nested Dropdowns) --- */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-[800px] bg-white shadow-2xl z-[9999] transform transition-transform duration-500 ease-in-out ${desktopSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col overflow-y-auto desktop-mega-scroll">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <img src={navData.logoUrl} alt="CPU Logo" className="h-10 object-contain" />
            <button onClick={() => setDesktopSidebarOpen(false)} className="flex items-center gap-2 group text-gray-500 hover:text-[#00588b] transition-colors">
              <span className="font-bold text-[13px] tracking-wider uppercase">Close</span>
              <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-[#00588b] group-hover:text-white transition-colors">
                <X size={18} />
              </div>
            </button>
          </div>

          <div className="flex-1 flex gap-8">
            <div className="w-2/3">
              {/* Map Explore More Categories */}
              {navData.sideMenu.exploreMore.map((cat, idx) => (
                <div key={idx} className="mb-6">
                  <h2 className="text-[18px] font-bold text-[#00588b] mb-3 border-b pb-2 cursor-pointer flex justify-between items-center" onClick={() => toggleSidebarDropdown(cat.title)}>
                    {cat.title}
                    {cat.hasDropdown && <ChevronDown size={18} className={`transform transition-transform ${activeSidebarDropdown === cat.title ? 'rotate-180' : ''}`} />}
                  </h2>
                  
                  {/* Dynamic Dropdown Logic */}
                  <div className={`transition-all duration-300 overflow-hidden ${activeSidebarDropdown === cat.title ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ul className="space-y-2 text-[14px] text-gray-700 font-medium pl-2">
                      {cat.links.map((link, i) => (
                        <li key={i}>
                          {cat.type === 'nested-dropdown' && link.subLinks ? (
                              <div>
                                 <div className="flex justify-between items-center cursor-pointer hover:text-[#1c54a3] py-1" onClick={() => toggleNestedDropdown(link.label)}>
                                     {link.label}
                                     <ChevronRight size={14} className={`transform transition-transform ${activeNestedDropdown === link.label ? 'rotate-90 text-[#fec53a]' : 'text-gray-400'}`} />
                                 </div>
                                 <div className={`transition-all duration-300 overflow-hidden pl-4 border-l-2 border-gray-200 mt-1 ${activeNestedDropdown === link.label ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                     <ul className="space-y-1">
                                        {link.subLinks.map((sub, sIdx) => (
                                            <li key={sIdx}>
                                                <Link href={sub.slug} className="text-[13px] text-gray-500 hover:text-[#fec53a] block py-1">{sub.label}</Link>
                                            </li>
                                        ))}
                                     </ul>
                                 </div>
                              </div>
                          ) : (
                             <Link href={link.slug} className="hover:text-[#1c54a3] block py-1 transition-colors">{link.label}</Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-1/3 border-l border-gray-200 pl-6">
              <ul className="space-y-3 text-[14px] font-bold text-[#00588b] mb-6">
                {navData.sideMenu.directLinks.map((link, idx) => (
                  <li key={idx} className="hover:text-[#1c54a3] cursor-pointer transition-colors flex items-center justify-between group">
                    <Link href={link.slug} className="w-full flex items-center justify-between">
                      {link.label} <ChevronRight size={14} className="text-gray-300 group-hover:text-[#1c54a3] transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <a href={`tel:${navData.topBarInfo.phone}`} className="flex items-center gap-2 text-[12px] text-[#00588b] hover:text-[#1c54a3] font-bold transition-colors">
                  <div className="bg-white p-1.5 rounded-full shadow-sm text-[#fec53a]"><Phone size={14} /></div>
                  {navData.topBarInfo.phone}
                </a>
                <a href={`mailto:${navData.topBarInfo.email}`} className="flex items-center gap-2 text-[11px] text-[#00588b] hover:text-[#1c54a3] font-bold transition-colors">
                  <div className="bg-white p-1.5 rounded-full shadow-sm text-[#fec53a]"><Mail size={14} /></div>
                  {navData.topBarInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- DESKTOP MAIN HEADER --- */}
      <header className="hidden lg:block w-[100vw] z-[1000] fixed top-0 transition-all duration-300 ease-in-out shadow-md bg-white" onMouseLeave={() => setActiveMegaMenu(null)}>
        
        {/* Top Bar */}
        <div className={`bg-[#00588b] w-full flex items-center justify-between text-white text-[12px] font-light transition-all duration-300 overflow-hidden ${showTopBar ? 'h-[38px] opacity-100 border-b border-[#1c54a3]' : 'h-0 opacity-0'}`}>
          <div className="mx-auto w-[98vw] h-full flex justify-between items-center">
            <div className="flex items-center h-full">
              <div className="bg-[#fec53a] text-[#00588b] font-bold px-4 h-full flex items-center shadow-sm z-10 uppercase tracking-wide">Latest News</div>
              <div className="news-ticker-container pl-4">
                <div className="news-ticker-content text-[#fec53a] font-medium tracking-wide">
                  {navData.topBarInfo.newsTicker[0]}
                </div>
              </div>
            </div>
            <div className="flex items-center h-full">
              {navData.topBarInfo.topStripLinks.map((link, idx) => (
                <Link key={idx} href={link.slug} className="hover:text-[#fec53a] px-4 border-r border-white/20 transition-colors h-full flex items-center">
                  {link.label}
                </Link>
              ))}
              <span className="pl-4 flex items-center h-full">
                Admission Helpline
                <a href={`tel:${navData.topBarInfo.phone}`} className="ml-3 bg-[#fec53a] text-[#00588b] px-4 h-full flex items-center font-bold text-[13px] hover:bg-white transition-colors tracking-wide">
                  {navData.topBarInfo.phone}
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className={`mx-auto w-[98vw] relative flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src={navData.logoUrl} alt="CPU Logo" className={`transition-all duration-300 object-contain ${isScrolled ? 'h-[50px]' : 'h-[40px]'}`} />
            </Link>
          </div>

          <div className="flex flex-col items-end relative w-full">
            <div className="relative flex items-center justify-end w-full" onMouseLeave={() => setActiveMegaMenu(null)}>
              <nav className="flex items-center h-[50px] transition-colors duration-300 z-50">
                {/* Dynamic Main Tabs */}
                {navData.topMenu.map((item, idx) => (
                  <div
                    key={idx}
                    className={`h-full flex items-center px-4 lg:px-5 cursor-pointer transition-colors duration-200 border-b-[3px] ${
                      activeMegaMenu === item.title.toLowerCase() ? 'border-[#00588b] text-[#00588b]' : 'border-transparent text-[#00588b] hover:text-[#1c54a3] hover:border-[#fec53a]'
                    }`}
                    onMouseEnter={() => setActiveMegaMenu(item.title.toLowerCase())}
                  >
                    <span className="text-[14.5px] font-bold tracking-wide whitespace-nowrap">{item.title}</span>
                  </div>
                ))}

                <div className="flex items-center h-full border-l border-gray-300 ml-4 pl-4 transition-colors duration-150 text-[#00588b]" onMouseEnter={() => setActiveMegaMenu(null)}>
                  <button onClick={() => setSearchOpen(true)} className="px-2 h-full hover:text-[#fec53a] transition-colors flex items-center">
                    <Search size={22} strokeWidth={2.5} />
                  </button>
                  <button onClick={() => setDesktopSidebarOpen(true)} className="px-3 h-full hover:text-[#fec53a] flex flex-col gap-[5px] items-end justify-center transition-colors group">
                    <span className="w-6 h-[2.5px] bg-current block rounded-full"></span>
                    <span className="w-6 h-[2.5px] bg-current block rounded-full"></span>
                    <span className="w-4 h-[2.5px] bg-current block rounded-full group-hover:w-6 transition-all"></span>
                  </button>
                </div>
              </nav>

              {/* --- DESKTOP MEGA MENUS --- */}
              {navData.topMenu.map((menu, index) => (
                <div
                  key={index}
                  className={`absolute top-[55px] right-0 bg-[#004a75] shadow-[0_20px_40px_rgba(0,0,0,0.6)] border-t-[4px] border-[#fec53a] transition-all duration-300 ease-in-out origin-top z-40 rounded-b-lg overflow-hidden 
                  ${activeMegaMenu === menu.title.toLowerCase() ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible translate-y-2 pointer-events-none'}
                  ${menu.type === 'split-action-menu' ? 'w-[40vw]' : 'w-[72vw] xl:w-[70vw]'}`}
                >
                  
                  {/* 1. DYNAMIC LAYOUT: Image on Left, Columns on Right (About Us) */}
                  {menu.type === 'mega-columns-with-image' && (
                    <div className="p-6 xl:p-8 text-white flex gap-6 h-full">
                      <div className="w-[30%] bg-white rounded-lg overflow-hidden relative shadow-lg flex flex-col">
                        <img src={menu.promoImage} alt={menu.title} className="w-full h-48 object-cover opacity-90 hover:opacity-100 transition-transform duration-500 hover:scale-105"/>
                        <div className="p-4 bg-[#003b5e] flex-1">
                          <p className="text-[12px] xl:text-[12.5px] font-light text-gray-300 leading-snug">{menu.promoDescription}</p>
                        </div>
                      </div>
                      <div className="w-[70%] grid grid-cols-3 gap-6">
                         {menu.columns.map((col, cIdx) => (
                            <div key={cIdx}>
                              <h4 className="text-[17px] xl:text-[18px] font-bold mb-4 tracking-wide text-[#fec53a] border-b border-white/10 pb-2">{col.heading}</h4>
                              <ul className="space-y-2 max-h-[250px] desktop-mega-scroll pr-2">
                                {col.links.map((link, lIdx) => (
                                  <li key={lIdx}>
                                    <Link href={link.slug} className="group flex items-center justify-between py-1.5 border-b border-white/5 hover:text-[#fec53a] transition-colors text-[12px] xl:text-[13px] font-medium tracking-wide">
                                      <span className="truncate pr-2">{link.label}</span>
                                      <ChevronRight size={14} className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#fec53a] flex-shrink-0" />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                         ))}
                      </div>
                    </div>
                  )}

                  {/* 2. DYNAMIC LAYOUT: Action Left, Links Right (Admissions) */}
                  {menu.type === 'split-action-menu' && (
                    <div className="p-6 xl:p-8 text-white flex flex-col">
                      <div className="flex gap-6">
                        <div className="w-[45%] border-r border-white/10 pr-5">
                          <h3 className="text-[22px] xl:text-[26px] font-bold mb-1 tracking-wide text-[#fec53a]">{menu.promoTitle}</h3>
                          <p className="text-[13px] text-gray-300 mb-6">{menu.promoSubText}</p>
                          <Link href={menu.actionButtonLink}>
                              <button className="bg-[#fec53a] hover:bg-white text-[#00588b] font-bold px-6 py-3 rounded-md shadow-md transition-colors w-full uppercase tracking-wider text-[13px]">{menu.actionButtonText}</button>
                          </Link>
                          
                          <div className="bg-[#003b5e] border border-[#1c54a3] p-5 rounded-lg shadow-inner mt-8">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="bg-[#fec53a] p-2 rounded text-[#00588b]"><MessageSquare size={18} /></div>
                              <span className="text-[16px] font-bold text-white tracking-wide">{menu.helpdeskTitle}</span>
                            </div>
                            <div className="space-y-4">
                              <div className="flex items-center gap-3 text-[14px]">
                                <Phone className="text-[#fec53a] w-5 h-5" />
                                <a href={`tel:${navData.topBarInfo.phone}`} className="hover:text-[#fec53a] font-bold transition-colors">{navData.topBarInfo.phone}</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-[55%] pl-4">
                          <h4 className="text-[18px] font-bold mb-6 border-b border-white/10 pb-3 text-[#fec53a]">{menu.linksHeading}</h4>
                          <div className="max-h-[220px] desktop-mega-scroll pr-4 space-y-1">
                            {menu.links.map((link, idx) => (
                              <Link key={idx} href={link.slug} className="group flex items-center justify-between py-2.5 border-b border-white/5 hover:border-[#fec53a] hover:text-[#fec53a] transition-colors text-[13px] xl:text-[14px] font-medium tracking-wide">
                                <span>{link.label}</span>
                                <ChevronRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#fec53a]" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. DYNAMIC LAYOUT: Pure Columns (Academic, Training & Placement) */}
                  {menu.type === 'mega-columns' && (
                    <div className="p-6 xl:p-8 text-white">
                      <div className={`grid grid-cols-${menu.columns.length > 4 ? 4 : menu.columns.length} gap-8`}>
                        {menu.columns.map((col, cIdx) => (
                          <div key={cIdx} className={cIdx !== menu.columns.length -1 ? "border-r border-white/10 pr-6" : ""}>
                            <h4 className="text-[17px] xl:text-[18px] font-bold mb-4 tracking-wide text-[#fec53a] border-b border-white/10 pb-2">{col.heading}</h4>
                            <ul className="space-y-2 max-h-[300px] desktop-mega-scroll pr-2">
                              {col.links.map((link, lIdx) => (
                                <li key={lIdx}>
                                  <Link href={link.slug} className="group flex flex-col py-1.5 border-b border-white/5 hover:text-[#fec53a] transition-colors text-[12.5px] xl:text-[13.5px] font-medium">
                                    <div className="flex justify-between items-center w-full">
                                      <span className="pr-2">{link.label}</span>
                                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-[#fec53a]" />
                                    </div>
                                    {link.subText && <span className="text-[10px] text-gray-400 mt-0.5">{link.subText}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                   {/* 4. DYNAMIC LAYOUT: Image on Top of Each Column (Campus Life) */}
                   {menu.type === 'mega-columns-with-images' && (
                     <div className="p-6 xl:p-8 text-white">
                     <div className="grid grid-cols-4 gap-6">
                       {menu.columns.map((col, idx) => (
                         <div key={idx} className="group">
                           <h4 className="text-[15px] xl:text-[16px] font-bold mb-4 tracking-wide text-[#fec53a] border-b border-white/10 pb-2">
                             {col.heading}
                           </h4>
                           <div className="w-full h-28 xl:h-32 mb-4 overflow-hidden rounded-lg shadow-md border border-white/20 relative">
                             <img src={col.image} alt={col.heading} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                             <div className="absolute inset-0 bg-gradient-to-t from-[#00588b]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                           </div>
                           <ul className="space-y-1">
                             {col.links.map((link, i) => (
                               <li key={i}>
                                 <Link href={link.slug} className="hover:text-[#fec53a] text-[13px] xl:text-[14px] text-gray-200 font-medium flex items-center justify-between py-1.5 transition-all group-hover:translate-x-1">
                                   {link.label}
                                 </Link>
                               </li>
                             ))}
                           </ul>
                         </div>
                       ))}
                     </div>
                   </div>
                   )}

                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE HEADER LOGO --- */}
      <header className={`lg:hidden fixed top-0 w-full z-[1000] p-3 flex justify-between items-center shadow-md bg-white transition-transform duration-300 ${!showTopBar ? '-translate-y-full' : 'translate-y-0'}`}>
        <Link href="/"><img src={navData.logoUrl} alt="CPU Logo" className="h-10 object-contain" /></Link>
        <button onClick={() => setSearchOpen(true)} className="text-[#00588b] p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Search size={24} strokeWidth={2.5} />
        </button>
      </header>

      {/* --- MOBILE FIXED BOTTOM NAVIGATION --- */}
      <div className="fixed bottom-0 left-0 w-full bg-[#00588b] text-white z-[1000] lg:hidden flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.4)] pb-safe">
        <button onClick={() => setMobileMenuOpen(mobileMenuOpen === 'programmes' ? null : 'programmes')} className={`flex flex-col items-center justify-center w-1/5 py-2.5 transition-all ${mobileMenuOpen === 'programmes' ? 'text-[#fec53a]' : 'text-gray-300'}`}>
          <div className="mb-1"><GraduationCap size={20} /></div><span className="text-[10px] font-medium tracking-wide">Programmes</span>
        </button>
        <button onClick={() => setMobileMenuOpen(mobileMenuOpen === 'enquiry' ? null : 'enquiry')} className={`flex flex-col items-center justify-center w-1/5 py-2.5 transition-all ${mobileMenuOpen === 'enquiry' ? 'text-[#fec53a]' : 'text-gray-300'}`}>
          <div className="mb-1"><BookOpen size={20} /></div><span className="text-[10px] font-medium tracking-wide">Enquiry</span>
        </button>
        <button onClick={() => setMobileMenuOpen(mobileMenuOpen === 'admissions' ? null : 'admissions')} className={`flex flex-col items-center justify-center w-1/5 py-2.5 transition-all ${mobileMenuOpen === 'admissions' ? 'text-[#fec53a]' : 'text-gray-300'}`}>
          <div className="mb-1"><Building2 size={20} /></div><span className="text-[10px] font-medium tracking-wide">Admission</span>
        </button>
        <a href={`tel:${navData.topBarInfo.phone}`} className="flex flex-col items-center justify-center w-1/5 py-2.5 transition-all text-gray-300 hover:text-white">
          <div className="mb-1"><Phone size={20} /></div><span className="text-[10px] font-medium tracking-wide">Call Us</span>
        </a>
        <button onClick={() => setMobileMenuOpen(mobileMenuOpen === 'menu' ? null : 'menu')} className={`flex flex-col items-center justify-center w-1/5 py-2.5 transition-all ${mobileMenuOpen === 'menu' ? 'text-[#fec53a]' : 'text-gray-300'}`}>
          <div className="mb-1">{mobileMenuOpen === 'menu' ? <X size={20} /> : <Menu size={20} />}</div><span className="text-[10px] font-medium tracking-wide">Menu</span>
        </button>
      </div>

      {/* --- MOBILE OVERLAYS --- */}
      <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[990] lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setMobileMenuOpen(null)} />

      <div className={`fixed bottom-[65px] pb-safe w-full bg-[#004a75] text-white z-[995] lg:hidden transform transition-transform duration-300 ease-in-out origin-bottom flex flex-col max-h-[85vh] shadow-2xl border-t-[4px] border-[#fec53a] ${mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
          
          {/* 1. MOBILE PROGRAMMES POPUP */}
          {mobileMenuOpen === 'programmes' && academicMenu && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-bold mb-4 text-[#fec53a]">Programmes</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {academicMenu.columns.find(c => c.heading === 'Programme')?.links.map((link, i) => (
                  <Link key={i} href={link.slug} className="block p-3 border border-white/10 rounded-lg hover:border-[#fec53a] bg-[#003b5e] transition-colors text-left shadow-sm">
                    <span className="block text-[13px] font-bold text-white">{link.label}</span>
                    {link.subText && <span className="text-[10px] text-[#fec53a]">{link.subText}</span>}
                  </Link>
                ))}
              </div>
              
              <h4 className="text-md font-bold mb-3 border-b border-white/20 pb-2 text-[#fec53a]">Browse by School</h4>
              <ul className="space-y-2 mb-6">
                {academicMenu.columns.find(c => c.heading === 'Schools')?.links.map((school, i) => (
                  <li key={i}>
                    <Link href={school.slug} className="text-[13px] text-gray-200 hover:text-white flex items-center justify-between bg-white/5 p-2.5 rounded border border-transparent hover:border-[#fec53a]/50">
                      {school.label} <ChevronRight size={14} className="text-[#fec53a]" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* 🔴 NEW FIX: Added General Information blocks back into mobile view */}
              {academicMenu.columns.filter(c => c.heading !== 'Programme' && c.heading !== 'Schools').map((col, cIdx) => (
                 <div key={cIdx} className="mb-6">
                    <h4 className="text-md font-bold mb-3 border-b border-white/20 pb-2 text-[#fec53a]">{col.heading}</h4>
                    <ul className="space-y-2">
                      {col.links.map((link, i) => (
                        <li key={i}>
                          <Link href={link.slug} className="text-[13px] text-gray-200 hover:text-white flex items-center justify-between bg-white/5 p-2.5 rounded border border-transparent hover:border-[#fec53a]/50">
                            {link.label} <ChevronRight size={14} className="text-[#fec53a]" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                 </div>
              ))}
            </div>
          )}

          {/* 2. MOBILE ADMISSIONS POPUP */}
          {mobileMenuOpen === 'admissions' && admissionMenu && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-bold mb-6 text-[#fec53a]">{admissionMenu.promoTitle}</h3>
              <div className="bg-[#003b5e] p-4 rounded-lg mb-6 border border-[#1c54a3] shadow-inner">
                <div className="mb-3"><p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Helpline Number</p><a href={`tel:${navData.topBarInfo.phone}`} className="text-lg font-bold text-white flex items-center gap-2"><Phone size={16} className="text-[#fec53a]" /> {navData.topBarInfo.phone}</a></div>
                <div><p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Email Us</p><a href={`mailto:${navData.topBarInfo.email}`} className="text-md font-medium text-white flex items-center gap-2"><Mail size={16} className="text-[#fec53a]" /> {navData.topBarInfo.email}</a></div>
              </div>
              <ul className="space-y-3">
                {admissionMenu.links.map((link, i) => (
                  <li key={i}><Link href={link.slug} className="flex items-center justify-between text-[14px] text-gray-200 hover:text-white border-b border-white/10 pb-3">{link.label} <ChevronRight size={16} className="text-[#fec53a]" /></Link></li>
                ))}
              </ul>
              <button className="w-full mt-6 bg-[#fec53a] text-[#00588b] font-bold py-3.5 rounded-lg uppercase tracking-wide shadow-lg">{admissionMenu.actionButtonText}</button>
            </div>
          )}

          {/* 3. MOBILE ENQUIRY POPUP */}
          {mobileMenuOpen === 'enquiry' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-bold mb-6 text-[#fec53a] flex items-center gap-2"><MessageSquare size={22} /> Admission Enquiry</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Full Name *" className="w-full bg-white/5 border border-white/20 rounded px-4 py-3.5 text-sm outline-none text-white focus:border-[#fec53a]" />
                <input type="email" placeholder="Email Address *" className="w-full bg-white/5 border border-white/20 rounded px-4 py-3.5 text-sm outline-none text-white focus:border-[#fec53a]" />
                <input type="tel" placeholder="Mobile Number *" className="w-full bg-white/5 border border-white/20 rounded px-4 py-3.5 text-sm outline-none text-white focus:border-[#fec53a]" />
                <button type="button" className="w-full bg-[#fec53a] text-[#00588b] font-bold py-3.5 rounded-lg mt-4 shadow-lg uppercase tracking-wide">Submit Enquiry</button>
              </form>
            </div>
          )}

          {/* 4. MOBILE HAMBURGER MENU */}
          {mobileMenuOpen === 'menu' && (
            <div className="animate-in fade-in duration-300">
              <div className="space-y-2">
                {/* ACCORDIONS */}
                {navData.topMenu.filter(m => m.title !== 'Academic' && m.title !== 'Admission').map((menuItem, i) => (
                  <div key={i} className="border-b border-white/10 overflow-hidden">
                    <button className="w-full flex justify-between items-center text-[16px] font-bold text-white py-4" onClick={() => toggleAccordion(menuItem.title)}>
                      {menuItem.title}
                      <ChevronDown size={18} className={`transform transition-transform duration-300 ${mobileAccordion === menuItem.title ? 'rotate-180 text-[#fec53a]' : 'text-gray-400'}`} />
                    </button>
                    {/* 🔴 NEW FIX: Increased max height for images */}
                    <div className={`transition-all duration-500 ease-in-out ${mobileAccordion === menuItem.title ? 'max-h-[2000px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-4 border-l-2 border-[#fec53a] ml-2 mt-2 space-y-4 text-[13px] text-gray-300 pr-4">
                        
                        {/* 🔴 NEW FIX: Mobile About Us Image & Text */}
                        {menuItem.type === 'mega-columns-with-image' && (
                          <div className="mb-4">
                            <img src={menuItem.promoImage} alt={menuItem.title} className="w-full h-32 object-cover rounded-lg shadow-md mb-3" />
                            <p className="text-[12px] leading-relaxed text-gray-400">{menuItem.promoDescription}</p>
                          </div>
                        )}

                        {/* Map inner columns */}
                        {menuItem.columns ? menuItem.columns.map((col, cIdx) => (
                           <div key={cIdx} className="mb-4">
                              {/* 🔴 NEW FIX: Mobile Campus Life Images */}
                              {menuItem.type === 'mega-columns-with-images' && col.image && (
                                 <img src={col.image} alt={col.heading} className="w-full h-24 object-cover rounded-md shadow-sm mb-2" />
                              )}
                              <p className="font-bold text-[#fec53a] mb-2">{col.heading}</p>
                              <ul className="space-y-2">
                                {col.links.map((l, lIdx) => <li key={lIdx}><Link href={l.slug} className="block hover:text-white py-1">{l.label}</Link></li>)}
                              </ul>
                           </div>
                        )) : menuItem.links && menuItem.links.map((l, lIdx) => (
                            <Link key={lIdx} href={l.slug} className="block hover:text-white py-1">{l.label}</Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* EXTRA SIDEBAR LINKS IN MOBILE MENU */}
                <div className="mt-6 pt-4 border-t border-white/20">
                  <h4 className="text-[16px] font-bold mb-4 text-[#fec53a]">Explore More</h4>
                  <div className="space-y-3">
                     {navData.sideMenu.exploreMore.map((cat, i) => (
                       <div key={i} className="border-b border-white/5 pb-2">
                         <p className="text-[14px] text-white font-bold mb-2 flex items-center gap-1">{cat.title}</p>
                         <ul className="pl-4 border-l border-white/20 space-y-2">
                            {cat.links.map((link, lIdx) => (
                                <li key={lIdx}>
                                    <Link href={link.slug} className="text-[13px] text-gray-400 hover:text-[#fec53a] block">{link.label}</Link>
                                    {link.subLinks && (
                                        <ul className="pl-4 mt-1 space-y-1">
                                            {link.subLinks.map((sub, sIdx) => <li key={sIdx}><Link href={sub.slug} className="text-[12px] text-gray-500 hover:text-white">- {sub.label}</Link></li>)}
                                        </ul>
                                    )}
                                </li>
                            ))}
                         </ul>
                       </div>
                     ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}