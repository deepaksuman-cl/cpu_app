// File: src/components/admin/MediaUploader.js
'use client';

import { uploadImage, uploadImageFromUrl } from '@/lib/actions/upload';
import { AlertTriangle, CheckCircle, FileUp, Image as ImageIcon, Link2, Loader2, UploadCloud } from 'lucide-react';
import { useState } from 'react';

export default function MediaUploader({ category = 'schools', onUploadSuccess }) {
  // Tabs state: 'file' or 'url'
  const [tab, setTab] = useState('file'); 
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');

  // Reset uploader state
  const reset = () => {
    setFile(null);
    setPreview(null);
    setUrl('');
    setUploadedUrl('');
    setError('');
  };

  // Jab user file select karega
  const handleFileChange = (e) => {
    reset();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); 
    }
  };

  // Jab user URL update karega
  const handleUrlChange = (e) => {
    reset();
    const newUrl = e.target.value;
    setUrl(newUrl);
    setPreview(newUrl); // URL ko hi preview bana rahe hain
  };

  // Jab user submit karega (Upload button dabaega)
  const handleSubmit = async () => {
    setError('');
    setUploadedUrl('');
    setUploading(true);
    let result = null;

    if (tab === 'file' && file) {
      // Form data banakar file action ko bhejna
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category); 
      result = await uploadImage(formData);
    } else if (tab === 'url' && url) {
      // URL action ko bulana
      result = await uploadImageFromUrl(url, category);
    }

    if (result && result.success) {
      setUploadedUrl(result.url);
      if (onUploadSuccess) {
        onUploadSuccess(result.url); // Parent component ko URL bhej dega
      }
    } else {
      setError(result ? result.error : 'Nothing to upload.');
    }
    setUploading(false);
  };

  return (
    <div className="border border-gray-100 rounded-3xl p-8 bg-white shadow-2xl max-w-lg w-full">
      
      {/* Tabs Title */}
      <h3 className="text-xl font-extrabold text-[#00588b] mb-6">Advanced Media Uploader</h3>

      {/* Tabs Header */}
      <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-full mb-8 border border-gray-200">
        {[ { id:'file', label:'File Upload', icon:FileUp }, { id:'url', label:'Paste URL', icon:Link2 } ].map(t => (
          <button 
            key={t.id} 
            onClick={() => { reset(); setTab(t.id); }}
            className={`flex-1 flex items-center justify-center gap-2.5 text-xs font-bold py-3.5 rounded-full transition-all duration-300 ${tab === t.id ? "bg-[#00588b] text-white shadow-lg" : "text-gray-500 hover:text-gray-800"}`}
          >
            <t.icon size={16} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Main Content (Preview + Input) */}
      <div className="mb-8">
        {preview && !error ? (
          <div className="mb-6 relative">
            <img src={preview} alt="Preview" className="max-h-56 mx-auto rounded-3xl shadow-xl object-contain border-4 border-gray-100 p-1" />
            {uploadedUrl && (
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                <CheckCircle size={24} />
              </div>
            )}
          </div>
        ) : (
          <div className="w-24 h-24 bg-blue-50 text-[#00588b] rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100">
            <ImageIcon size={42} />
          </div>
        )}

        {/* Input for URL tab */}
        {tab === 'url' && (
          <div className="relative mb-5">
            <Link2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={url}
              onChange={handleUrlChange}
              placeholder="Paste image URL here..."
              className="block w-full text-sm text-gray-800 bg-white border border-gray-200 rounded-full pl-12 pr-6 py-4 placeholder:text-gray-400 focus:border-[#00588b] focus:ring-1 focus:ring-[#00588b] shadow-inner"
            />
          </div>
        )}

        {/* Input for File tab */}
        {tab === 'file' && (
          <div className="mb-5">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#00588b] hover:file:bg-blue-100 cursor-pointer border-gray-100"
            />
          </div>
        )}
      </div> {/* 🔴 FIX: Yahan ek extra '}' tha, usko maine '</div>' kar diya hai */}

      {/* Action Button */}
      {(!uploadedUrl && !error) && (
        <button 
          onClick={handleSubmit} 
          disabled={uploading || (!file && !url)}
          className="bg-[#00588b] text-white px-8 py-4 rounded-full font-extrabold flex items-center justify-center gap-2 w-full hover:bg-[#004570] transition disabled:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-xl hover:-translate-y-0.5"
        >
          {uploading ? <Loader2 className="animate-spin" size={20} /> : <UploadCloud size={20} />}
          {uploading ? 'Processing & Uploading...' : `Upload to Server`}
        </button>
      )}

      {/* Success Message */}
      {uploadedUrl && (
        <div className="p-5 bg-green-50 border border-green-200 rounded-3xl text-left shadow-inner">
          <p className="text-xs font-bold text-green-700 mb-2.5">✓ Upload Successful!</p>
          <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-gray-100">
            <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
            <p className="text-xs text-gray-600 break-all font-mono select-all flex-1">
              {uploadedUrl}
            </p>
          </div>
          <button 
            onClick={reset}
            className="w-full text-center text-[#00588b] text-xs font-bold mt-4 hover:underline"
          >
            Upload another image
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-5 bg-red-50 border border-red-200 rounded-3xl text-left shadow-inner">
          <p className="text-xs font-bold text-red-700 mb-2 flex items-center gap-1.5">
            <AlertTriangle size={16} /> Error uploading:
          </p>
          <p className="text-xs text-gray-600 bg-white p-3 rounded-xl border border-red-100 font-mono">
            {error}
          </p>
          <button 
            onClick={reset}
            className="w-full text-center text-gray-500 text-xs font-bold mt-4 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

    </div>
  );
}