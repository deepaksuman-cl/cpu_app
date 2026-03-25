'use client';

import { useState } from 'react';

export default function ColorPicker({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-default)] p-1.5 rounded-none h-[38px]">
      <div 
        className="w-8 h-full border border-[var(--border-light)] rounded-none"
        style={{ backgroundColor: value || '#00588b' }}
      >
        <input 
          type="color" 
          value={value || '#00588b'} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <input 
        type="text" 
        value={value || ''} 
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        className="flex-1 bg-transparent text-[11px] font-mono outline-none border-none text-[var(--text-primary)] uppercase"
      />
    </div>
  );
}
