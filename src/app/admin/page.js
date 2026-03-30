// File: src/app/admin/page.js
import {
  ArrowUpRight,
  BookOpen, Calendar,
  FileText,
  GraduationCap,
  IndianRupee,
  PlusCircle, Settings,
  TrendingUp,
  Users
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard | University Admin',
  description: 'Main admin dashboard',
};

export default function AdminDashboard() {
  // Current Date Formatting
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      
      {/* ── 1. Welcome Section ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm font-medium text-[var(--text-muted)] mt-1">
            {today} &middot; Welcome back to the Admin Panel.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/programmes" className="bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--text-primary)] px-4 py-2 text-sm font-bold rounded-lg shadow-[var(--shadow-sm)] hover:bg-[var(--bg-muted)] transition-colors flex items-center gap-2">
            <BookOpen size={16} /> Manage Catalog
          </Link>
          <button className="bg-[var(--color-primary)] text-[var(--color-white)] px-4 py-2 text-sm font-bold rounded-lg shadow-[var(--shadow-md)] hover:bg-[var(--color-primary-dark)] transition-colors flex items-center gap-2">
            <PlusCircle size={16} /> New Admission
          </button>
        </div>
      </div>

      {/* ── 2. Top Statistics Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-xl p-5 shadow-[var(--shadow-sm)] flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-lighter)] flex items-center justify-center shrink-0">
            <Users size={24} className="text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Total Students</p>
            <h3 className="text-2xl font-black text-[var(--text-primary)] leading-none">12,450</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-xl p-5 shadow-[var(--shadow-sm)] flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-success-light)] flex items-center justify-center shrink-0">
            <GraduationCap size={24} className="text-[var(--color-success-dark)]" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Active Programmes</p>
            <h3 className="text-2xl font-black text-[var(--text-primary)] leading-none">54</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-xl p-5 shadow-[var(--shadow-sm)] flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-warning-light)] flex items-center justify-center shrink-0">
            <FileText size={24} className="text-[var(--color-warning-dark)]" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">New Applications</p>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black text-[var(--text-primary)] leading-none">843</h3>
              <span className="flex items-center text-[10px] font-bold text-[var(--color-success)] bg-[var(--color-success-light)] px-1.5 py-0.5 rounded">
                <TrendingUp size={10} className="mr-0.5" /> +12%
              </span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-xl p-5 shadow-[var(--shadow-sm)] flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-info-light)] flex items-center justify-center shrink-0">
            <IndianRupee size={24} className="text-[var(--color-info-dark)]" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Fee Collection</p>
            <h3 className="text-2xl font-black text-[var(--text-primary)] leading-none">₹2.4 Cr</h3>
          </div>
        </div>
      </div>

      {/* ── 3. Main Data Section (Left Table, Right Quick Actions) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Table (Takes 2 columns on large screens) */}
        <div className="lg:col-span-2 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-xl shadow-[var(--shadow-sm)] overflow-hidden">
          <div className="p-5 border-b border-[var(--border-light)] flex justify-between items-center">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Recent Applications</h2>
            <button className="text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] flex items-center gap-1 transition-colors">
              View All <ArrowUpRight size={16} />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-muted)] text-[var(--text-muted)] text-[11px] uppercase tracking-wider">
                  <th className="p-4 font-bold border-b border-[var(--border-light)]">Applicant Name</th>
                  <th className="p-4 font-bold border-b border-[var(--border-light)]">Programme</th>
                  <th className="p-4 font-bold border-b border-[var(--border-light)]">Date applied</th>
                  <th className="p-4 font-bold border-b border-[var(--border-light)]">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[var(--text-secondary)]">
                {[
                  { name: 'Rahul Sharma', prog: 'B.Tech in CSE', date: 'Oct 24, 2025', status: 'Approved', badge: 'bg-[var(--color-success-light)] text-[var(--color-success-dark)]' },
                  { name: 'Priya Patel', prog: 'MBA - Finance', date: 'Oct 23, 2025', status: 'Pending', badge: 'bg-[var(--color-warning-light)] text-[var(--color-warning-dark)]' },
                  { name: 'Amit Kumar', prog: 'Diploma in Civil', date: 'Oct 22, 2025', status: 'Under Review', badge: 'bg-[var(--color-info-light)] text-[var(--color-info-dark)]' },
                  { name: 'Neha Gupta', prog: 'Ph.D in Physics', date: 'Oct 21, 2025', status: 'Approved', badge: 'bg-[var(--color-success-light)] text-[var(--color-success-dark)]' },
                  { name: 'Vikram Singh', prog: 'BCA in AI & ML', date: 'Oct 20, 2025', status: 'Rejected', badge: 'bg-[var(--color-danger-light)] text-[var(--color-danger-dark)]' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[var(--bg-muted)] transition-colors border-b last:border-0 border-[var(--border-light)]">
                    <td className="p-4 font-semibold text-[var(--text-primary)]">{row.name}</td>
                    <td className="p-4">{row.prog}</td>
                    <td className="p-4">{row.date}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${row.badge}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Quick Actions Panel */}
        <div className="space-y-6">
          
          <div className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-xl shadow-[var(--shadow-sm)] p-5">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-5">Quick Actions</h2>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-[var(--border-light)] hover:bg-[var(--bg-muted)] transition-colors group">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--color-primary-lighter)] p-2 rounded-md text-[var(--color-primary)]">
                  <BookOpen size={18} />
                </div>
                <span className="font-semibold text-[var(--text-primary)] text-sm">Update Syllabus</span>
              </div>
              <ChevronRightIcon className="text-[var(--text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-[var(--border-light)] hover:bg-[var(--bg-muted)] transition-colors group">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--color-warning-light)] p-2 rounded-md text-[var(--color-warning-dark)]">
                  <Calendar size={18} />
                </div>
                <span className="font-semibold text-[var(--text-primary)] text-sm">Academic Calendar</span>
              </div>
              <ChevronRightIcon className="text-[var(--text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-[var(--border-light)] hover:bg-[var(--bg-muted)] transition-colors group">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--color-info-light)] p-2 rounded-md text-[var(--color-info-dark)]">
                  <Users size={18} />
                </div>
                <span className="font-semibold text-[var(--text-primary)] text-sm">Staff Directory</span>
              </div>
              <ChevronRightIcon className="text-[var(--text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-[var(--border-light)] hover:bg-[var(--bg-muted)] transition-colors group">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--bg-muted)] p-2 rounded-md text-[var(--text-secondary)]">
                  <Settings size={18} />
                </div>
                <span className="font-semibold text-[var(--text-primary)] text-sm">System Settings</span>
              </div>
              <ChevronRightIcon className="text-[var(--text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

// Chhota helper component right arrow ke liye
function ChevronRightIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}