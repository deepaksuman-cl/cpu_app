'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, PanelTop, Globe, Phone, Monitor, Layout, Smartphone,
  Database, FileText, ImageIcon, GraduationCap, Scale, Briefcase, 
  ShieldCheck, Users, Key, Settings, BookOpen, ChevronDown,
  PanelLeftClose, PanelLeftOpen, CornerDownRight, Building, Library, PanelBottom
} from 'lucide-react';

const SIDEBAR_MENUS = [
  {
    category: 'OVERVIEW',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { name: 'Database Explorer', href: '/admin/database', icon: Database },
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
      { name: 'Page Builder', href: '/admin/pages', icon: FileText },
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
        ]
      }
    ]
  },
  {
    category: 'SECURITY & ACCESS',
    items: [
      { 
        name: 'Project Identity & Access',
        icon: Users,
        isCollapsible: true,
        subItems: [
          { name: 'Users', href: '/admin/users' },
          { name: 'Applications', href: '/admin/applications' },
          { name: 'Teams', href: '/admin/teams' },
        ]
      },
      { name: 'Audit Logs', href: '/admin/audit-logs', icon: ShieldCheck },
      { name: 'API Keys', href: '/admin/api-keys', icon: Key },
    ]
  },
  {
    category: 'SYSTEM',
    items: [
      { name: 'Global Settings', href: '/admin/settings', icon: Settings },
    ]
  }
];

