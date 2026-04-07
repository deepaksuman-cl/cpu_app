'use client';

import {
  Building,
  ChevronDown,
  FileText, Home, ImageIcon,
  Info,
  LayoutDashboard,
  PanelBottom,
  PanelLeftClose,
  PanelLeftOpen,
  PanelTop,
  Settings,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const SIDEBAR_MENUS = [
  {
    category: 'OVERVIEW',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      // { name: 'Database Explorer', href: '/admin/database', icon: Database },
    ]
  },
  {
    category: 'CONTENT MANAGEMENT',
    items: [
      {
        name: 'Header Settings',
        icon: PanelTop,
        isCollapsible: true,
        subItems: [
          { name: 'Site Config & Logo', href: '/admin/header/site-config' },
          { name: 'Top Bar Info', href: '/admin/header/top-bar' },
          { name: 'Desktop Menus', href: '/admin/header/desktop-menus' },
          { name: 'Sidebar Menus', href: '/admin/header/sidebar-menus' },
          { name: 'Mobile Config', href: '/admin/header/mobile-config' },
        ]
      },
      { name: 'Footer Settings', href: '/admin/footer-manager', icon: PanelBottom },
      { name: 'Home Page Setup', href: '/admin/home-setup', icon: Home },
      { name: 'About Manager', href: '/admin/pages/about-manager', icon: Info },
      { name: 'Page Builder', href: '/admin/pages', icon: FileText },
      { name: 'Flipbook Manager', href: '/admin/flipbooks', icon: FileText },
      { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
    ]
  },
  {
    category: 'ACADEMICS',
    items: [
      {
        name: 'Academics',
        icon: Building,
        isCollapsible: true,
        subItems: [
          { name: 'School Management', href: '/admin/schools' },
          { name: 'Course Management', href: '/admin/courses' },
          { name: 'Academic Catalog', href: '/admin/programmes' },
        ]
      }
    ]
  },
  // {
  //   category: 'SECURITY & ACCESS',
  //   items: [
  //     { 
  //       name: 'Project Identity & Access',
  //       icon: Users,
  //       isCollapsible: true,
  //       subItems: [
  //         { name: 'Users', href: '/admin/users' },
  //         { name: 'Applications', href: '/admin/applications' },
  //         { name: 'Teams', href: '/admin/teams' },
  //       ]
  //     },
  //     { name: 'Audit Logs', href: '/admin/audit-logs', icon: ShieldCheck },
  //     { name: 'API Keys', href: '/admin/api-keys', icon: Key },
  //   ]
  // },
  {
    category: 'SYSTEM',
    items: [
      {
        name: 'System Settings',
        icon: Settings,
        isCollapsible: true,
        subItems: [

          { name: 'Custom CSS', href: '/admin/settings/custom-css' },
        ]
      }
    ]
  }
];

// ─── Sub Item Tree Row ────────────────────────────────────────────────────────
function SubItem({ sub, index, total, activeSubIndex, isMobile, setMobileMenuOpen }) {
  const pathname = usePathname();
  const isSubActive = pathname === sub.href || pathname.startsWith(sub.href + '/');

  const topLineBlue = index <= activeSubIndex;
  const bottomLineBlue = index < activeSubIndex;
  const isLast = index === total - 1;

  const TRUNK_BLUE = 'var(--color-primary)';
  const TRUNK_GRAY = 'var(--border-default)';
  const trunkTop = topLineBlue ? TRUNK_BLUE : TRUNK_GRAY;
  const trunkBottom = bottomLineBlue ? TRUNK_BLUE : TRUNK_GRAY;
  const arrowColor = isSubActive ? TRUNK_BLUE : (topLineBlue ? TRUNK_BLUE : TRUNK_GRAY);

  const TRUNK_X = 26;

  return (
    <li className="relative m-0 p-0 list-none group">
      <div
        className="absolute w-[2px] z-10 transition-colors duration-300 rounded-none"
        style={{
          left: TRUNK_X,
          top: index === 0 ? '-24px' : '0px',
          bottom: '50%',
          backgroundColor: trunkTop,
        }}
      />
      {!isLast && (
        <div
          className="absolute w-[2px] z-10 transition-colors duration-300 rounded-none"
          style={{
            left: TRUNK_X,
            top: '50%',
            bottom: '0px',
            backgroundColor: trunkBottom,
          }}
        />
      )}
      <svg
        className="absolute z-20 pointer-events-none"
        style={{ left: TRUNK_X, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, overflow: 'visible' }}
        viewBox="0 0 20 20" fill="none"
      >
        <path d="M1 10 H16" stroke={arrowColor} strokeWidth="2" className="transition-all duration-300" />
      </svg>

      <Link
        href={sub.href}
        onClick={() => isMobile && setMobileMenuOpen(false)}
        className={`
          relative flex items-center gap-3
          ml-[48px] mr-0 my-0
          py-2.5 px-4 rounded-none border-l-2
          text-[13px] transition-all duration-300 select-none
          ${isSubActive
            ? 'bg-[var(--color-primary-lighter)] text-[var(--color-primary-dark)] font-bold border-[var(--color-primary)]'
            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] font-medium border-transparent'
          }
        `}
      >
        <span
          className={`relative flex h-1.5 w-1.5 shrink-0 items-center justify-center rounded-none transition-all duration-300`}
          style={{ backgroundColor: isSubActive ? 'var(--color-primary)' : 'var(--color-gray-300)' }}
        >
          {isSubActive && (
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-none opacity-40"
              style={{ backgroundColor: 'var(--color-primary-light)' }}
            ></span>
          )}
        </span>
        {sub.name}
      </Link>
    </li>
  );
}

// ─── Main Sidebar ────────────────────────────────────────────────────────────
export default function AdminSidebar({
  isPinned, setIsPinned, isHovered, setIsHovered, isMobile, mobileMenuOpen, setMobileMenuOpen
}) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState({});
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const initialGroups = {};
    const initialItems = {};

    SIDEBAR_MENUS.forEach(group => {
      let hasActiveChild = false;
      group.items.forEach(item => {
        const isDirectActive = item.href && (item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href));
        const isSubItemActive = item.subItems?.some(sub => pathname.startsWith(sub.href));
        if (isDirectActive || isSubItemActive) hasActiveChild = true;
        if (isSubItemActive) initialItems[item.name] = true;
      });
      if (hasActiveChild) initialGroups[group.category] = true;
    });

    setExpandedGroups(
      Object.keys(initialGroups).length
        ? initialGroups
        : { 'OVERVIEW': true, 'CONTENT MANAGEMENT': true }
    );
    setExpandedItems(initialItems);
  }, [pathname]);

  const toggleGroup = (category) => {
    if (!isPinned && !isHovered && !isMobile) setIsPinned(true);
    setExpandedGroups(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const isExpanded = isMobile ? true : (isPinned || isHovered);

  const handleClickItem = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isExpanded && !isMobile) setIsPinned(true);
    setExpandedItems(prev => ({ ...prev, [item.name]: !prev[item.name] }));
  };

  return (
    <>
      {/* ── Mobile Overlay Backdrop ── */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[var(--bg-overlay)] z-40 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Main Sidebar Container ── */}
      <aside
        onMouseEnter={() => !isPinned && !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isPinned && !isMobile && setIsHovered(false)}
        className={`
          bg-[var(--bg-surface)] border-r border-[var(--border-light)] flex flex-col h-screen fixed left-0 top-0 z-50 
          transition-all duration-300 ease-in-out font-sans rounded-none
          ${isMobile
            ? (mobileMenuOpen ? 'w-[280px] translate-x-0 shadow-[var(--shadow-lg)]' : 'w-[280px] -translate-x-full')
            : (isExpanded ? 'w-[294px]' : 'w-[76px]')}
          ${!isPinned && isHovered && !isMobile ? 'shadow-[var(--shadow-lg)]' : ''}
        `}
      >
        {/* ── Brand Header with Smart Logo Integration ── */}
        <div className="flex border-b border-[var(--border-light)] bg-[var(--bg-surface)] rounded-none relative h-[72px] shrink-0 items-center overflow-hidden">

          {/* Mobile Close Button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-4 p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--color-danger)] transition-colors rounded-none z-20"
            >
              <X size={20} strokeWidth={2} />
            </button>
          )}

          {/* Logo Container */}
          <Link href="/admin" className="relative w-full h-full flex items-center cursor-pointer">

            {/* 1. Collapsed Icon (Shows only when sidebar is narrow) */}
            <div
              className={`absolute left-0 w-[76px] h-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100 delay-100'
                }`}
            >
              <img
                src="/icon.png"
                alt="CPU Icon"
                className="w-10 h-10 object-contain drop-shadow-sm rounded-full"
              />
            </div>

            {/* 2. Expanded Full Logo (Shows when sidebar is wide) */}
            <div
              className={`absolute left-6 pr-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] origin-left ${!isExpanded ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100 delay-100'
                }`}
            >
              <img
                src="https://cpur.in/api/media/media/1775536609451-ohn16-logo--cpu-naac.png"
                alt="Career Point University"
                className="max-h-[44px] w-auto object-contain"
              />
            </div>

          </Link>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {SIDEBAR_MENUS.map((group) => {
            const isOpen = expandedGroups[group.category] && isExpanded;

            return (
              <div key={group.category} className="mb-2">
                <button
                  onClick={() => toggleGroup(group.category)}
                  className={`w-full flex items-center justify-between px-6 py-3 bg-[var(--bg-body)] border-y border-[var(--border-light)] hover:bg-[var(--color-gray-200)] transition-colors group rounded-none ${!isExpanded ? 'justify-center px-0' : ''}`}
                >
                  <span className={`text-[11px] font-bold text-[var(--text-secondary)] tracking-[0.15em] uppercase group-hover:text-[var(--text-primary)] transition-colors whitespace-nowrap overflow-hidden ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
                    {group.category}
                  </span>

                  {isExpanded && (
                    <ChevronDown
                      size={15}
                      strokeWidth={2.5}
                      className={`text-[var(--color-gray-400)] group-hover:text-[var(--color-gray-600)] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--color-primary)]' : ''}`}
                    />
                  )}
                  {!isExpanded && <div className="w-5 h-[2px] bg-[var(--border-default)] rounded-none group-hover:bg-[var(--border-dark)] transition-colors" />}
                </button>

                <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen || !isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <ul className="py-2 flex flex-col m-0">
                      {group.items.map((item) => {
                        const isDirectActive = item.href && (item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href)) && !group.items.some(other => other !== item && other.href && pathname.startsWith(other.href) && other.href.length > item.href.length);
                        const isChildActive = !isDirectActive && item.subItems?.some(s => pathname === s.href || pathname.startsWith(s.href + '/'));
                        const isActive = isDirectActive || isChildActive;
                        const isItemExpanded = expandedItems[item.name];
                        const Icon = item.icon;

                        const activeSubIndex = item.subItems
                          ? item.subItems.findIndex(s => pathname === s.href || pathname.startsWith(s.href + '/'))
                          : -1;

                        const itemClasses = [
                          'group relative flex items-center justify-between py-3 px-6 rounded-none text-[14px] transition-all duration-200 cursor-pointer overflow-hidden border-l-[3px]',
                          !isExpanded && 'justify-center w-full px-0',
                          isActive
                            ? 'border-[var(--color-primary)] bg-[var(--color-primary-lighter)] text-[var(--color-primary-dark)] font-semibold'
                            : 'border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:border-[var(--border-default)] hover:text-[var(--text-primary)] font-medium',
                        ].filter(Boolean).join(' ');

                        const itemContent = (
                          <div
                            onClick={(e) => item.isCollapsible && handleClickItem(e, item)}
                            className={itemClasses}
                            title={!isExpanded ? item.name : undefined}
                          >
                            <div className="flex items-center gap-4">
                              <Icon
                                size={20}
                                strokeWidth={isActive ? 2 : 1.5}
                                className={`flex-shrink-0 transition-colors duration-200 ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'}`}
                              />
                              <span className={`whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
                                {item.name}
                              </span>
                            </div>

                            {item.isCollapsible && isExpanded && (
                              <ChevronDown
                                size={16}
                                strokeWidth={2}
                                className={`transition-transform duration-300 flex-shrink-0 ${isItemExpanded ? 'rotate-180 text-[var(--color-primary)]' : 'text-[var(--color-gray-400)] group-hover:text-[var(--color-gray-600)]'}`}
                              />
                            )}
                          </div>
                        );

                        return (
                          <li key={item.name} className="relative rounded-none">
                            {item.isCollapsible ? (
                              <div className="flex flex-col">
                                {itemContent}
                                {isExpanded && (
                                  <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isItemExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                    <div className="overflow-hidden">
                                      <ul className="relative flex flex-col m-0 p-0 pb-1 bg-[var(--bg-body)]">
                                        {item.subItems.map((sub, index) => (
                                          <SubItem
                                            key={sub.href} sub={sub} index={index}
                                            total={item.subItems.length} activeSubIndex={activeSubIndex}
                                            isMobile={isMobile} setMobileMenuOpen={setMobileMenuOpen}
                                          />
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <Link href={item.href} onClick={() => isMobile && setMobileMenuOpen(false)}>
                                {itemContent}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* ── Zero Radius Collapse Toggle (Desktop Only) ── */}
        {!isMobile && (
          <div className={`border-t border-[var(--border-light)] bg-[var(--bg-surface)] flex items-center transition-all duration-300 rounded-none ${isExpanded ? 'justify-end' : 'justify-center'}`}>
            <button
              onClick={() => setIsPinned(!isPinned)}
              className={`
                w-full flex items-center justify-center py-4 px-6 rounded-none transition-all duration-200
                ${isPinned
                  ? 'bg-[var(--bg-body)] text-[var(--text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] justify-end'
                  : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--bg-body)]'
                }
              `}
              title={isPinned ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {isPinned ? <PanelLeftClose size={20} strokeWidth={2} /> : <PanelLeftOpen size={20} strokeWidth={2} />}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}