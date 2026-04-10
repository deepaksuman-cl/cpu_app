"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Grid2X2, LayoutGrid, Grid3X3, Images, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   🎨 COMPONENT STYLES
═══════════════════════════════════════════════════════════════ */
const GALLERY_STYLES = `
  /* ── Grid columns ── */
  .gs-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .gs-grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .gs-grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .gs-grid-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }

  @media (max-width: 639px) {
    .gs-grid-2,.gs-grid-3,.gs-grid-4,.gs-grid-5 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (min-width: 640px) and (max-width: 1023px) {
    .gs-grid-4,.gs-grid-5 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  /* ── Image Card ── */
  .gs-card {
    position: relative;
    overflow: hidden;
    border-radius: 0.875rem;
    cursor: pointer;
    transition: transform 0.32s ease, box-shadow 0.32s ease;
  }
  .gs-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 24px 48px rgba(0, 88, 139, 0.2);
  }
  .gs-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }
  .gs-card:hover img { transform: scale(1.08); }

  /* ── Hover Overlay ── */
  .gs-overlay {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.28s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 88, 139, 0.45);
  }
  .gs-card:hover .gs-overlay { opacity: 1; }

  /* ── Zoom Button ── */
  .gs-zoom {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-decoration: none;
    transform: scale(0.75);
    opacity: 0;
    transition: transform 0.28s ease, opacity 0.28s ease, background 0.2s ease;
    cursor: pointer;
  }
  .gs-card:hover .gs-zoom {
    transform: scale(1);
    opacity: 1;
  }
  .gs-zoom:hover {
    background: #ffb900;
    border-color: #ffb900;
    color: #001c3a;
  }

  /* ── Grid Button ── */
  .gs-grid-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 44px;
    height: 44px;
    border-radius: 0.6rem;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    border: 1.5px solid #b3d6ed;
    color: #00588b;
    background: #fff;
    transition: all 0.2s ease;
  }
  .gs-grid-btn:hover { border-color: #00588b; background: #e6f2f9; }
  .gs-grid-btn.active {
    background: #00588b;
    color: #fff;
    border-color: #00588b;
    box-shadow: 0 4px 14px rgba(0, 88, 139, 0.3);
  }

  /* ── Lightbox ── */
  .gs-lb-backdrop {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 10, 22, 0.96);
    animation: gsLbIn 0.28s ease-out;
  }
  .gs-lb-wrap {
    position: relative;
    width: 100%;
    max-width: 920px;
    padding: 0 3.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: gsZoomIn 0.25s ease-out;
  }
  .gs-lb-img {
    display: block;
    border-radius: 1rem;
    object-fit: contain;
    max-height: 72vh;
    max-width: 100%;
    box-shadow: 0 32px 80px rgba(0, 0, 0, 0.55);
  }

  /* ── Lightbox Nav ── */
  .gs-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.22);
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 10;
  }
  .gs-nav:hover { background: #ffb900; border-color: #ffb900; color: #001c3a; }
  .gs-nav.prev { left: 0; }
  .gs-nav.next { right: 0; }

  /* ── Lightbox Caption ── */
  .gs-lb-caption {
    margin-top: 1rem;
    text-align: center;
  }

  /* ── Lightbox Dots ── */
  .gs-dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .gs-dot.active { background: #ffb900; width: 22px; }

  /* ── Thumbnail Strip ── */
  .gs-thumb {
    width: 58px;
    height: 42px;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 2px solid transparent;
    opacity: 0.45;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
    background: none;
    padding: 0;
  }
  .gs-thumb.active { border-color: #ffb900; opacity: 1; transform: scale(1.08); }
  .gs-thumb:hover:not(.active) { opacity: 0.75; }
  .gs-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* ── Scrollbar hide ── */
  .gs-scroll-hide { scrollbar-width: none; }
  .gs-scroll-hide::-webkit-scrollbar { display: none; }

  /* ── Spinner ── */
  .gs-spinner {
    width: 44px;
    height: 44px;
    border: 4px solid rgba(255, 185, 0, 0.3);
    border-top-color: #ffb900;
    border-radius: 50%;
    animation: gsSpin 0.75s linear infinite;
  }

  /* ── Keyframes ── */
  @keyframes gsLbIn   { from { opacity: 0 }                         to { opacity: 1 } }
  @keyframes gsZoomIn { from { opacity: 0; transform: scale(0.91) } to { opacity: 1; transform: scale(1) } }
  @keyframes gsSpin   { to { transform: rotate(360deg) } }
`;

/* ═══════════════════════════════════════════════════════════════
   🔣 GRID ICON MAP
═══════════════════════════════════════════════════════════════ */
const GridIcon = ({ cols }) => {
  if (cols === 2) return <Grid2X2 size={15} />;
  if (cols === 3) return <LayoutGrid size={15} />;
  if (cols === 4) return <Grid3X3 size={15} />;
  return <Images size={15} />;
};

