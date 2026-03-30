'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { parseEditorContent } from '@/lib/utils/editorParser';
import '@/app/university-prose.css';

function RichTextEditor({ value, onChange, useProse, onProseChange, placeholder = 'Write your content here...' }) {
  const [mounted, setMounted] = useState(false);
  const [editorId] = useState(() => `editor-${Math.random().toString(36).substr(2, 9)}`);
  const editorRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const initEditor = async () => {
      const container = document.getElementById(editorId);
      if (!container) return;

      if (!editorRef.current) {
        const [
          { default: EditorJS },
          { default: Header },
          { default: List },
          { default: RawTool },
          { default: Table }
        ] = await Promise.all([
          import('@editorjs/editorjs'),
          import('@editorjs/header'),
          import('@editorjs/list'),
          import('@editorjs/raw'),
          import('@editorjs/table')
        ]);

        let initialData = {};
        if (value) {
          try {
            initialData = JSON.parse(value);
          } catch (e) {
            initialData = {
              blocks: [{ type: "raw", data: { html: value } }]
            };
          }
        }

        const editor = new EditorJS({
          holder: editorId,
          placeholder: placeholder,
          data: initialData,
          tools: {
            header: {
              class: Header,
              inlineToolbar: true,
              config: { levels: [1, 2, 3, 4], defaultLevel: 2 }
            },
            list: { class: List, inlineToolbar: true },
            table: {
              class: Table,
              inlineToolbar: true,
              config: { rows: 2, cols: 3 },
            },
            raw: { class: RawTool }
          },
          onChange: async () => {
            const content = await editor.save();
            const jsonString = JSON.stringify(content);
            onChange(jsonString); 
          }
        });

        editorRef.current = editor;
      }
    };

    initEditor();

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [mounted, placeholder, editorId]); 

  if (!mounted) {
    return <div className="min-h-[500px] border border-gray-300 animate-pulse bg-gray-50 w-full rounded-sm" />;
  }

  return (
    <div className="border border-gray-300 rounded-none overflow-hidden bg-white w-full pl-16 pr-6 py-10 min-h-[500px] relative">
      
      {/* ── Industrial Styling Toggle (Only shows if props provided) ── */}
      {onProseChange && (
        <div className="absolute top-0 right-0 p-3 z-20 flex items-center justify-end w-full bg-gradient-to-l from-gray-50 to-transparent border-b border-gray-100">
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div className="flex flex-col items-end mr-1">
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${useProse ? 'text-[#00588b]' : 'text-gray-400'}`}>
                {useProse ? 'University Branding ON' : 'Raw HTML Mode'}
              </span>
              <span className="text-[8px] text-gray-400 font-bold uppercase">Toggle Styling</span>
            </div>
            
            <div className="relative inline-flex items-center">
              <input 
                type="checkbox" 
                checked={!!useProse} 
                onChange={(e) => onProseChange(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#ffb900]"></div>
            </div>
          </label>
        </div>
      )}

      {/* 🔥 Admin Editor Specific Layout & UI Tweak */}
      <style jsx global>{`
        .university-prose .ce-block__content { 
          max-width: 100% !important; 
          margin-left: 0 !important;
        }
        .ce-toolbar__content { 
          max-width: 100% !important; 
        }
        .ce-toolbar__actions {
          left: -45px !important;
        }
        .ce-settings {
          background-color: white !important;
          border: 1px solid #e2e8f0 !important;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important;
        }
        .tc-add-column, .tc-add-row {
          background-color: #f3f4f6 !important;
          color: #00588b !important;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .tc-add-column:hover, .tc-add-row:hover {
          opacity: 1;
        }
      `}</style>

      {/* Naya Editor.js yahan load hoga (UNIQUE ID) */}
      <div id={editorId} className={`${!!useProse ? 'university-prose' : ''} max-w-full min-h-[450px]`}></div>
    </div>
  );
}

export default memo(RichTextEditor);