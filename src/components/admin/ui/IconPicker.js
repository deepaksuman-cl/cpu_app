'use client';

import React, { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
const Search = LucideIcons.Search || (() => null);
// Ultra-defensive fallback component
const HelpCircle = LucideIcons.CircleHelp || LucideIcons.HelpCircle || LucideIcons.Info || LucideIcons.Search || (() => null);

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
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 bg-white border border-gray-300 hover:border-[#00588b] transition-colors w-full text-left group shadow-sm focus:outline-none focus:border-[#00588b] focus:ring-1 focus:ring-[#00588b]"
      >
        <div className="p-1.5 bg-gray-50 text-gray-700 group-hover:text-[#00588b] transition-colors border border-gray-200">
          <SelectedIcon size={18} />
        </div>
        <span className="text-sm font-semibold text-gray-700 flex-1 truncate">
          {value || 'Select Icon'}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop to close */}
          <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)} />
          
          {/* 🔴 FIX: Changed left-0 to right-0, added top-full, and set a fixed safe width */}
          <div className="absolute z-[100] top-full mt-1 right-0 w-[280px] bg-white border border-gray-300 shadow-xl p-3 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
            
            {/* Search Input */}
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
                className="w-full bg-white border border-gray-300 pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-[#00588b] focus:ring-1 focus:ring-[#00588b] transition-colors"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Icons Grid */}
            <div className="grid grid-cols-5 gap-1 max-h-60 overflow-y-auto pr-1 custom-scroll scrollbar-thin scrollbar-thumb-gray-300">
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
                    className={`p-2 flex items-center justify-center transition-colors border ${
                      isSelected 
                        ? 'bg-[#fec53a] border-[#fec53a] text-[#00588b]' 
                        : 'bg-transparent border-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredIcons.length === 0 && (
              <div className="text-center py-8 border border-dashed border-gray-300 mt-2 bg-gray-50">
                <Search size={18} className="text-gray-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-500">No icons found for "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-2 text-xs text-[#00588b] font-bold hover:underline"
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