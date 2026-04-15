'use client';

import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to perform this action? This cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = 'danger', // 'danger' or 'warning' or 'primary'
  loading = false 
}) {
  const variantStyles = {
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white',
    primary: 'bg-[#1c54a3] hover:bg-[#153e7a] text-white'
  };

  const iconStyles = {
    danger: 'bg-red-50 text-red-500',
    warning: 'bg-amber-50 text-amber-500',
    primary: 'bg-blue-50 text-blue-500'
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-700 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-sm ${variantStyles[variant] || variantStyles.danger} disabled:opacity-50`}
          >
            {loading ? (
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : null}
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      }
    >
      <div className="flex items-start gap-5 py-2">
        <div className={`p-3.5 flex-shrink-0 ${iconStyles[variant] || iconStyles.danger}`}>
          <AlertTriangle size={24} strokeWidth={2.5} />
        </div>
        <div className="space-y-2">
          <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
            {message}
          </p>
          <p className="text-[11px] text-gray-400 italic">
            Please double-check before proceeding.
          </p>
        </div>
      </div>
    </Modal>
  );
}
