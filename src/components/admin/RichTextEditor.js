// File: src/components/admin/ui/RichTextEditor.js
'use client';

import { Editor } from '@tinymce/tinymce-react';
import { memo, useEffect, useRef, useState } from 'react';

function RichTextEditor({ value, onChange, placeholder = 'Write your content here...' }) {
  const [mounted, setMounted] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[500px] border border-gray-300 animate-pulse bg-gray-50 w-full rounded-sm" />;
  }

  return (
    <div className="border border-gray-300 rounded-sm overflow-hidden bg-white w-full">
      <style jsx global>{`
        .tox-promotion { display: none !important; }
        .tox-statusbar__branding { display: none !important; }
        .tox.tox-tinymce--focused {
          box-shadow: none !important;
          border-color: #d1d5db !important; 
        }
        .tox .tox-edit-area::before {
          box-shadow: none !important;
          border: none !important;
          outline: none !important;
        }
        .tox-edit-area__iframe { outline: none !important; }
        .tox-editor-header {
          display: flex !important;
          flex-direction: column !important;
        }
        .tox-toolbar-overlord { width: 100% !important; }
        .tox-toolbar__primary {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          width: 100% !important;
        }
      `}</style>

      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js" 
        onInit={(evt, editor) => editorRef.current = editor}
        value={value || ''}
        onEditorChange={(content) => onChange(content)}
        init={{
          // 🔥 ERROR 1 FIX: Free license accept karne ka code
          license_key: 'gpl', 
          
          height: 500,
          width: '100%',
          menubar: 'file edit view insert format tools table',
          placeholder: placeholder,
          
          // 🔥 ERROR 2 FIX: 'tableofcontents' premium tha, isliye hata diya
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 
            'emoticons', 'directionality', 'pagebreak', 'codesample'
          ],
          
          toolbar: [
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify',
            'numlist bullist outdent indent | link image media table codesample hr | emoticons charmap pagebreak anchor | removeformat | ltr rtl fullscreen preview code'
          ],
          
          toolbar_mode: 'wrap',
          statusbar: true,
          elementpath: true,
          branding: false,
          promotion: false,
          
          content_style: `
  body { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
    font-size: 16px; 
    color: #000000; 
    padding: 1rem;
    line-height: 1.5;
  }
  body:focus, html:focus { outline: none !important; }
  p { margin-top: 0; margin-bottom: 1rem; }
  h1, h2, h3, h4, h5, h6 { font-weight: bold; margin-top: 0; margin-bottom: 0.5rem; }
  table { border-collapse: collapse; width: 100%; }
  table td, table th { border: 1px solid #ccc; padding: 0.4rem; }
`,
        }}
      />
    </div>
  );
}

export default memo(RichTextEditor);