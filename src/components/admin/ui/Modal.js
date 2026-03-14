'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = 'xl',
  footer,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeMap = {
    sm:    'max-w-md',
    md:    'max-w-2xl',
    lg:    'max-w-4xl',
    xl:    'max-w-5xl',
    '2xl': 'max-w-6xl',
    full:  'max-w-[96vw]',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0b1220]/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Panel  — border-radius: 0 globally */}
      <div
        style={{ borderRadius: 0 }}
        className={`
          relative z-[110] w-full ${sizeMap[size] || sizeMap.xl}
          bg-white flex flex-col max-h-[90vh] overflow-hidden
          shadow-[0_40px_100px_rgba(0,0,0,0.25)]
          animate-in slide-in-from-bottom-4 duration-200
        `}
      >

        {/* ═══ HEADER ════════════════════════════════════════════════ */}
        <div className="flex-shrink-0 bg-white border-b border-gray-100">
          {/* Bold top accent */}
          <div className="h-[3px] w-full bg-[#1c54a3]" />

          <div className="flex items-center justify-between px-7 py-[14px]">
            <div className="min-w-0">
              <h3 className="text-[14px] font-bold text-[#1C2D38] truncate leading-snug tracking-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[11px] text-gray-400 mt-0.5 truncate">{subtitle}</p>
              )}
            </div>

            <button
              onClick={onClose}
              style={{ borderRadius: 0 }}
              className="ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center
                text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
              aria-label="Close"
            >
              <X size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* ═══ BODY ══════════════════════════════════════════════════ */}
        <div className="flex-1 overflow-y-auto bg-[#f7f8fc] p-6 sm:p-7
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-gray-200"
        >
          {children}
        </div>

        {/* ═══ FOOTER ════════════════════════════════════════════════ */}
        {footer && (
          <div className="flex-shrink-0 bg-white border-t border-gray-100 px-7 py-4
            flex items-center justify-between gap-4"
          >
            {footer}
          </div>
        )}

      </div>
    </div>
  );
}