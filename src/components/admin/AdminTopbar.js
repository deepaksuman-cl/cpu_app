// File: src/components/admin/AdminTopbar.js
'use client';
import { Bell, UserCircle } from 'lucide-react';

export default function AdminTopbar() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-gray-800">Welcome Back, Admin</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 cursor-pointer p-1 pr-3 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors">
          <UserCircle size={32} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Super Admin</span>
        </div>
      </div>
    </header>
  );
}