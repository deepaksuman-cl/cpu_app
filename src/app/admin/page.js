// File: src/app/admin/page.js
import {
  BookOpen, 
  FileText,
  GraduationCap,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import DashboardBanner from '@/components/admin/dashboard/DashboardBanner';

export const metadata = {
  title: 'Dashboard | University Admin',
  description: 'Main admin dashboard',
};

export default function AdminDashboard() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      
      {/* ── 1. Premium Welcome Banner ── */}
      <DashboardBanner />

      {/* ── 2. Quick Navigation Shortcuts ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {[
          { icon: <BookOpen />, label: 'Manage Schools', link: '/admin/schools', color: 'bg-blue-50 text-blue-600' },
          { icon: <GraduationCap />, label: 'Course Catalog', link: '/admin/courses', color: 'bg-indigo-50 text-indigo-600' },
          { icon: <FileText />, label: 'Page Manager', link: '/admin/pages', color: 'bg-emerald-50 text-emerald-600' },
          { icon: <Settings />, label: 'Site Settings', link: '/admin/settings', color: 'bg-slate-50 text-slate-600' },
        ].map((item, idx) => (
          <Link 
            key={idx} 
            href={item.link}
            className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-xl hover:border-[var(--color-primary)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-sm font-sans"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <span className="font-bold text-xs text-gray-700 uppercase tracking-widest leading-tight">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}