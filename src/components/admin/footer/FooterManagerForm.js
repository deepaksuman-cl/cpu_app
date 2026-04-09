'use client';

import { useState } from 'react';
import { Save, Plus, Trash2, RefreshCw, Globe, Phone, Mail, MapPin, Building2, ExternalLink, CheckCircle2, AlertCircle, X } from 'lucide-react';
import MediaUploader from '@/components/admin/MediaUploader';
import IconPicker from '@/components/admin/ui/IconPicker';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { updateFooter } from '@/lib/actions/footerActions';
import { seedDatabase } from '@/lib/actions/seedActions';
import Link from "next/link";

import toast, { Toaster } from 'react-hot-toast';

// --- Internal Helper Components ---

const Card = ({ title, icon, children, action }) => (
  <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none shadow-sm mb-5 overflow-hidden">
    <div className="bg-[var(--bg-muted)] border-b border-[var(--border-default)] px-5 py-3 flex justify-between items-center">
      <h3 className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-2">
        {icon && <span className="text-[var(--color-primary)]">{icon}</span>}
        {title}
      </h3>
      {action}
    </div>
    <div className="p-5 space-y-4">
      {children}
    </div>
  </div>
);

const Input = ({ label, type = "text", value, onChange, placeholder = "" }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</label>}
    <input 
      type={type} 
      value={value || ''} 
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-3 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--color-primary)] outline-none transition-colors"
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</label>}
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-3 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--color-primary)] outline-none transition-colors"
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
        toast.success(result.message || 'Footer configuration saved successfully!');
      } else {
        toast.error(result.message || 'Error updating footer');
      }
    } catch (err) {
      toast.error('Failed to save: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSync = async () => {
    if (!confirm('This will overwrite current DB settings with footer.json. Continue?')) return;
    setIsSyncing(true);
    try {
      const result = await seedDatabase();
      if (result.success) {
        toast.success(result.message || 'Synced from JSON successfully! Reloading...');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(result.message || 'Error syncing data');
      }
    } catch (err) {
      toast.error('Failed to sync: ' + err.message);
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
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)] text-left flex flex-col gap-0 justify-start">

      {/* Sticky Header */}
      <div className="sticky top-0 z-[30] flex items-center justify-between h-[44px] w-full bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm" style={{ position: 'sticky', top: 0, marginTop: 0 }}>
        <div className="flex items-center h-full px-4 gap-3">
          <Globe size={14} className="text-[var(--text-muted)] hidden sm:block" strokeWidth={2.5} />
          <h1 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-wider">Footer Manager</h1>
          <div className="hidden md:block w-[1px] h-4 bg-[var(--border-default)]"></div>
          <span className="hidden md:inline-block text-[12px] text-[var(--text-secondary)] font-bold tracking-wide">Branding, links, columns & SEO</span>
        </div>
        <div className="flex items-center h-full px-4 gap-2">
          {/* <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center justify-center h-[32px] px-3 sm:px-4 bg-[var(--bg-muted)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] border border-[var(--border-default)] transition-colors rounded-none text-[11px] font-bold uppercase tracking-widest gap-1.5 disabled:opacity-50"
          >
            {isSyncing ? <div className="w-3.5 h-3.5 border-2 border-[var(--border-default)] border-t-[var(--text-primary)] rounded-full animate-spin" /> : <RefreshCw size={13} strokeWidth={2.5} />}
            <span className="hidden sm:block">{isSyncing ? 'Syncing...' : 'Sync JSON'}</span>
          </button> */}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center h-[32px] px-3 sm:px-4 bg-[var(--color-success)] hover:bg-[var(--color-success-dark)] text-[var(--text-inverse)] transition-colors rounded-none shadow-sm uppercase tracking-widest text-[11px] font-bold gap-1.5 disabled:opacity-50"
          >
            {isSaving ? <div className="w-3.5 h-3.5 border-2 border-[var(--bg-surface)] border-t-[var(--text-inverse)] rounded-full animate-spin" /> : <Save size={13} strokeWidth={2.5} />}
            <span className="hidden sm:block">{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="w-[98%] lg:w-[95%] xl:w-[92%] mx-auto py-6 pb-32">

      {/* Card 1: Branding */}
      <Card title="Branding" icon={<Building2 size={13} />}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Logo URL</label>
              <Input value={formData.logo} onChange={(url) => updateField('logo', url)} placeholder="https://..." />
            </div>
            {formData.logo && (
              <div className="p-4 border border-dashed border-[var(--border-default)] bg-[var(--bg-muted)] flex flex-col items-center gap-2">
                <img src={formData.logo} alt="Logo Preview" className="max-h-16 object-contain" />
                <span className="text-[9px] text-[var(--text-muted)] font-mono break-all text-center">{formData.logo}</span>
              </div>
            )}
            <div className="border-t border-[var(--border-light)] pt-4">
              <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Or Upload File</p>
              <MediaUploader category="footer" onUploadSuccess={(url) => updateField('logo', url)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">About / Tagline Text</label>
            <textarea 
              value={formData.aboutText} 
              onChange={(e) => updateField('aboutText', e.target.value)}
              className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-3 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--color-primary)] outline-none min-h-[140px]"
              placeholder="Footer description shown beneath logo..."
            />
          </div>
        </div>
      </Card>

      {/* Card 2: Social Links */}
      <Card title="Social Links" icon={<ExternalLink size={13} />}
        action={
          <button onClick={addSocial} className="flex items-center gap-1 text-[10px] font-black text-[var(--color-primary)] hover:underline uppercase tracking-widest">
            <Plus size={12} /> Add
          </button>
        }
      >
        <div className="space-y-2">
          {formData.socialLinks?.map((social, idx) => (
            <div key={idx} className="flex gap-3 items-end bg-[var(--bg-body)] p-3 border border-[var(--border-default)]">
              <div className="w-40 shrink-0">
                <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Icon</label>
                <IconPicker value={social.icon} onChange={(icon) => updateSocial(idx, { icon })} />
              </div>
              <div className="flex-1">
                <Input label="URL" value={social.url} onChange={(val) => updateSocial(idx, { url: val })} />
              </div>
              <button 
                onClick={() => removeSocial(idx)}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors border border-transparent hover:border-red-200"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {(!formData.socialLinks || formData.socialLinks.length === 0) && (
            <p className="text-[11px] text-[var(--text-muted)] text-center py-3 italic">No social links yet. Click "Add" to create one.</p>
          )}
        </div>
      </Card>

      {/* Dynamic Columns */}
      {formData.columns?.map((col, colIdx) => (
        <Card 
          key={colIdx} 
          title={`Column ${colIdx + 1}: ${col.title || 'Untitled Section'}`}
          action={
            <button 
              onClick={() => updateField('columns', formData.columns.filter((_, i) => i !== colIdx))}
              className="text-[var(--color-danger)] hover:text-red-700 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest"
            >
              <Trash2 size={13} /> Remove
            </button>
          }
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input label="Column Title" value={col.title || ''} onChange={(val) => updateColumn(colIdx, { title: val })} />
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

          {col.columnType === 'links' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-2">
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Links</label>
                <button 
                  onClick={() => updateColumn(colIdx, { links: [...(col.links || []), { label: '', url: '' }] })}
                  className="text-[10px] font-black text-[var(--color-primary)] uppercase flex items-center gap-1 hover:underline tracking-widest"
                >
                  <Plus size={12} /> Add Link
                </button>
              </div>
              <div className="space-y-2">
                {col.links?.map((link, lIdx) => (
                  <div key={lIdx} className="flex gap-2">
                    <input 
                      className="flex-1 bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-3 py-2 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)]"
                      placeholder="Label" value={link.label} 
                      onChange={(e) => { const nl = [...col.links]; nl[lIdx].label = e.target.value; updateColumn(colIdx, { links: nl }); }}
                    />
                    <input 
                      className="flex-1 bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-3 py-2 text-xs text-[var(--text-secondary)] outline-none focus:border-[var(--color-primary)]"
                      placeholder="/url" value={link.url} 
                      onChange={(e) => { const nl = [...col.links]; nl[lIdx].url = e.target.value; updateColumn(colIdx, { links: nl }); }}
                    />
                    <button onClick={() => updateColumn(colIdx, { links: col.links.filter((_, i) => i !== lIdx) })} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] p-2">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {col.columnType === 'contact' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-2">
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Contact Items</label>
                <button onClick={addContact} className="text-[10px] font-black text-[var(--color-primary)] uppercase flex items-center gap-1 hover:underline tracking-widest">
                  <Plus size={12} /> Add
                </button>
              </div>
              {formData.contact?.map((item, cIdx) => (
                <div key={cIdx} className="bg-[var(--bg-body)] p-4 border border-[var(--border-default)] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">Item #{cIdx + 1}</span>
                    <button onClick={() => removeContact(cIdx)} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Label (e.g. Phone)" value={item.label} onChange={(val) => updateContact(cIdx, { label: val })} />
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Icon</label>
                      <IconPicker value={item.icon} onChange={(icon) => updateContact(cIdx, { icon })} />
                    </div>
                  </div>
                  <Input label="Text / Value" value={item.text} onChange={(val) => updateContact(cIdx, { text: val })} />
                </div>
              ))}
            </div>
          )}

          {col.columnType === 'text' && (
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Content (Rich Text)</label>
              <RichTextEditor 
                value={col.content || ''} 
                onChange={(content) => updateColumn(colIdx, { content })} 
                useProse={col.useProse !== false}
                onProseChange={(val) => updateColumn(colIdx, { useProse: val })}
              />
            </div>
          )}
        </Card>
      ))}

      {/* Add Column Button */}
      <button 
        onClick={() => updateField('columns', [...formData.columns, { title: 'New Section', columnType: 'links', links: [], order: formData.columns.length + 1 }])}
        className="w-full py-6 border-2 border-dashed border-[var(--border-default)] text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all flex items-center justify-center gap-3 mb-6"
      >
        <Plus size={18} /> Add Footer Column
      </button>

      {/* Bottom Bar */}
      <Card title="Bottom Bar / Copyright">
        <div className="space-y-4">
          <Input label="Copyright Text" value={formData.copyright?.text} onChange={(val) => updateNestedField('copyright', 'text', val)} />
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-2">
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Bottom Links</label>
              <button 
                onClick={() => updateNestedField('copyright', 'links', [...(formData.copyright.links || []), { label: '', url: '' }])}
                className="text-[10px] font-black text-[var(--color-primary)] uppercase flex items-center gap-1 hover:underline tracking-widest"
              >
                <Plus size={12} /> Add Link
              </button>
            </div>
            <div className="space-y-2">
              {formData.copyright?.links?.map((link, lIdx) => (
                <div key={lIdx} className="flex gap-2">
                  <input 
                    className="flex-1 bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-3 py-2 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)]"
                    placeholder="Label" value={link.label} 
                    onChange={(e) => { const nl = [...formData.copyright.links]; nl[lIdx].label = e.target.value; updateNestedField('copyright', 'links', nl); }}
                  />
                  <input 
                    className="flex-1 bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-3 py-2 text-xs text-[var(--text-secondary)] outline-none focus:border-[var(--color-primary)]"
                    placeholder="/url" value={link.url} 
                    onChange={(e) => { const nl = [...formData.copyright.links]; nl[lIdx].url = e.target.value; updateNestedField('copyright', 'links', nl); }}
                  />
                  <button 
                    onClick={() => updateNestedField('copyright', 'links', formData.copyright.links.filter((_, i) => i !== lIdx))}
                    className="text-[var(--text-muted)] hover:text-[var(--color-danger)] p-2"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Global SEO Settings */}
      <Card title="Global SEO Settings">
        <div className="space-y-4">
          <Input 
            label="Meta Title" 
            value={formData.seo?.metaTitle} 
            onChange={(val) => updateNestedField('seo', 'metaTitle', val)} 
            placeholder="e.g., Career Point University | Best University in Rajasthan"
          />
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Meta Description</label>
            <textarea 
              value={formData.seo?.metaDescription} 
              onChange={(e) => updateNestedField('seo', 'metaDescription', e.target.value)}
              className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-3 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--color-primary)] outline-none min-h-[90px]"
              placeholder="A brief description for search engines..."
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
      <Toaster position="bottom-right" />
      <div id="form_wrapper">
         <div className="form-clickOuter"><span className="form-click opacityprimary open">Enquiry Now </span> </div>
         <div className="form-sec card" id="enquiry-now">
            <div className="adm-txt">Enquiry Now</div>
     
			 <div className="npf_wgts" data-height="428px" data-w="f0dace2ba1b9cc96517a3a6aa12f701c"></div>
<script type="text/javascript">var s=document.createElement("script");     s.type="text/javascript"; s.async=true; s.src="https://widgets.in8.nopaperforms.com/emwgts.js";     document.body.appendChild(s);</script>

         </div>
      </div>


      <Link
  href="https://api.whatsapp.com/send/?phone=919079134713&text=Hi%27I+want+to+Know+the+Details+of+Career+Point+University"
  target="_blank"
  rel="noopener noreferrer"
  className="whatsapp__chat"
>
  <i className="fab fa-whatsapp"></i>
</Link>
    </div>





  );
}
