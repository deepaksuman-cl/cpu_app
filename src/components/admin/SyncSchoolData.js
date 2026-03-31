"use client";
import React, { useState } from 'react';

const SyncSchoolData = () => {
  // Yahan tum apne saare school slugs ki list add kar sakte ho
  const schoolOptions = [
    { label: "Arts & Humanities", value: "arts-and-humanities" },
    { label: "Basic & Applied Science", value: "basic-applied-science" },
    { label: "Computer Applications", value: "computer-applications-technology" },
    { label: 'Commerce & Management (commerce-and-management.json)', value: 'commerce-and-management' }
    
    // Naya school add karna ho toh bas yahan add kar dena!
  ];

  const [selectedSlug, setSelectedSlug] = useState(schoolOptions[0].value);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSync = async () => {
    if (!window.confirm(`Are you sure you want to sync data for '${selectedSlug}'? This will overwrite the existing database entries.`)) return;

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/sync-school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: selectedSlug })
      });
      
      const data = await response.json();

      if (data.success) {
        setMessage('✅ ' + data.message);
      } else {
        setMessage('❌ Error: ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-lg">
      <h3 className="text-xl font-bold mb-2">School Data Sync (JSON to DB)</h3>
      <p className="text-sm text-gray-500 mb-6">
        Select a school to sync its data from the `data/*.json` folder directly into the database.
      </p>
      
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select School</label>
          <select 
            value={selectedSlug} 
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {schoolOptions.map((school) => (
              <option key={school.value} value={school.value}>
                {school.label} ({school.value}.json)
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleSync} 
          disabled={loading}
          className={`w-full py-2.5 text-white rounded font-medium transition-all flex justify-center items-center gap-2 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Syncing...
            </>
          ) : '🔄 Start Sync'}
        </button>

        {message && (
          <div className={`mt-2 p-3 rounded text-sm font-medium ${message.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SyncSchoolData;