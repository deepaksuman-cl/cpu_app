// File: src/app/admin/page.js (Testing ke liye)
'use client';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { useState } from 'react';

export default function AdminDashboard() {
  const [content, setContent] = useState('');

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-[#00588b]">Testing Global Editor</h1>
      
      {/* Humara Global Rich Text Editor */}
      <RichTextEditor 
        value={content} 
        onChange={setContent} 
        placeholder="Write your Content here..."
      />

      {/* Ye dikhayega ki background me data kaisa save hota hai */}
      <div className="mt-8 p-4 bg-gray-800 text-green-400 rounded-xl">
        <h3 className="text-white font-bold mb-2">HTML Output (Jo Database me save hoga):</h3>
        <p className="font-mono text-sm break-all">{content}</p>
      </div>
    </div>
  );
}