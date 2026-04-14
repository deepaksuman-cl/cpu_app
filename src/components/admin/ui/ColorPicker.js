'use client';

import { Check, ChevronDown, Copy, Eye, Laptop, Palette, Pipette, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

// ─── Color Utility Helpers ────────────────────────────────────────────────────

/**
 * Parses any color string (hex, rgb, rgba) into an { r, g, b, a } object.
 */
function parseColor(color) {
  if (!color) return { r: 0, g: 88, b: 139, a: 1 };
  
  // Hex
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length === 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
        a: 1
      };
    }
    if (hex.length === 8) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
        a: Math.round((parseInt(hex.slice(6, 8), 16) / 255) * 100) / 100
      };
    }
  }

  // RGB / RGBA
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: rgbaMatch[4] === undefined ? 1 : parseFloat(rgbaMatch[4])
    };
  }

  return { r: 0, g: 88, b: 139, a: 1 };
}

function toRgbaString({ r, g, b, a }) {
  return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
}

function toHexString({ r, g, b, a }) {
  const f = (n) => n.toString(16).padStart(2, '0');
  const alpha = a === 1 ? '' : f(Math.round(a * 255));
  return `#${f(r)}${f(g)}${f(b)}${alpha}`;
}

// Convert RGB to HSV (Hue, Saturation, Value/Brightness)
function rgbToHsv({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, v: v * 100 };
}

// Convert HSV back to RGB
function hsvToRgb(h, s, v) {
  h /= 360; s /= 100; v /= 100;
  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function ColorPicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const containerRef = useRef(null);
  
  const color = parseColor(value);
  const hsv = rgbToHsv(color);
  
  // Local state to avoid jumping during slider drags
  const [localHue, setLocalHue] = useState(hsv.h);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Sync local hue when value changes externally
  useEffect(() => {
    setLocalHue(hsv.h);
  }, [value]);

  const updateColor = (newHsv, alpha = color.a) => {
    const rgb = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
    const result = { ...rgb, a: alpha };
    // We prefer strings for the prop, usually hex but rgba if alpha < 1
    if (result.a < 1) {
      onChange(toRgbaString(result));
    } else {
      onChange(toHexString(result));
    }
  };

  const handleEyedropper = async () => {
    if (!window.EyeDropper) return;
    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      onChange(result.sRGBHex);
    } catch (e) {
      console.log('Eyedropper cancelled');
    }
  };

  // Drag handlers for the Saturation/Value area
  const satRef = useRef(null);
  const handleSatDrag = useCallback((e) => {
    if (!satRef.current) return;
    const rect = satRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
    updateColor({ h: localHue, s: x * 100, v: y * 100 });
  }, [localHue, color.a]);

  const onSatMouseDown = () => {
    const move = (e) => handleSatDrag(e);
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  return (
    <div className="relative inline-block w-full" ref={containerRef}>
      {/* Trigger Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white border border-gray-200 p-2 hover:border-[#00588b] transition-all cursor-pointer group"
      >
        <div 
          className="w-10 h-7 border border-gray-100 shadow-inner relative overflow-hidden"
          style={{ backgroundImage: 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%)', backgroundSize: '8px 8px' }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: value || '#00588b' }} />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter leading-none mb-1">Pick Color</p>
          <p className="text-[11px] font-mono font-bold text-gray-700 truncate">{value || '#00588B'}</p>
        </div>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Advanced Popover Picker */}
      {isOpen && (
        <div 
          className="absolute z-[305] top-full left-0 mt-1 bg-white shadow-2xl border border-gray-200 w-[240px] animate-in fade-in zoom-in-95 duration-100"
          style={{ transformOrigin: 'top left' }}
        >
          {/* 1. Saturation/Value Area */}
          <div 
            ref={satRef}
            onMouseDown={onSatMouseDown}
            className="relative w-full h-32 cursor-crosshair overflow-hidden"
            style={{ backgroundColor: `hsl(${localHue}, 100%, 50%)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            {/* Pointer */}
            <div 
              className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg transform -translate-x-1/2 translate-y-1/2 pointer-events-none"
              style={{ left: `${hsv.s}%`, bottom: `${hsv.v}%` }}
            />
          </div>

          <div className="p-4 space-y-4">
            {/* 2. Controls Section */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-2 flex-1">
                {/* Hue Slider */}
                <div className="relative h-3 w-full group">
                  <input
                    type="range" min="0" max="360" value={localHue}
                    onChange={(e) => {
                      const h = parseFloat(e.target.value);
                      setLocalHue(h);
                      updateColor({ h, s: hsv.s, v: hsv.v });
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    style={{ background: 'linear-gradient(to right, red, #ff0, lime, cyan, blue, #f0f, red)' }}
                  />
                  <div className="w-full h-full rounded-full" style={{ background: 'linear-gradient(to right, red, #ff0, lime, cyan, blue, #f0f, red)' }} />
                  <div 
                    className="absolute top-1/2 w-4 h-4 bg-white border border-gray-300 rounded-full shadow -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                    style={{ left: `${(localHue / 360) * 100}%` }}
                  />
                </div>
                {/* Alpha Slider */}
                <div className="relative h-3 w-full group">
                  <div className="absolute inset-0 rounded-full overflow-hidden" style={{ backgroundImage: 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%)', backgroundSize: '6px 6px' }} />
                  <div 
                    className="absolute inset-0 rounded-full" 
                    style={{ background: `linear-gradient(to right, transparent, ${toRgbaString({ ...color, a: 1 })})` }} 
                  />
                  <input
                    type="range" min="0" max="1" step="0.01" value={color.a}
                    onChange={(e) => updateColor(hsv, parseFloat(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div 
                    className="absolute top-1/2 w-4 h-4 bg-white border border-gray-300 rounded-full shadow -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                    style={{ left: `${color.a * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Status Swatch */}
              <div className="flex flex-col items-center gap-1">
                <div 
                  className="w-10 h-10 rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                  style={{ backgroundImage: 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%)', backgroundSize: '8px 8px' }}
                >
                  <div className="w-full h-full" style={{ backgroundColor: value }} />
                </div>
                {window.EyeDropper && (
                   <button 
                    onClick={handleEyedropper}
                    className="p-1.5 text-gray-400 hover:text-[#00588b] hover:bg-gray-100 rounded-lg transition-colors"
                   >
                     <Pipette size={14} />
                   </button>
                )}
              </div>
            </div>

            {/* 3. Inputs Section */}
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-3">
                <label className="block text-[8px] font-black text-gray-400 uppercase mb-1">Hex</label>
                <input 
                  type="text" 
                  value={toHexString(color).toUpperCase()}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-1.5 text-[11px] font-mono font-bold text-gray-700 uppercase outline-none focus:border-[#00588b]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[8px] font-black text-gray-400 uppercase mb-1">Alpha</label>
                <input 
                  type="text" 
                  value={Math.round(color.a * 100) + '%'}
                  readOnly
                  className="w-full bg-gray-50 border border-transparent p-1.5 text-[11px] font-mono font-bold text-gray-500 text-center outline-none"
                />
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
              {['#00588b', '#ffb900', '#ffffff', '#1a1a2e', '#f8f9fa', '#e8f5e9', '#fce4ec'].map(p => (
                <button 
                  key={p} 
                  onClick={() => onChange(p)}
                  className={`w-5 h-5 border-2 rounded-full transition-all hover:scale-125 ${p.toLowerCase() === toHexString(color).toLowerCase() ? 'border-[#00588b] scale-110' : 'border-gray-100'}`}
                  style={{ backgroundColor: p }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
