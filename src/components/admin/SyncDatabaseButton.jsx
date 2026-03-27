'use client';

import { useState } from 'react';
import { RefreshCw, Database, AlertTriangle, ShieldAlert } from 'lucide-react';
import { globalReset } from '@/lib/actions/resetActions';
import { toast } from 'react-hot-toast';

export default function SyncDatabaseButton() {
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    const isConfirmed = window.confirm(
      "☢️ CRITICAL ARCHITECTURAL RESET\n\n" +
      "This will WIPE the entire MariaDB database and REBUILD everything from scratch using workspace JSON files.\n\n" +
      "Proceed with the Nuclear Reset?"
    );
    
    if (!isConfirmed) return;

    setLoading(true);
    const toastId = toast.loading('🚀 Executing True Global Reset & System Restoration...');

    try {
      const res = await globalReset();
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 8000 });
        // Hard refresh to reload all data
        setTimeout(() => window.location.reload(), 3000);
      } else {
        toast.error(`Reset Failed: ${res.error}`, { id: toastId });
      }
    } catch (error) {
      toast.error(`System Error: ${error.message}`, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-600 to-red-800 border border-red-500 rounded-xl p-6 shadow-2xl text-white relative overflow-hidden group">
      {/* Decorative background icon */}
      <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
        <ShieldAlert size={160} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
            <Database className={`${loading ? 'animate-bounce' : 'animate-pulse'}`} size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter italic">True Global Reset</h2>
            <div className="flex items-center gap-2 text-[10px] bg-red-400/30 px-2 py-0.5 rounded-full w-fit mt-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
              ARCHITECT MODE ACTIVE
            </div>
          </div>
        </div>

        <p className="text-sm text-red-100/80 mb-6 leading-relaxed font-medium">
          The "Nuclear Option" for complete system restoration. This drops all tables and rebuilds the 
          entire relational schema and website content from JSON sources.
        </p>

        <button
          onClick={handleReset}
          disabled={loading}
          className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-[0_10px_20px_rgba(0,0,0,0.3)]
            ${loading 
              ? 'bg-red-900/50 text-red-300 cursor-not-allowed' 
              : 'bg-white text-red-700 hover:bg-red-50 hover:shadow-white/20'
            }`}
        >
          {loading ? (
            <>
              <RefreshCw size={20} className="animate-spin" />
              Restoring System...
            </>
          ) : (
            <>
              <AlertTriangle size={20} />
              Global Reset & Restore
            </>
          )}
        </button>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="bg-black/20 p-2 rounded text-[9px] font-bold text-center uppercase tracking-widest border border-white/5">
            Schema Wipe
          </div>
          <div className="bg-black/20 p-2 rounded text-[9px] font-bold text-center uppercase tracking-widest border border-white/5">
            V2 Relational
          </div>
          <div className="bg-black/20 p-2 rounded text-[9px] font-bold text-center uppercase tracking-widest border border-white/5">
            JSON Re-Seed
          </div>
          <div className="bg-black/20 p-2 rounded text-[9px] font-bold text-center uppercase tracking-widest border border-white/5">
            Full Recovery
          </div>
        </div>
      </div>
    </div>
  );
}
