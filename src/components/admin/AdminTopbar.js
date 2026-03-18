// File: src/components/admin/AdminTopbar.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function AdminTopbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      {/* Left - Page Title */}
      <div className="flex items-center gap-6">
        <h1 className="text-base font-semibold text-gray-800">
          Dashboard
        </h1>

        {/* Breadcrumb */}
        <div className="hidden md:flex items-center text-sm text-gray-500 gap-2">
          <span>Admin</span>
          <span>/</span>
          <span className="text-gray-700 font-medium">Dashboard</span>
        </div>
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex items-center w-[400px] relative">
        <Search size={16} className="absolute left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search content..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      {/* Right - Profile */}
      <div className="flex items-center gap-4">

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-gray-50 transition"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
              SA
            </div>

            {/* Name */}
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-800 leading-none">
                Super Admin
              </p>
              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>

            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-sm">

              <div className="px-4 py-3 border-b">
                <p className="text-sm font-medium text-gray-800">
                  Super Admin
                </p>
                <p className="text-xs text-gray-500">
                  admin@cms.com
                </p>
              </div>

              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                Account Settings
              </button>

              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                Preferences
              </button>

              <div className="border-t">
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                  Sign out
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}