'use client';
import Modal from '@/components/admin/ui/Modal';
import MediaUploader from '@/components/admin/MediaUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import IconPicker from '@/components/admin/ui/IconPicker';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Save, CheckCircle2, AlertCircle, Plus, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { createCourse, updateCourse } from '@/lib/actions/courseActions';

// --- Shared Internal Components ---

const TitleEditor = ({ label, value = {}, onChange }) => (
  <div className="space-y-3 p-4 bg-blue-50/50 border border-blue-100 mb-4">
    <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest">{label}</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-[10px] text-gray-400 uppercase mb-1">Main Title</label>
        <input type="text" value={value.main || ''} onChange={e => onChange({...value, main: e.target.value})} className="w-full border border-gray-300 p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Course Overview" />
      </div>
      <div>
        <label className="block text-[10px] text-gray-400 uppercase mb-1">Highlight Word</label>
        <input type="text" value={value.highlight || ''} onChange={e => onChange({...value, highlight: e.target.value})} className="w-full border border-gray-300 p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Overview" />
      </div>
      <div>
        <label className="block text-[10px] text-gray-400 uppercase mb-1">Sky Highlight</label>
        <input type="text" value={value.skyHighlight || ''} onChange={e => onChange({...value, skyHighlight: e.target.value})} className="w-full border border-gray-300 p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Optional" />
      </div>
    </div>
  </div>
);

