// File: src/components/admin/MediaUploader.js
'use client';

import { uploadImage, uploadImageFromUrl } from '@/lib/actions/upload';
import { AlertTriangle, CheckCircle, FileUp, Image as ImageIcon, Link2, Loader2, UploadCloud } from 'lucide-react';
import { useState } from 'react';

export default function MediaUploader({ category = 'schools', onUploadSuccess }) {
  const [tab, setTab] = useState('file'); 
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');

  const reset = () => {
    setFile(null);
    setPreview(null);
    setUrl('');
    setUploadedUrl('');
    setError('');
  };

  const handleFileChange = (e) => {
    reset();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); 
    }
  };

  const handleUrlChange = (e) => {
    reset();
    const newUrl = e.target.value;
    setUrl(newUrl);
    setPreview(newUrl); 
  };

  const handleSubmit = async () => {
    setError('');
    setUploadedUrl('');
    setUploading(true);
    let result = null;

    if (tab === 'file' && file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category); 
      result = await uploadImage(formData);
    } else if (tab === 'url' && url) {
      result = await uploadImageFromUrl(url, category);
    }

    if (result && result.success) {
      setUploadedUrl(result.url);
      if (onUploadSuccess) {
        onUploadSuccess(result.url); 
      }
    } else {
      setError(result ? result.error : 'Nothing to upload.');
    }
    setUploading(false);
  };

  return (
    <div className="border border-gray-300 bg-white shadow-sm max-w-sm w-full p-5 rounded-none">
      
      {/* Header */}
      <h3 className="text-lg font-bold text-[#00588b] mb-4">Media Uploader</h3>

      {/* Clean Border-Bottom Tabs */}
      <div className="flex border-b border-gray-200 mb-5">
        {[ { id:'file', label:'File Upload', icon:FileUp }, { id:'url', label:'Paste URL', icon:Link2 } ].map(t => (
          <button 
            key={t.id} 
            onClick={() => { reset(); setTab(t.id); }}
            className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2 transition-colors rounded-none ${
              tab === t.id 
                ? "border-b-2 border-[#00588b] text-[#00588b]" 
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <t.icon size={16} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Main Content (Preview + Input) */}
      <div className="mb-5">
        {preview && !error ? (
          <div className="mb-4 relative border border-gray-200 p-1 bg-gray-50">
            <img src={preview} alt="Preview" className="max-h-32 mx-auto object-contain" />
            {uploadedUrl && (
              <div className="absolute top-1 right-1 bg-green-500 text-white p-1 shadow-sm rounded-none">
                <CheckCircle size={16} />
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-24 bg-gray-50 text-gray-400 border border-dashed border-gray-300 flex flex-col items-center justify-center mb-4 rounded-none">
            <ImageIcon size={28} className="mb-1" />
            <span className="text-xs">No preview available</span>
          </div>
        )}

        {/* Input for URL tab */}
        {tab === 'url' && (
          <div className="relative">
            <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={url}
              onChange={handleUrlChange}
              placeholder="Paste image URL here..."
              className="block w-full text-sm text-gray-800 bg-white border border-gray-300 pl-9 pr-3 py-2 rounded-none focus:outline-none focus:border-[#00588b]"
            />
          </div>
        )}

        {/* Input for File tab */}
        {tab === 'file' && (
          <div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-[#00588b] hover:file:bg-gray-200 cursor-pointer border border-gray-300 rounded-none p-1"
            />
          </div>
        )}
      </div>

      {/* Action Button */}
      {(!uploadedUrl && !error) && (
        <button 
          onClick={handleSubmit} 
          disabled={uploading || (!file && !url)}
          className="bg-[#00588b] text-white px-4 py-2 text-sm font-bold flex items-center justify-center gap-2 w-full hover:bg-[#004570] transition-colors rounded-none disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {uploading ? <Loader2 className="animate-spin" size={16} /> : <UploadCloud size={16} />}
          {uploading ? 'Uploading...' : 'Upload to Server'}
        </button>
      )}

      {/* Success Message */}
      {uploadedUrl && (
        <div className="p-3 bg-green-50 border border-green-300 text-left rounded-none">
          <p className="text-xs font-bold text-green-700 mb-2">✓ Upload Successful!</p>
          <input 
            type="text" 
            readOnly 
            value={uploadedUrl} 
            className="w-full text-xs text-gray-700 bg-white p-2 border border-green-200 outline-none rounded-none font-mono"
          />
          <button 
            onClick={reset}
            className="w-full text-center text-[#00588b] text-xs font-bold mt-3 hover:underline"
          >
            Upload another image
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-300 text-left rounded-none">
          <p className="text-xs font-bold text-red-700 mb-1 flex items-center gap-1.5">
            <AlertTriangle size={16} /> Error uploading:
          </p>
          <p className="text-xs text-gray-700 bg-white p-2 border border-red-100 font-mono rounded-none">
            {error}
          </p>
          <button 
            onClick={reset}
            className="w-full text-center text-red-600 text-xs font-bold mt-3 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

    </div>
  );
}