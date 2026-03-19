'use client';

import { useState } from 'react';
import { Save, Plus, Trash2, RefreshCw, Globe, Phone, Mail, MapPin, Building2, ExternalLink } from 'lucide-react';
import MediaUploader from '@/components/admin/MediaUploader';
import IconPicker from '@/components/admin/ui/IconPicker';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { updateFooter, seedFooterFromJson } from '@/lib/actions/footerActions';

// --- Internal Helper Components ---

const Card = ({ title, children }) => (
  <div className="bg-white border border-gray-300 rounded-none shadow-sm mb-6 overflow-hidden">
    <div className="bg-gray-50 border-b border-gray-300 px-6 py-3 flex justify-between items-center">
      <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">{title}</h3>
    </div>
    <div className="p-6 space-y-4">
      {children}
    </div>
  </div>
);

const Input = ({ label, type = "text", value, onChange, placeholder = "" }) => (
  <div className="space-y-1">
    {label && <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{label}</label>}
    <input 
      type={type} 
      value={value || ''} 
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-none p-3 text-sm focus:ring-0 focus:border-blue-500 outline-none transition-all"
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div className="space-y-1">
    {label && <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{label}</label>}
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-none p-3 text-sm focus:ring-0 focus:border-blue-500 outline-none transition-all bg-white"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

// --- Main Form Component ---

export default function FooterManagerForm({ initialData }) {
  const [formData, setFormData] = useState(initialData || {
    logo: '',
    aboutText: '',
    colors: { primary: '', background: '' },
    socialLinks: [],
    columns: [],
    contact: { address: '', phone: '', email: '' },
    copyright: { text: '', links: [] },
    floatingButtons: [],
    seo: { metaTitle: '', metaDescription: '', metaKeywords: '' }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateFooter(formData);
      if (result.success) {
        alert('Footer configuration saved successfully!');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (err) {
      alert('Failed to save: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSync = async () => {
    if (!confirm('This will overwrite current DB settings with footer.json. Continue?')) return;
    setIsSyncing(true);
    try {
      const result = await seedFooterFromJson();
      if (result.success) {
        alert('Synced from JSON! Page will reload.');
        window.location.reload();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (err) {
      alert('Failed to sync: ' + err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const updateColumn = (index, updates) => {
    const newColumns = [...formData.columns];
    newColumns[index] = { ...newColumns[index], ...updates };
    updateField('columns', newColumns);
  };

  const addSocial = () => {
    updateField('socialLinks', [...formData.socialLinks, { icon: 'Facebook', url: '#' }]);
  };

  const removeSocial = (index) => {
    updateField('socialLinks', formData.socialLinks.filter((_, i) => i !== index));
  };

  const updateSocial = (index, updates) => {
    const newList = [...formData.socialLinks];
    newList[index] = { ...newList[index], ...updates };
    updateField('socialLinks', newList);
  };

  const addContact = () => {
    updateField('contact', [...formData.contact, { icon: 'MapPin', text: '', label: 'New Label' }]);
  };

  const removeContact = (index) => {
    updateField('contact', formData.contact.filter((_, i) => i !== index));
  };

  const updateContact = (index, updates) => {
    const newList = [...formData.contact];
    newList[index] = { ...newList[index], ...updates };
    updateField('contact', newList);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 pb-32">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-300 -mx-6 px-6 py-4 flex justify-between items-center mb-10 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Footer Manager</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Enterprise CMS</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="bg-white text-gray-900 border border-gray-300 px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all rounded-none flex items-center gap-2"
          >
            {isSyncing ? 'Syncing...' : <><RefreshCw size={16} /> Sync from JSON</>}
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-black text-white px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all rounded-none flex items-center gap-2"
          >
            {isSaving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>

      {/* Card 1: Branding */}
      <Card title="Card 1 (Branding)">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-2">Logo</label>
            
            {/* Show Current Logo Preview */}
            {formData.logo && (
              <div className="mb-4 p-4 border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center">
                <img src={formData.logo} alt="Current Logo" className="max-h-20 object-contain mb-2" />
                <span className="text-[10px] text-gray-400 font-mono break-all">{formData.logo}</span>
              </div>
            )}
            
            <Input 
              label="Direct Image URL (Paste here to override)" 
              value={formData.logo} 
              onChange={(url) => updateField('logo', url)} 
            />
            
            <div className="my-4 text-center text-[10px] text-gray-400 uppercase font-bold tracking-widest border-t border-gray-100 pt-4">OR Upload New File to Server</div>

            <MediaUploader 
              category="footer"
              onUploadSuccess={(url) => updateField('logo', url)} 
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">About Text</label>
            <textarea 
              value={formData.aboutText} 
              onChange={(e) => updateField('aboutText', e.target.value)}
              className="w-full border border-gray-300 rounded-none p-4 text-sm focus:ring-0 focus:border-blue-500 outline-none min-h-[120px]"
              placeholder="Footer description..."
            />
          </div>
        </div>
      </Card>

      {/* Card 2: Social Links */}
      <Card title="Card 2 (Social Links)">
        <div className="space-y-3">
          {formData.socialLinks?.map((social, idx) => (
            <div key={idx} className="flex gap-4 items-end bg-gray-50 p-4 border border-gray-200">
              <div className="w-1/3">
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Icon</label>
                <IconPicker 
                  value={social.icon} 
                  onChange={(icon) => updateSocial(idx, { icon })} 
                />
              </div>
              <div className="flex-1">
                <Input 
                  label="URL" 
                  value={social.url} 
                  onChange={(val) => updateSocial(idx, { url: val })} 
                />
              </div>
              <button 
                onClick={() => removeSocial(idx)}
                className="p-3 text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-200"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button 
            onClick={addSocial}
            className="w-full py-4 border-2 border-dashed border-gray-200 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Social Link
          </button>
        </div>
      </Card>

      {/* Dynamic Columns */}
      {formData.columns?.map((col, colIdx) => (
        <Card 
          key={colIdx} 
          title={`Column ${colIdx + 1}: ${col.title || 'Untitled Section'}`}
        >
          <div className="flex justify-end mb-4 -mt-2">
            <button 
              onClick={() => {
                const newList = formData.columns.filter((_, i) => i !== colIdx);
                updateField('columns', newList);
              }}
              className="text-red-500 hover:text-red-700 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest"
            >
              <Trash2 size={14} /> Remove Column
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <Input 
              label="Column Title" 
              value={col.title || ''} 
              onChange={(val) => updateColumn(colIdx, { title: val })} 
            />
            <Select 
              label="Column Type"
              value={col.columnType || 'links'}
              onChange={(val) => updateColumn(colIdx, { columnType: val })}
              options={[
                { label: 'Quick Links', value: 'links' },
                { label: 'Contact Info', value: 'contact' },
                { label: 'Custom Text', value: 'text' }
              ]}
            />
          </div>

          {/* Conditional Rendering based on Column Type */}
          {col.columnType === 'links' && (
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Links Manager</label>
              <div className="space-y-2 border-l-2 border-gray-200 pl-4 py-2">
                {col.links?.map((link, lIdx) => (
                  <div key={lIdx} className="flex gap-2">
                    <input 
                      className="flex-1 border border-gray-300 rounded-none p-2 text-xs outline-none focus:border-blue-500"
                      placeholder="Label" value={link.label} 
                      onChange={(e) => {
                        const newLinks = [...col.links];
                        newLinks[lIdx].label = e.target.value;
                        updateColumn(colIdx, { links: newLinks });
                      }}
                    />
                    <input 
                      className="flex-1 border border-gray-300 rounded-none p-2 text-xs outline-none focus:border-blue-500"
                      placeholder="URL" value={link.url} 
                      onChange={(e) => {
                        const newLinks = [...col.links];
                        newLinks[lIdx].url = e.target.value;
                        updateColumn(colIdx, { links: newLinks });
                      }}
                    />
                    <button 
                      onClick={() => {
                        const newLinks = col.links.filter((_, i) => i !== lIdx);
                        updateColumn(colIdx, { links: newLinks });
                      }}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => {
                    const existing = col.links || [];
                    updateColumn(colIdx, { links: [...existing, { label: '', url: '' }] });
                  }}
                  className="text-[10px] font-black text-blue-600 uppercase mt-2 flex items-center gap-1 hover:text-blue-800"
                >
                  <Plus size={14} /> Add Link
                </button>
              </div>
            </div>
          )}

          {col.columnType === 'contact' && (
            <div className="space-y-4">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Contact Items Manager</label>
              <div className="space-y-3">
                {formData.contact?.map((item, cIdx) => (
                  <div key={cIdx} className="bg-gray-50 p-4 border border-gray-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase text-gray-400">Item #{cIdx + 1}</span>
                      <button onClick={() => removeContact(cIdx)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Label (e.g. Phone)" value={item.label} onChange={(val) => updateContact(cIdx, { label: val })} />
                      <div className="w-full">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Icon</label>
                        <IconPicker value={item.icon} onChange={(icon) => updateContact(cIdx, { icon })} />
                      </div>
                    </div>
                    <Input label="Text/Value" value={item.text} onChange={(val) => updateContact(cIdx, { text: val })} />
                  </div>
                ))}
                <button 
                  onClick={addContact}
                  className="w-full py-4 border-2 border-dashed border-gray-200 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add Contact Item
                </button>
              </div>
            </div>
          )}

          {col.columnType === 'text' && (
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-2">Content</label>
              <RichTextEditor 
                value={col.content || ''} 
                onChange={(content) => updateColumn(colIdx, { content })} 
              />
            </div>
          )}
        </Card>
      ))}

      {/* Add Column Button */}
      <button 
        onClick={() => {
          updateField('columns', [...formData.columns, { title: 'New Section', columnType: 'links', links: [], order: formData.columns.length + 1 }]);
        }}
        className="w-full py-8 border-2 border-dashed border-gray-200 text-gray-400 text-xs font-black uppercase tracking-[0.2em] hover:border-black hover:text-black transition-all flex items-center justify-center gap-3 mb-10"
      >
        <Plus size={20} /> Add Footer Column
      </button>

      {/* Card 7: Bottom Bar */}
      <Card title="Card 7 (Bottom Bar)">
        <div className="space-y-4">
          <Input 
            label="Copyright Text" 
            value={formData.copyright?.text} 
            onChange={(val) => updateNestedField('copyright', 'text', val)} 
          />
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Bottom Links</label>
            <div className="space-y-2 border-l-2 border-gray-200 pl-4 py-2">
              {formData.copyright?.links?.map((link, lIdx) => (
                <div key={lIdx} className="flex gap-2">
                  <input 
                    className="flex-1 border border-gray-300 rounded-none p-2 text-xs outline-none focus:border-blue-500"
                    placeholder="Label" value={link.label} 
                    onChange={(e) => {
                      const newLinks = [...formData.copyright.links];
                      newLinks[lIdx].label = e.target.value;
                      updateNestedField('copyright', 'links', newLinks);
                    }}
                  />
                  <input 
                    className="flex-1 border border-gray-300 rounded-none p-2 text-xs outline-none focus:border-blue-500"
                    placeholder="URL" value={link.url} 
                    onChange={(e) => {
                      const newLinks = [...formData.copyright.links];
                      newLinks[lIdx].url = e.target.value;
                      updateNestedField('copyright', 'links', newLinks);
                    }}
                  />
                  <button 
                    onClick={() => {
                      const newLinks = formData.copyright.links.filter((_, i) => i !== lIdx);
                      updateNestedField('copyright', 'links', newLinks);
                    }}
                    className="text-red-400 hover:text-red-600 p-2"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => {
                  const existing = formData.copyright.links || [];
                  updateNestedField('copyright', 'links', [...existing, { label: '', url: '' }]);
                }}
                className="text-[10px] font-black text-blue-600 uppercase mt-2 flex items-center gap-1 hover:text-blue-800"
              >
                <Plus size={14} /> Add Link
              </button>
            </div>
          </div>
        </div>
      </Card>
      {/* Card 8: SEO Settings */}
      <Card title="Card 8 (Global SEO Settings)">
        <div className="space-y-4">
          <Input 
            label="Meta Title" 
            value={formData.seo?.metaTitle} 
            onChange={(val) => updateNestedField('seo', 'metaTitle', val)} 
            placeholder="e.g., Career Point University | Best University in Rajasthan"
          />
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Meta Description</label>
            <textarea 
              value={formData.seo?.metaDescription} 
              onChange={(e) => updateNestedField('seo', 'metaDescription', e.target.value)}
              className="w-full border border-gray-300 rounded-none p-4 text-sm focus:ring-0 focus:border-blue-500 outline-none min-h-[100px]"
              placeholder="A brief description of the website for search engines..."
            />
          </div>
          <Input 
            label="Meta Keywords" 
            value={formData.seo?.metaKeywords} 
            onChange={(val) => updateNestedField('seo', 'metaKeywords', val)} 
            placeholder="e.g., university, education, college, kota"
          />
        </div>
      </Card>
    </div>
  );
}