const StringListEditor = ({ value = [], onChange, label }) => (
  <div className="space-y-2 mt-4">
    <label className="block text-[10px] text-gray-400 uppercase mb-1">{label}</label>
    <div className="space-y-2 border-l-2 border-blue-100 pl-4 py-2">
      {value.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input type="text" value={item} onChange={e => {
            const newList = [...value]; newList[idx] = e.target.value; onChange(newList);
          }} className="flex-1 border border-gray-200 p-2 text-xs outline-none focus:border-blue-500" placeholder="List item text..." />
          <button onClick={() => onChange(value.filter((_, i) => i !== idx))} className="text-red-300 hover:text-red-500 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...value, ''])} className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-800">
        <Plus size={14} /> ADD {label.toUpperCase() || 'ITEM'}
      </button>
    </div>
  </div>
);

const NestedListEditor = ({ label, items = [], fields, onUpdate, newItemTemplate }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center border-b pb-2">
      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</h4>
      <button onClick={() => onUpdate([...items, newItemTemplate])} className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-800">
        <Plus size={14} /> ADD {label.toUpperCase()}
      </button>
    </div>
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-gray-200 bg-white p-4 relative group">
          <button onClick={() => onUpdate(items.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
            <Trash2 size={16} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {fields.map(field => (
              <div key={field.key}>
                <label className="block text-[10px] text-gray-400 uppercase mb-1">{field.label}</label>
                {field.type === 'icon' ? (
                  <IconPicker 
                    value={item[field.key]} 
                    onChange={val => {
                      const newItems = [...items]; newItems[idx][field.key] = val; onUpdate(newItems);
                    }} 
                  />
                ) : field.type === 'image' ? (
                  <div className="flex gap-2">
                    <input type="text" value={item[field.key] || ''} onChange={e => {
                      const newItems = [...items]; newItems[idx][field.key] = e.target.value; onUpdate(newItems);
                    }} className="flex-1 border border-gray-300 p-2 text-xs outline-none" />
                    <MediaUploader category="courses" onUploadSuccess={url => {
                      const newItems = [...items]; newItems[idx][field.key] = url; onUpdate(newItems);
                    }} />
                  </div>
                ) : field.type === 'richText' ? (
                  <div className="md:col-span-2">
                    <RichTextEditor 
                      value={item[field.key] || ''} 
                      onChange={val => {
                        const newItems = [...items]; newItems[idx][field.key] = val; onUpdate(newItems);
                      }} 
                    />
                  </div>
                ) : field.type === 'stringList' ? (
                  <div className="md:col-span-2">
                    <StringListEditor 
                      label={field.label} 
                      value={item[field.key] || []} 
                      onChange={val => {
                        const newItems = [...items]; newItems[idx][field.key] = val; onUpdate(newItems);
                      }} 
                    />
                  </div>
                ) : (
                  <input type={field.type || 'text'} value={item[field.key] || ''} onChange={e => {
                    const newItems = [...items]; newItems[idx][field.key] = e.target.value; onUpdate(newItems);
                  }} className="w-full border border-gray-300 p-2 text-xs outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
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
    name: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    schoolId: '',
    title: '',
    duration: '',
    eligibility: '',
    description: '',
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
    <div className="border border-gray-300 bg-white p-5 flex justify-between items-center group hover:border-blue-500 transition-all shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-none ${isComplete ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
          {isComplete ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <button 
        onClick={() => { setActiveSection(id); setIsModalOpen(true); }}
        className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 font-bold text-xs hover:bg-blue-600 hover:text-white transition-all rounded-none"
      >
        <Pencil size={14} /> EDIT SECTION
      </button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-32 space-y-8">
      {/* Basic Configuration */}
      <div className="bg-white border border-gray-300 p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight border-b-2 border-gray-200 pb-4">Course Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-gray-500 uppercase mb-2">Parent School</label>
            <select value={formData.schoolId?._id || formData.schoolId} onChange={(e) => setFormData({...formData, schoolId: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-blue-600 outline-none rounded-none bg-gray-50">
              <option value="">Select School</option>
              {schools.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase mb-2">Course Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-blue-600 outline-none rounded-none bg-gray-50" />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase mb-2">Slug</label>
            <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-blue-600 outline-none rounded-none bg-gray-50 font-mono" />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase mb-2">Duration</label>
            <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full border border-gray-300 p-3 text-sm outline-none rounded-none bg-gray-50" placeholder="e.g. 3 Years" />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase mb-2">Eligibility</label>
            <input type="text" value={formData.eligibility} onChange={(e) => setFormData({...formData, eligibility: e.target.value})} className="w-full border border-gray-300 p-3 text-sm outline-none rounded-none bg-gray-50" placeholder="e.g. 10+2 with 50%" />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase mb-2">Meta Title</label>
            <input type="text" placeholder="e.g. B.Tech Computer Science | CPU" value={formData.metaTitle} onChange={(e) => setFormData({...formData, metaTitle: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-blue-600 outline-none rounded-none bg-gray-50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-gray-500 uppercase mb-2">Meta Description</label>
            <textarea placeholder="e.g. Master the latest technologies with our industry-aligned B.Tech CSE program..." value={formData.metaDescription} onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} className="w-full border border-gray-300 p-3 text-sm h-24 focus:border-blue-600 outline-none rounded-none bg-gray-50 resize-none" />
          </div>

          <div className="md:col-span-2 pt-4 border-t border-gray-100">
            <NestedListEditor 
              label="Manual Breadcrumb Override"
              items={formData.breadcrumb || []}
              newItemTemplate={{ label: '', link: '' }}
              fields={[{key: 'label', label: 'Label'}, {key: 'link', label: 'Link'}]}
              onUpdate={items => setFormData({...formData, breadcrumb: items})}
            />
            <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tight">Note: Course breadcrumbs are usually generated automatically, use this only for custom overrides.</p>
          </div>
        </div>
      </div>

      {/* Structured Sections List */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight px-2">Course Detail Sections</h2>
        <div className="grid grid-cols-1 gap-3">
          <SectionCard id="hero" title="Hero Section" description="Banner, badge, main title and CTAs." isComplete={!!formData.hero?.title?.main} />
          <SectionCard id="accomplishments" title="Impact Stats" description="Accomplishments, trust badges and stat counts." isComplete={!!formData.accomplishments?.heading} />
          <SectionCard id="overview" title="Course Overview" description="Summary, tags and core skill cards." isComplete={!!formData.overview?.sectionTitle?.main} />
          <SectionCard id="scope" title="Course Scope" description="Learning outcomes and career scope." isComplete={!!formData.scope?.body} />
          <SectionCard id="curriculum" title="Curriculum & Syllabus" description="Core subjects, electives and semester breakdowns." isComplete={formData.curriculum?.accordionSections?.length > 0} />
          <SectionCard id="admissionFee" title="Admission & Fee" description="Video link, criteria and detailed fee breakdown." isComplete={formData.admissionFee?.feeDetails?.length > 0} />
          <SectionCard id="scholarships" title="Scholarships" description="Merit-based slabs and early bird benefits." isComplete={formData.scholarships?.rows?.length > 0} />
          <SectionCard id="whyJoin" title="Why Join" description="Key benefits and career reasons." isComplete={formData.whyJoin?.reasons?.length > 0} />
          <SectionCard id="uniqueFeatures" title="Unique Features" description="Dynamic feature highlights." isComplete={formData.uniqueFeatures?.features?.length > 0} />
          <SectionCard id="applySteps" title="How to Apply" description="Step-by-step application guide." isComplete={formData.applySteps?.steps?.length > 0} />
          <SectionCard id="faq" title="FAQs" description="Frequently asked questions for this course." isComplete={formData.faq?.items?.length > 0} />
          <SectionCard id="exploreDepartment" title="Explore Our Department" description="Manage dynamic cards with feature lists (as seen in schoolsData.json)." isComplete={formData.exploreDepartment?.slides?.length > 0} />
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-6 shadow-2xl z-50 flex justify-end px-12">
        <button onClick={handleSave} disabled={isSaving} className="bg-blue-600 text-white px-12 py-4 font-black text-sm uppercase tracking-widest hover:bg-blue-800 transition-all disabled:opacity-50 flex items-center gap-3 rounded-none shadow-lg">
          {isSaving ? 'Saving...' : <><Save size={20} /> Save Course</>}
        </button>
      </div>

      {/* Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Edit ${activeSection?.toUpperCase()}`}
        footer={
          <>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Changes apply to draft on Apply</p>
            <button onClick={() => setIsModalOpen(false)} className="bg-gray-900 text-white px-10 py-2 font-black text-xs uppercase hover:bg-black transition-all rounded-none">
              APPLY CHANGES
            </button>
          </>
        }
      >
          
          {activeSection === 'hero' && (
            <div className="space-y-6">
              <TitleEditor label="Hero Title" value={formData.hero.title} onChange={val => updateSection('hero', {...formData.hero, title: val})} />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase mb-2">Badge Text</label>
                  <input type="text" value={formData.hero.badge} onChange={e => updateSection('hero', {...formData.hero, badge: e.target.value})} className="w-full border p-3" />
                </div>
                <div>
                   <label className="block text-xs font-black text-gray-500 uppercase mb-2">BG Image URL</label>
                   <div className="flex gap-2">
                     <input type="text" value={formData.hero.bgImage} onChange={e => updateSection('hero', {...formData.hero, bgImage: e.target.value})} className="flex-1 border p-3" />
                     <MediaUploader category="courses" onUploadSuccess={url => updateSection('hero', {...formData.hero, bgImage: url})} />
                   </div>
                </div>
              </div>
              <textarea placeholder="Hero Description" value={formData.hero.description} onChange={e => updateSection('hero', {...formData.hero, description: e.target.value})} className="w-full border p-3 h-24" />
              <div className="pt-4 border-t border-gray-200">
                <p className="text-[10px] font-black text-blue-900 uppercase mb-3 tracking-widest">Hero Actions (CTAs)</p>
                <div className="space-y-3">
                  {formData.hero.cta?.map((btn, idx) => (
                    <div key={idx} className="flex gap-2 items-center bg-white p-2 border border-blue-50 transition-all hover:border-blue-200">
                      <input type="text" placeholder="Label" value={btn.label} onChange={e => { const n = [...formData.hero.cta]; n[idx].label = e.target.value; updateSection('hero', {...formData.hero, cta: n})}} className="flex-1 border border-gray-200 p-2 text-xs outline-none focus:border-blue-400" />
                      <input type="text" placeholder="Link" value={btn.link} onChange={e => { const n = [...formData.hero.cta]; n[idx].link = e.target.value; updateSection('hero', {...formData.hero, cta: n})}} className="flex-1 border border-gray-200 p-2 text-xs outline-none focus:border-blue-400" />
                      <label className="flex items-center gap-1 text-[10px] font-bold text-slate-500 whitespace-nowrap">
                        <input type="checkbox" checked={btn.primary} onChange={e => { const n = [...formData.hero.cta]; n[idx].primary = e.target.checked; updateSection('hero', {...formData.hero, cta: n})}} className="rounded-sm accent-blue-600" /> PRIMARY
                      </label>
                      <button onClick={() => updateSection('hero', {...formData.hero, cta: formData.hero.cta.filter((_, i) => i !== idx)})} className="text-red-300 hover:text-red-500 transition-colors p-1"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button onClick={() => updateSection('hero', {...formData.hero, cta: [...(formData.hero.cta || []), { label: '', link: '#', primary: false }]})} className="w-full border-2 border-dashed border-gray-100 p-3 text-[10px] font-bold text-blue-400 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center justify-center gap-1">+ ADD NEW BUTTON</button>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-3">Hero Quick Stats</p>
                <div className="space-y-4">
                  {formData.hero.quickStats?.map((s, idx) => (
                    <div key={idx} className="flex gap-4 items-end bg-white p-3 border border-dashed">
                      <div className="flex-1">
                        <label className="text-[10px] block mb-1">Value</label>
                        <input type="text" value={s.value} onChange={e => { const n = [...formData.hero.quickStats]; n[idx].value = e.target.value; updateSection('hero', {...formData.hero, quickStats: n})}} className="w-full border p-2 text-xs" />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] block mb-1">Label</label>
                        <input type="text" value={s.label} onChange={e => { const n = [...formData.hero.quickStats]; n[idx].label = e.target.value; updateSection('hero', {...formData.hero, quickStats: n})}} className="w-full border p-2 text-xs" />
                      </div>
                      <div className="w-40">
                        <label className="text-[10px] block mb-1">Icon</label>
                        <IconPicker value={s.icon} onChange={val => { const n = [...formData.hero.quickStats]; n[idx].icon = val; updateSection('hero', {...formData.hero, quickStats: n})}} />
                      </div>
                      <button onClick={() => updateSection('hero', {...formData.hero, quickStats: formData.hero.quickStats.filter((_, i) => i !== idx)})} className="text-red-400 p-2"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button onClick={() => updateSection('hero', {...formData.hero, quickStats: [...(formData.hero.quickStats || []), { icon: 'Star', value: '', label: '' }]})} className="text-[10px] font-bold text-blue-600 flex items-center gap-1"><Plus size={14} /> ADD STAT</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'accomplishments' && (
             <div className="space-y-6">
               <input type="text" placeholder="Heading" value={formData.accomplishments.heading} onChange={e => updateSection('accomplishments', {...formData.accomplishments, heading: e.target.value})} className="w-full border p-3" />
               <input type="text" placeholder="Trust Badge Text" value={formData.accomplishments.trustBadge} onChange={e => updateSection('accomplishments', {...formData.accomplishments, trustBadge: e.target.value})} className="w-full border p-3" />
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

          {activeSection === 'overview' && (
            <div className="space-y-6">
              <TitleEditor label="Title" value={formData.overview.sectionTitle} onChange={val => updateSection('overview', {...formData.overview, sectionTitle: val})} />
              <div>
                <label className="block text-[10px] text-gray-400 uppercase mb-2">Subtitle</label>
                <input type="text" value={formData.overview.subtitle} onChange={e => updateSection('overview', {...formData.overview, subtitle: e.target.value})} className="w-full border p-3 text-sm" />
              </div>
              <div className="bg-white p-4 border shadow-sm">
                <label className="block text-[10px] font-black text-blue-900 uppercase mb-4 tracking-widest">Introduction / Description (Rich Text)</label>
                <RichTextEditor 
                  value={formData.overview.paragraphs?.join('')}
                  onChange={content => updateSection('overview', {...formData.overview, paragraphs: [content]})}
                />
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-3">Core Skill Cards</p>
                {formData.overview.gridCards?.map((c, idx) => (
                  <div key={idx} className="bg-white p-4 border relative">
                    <button onClick={() => updateSection('overview', {...formData.overview, gridCards: formData.overview.gridCards.filter((_, i) => i !== idx)})} className="absolute top-2 right-2 text-red-300"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] block mb-1">Card Title</label>
                        <input type="text" value={c.label} onChange={e => { const n = [...formData.overview.gridCards]; n[idx].label = e.target.value; updateSection('overview', {...formData.overview, gridCards: n})}} className="w-full border p-2 text-xs" />
                      </div>
                      <div>
                        <label className="text-[10px] block mb-1">Subtitle</label>
                        <input type="text" value={c.sub} onChange={e => { const n = [...formData.overview.gridCards]; n[idx].sub = e.target.value; updateSection('overview', {...formData.overview, gridCards: n})}} className="w-full border p-2 text-xs" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] block mb-1">Icon</label>
                        <IconPicker value={c.icon} onChange={val => { const n = [...formData.overview.gridCards]; n[idx].icon = val; updateSection('overview', {...formData.overview, gridCards: n})}} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateSection('overview', {...formData.overview, gridCards: [...(formData.overview.gridCards || []), { label: '', sub: '', icon: 'Check', color: '#00588b' }]})} className="text-[10px] font-bold text-blue-600 flex items-center gap-1"><Plus size={14} /> ADD CARD</button>
              </div>
            </div>
          )}

          {activeSection === 'scope' && (
            <div className="space-y-6">
              <TitleEditor label="Scope Section Title" value={formData.scope.sectionTitle} onChange={val => updateSection('scope', {...formData.scope, sectionTitle: val})} />
              <div>
                <label className="block text-[10px] text-gray-400 uppercase mb-2">Subtitle</label>
                <input type="text" value={formData.scope.subtitle} onChange={e => updateSection('scope', {...formData.scope, subtitle: e.target.value})} className="w-full border p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Endless opportunities" />
              </div>
              <div className="bg-white p-4 border overflow-hidden">
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">Background Image</label>
                <div className="flex gap-2">
                  <input type="text" value={formData.scope.bgImage} onChange={e => updateSection('scope', {...formData.scope, bgImage: e.target.value})} className="flex-1 border p-2 text-sm" />
                  <MediaUploader category="courses" onUploadSuccess={url => updateSection('scope', {...formData.scope, bgImage: url})} />
                </div>
              </div>
              <div className="bg-white p-4 border border-dashed">
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">Scope Body (Rich Text)</label>
                <RichTextEditor value={formData.scope.body} onChange={val => updateSection('scope', {...formData.scope, body: val})} />
              </div>
            </div>
          )}

           {activeSection === 'curriculum' && (
             <div className="space-y-6">
               <TitleEditor label="Curriculum Section Title" value={formData.curriculum.sectionTitle} onChange={val => updateSection('curriculum', {...formData.curriculum, sectionTitle: val})} />
               <div>
                  <label className="block text-[10px] text-gray-400 uppercase mb-2">Subtitle</label>
                  <input type="text" placeholder="e.g. Structured for Success" value={formData.curriculum.subtitle} onChange={e => updateSection('curriculum', {...formData.curriculum, subtitle: e.target.value})} className="w-full border p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
               </div>
               <div className="bg-white p-4 border border-dashed">
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">Intro Note</label>
                <RichTextEditor value={formData.curriculum.introNote} onChange={val => updateSection('curriculum', {...formData.curriculum, introNote: val})} />
              </div>
              <div className="bg-white p-4 border border-dashed">
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">Outro Note</label>
                <RichTextEditor value={formData.curriculum.outroNote} onChange={val => updateSection('curriculum', {...formData.curriculum, outroNote: val})} />
              </div>
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
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-4">Value Added Courses (VAC)</h4>
                <NestedListEditor 
                  label="VAC Courses"
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

           {activeSection === 'exploreDepartment' && (
            <div className="space-y-6">
              <TitleEditor label="Explore Department Title" value={formData.exploreDepartment.sectionTitle} onChange={val => updateSection('exploreDepartment', {...formData.exploreDepartment, sectionTitle: val})} />
              <div>
                <label className="block text-[10px] text-gray-400 uppercase mb-2">Subtitle</label>
                <input type="text" value={formData.exploreDepartment.subtitle} onChange={e => updateSection('exploreDepartment', {...formData.exploreDepartment, subtitle: e.target.value})} className="w-full border p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Discover our specialized wings" />
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

          {activeSection === 'admissionFee' && (
            <div className="space-y-6">
              <TitleEditor label="Admission Section Title" value={formData.admissionFee.sectionTitle} onChange={val => updateSection('admissionFee', {...formData.admissionFee, sectionTitle: val})} />
              <div>
                <label className="block text-[10px] text-gray-400 uppercase mb-2">Subtitle</label>
                <input type="text" value={formData.admissionFee.subtitle} onChange={e => updateSection('admissionFee', {...formData.admissionFee, subtitle: e.target.value})} className="w-full border p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Simple steps to join" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 border overflow-hidden">
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">Background Image</label>
                  <div className="flex gap-2">
                    <input type="text" value={formData.admissionFee.bgImage} onChange={e => updateSection('admissionFee', {...formData.admissionFee, bgImage: e.target.value})} className="flex-1 border p-2 text-xs" />
                    <MediaUploader category="courses" onUploadSuccess={url => updateSection('admissionFee', {...formData.admissionFee, bgImage: url})} />
                  </div>
                </div>
                <div className="bg-white p-4 border">
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">YouTube Video ID</label>
                  <input type="text" placeholder="e.g. ScMzIvxBSi4" value={formData.admissionFee.youtubeVideoId} onChange={e => updateSection('admissionFee', {...formData.admissionFee, youtubeVideoId: e.target.value})} className="w-full border p-2 text-sm" />
                </div>
              </div>
              <NestedListEditor 
                label="Admission Criteria"
                items={formData.admissionFee.admissionCriteria}
                newItemTemplate={{ text: '', link: '#', color: '#00588b' }}
                fields={[{key: 'text', label: 'Criteria Text'}, {key: 'link', label: 'Link'}]}
                onUpdate={items => updateSection('admissionFee', {...formData.admissionFee, admissionCriteria: items})}
              />
              <NestedListEditor 
                label="Fee Details"
                items={formData.admissionFee.feeDetails}
                newItemTemplate={{ label: '', amount: '' }}
                fields={[{key: 'label', label: 'Fee Label'}, {key: 'amount', label: 'Amount'}]}
                onUpdate={items => updateSection('admissionFee', {...formData.admissionFee, feeDetails: items})}
              />
            </div>
          )}

          {activeSection === 'scholarships' && (
            <div className="space-y-6">
               <TitleEditor label="Scholarships Section" value={formData.scholarships.sectionTitle} onChange={val => updateSection('scholarships', {...formData.scholarships, sectionTitle: val})} />
               <div>
                  <label className="block text-[10px] text-gray-400 uppercase mb-2">Subtitle</label>
                  <input type="text" value={formData.scholarships.subtitle} onChange={e => updateSection('scholarships', {...formData.scholarships, subtitle: e.target.value})} className="w-full border p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Scholarship for Session 2026-27" />
               </div>
               <div className="bg-white p-4 border mt-4">
                 <label className="block text-[10px] text-gray-400 uppercase mb-2">Section Background</label>
                 <div className="flex gap-2">
                   <input type="text" value={formData.scholarships.bgImage} onChange={e => updateSection('scholarships', {...formData.scholarships, bgImage: e.target.value})} className="flex-1 border p-2 text-sm" />
                   <MediaUploader category="courses" onUploadSuccess={url => updateSection('scholarships', {...formData.scholarships, bgImage: url})} />
                 </div>
               </div>
               <div className="bg-white p-4 border">
                 <div className="flex justify-between items-center mb-4">
                   <label className="block text-[10px] text-gray-400 uppercase font-bold">Phase Headers (e.g. Early Bird, Phase 1)</label>
                   <button 
                     onClick={() => {
                       const newHeaders = [...(formData.scholarships.dateHeaders || []), ''];
                       const newRows = formData.scholarships.rows.map(row => ({
                         ...row,
                         values: [...row.values, '']
                       }));
                       const newEarlyBird = {
                         ...formData.scholarships.earlyBird,
                         values: [...(formData.scholarships.earlyBird?.values || []), '']
                       };
                       updateSection('scholarships', {
                         ...formData.scholarships, 
                         dateHeaders: newHeaders,
                         rows: newRows,
                         earlyBird: newEarlyBird
                       });
                     }}
                     className="bg-blue-600 text-white px-3 py-1 text-[10px] font-bold"
                   >
                     ADD PHASE
                   </button>
                 </div>
                 <div className="space-y-2">
                   {(formData.scholarships.dateHeaders || []).map((header, hIdx) => (
                     <div key={hIdx} className="flex gap-2">
                       <input 
                         type="text" 
                         value={header} 
                         onChange={e => {
                           const newHeaders = [...formData.scholarships.dateHeaders];
                           newHeaders[hIdx] = e.target.value;
                           updateSection('scholarships', {...formData.scholarships, dateHeaders: newHeaders});
                         }} 
                         className="flex-1 border p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                         placeholder={`Phase ${hIdx + 1} Label`}
                       />
                       <button 
                         onClick={() => {
                           const newHeaders = formData.scholarships.dateHeaders.filter((_, i) => i !== hIdx);
                           const newRows = formData.scholarships.rows.map(row => ({
                             ...row,
                             values: row.values.filter((_, i) => i !== hIdx)
                           }));
                           const newEarlyBird = {
                             ...formData.scholarships.earlyBird,
                             values: (formData.scholarships.earlyBird?.values || []).filter((_, i) => i !== hIdx)
                           };
                           updateSection('scholarships', {
                             ...formData.scholarships, 
                             dateHeaders: newHeaders,
                             rows: newRows,
                             earlyBird: newEarlyBird
                           });
                         }} 
                         className="text-red-500 p-2"
                       >
                         <Trash2 size={16} />
                       </button>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="bg-white p-4 border overflow-x-auto">
                 <div className="flex justify-between items-center mb-4">
                  <h4 className="font-black text-xs uppercase text-orange-600">Scholarship Slabs</h4>
                  <button onClick={() => updateSection('scholarships', {...formData.scholarships, rows: [...formData.scholarships.rows, { range: '', values: Array(formData.scholarships.dateHeaders.length).fill('') }]})} className="bg-orange-600 text-white px-3 py-1 text-[10px] font-bold">ADD SLAB</button>
                 </div>
                 <div className="space-y-3">
                   {formData.scholarships.rows.map((row, rIdx) => (
                     <div key={rIdx} className="bg-gray-50 p-3 border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                           <input type="text" placeholder="Eligibility Range (e.g. Above 90%)" value={row.range} onChange={e => {
                             const nr = [...formData.scholarships.rows]; nr[rIdx].range = e.target.value; updateSection('scholarships', {...formData.scholarships, rows: nr});
                           }} className="border p-2 text-xs font-bold flex-1 mr-2 focus:ring-1 focus:ring-blue-500 outline-none" />
                           <button onClick={() => updateSection('scholarships', {...formData.scholarships, rows: formData.scholarships.rows.filter((_, i) => i !== rIdx)})} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={16} /></button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                          {formData.scholarships.dateHeaders.map((header, hIdx) => (
                            <div key={hIdx}>
                              <label className="block text-[9px] uppercase font-bold text-gray-400 mb-1 truncate">{header || `Phase ${hIdx+1}`}</label>
                              <input type="text" placeholder="Amount" value={row.values[hIdx] || ''} onChange={e => {
                                const nr = [...formData.scholarships.rows]; 
                                const newValues = [...nr[rIdx].values];
                                newValues[hIdx] = e.target.value;
                                nr[rIdx].values = newValues;
                                updateSection('scholarships', {...formData.scholarships, rows: nr});
                              }} className="w-full border p-2 text-[10px] focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>
                          ))}
                        </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="bg-white p-4 border">
                 <h4 className="font-black text-xs uppercase text-blue-600 mb-4">Early Bird / Special Offer</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase mb-1">Label (e.g. Early Bird)</label>
                      <input type="text" value={formData.scholarships.earlyBird?.label || ''} onChange={e => updateSection('scholarships', {...formData.scholarships, earlyBird: {...formData.scholarships.earlyBird, label: e.target.value}})} className="w-full border p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {formData.scholarships.dateHeaders.map((header, hIdx) => (
                        <div key={hIdx}>
                          <label className="block text-[9px] uppercase font-bold text-gray-400 mb-1 truncate">{header}</label>
                          <input type="text" value={formData.scholarships.earlyBird?.values?.[hIdx] || ''} onChange={e => {
                            const newValues = [...(formData.scholarships.earlyBird?.values || [])];
                            newValues[hIdx] = e.target.value;
                            updateSection('scholarships', {...formData.scholarships, earlyBird: {...formData.scholarships.earlyBird, values: newValues}});
                          }} className="w-full border p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                        </div>
                      ))}
                    </div>
                 </div>
               </div>

               <div className="bg-white p-4 border border-dashed">
                 <h4 className="font-black text-xs uppercase text-gray-500 mb-4">Important Notes & Instructions</h4>
                 <NestedListEditor 
                    label="Notes"
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

          {activeSection === 'faq' && (
            <NestedListEditor 
              label="Course Questions"
              items={formData.faq.items}
              newItemTemplate={{ q: '', a: '' }}
              fields={[{key: 'q', label: 'Question'}, {key: 'a', label: 'Answer'}]}
              onUpdate={items => updateSection('faq', {...formData.faq, items: items})}
            />
          )}

           {activeSection === 'whyJoin' && (
             <div className="space-y-6">
               <TitleEditor label="Why Join Section" value={formData.whyJoin.sectionTitle} onChange={val => updateSection('whyJoin', {...formData.whyJoin, sectionTitle: val})} />
               <div>
                  <label className="block text-[10px] text-gray-400 uppercase mb-2">Subtitle</label>
                  <input type="text" value={formData.whyJoin.subtitle} onChange={e => updateSection('whyJoin', {...formData.whyJoin, subtitle: e.target.value})} className="w-full border p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Unlock your potential" />
               </div>
               <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-3">Key Reasons</p>
                {formData.whyJoin.reasons?.map((r, idx) => (
                  <div key={idx} className="bg-white p-4 border relative">
                    <button onClick={() => updateSection('whyJoin', {...formData.whyJoin, reasons: formData.whyJoin.reasons.filter((_, i) => i !== idx)})} className="absolute top-2 right-2 text-red-300"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-[10px] block mb-1 uppercase">Title</label>
                        <input type="text" value={r.title} onChange={e => { const n = [...formData.whyJoin.reasons]; n[idx].title = e.target.value; updateSection('whyJoin', {...formData.whyJoin, reasons: n})}} className="w-full border p-2 text-xs font-bold" />
                      </div>
                      <div>
                        <label className="text-[10px] block mb-1 uppercase">Description</label>
                        <textarea value={r.desc} onChange={e => { const n = [...formData.whyJoin.reasons]; n[idx].desc = e.target.value; updateSection('whyJoin', {...formData.whyJoin, reasons: n})}} className="w-full border p-2 text-xs h-16" />
                      </div>
                      <div>
                        <label className="text-[10px] block mb-1 uppercase">Icon</label>
                        <IconPicker value={r.icon} onChange={val => { const n = [...formData.whyJoin.reasons]; n[idx].icon = val; updateSection('whyJoin', {...formData.whyJoin, reasons: n})}} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateSection('whyJoin', {...formData.whyJoin, reasons: [...(formData.whyJoin.reasons || []), { icon: 'Brain', title: '', desc: '' }]})} className="text-[10px] font-bold text-blue-600 flex items-center gap-1"><Plus size={14} /> ADD REASON</button>
              </div>
             </div>
          )}

          {activeSection === 'uniqueFeatures' && (
            <div className="space-y-6">
              <TitleEditor label="Features Section" value={formData.uniqueFeatures.sectionTitle} onChange={val => updateSection('uniqueFeatures', {...formData.uniqueFeatures, sectionTitle: val})} />
              <div>
                <label className="block text-[10px] text-gray-400 uppercase mb-2">Subtitle</label>
                <input type="text" value={formData.uniqueFeatures.subtitle} onChange={e => updateSection('uniqueFeatures', {...formData.uniqueFeatures, subtitle: e.target.value})} className="w-full border p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Setting us apart" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 uppercase mb-2">Features Background</label>
                <div className="flex gap-2">
                  <input type="text" value={formData.uniqueFeatures.bgImage} onChange={e => updateSection('uniqueFeatures', {...formData.uniqueFeatures, bgImage: e.target.value})} className="flex-1 border p-2 text-xs" />
                  <MediaUploader category="courses" onUploadSuccess={url => updateSection('uniqueFeatures', {...formData.uniqueFeatures, bgImage: url})} />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-3">Unique Points</p>
                {formData.uniqueFeatures.features?.map((f, idx) => (
                  <div key={idx} className="bg-white p-4 border relative">
                    <button onClick={() => updateSection('uniqueFeatures', {...formData.uniqueFeatures, features: formData.uniqueFeatures.features.filter((_, i) => i !== idx)})} className="absolute top-2 right-2 text-red-300"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] block mb-1 font-bold">Number (e.g. 01)</label>
                        <input type="text" value={f.num} onChange={e => { const n = [...formData.uniqueFeatures.features]; n[idx].num = e.target.value; updateSection('uniqueFeatures', {...formData.uniqueFeatures, features: n})}} className="w-full border p-2 text-xs" />
                      </div>
                      <div>
                        <label className="text-[10px] block mb-1 font-bold">Title</label>
                        <input type="text" value={f.title} onChange={e => { const n = [...formData.uniqueFeatures.features]; n[idx].title = e.target.value; updateSection('uniqueFeatures', {...formData.uniqueFeatures, features: n})}} className="w-full border p-2 text-xs font-bold" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] block mb-1 font-bold">Description</label>
                        <textarea value={f.desc} onChange={e => { const n = [...formData.uniqueFeatures.features]; n[idx].desc = e.target.value; updateSection('uniqueFeatures', {...formData.uniqueFeatures, features: n})}} className="w-full border p-2 text-xs h-16" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] block mb-1 font-bold">Icon</label>
                        <IconPicker value={f.icon} onChange={val => { const n = [...formData.uniqueFeatures.features]; n[idx].icon = val; updateSection('uniqueFeatures', {...formData.uniqueFeatures, features: n})}} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateSection('uniqueFeatures', {...formData.uniqueFeatures, features: [...(formData.uniqueFeatures.features || []), { num: '01', icon: 'Star', title: '', desc: '' }]})} className="text-[10px] font-bold text-blue-600 flex items-center gap-1"><Plus size={14} /> ADD FEATURE</button>
              </div>
            </div>
          )}

          {activeSection === 'applySteps' && (
            <div className="space-y-6">
              <TitleEditor label="How to Apply Section" value={formData.applySteps.sectionTitle} onChange={val => updateSection('applySteps', {...formData.applySteps, sectionTitle: val})} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase mb-1">Guide Subtitle (Register Online)</label>
                  <input type="text" value={formData.applySteps.guideLabel} onChange={e => updateSection('applySteps', {...formData.applySteps, guideLabel: e.target.value})} className="w-full border p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase mb-1">CTA Label</label>
                  <input type="text" value={formData.applySteps.ctaLabel} onChange={e => updateSection('applySteps', {...formData.applySteps, ctaLabel: e.target.value})} className="w-full border p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase mb-1">Background Image</label>
                  <div className="flex gap-2">
                    <input type="text" value={formData.applySteps.bgImage} onChange={e => updateSection('applySteps', {...formData.applySteps, bgImage: e.target.value})} className="flex-1 border p-2 text-sm" />
                    <MediaUploader category="courses" onUploadSuccess={url => updateSection('applySteps', {...formData.applySteps, bgImage: url})} />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-3">Application Steps</p>
                {formData.applySteps.steps?.map((s, idx) => (
                  <div key={idx} className="bg-white p-4 border relative">
                    <button onClick={() => updateSection('applySteps', {...formData.applySteps, steps: formData.applySteps.steps.filter((_, i) => i !== idx)})} className="absolute top-2 right-2 text-red-300"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] block mb-1 font-bold">Step #</label>
                        <input type="text" value={s.step} onChange={e => { const n = [...formData.applySteps.steps]; n[idx].step = e.target.value; updateSection('applySteps', {...formData.applySteps, steps: n})}} className="w-full border p-2 text-xs" />
                      </div>
                      <div>
                        <label className="text-[10px] block mb-1 font-bold">Label</label>
                        <input type="text" value={s.label} onChange={e => { const n = [...formData.applySteps.steps]; n[idx].label = e.target.value; updateSection('applySteps', {...formData.applySteps, steps: n})}} className="w-full border p-2 text-xs font-bold" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] block mb-1 font-bold">Instructions</label>
                        <textarea value={s.desc} onChange={e => { const n = [...formData.applySteps.steps]; n[idx].desc = e.target.value; updateSection('applySteps', {...formData.applySteps, steps: n})}} className="w-full border p-2 text-xs h-16" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] block mb-1 font-bold">Icon</label>
                        <IconPicker value={s.icon} onChange={val => { const n = [...formData.applySteps.steps]; n[idx].icon = val; updateSection('applySteps', {...formData.applySteps, steps: n})}} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateSection('applySteps', {...formData.applySteps, steps: [...(formData.applySteps.steps || []), { icon: 'UserCheck', step: '1', label: '', desc: '' }]})} className="text-[10px] font-bold text-blue-600 flex items-center gap-1"><Plus size={14} /> ADD STEP</button>
              </div>
            </div>
          )}

      </Modal>
    </div>
  );
}
