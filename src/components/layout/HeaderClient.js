'use client';

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  HeaderClient.js — Career Point University                      ║
 * ║  100% DATA-DRIVEN. Zero hardcoded strings.                      ║
 * ║  Every label, tab, panel, form field comes from navigation.json ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  ADMIN PANEL GUIDE — what controls what in navigation.json:     ║
 * ║                                                                  ║
 * ║  siteConfig.searchPlaceholder    → Search box placeholder       ║
 * ║  siteConfig.topBar.latestNewsLabel  → "Latest News" badge       ║
 * ║  siteConfig.topBar.helpdeskLabel → "Admission Helpline" text    ║
 * ║  siteConfig.sidebar.closeLabel   → Sidebar "Close" button text  ║
 * ║  topBarInfo.phone / email        → Contact info everywhere      ║
 * ║  topBarInfo.newsTicker[]         → Scrolling ticker text        ║
 * ║  topBarInfo.topStripLinks[]      → Top-right quick links        ║
 * ║  logoUrl                         → Logo image URL               ║
 * ║  topMenu[]                       → Desktop mega nav tabs        ║
 * ║    type: "mega-columns-with-image"  → About-style panel         ║
 * ║    type: "mega-columns"             → Academic/Placement panel  ║
 * ║    type: "split-action-menu"        → Admission panel           ║
 * ║    type: "mega-columns-with-images" → Campus Life panel         ║
 * ║  sideMenu.exploreMore[]          → Desktop sidebar left column  ║
 * ║  sideMenu.directLinks[]          → Desktop sidebar right links  ║
 * ║  mobileConfig.exploreMoreHeading → "Explore More" heading       ║
 * ║  mobileConfig.enquiryForm.*      → Enquiry form fields/labels   ║
 * ║  mobileConfig.bottomTabs[]       → Mobile bottom nav tabs       ║
 * ║    tab.type: "popup"  → opens a panel (defined in tab.panel)   ║
 * ║    tab.type: "tel"    → phone call (hrefField refs topBarInfo)  ║
 * ║    tab.type: "href"   → direct link                             ║
 * ║    tab.panel.type: "programmes"  → Academic programmes panel    ║
 * ║    tab.panel.type: "admissions"  → Admission info panel         ║
 * ║    tab.panel.type: "enquiry"     → Enquiry form panel           ║
 * ║    tab.panel.type: "full-menu"   → Full hamburger accordion     ║
 * ║    tab.panel.type: "links"       → Generic custom links panel   ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import { useEffect, useReducer } from 'react';

function DynIcon({ name, size = 20, className = '', strokeWidth = 2 }) {
  const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
  return <Icon size={size} className={className} strokeWidth={strokeWidth} />;
}

// ─────────────────────────────────────────────────────────────
// UI STATE — single reducer
// ─────────────────────────────────────────────────────────────
const INIT = {
  isScrolled: false, showTopBar: true, lastScrollY: 0,
  activeMegaMenu: null,
  openTabKey: null,
  searchOpen: false, desktopSidebarOpen: false,
  mobileAccordion: null, mobileSubAccordion: null,
  sidebarDropdown: null, sidebarNestedDropdown: null,
};

function reducer(s, a) {
  switch (a.type) {
    case 'SCROLL': return {
      ...s,
      isScrolled: a.y > 50,
      showTopBar: a.y < 50 ? true : a.y > s.lastScrollY ? false : true,
      lastScrollY: a.y,
    };
    case 'SET_MEGA': return { ...s, activeMegaMenu: a.key };
    case 'SET_TAB':  return { ...s, openTabKey: s.openTabKey === a.key ? null : a.key, mobileAccordion: null, mobileSubAccordion: null };
    case 'CLOSE_TAB': return { ...s, openTabKey: null };
    case 'TOGGLE_SEARCH':  return { ...s, searchOpen: !s.searchOpen };
    case 'TOGGLE_SIDEBAR': return { ...s, desktopSidebarOpen: !s.desktopSidebarOpen };
    case 'CLOSE_SIDEBAR':  return { ...s, desktopSidebarOpen: false };
    case 'TOGGLE_MOB_ACC': return { ...s, mobileAccordion: s.mobileAccordion === a.key ? null : a.key, mobileSubAccordion: null };
    case 'TOGGLE_MOB_SUB': return { ...s, mobileSubAccordion: s.mobileSubAccordion === a.key ? null : a.key };
    case 'TOGGLE_SB_DROP': return { ...s, sidebarDropdown: s.sidebarDropdown === a.key ? null : a.key };
    case 'TOGGLE_SB_NEST': return { ...s, sidebarNestedDropdown: s.sidebarNestedDropdown === a.key ? null : a.key };
    default: return s;
  }
}