// ─── Sub Item Tree Row ────────────────────────────────────────────────────────
// Renders each sub-item with:
//  • A vertical trunk line (top-half + bottom-half), blue when active path passes through
//  • A stylish ↳ arrow connector
//  • An active pill highlight
function SubItem({ sub, index, total, activeSubIndex, isMobile, setMobileMenuOpen }) {
  const pathname = usePathname();
  const isSubActive = pathname === sub.href || pathname.startsWith(sub.href + '/');

  // Color the trunk segment blue if the active item is at or below this row
  const topLineBlue  = index <= activeSubIndex;
  // Bottom segment blue if there is a later active item (never on last item)
  const bottomLineBlue = index < activeSubIndex;
  const isLast = index === total - 1;

  // Colors
  const TRUNK_BLUE   = '#1c54a3';
  const TRUNK_GRAY   = '#cbd5e1';
  const trunkTop    = topLineBlue  ? TRUNK_BLUE : TRUNK_GRAY;
  const trunkBottom = bottomLineBlue ? TRUNK_BLUE : TRUNK_GRAY;
  const arrowColor  = isSubActive   ? TRUNK_BLUE : (topLineBlue ? TRUNK_BLUE : TRUNK_GRAY);

  // Left offset for the trunk: aligned with parent icon center
  const TRUNK_X = 28;

  return (
    <li className="relative m-0 p-0 list-none">

      {/* ── Trunk: top half (connects from previous row / parent) ── */}
      <div
        className="absolute w-[2px] z-10 transition-colors duration-200"
        style={{
          left: TRUNK_X,
          // On first item, reach up 24px to overlap the parent row's bottom
          top: index === 0 ? '-24px' : '0px',
          bottom: '50%',
          backgroundColor: trunkTop,
        }}
      />

      {/* ── Trunk: bottom half (connects to next row) ── */}
      {!isLast && (
        <div
          className="absolute w-[2px] z-10 transition-colors duration-200"
          style={{
            left: TRUNK_X,
            top: '50%',
            bottom: '0px',
            backgroundColor: trunkBottom,
          }}
        />
      )}

      {/* ── Corner Arrow ↳ ── */}
      {/*
        We draw a small L-shaped path: vertical stub down then horizontal to the label.
        Using a crisp SVG for pixel-perfect rendering.
      */}
      <svg
        className="absolute z-20 pointer-events-none"
        style={{
          left: TRUNK_X,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 20,
          height: 20,
          overflow: 'visible',
        }}
        viewBox="0 0 20 20"
        fill="none"
      >
        {/* Horizontal arm of the arrow */}
        <path
          d="M1 10 H16"
          stroke={arrowColor}
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-all duration-200"
        />
        {/* Arrowhead */}
        <path
          d="M12 6 L16 10 L12 14"
          stroke={arrowColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-200"
        />
      </svg>

      {/* ── Label Link ── */}
      <Link
        href={sub.href}
        onClick={() => isMobile && setMobileMenuOpen(false)}
        className={`
          flex items-center gap-2
          ml-[52px] mr-3 my-[2px]
          py-[7px] px-3 rounded-lg
          text-[13px] transition-all duration-200 select-none
          ${isSubActive
            ? 'bg-[#1c54a3]/10 text-[#1c54a3] font-semibold ring-1 ring-[#1c54a3]/20'
            : 'text-[#5C6C75] hover:bg-[#f1f5f9] hover:text-[#1c54a3] font-medium'
          }
        `}
      >
        {/* Small dot indicator */}
        <span
          className={`inline-block w-[6px] h-[6px] rounded-full flex-shrink-0 transition-colors duration-200 ${
            isSubActive ? 'bg-[#1c54a3]' : 'bg-transparent border border-[#cbd5e1]'
          }`}
        />
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
  const [expandedItems, setExpandedItems]   = useState({}); 
  
  useEffect(() => {
    const initialGroups = {};
    const initialItems  = {};
    
    SIDEBAR_MENUS.forEach(group => {
      let hasActiveChild = false;
      group.items.forEach(item => {
        const isDirectActive  = item.href && (item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href));
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
    if (!isPinned && !isHovered) setIsPinned(true);
    setExpandedGroups(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const isExpanded = isMobile ? mobileMenuOpen : (isPinned || isHovered);

  const handleClickItem = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isExpanded) setIsPinned(true);
    setExpandedItems(prev => ({ ...prev, [item.name]: !prev[item.name] }));
  };

  return (
    <aside 
      onMouseEnter={() => !isPinned && !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isPinned && !isMobile && setIsHovered(false)}
      className={`
        bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-50 
        transition-all duration-300 ease-in-out font-sans
        ${isMobile
          ? (mobileMenuOpen ? 'w-[260px] translate-x-0' : 'w-[260px] -translate-x-full')
          : (isExpanded ? 'w-[260px]' : 'w-[72px]')}
        ${!isPinned && isHovered ? 'shadow-[10px_0_30px_rgba(0,0,0,0.06)]' : ''}
      `}
    >
      {/* ── Brand Header ── */}
      <div className="flex flex-col border-b border-gray-100 bg-white">
        <div className={`px-5 pt-4 pb-1 overflow-hidden transition-all duration-300 ${!isExpanded ? 'opacity-0 h-0 p-0' : 'opacity-100'}`}>
          <p className="text-[10px] font-bold text-[#5C6C75] uppercase tracking-widest">Organization</p>
        </div>
        <div className={`flex items-center gap-3 px-5 py-3 cursor-pointer group hover:bg-gray-50 transition-colors ${!isExpanded ? 'justify-center py-4' : ''}`}>
          <div className="w-7 h-7 rounded-md bg-[#1c54a3] flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white font-bold text-[14px]">U</span>
          </div>
          <div className={`flex-1 overflow-hidden transition-all duration-300 ${!isExpanded ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>
            <h2 className="text-[14px] font-bold text-[#1C2D38] truncate group-hover:text-[#1c54a3] transition-colors">CPU Admin</h2>
            <p className="text-[12px] text-[#5C6C75] truncate">Management Cloud</p>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {SIDEBAR_MENUS.map((group) => {
          const isOpen = expandedGroups[group.category] && isExpanded;

          return (
            <div key={group.category} className="mb-4">
              {/* Category Header */}
              <button 
                onClick={() => toggleGroup(group.category)}
                className={`w-full flex items-center justify-between px-5 py-2 hover:bg-gray-50 transition-colors group ${!isExpanded ? 'justify-center' : ''}`}
              >
                <span className={`text-[11px] font-bold text-[#5C6C75] tracking-widest uppercase group-hover:text-[#1C2D38] transition-colors whitespace-nowrap overflow-hidden ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
                  {group.category}
                </span>
                {!isExpanded && <div className="w-5 h-[2px] bg-gray-200 rounded-full my-2" />}
              </button>

              {/* Items */}
              <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen || !isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <ul className="py-1 space-y-1">
                    {group.items.map((item) => {
                      const isChildActive  = item.subItems?.some(s => pathname.startsWith(s.href));
                      const isDirectActive = item.href && (item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href));
                      const isActive       = isDirectActive || isChildActive;
                      const isItemExpanded = expandedItems[item.name];
                      const Icon           = item.icon;

                      // Which sub-item index is active? (for trunk coloring)
                      const activeSubIndex = item.subItems
                        ? item.subItems.findIndex(s => pathname === s.href || pathname.startsWith(s.href + '/'))
                        : -1;

                      const itemClasses = [
                        'flex items-center justify-between py-[10px] text-[13px] transition-all cursor-pointer relative group',
                        isExpanded ? 'px-5 border-l-[3px]' : 'justify-center mx-2 rounded-lg px-3',
                        isActive
                          ? isExpanded
                            ? 'border-[#1c54a3] bg-[#f1f5f9] text-[#1c54a3] font-bold'
                            : 'bg-[#1c54a3]/10 text-[#1c54a3]'
                          : isExpanded
                            ? 'border-transparent text-[#1C2D38] hover:bg-[#f8fafc] font-medium'
                            : 'text-[#1C2D38] hover:bg-gray-50',
                      ].join(' ');

                      const itemContent = (
                        <div
                          onClick={(e) => item.isCollapsible && handleClickItem(e, item)}
                          className={itemClasses}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              size={18}
                              strokeWidth={isActive ? 2 : 1.5}
                              className={`flex-shrink-0 transition-colors ${isActive ? 'text-[#1c54a3]' : 'text-[#5C6C75] group-hover:text-[#1c54a3]'}`}
                            />
                            <span className={`whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
                              {item.name}
                            </span>
                          </div>

                          {item.isCollapsible && isExpanded && (
                            <ChevronDown
                              size={15}
                              strokeWidth={2}
                              className={`transition-transform duration-300 flex-shrink-0 ${isItemExpanded ? 'rotate-180 text-[#1c54a3]' : 'text-[#9ca3af]'}`}
                            />
                          )}
                        </div>
                      );

                      return (
                        <li key={item.name} className="relative">
                          {item.isCollapsible ? (
                            <div className="flex flex-col">
                              {itemContent}

                              {/* Accordion sub-items */}
                              {isExpanded && (
                                <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isItemExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                  <div className="overflow-hidden">
                                    <ul className="relative flex flex-col m-0 p-0 pb-2">
                                      {item.subItems.map((sub, index) => (
                                        <SubItem
                                          key={sub.href}
                                          sub={sub}
                                          index={index}
                                          total={item.subItems.length}
                                          activeSubIndex={activeSubIndex}
                                          isMobile={isMobile}
                                          setMobileMenuOpen={setMobileMenuOpen}
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

      {/* ── Collapse Toggle ── */}
      {!isMobile && (
        <div className={`p-3 border-t border-gray-100 bg-white flex items-center transition-all ${isExpanded ? 'justify-end' : 'justify-center'}`}>
          <button
            onClick={() => setIsPinned(!isPinned)}
            className="p-1.5 text-[#5C6C75] hover:text-[#1c54a3] hover:bg-[#1c54a3]/10 rounded-md transition-colors"
            title={isPinned ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isPinned ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </button>
        </div>
      )}
    </aside>
  );
}