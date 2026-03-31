'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  X
} from 'lucide-react';

// Configure the PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function FlipbookViewer({ pdf_url, title, cover_image, backdrop_image }) {
  const router = useRouter();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullyReady, setIsFullyReady] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  const bookRef = useRef(null);

  // Responsive Check and body overflow lock
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    document.body.style.overflow = 'hidden';
    
    // Controlled entry animation delay
    const timer = setTimeout(() => setIsFullyReady(true), 1200);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => router.back(), 500); 
  };

  const nextSide = () => bookRef.current?.pageFlip().flipNext();
  const prevSide = () => bookRef.current?.pageFlip().flipPrev();

  // Professional Page Dimensions (Responsive Magazine View)
  const pageWidth = isMobile ? 315 : 520;
  const pageHeight = isMobile ? 470 : 715;

  return (
    <div className={`relative w-full h-screen overflow-hidden flex flex-col items-center justify-center select-none bg-[#020617] font-sans transition-all duration-700 ${isClosing ? 'opacity-0 scale-95 blur-2xl' : 'opacity-100 scale-100'}`}>
      
      {/* ── High-Fidelity Backdrop (Clear Image) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle overlay to ensure text readability without killing the image visibility */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-[2px] z-10"></div>
        {backdrop_image ? (
          <img src={backdrop_image} alt="" className="w-full h-full object-cover scale-100 opacity-90 transition-opacity duration-1000" />
        ) : cover_image ? (
          <img src={cover_image} alt="" className="w-full h-full object-cover scale-100 opacity-70 blur-[4px] transition-opacity duration-1000" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]" />
        )}
      </div>

      {/* ── Fixed Control Interface ── */}
      <div className="absolute top-0 right-0 z-[120] p-6 lg:p-10">
        <button 
          onClick={handleClose}
          className="text-white/60 hover:text-white bg-black/20 hover:bg-[#1c54a3] p-3 rounded-full transition-all border border-white/10 hover:border-[#1c54a3]/40 backdrop-blur-3xl cursor-pointer group shadow-2xl"
          title="Exit Magazine View"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Branding Overlay */}
      <div className="absolute top-0 left-0 z-[110] p-10 hidden lg:block">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
             <div className="h-6 w-1 bg-[#1c54a3] shadow-[0_0_15px_#1c54a3]"></div>
             <h2 className="text-white font-black text-sm uppercase tracking-[0.4em] drop-shadow-2xl">{title || "Active Module"}</h2>
          </div>
        </div>
      </div>

      {/* ── Professional Navigation Arrows (Fixed at screen edges) ── */}
      {!loading && !isMobile && (
        <>
          <button 
            onClick={prevSide}
            disabled={pageNumber <= 1}
            className="absolute left-10 top-1/2 -translate-y-1/2 z-[110] text-white/20 hover:text-white bg-black/20 hover:bg-[#1c54a3]/20 p-6 rounded-full transition-all border border-white/5 hover:border-[#1c54a3]/40 backdrop-blur-sm disabled:opacity-0 disabled:pointer-events-none group shadow-3xl"
          >
            <ChevronLeft size={44} strokeWidth={1.5} className="group-hover:-translate-x-1.5 transition-transform" />
          </button>
          <button 
            onClick={nextSide}
            disabled={pageNumber >= (numPages + (cover_image ? 1 : 0))}
            className="absolute right-10 top-1/2 -translate-y-1/2 z-[110] text-white/20 hover:text-white bg-black/20 hover:bg-[#1c54a3]/20 p-6 rounded-full transition-all border border-white/5 hover:border-[#1c54a3]/40 backdrop-blur-sm disabled:opacity-0 disabled:pointer-events-none group shadow-3xl"
          >
            <ChevronRight size={44} strokeWidth={1.5} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </>
      )}

      {/* ── Main Book Engine (Centering Force) ── */}
      <div 
        className={`relative z-[10] transition-all duration-[1000ms] cubic-bezier(0.34,1.56,0.64,1) flex items-center justify-center w-full h-full pb-32 pt-20 ${isFullyReady ? 'scale-100 opacity-100' : 'scale-[0.8] opacity-0 blur-xl'}`}
      >
        <div style={{ transform: `scale(${scale})` }} className="transition-transform duration-500 ease-out flex items-center justify-center">
          {!loadError && (
            <Document 
              file={pdf_url} 
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(err) => setLoadError(err.message)}
              
            >
              {numPages && (
                <HTMLFlipBook 
                  width={pageWidth} height={pageHeight}
                  size="stretch"
                  minWidth={300} maxWidth={1400}
                  minHeight={400} maxHeight={1600}
                  maxShadowOpacity={0.3}
                  showCover={true}
                  mobileScrollSupport={true}
                  usePortrait={isMobile}
                  onFlip={(e) => setPageNumber(e.data + 1)}
                  className="mx-auto shadow-[0_50px_100px_rgba(0,0,0,1)]"
                  ref={bookRef}
                  useMouseEvents={!loading}
                  flippingTime={1000}
                  startPage={0}
                  drawShadow={true}
                >
                  {/* Page 1: Custom Cover (Ensured white background for transparency) */}
                  {cover_image && (
                    <div className="bg-white overflow-hidden shadow-inner relative page-sheet flex items-center justify-center">
                       <img src={cover_image} alt="Front Cover" className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-l from-black/5 via-transparent to-transparent"></div>
                       {/* Spine realism */}
                       <div className="absolute right-0 top-0 bottom-0 w-1 bg-black/10"></div>
                    </div>
                  )}

                  {/* Following PDF Pages */}
                  {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} className="bg-white overflow-hidden shadow-inner relative page-sheet">
                       <div className="w-full h-full relative">
                        <Page 
                           pageNumber={index + 1} 
                           scale={2.5}
                           renderAnnotationLayer={false}
                           renderTextLayer={false}
                           className="bg-white flex items-center justify-center w-full h-full"
                         />
                          {/* Page spine shadow */}
                          <div className={`absolute inset-0 pointer-events-none ${index % 2 === 0 ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-black/[0.1] via-transparent to-transparent`}></div>
                       </div>
                    </div>
                  ))}
                </HTMLFlipBook>
              )}
            </Document>
          )}
        </div>
      </div>

      {/* ── Fixed Bottom Telemetry (Professional & Never Cut-off) ── */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="bg-black/30 backdrop-blur-3xl border border-white/10 h-16 px-10 rounded-[32px] flex items-center gap-10 shadow-3xl">
          <div className="flex flex-col items-start justify-center border-r border-white/10 pr-10">
            <span className="text-[10px] font-black text-[#1c54a3] uppercase tracking-[0.4em] mb-1 opacity-100">BROCHURE</span>
            <span className="text-white font-mono text-base font-black tracking-widest leading-none">
              {pageNumber.toString().padStart(2, '0')}<span className="opacity-10 mx-2 tracking-tighter">/</span>{(numPages + (cover_image ? 1 : 0)).toString().padStart(2, '0')}
            </span>
          </div>
          
          <div className="flex items-center gap-8">
             <button onClick={() => setScale(prev => Math.max(0.5, prev - 0.25))} className="text-white/20 hover:text-white transition-all transform active:scale-90"><ZoomOut size={20} /></button>
             <button onClick={() => setScale(prev => Math.min(2.5, prev + 0.25))} className="text-white/20 hover:text-white transition-all transform active:scale-90"><ZoomIn size={20} /></button>
          </div>

          <a href={pdf_url} download className="bg-[#1c54a3] hover:bg-white text-white hover:text-[#1c54a3] p-4 rounded-[18px] transition-all shadow-[0_15px_40px_rgba(28,84,163,0.3)] active:scale-95 ml-2">
            <Download size={24} strokeWidth={2.5} />
          </a>
        </div>
      </div>

      {/* Mobile-Only Navigation Controls (Compact & Screen-Edge) */}
      {isMobile && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-14 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-full px-12 py-5 shadow-3xl">
           <button onClick={prevSide} disabled={pageNumber <= 1} className="text-white/40 active:text-[#1c54a3] disabled:opacity-5"><ChevronLeft size={32} /></button>
           <div className="h-8 w-[1px] bg-white/10"></div>
           <button onClick={nextSide} disabled={pageNumber >= (numPages + (cover_image ? 1 : 0))} className="text-white/40 active:text-[#1c54a3] disabled:opacity-5"><ChevronRight size={32} /></button>
        </div>
      )}

      {/* Loader Engine */}
      {loading && (
        <div className="absolute inset-0 z-[130] flex flex-col items-center justify-center bg-[#020617] gap-10">
           <div className="book-loader">
              <div className="book-page"></div>
              <div className="book-page"></div>
              <div className="book-page"></div>
           </div>
           <div className="text-center">
              <h3 className="text-white font-black text-xs uppercase tracking-[1em] animate-pulse">Initializing Assets</h3>
           </div>
        </div>
      )}

      <style jsx global>{`
        body { overflow: hidden !important; background: #020617 !important; margin: 0; }
        .stf__wrapper { background: transparent !important; }
        .stf__block { background: transparent !important; }
        .page-sheet { background-color: #fff; }
        
        .book-loader {
          width: 80px; height: 50px; position: relative; border: 4px solid #fff; border-radius: 8px;
          box-shadow: 0 40px 90px rgba(0,0,0,0.8);
        }
        .book-page {
          width: 50%; height: 100%; background: #fff; position: absolute; right: 0; transform-origin: left;
           animation: flip-engine 2s infinite ease-in-out; border-left: 2px solid #e2e8f0;
        }
        .book-page:nth-child(2) { animation-delay: 0.5s; }
        .book-page:nth-child(3) { animation-delay: 1s; }
        
        @keyframes flip-engine {
          0% { transform: perspective(400px) rotateY(0deg); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: perspective(400px) rotateY(-180deg); opacity: 0; }
        }

        .react-pdf__Page__canvas { 
          margin: 0 auto; 
          max-width: 100% !important; 
          max-height: 100% !important; 
          width: 100% !important; 
          height: auto !important; 
          object-fit: contain; 
        }
        .react-pdf__Document { display: flex; justify-content: center; align-items: center; }
      `}</style>
    </div>
  );
}