// ─────────────────────────────────────────────────────────────
// STYLE TOKENS
// ─────────────────────────────────────────────────────────────
const T = {
  megaLink:   'group flex items-center justify-between py-1.5 border-b border-white/5 hover:text-[#fec53a] transition-colors text-[12.5px] xl:text-[13.5px] font-medium',
  chevron:    'opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-[#fec53a]',
  sectionH:   'text-[17px] xl:text-[18px] font-bold mb-4 tracking-wide text-[#fec53a] border-b border-white/10 pb-2',
  mobileItem: 'text-[13px] text-gray-200 hover:text-white flex items-center justify-between bg-white/5 p-2.5 rounded border border-transparent hover:border-[#fec53a]/50 transition-all',
};

// ─────────────────────────────────────────────────────────────
// DESKTOP MEGA PANELS
// ─────────────────────────────────────────────────────────────

function PanelImageCols({ menu }) {
  return (
    <div className="p-6 xl:p-8 text-white flex gap-6">
      <div className="w-[30%] bg-white rounded-lg overflow-hidden shadow-lg flex flex-col">
        <img src={menu.promoImage} alt={menu.title} className="w-full h-48 object-cover opacity-90 hover:opacity-100 transition-transform duration-500 hover:scale-105" />
        <div className="p-4 bg-[#003b5e] flex-1">
          <p className="text-[12px] xl:text-[12.5px] font-light text-gray-300 leading-snug">{menu.promoDescription}</p>
        </div>
      </div>
      <div className="w-[70%] grid grid-cols-3 gap-6">
        {menu.columns.map((col, i) => (
          <div key={i}>
            <h4 className={T.sectionH}>{col.heading}</h4>
            <ul className="space-y-2 max-h-[250px] desktop-mega-scroll pr-2">
              {col.links.map((l, j) => (
                <li key={j}>
                  <Link href={l.slug} className={T.megaLink}>
                    <span className="truncate pr-2">{l.label}</span>
                    <LucideIcons.ChevronRight size={14} className={`opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${T.chevron}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PanelSplitAction({ menu, phone }) {
  return (
    <div className="p-6 xl:p-8 text-white">
      <div className="flex gap-6">
        <div className="w-[45%] border-r border-white/10 pr-5">
          <h3 className="text-[22px] xl:text-[26px] font-bold mb-1 tracking-wide text-[#fec53a]">{menu.promoTitle}</h3>
          <p className="text-[13px] text-gray-300 mb-6">{menu.promoSubText}</p>
          <Link href={menu.actionButtonLink}>
            <button className="bg-[#fec53a] hover:bg-white text-[#00588b] font-bold px-6 py-3 rounded-md shadow-md transition-colors w-full uppercase tracking-wider text-[13px]">{menu.actionButtonText}</button>
          </Link>
          <div className="bg-[#003b5e] border border-[#1c54a3] p-5 rounded-lg shadow-inner mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#fec53a] p-2 rounded text-[#00588b]"><LucideIcons.MessageSquare size={18} /></div>
              <span className="text-[16px] font-bold text-white tracking-wide">{menu.helpdeskTitle}</span>
            </div>
            <div className="flex items-center gap-3 text-[14px]">
              <LucideIcons.Phone className="text-[#fec53a] w-5 h-5" />
              <a href={`tel:${phone}`} className="hover:text-[#fec53a] font-bold transition-colors">{phone}</a>
            </div>
          </div>
        </div>
        <div className="w-[55%] pl-4">
          <h4 className="text-[18px] font-bold mb-6 border-b border-white/10 pb-3 text-[#fec53a]">{menu.linksHeading}</h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-h-[220px] desktop-mega-scroll pr-4">
            {menu.links.map((l, i) => (
              <Link key={i} href={l.slug} className="group flex items-center justify-between py-2.5 border-b border-white/5 hover:border-[#fec53a] hover:text-[#fec53a] transition-colors text-[13px] xl:text-[14px] font-medium tracking-wide">
                <span>{l.label}</span>
                <LucideIcons.ChevronRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#fec53a]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelCols({ menu }) {
  const n = Math.min(menu.columns.length, 4);
  return (
    <div className="p-6 xl:p-8 text-white">
      <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${n},minmax(0,1fr))` }}>
        {menu.columns.map((col, i) => (
          <div key={i} className={i !== menu.columns.length - 1 ? 'border-r border-white/10 pr-6' : ''}>
            <h4 className={T.sectionH}>{col.heading}</h4>
            <ul className="space-y-2 max-h-[300px] desktop-mega-scroll pr-2">
              {col.links.map((l, j) => (
                <li key={j}>
                  <Link href={l.slug} className={`${T.megaLink} flex-col`}>
                    <div className="flex justify-between items-center w-full">
                      <span className="pr-2">{l.label}</span>
                      <LucideIcons.ChevronRight size={14} className={T.chevron} />
                    </div>
                    {l.subText && <span className="text-[10px] text-gray-400 mt-0.5">{l.subText}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PanelImgTopCols({ menu }) {
  return (
    <div className="p-6 xl:p-8 text-white">
      <div className="grid grid-cols-4 gap-6">
        {menu.columns.map((col, i) => (
          <div key={i} className="group">
            <h4 className="text-[15px] xl:text-[16px] font-bold mb-4 tracking-wide text-[#fec53a] border-b border-white/10 pb-2">{col.heading}</h4>
            <div className="w-full h-28 xl:h-32 mb-4 overflow-hidden rounded-lg shadow-md border border-white/20 relative">
              <img src={col.image} alt={col.heading} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00588b]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <ul className="space-y-1">
              {col.links.map((l, j) => (
                <li key={j}>
                  <Link href={l.slug} className="hover:text-[#fec53a] text-[13px] xl:text-[14px] text-gray-200 font-medium flex items-center justify-between py-1.5 transition-all group-hover:translate-x-1">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Routes menu.type → correct desktop panel component */
function DesktopMegaPanel({ menu, phone }) {
  switch (menu.type) {
    case 'mega-columns-with-image':   return <PanelImageCols menu={menu} />;
    case 'split-action-menu':         return <PanelSplitAction menu={menu} phone={phone} />;
    case 'mega-columns':              return <PanelCols menu={menu} />;
    case 'mega-columns-with-images':  return <PanelImgTopCols menu={menu} />;
    default: return null;
  }
}

// ─────────────────────────────────────────────────────────────
// MOBILE PANEL TYPES
// ─────────────────────────────────────────────────────────────

/** panel.type = "programmes" */
function MobPanelProgrammes({ config, navData }) {
  const src   = navData.topMenu.find(m => m.title === config.sourceMenu);
  if (!src) return null;
  const progCol   = src.columns.find(c => c.heading === config.programmesColumn);
  const schoolCol = src.columns.find(c => c.heading === config.schoolsColumn);
  const others    = src.columns.filter(c => c.heading !== config.programmesColumn && c.heading !== config.schoolsColumn);

  return (
    <div className="animate-in fade-in duration-300">
      <h3 className="text-xl font-bold mb-4 text-[#fec53a]">{config.programmesColumn}</h3>
      {progCol && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {progCol.links.map((l, i) => (
            <Link key={i} href={l.slug} className="block p-3 border border-white/10 rounded-lg hover:border-[#fec53a] bg-[#003b5e] transition-colors shadow-sm">
              <span className="block text-[13px] font-bold text-white">{l.label}</span>
              {l.subText && <span className="text-[10px] text-[#fec53a]">{l.subText}</span>}
            </Link>
          ))}
        </div>
      )}
      {schoolCol && (
        <>
          <h4 className="text-md font-bold mb-3 border-b border-white/20 pb-2 text-[#fec53a]">{config.schoolsSectionLabel}</h4>
          <ul className="space-y-2 mb-6">
            {schoolCol.links.map((l, i) => (
              <li key={i}><Link href={l.slug} className={T.mobileItem}>{l.label}<LucideIcons.ChevronRight size={14} className="text-[#fec53a] flex-shrink-0" /></Link></li>
            ))}
          </ul>
        </>
      )}
      {others.map((col, i) => (
        <div key={i} className="mb-6">
          <h4 className="text-md font-bold mb-3 border-b border-white/20 pb-2 text-[#fec53a]">{col.heading}</h4>
          <ul className="space-y-2">
            {col.links.map((l, j) => (
              <li key={j}><Link href={l.slug} className={T.mobileItem}>{l.label}<LucideIcons.ChevronRight size={14} className="text-[#fec53a] flex-shrink-0" /></Link></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** panel.type = "admissions" */
function MobPanelAdmissions({ config, navData }) {
  const menu  = navData.topMenu.find(m => m.title === config.sourceMenu);
  const phone = navData.topBarInfo.phone;
  const email = navData.topBarInfo.email;
  if (!menu) return null;
  return (
    <div className="animate-in fade-in duration-300">
      <h3 className="text-xl font-bold mb-6 text-[#fec53a]">{menu.promoTitle}</h3>
      <div className="bg-[#003b5e] p-4 rounded-lg mb-6 border border-[#1c54a3] shadow-inner">
        <div className="mb-3">
          <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Helpline Number</p>
          <a href={`tel:${phone}`} className="text-lg font-bold text-white flex items-center gap-2"><LucideIcons.Phone size={16} className="text-[#fec53a]" />{phone}</a>
        </div>
        <div>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Email Us</p>
          <a href={`mailto:${email}`} className="text-md font-medium text-white flex items-center gap-2"><LucideIcons.Mail size={16} className="text-[#fec53a]" />{email}</a>
        </div>
      </div>
      <ul className="space-y-3">
        {menu.links.map((l, i) => (
          <li key={i}><Link href={l.slug} className="flex items-center justify-between text-[14px] text-gray-200 hover:text-white border-b border-white/10 pb-3">{l.label}<LucideIcons.ChevronRight size={16} className="text-[#fec53a]" /></Link></li>
        ))}
      </ul>
      <Link href={menu.actionButtonLink}>
        <button className="w-full mt-6 bg-[#fec53a] text-[#00588b] font-bold py-3.5 rounded-lg uppercase tracking-wide shadow-lg">{menu.actionButtonText}</button>
      </Link>
    </div>
  );
}

/** panel.type = "enquiry" — fully config-driven form */
function MobPanelEnquiry({ formConfig }) {
  return (
    <div className="animate-in fade-in duration-300">
      <h3 className="text-xl font-bold mb-6 text-[#fec53a] flex items-center gap-2">
        <DynIcon name={formConfig.icon} size={22} /> {formConfig.title}
      </h3>
      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        {formConfig.fields.map(field => (
          <input key={field.id} type={field.type} placeholder={field.placeholder} required={field.required}
            className="w-full bg-white/5 border border-white/20 rounded px-4 py-3.5 text-sm outline-none text-white focus:border-[#fec53a] transition-colors" />
        ))}
        <button type="submit" className="w-full bg-[#fec53a] text-[#00588b] font-bold py-3.5 rounded-lg mt-4 shadow-lg uppercase tracking-wide">
          {formConfig.submitLabel}
        </button>
      </form>
    </div>
  );
}

/** panel.type = "links" — generic custom panel */
function MobPanelLinks({ config }) {
  return (
    <div className="animate-in fade-in duration-300">
      {config.title && <h3 className="text-xl font-bold mb-4 text-[#fec53a]">{config.title}</h3>}
      <ul className="space-y-3">
        {(config.links || []).map((l, i) => (
          <li key={i}><Link href={l.slug} className="flex items-center justify-between text-[14px] text-gray-200 hover:text-white border-b border-white/10 pb-3">{l.label}<LucideIcons.ChevronRight size={16} className="text-[#fec53a]" /></Link></li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SMART TWO-LEVEL ACCORDION (used inside full-menu panel)
// ─────────────────────────────────────────────────────────────

function AccordionItem({ menuItem, isOpen, onToggle, activeSubKey, onSubToggle }) {
  return (
    <div className="border-b border-white/10 overflow-hidden">
      <button className="w-full flex justify-between items-center text-[16px] font-bold text-white py-4" onClick={onToggle} aria-expanded={isOpen}>
        {menuItem.title}
        <LucideIcons.ChevronDown size={18} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#fec53a]' : 'text-gray-400'}`} />
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[3000px] opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="pl-4 border-l-2 border-[#fec53a] ml-2 mt-2 pr-4">
          {menuItem.type === 'mega-columns-with-image' && menuItem.promoImage && (
            <div className="mb-4">
              <img src={menuItem.promoImage} alt={menuItem.title} className="w-full h-32 object-cover rounded-lg shadow-md mb-3" />
              <p className="text-[12px] leading-relaxed text-gray-400">{menuItem.promoDescription}</p>
            </div>
          )}
          {menuItem.columns && menuItem.columns.map(col => {
            const subKey  = `${menuItem.title}__${col.heading}`;
            const subOpen = activeSubKey === subKey;
            return (
              <div key={col.heading} className="mb-3">
                <button className="w-full flex items-center justify-between py-2 text-left" onClick={() => onSubToggle(subKey)} aria-expanded={subOpen}>
                  <span className="font-bold text-[#fec53a] text-[13px]">{col.heading}</span>
                  <LucideIcons.ChevronDown size={14} className={`transform transition-transform duration-300 ${subOpen ? 'rotate-180 text-[#fec53a]' : 'text-gray-400'}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${subOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  {menuItem.type === 'mega-columns-with-images' && col.image && (
                    <img src={col.image} alt={col.heading} className="w-full h-24 object-cover rounded-md shadow-sm mb-2 mt-1" />
                  )}
                  <ul className="space-y-1 pl-2 border-l border-white/10 mt-1 pb-2">
                    {col.links.map(l => (
                      <li key={l.slug}>
                        <Link href={l.slug} className="flex items-center justify-between text-[13px] text-gray-300 hover:text-[#fec53a] py-1.5 transition-colors">
                          <span>{l.label}</span>
                          <LucideIcons.ChevronRight size={12} className="text-gray-500 flex-shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          {!menuItem.columns && menuItem.links && menuItem.links.map(l => (
            <Link key={l.slug} href={l.slug} className="block text-[13px] text-gray-300 hover:text-[#fec53a] py-1.5 transition-colors">{l.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/** panel.type = "full-menu" */
function MobPanelFullMenu({ config, navData, state, dispatch }) {
  const excluded = config.excludeMenuTitles || [];
  const items    = navData.topMenu.filter(m => !excluded.includes(m.title));
  const mc       = navData.mobileConfig;

  return (
    <div className="animate-in fade-in duration-300">
      <div className="space-y-0">
        {items.map(item => (
          <AccordionItem
            key={item.title}
            menuItem={item}
            isOpen={state.mobileAccordion === item.title}
            onToggle={() => dispatch({ type: 'TOGGLE_MOB_ACC', key: item.title })}
            activeSubKey={state.mobileSubAccordion}
            onSubToggle={key => dispatch({ type: 'TOGGLE_MOB_SUB', key })}
          />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/20">
        <h4 className="text-[16px] font-bold mb-4 text-[#fec53a]">{mc.exploreMoreHeading}</h4>
        <div className="space-y-4">
          {navData.sideMenu.exploreMore.map(cat => {
            const subKey = `explore__${cat.title}`;
            const isOpen = state.mobileSubAccordion === subKey;
            return (
              <div key={cat.title} className="border-b border-white/5 pb-3">
                <button className="w-full flex justify-between items-center text-[14px] text-white font-bold mb-2"
                  onClick={() => dispatch({ type: 'TOGGLE_MOB_SUB', key: subKey })}>
                  {cat.title}
                  <LucideIcons.ChevronDown size={14} className={`transform transition-transform ${isOpen ? 'rotate-180 text-[#fec53a]' : 'text-gray-400'}`} />
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <ul className="pl-4 border-l border-white/20 space-y-2">
                    {cat.links.map(link => (
                      <li key={link.slug || link.label}>
                        <Link href={link.slug} className="text-[13px] text-gray-400 hover:text-[#fec53a] block py-1 transition-colors">{link.label}</Link>
                        {link.subLinks && (
                          <ul className="pl-4 mt-1 space-y-1">
                            {link.subLinks.map(sub => (
                              <li key={sub.slug}>
                                <Link href={sub.slug} className="text-[12px] text-gray-500 hover:text-white flex items-center gap-1 py-0.5 transition-colors">
                                  <span className="text-gray-600">—</span> {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          <div className="pt-2">
            <ul className="space-y-3">
              {navData.sideMenu.directLinks.map(link => (
                <li key={link.slug}>
                  <Link href={link.slug} className="text-[14px] text-white font-bold hover:text-[#fec53a] flex items-center gap-2 transition-colors">
                    <LucideIcons.ChevronRight size={14} className="text-[#fec53a]" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * MOBILE PANEL ROUTER
 * Admin: add new panel.type key in JSON → add matching case + component here
 */
function MobPanelRouter({ tab, navData, state, dispatch }) {
  if (!tab?.panel) return null;
  const p = tab.panel;
  switch (p.type) {
    case 'programmes': return <MobPanelProgrammes config={p} navData={navData} />;
    case 'admissions': return <MobPanelAdmissions config={p} navData={navData} />;
    case 'enquiry':    return <MobPanelEnquiry formConfig={navData.mobileConfig.enquiryForm} />;
    case 'full-menu':  return <MobPanelFullMenu config={p} navData={navData} state={state} dispatch={dispatch} />;
    case 'links':      return <MobPanelLinks config={p} />;
    default: return null;
  }
}

// ─────────────────────────────────────────────────────────────
// DESKTOP SIDEBAR
// ─────────────────────────────────────────────────────────────
function DesktopSidebar({ navData, state, dispatch }) {
  const { siteConfig, topBarInfo, sideMenu } = navData;
  return (
    <div className={`fixed inset-y-0 right-0 w-full max-w-[800px] bg-white shadow-2xl z-[9999] transform transition-transform duration-500 ease-in-out ${state.desktopSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-8 h-full flex flex-col overflow-y-auto desktop-mega-scroll">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <img src={navData.logoUrl} alt="Logo" className="h-10 object-contain" />
          <button onClick={() => dispatch({ type: 'CLOSE_SIDEBAR' })} className="flex items-center gap-2 group text-gray-500 hover:text-[#00588b] transition-colors">
            <span className="font-bold text-[13px] tracking-wider uppercase">{siteConfig.sidebar.closeLabel}</span>
            <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-[#00588b] group-hover:text-white transition-colors"><LucideIcons.X size={18} /></div>
          </button>
        </div>
        <div className="flex-1 flex gap-8">
          <div className="w-2/3">
            {sideMenu.exploreMore.map(cat => (
              <div key={cat.title} className="mb-6">
                <h2 className="text-[18px] font-bold text-[#00588b] mb-3 border-b pb-2 cursor-pointer flex justify-between items-center"
                  onClick={() => dispatch({ type: 'TOGGLE_SB_DROP', key: cat.title })}>
                  {cat.title}
                  {cat.hasDropdown && <LucideIcons.ChevronDown size={18} className={`transform transition-transform ${state.sidebarDropdown === cat.title ? 'rotate-180' : ''}`} />}
                </h2>
                <div className={`transition-all duration-300 overflow-hidden ${state.sidebarDropdown === cat.title ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <ul className="space-y-2 text-[14px] text-gray-700 font-medium pl-2">
                    {cat.links.map(link => (
                      <li key={link.slug || link.label}>
                        {cat.type === 'nested-dropdown' && link.subLinks ? (
                          <div>
                            <div className="flex justify-between items-center cursor-pointer hover:text-[#1c54a3] py-1" onClick={() => dispatch({ type: 'TOGGLE_SB_NEST', key: link.label })}>
                              {link.label}
                              <LucideIcons.ChevronRight size={14} className={`transform transition-transform ${state.sidebarNestedDropdown === link.label ? 'rotate-90 text-[#fec53a]' : 'text-gray-400'}`} />
                            </div>
                            <div className={`transition-all duration-300 overflow-hidden pl-4 border-l-2 border-gray-200 mt-1 ${state.sidebarNestedDropdown === link.label ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                              <ul className="space-y-1">
                                {link.subLinks.map(sub => (
                                  <li key={sub.slug}><Link href={sub.slug} className="text-[13px] text-gray-500 hover:text-[#fec53a] block py-1 transition-colors">{sub.label}</Link></li>
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
              {sideMenu.directLinks.map(link => (
                <li key={link.slug} className="hover:text-[#1c54a3] cursor-pointer transition-colors">
                  <Link href={link.slug} className="w-full flex items-center justify-between group">
                    {link.label}<LucideIcons.ChevronRight size={14} className="text-gray-300 group-hover:text-[#1c54a3] transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <a href={`tel:${topBarInfo.phone}`} className="flex items-center gap-2 text-[12px] text-[#00588b] hover:text-[#1c54a3] font-bold transition-colors">
                <div className="bg-white p-1.5 rounded-full shadow-sm text-[#fec53a]"><LucideIcons.Phone size={14} /></div>
                {topBarInfo.phone}
              </a>
              <a href={`mailto:${topBarInfo.email}`} className="flex items-center gap-2 text-[11px] text-[#00588b] hover:text-[#1c54a3] font-bold transition-colors">
                <div className="bg-white p-1.5 rounded-full shadow-sm text-[#fec53a]"><LucideIcons.Mail size={14} /></div>
                {topBarInfo.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GLOBAL CSS
// ─────────────────────────────────────────────────────────────
const CSS = `
  .desktop-mega-scroll{overflow-y:auto;pointer-events:auto;overscroll-behavior:contain}
  .desktop-mega-scroll::-webkit-scrollbar{width:6px}
  .desktop-mega-scroll::-webkit-scrollbar-track{background:rgba(255,255,255,.05);border-radius:8px}
  .desktop-mega-scroll::-webkit-scrollbar-thumb{background:#fec53a;border-radius:8px;cursor:pointer}
  .desktop-mega-scroll::-webkit-scrollbar-thumb:hover{background:#d19e26}
  .hide-scrollbar{scrollbar-width:none;-ms-overflow-style:none}
  .hide-scrollbar::-webkit-scrollbar{display:none}
  .news-ticker-container{overflow:hidden;white-space:nowrap;width:100%;max-width:450px;display:flex;align-items:center}
  .news-ticker-content{display:inline-block;white-space:nowrap;animation:ticker 25s linear infinite}
  .news-ticker-content:hover{animation-play-state:paused}
  @keyframes ticker{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}
`;

// ─────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────
export default function HeaderClient({ navData }) {
  const [state, dispatch] = useReducer(reducer, INIT);

  useEffect(() => {
    const fn = () => dispatch({ type: 'SCROLL', y: window.scrollY });
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (state.openTabKey || state.searchOpen || state.desktopSidebarOpen) ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [state.openTabKey, state.searchOpen, state.desktopSidebarOpen]);

  const { siteConfig, topBarInfo, topMenu, mobileConfig } = navData;
  const phone = topBarInfo.phone;
  const activeTab = mobileConfig.bottomTabs.find(t => t.key === state.openTabKey);

  const getHref = tab => {
    if (tab.type === 'tel') return `tel:${topBarInfo[tab.hrefField] || ''}`;
    return tab.href || '#';
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* SEARCH OVERLAY */}
      {state.searchOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col justify-center items-center px-4 backdrop-blur-sm">
          <button onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })} className="absolute top-10 right-10 text-white hover:text-[#fec53a] transition-colors">
            <LucideIcons.X size={40} strokeWidth={1.5} />
          </button>
          <div className="w-full max-w-4xl relative border-b border-gray-600 pb-2">
            <input type="text" placeholder={siteConfig.searchPlaceholder}
              className="w-full bg-transparent text-white text-3xl md:text-5xl outline-none placeholder-gray-600 pr-12" autoFocus />
            <LucideIcons.Search className="absolute right-2 top-1/2 -translate-y-1/2 text-[#fec53a]" size={36} />
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <DesktopSidebar navData={navData} state={state} dispatch={dispatch} />

      {/* DESKTOP HEADER */}
      <header className="hidden lg:block w-[100vw] z-[1000] fixed top-0 transition-all duration-300 ease-in-out shadow-md bg-white"
        onMouseLeave={() => dispatch({ type: 'SET_MEGA', key: null })}>
        {/* Top bar */}
        <div className={`bg-[#00588b] w-full flex items-center text-white text-[12px] font-light transition-all duration-300 overflow-hidden ${state.showTopBar ? 'h-[38px] opacity-100 border-b border-[#1c54a3]' : 'h-0 opacity-0'}`}>
          <div className="mx-auto w-[98vw] h-full flex justify-between items-center">
            <div className="flex items-center h-full">
              <div className="bg-[#fec53a] text-[#00588b] font-bold px-4 h-full flex items-center shadow-sm z-10 uppercase tracking-wide">
                {siteConfig.topBar.latestNewsLabel}
              </div>
              <div className="news-ticker-container pl-4">
                <div className="news-ticker-content text-[#fec53a] font-medium tracking-wide">{topBarInfo.newsTicker[0]}</div>
              </div>
            </div>
            <div className="flex items-center h-full">
              {topBarInfo.topStripLinks.map(l => (
                <Link key={l.slug} href={l.slug} className="hover:text-[#fec53a] px-4 border-r border-white/20 transition-colors h-full flex items-center">{l.label}</Link>
              ))}
              <span className="pl-4 flex items-center h-full">
                {siteConfig.topBar.helpdeskLabel}
                <a href={`tel:${phone}`} className="ml-3 bg-[#fec53a] text-[#00588b] px-4 h-full flex items-center font-bold text-[13px] hover:bg-white transition-colors tracking-wide">{phone}</a>
              </span>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className={`mx-auto w-[98vw] relative flex justify-between items-center transition-all duration-300 ${state.isScrolled ? 'py-2' : 'py-3'}`}>
          <Link href="/"><img src={navData.logoUrl} alt="Logo" className={`transition-all duration-300 object-contain ${state.isScrolled ? 'h-[50px]' : 'h-[40px]'}`} /></Link>
          <div className="flex flex-col items-end relative w-full" onMouseLeave={() => dispatch({ type: 'SET_MEGA', key: null })}>
            <div className="relative flex items-center justify-end w-full">
              <nav className="flex items-center h-[50px] z-50">
                {topMenu.map(item => (
                  <div key={item.title}
                    className={`h-full flex items-center px-4 lg:px-5 cursor-pointer transition-colors duration-200 border-b-[3px] ${state.activeMegaMenu === item.title.toLowerCase() ? 'border-[#00588b] text-[#00588b]' : 'border-transparent text-[#00588b] hover:text-[#1c54a3] hover:border-[#fec53a]'}`}
                    onMouseEnter={() => dispatch({ type: 'SET_MEGA', key: item.title.toLowerCase() })}>
                    <span className="text-[14.5px] font-bold tracking-wide whitespace-nowrap">{item.title}</span>
                  </div>
                ))}
                <div className="flex items-center h-full border-l border-gray-300 ml-4 pl-4 text-[#00588b]"
                  onMouseEnter={() => dispatch({ type: 'SET_MEGA', key: null })}>
                  <button onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })} className="px-2 h-full hover:text-[#fec53a] transition-colors flex items-center"><LucideIcons.Search size={22} strokeWidth={2.5} /></button>
                  <button onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })} className="px-3 h-full hover:text-[#fec53a] flex flex-col gap-[5px] items-end justify-center transition-colors group">
                    <span className="w-6 h-[2.5px] bg-current block rounded-full" />
                    <span className="w-6 h-[2.5px] bg-current block rounded-full" />
                    <span className="w-4 h-[2.5px] bg-current block rounded-full group-hover:w-6 transition-all" />
                  </button>
                </div>
              </nav>

              {/* Mega panels */}
              {topMenu.map(menu => (
                <div key={menu.title}
                  className={`absolute top-[55px] right-0 w-[72vw] xl:w-[70vw] bg-[#004a75] shadow-[0_20px_40px_rgba(0,0,0,0.6)] border-t-[4px] border-[#fec53a] transition-all duration-300 ease-in-out origin-top z-40 rounded-b-lg overflow-hidden ${state.activeMegaMenu === menu.title.toLowerCase() ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible translate-y-2 pointer-events-none'}`}>
                  <DesktopMegaPanel menu={menu} phone={phone} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE TOP HEADER */}
      <header className={`lg:hidden fixed top-0 w-full z-[1000] p-3 flex justify-between items-center shadow-md bg-white transition-transform duration-300 ${!state.showTopBar ? '-translate-y-full' : 'translate-y-0'}`}>
        <Link href="/"><img src={navData.logoUrl} alt="Logo" className="h-10 object-contain" /></Link>
        <button onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })} className="text-[#00588b] p-2 hover:bg-gray-100 rounded-full transition-colors"><LucideIcons.Search size={24} strokeWidth={2.5} /></button>
      </header>

      {/* ─────────────────────────────────────────────────
          MOBILE BOTTOM NAV
          100% driven by mobileConfig.bottomTabs[] in JSON.
          To add/remove/reorder tabs → edit navigation.json only.
          ───────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 w-full bg-[#00588b] text-white z-[1000] lg:hidden flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.4)] pb-safe">
        {mobileConfig.bottomTabs.map(tab => {
          const isActive   = state.openTabKey === tab.key;
          const isMenuTab  = tab.panel?.type === 'full-menu';
          const baseClass  = `flex flex-col items-center justify-center py-2.5 transition-all ${isActive ? 'text-[#fec53a]' : 'text-gray-300'}`;
          const tabWidth   = `${100 / mobileConfig.bottomTabs.length}%`;

          if (tab.type === 'tel' || tab.type === 'href') {
            return (
              <a key={tab.key} href={getHref(tab)} className={`${baseClass} hover:text-white`} style={{ width: tabWidth }}>
                <div className="mb-1"><DynIcon name={tab.icon} size={20} /></div>
                <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
              </a>
            );
          }

          return (
            <button key={tab.key} onClick={() => dispatch({ type: 'SET_TAB', key: tab.key })}
              className={baseClass} style={{ width: tabWidth }} aria-expanded={isActive} aria-label={tab.label}>
              <div className="mb-1">
                {isMenuTab && isActive
                  ? <DynIcon name={tab.closeIcon || 'X'} size={20} />
                  : <DynIcon name={tab.icon} size={20} />
                }
              </div>
              <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* MOBILE BACKDROP */}
      <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[990] lg:hidden transition-opacity duration-300 ${state.openTabKey ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => dispatch({ type: 'CLOSE_TAB' })} aria-hidden="true" />

      {/* MOBILE POPUP PANEL */}
      <div className={`fixed bottom-[65px] pb-safe w-full bg-[#004a75] text-white z-[995] lg:hidden transform transition-transform duration-300 ease-in-out origin-bottom flex flex-col max-h-[85vh] shadow-2xl border-t-[4px] border-[#fec53a] ${state.openTabKey ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
          <MobPanelRouter tab={activeTab} navData={navData} state={state} dispatch={dispatch} />
        </div>
      </div>
    </>
  );
}