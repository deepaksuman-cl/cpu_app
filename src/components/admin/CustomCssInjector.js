'use client';

import { useState, useEffect } from 'react';
import { getCustomCss, saveCustomCss } from '@/lib/actions/systemActions';
import { Info } from 'lucide-react';

export default function CustomCssInjector() {
  const [cssCode, setCssCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await getCustomCss();
      if (res.success) {
        setCssCode(res.customCss || '');
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await saveCustomCss(cssCode);
    if (res.success) {
      alert('Custom CSS saved successfully!');
    } else {
      alert('Error saving CSS: ' + res.error);
    }
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[#2a3042]">Custom CSS Injector</h1>
          <p className="text-sm text-gray-500 mt-1">
            Write custom CSS here. It will be injected dynamically into the frontend at runtime.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving || isLoading}
          className="px-6 py-2.5 bg-[#3b5998] hover:bg-[#2d4373] text-white text-sm font-semibold rounded-md shadow-md transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save CSS'}
        </button>
      </div>

      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white flex flex-col h-[500px]">
        {/* Mac OS Window Header */}
        <div className="h-10 bg-gray-100 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-xs font-mono text-gray-500">styles.css</div>
        </div>
        {/* Code Editor Body */}
        <div className="flex-1 bg-[#1e1e1e] p-4 relative">
          {isLoading ? (
            <div className="text-gray-400 font-mono text-sm animate-pulse">Loading CSS...</div>
          ) : (
            <textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full bg-transparent text-gray-100 font-mono text-sm outline-none resize-none"
              placeholder="/* Add your custom CSS rules here */&#10;.example { color: red; }"
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Info size={16} className="text-[#3b5998]" />
        <span>Tip: You can use any valid CSS rules. They will be appended to the &lt;head&gt; of all portal pages.</span>
      </div>
    </div>
  );
}
