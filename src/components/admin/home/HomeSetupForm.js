'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Pencil, Save, CheckCircle2, AlertCircle, Settings, 
  Trash2, Plus, MoveUp, MoveDown, Image as ImageIcon 
} from 'lucide-react';
import Modal from '@/components/admin/ui/Modal';
import MediaUploader from '@/components/admin/MediaUploader';
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { 
  ssr: false,
  loading: () => <div className="h-[500px] bg-gray-50 border border-gray-200 animate-pulse flex items-center justify-center text-sm text-gray-400">Loading Editor...</div>
});
import IconPicker from '@/components/admin/ui/IconPicker';
import ColorPicker from '@/components/admin/ui/ColorPicker';
import { updateHomePageData } from "@/lib/actions/homeActions";
import { seedDatabase } from "@/lib/actions/seedActions";
import Icon from "../../ui/Icon";

// --- Section Metadata ---
const SECTION_MAP = {
  heroConfig: { title: 'Hero Section', desc: 'Main banner, titles, and slides.' },
  aboutConfig: { title: 'About Section', desc: 'University intro, image, and features.' },
  statsConfig: { title: 'Stats Section', desc: 'Key metrics with titles and icons.' },
  programsConfig: { title: 'Programs Section', desc: 'Academic categories and levels.' },
  placementConfig: { title: 'Placements Section', desc: 'Student success records and packages.' },
  alumniConfig: { title: 'Alumni Section', desc: 'Alumni success stories and testimonials.' },
  campusConfig: { title: 'Campus Life', desc: 'Gallery and descriptions of university life.' },
  researchConfig: { title: 'Research Section', desc: 'R&D focus areas and statistics.' },
  happeningsConfig: { title: 'Happenings', desc: 'News cards and events grid.' },
  testimonialConfig: { title: 'Testimonials', desc: 'Detailed student feedback and ratings.' },
  faqConfig: { title: 'FAQ Section', desc: 'Frequently asked questions and answers.' },
  socialWallConfig: { title: 'Social Wall', desc: 'Social media images and titles.' },
  ctaConfig: { title: 'CTA Section', desc: 'Bottom call-to-action banner.' },
  virtuallyNewsConfig: { title: 'Virtual Tour & News', desc: 'Virtual tour links and latest news.' }
};

// --- Shared Internal Components ---

