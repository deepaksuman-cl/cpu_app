'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  ZoomIn,
  ZoomOut,
  BookOpen,
  Loader2,
  Maximize2,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const PDFJS_CDN  = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const WORKER_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/**
 * FlipbookViewer — Professional canvas-based PDF viewer.
 * Uses PDF.js loaded from CDN to avoid all Next.js/Turbopack bundling issues.
 * Zero npm dependencies for PDF rendering.
 */
export default function FlipbookViewer({ pdf_url, title, cover_image, backdrop_image }) {
  const router  = useRouter();
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  const [pdfDoc,       setPdfDoc]       = useState(null);
  const [numPages,     setNumPages]     = useState(0);
  const [currentPage,  setCurrentPage]  = useState(1);
  const [scale,        setScale]        = useState(1.4);
  const [loading,      setLoading]      = useState(true);
  const [pageLoading,  setPageLoading]  = useState(false);
  const [error,        setError]        = useState(null);
  const [isReady,      setIsReady]      = useState(false);
  const [isClosing,    setIsClosing]    = useState(false);
  const [showCover,    setShowCover]    = useState(!!cover_image);
  const [pageInput,    setPageInput]    = useState('1');
  const [isMobile,     setIsMobile]     = useState(false);

  /* ── Layout ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setScale(0.85);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    const t = setTimeout(() => setIsReady(true), 200);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
      clearTimeout(t);
    };
  }, []);

  /* ── Load PDF.js & Document ── */
  useEffect(() => {
    if (showCover) return;
    let cancelled = false;

    const loadPdf = async () => {
      try {
        // Inject PDF.js from CDN if not already loaded
        if (!window.pdfjsLib) {
          await new Promise((res, rej) => {
            const s = document.createElement('script');
            s.src = PDFJS_CDN;
            s.onload = res;
            s.onerror = rej;
            document.head.appendChild(s);
          });
        }
        if (cancelled) return;
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_CDN;

        const pdf = await window.pdfjsLib.getDocument({ url: pdf_url }).promise;
        if (cancelled) return;

        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load PDF. Please check the file URL.');
          setLoading(false);
        }
      }
    };

    loadPdf();
    return () => { cancelled = true; };
  }, [pdf_url, showCover]);

  /* ── Render Page to Canvas ── */
  const renderPage = useCallback(async (doc, pageNum, sc) => {
    if (!doc || !canvasRef.current) return;
    setPageLoading(true);
    try {
      // cancel() may not return a Promise — use try/catch instead of .catch()
      if (renderTaskRef.current) {
        try { renderTaskRef.current.cancel(); } catch (_) {}
        renderTaskRef.current = null;
      }
      const page     = await doc.getPage(pageNum);

      // Use devicePixelRatio for crisp HD rendering on Retina / high-DPI screens
      const dpr      = window.devicePixelRatio || 1;
      const viewport = page.getViewport({ scale: sc * dpr });
      const canvas   = canvasRef.current;
      const ctx      = canvas.getContext('2d');

      // Physical canvas size = viewport size (already multiplied by dpr)
      canvas.width   = viewport.width;
      canvas.height  = viewport.height;

      // CSS display size = logical size (divided back by dpr) → looks sharp
      canvas.style.width  = `${viewport.width  / dpr}px`;
      canvas.style.height = `${viewport.height / dpr}px`;

      const task = page.render({ canvasContext: ctx, viewport });
      renderTaskRef.current = task;
      await task.promise;
    } catch (e) {
      if (e?.name !== 'RenderingCancelledException') console.error(e);
    } finally {
      setPageLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pdfDoc) renderPage(pdfDoc, currentPage, scale);
  }, [pdfDoc, currentPage, scale, renderPage]);

  /* ── Navigation ── */
  const goTo = (n) => {
    const p = Math.max(1, Math.min(n, numPages));
    setCurrentPage(p);
    setPageInput(String(p));
  };
  const prev = () => goTo(currentPage - 1);
  const next = () => goTo(currentPage + 1);

  /* ── Keyboard ── */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  next();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    prev();
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => router.back(), 450);
  };

  const clampedScale = Math.min(3, Math.max(0.5, scale));

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col transition-all duration-500 ${
        isClosing
          ? 'opacity-0 scale-95'
          : isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
      }`}
      style={{ background: '#050a18' }}
    >

      {/* ── Ambient Backdrop ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {(backdrop_image || cover_image) && (
          <img
            src={backdrop_image || cover_image}
            alt=""
            className="w-full h-full object-cover opacity-10 blur-2xl scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a18]/60 via-transparent to-[#050a18]/80" />
      </div>

      {/* ── Top Bar ── */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.07] flex-shrink-0"
        style={{ background: 'rgba(5,10,24,0.85)', backdropFilter: 'blur(20px)' }}>

        <div className="flex items-center gap-3 min-w-0">
          <BookOpen size={16} className="text-[#4f9cf9] flex-shrink-0" />
          <h1 className="text-white/90 font-bold text-[12px] sm:text-[13px] uppercase tracking-[0.2em] truncate">
            {title || 'Brochure Viewer'}
          </h1>
          {numPages > 0 && (
            <span className="hidden sm:block text-[10px] text-white/30 font-mono ml-2">
              {numPages} pages
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {cover_image && (
            <button
              onClick={() => { setShowCover(v => !v); }}
              className="text-[9px] font-black uppercase tracking-widest px-3 py-2 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
            >
              {showCover ? 'Read PDF' : 'Cover'}
            </button>
          )}
          <a
            href={pdf_url} download
            className="flex items-center gap-1.5 px-3 py-2 text-[9px] font-black uppercase tracking-widest text-white bg-[#1a56db] hover:bg-[#2563eb] transition-colors"
          >
            <Download size={12} /> <span className="hidden sm:block">Download</span>
          </a>
          <button onClick={handleClose}
            className="p-2 border border-white/10 text-white/50 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all group"
          >
            <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </header>

      {/* ── Main Viewer ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center overflow-hidden">

        {/* Cover Mode */}
        {showCover && cover_image ? (
          <div
            className="flex flex-col items-center gap-6 animate-in fade-in-0 duration-500 cursor-pointer group"
            onClick={() => setShowCover(false)}
          >
            <div className="relative" style={{ perspective: '1000px' }}>
              <img
                src={cover_image} alt="Cover"
                className="h-[65vh] max-h-[550px] w-auto object-contain shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 group-hover:scale-[1.02] transition-transform duration-500"
                style={{ boxShadow: '8px 8px 40px rgba(0,0,0,0.9), -2px 0 20px rgba(0,0,0,0.5)' }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-[#1a56db] text-white px-5 py-2.5 text-[11px] font-black uppercase tracking-widest shadow-2xl">
                  Open PDF Reader →
                </div>
              </div>
            </div>
            <p className="text-white/25 text-[10px] uppercase tracking-[0.4em] font-bold">
              Click to open PDF reader
            </p>
          </div>

        ) : (
          /* PDF Canvas Mode */
          <div className="flex-1 w-full flex flex-col items-center overflow-auto py-4 px-2">

            {/* Loading / Error states */}
            {loading && (
              <div className="flex flex-col items-center justify-center gap-4 h-full">
                <Loader2 className="animate-spin text-[#4f9cf9]" size={36} />
                <p className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-bold animate-pulse">
                  Loading PDF...
                </p>
              </div>
            )}
            {error && (
              <div className="flex items-center justify-center h-full px-8">
                <div className="text-center max-w-sm">
                  <div className="text-red-400 text-4xl mb-4">⚠</div>
                  <p className="text-white/60 text-sm">{error}</p>
                  <a href={pdf_url} target="_blank" rel="noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-[#1a56db] text-white text-xs font-bold uppercase tracking-wide">
                    Open PDF Directly →
                  </a>
                </div>
              </div>
            )}

            {!loading && !error && (
              <div className="relative inline-block">
                {/* Page Loading Overlay */}
                {pageLoading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#050a18]/60 backdrop-blur-sm">
                    <Loader2 className="animate-spin text-[#4f9cf9]" size={28} />
                  </div>
                )}
                {/* Page counter badge */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/30 tracking-widest">
                  {currentPage} / {numPages}
                </div>
                <canvas
                  ref={canvasRef}
                  className="block shadow-[0_30px_80px_rgba(0,0,0,0.7)] border border-white/[0.05] max-w-full"
                  style={{ background: '#fff' }}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Bottom Controls ── */}
      {!showCover && !loading && !error && (
        <footer className="relative z-20 flex items-center justify-between gap-4 px-4 sm:px-8 py-3 border-t border-white/[0.07] flex-shrink-0"
          style={{ background: 'rgba(5,10,24,0.9)', backdropFilter: 'blur(20px)' }}>

          {/* Page Navigation */}
          <div className="flex items-center gap-1">
            <button onClick={() => goTo(1)} disabled={currentPage === 1}
              className="p-2 text-white/40 hover:text-white disabled:opacity-30 transition-colors"
              title="First page"><ChevronsLeft size={16} /></button>
            <button onClick={prev} disabled={currentPage === 1}
              className="p-2 text-white/40 hover:text-white disabled:opacity-30 transition-colors"
              title="Previous (←)"><ChevronLeft size={18} /></button>

            {/* Page jump input */}
            <div className="flex items-center gap-1 px-2">
              <input
                type="number" min={1} max={numPages}
                value={pageInput}
                onChange={e => setPageInput(e.target.value)}
                onBlur={() => goTo(parseInt(pageInput) || currentPage)}
                onKeyDown={e => e.key === 'Enter' && goTo(parseInt(pageInput) || currentPage)}
                className="w-12 text-center bg-white/5 border border-white/10 text-white text-[12px] font-mono py-1 outline-none focus:border-[#4f9cf9]/50 transition-colors rounded-none"
              />
              <span className="text-white/30 text-[11px] font-mono">/ {numPages}</span>
            </div>

            <button onClick={next} disabled={currentPage === numPages}
              className="p-2 text-white/40 hover:text-white disabled:opacity-30 transition-colors"
              title="Next (→)"><ChevronRight size={18} /></button>
            <button onClick={() => goTo(numPages)} disabled={currentPage === numPages}
              className="p-2 text-white/40 hover:text-white disabled:opacity-30 transition-colors"
              title="Last page"><ChevronsRight size={16} /></button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <button onClick={() => setScale(s => Math.max(0.5, s - 0.2))}
              className="p-2 text-white/40 hover:text-white transition-colors" title="Zoom out">
              <ZoomOut size={16} />
            </button>
            <span className="text-[10px] font-mono text-white/30 w-10 text-center">
              {Math.round(clampedScale * 100)}%
            </span>
            <button onClick={() => setScale(s => Math.min(3, s + 0.2))}
              className="p-2 text-white/40 hover:text-white transition-colors" title="Zoom in">
              <ZoomIn size={16} />
            </button>
            <button onClick={() => setScale(isMobile ? 0.85 : 1.4)}
              className="text-[9px] px-2 py-1 border border-white/10 text-white/30 hover:text-white hover:border-white/30 font-mono transition-all ml-1">
              Reset
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
