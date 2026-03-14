'use client';

import React, { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, X, Check, HelpCircle } from 'lucide-react';

// Extract valid icon names more robustly
const allIconNames = Object.keys(LucideIcons).filter(name => {
  const icon = LucideIcons[name];
  return (
    (typeof icon === 'function' || typeof icon === 'object') && 
    /^[A-Z]/.test(name) && 
    name !== 'createLucideIcon' &&
    name !== 'LucideIcon'
  );
});

export default function IconPicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIcons = useMemo(() => {
    if (!searchTerm) return allIconNames.slice(0, 100);
    const lowSearch = searchTerm.toLowerCase();
    return allIconNames
      .filter(name => name.toLowerCase().includes(lowSearch))
      .slice(0, 100);
  }, [searchTerm]);

  const SelectedIcon = (value && LucideIcons[value]) ? LucideIcons[value] : HelpCircle;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-[#fec53a] transition-all w-full text-left group shadow-sm focus:ring-2 focus:ring-[#fec53a]/20 outline-none"
      >
        <div className="p-2 bg-gray-50 rounded-lg text-gray-700 group-hover:text-[#fec53a] transition-colors">
          <SelectedIcon size={20} />
        </div>
        <span className="text-sm font-bold text-gray-700">{value || 'Select Icon'}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close */}
          <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)} />
          
          <div className="absolute z-[100] mt-2 left-0 right-0 md:w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search 1000+ icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
                className="w-full bg-gray-50 border border-gray-100 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#fec53a] outline-none"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-2 custom-scroll scrollbar-thin scrollbar-thumb-[#fec53a]">
              {filteredIcons.map((name) => {
                const Icon = LucideIcons[name];
                const isSelected = value === name;
                return (
                  <button
                    key={name}
                    type="button"
                    title={name}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(name);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-[#fec53a] text-[#00588b] ring-2 ring-[#fec53a]/20' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>

            {filteredIcons.length === 0 && (
              <div className="text-center py-10">
                <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search size={20} className="text-gray-300" />
                </div>
                <p className="text-sm font-bold text-gray-400">No icons for "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-2 text-xs text-blue-600 font-bold hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
