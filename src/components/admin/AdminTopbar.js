'use client';

import { Bell, ChevronDown, LogOut, Menu, Settings, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import SyncSchoolData from './SyncSchoolData';

export default function TopHeader({ setMobileMenuOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  
  // 🔥 Get current user session
  const { data: session } = useSession();

  // Safely extract user details
  const userName = session?.user?.name || "Admin User";
  const userEmail = session?.user?.email || "admin@cpu.com";
  const userRole = session?.user?.role === 'super_admin' ? 'Super Admin' : 'Admin';
  const profilePic = session?.user?.profilePic;
  const userInitial = userName.charAt(0).toUpperCase();

  // Handle Logout securely
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="h-[72px] bg-[var(--bg-surface)] border-b border-[var(--border-light)] flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-40 transition-all duration-300">
      
      {/* ── Left Section ── */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--color-primary)] transition-colors rounded-none border border-transparent hover:border-[var(--border-default)]"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* ── Right Section ── */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* <button 
            onClick={() => setIsSyncModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline">Sync DB</span>
          </button> */}
        {/* Notification Bell */}
        <button 
          className="relative p-2.5 text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--color-primary)] transition-all duration-200 rounded-none border border-transparent hover:border-[var(--border-light)] group"
          title="Notifications"
        >
          <Bell size={20} className="transition-transform group-hover:rotate-12" />
          {hasNotification && (
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-[var(--color-danger)] opacity-75"></span>
              <span className="relative inline-flex rounded-none h-2 w-2 bg-[var(--color-danger)]"></span>
            </span>
          )}
        </button>

        <div className="h-8 w-[2px] bg-[var(--border-light)] hidden sm:block mx-1"></div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-3 p-1.5 transition-colors duration-200 rounded-none border ${isProfileOpen ? 'bg-[var(--bg-muted)] border-[var(--border-default)]' : 'border-transparent hover:bg-[var(--bg-muted)] hover:border-[var(--border-light)]'}`}
          >
            {/* 🔥 Dynamic Avatar Box */}
            <div className="w-9 h-9 bg-[var(--color-primary)] flex items-center justify-center shrink-0 rounded-none border border-[var(--color-primary-dark)] shadow-sm overflow-hidden relative">
              {profilePic && profilePic !== '/default-avatar.png' ? (
                <Image src={profilePic} alt={userName} fill className="object-cover" />
              ) : (
                <span className="text-[var(--color-white)] font-bold text-[14px]">{userInitial}</span>
              )}
            </div>
            
            {/* 🔥 Dynamic Name & Role */}
            <div className="hidden md:flex flex-col text-left pr-1">
              <span className="text-[13px] font-bold text-[var(--text-primary)] leading-none tracking-wide">{userName}</span>
              <span className="text-[11px] text-[var(--text-muted)] mt-1 font-medium">{userRole}</span>
            </div>

            <ChevronDown 
              size={16} 
              strokeWidth={2.5}
              className={`text-[var(--text-muted)] transition-transform duration-300 hidden sm:block ${isProfileOpen ? 'rotate-180 text-[var(--color-primary)]' : ''}`} 
            />
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
              
              <div className="absolute right-0 mt-3 w-56 bg-[var(--bg-surface)] border border-[var(--border-light)] shadow-[var(--shadow-lg)] z-50 rounded-none py-1 origin-top-right transition-all animate-in fade-in slide-in-from-top-2 duration-200">
                
                <div className="px-4 py-3 border-b border-[var(--border-light)] bg-[var(--bg-body)]">
                  <p className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-1">Signed in as</p>
                  {/* 🔥 Dynamic Email */}
                  <p className="text-[13px] text-[var(--text-primary)] font-bold truncate">{userEmail}</p>
                </div>
                
                <div className="py-2 flex flex-col">
                  <a href="#profile" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--color-primary)] hover:border-l-[3px] border-transparent hover:border-[var(--color-primary)] transition-all">
                    <User size={16} />
                    My Profile
                  </a>
                  <a href="#settings" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--color-primary)] hover:border-l-[3px] border-transparent hover:border-[var(--color-primary)] transition-all">
                    <Settings size={16} />
                    Account Settings
                  </a>
                </div>
                
                <div className="border-t border-[var(--border-light)] py-2">
                  {/* 🔥 Working Logout Button */}
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-bold text-[var(--color-danger)] hover:bg-[var(--color-danger-light)] hover:border-l-[3px] border-transparent hover:border-[var(--color-danger)] transition-all"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>

              </div>
            </>
          )}
        </div>
      </div>
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-lg mx-4 bg-white rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsSyncModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Sync Component Render */}
            <div className="p-2">
              <SyncSchoolData />
            </div>

          </div>
        </div>
      )}
    </header>
    
  );
}