const NestedListEditor = ({ label, items = [], fields, onUpdate, newItemTemplate }) => (
  <div className="space-y-4">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-[var(--border-light)] pb-2">
      <h4 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</h4>
      <button onClick={() => onUpdate([...items, newItemTemplate])} className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-inverse)] bg-[var(--text-primary)] hover:bg-[var(--text-secondary)] transition-colors px-2 py-1 uppercase tracking-wide rounded-none">
        <Plus size={14} /> ADD NEW
      </button>
    </div>
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 relative group hover:border-[var(--border-dark)] transition-colors rounded-none">
          <div className="absolute top-2 right-2 flex gap-1 items-center">
             <button onClick={() => {
               if (idx > 0) {
                 const n = [...items]; [n[idx], n[idx-1]] = [n[idx-1], n[idx]]; onUpdate(n);
               }
             }} className="text-[var(--text-muted)] hover:text-[var(--color-primary)] p-1"><MoveUp size={14} /></button>
             <button onClick={() => {
                if (idx < items.length - 1) {
                  const n = [...items]; [n[idx], n[idx+1]] = [n[idx+1], n[idx]]; onUpdate(n);
                }
             }} className="text-[var(--text-muted)] hover:text-[var(--color-primary)] p-1"><MoveDown size={14} /></button>
             <button onClick={() => onUpdate(items.filter((_, i) => i !== idx))} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1 transition-colors">
               <Trash2 size={16} />
             </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {fields.map(field => (
              <div key={field.key} className={field.fullWidth ? 'md:col-span-2' : ''}>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">{field.label}</label>
                {field.type === 'icon' ? (
                  <IconPicker value={item[field.key]} onChange={val => {
                    const newItems = [...items]; newItems[idx][field.key] = val; onUpdate(newItems);
                  }} />
                ) : field.type === 'color' ? (
                  <ColorPicker value={item[field.key]} onChange={val => {
                    const newItems = [...items]; newItems[idx][field.key] = val; onUpdate(newItems);
                  }} />
                ) : field.type === 'image' ? (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text" value={item[field.key] || ''} onChange={e => {
                      const newItems = [...items]; newItems[idx][field.key] = e.target.value; onUpdate(newItems);
                    }} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                    <div className="w-full sm:w-auto shrink-0">
                      <MediaUploader category="home" onUploadSuccess={url => {
                        const newItems = [...items]; newItems[idx][field.key] = url; onUpdate(newItems);
                      }} />
                    </div>
                  </div>
                ) : field.type === 'richText' ? (
                  <RichTextEditor value={item[field.key] || ''} onChange={val => {
                    const newItems = [...items]; newItems[idx][field.key] = val; onUpdate(newItems);
                  }} />
                ) : field.type === 'textarea' ? (
                  <textarea value={item[field.key] || ''} onChange={e => {
                    const newItems = [...items]; newItems[idx][field.key] = e.target.value; onUpdate(newItems);
                  }} className="w-full border border-[var(--border-default)] p-2 text-xs h-20 outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none resize-none" />
                ) : (
                  <input type={field.type || 'text'} value={item[field.key] || ''} onChange={e => {
                    const newItems = [...items]; newItems[idx][field.key] = e.target.value; onUpdate(newItems);
                  }} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TitleEditor = ({ label, value = {}, onChange }) => (
  <div className="space-y-3 p-4 bg-[var(--bg-muted)] border-l-2 border-[var(--color-primary)] mb-4">
    <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Main Title</label>
        <input 
          type="text" 
          value={value.main || ''} 
          onChange={e => onChange({...value, main: e.target.value})} 
          className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" 
          placeholder="e.g. Shape Your Future" 
        />
      </div>
      <div>
        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Highlight Word</label>
        <input 
          type="text" 
          value={value.highlight || ''} 
          onChange={e => onChange({...value, highlight: e.target.value})} 
          className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" 
          placeholder="e.g. Future" 
        />
      </div>
    </div>
  </div>
);

const ImagePickerField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">{label}</label>
    <div className="flex flex-col sm:flex-row gap-2">
      <input 
        type="text" 
        value={value || ''} 
        onChange={e => onChange(e.target.value)} 
        className="flex-1 border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" 
      />
      <div className="w-full sm:w-auto shrink-0">
        <MediaUploader category="home" onUploadSuccess={url => onChange(url)} />
      </div>
    </div>
  </div>
);

// --- Main Form Component ---

export default function HomeSetupForm({ initialData }) {
  const router = useRouter();
  const [sections, setSections] = useState(initialData?.sections || {});
  const [seo, setSeo] = useState(initialData?.seo || { title: '', description: '', keywords: '', ogImage: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateSection = useCallback((section, data) => {
    setSections(prev => ({ ...prev, [section]: data }));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await updateHomePageData(sections, seo);
      if (res.success) {
        alert("Home Page Settings Saved Successfully!");
        router.refresh();
      } else {
        alert("Error saving data: " + res.error);
      }
    } catch (err) {
      alert("System Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSeed = async () => {
    if (!confirm("Are you sure? This will OVERWRITE all current Home Page settings with the default data from home.json.")) return;
    setIsSeeding(true);
    try {
      const res = await seedDatabase();
      if (res.success) {
        alert("Database Seeded Successfully! Refreshing page...");
        window.location.reload();
      } else {
        alert("Error seeding data: " + res.error);
      }
    } catch (err) {
      alert("System Error: " + err.message);
    } finally {
      setIsSeeding(false);
    }
  };

  const SectionCard = ({ id, title, description }) => {
    const isComplete = true; // Placeholder for now
    return (
      <div className="border border-[var(--border-default)] bg-[var(--bg-surface)] p-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:border-[var(--color-primary)] transition-all rounded-none group shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-none shrink-0 bg-[var(--color-success-light)] text-[var(--color-success-dark)]">
            <CheckCircle2 size={16} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-bold text-[var(--text-primary)] text-[12px] uppercase tracking-wide leading-tight">{title}</h3>
            <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{description}</p>
          </div>
        </div>
        <button 
          onClick={() => { setActiveSection(id); setIsModalOpen(true); }}
          className="w-full sm:w-auto px-3 py-1.5 border border-[var(--border-dark)] text-[var(--text-secondary)] font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] hover:text-[var(--bg-surface)] transition-all rounded-none flex items-center justify-center gap-1.5"
        >
          <Pencil size={12} strokeWidth={2} /> EDIT
        </button>
      </div>
    );
  };

  return (
    <div className="w-[98%] lg:w-[95%] xl:w-[92%] mx-auto pb-28 space-y-6 px-4 mt-6">
      
      {/* ── Header Intro ── */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-5 shadow-[var(--shadow-sm)] space-y-5 rounded-none">
        <div className="flex items-center gap-2 border-b border-[var(--border-light)] pb-3">
          <Settings size={18} className="text-[var(--color-primary)]" />
          <h2 className="text-[14px] font-black text-[var(--text-primary)] uppercase tracking-wide">Global Home Page Setup</h2>
        </div>
        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
          Manage all sections of your public Home Page from this centralized dashboard. 
          Each card below represents a UI block on the main landing page. 
          Click <strong>EDIT</strong> to modify content, images, and links for each block.
        </p>
      </div>

      {/* ── SEO & META CONFIG ── */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-dark)] p-5 shadow-[var(--shadow-lg)] space-y-6 rounded-none">
        <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[var(--color-success-dark)]" />
            <h2 className="text-[14px] font-black text-[var(--text-primary)] uppercase tracking-wide">SEO & Meta Configuration</h2>
          </div>
          <span className="text-[9px] font-bold text-[var(--text-muted)] bg-[var(--bg-muted)] px-2 py-0.5 uppercase tracking-widest border border-[var(--border-light)]">Global Settings</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase mb-1.5 tracking-wider">Meta Title</label>
              <input 
                type="text" 
                value={seo.title || ''} 
                onChange={e => setSeo({...seo, title: e.target.value})}
                className="w-full border border-[var(--border-default)] p-3 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none shadow-sm font-medium"
                placeholder="Enter meta title..."
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase mb-1.5 tracking-wider">Meta Keywords</label>
              <input 
                type="text" 
                value={seo.keywords || ''} 
                onChange={e => setSeo({...seo, keywords: e.target.value})}
                className="w-full border border-[var(--border-default)] p-3 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none shadow-sm"
                placeholder="keyword1, keyword2, keyword3..."
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase mb-1.5 tracking-wider">Meta Description</label>
              <textarea 
                value={seo.description || ''} 
                onChange={e => setSeo({...seo, description: e.target.value})}
                className="w-full border border-[var(--border-default)] p-3 text-xs h-[105px] outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none shadow-sm resize-none"
                placeholder="Enter compelling meta description..."
              />
            </div>
          </div>
          <div className="md:col-span-2 pt-2">
            <ImagePickerField 
              label="Open Graph (OG) Image" 
              value={seo.ogImage} 
              onChange={url => setSeo({...seo, ogImage: url})} 
            />
          </div>
        </div>
      </div>

      {/* ── Sections Grid ── */}
      <div className="space-y-4">
        <h2 className="text-[14px] font-black text-[var(--text-primary)] uppercase tracking-wide border-b border-[var(--border-light)] pb-2">Home Page Layout Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.keys(SECTION_MAP).map((key) => (
            <SectionCard 
              key={key} 
              id={key} 
              title={SECTION_MAP[key].title} 
              description={SECTION_MAP[key].desc} 
            />
          ))}
        </div>
      </div>

      {/* ── Floating Save Bar ── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-dark)] p-2 shadow-2xl flex items-center gap-3 rounded-none">
          <div className="hidden sm:flex flex-col text-right px-3 border-r border-[var(--border-light)]">
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Global Status</span>
            <span className="text-[11px] font-black text-[var(--color-primary)] uppercase">{isSaving ? 'Saving...' : 'Draft Ready'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSeed}
              disabled={isSeeding || isSaving}
              className="px-5 py-2.5 bg-white border border-[#00588b] text-[#00588b] text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 flex items-center gap-2 group transition-all disabled:opacity-50"
            >
              <Icon name="RefreshCw" size={14} className={isSeeding ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"} />
              {isSeeding ? 'Seeding...' : 'Seed Default Data'}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || isSeeding}
              className="px-8 py-2.5 bg-[#01b64a] text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#019a3f] flex items-center gap-2 shadow-[0_4px_14px_rgba(1,182,74,0.30)] transition-all active:scale-95 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Edit Modal ── */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Edit ${SECTION_MAP[activeSection]?.title || 'Section'}`}
        footer={
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <p className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-widest w-full sm:w-auto text-center sm:text-left">Changes will be packaged on Done</p>
            <button onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto bg-[var(--text-primary)] text-[var(--bg-surface)] px-10 py-2.5 font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--text-secondary)] transition-colors rounded-none">
              DONE EDITING
            </button>
          </div>
        }
      >
        <div className="p-2 pb-8">
          {/* Conditional rendering based on activeSection */}
          {activeSection === 'heroConfig' && (
            <div className="space-y-6">
              <NestedListEditor 
                label="Hero Slides"
                items={sections.heroConfig.slides}
                newItemTemplate={{ bg: '', tagline: '', title: '', subtitle: '', desc: '', badge: '', btn1Text: '', btn1Icon: '', btn1Link: '', btn2Text: '', btn2Icon: '', btn2Link: '' }}
                fields={[
                  {key: 'title', label: 'Main Title'},
                  {key: 'subtitle', label: 'Subtitle'},
                  {key: 'tagline', label: 'Tagline'},
                  {key: 'badge', label: 'Badge Text'},
                  {key: 'bg', label: 'Background Image', type: 'image', fullWidth: true},
                  {key: 'desc', label: 'Description', type: 'textarea', fullWidth: true},
                  {key: 'btn1Text', label: 'Button 1 Text'},
                  {key: 'btn1Icon', label: 'Button 1 Icon', type: 'icon'},
                  {key: 'btn1Link', label: 'Button 1 Link', fullWidth: true},
                  {key: 'btn2Text', label: 'Button 2 Text'},
                  {key: 'btn2Icon', label: 'Button 2 Icon', type: 'icon'},
                  {key: 'btn2Link', label: 'Button 2 Link', fullWidth: true}
                ]}
                onUpdate={items => updateSection('heroConfig', {...sections.heroConfig, slides: items})}
              />
            </div>
          )}

          {activeSection === 'aboutConfig' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImagePickerField 
                  label="Main Image" 
                  value={sections.aboutConfig.mainImage} 
                  onChange={url => updateSection('aboutConfig', {...sections.aboutConfig, mainImage: url})} 
                />
                <div className="grid grid-cols-2 gap-2">
                   <div>
                     <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Years Value</label>
                     <input type="text" value={sections.aboutConfig.yearsValue} onChange={e => updateSection('aboutConfig', {...sections.aboutConfig, yearsValue: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                   </div>
                   <div>
                     <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Years Label</label>
                     <input type="text" value={sections.aboutConfig.yearsLabel} onChange={e => updateSection('aboutConfig', {...sections.aboutConfig, yearsLabel: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                   </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TitleEditor 
                label="Section Heading" 
                value={{ main: sections.aboutConfig.title, highlight: sections.aboutConfig.highlight }} 
                onChange={val => updateSection('aboutConfig', {...sections.aboutConfig, title: val.main, highlight: val.highlight})} 
              />
              <div className="bg-[var(--bg-muted)] p-3">
                 <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Tagline</label>
                 <input type="text" value={sections.aboutConfig.tagline} onChange={e => updateSection('aboutConfig', {...sections.aboutConfig, tagline: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3 bg-[var(--bg-muted)] p-3">
                 <div>
                   <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">NAAC Badge</label>
                   <input type="text" value={sections.aboutConfig.naacBadge} onChange={e => updateSection('aboutConfig', {...sections.aboutConfig, naacBadge: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">NAAC Sub</label>
                   <input type="text" value={sections.aboutConfig.naacSub} onChange={e => updateSection('aboutConfig', {...sections.aboutConfig, naacSub: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
                 </div>
              </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[var(--bg-muted)] p-3">
                 <div>
                   <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Button 1 Text</label>
                   <input type="text" value={sections.aboutConfig.btnText} onChange={e => updateSection('aboutConfig', {...sections.aboutConfig, btnText: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Button 1 Icon</label>
                   <IconPicker value={sections.aboutConfig.btnIcon} onChange={val => updateSection('aboutConfig', {...sections.aboutConfig, btnIcon: val})} />
                 </div>
                 <div>
                   <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Button 1 Link</label>
                   <input type="text" value={sections.aboutConfig.btnLink} onChange={e => updateSection('aboutConfig', {...sections.aboutConfig, btnLink: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
                 </div>
              </div>
              
              <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-4">
                 <label className="block text-[10px] font-black text-[var(--text-primary)] uppercase mb-3 tracking-widest">Description (Rich Text)</label>
                 <RichTextEditor 
                  value={sections.aboutConfig.description} 
                  onChange={val => updateSection('aboutConfig', {...sections.aboutConfig, description: val})} 
                 />
              </div>

              <NestedListEditor 
                label="Feature Points"
                items={sections.aboutConfig.features}
                newItemTemplate={{ icon: 'Award', title: '', subtitle: '' }}
                fields={[
                  {key: 'title', label: 'Title'},
                  {key: 'subtitle', label: 'Subtitle'},
                  {key: 'icon', label: 'Icon', type: 'icon'}
                ]}
                onUpdate={items => updateSection('aboutConfig', {...sections.aboutConfig, features: items})}
              />
            </div>
          )}

          {activeSection === 'statsConfig' && (
             <div className="space-y-4">
               <NestedListEditor 
                  label="Stats Cards"
                  items={sections.statsConfig.stats}
                  newItemTemplate={{ value: '', suffix: '', label: '', icon: 'Star' }}
                  fields={[
                    {key: 'value', label: 'Value (Number)'},
                    {key: 'suffix', label: 'Suffix (e.g. +)'},
                    {key: 'label', label: 'Label'},
                    {key: 'icon', label: 'Icon', type: 'icon'}
                  ]}
                  onUpdate={items => updateSection('statsConfig', {...sections.statsConfig, stats: items})}
               />
             </div>
          )}

          {activeSection === 'programsConfig' && (
            <div className="space-y-6">
              <TitleEditor 
                label="Section Heading" 
                value={{ main: sections.programsConfig.title, highlight: sections.programsConfig.highlight }} 
                onChange={val => updateSection('programsConfig', {...sections.programsConfig, title: val.main, highlight: val.highlight})} 
              />
              <div className="bg-[var(--bg-muted)] p-3">
                 <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Tagline</label>
                 <input type="text" value={sections.programsConfig.tagline} onChange={e => updateSection('programsConfig', {...sections.programsConfig, tagline: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
              </div>
              <NestedListEditor 
                label="Category Cards"
                items={sections.programsConfig.cards}
                newItemTemplate={{ id: Date.now(), label: '', image: '', count: '', link: '#' }}
                fields={[
                  {key: 'label', label: 'Category Label'},
                  {key: 'count', label: 'Sub-label (e.g. 30+ Programs)'},
                  {key: 'link', label: 'Link (Slug)', fullWidth: true},
                  {key: 'image', label: 'Card Image', type: 'image', fullWidth: true}
                ]}
                onUpdate={items => updateSection('programsConfig', {...sections.programsConfig, cards: items})}
              />
            </div>
          )}

          {activeSection === 'placementConfig' && (
            <div className="space-y-8">
              <TitleEditor 
                label="Section Heading" 
                value={{ main: sections.placementConfig.title, highlight: sections.placementConfig.highlight }} 
                onChange={val => updateSection('placementConfig', {...sections.placementConfig, title: val.main, highlight: val.highlight})} 
              />
              <div className="bg-[var(--bg-muted)] p-3">
                 <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Tagline</label>
                 <input type="text" value={sections.placementConfig.tagline} onChange={e => updateSection('placementConfig', {...sections.placementConfig, tagline: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
              </div>
              <NestedListEditor 
                label="Placement Statistics"
                items={sections.placementConfig.stats}
                newItemTemplate={{ val: '', label: '' }}
                fields={[{key: 'val', label: 'Value'}, {key: 'label', label: 'Label'}]}
                onUpdate={items => updateSection('placementConfig', {...sections.placementConfig, stats: items})}
              />
              <div className="pt-4 border-t border-[var(--border-light)]">
                <NestedListEditor 
                  label="Featured Placement Stories"
                  items={sections.placementConfig.slides}
                  newItemTemplate={{ name: '', course: '', company: '', img: '' }}
                  fields={[
                    {key: 'name', label: 'Student Name'},
                    {key: 'course', label: 'Course'},
                    {key: 'company', label: 'Company'},
                    {key: 'img', label: 'Photo', type: 'image', fullWidth: true}
                  ]}
                  onUpdate={items => updateSection('placementConfig', {...sections.placementConfig, slides: items})}
                />
              </div>
              <div className="pt-4 border-t border-[var(--border-light)]">
                <NestedListEditor 
                  label="Recruiter Logos"
                  items={sections.placementConfig.recruiters}
                  newItemTemplate={{ img: '' }}
                  fields={[{key: 'img', label: 'Logo Image', type: 'image', fullWidth: true}]}
                  onUpdate={items => updateSection('placementConfig', {...sections.placementConfig, recruiters: items})}
                />
              </div>
            </div>
          )}

          {activeSection === 'alumniConfig' && (
            <div className="space-y-6">
              <TitleEditor 
                label="Section Heading" 
                value={{ main: sections.alumniConfig.title, highlight: sections.alumniConfig.highlight }} 
                onChange={val => updateSection('alumniConfig', {...sections.alumniConfig, title: val.main, highlight: val.highlight})} 
              />
              <div className="bg-[var(--bg-muted)] p-3">
                 <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Tagline</label>
                 <input type="text" value={sections.alumniConfig.tagline} onChange={e => updateSection('alumniConfig', {...sections.alumniConfig, tagline: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
              </div>
              <NestedListEditor 
                label="Alumni Highlights"
                items={sections.alumniConfig.alumni}
                newItemTemplate={{ name: '', role: '', company: '', companyBg: '#00588b', circleBg: '#fbbf24', img: '' }}
                fields={[
                  {key: 'name', label: 'Name'},
                  {key: 'role', label: 'Role/Batch'},
                  {key: 'company', label: 'Company'},
                  {key: 'companyBg', label: 'Company Color', type: 'color'},
                  {key: 'circleBg', label: 'Accent Color', type: 'color'},
                  {key: 'img', label: 'Photo', type: 'image', fullWidth: true}
                ]}
                onUpdate={items => updateSection('alumniConfig', {...sections.alumniConfig, alumni: items})}
              />
            </div>
          )}

          {activeSection === 'campusConfig' && (
            <div className="space-y-6">
              <TitleEditor 
                label="Campus Heading" 
                value={{ main: sections.campusConfig.title, highlight: sections.campusConfig.highlight }} 
                onChange={val => updateSection('campusConfig', {...sections.campusConfig, title: val.main, highlight: val.highlight})} 
              />
              <div className="bg-[var(--bg-muted)] p-3 mb-4">
                 <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Section Tagline</label>
                 <input type="text" value={sections.campusConfig.tagline} onChange={e => updateSection('campusConfig', {...sections.campusConfig, tagline: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
              </div>
              <NestedListEditor 
                label="Campus Stats Bar"
                items={sections.campusConfig.stats}
                newItemTemplate={{ v: '', l: '' }}
                fields={[{key: 'v', label: 'Value'}, {key: 'l', label: 'Label'}]}
                onUpdate={items => updateSection('campusConfig', {...sections.campusConfig, stats: items})}
              />
              <div className="pt-6 border-t border-[var(--border-light)]">
                <NestedListEditor 
                  label="Campus Gallery Columns"
                  items={sections.campusConfig.cols}
                  newItemTemplate={{ title: '', bold: '', img: '', links: [{label: '', slug: '#'}] }}
                  fields={[
                    {key: 'title', label: 'Title prefix'},
                    {key: 'bold', label: 'Bold emphasis'},
                    {key: 'img', label: 'Cover Image', type: 'image', fullWidth: true}
                  ]}
                  onUpdate={items => updateSection('campusConfig', {...sections.campusConfig, cols: items})}
                />
                <p className="text-[10px] font-bold text-[var(--text-primary)] uppercase mt-6 mb-2">Column Links Manager</p>
                <div className="space-y-4">
                  {sections.campusConfig.cols.map((col, cIdx) => (
                    <div key={cIdx} className="p-3 bg-gray-50 border border-gray-200">
                      <p className="text-[9px] font-black text-[#00588b] uppercase mb-2">Links for: {col.bold || `Column ${cIdx+1}`}</p>
                      <NestedListEditor 
                        label=""
                        items={col.links || []}
                        newItemTemplate={{ label: '', slug: '#' }}
                        fields={[{key: 'label', label: 'Link Label'}, {key: 'slug', label: 'Slug/Link'}]}
                        onUpdate={newLinks => {
                          const newCols = [...sections.campusConfig.cols];
                          newCols[cIdx].links = newLinks;
                          updateSection('campusConfig', {...sections.campusConfig, cols: newCols});
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'researchConfig' && (
            <div className="space-y-6">
              <TitleEditor 
                label="Research Heading" 
                value={{ main: sections.researchConfig.title, highlight: sections.researchConfig.highlight }} 
                onChange={val => updateSection('researchConfig', {...sections.researchConfig, title: val.main, highlight: val.highlight})} 
              />
              <NestedListEditor 
                label="Research Items"
                items={sections.researchConfig.items}
                newItemTemplate={{ title: '', img: '', desc: '', tag: '' }}
                fields={[
                  {key: 'title', label: 'Item Title'},
                  {key: 'tag', label: 'Category Tag'},
                  {key: 'img', label: 'Image', type: 'image', fullWidth: true},
                  {key: 'desc', label: 'Short Description', type: 'textarea', fullWidth: true}
                ]}
                onUpdate={items => updateSection('researchConfig', {...sections.researchConfig, items: items})}
              />
            </div>
          )}

          {activeSection === 'happeningsConfig' && (
            <div className="space-y-6">
              <TitleEditor 
                label="Happenings Heading" 
                value={{ main: sections.happeningsConfig.title, highlight: sections.happeningsConfig.highlight }} 
                onChange={val => updateSection('happeningsConfig', {...sections.happeningsConfig, title: val.main, highlight: val.highlight})} 
              />
              <NestedListEditor 
                label="Event Cards"
                items={sections.happeningsConfig.items}
                newItemTemplate={{ title: '', date: '', tag: '', icon: 'Zap', colorClass: 'from-[#00588b] to-[#003a5c]' }}
                fields={[
                  {key: 'title', label: 'Event Title'},
                  {key: 'date', label: 'Date string'},
                  {key: 'tag', label: 'Category Tag'},
                  {key: 'icon', label: 'Icon', type: 'icon'},
                  {key: 'colorClass', label: 'Tailwind Gradient Classes', fullWidth: true}
                ]}
                onUpdate={items => updateSection('happeningsConfig', {...sections.happeningsConfig, items: items})}
              />
            </div>
          )}

          {activeSection === 'testimonialConfig' && (
            <div className="space-y-6">
              <TitleEditor 
                label="Testimonials Heading" 
                value={{ main: sections.testimonialConfig.title, highlight: sections.testimonialConfig.highlight }} 
                onChange={val => updateSection('testimonialConfig', {...sections.testimonialConfig, title: val.main, highlight: val.highlight})} 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--bg-muted)] p-3">
                 <div>
                   <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Section Tagline</label>
                   <input type="text" value={sections.testimonialConfig.tagline} onChange={e => updateSection('testimonialConfig', {...sections.testimonialConfig, tagline: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Map/Location Label</label>
                   <input type="text" value={sections.testimonialConfig.location} onChange={e => updateSection('testimonialConfig', {...sections.testimonialConfig, location: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Package Label</label>
                   <input type="text" value={sections.testimonialConfig.packageLabel} onChange={e => updateSection('testimonialConfig', {...sections.testimonialConfig, packageLabel: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Verify Label</label>
                   <input type="text" value={sections.testimonialConfig.verifyLabel} onChange={e => updateSection('testimonialConfig', {...sections.testimonialConfig, verifyLabel: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
                 </div>
              </div>
              <NestedListEditor 
                label="Student Feed"
                items={sections.testimonialConfig.testimonials}
                newItemTemplate={{ name: '', course: '', company: '', package: '', rating: 5, batch: '', quote: '', img: '', tag: '', tagColor: '#003a5c' }}
                fields={[
                  {key: 'name', label: 'Name'},
                  {key: 'course', label: 'Course/Degree'},
                  {key: 'company', label: 'Placed Company'},
                  {key: 'package', label: 'Salary/Offer'},
                  {key: 'batch', label: 'Batch'},
                  {key: 'rating', label: 'Rating (1-5)', type: 'number'},
                  {key: 'tag', label: 'Slide Tag Label'},
                  {key: 'tagColor', label: 'Tag Color', type: 'color'},
                  {key: 'img', label: 'Student Photo', type: 'image', fullWidth: true},
                  {key: 'quote', label: 'Testimonial Quote', type: 'textarea', fullWidth: true}
                ]}
                onUpdate={items => updateSection('testimonialConfig', {...sections.testimonialConfig, testimonials: items})}
              />
            </div>
          )}

          {activeSection === 'faqConfig' && (
            <div className="space-y-6">
              <TitleEditor 
                label="FAQ Heading" 
                value={{ main: sections.faqConfig.title, highlight: sections.faqConfig.highlight }} 
                onChange={val => updateSection('faqConfig', {...sections.faqConfig, title: val.main, highlight: val.highlight})} 
              />
              <NestedListEditor 
                label="FAQs"
                items={sections.faqConfig.faqs}
                newItemTemplate={{ q: '', a: '' }}
                fields={[
                  {key: 'q', label: 'Question', fullWidth: true},
                  {key: 'a', label: 'Answer', type: 'textarea', fullWidth: true}
                ]}
                onUpdate={items => updateSection('faqConfig', {...sections.faqConfig, faqs: items})}
              />
            </div>
          )}

          {activeSection === 'socialWallConfig' && (
            <div className="space-y-6">
              <TitleEditor 
                label="Social Wall Heading" 
                value={{ main: sections.socialWallConfig.title, highlight: sections.socialWallConfig.highlight }} 
                onChange={val => updateSection('socialWallConfig', {...sections.socialWallConfig, title: val.main, highlight: val.highlight})} 
              />
              <NestedListEditor 
                label="Social Wall Images"
                items={sections.socialWallConfig.images.map(img => ({ url: img }))}
                newItemTemplate={{ url: '' }}
                fields={[{key: 'url', label: 'Image URL', type: 'image', fullWidth: true}]}
                onUpdate={items => updateSection('socialWallConfig', {...sections.socialWallConfig, images: items.map(i => i.url)})}
              />
            </div>
          )}

          {activeSection === 'ctaConfig' && (
            <div className="space-y-4">
              <TitleEditor 
                label="CTA Banner" 
                value={{ main: sections.ctaConfig.title }} 
                onChange={val => updateSection('ctaConfig', {...sections.ctaConfig, title: val.main})} 
              />
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Description</label>
                <textarea value={sections.ctaConfig.description} onChange={e => updateSection('ctaConfig', {...sections.ctaConfig, description: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs h-20 outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none resize-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Apply Label</label>
                    <input type="text" value={sections.ctaConfig.applyLabel} onChange={e => updateSection('ctaConfig', {...sections.ctaConfig, applyLabel: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Phone Number</label>
                    <input type="text" value={sections.ctaConfig.phone} onChange={e => updateSection('ctaConfig', {...sections.ctaConfig, phone: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Brochure Label</label>
                    <input type="text" value={sections.ctaConfig.brochureLabel} onChange={e => updateSection('ctaConfig', {...sections.ctaConfig, brochureLabel: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                  </div>
              </div>
            </div>
          )}

          {activeSection === 'virtuallyNewsConfig' && (
            <div className="space-y-8">
              <div className="bg-[var(--bg-muted)] p-5 border-l-2 border-[var(--color-primary)]">
                <h3 className="text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-widest mb-4">Virtual Tour Video Config</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Label</label>
                     <input type="text" value={sections.virtuallyNewsConfig.video.label} onChange={e => updateSection('virtuallyNewsConfig', {...sections.virtuallyNewsConfig, video: {...sections.virtuallyNewsConfig.video, label: e.target.value}})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
                   </div>
                   <div>
                     <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Title</label>
                     <input type="text" value={sections.virtuallyNewsConfig.video.title} onChange={e => updateSection('virtuallyNewsConfig', {...sections.virtuallyNewsConfig, video: {...sections.virtuallyNewsConfig.video, title: e.target.value}})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
                   </div>
                   <div className="md:col-span-2">
                     <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Embed URL (Google Maps or YouTube)</label>
                     <input type="text" value={sections.virtuallyNewsConfig.video.embedUrl} onChange={e => updateSection('virtuallyNewsConfig', {...sections.virtuallyNewsConfig, video: {...sections.virtuallyNewsConfig.video, embedUrl: e.target.value}})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none" />
                   </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-widest px-2">Latest News Items</h3>
                <NestedListEditor 
                  label="News Feed"
                  items={sections.virtuallyNewsConfig.news.items}
                  newItemTemplate={{ id: Date.now(), title: '', description: '', image: '', link: '#' }}
                  fields={[
                    {key: 'title', label: 'News Title'},
                    {key: 'link', label: 'Read More Link'},
                    {key: 'image', label: 'Feature Image', type: 'image', fullWidth: true},
                    {key: 'description', label: 'Short Snippet', type: 'textarea', fullWidth: true}
                  ]}
                  onUpdate={items => updateSection('virtuallyNewsConfig', {...sections.virtuallyNewsConfig, news: {...sections.virtuallyNewsConfig.news, items: items}})}
                />
              </div>
            </div>
          )}

          {/* Fallback for safety */}
          {!SECTION_MAP[activeSection] && (
            <div className="p-10 text-center border border-dashed border-[var(--border-light)] bg-[var(--bg-muted)]">
              <AlertCircle size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
              <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em]">Select a section to edit</p>
            </div>
          )}

        </div>
      </Modal>
    </div>
  );
}
