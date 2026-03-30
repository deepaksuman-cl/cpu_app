'use client';
import { parseEditorContent } from '@/lib/utils/editorParser';
import { useMemo, useEffect, useRef } from 'react';
import '@/app/university-prose.css'; // 🔥 Advanced Table & Prose Styling

/**
 * RichTextRenderer - Handles rendering of both Editor.js JSON and legacy HTML content.
 * Now supports script execution for 'raw' blocks.
 */
export default function RichTextRenderer({ content, className = "", variant = "default", style = {}, useProse = true }) {
  const containerRef = useRef(null);

  const htmlContent = useMemo(() => {
    let html = parseEditorContent(content);
    
    // 🔥 Variant: Checkmarks (Used in Programmes Listing)
    if (variant === "checkmarks" && html) {
      html = html.replace(/<li>/g, '<li class="flex items-start gap-2 mb-2"><svg class="w-4 h-4 mt-0.5 shrink-0 text-[#00588b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg><span class="leading-snug">');
    }
    
    return html;
  }, [content, variant]);

  // 🔥 Script Execution: Execute <script> tags inside 'raw' HTML blocks
  useEffect(() => {
    if (containerRef.current && htmlContent) {
      const scripts = containerRef.current.querySelectorAll('script');
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
    }
  }, [htmlContent]);
  
  if (!htmlContent) return null;

  return (
    <div 
      ref={containerRef}
      className={`${useProse ? 'university-prose' : ''} max-w-none ${variant === 'checkmarks' ? 'list-none' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={style}
    />
  );
}
