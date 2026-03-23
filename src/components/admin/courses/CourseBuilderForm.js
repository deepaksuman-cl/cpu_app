'use client';
import MediaUploader from '@/components/admin/MediaUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import IconPicker from '@/components/admin/ui/IconPicker';
import Modal from '@/components/admin/ui/Modal';
import { createCourse, updateCourse } from '@/lib/actions/courseActions';
import { AlertCircle, CheckCircle2, Pencil, Plus, Save, Trash2, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

// --- Shared Internal Components ---

const TitleEditor = ({ label, value = {}, onChange }) => (
  <div className="space-y-3 p-4 bg-[var(--bg-muted)] border-l-2 border-[var(--color-primary)] mb-4">
    <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div>
        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Main Title</label>
        <input type="text" value={value.main || ''} onChange={e => onChange({...value, main: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" placeholder="e.g. Course Overview" />
      </div>
      <div>
        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Highlight Word</label>
        <input type="text" value={value.highlight || ''} onChange={e => onChange({...value, highlight: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" placeholder="e.g. Overview" />
      </div>
      <div>
        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Sky Highlight</label>
        <input type="text" value={value.skyHighlight || ''} onChange={e => onChange({...value, skyHighlight: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" placeholder="Optional" />
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

const NestedListEditor = ({ label, items = [], fields, onUpdate, newItemTemplate }) => (
  <div className="space-y-4">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-[var(--border-light)] pb-2">
      <h4 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</h4>
      <button onClick={() => onUpdate([...items, newItemTemplate])} className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-inverse)] bg-[var(--text-primary)] hover:bg-[var(--text-secondary)] transition-colors px-2 py-1 uppercase tracking-wide rounded-none">
        <Plus size={14} /> ADD
      </button>
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
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text" value={item[field.key] || ''} onChange={e => {
                      const newItems = [...items]; newItems[idx][field.key] = e.target.value; onUpdate(newItems);
                    }} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" placeholder="Image URL..." />
                    <div className="w-full sm:w-auto shrink-0">
                      <MediaUploader category="courses" onUploadSuccess={url => {
                        const newItems = [...items]; newItems[idx][field.key] = url; onUpdate(newItems);
                      }} />
                    </div>
                  </div>
                ) : field.type === 'richText' ? (
                  <RichTextEditor 
                    value={item[field.key] || ''} 
                    onChange={val => {
                      const newItems = [...items]; newItems[idx][field.key] = val; onUpdate(newItems);
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
                  }} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Main Form Component ---

export default function CourseBuilderForm({ schools, initialData = null }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState(initialData || {
    name: '', slug: '', metaTitle: '', metaDescription: '', schoolId: '', title: '', duration: '', eligibility: '', description: '',
    hero: { bgImage: '', badge: '', title: { main: '', highlight: '', skyHighlight: '' }, description: '', cta: [], quickStats: [] },
    accomplishments: { heading: '', trustBadge: '', stats: [] },
    overview: { sectionTitle: { main: 'Overview' }, subtitle: '', paragraphs: [], tags: [], gridCards: [] },
    scope: { sectionTitle: { main: 'Scope' }, subtitle: '', bgImage: '', body: '' },
    curriculum: { sectionTitle: { main: 'Structure' }, subtitle: '', introNote: '', outroNote: '', courseStructure: [], valueAddedCourses: [], accordionSections: [] },
    admissionFee: { sectionTitle: { main: 'Admission' }, subtitle: '', bgImage: '', youtubeVideoId: '', admissionCriteria: [], feeDetails: [] },
    scholarships: { sectionTitle: { main: 'Scholarships' }, subtitle: '', bgImage: '', dateHeaders: [], rows: [], earlyBird: { label: '', values: [] }, notes: [] },
    whyJoin: { sectionTitle: { main: 'Why Join' }, subtitle: '', reasons: [] },
    uniqueFeatures: { sectionTitle: { main: 'Features' }, subtitle: '', bgImage: '', features: [] },
    applySteps: { sectionTitle: { main: 'Apply' }, subtitle: '', bgImage: '', guideLabel: '', ctaLabel: '', ctaLink: '', steps: [] },
    faq: { sectionTitle: { main: 'FAQ' }, subtitle: '', items: [] },
    exploreDepartment: { sectionTitle: { main: 'Explore Our Department', highlight: 'Department' }, subtitle: 'Discover our specialized wings', slides: [] },
    breadcrumb: []
  });

  const updateSection = useCallback((section, data) => {
    setFormData(prev => ({ ...prev, [section]: data }));
  }, []);

  const handleSave = async () => {
    if (!formData.schoolId) return alert("Parent school is required.");
    if (!formData.name) return alert("Course name is required.");
    setIsSaving(true);
    try {
      const result = initialData?._id ? await updateCourse(initialData._id, formData) : await createCourse(formData);
      if (result.success) {
        router.push('/admin/courses');
        router.refresh();
      } else {
        alert(`Error: ${result.error}`);
        setIsSaving(false);
      }
    } catch (err) {
      alert("Save failed.");
      setIsSaving(false);
    }
  };

  const SectionCard = ({ id, title, description, isComplete }) => (
    <div className="border border-[var(--border-default)] bg-[var(--bg-surface)] p-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:border-[var(--color-primary)] transition-all rounded-none group shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 flex items-center justify-center rounded-none shrink-0 ${isComplete ? 'bg-[var(--color-success-light)] text-[var(--color-success-dark)]' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'}`}>
          {isComplete ? <CheckCircle2 size={16} strokeWidth={2.5} /> : <AlertCircle size={16} strokeWidth={2} />}
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

  return (
    <div className="w-[98%] lg:w-[95%] xl:w-[92%] mx-auto pb-28 space-y-6 px-4 mt-6">
      
      {/* ── Basic Configuration ── */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-5 shadow-[var(--shadow-sm)] space-y-5 rounded-none">
        <div className="flex items-center gap-2 border-b border-[var(--border-light)] pb-3">
          <Settings size={18} className="text-[var(--color-primary)]" />
          <h2 className="text-[14px] font-black text-[var(--text-primary)] uppercase tracking-wide">Base Config</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Parent School *</label>
            <select value={formData.schoolId?._id || formData.schoolId} onChange={(e) => setFormData({...formData, schoolId: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]">
              <option value="">Select School</option>
              {schools.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Course Name *</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]" placeholder="e.g. B.Tech CSE" />
          </div>
          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">URL Slug</label>
            <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-muted)] font-mono" placeholder="btech-cse" />
          </div>
          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Duration</label>
            <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]" placeholder="e.g. 4 Years" />
          </div>
          <div className="md:col-span-3">
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Eligibility</label>
            <input type="text" value={formData.eligibility} onChange={(e) => setFormData({...formData, eligibility: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]" placeholder="e.g. 10+2 with 50%" />
          </div>
          <div className="md:col-span-3 pt-3 border-t border-[var(--border-light)]">
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Meta Title</label>
            <input type="text" value={formData.metaTitle} onChange={(e) => setFormData({...formData, metaTitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)] mb-3" placeholder="SEO Title..." />
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Meta Description</label>
            <textarea value={formData.metaDescription} onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs h-20 focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)] resize-none" placeholder="SEO Description..." />
          </div>
          <div className="md:col-span-3 pt-3 border-t border-[var(--border-light)]">
            <NestedListEditor label="Custom Breadcrumbs Override" items={formData.breadcrumb || []} newItemTemplate={{ label: '', link: '' }} fields={[{key: 'label', label: 'Label'}, {key: 'link', label: 'Link'}]} onUpdate={items => setFormData({...formData, breadcrumb: items})} />
            <p className="text-[9px] text-[var(--text-muted)] mt-2 font-bold uppercase tracking-wide">Note: Course breadcrumbs are usually generated automatically, use this only for custom overrides.</p>
          </div>
        </div>
      </div>

      {/* ── Structured Sections List ── */}
      <div className="space-y-4">
        <h2 className="text-[14px] font-black text-[var(--text-primary)] uppercase tracking-wide border-b border-[var(--border-light)] pb-2">Page Layout Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <SectionCard id="hero" title="Hero Header" description="Top banner & title." isComplete={!!formData.hero?.title?.main} />
          <SectionCard id="accomplishments" title="Impact Stats" description="Badges & numbers." isComplete={!!formData.accomplishments?.heading} />
          <SectionCard id="overview" title="Overview" description="Summary & grid cards." isComplete={!!formData.overview?.sectionTitle?.main} />
          <SectionCard id="scope" title="Career Scope" description="Future opportunities." isComplete={!!formData.scope?.body} />
          <SectionCard id="curriculum" title="Curriculum" description="Semester breakdowns." isComplete={formData.curriculum?.accordionSections?.length > 0} />
          <SectionCard id="admissionFee" title="Admission" description="Criteria & fee tables." isComplete={formData.admissionFee?.feeDetails?.length > 0} />
          <SectionCard id="scholarships" title="Scholarships" description="Merit & early bird slabs." isComplete={formData.scholarships?.rows?.length > 0} />
          <SectionCard id="whyJoin" title="Why Join" description="Key benefits & reasons." isComplete={formData.whyJoin?.reasons?.length > 0} />
          <SectionCard id="uniqueFeatures" title="Features" description="Unique course points." isComplete={formData.uniqueFeatures?.features?.length > 0} />
          <SectionCard id="applySteps" title="How to Apply" description="Step-by-step guide." isComplete={formData.applySteps?.steps?.length > 0} />
          <SectionCard id="faq" title="FAQs" description="Common questions." isComplete={formData.faq?.items?.length > 0} />
          <SectionCard id="exploreDepartment" title="Department" description="Related facilities." isComplete={formData.exploreDepartment?.slides?.length > 0} />
        </div>
      </div>

      {/* ── Floating Save Bar ── */}
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
          
          {/* HERO */}
          {activeSection === 'hero' && (
            <div className="space-y-6">
              <TitleEditor label="Hero Title" value={formData.hero.title} onChange={val => updateSection('hero', {...formData.hero, title: val})} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Badge Text</label>
                  <input type="text" value={formData.hero.badge} onChange={e => updateSection('hero', {...formData.hero, badge: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
                <div>
                   <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">BG Image URL</label>
                   <div className="flex flex-col sm:flex-row gap-2">
                     <input type="text" value={formData.hero.bgImage} onChange={e => updateSection('hero', {...formData.hero, bgImage: e.target.value})} className="flex-1 border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                     <div className="w-full sm:w-auto shrink-0"><MediaUploader category="courses" onUploadSuccess={url => updateSection('hero', {...formData.hero, bgImage: url})} /></div>
                   </div>
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Hero Description</label>
                <textarea placeholder="Hero Description" value={formData.hero.description} onChange={e => updateSection('hero', {...formData.hero, description: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs h-20 outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none resize-none" />
              </div>
              <div className="pt-5 border-t border-[var(--border-light)]">
                <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Hero Actions (CTAs)</p>
                <div className="space-y-3">
                  {formData.hero.cta?.map((btn, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-[var(--bg-muted)] p-3 border border-[var(--border-light)] hover:border-[var(--border-default)] rounded-none transition-colors">
                      <input type="text" placeholder="Label" value={btn.label} onChange={e => { const n = [...formData.hero.cta]; n[idx].label = e.target.value; updateSection('hero', {...formData.hero, cta: n})}} className="w-full sm:flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      <input type="text" placeholder="Link" value={btn.link} onChange={e => { const n = [...formData.hero.cta]; n[idx].link = e.target.value; updateSection('hero', {...formData.hero, cta: n})}} className="w-full sm:flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                        <label className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-secondary)] uppercase whitespace-nowrap cursor-pointer">
                          <input type="checkbox" checked={btn.primary} onChange={e => { const n = [...formData.hero.cta]; n[idx].primary = e.target.checked; updateSection('hero', {...formData.hero, cta: n})}} className="w-4 h-4 accent-[var(--color-primary)] rounded-none cursor-pointer" /> PRIMARY
                        </label>
                        <button onClick={() => updateSection('hero', {...formData.hero, cta: formData.hero.cta.filter((_, i) => i !== idx)})} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => updateSection('hero', {...formData.hero, cta: [...(formData.hero.cta || []), { label: '', link: '#', primary: false }]})} className="w-full border border-dashed border-[var(--border-dark)] p-3 text-[10px] font-bold text-[var(--text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] transition-all flex items-center justify-center gap-1.5 uppercase tracking-widest rounded-none"><Plus size={14} strokeWidth={2.5}/> ADD NEW BUTTON</button>
                </div>
              </div>
              <div className="pt-5 border-t border-[var(--border-light)]">
                <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Hero Quick Stats</p>
                <div className="space-y-3">
                  {formData.hero.quickStats?.map((s, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-3 items-end bg-[var(--bg-surface)] p-3 border border-[var(--border-default)] rounded-none group hover:border-[var(--border-dark)] transition-colors relative">
                      <button onClick={() => updateSection('hero', {...formData.hero, quickStats: formData.hero.quickStats.filter((_, i) => i !== idx)})} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1 sm:static"><Trash2 size={16} /></button>
                      <div className="w-full sm:flex-1">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold uppercase block mb-1">Value</label>
                        <input type="text" value={s.value} onChange={e => { const n = [...formData.hero.quickStats]; n[idx].value = e.target.value; updateSection('hero', {...formData.hero, quickStats: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none bg-[var(--bg-surface)]" />
                      </div>
                      <div className="w-full sm:flex-1">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold uppercase block mb-1">Label</label>
                        <input type="text" value={s.label} onChange={e => { const n = [...formData.hero.quickStats]; n[idx].label = e.target.value; updateSection('hero', {...formData.hero, quickStats: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none bg-[var(--bg-surface)]" />
                      </div>
                      <div className="w-full sm:w-40">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold uppercase block mb-1">Icon</label>
                        <IconPicker value={s.icon} onChange={val => { const n = [...formData.hero.quickStats]; n[idx].icon = val; updateSection('hero', {...formData.hero, quickStats: n})}} />
                      </div>
                    </div>
                  ))}
                  <button onClick={() => updateSection('hero', {...formData.hero, quickStats: [...(formData.hero.quickStats || []), { icon: 'Star', value: '', label: '' }]})} className="text-[10px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] uppercase tracking-widest transition-colors flex items-center gap-1.5 mt-2"><Plus size={14} strokeWidth={2.5}/> ADD STAT</button>
                </div>
              </div>
            </div>
          )}

          {/* ACCOMPLISHMENTS */}
          {activeSection === 'accomplishments' && (
             <div className="space-y-5">
               <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Heading</label>
                  <input type="text" placeholder="Heading" value={formData.accomplishments.heading} onChange={e => updateSection('accomplishments', {...formData.accomplishments, heading: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
               </div>
               <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Trust Badge Text</label>
                  <input type="text" placeholder="Trust Badge Text" value={formData.accomplishments.trustBadge} onChange={e => updateSection('accomplishments', {...formData.accomplishments, trustBadge: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
               </div>
               <NestedListEditor 
                label="Impact Stats Cards"
                items={formData.accomplishments.stats}
                newItemTemplate={{ value: '', label: '', suffix: '', icon: 'BarChart' }}
                fields={[
                  {key: 'icon', label: 'Icon', type: 'icon'},
                  {key: 'value', label: 'Value'}, 
                  {key: 'suffix', label: 'Suffix (e.g. +)'}, 
                  {key: 'label', label: 'Label'}
                ]}
                onUpdate={items => updateSection('accomplishments', {...formData.accomplishments, stats: items})}
              />
             </div>
          )}

          {/* OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <TitleEditor label="Overview Title" value={formData.overview.sectionTitle} onChange={val => updateSection('overview', {...formData.overview, sectionTitle: val})} />
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Subtitle</label>
                <input type="text" value={formData.overview.subtitle} onChange={e => updateSection('overview', {...formData.overview, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
              </div>
              <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Introduction (Rich Text)</label>
                <RichTextEditor 
                  value={formData.overview.paragraphs?.join('')}
                  onChange={content => updateSection('overview', {...formData.overview, paragraphs: [content]})}
                />
              </div>
              <div className="space-y-4 pt-4 border-t border-[var(--border-light)]">
                <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Core Skill Cards</p>
                {formData.overview.gridCards?.map((c, idx) => (
                  <div key={idx} className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] relative group hover:border-[var(--border-dark)] transition-colors rounded-none">
                    <button onClick={() => updateSection('overview', {...formData.overview, gridCards: formData.overview.gridCards.filter((_, i) => i !== idx)})} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 sm:mt-0">
                      <div>
                        <label className="text-[9px] text-[var(--text-muted)] font-bold uppercase block mb-1">Card Title</label>
                        <input type="text" value={c.label} onChange={e => { const n = [...formData.overview.gridCards]; n[idx].label = e.target.value; updateSection('overview', {...formData.overview, gridCards: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      </div>
                      <div>
                        <label className="text-[9px] text-[var(--text-muted)] font-bold uppercase block mb-1">Subtitle</label>
                        <input type="text" value={c.sub} onChange={e => { const n = [...formData.overview.gridCards]; n[idx].sub = e.target.value; updateSection('overview', {...formData.overview, gridCards: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold uppercase block mb-1">Icon</label>
                        <IconPicker value={c.icon} onChange={val => { const n = [...formData.overview.gridCards]; n[idx].icon = val; updateSection('overview', {...formData.overview, gridCards: n})}} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateSection('overview', {...formData.overview, gridCards: [...(formData.overview.gridCards || []), { label: '', sub: '', icon: 'Check', color: '#00588b' }]})} className="text-[10px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] uppercase tracking-widest transition-colors flex items-center gap-1.5"><Plus size={14} strokeWidth={2.5}/> ADD CARD</button>
              </div>
            </div>
          )}

          {/* SCOPE */}
          {activeSection === 'scope' && (
            <div className="space-y-6">
              <TitleEditor label="Scope Section Title" value={formData.scope.sectionTitle} onChange={val => updateSection('scope', {...formData.scope, sectionTitle: val})} />
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Subtitle</label>
                <input type="text" value={formData.scope.subtitle} onChange={e => updateSection('scope', {...formData.scope, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Endless opportunities" />
              </div>
              <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] overflow-hidden rounded-none">
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">Background Image</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input type="text" value={formData.scope.bgImage} onChange={e => updateSection('scope', {...formData.scope, bgImage: e.target.value})} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                  <div className="w-full sm:w-auto shrink-0"><MediaUploader category="courses" onUploadSuccess={url => updateSection('scope', {...formData.scope, bgImage: url})} /></div>
                </div>
              </div>
              <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Scope Body (Rich Text)</label>
                <RichTextEditor value={formData.scope.body} onChange={val => updateSection('scope', {...formData.scope, body: val})} />
              </div>
            </div>
          )}

          {/* CURRICULUM */}
          {activeSection === 'curriculum' && (
             <div className="space-y-6">
               <TitleEditor label="Curriculum Section Title" value={formData.curriculum.sectionTitle} onChange={val => updateSection('curriculum', {...formData.curriculum, sectionTitle: val})} />
               <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Subtitle</label>
                  <input type="text" placeholder="e.g. Structured for Success" value={formData.curriculum.subtitle} onChange={e => updateSection('curriculum', {...formData.curriculum, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none bg-[var(--bg-surface)] rounded-none" />
               </div>
               <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">Intro Note</label>
                <RichTextEditor value={formData.curriculum.introNote} onChange={val => updateSection('curriculum', {...formData.curriculum, introNote: val})} />
              </div>
              <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">Outro Note</label>
                <RichTextEditor value={formData.curriculum.outroNote} onChange={val => updateSection('curriculum', {...formData.curriculum, outroNote: val})} />
              </div>
              <div className="pt-2">
                <NestedListEditor 
                  label="Course Breakdown Accordions"
                  items={formData.curriculum.accordionSections}
                  newItemTemplate={{ id: Date.now().toString(), title: '', content: '', hasTable: false }}
                  fields={[
                    {key: 'title', label: 'Accordion Title'},
                    {key: 'content', label: 'Accordion Content (Supports Tables/Formatting)', type: 'richText'}
                  ]}
                  onUpdate={items => updateSection('curriculum', {...formData.curriculum, accordionSections: items})}
                />
              </div>
              <div className="pt-6 border-t border-[var(--border-light)]">
                <NestedListEditor 
                  label="Value Added Courses (VAC)"
                  items={formData.curriculum.valueAddedCourses || []}
                  newItemTemplate={{ name: '', credits: 0, category: 'UG', description: '' }}
                  fields={[
                    {key: 'name', label: 'Course Name'},
                    {key: 'category', label: 'Category (e.g. VAC)'},
                    {key: 'credits', label: 'Credits', type: 'number'},
                    {key: 'description', label: 'Note/Description'}
                  ]}
                  onUpdate={items => updateSection('curriculum', {...formData.curriculum, valueAddedCourses: items})}
                />
              </div>
            </div>
          )}

          {/* EXPLORE DEPARTMENT */}
          {activeSection === 'exploreDepartment' && (
            <div className="space-y-6">
              <TitleEditor label="Explore Department Title" value={formData.exploreDepartment.sectionTitle} onChange={val => updateSection('exploreDepartment', {...formData.exploreDepartment, sectionTitle: val})} />
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Subtitle</label>
                <input type="text" value={formData.exploreDepartment.subtitle} onChange={e => updateSection('exploreDepartment', {...formData.exploreDepartment, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Discover our specialized wings" />
              </div>
              <NestedListEditor 
                label="Department Slides"
                items={formData.exploreDepartment.slides || []}
                newItemTemplate={{ title: '', icon: 'Building2', items: [], cta: 'VIEW MORE' }}
                fields={[
                  {key: 'icon', label: 'Icon', type: 'icon'},
                  {key: 'title', label: 'Slide Title'},
                  {key: 'cta', label: 'Button text'},
                  {key: 'items', label: 'Feature Points', type: 'stringList'}
                ]}
                onUpdate={items => updateSection('exploreDepartment', {...formData.exploreDepartment, slides: items})}
              />
            </div>
          )}

          {/* ADMISSION & FEE */}
          {activeSection === 'admissionFee' && (
            <div className="space-y-6">
              <TitleEditor label="Admission Section Title" value={formData.admissionFee.sectionTitle} onChange={val => updateSection('admissionFee', {...formData.admissionFee, sectionTitle: val})} />
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Subtitle</label>
                <input type="text" value={formData.admissionFee.subtitle} onChange={e => updateSection('admissionFee', {...formData.admissionFee, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Simple steps to join" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] overflow-hidden rounded-none">
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">Background Image</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text" value={formData.admissionFee.bgImage} onChange={e => updateSection('admissionFee', {...formData.admissionFee, bgImage: e.target.value})} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                    <div className="w-full sm:w-auto shrink-0"><MediaUploader category="courses" onUploadSuccess={url => updateSection('admissionFee', {...formData.admissionFee, bgImage: url})} /></div>
                  </div>
                </div>
                <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">YouTube Video ID</label>
                  <input type="text" placeholder="e.g. ScMzIvxBSi4" value={formData.admissionFee.youtubeVideoId} onChange={e => updateSection('admissionFee', {...formData.admissionFee, youtubeVideoId: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
              </div>
              <div className="pt-2">
                <NestedListEditor 
                  label="Admission Criteria"
                  items={formData.admissionFee.admissionCriteria}
                  newItemTemplate={{ text: '', link: '#', color: '#00588b' }}
                  fields={[{key: 'text', label: 'Criteria Text'}, {key: 'link', label: 'Link'}]}
                  onUpdate={items => updateSection('admissionFee', {...formData.admissionFee, admissionCriteria: items})}
                />
              </div>
              <div className="pt-2">
                <NestedListEditor 
                  label="Fee Details"
                  items={formData.admissionFee.feeDetails}
                  newItemTemplate={{ label: '', amount: '' }}
                  fields={[{key: 'label', label: 'Fee Label'}, {key: 'amount', label: 'Amount'}]}
                  onUpdate={items => updateSection('admissionFee', {...formData.admissionFee, feeDetails: items})}
                />
              </div>
            </div>
          )}

          {/* SCHOLARSHIPS */}
          {activeSection === 'scholarships' && (
            <div className="space-y-6">
               <TitleEditor label="Scholarships Section" value={formData.scholarships.sectionTitle} onChange={val => updateSection('scholarships', {...formData.scholarships, sectionTitle: val})} />
               <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Subtitle</label>
                  <input type="text" value={formData.scholarships.subtitle} onChange={e => updateSection('scholarships', {...formData.scholarships, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Scholarship for Session 2026-27" />
               </div>
               <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] mt-2 rounded-none">
                 <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">Section Background</label>
                 <div className="flex flex-col sm:flex-row gap-2">
                   <input type="text" value={formData.scholarships.bgImage} onChange={e => updateSection('scholarships', {...formData.scholarships, bgImage: e.target.value})} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                   <div className="w-full sm:w-auto shrink-0"><MediaUploader category="courses" onUploadSuccess={url => updateSection('scholarships', {...formData.scholarships, bgImage: url})} /></div>
                 </div>
               </div>
               
               <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                 <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4 pb-3 border-b border-[var(--border-light)]">
                   <label className="block text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Phase Headers</label>
                   <button 
                     onClick={() => {
                       const newHeaders = [...(formData.scholarships.dateHeaders || []), ''];
                       const newRows = formData.scholarships.rows.map(row => ({ ...row, values: [...row.values, ''] }));
                       const newEarlyBird = { ...formData.scholarships.earlyBird, values: [...(formData.scholarships.earlyBird?.values || []), ''] };
                       updateSection('scholarships', { ...formData.scholarships, dateHeaders: newHeaders, rows: newRows, earlyBird: newEarlyBird });
                     }}
                     className="bg-[var(--color-primary)] text-[var(--text-inverse)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide hover:bg-[var(--color-primary-dark)] transition-colors rounded-none w-full sm:w-auto text-center"
                   >
                     ADD PHASE
                   </button>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                   {(formData.scholarships.dateHeaders || []).map((header, hIdx) => (
                     <div key={hIdx} className="flex gap-2 bg-[var(--bg-muted)] p-2 border border-[var(--border-light)]">
                       <input 
                         type="text" 
                         value={header} 
                         onChange={e => {
                           const newHeaders = [...formData.scholarships.dateHeaders];
                           newHeaders[hIdx] = e.target.value;
                           updateSection('scholarships', {...formData.scholarships, dateHeaders: newHeaders});
                         }} 
                         className="flex-1 border border-[var(--border-default)] p-2 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]" 
                         placeholder={`Phase ${hIdx + 1} Label`}
                       />
                       <button 
                         onClick={() => {
                           const newHeaders = formData.scholarships.dateHeaders.filter((_, i) => i !== hIdx);
                           const newRows = formData.scholarships.rows.map(row => ({ ...row, values: row.values.filter((_, i) => i !== hIdx) }));
                           const newEarlyBird = { ...formData.scholarships.earlyBird, values: (formData.scholarships.earlyBird?.values || []).filter((_, i) => i !== hIdx) };
                           updateSection('scholarships', { ...formData.scholarships, dateHeaders: newHeaders, rows: newRows, earlyBird: newEarlyBird });
                         }} 
                         className="text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1.5 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none"
                       >
                         <Trash2 size={16} />
                       </button>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] overflow-x-auto rounded-none">
                 <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4 pb-3 border-b border-[var(--border-light)]">
                  <h4 className="font-bold text-[11px] uppercase tracking-widest text-[var(--color-warning-dark)]">Scholarship Slabs</h4>
                  <button onClick={() => updateSection('scholarships', {...formData.scholarships, rows: [...formData.scholarships.rows, { range: '', values: Array(formData.scholarships.dateHeaders.length).fill('') }]})} className="bg-[var(--color-warning)] text-[var(--bg-surface)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide hover:bg-[var(--color-warning-dark)] transition-colors rounded-none w-full sm:w-auto text-center">ADD SLAB</button>
                 </div>
                 <div className="space-y-3 min-w-[600px]">
                   {formData.scholarships.rows.map((row, rIdx) => (
                     <div key={rIdx} className="bg-[var(--bg-muted)] p-3 border border-[var(--border-default)]">
                        <div className="flex justify-between items-center mb-3">
                           <input type="text" placeholder="Eligibility Range (e.g. Above 90%)" value={row.range} onChange={e => {
                             const nr = [...formData.scholarships.rows]; nr[rIdx].range = e.target.value; updateSection('scholarships', {...formData.scholarships, rows: nr});
                           }} className="border border-[var(--border-default)] p-2 text-xs font-bold flex-1 mr-3 focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]" />
                           <button onClick={() => updateSection('scholarships', {...formData.scholarships, rows: formData.scholarships.rows.filter((_, i) => i !== rIdx)})} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1.5 border border-transparent hover:border-[var(--color-danger-light)] hover:bg-[var(--color-danger-light)] rounded-none"><Trash2 size={16} /></button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                          {formData.scholarships.dateHeaders.map((header, hIdx) => (
                            <div key={hIdx}>
                              <label className="block text-[9px] uppercase font-bold text-[var(--text-muted)] mb-1 truncate">{header || `Phase ${hIdx+1}`}</label>
                              <input type="text" placeholder="Amount" value={row.values[hIdx] || ''} onChange={e => {
                                const nr = [...formData.scholarships.rows]; 
                                const newValues = [...nr[rIdx].values];
                                newValues[hIdx] = e.target.value;
                                nr[rIdx].values = newValues;
                                updateSection('scholarships', {...formData.scholarships, rows: nr});
                              }} className="w-full border border-[var(--border-default)] p-2 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]" />
                            </div>
                          ))}
                        </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                 <h4 className="font-bold text-[11px] uppercase tracking-widest text-[var(--color-primary)] mb-4 pb-3 border-b border-[var(--border-light)]">Early Bird / Special Offer</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Label (e.g. Early Bird)</label>
                      <input type="text" value={formData.scholarships.earlyBird?.label || ''} onChange={e => updateSection('scholarships', {...formData.scholarships, earlyBird: {...formData.scholarships.earlyBird, label: e.target.value}})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {formData.scholarships.dateHeaders.map((header, hIdx) => (
                        <div key={hIdx}>
                          <label className="block text-[9px] uppercase font-bold text-[var(--text-muted)] mb-1 truncate">{header}</label>
                          <input type="text" value={formData.scholarships.earlyBird?.values?.[hIdx] || ''} onChange={e => {
                            const newValues = [...(formData.scholarships.earlyBird?.values || [])];
                            newValues[hIdx] = e.target.value;
                            updateSection('scholarships', {...formData.scholarships, earlyBird: {...formData.scholarships.earlyBird, values: newValues}});
                          }} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]" />
                        </div>
                      ))}
                    </div>
                 </div>
               </div>

               <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                 <h4 className="font-bold text-[11px] uppercase tracking-widest text-[var(--text-secondary)] mb-4">Important Notes</h4>
                 <NestedListEditor 
                    label="Notes List"
                    items={formData.scholarships.notes || []}
                    newItemTemplate={{ icon: 'Info', text: '' }}
                    fields={[
                      {key: 'icon', label: 'Icon', type: 'icon'},
                      {key: 'text', label: 'Note Text'}
                    ]}
                    onUpdate={items => updateSection('scholarships', {...formData.scholarships, notes: items})}
                 />
               </div>
            </div>
          )}

          {/* FAQ */}
          {activeSection === 'faq' && (
            <NestedListEditor 
              label="Course Questions"
              items={formData.faq.items}
              newItemTemplate={{ q: '', a: '' }}
              fields={[{key: 'q', label: 'Question'}, {key: 'a', label: 'Answer', type: 'richText'}]}
              onUpdate={items => updateSection('faq', {...formData.faq, items: items})}
            />
          )}

          {/* WHY JOIN */}
           {activeSection === 'whyJoin' && (
             <div className="space-y-6">
               <TitleEditor label="Why Join Section" value={formData.whyJoin.sectionTitle} onChange={val => updateSection('whyJoin', {...formData.whyJoin, sectionTitle: val})} />
               <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Subtitle</label>
                  <input type="text" value={formData.whyJoin.subtitle} onChange={e => updateSection('whyJoin', {...formData.whyJoin, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Unlock your potential" />
               </div>
               <div className="space-y-4 pt-4 border-t border-[var(--border-light)]">
                <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Key Reasons</p>
                {formData.whyJoin.reasons?.map((r, idx) => (
                  <div key={idx} className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] relative group hover:border-[var(--border-dark)] transition-colors rounded-none">
                    <button onClick={() => updateSection('whyJoin', {...formData.whyJoin, reasons: formData.whyJoin.reasons.filter((_, i) => i !== idx)})} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 md:mt-0">
                      <div className="md:col-span-2">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1 uppercase">Title</label>
                        <input type="text" value={r.title} onChange={e => { const n = [...formData.whyJoin.reasons]; n[idx].title = e.target.value; updateSection('whyJoin', {...formData.whyJoin, reasons: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs font-bold outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      </div>
                      <div>
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1 uppercase">Description</label>
                        <textarea value={r.desc} onChange={e => { const n = [...formData.whyJoin.reasons]; n[idx].desc = e.target.value; updateSection('whyJoin', {...formData.whyJoin, reasons: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs h-16 outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none resize-none" />
                      </div>
                      <div>
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1 uppercase">Icon</label>
                        <IconPicker value={r.icon} onChange={val => { const n = [...formData.whyJoin.reasons]; n[idx].icon = val; updateSection('whyJoin', {...formData.whyJoin, reasons: n})}} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateSection('whyJoin', {...formData.whyJoin, reasons: [...(formData.whyJoin.reasons || []), { icon: 'Brain', title: '', desc: '' }]})} className="text-[10px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] uppercase tracking-widest transition-colors flex items-center gap-1.5"><Plus size={14} strokeWidth={2.5}/> ADD REASON</button>
              </div>
             </div>
          )}

          {/* UNIQUE FEATURES */}
          {activeSection === 'uniqueFeatures' && (
            <div className="space-y-6">
              <TitleEditor label="Features Section" value={formData.uniqueFeatures.sectionTitle} onChange={val => updateSection('uniqueFeatures', {...formData.uniqueFeatures, sectionTitle: val})} />
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Subtitle</label>
                <input type="text" value={formData.uniqueFeatures.subtitle} onChange={e => updateSection('uniqueFeatures', {...formData.uniqueFeatures, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Setting us apart" />
              </div>
              <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] overflow-hidden rounded-none">
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">Features Background Image</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input type="text" value={formData.uniqueFeatures.bgImage} onChange={e => updateSection('uniqueFeatures', {...formData.uniqueFeatures, bgImage: e.target.value})} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                  <div className="w-full sm:w-auto shrink-0"><MediaUploader category="courses" onUploadSuccess={url => updateSection('uniqueFeatures', {...formData.uniqueFeatures, bgImage: url})} /></div>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-[var(--border-light)]">
                <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Unique Points</p>
                {formData.uniqueFeatures.features?.map((f, idx) => (
                  <div key={idx} className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] relative group hover:border-[var(--border-dark)] transition-colors rounded-none">
                    <button onClick={() => updateSection('uniqueFeatures', {...formData.uniqueFeatures, features: formData.uniqueFeatures.features.filter((_, i) => i !== idx)})} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 sm:mt-0">
                      <div>
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1 uppercase">Number (e.g. 01)</label>
                        <input type="text" value={f.num} onChange={e => { const n = [...formData.uniqueFeatures.features]; n[idx].num = e.target.value; updateSection('uniqueFeatures', {...formData.uniqueFeatures, features: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      </div>
                      <div>
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1 uppercase">Title</label>
                        <input type="text" value={f.title} onChange={e => { const n = [...formData.uniqueFeatures.features]; n[idx].title = e.target.value; updateSection('uniqueFeatures', {...formData.uniqueFeatures, features: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs font-bold outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1 uppercase">Description</label>
                        <textarea value={f.desc} onChange={e => { const n = [...formData.uniqueFeatures.features]; n[idx].desc = e.target.value; updateSection('uniqueFeatures', {...formData.uniqueFeatures, features: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs h-16 outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none resize-none" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1 uppercase">Icon</label>
                        <IconPicker value={f.icon} onChange={val => { const n = [...formData.uniqueFeatures.features]; n[idx].icon = val; updateSection('uniqueFeatures', {...formData.uniqueFeatures, features: n})}} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateSection('uniqueFeatures', {...formData.uniqueFeatures, features: [...(formData.uniqueFeatures.features || []), { num: '01', icon: 'Star', title: '', desc: '' }]})} className="text-[10px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] uppercase tracking-widest transition-colors flex items-center gap-1.5"><Plus size={14} strokeWidth={2.5}/> ADD FEATURE</button>
              </div>
            </div>
          )}

          {/* APPLY STEPS */}
          {activeSection === 'applySteps' && (
            <div className="space-y-6">
              <TitleEditor label="How to Apply Section" value={formData.applySteps.sectionTitle} onChange={val => updateSection('applySteps', {...formData.applySteps, sectionTitle: val})} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Guide Subtitle</label>
                  <input type="text" value={formData.applySteps.guideLabel} onChange={e => updateSection('applySteps', {...formData.applySteps, guideLabel: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">CTA Label</label>
                  <input type="text" value={formData.applySteps.ctaLabel} onChange={e => updateSection('applySteps', {...formData.applySteps, ctaLabel: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Background Image</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text" value={formData.applySteps.bgImage} onChange={e => updateSection('applySteps', {...formData.applySteps, bgImage: e.target.value})} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                    <div className="w-full sm:w-auto shrink-0"><MediaUploader category="courses" onUploadSuccess={url => updateSection('applySteps', {...formData.applySteps, bgImage: url})} /></div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-[var(--border-light)]">
                <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Application Steps</p>
                {formData.applySteps.steps?.map((s, idx) => (
                  <div key={idx} className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] relative group hover:border-[var(--border-dark)] transition-colors rounded-none">
                    <button onClick={() => updateSection('applySteps', {...formData.applySteps, steps: formData.applySteps.steps.filter((_, i) => i !== idx)})} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 sm:mt-0">
                      <div>
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1 uppercase">Step #</label>
                        <input type="text" value={s.step} onChange={e => { const n = [...formData.applySteps.steps]; n[idx].step = e.target.value; updateSection('applySteps', {...formData.applySteps, steps: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      </div>
                      <div>
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1 uppercase">Label</label>
                        <input type="text" value={s.label} onChange={e => { const n = [...formData.applySteps.steps]; n[idx].label = e.target.value; updateSection('applySteps', {...formData.applySteps, steps: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs font-bold outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1 uppercase">Instructions</label>
                        <textarea value={s.desc} onChange={e => { const n = [...formData.applySteps.steps]; n[idx].desc = e.target.value; updateSection('applySteps', {...formData.applySteps, steps: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs h-16 outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none resize-none" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1 uppercase">Icon</label>
                        <IconPicker value={s.icon} onChange={val => { const n = [...formData.applySteps.steps]; n[idx].icon = val; updateSection('applySteps', {...formData.applySteps, steps: n})}} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateSection('applySteps', {...formData.applySteps, steps: [...(formData.applySteps.steps || []), { icon: 'UserCheck', step: '1', label: '', desc: '' }]})} className="text-[10px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] uppercase tracking-widest transition-colors flex items-center gap-1.5"><Plus size={14} strokeWidth={2.5}/> ADD STEP</button>
              </div>
            </div>
          )}

        </div>
      </Modal>
    </div>
  );
}