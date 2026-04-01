'use client';

/**
 * FlipbookViewerWrapper
 * 
 * This thin client wrapper is the ONLY file that should be imported from server components.
 * It uses next/dynamic with ssr:false to ensure react-pdf and react-pageflip
 * (which both execute browser-only code at module evaluation time) are NEVER
 * loaded during Next.js SSR or Turbopack prerendering.
 */
import dynamic from 'next/dynamic';

const FlipbookViewer = dynamic(
  () => import('./FlipbookViewer'),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 w-full h-screen bg-[#020617] flex flex-col items-center justify-center gap-6">
        <div className="book-loader-wrap">
          <div className="bl-page" />
          <div className="bl-page" />
          <div className="bl-page" />
        </div>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-black animate-pulse">
          Loading Viewer...
        </p>
        <style>{`
          .book-loader-wrap { width: 80px; height: 50px; position: relative; border: 4px solid #fff; border-radius: 8px; }
          .bl-page { width: 50%; height: 100%; background: #fff; position: absolute; right: 0; transform-origin: left; animation: bl-flip 2s infinite ease-in-out; border-left: 2px solid #e2e8f0; }
          .bl-page:nth-child(2) { animation-delay: 0.5s; }
          .bl-page:nth-child(3) { animation-delay: 1s; }
          @keyframes bl-flip { 0% { transform: perspective(400px) rotateY(0deg); opacity: 1; } 80% { opacity: 1; } 100% { transform: perspective(400px) rotateY(-180deg); opacity: 0; } }
        `}</style>
      </div>
    )
  }
);

export default FlipbookViewer;
