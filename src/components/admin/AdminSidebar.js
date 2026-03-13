// File: src/components/admin/AdminSidebar.js
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, PanelTop, Settings, Users, FileText, 
  ChevronDown, Globe, Phone, Monitor, Layout, Smartphone,
  ExternalLink
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [headerOpen, setHeaderOpen] = useState(pathname.includes('/admin/header'));

  const menuGroups = [
    {
      name: 'Main',
      items: [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      ]
    },
    {
      name: 'Content Management',
      items: [
        { 
          name: 'Header Settings', 
          href: '#', 
          icon: PanelTop,
          isCollapsible: true,
          isOpen: headerOpen,
          toggle: () => setHeaderOpen(!headerOpen),
          subItems: [
            { name: 'Site Config', href: '/admin/header/site-config', icon: Globe },
            { name: 'Top Bar', href: '/admin/header/top-bar', icon: Phone },
            { name: 'Desktop Menus', href: '/admin/header/desktop-menus', icon: Monitor },
            { name: 'Sidebar Menus', href: '/admin/header/sidebar-menus', icon: Layout },
            { name: 'Mobile Config', href: '/admin/header/mobile-config', icon: Smartphone },
          ]
        },
        { name: 'Page Builder', href: '/admin/pages', icon: FileText },
      ]
    },
    {
      name: 'System',
      items: [
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'General Settings', href: '/admin/settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#09090b] text-gray-400 flex flex-col h-screen fixed left-0 top-0 border-r border-white/5 z-50">
      <div className="p-6 border-b border-white/5 bg-[#09090b]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-[#fec53a] flex items-center justify-center">
            <span className="text-gray-900 font-bold text-xl">C</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">CPU Admin</h2>
        </div>
        <p className="text-[10px] uppercase tracking-[2px] font-bold text-gray-500">Management Cloud</p>
      </div>

      <nav className="flex-1 p-4 space-y-8 overflow-y-auto sidebar-scroll">
        {menuGroups.map((group) => (
          <div key={group.name} className="space-y-2">
            <h3 className="text-[10px] uppercase tracking-[1.5px] font-bold text-gray-600 px-4 mb-3">{group.name}</h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.subItems?.some(s => pathname === s.href));
                
                if (item.isCollapsible) {
                  return (
                    <div key={item.name} className="space-y-1">
                      <button 
                        onClick={item.toggle}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                          isActive ? 'text-white' : 'hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className={isActive ? 'text-[#fec53a]' : 'text-gray-500 group-hover:text-gray-300'} />
                          <span className="text-sm font-semibold">{item.name}</span>
                        </div>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${item.isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${item.isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="ml-4 pl-4 border-l border-white/5 space-y-1 mt-1">
                          {item.subItems.map((sub) => {
                            const SubIcon = sub.icon;
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link 
                                key={sub.name}
                                href={sub.href}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
                                  isSubActive 
                                    ? 'bg-[#fec53a] text-gray-900 shadow-lg shadow-[#fec53a]/10' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <SubIcon size={14} />
                                {sub.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive ? 'bg-[#fec53a] text-gray-900 font-bold shadow-lg shadow-[#fec53a]/10' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-300'} />
                    <span className="text-sm font-semibold">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 bg-[#09090b]/50">
        <Link 
          href="/" 
          target="_blank"
          className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600/10 to-[#fec53a]/10 border border-white/5 hover:border-white/10 transition-all group"
        >
          <div className="flex items-center gap-2">
            <Monitor size={14} className="text-[#fec53a]" />
            <span className="text-[12px] font-bold text-gray-300">View Website</span>
          </div>
          <ExternalLink size={12} className="text-gray-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </aside>
  );
}