/* ═══════════════════════════════════════════════════════════════
   🖼️  THUMBNAIL STRIP
═══════════════════════════════════════════════════════════════ */
function ThumbStrip({ images, current, onSelect }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current.querySelector(".gs-thumb.active");
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [current]);

  return (
    <div ref={ref} className="flex gap-2 overflow-x-auto gs-scroll-hide max-w-2xl mx-auto pb-1 mt-4">
      {images.map((img, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`gs-thumb ${idx === current ? "active" : ""}`}
        >
          <img src={img.image} alt={img.title} />
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   💡 LIGHTBOX
═══════════════════════════════════════════════════════════════ */
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [loaded,  setLoaded]  = useState(false);

  const go = useCallback(
    (dir) => {
      setLoaded(false);
      setCurrent((p) =>
        dir === "next"
          ? (p + 1) % images.length
          : (p - 1 + images.length) % images.length
      );
    },
    [images.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go("next");
      if (e.key === "ArrowLeft")  go("prev");
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const img = images[current];

  return (
    <div className="gs-lb-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      {/* Close */}
      <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 border border-white border-opacity-20 bg-white bg-opacity-10 hover:bg-red-500 hover:border-red-500">
        <X size={18} />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-5 flex items-center gap-2 text-white text-xs font-semibold bg-white bg-opacity-10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white border-opacity-15">
        <Images size={12} className="text-yellow-400" />
        {current + 1} / {images.length}
      </div>

      {/* Main Wrap */}
      <div className="gs-lb-wrap">
        <div className="relative w-full flex items-center justify-center">
          <button className="gs-nav prev" onClick={() => go("prev")}><ChevronLeft size={22} /></button>
          
          <div className="relative rounded-2xl overflow-hidden">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-950 bg-opacity-50 rounded-2xl">
                <div className="gs-spinner" />
              </div>
            )}
            <img key={img.image || current} src={img.image} alt={img.title} onLoad={() => setLoaded(true)} className="gs-lb-img" />
          </div>

          <button className="gs-nav next" onClick={() => go("next")}><ChevronRight size={22} /></button>
        </div>

        {/* Caption */}
        <div className="gs-lb-caption">
          <p className="text-white font-semibold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>{img.title}</p>
          <p className="text-yellow-400 text-xs mt-0.5">{img.category}</p>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-1.5 mt-4">
          {images.map((_, idx) => (
            <button key={idx} onClick={() => { setLoaded(false); setCurrent(idx); }} className={`gs-dot ${idx === current ? "active" : ""}`} />
          ))}
        </div>

        {/* Thumbs */}
        <ThumbStrip images={images} current={current} onSelect={(i) => { setLoaded(false); setCurrent(i); }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   🃏 IMAGE CARD
═══════════════════════════════════════════════════════════════ */
function ImageCard({ image, colCount, index, onOpen }) {
  const heights = {
    2: "h-64 sm:h-80",
    3: "h-52 sm:h-64",
    4: "h-44 sm:h-52",
    5: "h-36 sm:h-44",
  };

  const hasLink = !!image.slug;

  const cardContent = (
    <div className="gs-card h-full">
      <div className={`w-full ${heights[colCount] || "h-52"}`}>
        <img src={image.image} alt={image.title} />
      </div>

      <div className="gs-overlay" style={{ flexDirection: 'column' }}>
        <button
          onClick={(e) => { 
            if (hasLink) return; // Link component handles it
            e.preventDefault(); 
            e.stopPropagation();
            onOpen(index); 
          }}
          className="gs-zoom mb-3"
          title={hasLink ? "View page" : "View full image"}
        >
          {hasLink ? <ChevronRight size={22} /> : <ZoomIn size={22} />}
        </button>
        {image.title && (
          <h3 className="text-white font-bold text-sm tracking-wide px-4 text-center drop-shadow-md">
            {image.title}
          </h3>
        )}
        {image.category && (
          <p className="text-[#ffb900] text-xs font-bold uppercase mt-1 px-4 text-center drop-shadow-md">
            {image.category}
          </p>
        )}
      </div>
    </div>
  );

  if (hasLink) {
    return (
      <Link href={image.slug} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

/* ═══════════════════════════════════════════════════════════════
   🏠 MAIN GALLERY SECTION 
═══════════════════════════════════════════════════════════════ */
export default function GalleryClient({ items, heading, gridCols: adminGridCols, id, className }) {
  const [gridCols, setGridCols] = useState(Number(adminGridCols) || 3);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  /* Inject styles on mount, remove on unmount */
  useEffect(() => {
    const STYLE_ID = "gs-styles";
    if (!document.getElementById(STYLE_ID)) {
      const tag = document.createElement("style");
      tag.id = STYLE_ID;
      tag.textContent = GALLERY_STYLES;
      document.head.appendChild(tag);
    }
    return () => { document.getElementById(STYLE_ID)?.remove(); };
  }, []);

  const openLightbox = (index) => {
    setLightbox({ open: true, index: index });
  };

  const gridClass = {
    2: "gs-grid-2",
    3: "gs-grid-3",
    4: "gs-grid-4",
    5: "gs-grid-5",
  };

  if (!items || items.length === 0) return null;

  return (
    <div id={id || undefined} className={`w-full py-4 px-3 bg-white border-y border-gray-200 ${className || ''}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* ── Section Title ───────────────────────────────── */}
        {heading && (heading.title || heading.highlight) && (
          <div className="text-center mb-12">
            {heading.badge && (
              <span className="inline-flex items-center gap-2 bg-blue-800 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                <Images size={12} />
                {heading.badge}
              </span>
            )}
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              {heading.title}{" "}
              {heading.highlight && (
                <span className="relative inline-block text-yellow-500">
                  {heading.highlight}
                  <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-yellow-400 opacity-40" />
                </span>
              )}
            </h2>
            {heading.description && (
              <p className="mt-4 text-gray-500 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                {heading.description}
              </p>
            )}
          </div>
        )}

        {/* Grid Selector Removed - Controlled by Admin */}

        {/* ── Gallery Grid ──────────────────────────────────── */}
        <div className={`grid gap-4 ${gridClass[gridCols]}`}>
          {items.map((image, index) => (
            <ImageCard
              key={index}
              image={image}
              index={index}
              colCount={gridCols}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* ── Lightbox ────────────────────────────────────────── */}
      {lightbox.open && (
        <Lightbox
          images={items}
          startIndex={lightbox.index}
          onClose={() => setLightbox({ open: false, index: 0 })}
        />
      )}
    </div>
  );
}