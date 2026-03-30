'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';

const routeMappings = {
  'schools': 'Schools & Departments',
  'programmes': 'Academic Programmes',
  'about': 'About Us',
  'contact': 'Contact Us',
  'admission': 'Admissions',
};

const slugToTitle = (slug) => {
  if (routeMappings[slug.toLowerCase()]) {
    return routeMappings[slug.toLowerCase()];
  }
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function Breadcrumb() {
  const pathname = usePathname();

  // 1. Hide on Home Page and Admin
  if (pathname === '/' || pathname === '/admin' || pathname.startsWith('/admin')) return null;

  const pathSegments = pathname.split('/').filter(item => item !== "");
  
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const link = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return {
      label: slugToTitle(segment),
      link: link,
      isLast: index === pathSegments.length - 1
    };
  });

  // Always starting with Home as root
  const allItems = [{ label: "Home", link: "/", isLast: false }, ...breadcrumbItems];

  return (
    <nav className="bg-slate-50 border-b border-slate-200 w-full" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 lg:px-16 py-2.5 flex items-center gap-2 flex-wrap text-[13px] md:text-sm">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          
          return (
            <React.Fragment key={index}>
              {isLast ? (
                <span className="flex items-center gap-1.5 font-bold text-slate-800 pointer-events-none" aria-current="page">
                  {index === 0 && <Home className="w-3.5 h-3.5" />}
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.link} 
                  className="flex items-center gap-1.5 font-medium no-underline hover:text-blue-800 text-[#00588b] transition-colors"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5" />}
                  {item.label}
                </Link>
              )}
              
              {!isLast && <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" aria-hidden="true" />}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}