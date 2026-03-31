'use client';
import Modal from '@/components/admin/ui/Modal';
import MediaUploader from '@/components/admin/MediaUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import IconPicker from '@/components/admin/ui/IconPicker';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Save, CheckCircle2, AlertCircle, Plus, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Settings } from 'lucide-react';
import { createSchool, updateSchool } from '@/lib/actions/schoolActions';

// --- Shared Internal Components ---

const TitleEditor = ({ label, value = {}, onChange }) => (
  <div className="space-y-3 p-4 bg-[var(--bg-muted)] border-l-2 border-[var(--color-primary)] mb-4">
    <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div>
        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Main Title</label>
        <input type="text" value={value.main || ''} onChange={e => onChange({...value, main: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" placeholder="e.g. Course Overview" />
      </div>
      <div>
        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Highlight Word</label>
        <input type="text" value={value.highlight || ''} onChange={e => onChange({...value, highlight: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" placeholder="e.g. Overview" />
      </div>
      <div>
        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Sky Highlight</label>
        <input type="text" value={value.skyHighlight || ''} onChange={e => onChange({...value, skyHighlight: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" placeholder="Optional" />
      </div>
    </div>
  </div>
);

const StringListEditor = ({ value = [], onChange, label }) => (
  <div className="space-y-2 mt-3">
    <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">{label}</label>
    <div className="space-y-2 border-l border-[var(--border-light)] pl-3">
      {value.map((item, idx) => (
        <div key={idx} className="flex flex-col sm:flex-row gap-2">
          <input type="text" value={item} onChange={e => {
            const newList = [...value]; newList[idx] = e.target.value; onChange(newList);
          }} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" placeholder="List item text..." />
          <button onClick={() => onChange(value.filter((_, i) => i !== idx))} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1.5 transition-colors border border-[var(--border-default)] hover:border-[var(--color-danger-light)] hover:bg-[var(--color-danger-light)] rounded-none flex justify-center items-center">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...value, ''])} className="inline-flex items-center gap-1 text-[10px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] uppercase tracking-wide mt-1">
        <Plus size={14} strokeWidth={2} /> ADD ITEM
      </button>
    </div>
  </div>
);

const NestedListEditor = ({ label, items = [], fields, onUpdate, newItemTemplate }) => {
  const imageField = fields.find(f => f.type === 'image');
  return (
  <div className="space-y-4">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-[var(--border-light)] pb-2">
      <h4 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</h4>
      <div className="flex items-center gap-2">
        {imageField && (
           <MediaUploader 
             multiple={true}
             category="schools"
             buttonText="Bulk Add"
             onUploadSuccess={urls => {
                if(Array.isArray(urls)) {
                   const newItems = urls.map(url => ({ ...newItemTemplate, [imageField.key]: url }));
                   onUpdate([...items, ...newItems]);
                }
             }}
           />
        )}
        <button onClick={() => onUpdate([...items, newItemTemplate])} className="flex items-center justify-center gap-1 text-[10px] h-[34px] font-bold text-[var(--text-inverse)] bg-[var(--text-primary)] hover:bg-[var(--text-secondary)] transition-colors px-3 uppercase tracking-wide rounded-none">
          <Plus size={14} /> Row
        </button>
      </div>
    </div>
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 relative group hover:border-[var(--border-dark)] transition-colors rounded-none">
          <button onClick={() => onUpdate(items.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1 transition-colors bg-[var(--bg-surface)] border border-transparent hover:border-[var(--color-danger-light)] rounded-none">
            <Trash2 size={16} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {fields.map(field => (
              <div key={field.key} className={field.type === 'richText' || field.type === 'stringList' ? 'md:col-span-2' : ''}>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">{field.label}</label>
                {field.type === 'icon' ? (
                  <IconPicker 
                    value={item[field.key]} 
                    onChange={val => {
                      const newItems = [...items]; newItems[idx][field.key] = val; onUpdate(newItems);
                    }} 
                  />
                ) : field.type === 'image' ? (
                  <div className="space-y-2">
                    <div className="border border-[var(--border-default)] bg-[var(--bg-muted)] overflow-hidden h-24 flex items-center justify-center">
                      {item[field.key] ? (
                        <img src={item[field.key]} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <ImageIcon size={24} className="text-[var(--text-muted)]" />
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input type="text" value={item[field.key] || ''} onChange={e => {
                        const newItems = [...items]; newItems[idx][field.key] = e.target.value; onUpdate(newItems);
                      }} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" placeholder="Image URL..." />
                      <div className="w-full sm:w-auto shrink-0">
                        <MediaUploader category="schools" onUploadSuccess={url => {
                          const newItems = [...items]; newItems[idx][field.key] = url; onUpdate(newItems);
                        }} />
                      </div>
                    </div>
                  </div>
                ) : field.type === 'richText' ? (
                  <RichTextEditor 
                    value={item[field.key] || ''} 
                    onChange={val => {
                      const newItems = [...items]; newItems[idx][field.key] = val; onUpdate(newItems);
                    }} 
                    useProse={item.useProse !== false}
                    onProseChange={val => {
                      const newItems = [...items]; newItems[idx].useProse = val; onUpdate(newItems);
                    }}
                  />
                ) : field.type === 'stringList' ? (
                  <StringListEditor 
                    label={field.label} 
                    value={item[field.key] || []} 
                    onChange={val => {
                      const newItems = [...items]; newItems[idx][field.key] = val; onUpdate(newItems);
                    }} 
                  />
                ) : (
                  <input type={field.type || 'text'} value={item[field.key] || ''} onChange={e => {
                    const newItems = [...items]; newItems[idx][field.key] = e.target.value; onUpdate(newItems);
                  }} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

// --- Main Form Component ---

export default function SchoolBuilderForm({ initialData = null }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState(() => {
    const base = initialData || {
      name: '', slug: '', metaTitle: '', metaDescription: '', breadcrumb: [],
      hero: { bgImage: '', badge: '', title: { main: '', highlight: '', skyHighlight: '' }, subtitle: '', description: '', cta: [], quickStats: [] },
      stats: [],
      exploreDepartment: { sectionTitle: { main: 'Explore Our Department', highlight: 'Department' }, subtitle: 'Discover our specialized wings', items: [] },
      about: { 
        vision: { title: { main: 'Vision' }, label: 'Our Purpose', icon: 'Target', text: '', highlights: [] }, 
        mission: { title: { main: 'Mission' }, label: 'Our Goal', icon: 'Lightbulb', points: [] } 
      },
      programmes: { title: { main: 'Our Programme', highlight: 'Programme' }, subtitle: 'Academic Programmes', description: '', levels: [] },
      placements: { title: { main: 'Placement Highlights', highlight: 'Highlights' }, label: 'Placements', subtitle: '', list: [] },
      alumni: { title: { main: 'Life at CPU', highlight: 'CPU' }, label: 'Our Alumni', list: [] },
      industry: { title: { main: 'Industry Tie Ups', highlight: 'Tie Ups' }, label: 'Partners', partners: [] },
      research: { title: { main: 'Research', highlight: 'Research' }, label: 'R&D', gallery: [], stats: [] },
      community: { title: { main: 'Community', highlight: 'Community' }, label: 'Campus Life', description: [], gallery: [] },
      infrastructure: { title: { main: 'Infrastructure', highlight: 'Infrastructure' }, label: 'Facilities', list: [] },
      testimonials: { title: { main: 'Testimonials', highlight: 'Testimonials' }, label: 'Reviews', list: [] }
    };

    // Merge relational data if available
    if (initialData?.testimonialsRel?.length > 0) {
      base.testimonials = { 
        ...base.testimonials, 
        list: initialData.testimonialsRel.map(t => ({
          name: t.studentName, text: t.reviewText, company: t.company, batch: t.batch, 
          photo: t.image, rating: t.rating, course: t.course, package: t.package, 
          slug: t.slug || ''
        }))
      };
    }
    if (initialData?.placementPartnersRel?.length > 0) {
      base.placements = {
        ...base.placements,
        list: initialData.placementPartnersRel.map(p => ({
          name: p.studentName, company: p.companyName, pkg: p.packageOffered, 
          city: p.city, img: p.logoUrl, slug: p.slug || ''
        }))
      };
    }
    if (initialData?.facilitiesRel?.length > 0) {
      base.infrastructure = {
        ...base.infrastructure,
        list: initialData.facilitiesRel.map(f => ({
          title: f.name, image: f.image, desc: f.description, slug: f.slug || ''
        }))
      };
    }

    return base;
  });

  const updateSection = useCallback((section, data) => {
    setFormData(prev => ({ ...prev, [section]: data }));
  }, []);

  const handleSave = async () => {
    if (!formData.name) return alert("School name is required.");
    setIsSaving(true);
    try {
      const result = initialData?.id ? await updateSchool(initialData.id, formData) : await createSchool(formData);
      if (result.success) {
        router.push('/admin/schools');
        router.refresh();
      } else {
        alert(`Error: ${result.error}`);
        setIsSaving(false);
      }
    } catch (error) {
      alert("An unexpected error occurred.");
      setIsSaving(false);
    }
  };

  const SectionCard = ({ id, title, description, isComplete, isHidden, onToggleHide }) => (
    <div className={`border border-[var(--border-default)] p-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:border-[var(--color-primary)] transition-all rounded-none group shadow-[var(--shadow-sm)] ${isHidden ? 'opacity-60 bg-gray-50' : 'bg-[var(--bg-surface)]'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 flex items-center justify-center rounded-none shrink-0 ${isComplete ? 'bg-[var(--color-success-light)] text-[var(--color-success-dark)]' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'}`}>
          {isComplete ? <CheckCircle2 size={16} strokeWidth={2.5} /> : <AlertCircle size={16} strokeWidth={2} />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[var(--text-primary)] text-[12px] uppercase tracking-wide leading-tight">{title}</h3>
            {isHidden && <span className="text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 font-black uppercase tracking-tighter">Hidden</span>}
          </div>
          <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={!!isHidden} 
            onChange={(e) => onToggleHide(e.target.checked)}
            className="w-3.5 h-3.5 accent-[var(--color-primary)]"
          />
          <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Hide</span>
        </label>
        <button 
          onClick={() => { setActiveSection(id); setIsModalOpen(true); }}
          className="px-3 py-1.5 border border-[var(--border-dark)] text-[var(--text-secondary)] font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] hover:text-[var(--bg-surface)] transition-all rounded-none flex items-center justify-center gap-1.5"
        >
          <Pencil size={12} strokeWidth={2} /> EDIT
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-[98%] lg:w-[95%] xl:w-[92%] mx-auto pb-28 space-y-6 px-4 mt-6">
      
      {/* ── Basic Configuration ── */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-5 shadow-[var(--shadow-sm)] space-y-5 rounded-none">
        <div className="flex items-center gap-2 border-b border-[var(--border-light)] pb-3">
          <Settings size={18} className="text-[var(--color-primary)]" />
          <h2 className="text-[14px] font-black text-[var(--text-primary)] uppercase tracking-wide">Base Config</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">School Name *</label>
            <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]" placeholder="e.g. School of Engineering" />
          </div>
          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Slug</label>
            <input type="text" value={formData.slug || ''} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-muted)] font-mono" placeholder="engineering" />
          </div>
          <div className="md:col-span-2 pt-3 border-t border-[var(--border-light)]">
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Meta Title</label>
            <input type="text" value={formData.metaTitle || ''} onChange={(e) => setFormData({...formData, metaTitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)] mb-3" placeholder="SEO Title..." />
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Meta Description</label>
            <textarea value={formData.metaDescription || ''} onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs h-20 focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)] resize-none" placeholder="SEO Description..." />
          </div>
          <div className="md:col-span-2 pt-3 border-t border-[var(--border-light)]">
            <NestedListEditor 
              label="Breadcrumb Paths"
              items={formData.breadcrumb || []}
              newItemTemplate={{ label: '', link: '' }}
              fields={[{key: 'label', label: 'Label'}, {key: 'link', label: 'Link (e.g. /schools)'}]}
              onUpdate={items => setFormData({...formData, breadcrumb: items})}
            />
          </div>
        </div>
      </div>

      {/* ── Structured Sections List ── */}
      <div className="space-y-4">
        <h2 className="text-[14px] font-black text-[var(--text-primary)] uppercase tracking-wide border-b border-[var(--border-light)] pb-2">Page Layout Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <SectionCard id="hero" title="Hero Header" description="Top banner & title." isComplete={!!formData.hero?.title?.main} isHidden={formData.hero?.hide} onToggleHide={(val) => updateSection('hero', {...formData.hero, hide: val})} />
          <SectionCard id="stats" title="Quick Stats" description="University numbers." isComplete={formData.stats?.length > 0} isHidden={formData.stats?.[0]?.hide} onToggleHide={(val) => { const n = [...(formData.stats || [])]; if (n[0]) n[0].hide = val; updateSection('stats', n); }} />
          <SectionCard id="about" title="Vision & Mission" description="School's core values." isComplete={!!formData.about?.vision?.text} isHidden={formData.about?.hide} onToggleHide={(val) => updateSection('about', {...formData.about, hide: val})} />
          <SectionCard id="programmes" title="Programmes" description="Course levels & links." isComplete={formData.programmes?.levels?.length > 0} isHidden={formData.programmes?.hide} onToggleHide={(val) => updateSection('programmes', {...formData.programmes, hide: val})} />
          <SectionCard id="placements" title="Placements" description="Student placement list." isComplete={formData.placements?.list?.length > 0} isHidden={formData.placements?.hide} onToggleHide={(val) => updateSection('placements', {...formData.placements, hide: val})} />
          <SectionCard id="alumni" title="Alumni" description="Alumni success stories." isComplete={formData.alumni?.list?.length > 0} isHidden={formData.alumni?.hide} onToggleHide={(val) => updateSection('alumni', {...formData.alumni, hide: val})} />
          <SectionCard id="industry" title="Industry Partners" description="Logos of tie-ups." isComplete={formData.industry?.partners?.length > 0} isHidden={formData.industry?.hide} onToggleHide={(val) => updateSection('industry', {...formData.industry, hide: val})} />
          <SectionCard id="research" title="Research & Dev" description="Patents and stats." isComplete={formData.research?.stats?.length > 0} isHidden={formData.research?.hide} onToggleHide={(val) => updateSection('research', {...formData.research, hide: val})} />
          <SectionCard id="community" title="Community" description="Campus vibe & gallery." isComplete={formData.community?.description?.length > 0} isHidden={formData.community?.hide} onToggleHide={(val) => updateSection('community', {...formData.community, hide: val})} />
          <SectionCard id="infrastructure" title="Infrastructure" description="Labs & facilities." isComplete={formData.infrastructure?.list?.length > 0} isHidden={formData.infrastructure?.hide} onToggleHide={(val) => updateSection('infrastructure', {...formData.infrastructure, hide: val})} />
          <SectionCard id="testimonials" title="Testimonials" description="Student feedback." isComplete={formData.testimonials?.list?.length > 0} isHidden={formData.testimonials?.hide} onToggleHide={(val) => updateSection('testimonials', {...formData.testimonials, hide: val})} />
          <SectionCard id="exploreDepartment" title="Department" description="Specialized wings." isComplete={formData.exploreDepartment?.items?.length > 0} isHidden={formData.exploreDepartment?.hide} onToggleHide={(val) => updateSection('exploreDepartment', {...formData.exploreDepartment, hide: val})} />
        </div>
      </div>

      {/* ── Minimal Floating Save Bar ── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-dark)] p-2 shadow-2xl flex items-center gap-3 rounded-none">
          <div className="hidden sm:flex flex-col text-right px-3 border-r border-[var(--border-light)]">
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Status</span>
            <span className="text-[11px] font-black text-[var(--color-primary)] uppercase">{isSaving ? 'Processing...' : 'Draft Unsaved'}</span>
          </div>
          <button 
            onClick={handleSave} 
            disabled={isSaving} 
            className="bg-[var(--color-primary)] text-[var(--text-inverse)] px-6 py-2.5 font-bold text-[11px] uppercase tracking-widest hover:bg-[var(--color-primary-dark)] transition-all disabled:opacity-50 flex items-center justify-center gap-2 rounded-none"
          >
            {isSaving ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Save size={16} strokeWidth={2.5} />}
            {isSaving ? 'SAVING' : 'SAVE CHANGES'}
          </button>
        </div>
      </div>

      {/* ── Edit Modal ── */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Edit ${activeSection?.toUpperCase()}`}
        footer={
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <p className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-widest w-full sm:w-auto text-center sm:text-left">Changes apply to draft on Done</p>
            <button onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto bg-[var(--text-primary)] text-[var(--bg-surface)] px-10 py-2.5 font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--text-secondary)] transition-colors rounded-none">
              DONE EDITING
            </button>
          </div>
        }
      >
        <div className="p-2 pb-8">
          
          {activeSection === 'hero' && (
            <div className="space-y-6">
              <TitleEditor label="Hero Title" value={formData.hero.title} onChange={val => updateSection('hero', {...formData.hero, title: val})} />
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Hero Subtitle</label>
                <input type="text" value={formData.hero.subtitle || ''} onChange={e => updateSection('hero', {...formData.hero, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Shaping the Future of Tech" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Badge Text</label>
                  <input type="text" value={formData.hero.badge || ''} onChange={e => updateSection('hero', {...formData.hero, badge: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
                <div className="md:col-span-2">
                   <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">Background Image URL</label>
                   <div className="mb-2 border border-[var(--border-default)] bg-[var(--bg-muted)] overflow-hidden h-32 flex items-center justify-center relative">
                     {formData.hero.bgImage ? <img src={formData.hero.bgImage} className="w-full h-full object-cover" alt="Hero BG" /> : <ImageIcon size={28} className="text-[var(--text-muted)] opacity-50" />}
                   </div>
                   <div className="flex flex-col sm:flex-row gap-2">
                     <input type="text" value={formData.hero.bgImage || ''} onChange={e => updateSection('hero', {...formData.hero, bgImage: e.target.value})} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" placeholder="Click media uploader or paste URL..." />
                     <div className="w-full sm:w-auto shrink-0"><MediaUploader category="schools" onUploadSuccess={url => updateSection('hero', {...formData.hero, bgImage: url})} /></div>
                   </div>
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Description</label>
                <textarea value={formData.hero.description || ''} onChange={e => updateSection('hero', {...formData.hero, description: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs h-20 outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none resize-none" />
              </div>
              <div className="pt-5 border-t border-[var(--border-light)]">
                <NestedListEditor 
                  label="Call to Action Buttons"
                  items={formData.hero.cta}
                  newItemTemplate={{ label: '', link: '#', primary: false }}
                  fields={[{key: 'label', label: 'Button Label'}, {key: 'link', label: 'Link URL'}, {key: 'primary', label: 'Is Primary? (true/false)'}]}
                  onUpdate={items => updateSection('hero', {...formData.hero, cta: items})}
                />
              </div>
              <div className="pt-5 border-t border-[var(--border-light)]">
                <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Hero Quick Stats</p>
                <div className="space-y-3">
                  {formData.hero.quickStats?.map((s, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-3 items-end bg-[var(--bg-surface)] p-3 border border-[var(--border-default)] rounded-none group hover:border-[var(--border-dark)] transition-colors relative">
                      <div className="flex-1 w-full">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold uppercase block mb-1">Value</label>
                        <input type="text" value={s.value || ''} onChange={e => { const n = [...formData.hero.quickStats]; n[idx].value = e.target.value; updateSection('hero', {...formData.hero, quickStats: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                      </div>
                      <div className="flex-1 w-full">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold uppercase block mb-1">Label</label>
                        <input type="text" value={s.label || ''} onChange={e => { const n = [...formData.hero.quickStats]; n[idx].label = e.target.value; updateSection('hero', {...formData.hero, quickStats: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                      </div>
                      <div className="w-full sm:w-40">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold uppercase block mb-1">Icon</label>
                        <IconPicker value={s.icon} onChange={val => { const n = [...formData.hero.quickStats]; n[idx].icon = val; updateSection('hero', {...formData.hero, quickStats: n})}} />
                      </div>
                      <button onClick={() => updateSection('hero', {...formData.hero, quickStats: formData.hero.quickStats.filter((_, i) => i !== idx)})} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1.5 transition-colors absolute top-2 right-2 sm:static"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button onClick={() => updateSection('hero', {...formData.hero, quickStats: [...(formData.hero.quickStats || []), { icon: 'Star', value: '', label: '' }]})} className="text-[10px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] uppercase tracking-widest transition-colors flex items-center gap-1.5 mt-2"><Plus size={14} strokeWidth={2.5}/> ADD STAT</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'stats' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {formData.stats?.map((s, idx) => (
                  <div key={idx} className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-4 relative group hover:border-[var(--border-dark)] transition-colors rounded-none">
                    <button onClick={() => updateSection('stats', formData.stats.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1 transition-colors"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      <div>
                        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Value (e.g. 50+)</label>
                        <input type="text" value={s.value || ''} onChange={e => { const ns = [...formData.stats]; ns[idx].value = e.target.value; updateSection('stats', ns); }} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Label (e.g. Labs)</label>
                        <input type="text" value={s.label || ''} onChange={e => { const ns = [...formData.stats]; ns[idx].label = e.target.value; updateSection('stats', ns); }} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                      </div>
                      <div className="z-[60]">
                        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Icon</label>
                        <IconPicker value={s.icon} onChange={val => { const ns = [...formData.stats]; ns[idx].icon = val; updateSection('stats', ns); }} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateSection('stats', [...formData.stats, { value: '', label: '', icon: 'BarChart' }])} className="w-full border border-dashed border-[var(--border-dark)] p-3 text-[10px] font-bold text-[var(--text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] transition-all uppercase tracking-widest rounded-none flex justify-center items-center gap-2">
                  <Plus size={14} strokeWidth={2.5} /> ADD NEW STAT CARD
                </button>
              </div>
            </div>
          )}

          {activeSection === 'about' && (
            <div className="space-y-6">
              <div className="bg-[var(--bg-surface)] p-5 border border-[var(--border-default)] rounded-none">
                <h3 className="font-bold text-[13px] text-[var(--color-primary)] uppercase tracking-widest border-b border-[var(--border-light)] pb-2 mb-4">Vision Section</h3>
                <TitleEditor label="Vision Title" value={formData.about.vision.title} onChange={val => updateSection('about', {...formData.about, vision: {...formData.about.vision, title: val}})} />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex-1">
                    <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Label</label>
                    <input type="text" placeholder="Label" value={formData.about.vision.label || ''} onChange={e => updateSection('about', {...formData.about, vision: {...formData.about.vision, label: e.target.value}})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Icon</label>
                    <IconPicker value={formData.about.vision.icon} onChange={val => updateSection('about', {...formData.about, vision: {...formData.about.vision, icon: val}})} />
                  </div>
                </div>
                <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-4 rounded-none mb-4">
                  <label className="block text-[10px] font-black text-[var(--text-primary)] uppercase mb-3 tracking-widest">Vision Statement (Rich Text)</label>
                  <RichTextEditor 
                    value={formData.about.vision.text || ''} 
                    onChange={content => updateSection('about', {...formData.about, vision: {...formData.about.vision, text: content}})} 
                    useProse={formData.about.vision.useProse !== false}
                    onProseChange={val => updateSection('about', {...formData.about, vision: {...formData.about.vision, useProse: val}})}
                  />
                </div>
                <NestedListEditor 
                  label="Vision Highlights"
                  items={formData.about.vision.highlights}
                  newItemTemplate={{ value: '', label: '' }}
                  fields={[{key: 'value', label: 'Value'}, {key: 'label', label: 'Label'}]}
                  onUpdate={items => updateSection('about', {...formData.about, vision: {...formData.about.vision, highlights: items}})}
                />
              </div>
              <div className="bg-[var(--bg-surface)] p-5 border border-[var(--border-default)] rounded-none">
                <h3 className="font-bold text-[13px] text-[var(--color-warning-dark)] uppercase tracking-widest border-b border-[var(--border-light)] pb-2 mb-4">Mission Section</h3>
                <TitleEditor label="Mission Title" value={formData.about.mission.title} onChange={val => updateSection('about', {...formData.about, mission: {...formData.about.mission, title: val}})} />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex-1">
                    <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Label</label>
                    <input type="text" placeholder="Label" value={formData.about.mission.label || ''} onChange={e => updateSection('about', {...formData.about, mission: {...formData.about.mission, label: e.target.value}})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Icon</label>
                    <IconPicker value={formData.about.mission.icon} onChange={val => updateSection('about', {...formData.about, mission: {...formData.about.mission, icon: val}})} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[var(--text-primary)] uppercase mb-3 tracking-widest">
                    Our Mission Statement (Full Rich Text Editor)
                  </label>
                  <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none">
                    <RichTextEditor 
                      value={formData.about.mission.points?.join('') || ''}
                      onChange={content => updateSection('about', {
                        ...formData.about, 
                        mission: { ...formData.about.mission, points: [content] }
                      })}
                      useProse={formData.about.mission.useProse !== false}
                      onProseChange={val => updateSection('about', {
                        ...formData.about, 
                        mission: { ...formData.about.mission, useProse: val }
                      })}
                    />
                  </div>
                  <p className="mt-2 text-[9px] text-[var(--text-muted)] italic">Note: Use the editor to add bullet points, bold text, etc.</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'programmes' && (
            <div className="space-y-6">
              <TitleEditor label="Section Title" value={formData.programmes.title} onChange={val => updateSection('programmes', {...formData.programmes, title: val})} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Section Subtitle</label>
                  <input type="text" placeholder="Subtitle" value={formData.programmes.subtitle || ''} onChange={e => updateSection('programmes', {...formData.programmes, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[9px] block mb-2 font-bold uppercase text-[var(--text-muted)]">Background Image</label>
                  <div className="mb-2 border border-[var(--border-default)] bg-[var(--bg-muted)] overflow-hidden h-32 flex items-center justify-center">
                    {formData.programmes.bgImage ? <img src={formData.programmes.bgImage} className="w-full h-full object-cover" alt="Programmes BG" /> : <ImageIcon size={28} className="text-[var(--text-muted)] opacity-50" />}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text" placeholder="BG Image URL" value={formData.programmes.bgImage || ''} onChange={e => updateSection('programmes', {...formData.programmes, bgImage: e.target.value})} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                    <div className="w-full sm:w-auto shrink-0"><MediaUploader category="schools" onUploadSuccess={url => updateSection('programmes', {...formData.programmes, bgImage: url})} /></div>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                <label className="block text-[11px] font-black text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Programme Overview (Rich Text)</label>
                <RichTextEditor 
                  value={formData.programmes.description || ''} 
                  onChange={content => updateSection('programmes', {...formData.programmes, description: content})} 
                  useProse={formData.programmes.useProse !== false}
                  onProseChange={val => updateSection('programmes', {...formData.programmes, useProse: val})}
                />
              </div>
              
              <div className="mt-8 border-t border-[var(--border-light)] pt-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
                  <h4 className="font-black text-[var(--text-primary)] uppercase text-[12px] tracking-widest">Edit Qualification Levels</h4>
                  <button onClick={() => updateSection('programmes', {...formData.programmes, levels: [...formData.programmes.levels, { label: '', icon: 'GraduationCap', courses: [] }]})} className="bg-[var(--color-primary)] text-[var(--text-inverse)] px-4 py-2 text-[10px] font-bold uppercase tracking-wide hover:bg-[var(--color-primary-dark)] transition-colors rounded-none w-full sm:w-auto text-center">ADD LEVEL</button>
                </div>
                <div className="space-y-4">
                  {formData.programmes.levels.map((level, lIdx) => (
                    <div key={lIdx} className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-4 rounded-none group relative">
                      <button onClick={() => updateSection('programmes', {...formData.programmes, levels: formData.programmes.levels.filter((_, i) => i !== lIdx)})} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors p-1"><Trash2 size={18}/></button>
                      <div className="flex flex-col sm:flex-row gap-3 mb-5 mt-4 sm:mt-0">
                        <input type="text" placeholder="Level Label (e.g. Undergrad)" value={level.label || ''} onChange={e => {
                          const nl = [...formData.programmes.levels]; nl[lIdx].label = e.target.value; updateSection('programmes', {...formData.programmes, levels: nl});
                        }} className="border border-[var(--border-default)] p-2.5 text-sm flex-1 font-bold outline-none focus:border-[var(--color-primary)] rounded-none" />
                        <div className="w-full sm:w-48">
                          <IconPicker value={level.icon} onChange={val => {
                             const nl = [...formData.programmes.levels]; nl[lIdx].icon = val; updateSection('programmes', {...formData.programmes, levels: nl});
                          }} />
                        </div>
                      </div>
                      <NestedListEditor 
                        label={`Courses in ${level.label || 'this level'}`}
                        items={level.courses}
                        newItemTemplate={{ name: '', slug: '', redirectUrl: '', description: '', specializations: [] }}
                        fields={[
                          {key: 'name', label: 'Course Name'}, 
                          {key: 'slug', label: 'Course Slug'}, 
                          {key: 'redirectUrl', label: 'Custom Redirect URL (Optional)'}, 
                          {key: 'description', label: 'Short Description'},
                        ]}
                        onUpdate={cItems => {
                          const nl = [...formData.programmes.levels]; nl[lIdx].courses = cItems; updateSection('programmes', {...formData.programmes, levels: nl});
                        }}
                      />
                      {/* Specializations Editor */}
                      <div className="mt-5 pt-4 border-t border-[var(--border-light)]">
                        <p className="text-[10px] font-black uppercase text-[var(--text-muted)] mb-3 tracking-widest">Course Specializations (Comma Separated)</p>
                        <div className="space-y-3">
                          {level.courses.map((c, ci) => (
                            <div key={ci} className="bg-[var(--bg-muted)] p-3 border border-[var(--border-light)] rounded-none">
                              <label className="text-[10px] block mb-1.5 font-bold uppercase text-[var(--text-primary)]">{c.name}</label>
                              <input 
                                type="text" 
                                placeholder="Core, AI & ML, Data Science..."
                                value={c.specializations?.map(s => s.name).join(', ') || ''} 
                                onChange={e => {
                                  const specs = e.target.value.split(',').map(s => ({ name: s.trim() })).filter(s => s.name);
                                  const nl = [...formData.programmes.levels];
                                  nl[lIdx].courses[ci].specializations = specs;
                                  updateSection('programmes', {...formData.programmes, levels: nl});
                                }}
                                className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'placements' && (
            <div className="space-y-6">
              <TitleEditor label="Placement Section Title" value={formData.placements.title} onChange={val => updateSection('placements', {...formData.placements, title: val})} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Badge Label</label>
                  <input type="text" placeholder="e.g. Placements" value={formData.placements.label || ''} onChange={e => updateSection('placements', {...formData.placements, label: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                </div>
                <div>
                  <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Section Subtitle</label>
                  <input type="text" placeholder="e.g. CPU Placement Records" value={formData.placements.subtitle || ''} onChange={e => updateSection('placements', {...formData.placements, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                </div>
              </div>
              <NestedListEditor 
                label="Student Placements"
                items={formData.placements.list}
                newItemTemplate={{ name: '', company: '', pkg: '', city: '', img: '', slug: '' }}
                fields={[
                  {key: 'name', label: 'Student Name'},
                  {key: 'company', label: 'Company'},
                  {key: 'pkg', label: 'Package'},
                  {key: 'img', label: 'Photo URL', type: 'image'},
                  {key: 'slug', label: 'Slug'}
                ]}
                onUpdate={items => updateSection('placements', {...formData.placements, list: items})}
              />
            </div>
          )}

          {activeSection === 'alumni' && (
            <div className="space-y-6">
               <TitleEditor label="Alumni Section Title" value={formData.alumni.title} onChange={val => updateSection('alumni', {...formData.alumni, title: val})} />
               <div>
                  <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Badge Label</label>
                  <input type="text" placeholder="e.g. Our Alumni" value={formData.alumni.label || ''} onChange={e => updateSection('alumni', {...formData.alumni, label: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] mb-4 rounded-none" />
               </div>
               <NestedListEditor 
                label="Alumni Success"
                items={formData.alumni.list}
                newItemTemplate={{ name: '', company: '', role: '', image: '', desc: '', slug: '' }}
                fields={[
                  {key: 'name', label: 'Full Name'},
                  {key: 'company', label: 'Current Company'},
                  {key: 'image', label: 'Photo URL', type: 'image'},
                  {key: 'slug', label: 'Slug'}
                ]}
                onUpdate={items => updateSection('alumni', {...formData.alumni, list: items})}
              />
            </div>
          )}

          {activeSection === 'industry' && (
            <div className="space-y-6">
               <TitleEditor label="Industry Section Title" value={formData.industry.title} onChange={val => updateSection('industry', {...formData.industry, title: val})} />
               <div>
                  <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Badge Label</label>
                  <input type="text" placeholder="e.g. Collaborations" value={formData.industry.label || ''} onChange={e => updateSection('industry', {...formData.industry, label: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] mb-4 rounded-none" />
               </div>
               <NestedListEditor 
                label="Industry Partners (Logos)"
                items={formData.industry.partners}
                newItemTemplate={{ name: '', url: '', slug: '' }}
                fields={[{key: 'name', label: 'Partner Name'}, {key: 'url', label: 'Logo URL', type: 'image'}, {key: 'slug', label: 'Slug'}]}
                onUpdate={items => updateSection('industry', {...formData.industry, partners: items})}
              />
            </div>
          )}

          {activeSection === 'research' && (
            <div className="space-y-6">
                <TitleEditor label="Research Section Title" value={formData.research.title} onChange={val => updateSection('research', {...formData.research, title: val})} />
                <div>
                  <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Badge Label</label>
                   <input type="text" placeholder="e.g. Eminence Research" value={formData.research.label || ''} onChange={e => updateSection('research', {...formData.research, label: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] mb-4 rounded-none" />
                </div>
                
                <div className="space-y-4 pt-4 border-t border-[var(--border-light)]">
                  <p className="text-[11px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-3">Research Statistics</p>
                  {formData.research.stats?.map((s, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-3 items-end bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] relative group hover:border-[var(--border-dark)] transition-colors rounded-none">
                      <button onClick={() => updateSection('research', {...formData.research, stats: formData.research.stats.filter((_, i) => i !== idx)})} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1 sm:static"><Trash2 size={16} /></button>
                      <div className="w-full sm:flex-1">
                        <label className="text-[9px] block mb-1 uppercase font-bold text-[var(--text-muted)]">Value</label>
                        <input type="text" value={s.value || ''} onChange={e => { const n = [...formData.research.stats]; n[idx].value = e.target.value; updateSection('research', {...formData.research, stats: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                      </div>
                      <div className="w-full sm:flex-1">
                        <label className="text-[9px] block mb-1 uppercase font-bold text-[var(--text-muted)]">Label</label>
                        <input type="text" value={s.label || ''} onChange={e => { const n = [...formData.research.stats]; n[idx].label = e.target.value; updateSection('research', {...formData.research, stats: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                      </div>
                      <div className="w-full sm:w-40">
                        <label className="text-[9px] block mb-1 uppercase font-bold text-[var(--text-muted)]">Icon</label>
                        <IconPicker value={s.icon} onChange={val => { const n = [...formData.research.stats]; n[idx].icon = val; updateSection('research', {...formData.research, stats: n})}} />
                      </div>
                    </div>
                  ))}
                  <button onClick={() => updateSection('research', {...formData.research, stats: [...(formData.research.stats || []), { value: '', label: '', icon: 'Search' }]})} className="text-[10px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] uppercase tracking-widest transition-colors flex items-center gap-1.5"><Plus size={14} strokeWidth={2.5} /> ADD RESEARCH STAT</button>
                </div>

                <div className="mt-6 pt-6 border-t border-[var(--border-light)]">
                  <NestedListEditor 
                    label="Research Gallery / Links"
                    items={formData.research.gallery}
                    newItemTemplate={{ icon: 'FileText', label: '', link: '', slug: '' }}
                    fields={[
                      {key: 'icon', label: 'Icon', type: 'icon'},
                      {key: 'label', label: 'Label'},
                      {key: 'link', label: 'URL', type: 'image'},
                      {key: 'slug', label: 'Slug'}
                    ]}
                    onUpdate={items => updateSection('research', {...formData.research, gallery: items})}
                  />
                </div>
            </div>
          )}

          {activeSection === 'community' && (
            <div className="space-y-6">
              <TitleEditor label="Community Section Title" value={formData.community.title} onChange={val => updateSection('community', {...formData.community, title: val})} />
               <div>
                  <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Badge Label</label>
                   <input type="text" placeholder="e.g. Community" value={formData.community.label || ''} onChange={e => updateSection('community', {...formData.community, label: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] mb-4 rounded-none" />
               </div>
                <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-4 shadow-sm mb-6 rounded-none">
                  <label className="block text-[11px] font-black text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Community Description (Rich Text)</label>
                  <RichTextEditor 
                    value={formData.community.description?.join('\n') || ''} 
                    onChange={content => updateSection('community', {...formData.community, description: [content]})} 
                    useProse={formData.community.useProse !== false}
                    onProseChange={val => updateSection('community', {...formData.community, useProse: val})}
                  />
                </div>
                <NestedListEditor 
                  label="Community Gallery"
                  items={formData.community.gallery}
                  newItemTemplate={{ src: '', caption: '', slug: '' }}
                  fields={[{key: 'src', label: 'Image URL', type: 'image'}, {key: 'caption', label: 'Caption'}, {key: 'slug', label: 'Slug'}]}
                  onUpdate={items => updateSection('community', {...formData.community, gallery: items})}
                />
            </div>
          )}

          {activeSection === 'infrastructure' && (
            <div className="space-y-6">
                <TitleEditor label="Infrastructure Section Title" value={formData.infrastructure.title} onChange={val => updateSection('infrastructure', {...formData.infrastructure, title: val})} />
                <div>
                  <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Badge Label</label>
                   <input type="text" placeholder="e.g. Campus" value={formData.infrastructure.label || ''} onChange={e => updateSection('infrastructure', {...formData.infrastructure, label: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] mb-4 rounded-none" />
                </div>
                <NestedListEditor 
                label="Infrastructure Items"
                items={formData.infrastructure.list}
                newItemTemplate={{ title: '', image: '', desc: '', slug: '' }}
                fields={[
                  {key: 'title', label: 'Facility Name'},
                  {key: 'image', label: 'Photo URL', type: 'image'},
                  {key: 'desc', label: 'Description'},
                  {key: 'slug', label: 'Slug'}
                ]}
                onUpdate={items => updateSection('infrastructure', {...formData.infrastructure, list: items})}
              />
            </div>
          )}

          {activeSection === 'testimonials' && (
            <div className="space-y-6">
                <TitleEditor label="Testimonials Section Title" value={formData.testimonials.title} onChange={val => updateSection('testimonials', {...formData.testimonials, title: val})} />
                <div>
                  <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Badge Label</label>
                   <input type="text" placeholder="e.g. Testimonials" value={formData.testimonials.label || ''} onChange={e => updateSection('testimonials', {...formData.testimonials, label: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] mb-4 rounded-none" />
                </div>
                <NestedListEditor 
                  label="Testimonials"
                  items={formData.testimonials.list}
                  newItemTemplate={{ name: '', text: '', company: '', batch: '', photo: '', rating: 5, slug: '' }}
                  fields={[
                    {key: 'name', label: 'Student Name'}, 
                    {key: 'text', label: 'Feedback Text'}, 
                    {key: 'company', label: 'Placed In'}, 
                    {key: 'batch', label: 'Batch'}, 
                    {key: 'rating', label: 'Rating (1-5)', type: 'number'}, 
                    {key: 'photo', label: 'Photo', type: 'image'},
                    {key: 'slug', label: 'Slug'}
                  ]}
                  onUpdate={items => updateSection('testimonials', {...formData.testimonials, list: items})}
                />
            </div>
          )}
          
          {activeSection === 'exploreDepartment' && (
            <div className="space-y-6">
              <TitleEditor label="Explore Department Title" value={formData.exploreDepartment.sectionTitle} onChange={val => updateSection('exploreDepartment', {...formData.exploreDepartment, sectionTitle: val})} />
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Subtitle</label>
                <input type="text" value={formData.exploreDepartment.subtitle || ''} onChange={e => updateSection('exploreDepartment', {...formData.exploreDepartment, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none" placeholder="e.g. Discover our specialized wings" />
              </div>
              <NestedListEditor 
                label="Department Items"
                items={formData.exploreDepartment.items || []}
                newItemTemplate={{ icon: 'ArrowRight', title: '', description: '', items: [], link: '', slug: '' }}
                fields={[
                  {key: 'icon', label: 'Icon', type: 'icon'},
                  {key: 'title', label: 'Title'},
                  {key: 'description', label: 'Description'},
                  {key: 'items', label: 'List Points', type: 'stringList'},
                  {key: 'link', label: 'Link URL'},
                  {key: 'slug', label: 'Slug'}
                ]}
                onUpdate={items => updateSection('exploreDepartment', {...formData.exploreDepartment, items: items})}
              />
            </div>
          )}

        </div>
      </Modal>
    </div>
  );
}