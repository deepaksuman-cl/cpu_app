'use client';

import '@/app/university-prose.css';
import { memo, useEffect, useRef, useState } from 'react';

// 🔥 Custom Tool for Complex Word/Excel Tables with Rowspans/Colspans
class HTMLTableTool {
  static get toolbox() {
    return {
      title: 'Complex Table',
      icon: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M4 3h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v3h16V5H4zm0 5v4h7v-4H4zm9 0v4h7v-4h-7zm0 6v3h7v-3h-7zM4 16v3h7v-3H4z"/></svg>'
    };
  }

  constructor({ data }) {
    this.data = data;
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('table-wrapper');
    this.wrapper.innerHTML = this.data.html || '<table class="tc-table"><tr><td>Empty Block</td></tr></table>';

    // Make cells contenteditable natively
    this.wrapper.querySelectorAll('th, td').forEach(cell => {
      cell.setAttribute('contenteditable', 'true');
      cell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          // prevent creating new EditorJS blocks
          e.stopPropagation();
        }
      });
    });

    return this.wrapper;
  }

  save(blockContent) {
    const clone = blockContent.cloneNode(true);
    clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));
    let table = clone.querySelector('table') || clone;
    return { html: table.outerHTML || clone.innerHTML };
  }

  static get sanitize() {
    return {
      html: true
    };
  }
}

