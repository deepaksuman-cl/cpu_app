'use client';
import Modal from '@/components/admin/ui/Modal';
import MediaUploader from '@/components/admin/MediaUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import IconPicker from '@/components/admin/ui/IconPicker';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Save, CheckCircle2, AlertCircle, Plus, Trash2, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import { createSchool, updateSchool } from '@/lib/actions/schoolActions';

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
                    <MediaUploader category="schools" onUploadSuccess={url => {
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

export default function SchoolBuilderForm({ initialData = null }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState(initialData || {
    name: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    breadcrumb: [],
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
  });

  const updateSection = useCallback((section, data) => {
    setFormData(prev => ({ ...prev, [section]: data }));
  }, []);

  const handleSave = async () => {
    if (!formData.name) return alert("School name is required.");
    setIsSaving(true);
    try {
      const result = initialData?._id ? await updateSchool(initialData._id, formData) : await createSchool(formData);
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
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight border-b-2 border-gray-200 pb-4">School Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase mb-2">School Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-blue-600 outline-none rounded-none bg-gray-50" />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase mb-2">Slug</label>
            <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-blue-600 outline-none rounded-none bg-gray-50 font-mono" />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase mb-2">Meta Title</label>
            <input type="text" placeholder="e.g. School of Computer Applications | CP University" value={formData.metaTitle} onChange={(e) => setFormData({...formData, metaTitle: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-blue-600 outline-none rounded-none bg-gray-50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-gray-500 uppercase mb-2">Meta Description</label>
            <textarea placeholder="e.g. Learn about our industry-aligned programs, expert faculty, and state-of-the-art labs..." value={formData.metaDescription} onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} className="w-full border border-gray-300 p-3 text-sm h-24 focus:border-blue-600 outline-none rounded-none bg-gray-50 resize-none" />
          </div>
          
          <div className="md:col-span-2 pt-4 border-t border-gray-100">
            <NestedListEditor 
              label="Breadcrumb Paths"
              items={formData.breadcrumb}
              newItemTemplate={{ label: '', link: '' }}
              fields={[{key: 'label', label: 'Label'}, {key: 'link', label: 'Link (e.g. /schools)'}]}
              onUpdate={items => setFormData({...formData, breadcrumb: items})}
            />
          </div>
        </div>
      </div>

      {/* Structured Sections List */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight px-2">Page Content Sections</h2>
        <div className="grid grid-cols-1 gap-3">
          <SectionCard id="hero" title="Hero Section" description="Banner, main title, CTAs and background image." isComplete={!!formData.hero?.title?.main} />
          <SectionCard id="stats" title="Quick Stats" description="University-wide numbers and statistics icons." isComplete={formData.stats?.length > 0} />
          <SectionCard id="about" title="Vision & Mission" description="School's core values, vision text and mission points." isComplete={!!formData.about?.vision?.text} />
          <SectionCard id="programmes" title="Programmes" description="Manage course levels and associated programs." isComplete={formData.programmes?.levels?.length > 0} />
          <SectionCard id="placements" title="Placements" description="Placement statistics and student list." isComplete={formData.placements?.list?.length > 0} />
          <SectionCard id="alumni" title="Alumni" description="Voice of our successful graduates." isComplete={formData.alumni?.list?.length > 0} />
          <SectionCard id="industry" title="Industry Partners" description="Logos and names of corporate tie-ups." isComplete={formData.industry?.partners?.length > 0} />
          <SectionCard id="research" title="Research & Development" description="Patents, papers and research highlights." isComplete={formData.research?.stats?.length > 0} />
          <SectionCard id="community" title="Community & Culture" description="Social life, events and campus vibe." isComplete={formData.community?.description?.length > 0} />
          <SectionCard id="infrastructure" title="Infrastructure" description="Labs, classrooms and facility highlights." isComplete={formData.infrastructure?.list?.length > 0} />
          <SectionCard id="testimonials" title="Testimonials" description="Student reviews and feedback." isComplete={formData.testimonials?.list?.length > 0} />
          <SectionCard id="exploreDepartment" title="Explore Department" description="Manage Quick Links, Highlights and specialized wings for this department." isComplete={formData.exploreDepartment?.items?.length > 0} />
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-6 shadow-2xl z-12 flex justify-end px-12">
        <button onClick={handleSave} disabled={isSaving} className="bg-blue-600 text-white px-12 py-4 font-black text-sm uppercase tracking-widest hover:bg-blue-800 transition-all disabled:opacity-50 flex items-center gap-3 rounded-none shadow-lg">
          {isSaving ? 'Saving...' : <><Save size={20} /> Save School</>}
        </button>
      </div>

      {/* Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Edit ${activeSection?.toUpperCase()}`}
        footer={
          <>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Draft changes preserved inside modal</p>
            <button onClick={() => setIsModalOpen(false)} className="bg-gray-900 text-white px-8 py-2 font-black text-xs uppercase hover:bg-black transition-all rounded-none">
              APPLY CHANGES
            </button>
          </>
        }
      >
          {activeSection === 'hero' && (
            <div className="space-y-6">
              <TitleEditor label="Hero Title" value={formData.hero.title} onChange={val => updateSection('hero', {...formData.hero, title: val})} />
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase mb-2">Hero Subtitle</label>
                <input type="text" value={formData.hero.subtitle} onChange={e => updateSection('hero', {...formData.hero, subtitle: e.target.value})} className="w-full border border-gray-300 p-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Shaping the Future of Tech" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase mb-2">Badge Text</label>
                  <input type="text" value={formData.hero.badge} onChange={e => updateSection('hero', {...formData.hero, badge: e.target.value})} className="w-full border border-gray-300 p-3 bg-white" />
                </div>
                <div>
                   <label className="block text-xs font-black text-gray-500 uppercase mb-2">Background Image URL</label>
                   <div className="flex gap-2">
                     <input type="text" value={formData.hero.bgImage} onChange={e => updateSection('hero', {...formData.hero, bgImage: e.target.value})} className="flex-1 border border-gray-300 p-3 bg-white" />
                     <MediaUploader category="schools" onUploadSuccess={url => updateSection('hero', {...formData.hero, bgImage: url})} />
                   </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase mb-2">Description</label>
                <textarea value={formData.hero.description} onChange={e => updateSection('hero', {...formData.hero, description: e.target.value})} className="w-full border border-gray-300 p-3 bg-white h-24" />
              </div>
              <NestedListEditor 
                label="Call to Action Buttons"
                items={formData.hero.cta}
                newItemTemplate={{ label: '', link: '#', primary: false }}
                fields={[{key: 'label', label: 'Button Label'}, {key: 'link', label: 'Link URL'}, {key: 'primary', label: 'Is Primary? (true/false)'}]}
                onUpdate={items => updateSection('hero', {...formData.hero, cta: items})}
              />

              <div className="pt-4 border-t border-gray-200">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-3">Hero Quick Stats (Course Pages)</p>
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

          {activeSection === 'stats' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {formData.stats?.map((s, idx) => (
                  <div key={idx} className="bg-white border p-4 group relative">
                    <button onClick={() => updateSection('stats', formData.stats.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-red-300 opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">Value (e.g. 50+)</label>
                        <input type="text" value={s.value} onChange={e => { const ns = [...formData.stats]; ns[idx].value = e.target.value; updateSection('stats', ns); }} className="w-full border p-2 text-sm" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">Label (e.g. Labs)</label>
                        <input type="text" value={s.label} onChange={e => { const ns = [...formData.stats]; ns[idx].label = e.target.value; updateSection('stats', ns); }} className="w-full border p-2 text-sm" />
                      </div>
                      <div className="z-[60]">
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">Icon</label>
                        <IconPicker value={s.icon} onChange={val => { const ns = [...formData.stats]; ns[idx].icon = val; updateSection('stats', ns); }} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateSection('stats', [...formData.stats, { value: '', label: '', icon: 'BarChart' }])} className="w-full border-2 border-dashed border-gray-200 p-4 text-gray-400 hover:text-blue-500 hover:border-blue-200 transition-all font-bold text-xs">
                  + ADD NEW STAT CARD
                </button>
              </div>
            </div>
          )}

          {activeSection === 'about' && (
            <div className="space-y-8">
              <div className="bg-white p-6 border border-gray-200">
                <h3 className="font-bold text-blue-900 border-b pb-2 mb-4">Vision Section</h3>
                <TitleEditor label="Vision Title" value={formData.about.vision.title} onChange={val => updateSection('about', {...formData.about, vision: {...formData.about.vision, title: val}})} />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex-1">
                    <label className="text-[10px] block mb-1 font-bold">Label</label>
                    <input type="text" placeholder="Label" value={formData.about.vision.label} onChange={e => updateSection('about', {...formData.about, vision: {...formData.about.vision, label: e.target.value}})} className="w-full border p-2" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] block mb-1 font-bold">Icon</label>
                    <IconPicker value={formData.about.vision.icon} onChange={val => updateSection('about', {...formData.about, vision: {...formData.about.vision, icon: val}})} />
                  </div>
                </div>
                <div className="bg-white border p-4 shadow-sm mb-4">
                  <label className="block text-[10px] font-black text-blue-900 uppercase mb-4">Vision Statement (Rich Text)</label>
                  <RichTextEditor 
                    value={formData.about.vision.text} 
                    onChange={content => updateSection('about', {...formData.about, vision: {...formData.about.vision, text: content}})} 
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
              <div className="bg-white p-6 border border-gray-200">
                <h3 className="font-bold text-orange-900 border-b pb-2 mb-4">Mission Section</h3>
                <TitleEditor label="Mission Title" value={formData.about.mission.title} onChange={val => updateSection('about', {...formData.about, mission: {...formData.about.mission, title: val}})} />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex-1">
                    <label className="text-[10px] block mb-1 font-bold">Label</label>
                    <input type="text" placeholder="Label" value={formData.about.mission.label} onChange={e => updateSection('about', {...formData.about, mission: {...formData.about.mission, label: e.target.value}})} className="w-full border p-2" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] block mb-1 font-bold">Icon</label>
                    <IconPicker value={formData.about.mission.icon} onChange={val => updateSection('about', {...formData.about, mission: {...formData.about.mission, icon: val}})} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-orange-900 uppercase mb-4 tracking-widest leading-relaxed">
                    Our Mission Statement (Full Rich Text Editor)
                  </label>
                  <div className="bg-white border shadow-sm rounded-none overflow-hidden">
                    <RichTextEditor 
                      value={formData.about.mission.points?.join('') || ''}
                      onChange={content => updateSection('about', {
                        ...formData.about, 
                        mission: {
                          ...formData.about.mission, 
                          points: [content]
                        }
                      })}
                    />
                  </div>
                  <p className="mt-2 text-[9px] text-gray-400 italic px-1">Note: Use the editor to add bullet points, bold text, etc. This replaces the old line-by-line list.</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'programmes' && (
            <div className="space-y-6">
              <TitleEditor label="Section Title" value={formData.programmes.title} onChange={val => updateSection('programmes', {...formData.programmes, title: val})} />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex-1">
                  <label className="text-[10px] block mb-1 font-bold uppercase">Section Subtitle</label>
                  <input type="text" placeholder="Subtitle" value={formData.programmes.subtitle} onChange={e => updateSection('programmes', {...formData.programmes, subtitle: e.target.value})} className="border p-2 w-full" />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] block mb-1 font-bold uppercase">Background Image</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="BG Image URL" value={formData.programmes.bgImage} onChange={e => updateSection('programmes', {...formData.programmes, bgImage: e.target.value})} className="border p-2 flex-1" />
                    <MediaUploader category="schools" onUploadSuccess={url => updateSection('programmes', {...formData.programmes, bgImage: url})} />
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 border shadow-sm">
                <label className="block text-xs font-black text-gray-800 uppercase mb-4">Programme Overview (Rich Text)</label>
                <RichTextEditor 
                  value={formData.programmes.description} 
                  onChange={content => updateSection('programmes', {...formData.programmes, description: content})} 
                />
              </div>
              
              <div className="mt-8 border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-black text-gray-900 uppercase text-xs">Edit Qualification Levels</h4>
                  <button onClick={() => updateSection('programmes', {...formData.programmes, levels: [...formData.programmes.levels, { label: '', icon: 'GraduationCap', courses: [] }]})} className="bg-blue-600 text-white px-3 py-1 text-[10px] font-bold">ADD LEVEL</button>
                </div>
                <div className="space-y-4">
                  {formData.programmes.levels.map((level, lIdx) => (
                    <div key={lIdx} className="bg-white border p-4 shadow-sm">
                      <div className="flex gap-2 mb-4">
                        <input type="text" placeholder="Level Label (e.g. Undergrad)" value={level.label} onChange={e => {
                          const nl = [...formData.programmes.levels]; nl[lIdx].label = e.target.value; updateSection('programmes', {...formData.programmes, levels: nl});
                        }} className="border p-2 text-sm flex-1 font-bold" />
                        <div className="w-48">
                          <IconPicker value={level.icon} onChange={val => {
                             const nl = [...formData.programmes.levels]; nl[lIdx].icon = val; updateSection('programmes', {...formData.programmes, levels: nl});
                          }} />
                        </div>
                        <button onClick={() => updateSection('programmes', {...formData.programmes, levels: formData.programmes.levels.filter((_, i) => i !== lIdx)})} className="text-red-500 font-bold p-2"><Trash2 size={18}/></button>
                      </div>
                      <NestedListEditor 
                        label={`Courses in ${level.label || 'this level'}`}
                        items={level.courses}
                        newItemTemplate={{ name: '', slug: '', description: '', specializations: [] }}
                        fields={[
                          {key: 'name', label: 'Course Name'}, 
                          {key: 'slug', label: 'Course Slug'}, 
                          {key: 'description', label: 'Short Description'},
                        ]}
                        onUpdate={cItems => {
                          const nl = [...formData.programmes.levels]; nl[lIdx].courses = cItems; updateSection('programmes', {...formData.programmes, levels: nl});
                        }}
                      />
                      {/* Specializations Editor */}
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-[10px] font-black uppercase text-gray-400 mb-3">Course Specializations (Comma Separated)</p>
                        <div className="space-y-3">
                          {level.courses.map((c, ci) => (
                            <div key={ci} className="bg-slate-50 p-2 border">
                              <label className="text-[10px] block mb-1 font-bold">{c.name}</label>
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
                                className="w-full border p-2 text-xs"
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
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[10px] block mb-1 font-bold uppercase">Badge Label</label>
                  <input type="text" placeholder="e.g. Placements" value={formData.placements.label} onChange={e => updateSection('placements', {...formData.placements, label: e.target.value})} className="w-full border p-2" />
                </div>
                <div>
                  <label className="text-[10px] block mb-1 font-bold uppercase">Section Subtitle</label>
                  <input type="text" placeholder="e.g. CPU Placement Records" value={formData.placements.subtitle} onChange={e => updateSection('placements', {...formData.placements, subtitle: e.target.value})} className="w-full border p-2" />
                </div>
              </div>
              <NestedListEditor 
                label="Student Placements"
                items={formData.placements.list}
                newItemTemplate={{ name: '', company: '', package: '', city: '', image: '', slug: '' }}
                fields={[
                  {key: 'name', label: 'Student Name'},
                  {key: 'company', label: 'Company'},
                  {key: 'package', label: 'Package'},
                  {key: 'image', label: 'Photo URL', type: 'image'},
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
                  <label className="text-[10px] block mb-1 font-bold uppercase">Badge Label</label>
                  <input type="text" placeholder="e.g. Our Alumni" value={formData.alumni.label} onChange={e => updateSection('alumni', {...formData.alumni, label: e.target.value})} className="w-full border p-2 mb-4" />
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
                  <label className="text-[10px] block mb-1 font-bold uppercase">Badge Label</label>
                  <input type="text" placeholder="e.g. Collaborations" value={formData.industry.label} onChange={e => updateSection('industry', {...formData.industry, label: e.target.value})} className="w-full border p-2 mb-4" />
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
                  <label className="text-[10px] block mb-1 font-bold uppercase">Badge Label</label>
                  <input type="text" placeholder="e.g. Eminence Research" value={formData.research.label} onChange={e => updateSection('research', {...formData.research, label: e.target.value})} className="w-full border p-2 mb-4" />
                </div>
                
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-gray-400">Research Statistics</p>
                  {formData.research.stats?.map((s, idx) => (
                    <div key={idx} className="flex gap-4 items-end bg-white p-3 border">
                      <div className="flex-1">
                        <label className="text-[10px] block mb-1">Value</label>
                        <input type="text" value={s.value} onChange={e => { const n = [...formData.research.stats]; n[idx].value = e.target.value; updateSection('research', {...formData.research, stats: n})}} className="w-full border p-2 text-xs" />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] block mb-1">Label</label>
                        <input type="text" value={s.label} onChange={e => { const n = [...formData.research.stats]; n[idx].label = e.target.value; updateSection('research', {...formData.research, stats: n})}} className="w-full border p-2 text-xs" />
                      </div>
                      <div className="w-40">
                        <label className="text-[10px] block mb-1">Icon</label>
                        <IconPicker value={s.icon} onChange={val => { const n = [...formData.research.stats]; n[idx].icon = val; updateSection('research', {...formData.research, stats: n})}} />
                      </div>
                      <button onClick={() => updateSection('research', {...formData.research, stats: formData.research.stats.filter((_, i) => i !== idx)})} className="text-red-400 p-2"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button onClick={() => updateSection('research', {...formData.research, stats: [...formData.research.stats, { value: '', label: '', icon: 'Search' }]})} className="text-[10px] font-bold text-blue-600 flex items-center gap-1"><Plus size={14} /> ADD RESEARCH STAT</button>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] text-gray-400 uppercase font-black">Research Gallery</label>
                    <button onClick={() => updateSection('research', {...formData.research, gallery: [...(formData.research.gallery || []), '']})} className="text-[10px] font-bold text-blue-600 flex items-center gap-1"><Plus size={14} /> ADD IMAGE</button>
                  </div>
                  <NestedListEditor 
                    label="Link Icons"
                    items={formData.research.gallery}
                    newItemTemplate={{ icon: 'FileText', label: '', link: '', slug: '' }}
                    fields={[
                      {key: 'icon', label: 'Icon', type: 'icon'},
                      {key: 'label', label: 'Label'},
                      {key: 'link', label: 'URL'},
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
                  <label className="text-[10px] block mb-1 font-bold uppercase">Badge Label</label>
                  <input type="text" placeholder="e.g. Community" value={formData.community.label} onChange={e => updateSection('community', {...formData.community, label: e.target.value})} className="w-full border p-2 mb-4" />
               </div>
                <div className="bg-white border p-4 shadow-sm mb-6">
                  <label className="block text-xs font-black text-gray-800 uppercase mb-4">Community Description (Rich Text)</label>
                  <RichTextEditor 
                    value={formData.community.description?.join('\n')} 
                    onChange={content => updateSection('community', {...formData.community, description: [content]})} 
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
                  <label className="text-[10px] block mb-1 font-bold uppercase">Badge Label</label>
                  <input type="text" placeholder="e.g. Campus" value={formData.infrastructure.label} onChange={e => updateSection('infrastructure', {...formData.infrastructure, label: e.target.value})} className="w-full border p-2 mb-4" />
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
                  <label className="text-[10px] block mb-1 font-bold uppercase">Badge Label</label>
                  <input type="text" placeholder="e.g. Testimonials" value={formData.testimonials.label} onChange={e => updateSection('testimonials', {...formData.testimonials, label: e.target.value})} className="w-full border p-2 mb-4" />
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
                <label className="block text-[10px] text-gray-400 uppercase mb-2">Subtitle</label>
                <input type="text" value={formData.exploreDepartment.subtitle} onChange={e => updateSection('exploreDepartment', {...formData.exploreDepartment, subtitle: e.target.value})} className="w-full border p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Discover our specialized wings" />
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

      </Modal>
    </div>
  );
}
