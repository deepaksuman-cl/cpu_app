'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CompactCopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied!`, {
      style: {
        borderRadius: '0',
        background: '#0f172a',
        color: '#fff',
        fontSize: '11px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      title={`Copy ${label}`}
      className="p-1 hover:bg-slate-200 transition-colors group"
    >
      {copied ? (
        <Check size={11} className="text-emerald-600 animate-in zoom-in" />
      ) : (
        <Copy size={11} className="text-slate-400 group-hover:text-slate-600" />
      )}
    </button>
  );
}