function RichTextEditor({ value, onChange, useProse, onProseChange, placeholder = 'Write your content here...' }) {
  const [mounted, setMounted] = useState(false);
  const [editorId] = useState(() => `editor-${Math.random().toString(36).substr(2, 9)}`);
  const editorRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const initialValueRef = useRef(value);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let editorInstance = null;
    let pasteHandler = null;

    const initEditor = async () => {
      const container = document.getElementById(editorId);
      if (!container || editorRef.current) return;

      const [
        { default: EditorJS },
        { default: Header },
        { default: List },
        { default: RawTool },
        { default: Table },
        { default: Undo },
        { default: ImageTool },
        { default: Underline },
        { default: Marker },
        { default: InlineCode }
      ] = await Promise.all([
        import('@editorjs/editorjs'),
        import('@editorjs/header'),
        import('@editorjs/list'),
        import('@editorjs/raw'),
        import('editorjs-table'),
        import('editorjs-undo'),
        import('@editorjs/image'),
        import('@editorjs/underline'),
        import('@editorjs/marker'),
        import('@editorjs/inline-code')
      ]);

      let initialData = {};
      if (initialValueRef.current) {
        try {
          initialData = JSON.parse(initialValueRef.current);
        } catch (e) {
          initialData = {
            blocks: [{ type: "raw", data: { html: initialValueRef.current } }]
          };
        }
      }

      editorInstance = new EditorJS({
        holder: editorId,
        placeholder: placeholder,
        data: initialData,
        tools: {
          header: {
            class: Header,
            inlineToolbar: ['link', 'bold', 'italic', 'underline', 'marker'],
            config: { levels: [1, 2, 3, 4], defaultLevel: 2 }
          },
          list: { class: List, inlineToolbar: true },
          table: {
            class: Table,
            inlineToolbar: true,
            config: { rows: 2, cols: 3, withHeadings: true }
          },
          image: {
            class: ImageTool,
            config: {
              endpoints: { 
                byFile: '/api/editor/upload', 
                byUrl: '/api/editor/upload' 
              },
              field: 'image',
              types: 'image/*'
            }
          },
          underline: Underline,
          marker: Marker,
          inlineCode: InlineCode,
          htmlTable: { class: HTMLTableTool },
          raw: { class: RawTool }
        },
        onReady: () => {
          try {
            new Undo({ editor: editorInstance });
          } catch (undoErr) {
            console.warn('Undo plugin could not be initialized:', undoErr);
          }
        },
        onChange: async () => {
          try {
            const content = await editorInstance.save();
            const jsonString = JSON.stringify(content);
            if (onChangeRef.current) onChangeRef.current(jsonString);
          } catch (err) {
            console.warn('Editor save error:', err);
          }
        }
      });

      editorRef.current = editorInstance;

      // 🔥 Improved Paste Interceptor: Parses tables into Native EditorJS Blocks
      pasteHandler = async (e) => {
        const html = e.clipboardData?.getData('text/html');
        if (!html) return;

        const hasTable = /<table[\s>]/i.test(html);
        if (!hasTable) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Clean up MS Office junk tags completely
        tempDiv.querySelectorAll('style, meta, link, script, xml, title').forEach(el => el.remove());

        // Strip inline attributes that contaminate UI like static widths, background colors, etc.
        tempDiv.querySelectorAll('*').forEach(el => {
          el.removeAttribute('style');
          el.removeAttribute('class');
          el.removeAttribute('width');
          el.removeAttribute('height');
          el.removeAttribute('bgcolor');
          el.removeAttribute('valign');
          el.removeAttribute('align');
          
          if (el.tagName.startsWith('O:') || el.tagName.startsWith('W:') || el.tagName.startsWith('V:')) {
            const tempSpan = document.createElement('span');
            tempSpan.innerHTML = el.innerHTML;
            el.parentNode.replaceChild(tempSpan, el);
          }
        });

        const blocksToInsert = [];

        const processNode = (node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (text) blocksToInsert.push({ type: 'paragraph', data: { text } });
            return;
          }
          if (node.nodeType !== Node.ELEMENT_NODE) return;

          const tag = node.tagName.toLowerCase();

          if (tag === 'table') {
            // 🔥 Check for complex row/col spans!
            const hasSpans = node.querySelector('[colspan], [rowspan]');
            
            if (hasSpans) {
               // Use our native raw HTML Table module so spines aren't collapsed!
               blocksToInsert.push({ type: 'htmlTable', data: { html: `<table>${node.innerHTML}</table>` } });
            } else {
              // Parse simple tables as normal EditorJS blocks
              let content = [];
              let withHeadings = false;
              const rows = Array.from(node.querySelectorAll('tr'));
              
              rows.forEach((row, index) => {
                const rowData = [];
                const cells = Array.from(row.querySelectorAll('th, td'));
                cells.forEach(cell => rowData.push(cell.innerHTML.trim()));
                
                if (index === 0 && row.querySelectorAll('th').length > 0) {
                  withHeadings = true;
                }
                if (rowData.length > 0) content.push(rowData);
              });

              if (content.length > 0) {
                blocksToInsert.push({ type: 'table', data: { content, withHeadings } });
              }
            }
          } else if (tag.match(/^h[1-6]$/)) {
            blocksToInsert.push({ type: 'header', data: { text: node.innerHTML.trim(), level: parseInt(tag[1]) } });
          } else if (tag === 'ul' || tag === 'ol') {
            const items = Array.from(node.querySelectorAll('li')).map(li => li.innerHTML.trim());
            blocksToInsert.push({ type: 'list', data: { style: tag === 'ul' ? 'unordered' : 'ordered', items } });
          } else if (tag === 'p') {
            const text = node.innerHTML.trim();
            if (text) blocksToInsert.push({ type: 'paragraph', data: { text } });
          } else if (tag === 'div' || tag === 'span' || tag === 'section') {
            node.childNodes.forEach(processNode);
          } else if (tag !== 'br') {
            const text = node.innerHTML.trim();
            if (text) blocksToInsert.push({ type: 'paragraph', data: { text } });
          }
        };

        tempDiv.childNodes.forEach(processNode);

        if (blocksToInsert.length > 0 && editorRef.current) {
          try {
            let insertIndex = editorRef.current.blocks.getCurrentBlockIndex();
            if (insertIndex === -1) insertIndex = editorRef.current.blocks.getBlocksCount();
            else insertIndex += 1;

            for (const block of blocksToInsert) {
              await editorRef.current.blocks.insert(block.type, block.data, {}, insertIndex++, true);
            }

            const content = await editorRef.current.save();
            const jsonString = JSON.stringify(content);
            if (onChangeRef.current) onChangeRef.current(jsonString);
          } catch (err) {
            console.warn('Paste insert error:', err);
          }
        }
      };

      container.addEventListener('paste', pasteHandler, true);
    };

    initEditor();

    return () => {
      const container = document.getElementById(editorId);
      if (container && pasteHandler) container.removeEventListener('paste', pasteHandler, true);

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
    <div className="border border-gray-300 rounded-none overflow-hidden bg-white w-full min-h-[500px] relative flex flex-col">
      <div className="flex-1 overflow-y-auto max-h-[750px] custom-editor-scrollbar relative">
        {onProseChange && (
          <div className="sticky top-0 right-0 p-3 z-10 flex items-center justify-end w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
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

        <div className="pl-14 pr-8 py-3">
          <div id={editorId} className={`${!!useProse ? 'university-prose' : ''} max-w-full min-h-[400px]`}></div>
        </div>
      </div>
    </div>
  );
}

export default memo(RichTextEditor);