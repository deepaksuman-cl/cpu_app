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

  // Prepared items for different views
  const mobileItems = allItems.length <= 3 
    ? allItems 
    : [allItems[0], { label: "...", isEllipsis: true }, allItems[allItems.length - 1]];

  return (
    <nav className="bg-slate-50 border-b border-slate-200 w-full" aria-label="Breadcrumb">
      {/* Desktop View: Full breadcrumbs */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 lg:px-16 py-2.5 items-center gap-2 flex-nowrap text-sm overflow-hidden truncate">
        {allItems.map((item, index) => (
          <BreadcrumbItem key={index} item={item} index={index} isLast={index === allItems.length - 1} />
        ))}
      </div>

      {/* Mobile View: Collapsed smart breadcrumbs */}
      <div className="flex md:hidden max-w-7xl mx-auto px-4 py-2 flex-nowrap items-center gap-1.5 text-[13px] overflow-hidden">
        {mobileItems.map((item, index) => (
          <BreadcrumbItem 
            key={index} 
            item={item} 
            index={index} 
            isLast={index === mobileItems.length - 1} 
            isEllipsis={item.isEllipsis}
          />
        ))}
      </div>
    </nav>
  );
}

function BreadcrumbItem({ item, index, isLast, isEllipsis }) {
  if (isEllipsis) {
    return (
      <>
        <span className="text-slate-400 px-1">...</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" aria-hidden="true" />
      </>
    );
  }

  return (
    <React.Fragment>
      {isLast ? (
        <span className="flex items-center gap-1.5 font-bold text-slate-800 truncate" aria-current="page">
          {index === 0 && <Home className="w-3.5 h-3.5 flex-shrink-0" />}
          <span className="truncate">{item.label}</span>
        </span>
      ) : (
        <Link 
          href={item.link} 
          className="flex items-center gap-1.5 font-medium no-underline hover:text-blue-800 text-[#00588b] transition-colors flex-shrink-0 max-w-[120px]"
        >
          {index === 0 && <Home className="w-3.5 h-3.5 flex-shrink-0" />}
          <span className="truncate">{item.label}</span>
        </Link>
      )}
      {!isLast && <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" aria-hidden="true" />}
    </React.Fragment>
  );
}