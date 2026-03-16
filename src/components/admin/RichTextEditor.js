// File: src/components/admin/RichTextEditor.js
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  Heading1, Heading2, List, ListOrdered, Link as LinkIcon, RemoveFormatting 
} from 'lucide-react';
import { useEffect } from 'react';

// 🛠️ Toolbar Component (Ye upar ke buttons hain)
const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  // Button design helper
  const Btn = ({ onClick, isActive, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
        isActive ? 'bg-[#00588b] text-white' : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-1 bg-gray-50 p-2 border-b border-gray-200 rounded-t-xl">
      <Btn onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
        <Bold size={18} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
        <Italic size={18} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}>
        <UnderlineIcon size={18} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>
        <Strikethrough size={18} />
      </Btn>
      
      <div className="w-px h-6 bg-gray-300 mx-1 self-center" /> {/* Divider */}

      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}>
        <Heading1 size={18} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
        <Heading2 size={18} />
      </Btn>
      
      <div className="w-px h-6 bg-gray-300 mx-1 self-center" /> {/* Divider */}

      <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
        <List size={18} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
        <ListOrdered size={18} />
      </Btn>
      
      <div className="w-px h-6 bg-gray-300 mx-1 self-center" /> {/* Divider */}

      <Btn onClick={toggleLink} isActive={editor.isActive('link')}>
        <LinkIcon size={18} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
        <RemoveFormatting size={18} />
      </Btn>
    </div>
  );
};

// 🌟 Main Editor Component
export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 underline cursor-pointer' } }),
    ],
    content: value || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Jab bhi kuch type hoga, ye parent ko HTML bhej dega
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        // Ye classes editor ke text area ko style karti hain
        class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[250px] p-5',
      },
    },
  });

  // Agar parent component se value change hoti hai, toh editor ko update karna
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-200 rounded-xl bg-white focus-within:border-[#00588b] focus-within:ring-1 focus-within:ring-[#00588b] transition-all shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      
      {/* Basic prose styles for lists and headings inside the editor */}
      <style jsx global>{`
        .prose ul { list-style-type: disc; padding-left: 1.5rem; }
        .prose ol { list-style-type: decimal; padding-left: 1.5rem; }
        .prose h1 { font-size: 1.875rem; font-weight: 800; margin-bottom: 0.5rem; color: #00588b; }
        .prose h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; color: #00588b; }
        .prose p { margin-bottom: 0.75rem; color: #374151; }
        .prose a { color: #2563eb; text-decoration: underline; }
      `}</style>
    </div>
  );
}