'use client';
import MediaUploader from '@/components/admin/MediaUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import IconPicker from '@/components/admin/ui/IconPicker';
import Modal from '@/components/admin/ui/Modal';
import { createSchool, updateSchool } from '@/lib/actions/schoolActions';
import { AlertCircle, CheckCircle2, Image as ImageIcon, Pencil, Plus, Save, Settings, Trash2, Layers, Box, Eye, Bot } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, FileText, Users } from 'lucide-react';
import { AiTeamEditor } from '../courses/AiSectionEditors';

// --- Shared Internal Components ---

const TitleEditor = ({ label, value = {}, onChange }) => (
  <div className="space-y-3 p-4 bg-[var(--bg-muted)] border-l-2 border-[var(--color-primary)] mb-4">
    <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div>
        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Main Title</label>
        <input type="text" value={value.main || ''} onChange={e => onChange({ ...value, main: e.target.value })} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" placeholder="e.g. Course Overview" />
      </div>
      <div>
        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Highlight Word</label>
        <input type="text" value={value.highlight || ''} onChange={e => onChange({ ...value, highlight: e.target.value })} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" placeholder="e.g. Overview" />
      </div>
      <div>
        <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Sky Highlight</label>
        <input type="text" value={value.skyHighlight || ''} onChange={e => onChange({ ...value, skyHighlight: e.target.value })} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" placeholder="Optional" />
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

const MediaListEditor = ({ value = [], onChange, label }) => (
  <div className="space-y-2 mt-3">
    <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">{label}</label>
    <div className="flex flex-wrap gap-2 border-l border-[var(--border-light)] pl-3">
      {value.map((url, idx) => (
        <div key={idx} className="relative group w-16 h-16 border border-[var(--border-default)] bg-[var(--bg-muted)] overflow-hidden">
          {url && <img src={url} className="w-full h-full object-contain" alt="Logo" />}
          <button
            type="button"
            onClick={() => onChange(value.filter((_, i) => i !== idx))}
            className="absolute top-0 right-0 bg-red-500 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 size={10} />
          </button>
        </div>
      ))}
      <div className="w-16 h-16 border-2 border-dashed border-[var(--border-default)] flex items-center justify-center hover:border-[var(--color-primary)] transition-colors">
        <MediaUploader
          multiple={true}
          category="schools"
          onUploadSuccess={urls => {
            const newUrls = Array.isArray(urls) ? urls : [urls];
            onChange([...value, ...newUrls]);
          }}
        />
      </div>
    </div>
  </div>
);

const NestedListEditor = ({ label, items = [], fields, onUpdate, newItemTemplate, hideBulkAdd = false }) => {
  const imageField = fields.find(f => f.type === 'image');

  // Normalize items to objects if they are strings (legacy support)
  const normalizedItems = (items || []).map(item => {
    if (typeof item === 'string') {
      return { ...newItemTemplate, [imageField?.key || 'url']: item };
    }
    return item || newItemTemplate;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-[var(--border-light)] pb-2">
        <h4 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</h4>
        <div className="flex items-center gap-2">
          {!hideBulkAdd && imageField && (
            <MediaUploader
              multiple={true}
              category="schools"
              buttonText="Bulk Add"
              onUploadSuccess={urls => {
                if (Array.isArray(urls)) {
                  const newItems = urls.map(url => ({ ...newItemTemplate, [imageField.key]: url }));
                  onUpdate([...normalizedItems, ...newItems]);
                }
              }}
            />
          )}
          <button onClick={() => onUpdate([...normalizedItems, newItemTemplate])} className="flex items-center justify-center gap-1 text-[10px] h-[34px] font-bold text-[var(--text-inverse)] bg-[var(--text-primary)] hover:bg-[var(--text-secondary)] transition-colors px-3 uppercase tracking-wide rounded-none">
            <Plus size={14} /> Row
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {normalizedItems.map((item, idx) => (
          <div key={idx} className="border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 relative group hover:border-[var(--border-dark)] transition-colors rounded-none">
            <button onClick={() => onUpdate(normalizedItems.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1 transition-colors bg-[var(--bg-surface)] border border-transparent hover:border-[var(--color-danger-light)] rounded-none">
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
                        const newItems = [...normalizedItems];
                        newItems[idx] = { ...newItems[idx], [field.key]: val };
                        onUpdate(newItems);
                      }}
                    />
                  ) : field.type === 'image' ? (
                    <div className="space-y-2">
                      <div className="border border-[var(--border-default)] bg-[var(--bg-muted)] overflow-hidden h-24 flex items-center justify-center">
                        {typeof item[field.key] === 'string' && item[field.key] ? (
                          <img src={item[field.key]} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                          <ImageIcon size={24} className="text-[var(--text-muted)]" />
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input type="text" value={typeof item[field.key] === 'string' ? item[field.key] : ''} onChange={e => {
                          const newItems = [...normalizedItems];
                          newItems[idx] = { ...newItems[idx], [field.key]: e.target.value };
                          onUpdate(newItems);
                        }} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" placeholder="Image URL..." />
                        <div className="w-full sm:w-auto shrink-0">
                          <MediaUploader category="schools" onUploadSuccess={url => {
                            const newItems = [...normalizedItems];
                            newItems[idx] = { ...newItems[idx], [field.key]: url };
                            onUpdate(newItems);
                          }} />
                        </div>
                      </div>
                    </div>
                  ) : field.type === 'richText' ? (
                    <RichTextEditor
                      value={item[field.key] || ''}
                      onChange={val => {
                        const newItems = [...normalizedItems];
                        newItems[idx] = { ...newItems[idx], [field.key]: val };
                        onUpdate(newItems);
                      }}
                      useProse={item.useProse !== false}
                      onProseChange={val => {
                        const newItems = [...normalizedItems];
                        newItems[idx] = { ...newItems[idx], useProse: val };
                        onUpdate(newItems);
                      }}
                    />
                  ) : field.type === 'stringList' ? (
                    <StringListEditor
                      label={field.label}
                      value={item[field.key] || []}
                      onChange={val => {
                        const newItems = [...normalizedItems];
                        newItems[idx] = { ...newItems[idx], [field.key]: val };
                        onUpdate(newItems);
                      }}
                    />
                  ) : (
                    <input type={field.type || 'text'} value={item[field.key] || ''} onChange={e => {
                      const newItems = [...normalizedItems];
                      newItems[idx] = { ...newItems[idx], [field.key]: e.target.value };
                      onUpdate(newItems);
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

const TeamMembersListEditor = ({ label, items = [], fields, onUpdate, newItemTemplate }) => {
  const imageField = fields.find(f => f.type === 'image');
  const normalizedItems = (items || []).map(item => {
    if (typeof item === 'string') return { ...newItemTemplate, [imageField?.key || 'url']: item };
    return item || newItemTemplate;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-[var(--border-light)] pb-2">
        <h4 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</h4>
        <div className="flex items-center gap-2">
          <button onClick={() => onUpdate([...normalizedItems, newItemTemplate])} className="flex items-center justify-center gap-1 text-[10px] h-[34px] font-bold text-[var(--text-inverse)] bg-[var(--text-primary)] hover:bg-[var(--text-secondary)] transition-colors px-3 uppercase tracking-wide rounded-none">
            <Plus size={14} /> Row
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {normalizedItems.map((item, idx) => (
          <div key={idx} className="border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 relative group hover:border-[var(--border-dark)] transition-colors rounded-none">
            <button onClick={() => onUpdate(normalizedItems.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1 transition-colors bg-[var(--bg-surface)] border border-transparent hover:border-[var(--color-danger-light)] rounded-none">
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {fields.map(field => (
                <div key={field.key} className={field.type === 'richText' || field.type === 'stringList' ? 'md:col-span-2' : ''}>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">{field.label}</label>
                  {field.type === 'icon' ? (
                    <IconPicker value={item[field.key]} onChange={val => {
                        const newItems = [...normalizedItems]; newItems[idx] = { ...newItems[idx], [field.key]: val }; onUpdate(newItems);
                    }} />
                  ) : field.type === 'image' ? (
                    <div className="space-y-2">
                      <div className="border border-[var(--border-default)] bg-[var(--bg-muted)] overflow-hidden h-24 flex items-center justify-center">
                        {typeof item[field.key] === 'string' && item[field.key] ? (
                          <img src={item[field.key]} className="w-full h-full object-cover" alt="Preview" />
                        ) : ( <ImageIcon size={24} className="text-[var(--text-muted)]" /> )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input type="text" value={typeof item[field.key] === 'string' ? item[field.key] : ''} onChange={e => {
                          const newItems = [...normalizedItems]; newItems[idx] = { ...newItems[idx], [field.key]: e.target.value }; onUpdate(newItems);
                        }} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" placeholder="Image URL..." />
                        <div className="w-full sm:w-auto shrink-0">
                          <MediaUploader category="schools" onUploadSuccess={url => {
                            const newItems = [...normalizedItems]; newItems[idx] = { ...newItems[idx], [field.key]: url }; onUpdate(newItems);
                          }} />
                        </div>
                      </div>
                    </div>
                  ) : field.type === 'richText' ? (
                    <RichTextEditor value={item[field.key] || ''} onChange={val => {
                        const newItems = [...normalizedItems]; newItems[idx] = { ...newItems[idx], [field.key]: val }; onUpdate(newItems);
                    }} useProse={item.useProse !== false} onProseChange={val => {
                        const newItems = [...normalizedItems]; newItems[idx] = { ...newItems[idx], useProse: val }; onUpdate(newItems);
                    }} />
                  ) : field.type === 'stringList' ? (
                    <StringListEditor label={field.label} value={item[field.key] || []} onChange={val => {
                        const newItems = [...normalizedItems]; newItems[idx] = { ...newItems[idx], [field.key]: val }; onUpdate(newItems);
                    }} />
                  ) : field.type === 'mediaList' ? (
                    <MediaListEditor value={item[field.key] || []} onChange={val => {
                        const newItems = [...normalizedItems]; newItems[idx] = { ...newItems[idx], [field.key]: val }; onUpdate(newItems);
                    }} label={field.label} />
                  ) : (
                    <input type={field.type || 'text'} value={item[field.key] || ''} onChange={e => {
                      const newItems = [...normalizedItems]; newItems[idx] = { ...newItems[idx], [field.key]: e.target.value }; onUpdate(newItems);
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
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [formData, setFormData] = useState(() => {
    const defaults = {
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
      testimonials: {
        title: 'Testimonials',
        highlight: 'Testimonials',
        tagline: 'OUR STUDENTS SPEAK',
        location: 'LADYBIRD, DELHI',
        packageLabel: 'OFFERED PACKAGE',
        verifyLabel: 'VERIFIED STUDENT',
        testimonials: []
      },
      team: {
        title: 'Mentorship Board',
        subtitle: 'Guided by the Best in AI & Technology',
        members: []
      }
    };
    // Base merge for initial state
    const merged = initialData ? { ...defaults, ...initialData } : { ...defaults };

    // Ensure system sections are not null if they were null in the DB
    if (initialData) {
      if (initialData.team === null) merged.team = defaults.team;
      if (initialData.hero === null) merged.hero = defaults.hero;
      if (initialData.stats === null) merged.stats = defaults.stats;
      if (initialData.exploreDepartment === null) merged.exploreDepartment = defaults.exploreDepartment;
      if (initialData.about === null) merged.about = defaults.about;
      if (initialData.programmes === null) merged.programmes = defaults.programmes;
      if (initialData.placements === null) merged.placements = defaults.placements;
      if (initialData.alumni === null) merged.alumni = defaults.alumni;
      if (initialData.industry === null) merged.industry = defaults.industry;
      if (initialData.research === null) merged.research = defaults.research;
      if (initialData.community === null) merged.community = defaults.community;
      if (initialData.infrastructure === null) merged.infrastructure = defaults.infrastructure;
      if (initialData.testimonials === null) merged.testimonials = defaults.testimonials;
    }

    // Merge relational data if available
    const testimonialsArr = initialData?.testimonialsRel || [];
    if (testimonialsArr.length > 0) {
      merged.testimonials = {
        ...merged.testimonials,
        // We populate both for dual compatibility if needed, 
        // but the form expects 'testimonials' based on current modal setup.
        testimonials: testimonialsArr.map(t => ({
          name: t.studentName, quote: t.reviewText, company: t.company, batch: t.batch,
          img: t.image, rating: t.rating, course: t.course, package: t.package,
          slug: t.slug || ''
        })),
        list: testimonialsArr.map(t => ({ // Also sync to 'list' for backend sync compatibility
          name: t.studentName, quote: t.reviewText, company: t.company, batch: t.batch,
          img: t.image, rating: t.rating, course: t.course, package: t.package,
          slug: t.slug || ''
        }))
      };
    } else {
      // Fallback: If no relational data, ensure JSON data is normalized
      if (merged.testimonials && !merged.testimonials.testimonials && merged.testimonials.list) {
        merged.testimonials.testimonials = merged.testimonials.list;
      } else if (merged.testimonials && merged.testimonials.testimonials && !merged.testimonials.list) {
        merged.testimonials.list = merged.testimonials.testimonials;
      }
    }
    if (initialData?.placementPartnersRel?.length > 0) {
      merged.placements = {
        ...merged.placements,
        list: initialData.placementPartnersRel.map(p => ({
          name: p.studentName,
          company: p.companyName,
          package: p.packageOffered,
          city: p.city,
          img: p.logoUrl,
          course: p.courseName || '',
          youtubeLink: p.youtubeLink || '',
          designation: p.designation || '',
          classOf: p.classOf || ''
        }))
      };
    }
    if (initialData?.facilitiesRel?.length > 0) {
      merged.infrastructure = {
        ...merged.infrastructure,
        list: initialData.facilitiesRel.map(f => ({
          title: f.name, image: f.image, desc: f.description, slug: f.slug || ''
        }))
      };
    }

    const defaultOrder = [
      'hero', 'stats', 'about', 'programmes', 'placements', 'alumni',
      'industry', 'research', 'community', 'infrastructure', 'testimonials', 'team', 'exploreDepartment'
    ];

    // Merge layoutOrder: Start with initialData or defaultOrder
    let finalOrder = initialData?.layoutOrder || defaultOrder;

    // Auto-inject missing system sections (like 'team') into existing layouts
    const missingSections = defaultOrder.filter(id => !finalOrder.includes(id));
    if (missingSections.length > 0) {
      finalOrder = [...finalOrder, ...missingSections];
    }

    return {
      ...merged,
      layoutOrder: finalOrder,
      customSections: merged.customSections || {}
    };
  });

  const updateSection = useCallback((section, data) => {
    setFormData(prev => ({ ...prev, [section]: data }));
  }, []);

  const addSystemSection = (sectionId) => {
    if (formData.layoutOrder.includes(sectionId)) return alert("Section already exists in layout.");
    setFormData(prev => ({ ...prev, layoutOrder: [...prev.layoutOrder, sectionId] }));
    setIsPickerOpen(false);
  };

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

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(formData.layoutOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFormData(prev => ({ ...prev, layoutOrder: items }));
  };

  const addCustomBlock = () => {
    const id = `custom_${Date.now()}`;
    const newOrder = [...formData.layoutOrder, id];
    const newCustoms = { ...formData.customSections, [id]: { title: 'New Custom Block', content: '', handle: 'custom' } };
    setFormData(prev => ({ ...prev, layoutOrder: newOrder, customSections: newCustoms }));
    setActiveSection(id);
    setIsModalOpen(true);
  };

  const SectionCard = ({ id, title, description, isComplete, isHidden, onToggleHide, dragHandleProps, isCustom }) => (
    <div className={`border border-[var(--border-default)] p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-[var(--color-primary)] transition-all rounded-none group shadow-[var(--shadow-sm)] ${isHidden ? 'opacity-60 bg-gray-50' : 'bg-[var(--bg-surface)]'}`}>
      <div className="flex items-center gap-4">
        <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors p-1">
          <GripVertical size={20} />
        </div>
        <div className={`w-8 h-8 flex items-center justify-center rounded-none shrink-0 ${isComplete ? 'bg-[var(--color-success-light)] text-[var(--color-success-dark)]' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'}`}>
          {isCustom ? <FileText size={16} /> : isComplete ? <CheckCircle2 size={16} strokeWidth={2.5} /> : <AlertCircle size={16} strokeWidth={2} />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[var(--text-primary)] text-[12px] uppercase tracking-wide leading-tight line-clamp-1">{title}</h3>
            {isHidden && <span className="text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 font-black uppercase tracking-tighter">Hidden</span>}
            {isCustom && <span className="text-[8px] bg-blue-100 text-blue-600 px-1.5 py-0.5 font-black uppercase tracking-tighter">Custom</span>}
          </div>
          <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 line-clamp-1 italic">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {isCustom ? (
          <button onClick={() => {
            const newOrder = formData.layoutOrder.filter(itemId => itemId !== id);
            const newCustoms = { ...formData.customSections };
            delete newCustoms[id];
            setFormData(prev => ({ ...prev, layoutOrder: newOrder, customSections: newCustoms }));
          }} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1.5 border border-transparent hover:border-[var(--color-danger-light)] transition-all"><Trash2 size={14} /></button>
        ) : (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!isHidden}
              onChange={(e) => onToggleHide(e.target.checked)}
              className="w-3.5 h-3.5 accent-[var(--color-primary)]"
            />
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest hidden sm:inline">Hide</span>
          </label>
        )}
        <button
          onClick={() => { setActiveSection(id); setIsModalOpen(true); }}
          className="px-4 py-2 border border-[var(--border-dark)] text-[var(--text-secondary)] font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] hover:text-[var(--bg-surface)] transition-all rounded-none flex items-center justify-center gap-1.5"
        >
          <Pencil size={12} strokeWidth={2} /> EDIT
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-[98%] lg:w-[95%] xl:w-[92%] mx-auto pb-28 space-y-6 px-4 mt-6">

      {/* --- Basic Configuration --- */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-5 shadow-[var(--shadow-sm)] space-y-5 rounded-none">
        <div className="flex items-center gap-2 border-b border-[var(--border-light)] pb-3">
          <Settings size={18} className="text-[var(--color-primary)]" />
          <h2 className="text-[14px] font-black text-[var(--text-primary)] uppercase tracking-wide">Base Config</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">School Name *</label>
            <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]" placeholder="e.g. School of Engineering" />
          </div>
          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Slug</label>
            <input type="text" value={formData.slug || ''} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-muted)] font-mono" placeholder="engineering" />
          </div>
          <div className="md:col-span-2 pt-3 border-t border-[var(--border-light)]">
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Meta Title</label>
            <input type="text" value={formData.metaTitle || ''} onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)] mb-3" placeholder="SEO Title..." />
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Meta Description</label>
            <textarea value={formData.metaDescription || ''} onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs h-20 focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)] resize-none" placeholder="SEO Description..." />
          </div>
          <div className="md:col-span-2 pt-3 border-t border-[var(--border-light)]">
            <NestedListEditor
              label="Breadcrumb Paths"
              items={formData.breadcrumb || []}
              newItemTemplate={{ label: '', link: '' }}
              fields={[{ key: 'label', label: 'Label' }, { key: 'link', label: 'Link (e.g. /schools)' }]}
              onUpdate={items => setFormData({ ...formData, breadcrumb: items })}
            />
          </div>
        </div>
      </div>

      {/* --- Dynamic Sections Layout (Drag & Drop) --- */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-3">
          <h2 className="text-[14px] font-black text-[var(--text-primary)] uppercase tracking-wide">Page Layout Sections</h2>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsPickerOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-[var(--border-dark)] text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--bg-muted)] hover:border-[var(--color-primary)] transition-all rounded-none text-[var(--text-primary)] flex-1 sm:flex-none"
            >
              <Layers size={14} className="text-[var(--color-primary)]" /> ADD SYSTEM SECTION
            </button>
            <button
              onClick={addCustomBlock}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-surface)] text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--text-secondary)] transition-all rounded-none flex-1 sm:flex-none"
            >
              <Plus size={14} strokeWidth={2.5} /> ADD CUSTOM CONTENT BLOCK
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections-list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {formData.layoutOrder.map((id, index) => {
                  const isCustom = id.startsWith('custom_');
                  let sectionProps = {};

                  if (isCustom) {
                    const customData = formData.customSections[id];
                    sectionProps = {
                      id,
                      title: customData?.title || 'Custom Block',
                      description: 'Custom rich text content.',
                      isComplete: !!customData?.content,
                      isCustom: true
                    };
                  } else {
                    // Mapping for fixed sections
                    const mappings = {
                      hero: { title: "Hero Header", description: "Top banner & title.", isComplete: !!formData.hero?.title?.main, isHidden: formData.hero?.hide, onToggleHide: (v) => updateSection('hero', { ...formData.hero, hide: v }) },
                      stats: { title: "Quick Stats", description: "University numbers.", isComplete: formData.stats?.length > 0, isHidden: formData.stats?.[0]?.hide, onToggleHide: (v) => { const n = [...(formData.stats || [])]; if (n[0]) n[0].hide = v; updateSection('stats', n); } },
                      about: { title: "Vision & Mission", description: "School's core values.", isComplete: !!formData.about?.vision?.text, isHidden: formData.about?.hide, onToggleHide: (v) => updateSection('about', { ...formData.about, hide: v }) },
                      programmes: { title: "Programmes", description: "Course levels & links.", isComplete: formData.programmes?.levels?.length > 0, isHidden: formData.programmes?.hide, onToggleHide: (v) => updateSection('programmes', { ...formData.programmes, hide: v }) },
                      placements: { title: "Placements", description: "Student placement list.", isComplete: formData.placements?.list?.length > 0, isHidden: formData.placements?.hide, onToggleHide: (v) => updateSection('placements', { ...formData.placements, hide: v }) },
                      alumni: { title: "Alumni", description: "Alumni success stories.", isComplete: formData.alumni?.list?.length > 0, isHidden: formData.alumni?.hide, onToggleHide: (v) => updateSection('alumni', { ...formData.alumni, hide: v }) },
                      industry: { title: "Industry Partners", description: "Logos of tie-ups.", isComplete: formData.industry?.partners?.length > 0, isHidden: formData.industry?.hide, onToggleHide: (v) => updateSection('industry', { ...formData.industry, hide: v }) },
                      research: { title: "Research & Dev", description: "Patents and stats.", isComplete: formData.research?.stats?.length > 0, isHidden: formData.research?.hide, onToggleHide: (v) => updateSection('research', { ...formData.research, hide: v }) },
                      community: { title: "Community", description: "Campus vibe & gallery.", isComplete: formData.community?.description?.length > 0, isHidden: formData.community?.hide, onToggleHide: (v) => updateSection('community', { ...formData.community, hide: v }) },
                      infrastructure: { title: "Infrastructure", description: "Labs & facilities.", isComplete: formData.infrastructure?.list?.length > 0, isHidden: formData.infrastructure?.hide, onToggleHide: (v) => updateSection('infrastructure', { ...formData.infrastructure, hide: v }) },
                      testimonials: { title: "Testimonials", description: "Student feedback.", isComplete: formData.testimonials?.list?.length > 0, isHidden: formData.testimonials?.hide, onToggleHide: (v) => updateSection('testimonials', { ...formData.testimonials, hide: v }) },
                      team: { title: "AI Mentorship", description: "The mentorship board.", isComplete: formData.team?.members?.length > 0, isHidden: formData.team?.hide, onToggleHide: (v) => updateSection('team', { ...formData.team, hide: v }) },
                      exploreDepartment: { title: "Department", description: "Specialized wings.", isComplete: formData.exploreDepartment?.items?.length > 0, isHidden: formData.exploreDepartment?.hide, onToggleHide: (v) => updateSection('exploreDepartment', { ...formData.exploreDepartment, hide: v }) }
                    };
                    sectionProps = { id, ...mappings[id] };
                  }

                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} className="transition-transform duration-200">
                          <SectionCard {...sectionProps} dragHandleProps={provided.dragHandleProps} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* --- Minimal Floating Save Bar --- */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end gap-3">
        {/* Live Preview Button */}
        {formData.slug && (
          <a
            href={`/schools/${formData.slug?.replace(/^\/|\/$/g, '').trim()}`}
            target="_blank"
            className="bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-dark)] px-4 py-2.5 font-bold text-[11px] uppercase tracking-widest hover:bg-[var(--bg-muted)] transition-all flex items-center justify-center gap-2 rounded-none shadow-xl"
          >
            <Eye size={16} strokeWidth={2.5} />
            LIVE PREVIEW
          </a>
        )}

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

      {/* --- Edit Modal --- */}
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


          {activeSection?.startsWith('custom_') && (
            <div className="space-y-6">
              <div className="bg-[var(--bg-muted)] p-5 border-l-2 border-[var(--color-primary)] rounded-none">
                <label className="block text-[10px] font-black text-[var(--text-muted)] uppercase mb-2 tracking-widest">Custom Block Header</label>
                <input
                  type="text"
                  value={formData.customSections[activeSection]?.title || ''}
                  onChange={e => {
                    const newCustoms = { ...formData.customSections };
                    newCustoms[activeSection] = { ...newCustoms[activeSection], title: e.target.value };
                    setFormData(prev => ({ ...prev, customSections: newCustoms }));
                  }}
                  className="w-full border border-[var(--border-default)] p-3 text-sm font-bold outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none"
                  placeholder="e.g. Scholarship Information"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest">Block Content (Rich Text)</label>
                <RichTextEditor
                  value={formData.customSections[activeSection]?.content || ''}
                  onChange={content => {
                    const newCustoms = { ...formData.customSections };
                    newCustoms[activeSection] = { ...newCustoms[activeSection], content: content };
                    setFormData(prev => ({ ...prev, customSections: newCustoms }));
                  }}
                  useProse={formData.customSections[activeSection]?.useProse !== false}
                  onProseChange={val => {
                    const newCustoms = { ...formData.customSections };
                    newCustoms[activeSection] = { ...newCustoms[activeSection], useProse: val };
                    setFormData(prev => ({ ...prev, customSections: newCustoms }));
                  }}
                />
              </div>
            </div>
          )}

          {activeSection === 'hero' && (
            <div className="space-y-6">
              <TitleEditor label="Hero Title" value={formData.hero.title} onChange={val => updateSection('hero', { ...formData.hero, title: val })} />
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Hero Subtitle</label>
                <input type="text" value={formData.hero.subtitle || ''} onChange={e => updateSection('hero', { ...formData.hero, subtitle: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Shaping the Future of Tech" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Badge Text</label>
                  <input type="text" value={formData.hero.badge || ''} onChange={e => updateSection('hero', { ...formData.hero, badge: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">Background Image URL</label>
                  <div className="mb-2 border border-[var(--border-default)] bg-[var(--bg-muted)] overflow-hidden h-32 flex items-center justify-center relative">
                    {formData.hero.bgImage ? <img src={formData.hero.bgImage} className="w-full h-full object-cover" alt="Hero BG" /> : <ImageIcon size={28} className="text-[var(--text-muted)] opacity-50" />}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text" value={formData.hero.bgImage || ''} onChange={e => updateSection('hero', { ...formData.hero, bgImage: e.target.value })} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" placeholder="Click media uploader or paste URL..." />
                    <div className="w-full sm:w-auto shrink-0"><MediaUploader category="schools" onUploadSuccess={url => updateSection('hero', { ...formData.hero, bgImage: url })} /></div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Description</label>
                <textarea value={formData.hero.description || ''} onChange={e => updateSection('hero', { ...formData.hero, description: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs h-20 outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none resize-none" />
              </div>
              <div className="pt-5 border-t border-[var(--border-light)]">
                <NestedListEditor
                  label="Call to Action Buttons"
                  items={formData.hero.cta}
                  newItemTemplate={{ label: '', link: '#', primary: false }}
                  fields={[{ key: 'label', label: 'Button Label' }, { key: 'link', label: 'Link URL' }, { key: 'primary', label: 'Is Primary? (true/false)' }]}
                  onUpdate={items => updateSection('hero', { ...formData.hero, cta: items })}
                />
              </div>
              <div className="pt-5 border-t border-[var(--border-light)]">
                <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Hero Quick Stats</p>
                <div className="space-y-3">
                  {formData.hero.quickStats?.map((s, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-3 items-end bg-[var(--bg-surface)] p-3 border border-[var(--border-default)] rounded-none group hover:border-[var(--border-dark)] transition-colors relative">
                      <div className="flex-1 w-full">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold uppercase block mb-1">Value</label>
                        <input type="text" value={s.value || ''} onChange={e => { const n = [...formData.hero.quickStats]; n[idx].value = e.target.value; updateSection('hero', { ...formData.hero, quickStats: n }) }} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                      </div>
                      <div className="flex-1 w-full">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold uppercase block mb-1">Label</label>
                        <input type="text" value={s.label || ''} onChange={e => { const n = [...formData.hero.quickStats]; n[idx].label = e.target.value; updateSection('hero', { ...formData.hero, quickStats: n }) }} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                      </div>
                      <div className="w-full sm:w-40">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold uppercase block mb-1">Icon</label>
                        <IconPicker value={s.icon} onChange={val => { const n = [...formData.hero.quickStats]; n[idx].icon = val; updateSection('hero', { ...formData.hero, quickStats: n }) }} />
                      </div>
                      <button onClick={() => updateSection('hero', { ...formData.hero, quickStats: formData.hero.quickStats.filter((_, i) => i !== idx) })} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1.5 transition-colors absolute top-2 right-2 sm:static"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button onClick={() => updateSection('hero', { ...formData.hero, quickStats: [...(formData.hero.quickStats || []), { icon: 'Star', value: '', label: '' }] })} className="text-[10px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] uppercase tracking-widest transition-colors flex items-center gap-1.5 mt-2"><Plus size={14} strokeWidth={2.5} /> ADD STAT</button>
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
                <TitleEditor label="Vision Title" value={formData.about.vision.title} onChange={val => updateSection('about', { ...formData.about, vision: { ...formData.about.vision, title: val } })} />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex-1">
                    <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Label</label>
                    <input type="text" placeholder="Label" value={formData.about.vision.label || ''} onChange={e => updateSection('about', { ...formData.about, vision: { ...formData.about.vision, label: e.target.value } })} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Icon</label>
                    <IconPicker value={formData.about.vision.icon} onChange={val => updateSection('about', { ...formData.about, vision: { ...formData.about.vision, icon: val } })} />
                  </div>
                </div>
                <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-4 rounded-none mb-4">
                  <label className="block text-[10px] font-black text-[var(--text-primary)] uppercase mb-3 tracking-widest">Vision Statement (Rich Text)</label>
                  <RichTextEditor
                    value={formData.about.vision.text || ''}
                    onChange={content => updateSection('about', { ...formData.about, vision: { ...formData.about.vision, text: content } })}
                    useProse={formData.about.vision.useProse !== false}
                    onProseChange={val => updateSection('about', { ...formData.about, vision: { ...formData.about.vision, useProse: val } })}
                  />
                </div>
                <NestedListEditor
                  label="Vision Highlights"
                  items={formData.about.vision.highlights}
                  newItemTemplate={{ value: '', label: '' }}
                  fields={[{ key: 'value', label: 'Value' }, { key: 'label', label: 'Label' }]}
                  onUpdate={items => updateSection('about', { ...formData.about, vision: { ...formData.about.vision, highlights: items } })}
                />
              </div>
              <div className="bg-[var(--bg-surface)] p-5 border border-[var(--border-default)] rounded-none">
                <h3 className="font-bold text-[13px] text-[var(--color-warning-dark)] uppercase tracking-widest border-b border-[var(--border-light)] pb-2 mb-4">Mission Section</h3>
                <TitleEditor label="Mission Title" value={formData.about.mission.title} onChange={val => updateSection('about', { ...formData.about, mission: { ...formData.about.mission, title: val } })} />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex-1">
                    <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Label</label>
                    <input type="text" placeholder="Label" value={formData.about.mission.label || ''} onChange={e => updateSection('about', { ...formData.about, mission: { ...formData.about.mission, label: e.target.value } })} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Icon</label>
                    <IconPicker value={formData.about.mission.icon} onChange={val => updateSection('about', { ...formData.about, mission: { ...formData.about.mission, icon: val } })} />
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
              <TitleEditor label="Section Title" value={formData.programmes.title} onChange={val => updateSection('programmes', { ...formData.programmes, title: val })} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Section Subtitle</label>
                  <input type="text" placeholder="Subtitle" value={formData.programmes.subtitle || ''} onChange={e => updateSection('programmes', { ...formData.programmes, subtitle: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[9px] block mb-2 font-bold uppercase text-[var(--text-muted)]">Background Image</label>
                  <div className="mb-2 border border-[var(--border-default)] bg-[var(--bg-muted)] overflow-hidden h-32 flex items-center justify-center">
                    {formData.programmes.bgImage ? <img src={formData.programmes.bgImage} className="w-full h-full object-cover" alt="Programmes BG" /> : <ImageIcon size={28} className="text-[var(--text-muted)] opacity-50" />}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text" placeholder="BG Image URL" value={formData.programmes.bgImage || ''} onChange={e => updateSection('programmes', { ...formData.programmes, bgImage: e.target.value })} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                    <div className="w-full sm:w-auto shrink-0"><MediaUploader category="schools" onUploadSuccess={url => updateSection('programmes', { ...formData.programmes, bgImage: url })} /></div>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                <label className="block text-[11px] font-black text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Programme Overview (Rich Text)</label>
                <RichTextEditor
                  value={formData.programmes.description || ''}
                  onChange={content => updateSection('programmes', { ...formData.programmes, description: content })}
                  useProse={formData.programmes.useProse !== false}
                  onProseChange={val => updateSection('programmes', { ...formData.programmes, useProse: val })}
                />
              </div>

              <div className="mt-8 border-t border-[var(--border-light)] pt-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
                  <h4 className="font-black text-[var(--text-primary)] uppercase text-[12px] tracking-widest">Edit Qualification Levels</h4>
                  <button onClick={() => updateSection('programmes', { ...formData.programmes, levels: [...formData.programmes.levels, { label: '', icon: 'GraduationCap', courses: [] }] })} className="bg-[var(--color-primary)] text-[var(--text-inverse)] px-4 py-2 text-[10px] font-bold uppercase tracking-wide hover:bg-[var(--color-primary-dark)] transition-colors rounded-none w-full sm:w-auto text-center">ADD LEVEL</button>
                </div>
                <div className="space-y-4">
                  {formData.programmes.levels.map((level, lIdx) => (
                    <div key={lIdx} className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-4 rounded-none group relative">
                      <button onClick={() => updateSection('programmes', { ...formData.programmes, levels: formData.programmes.levels.filter((_, i) => i !== lIdx) })} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors p-1"><Trash2 size={18} /></button>
                      <div className="flex flex-col sm:flex-row gap-3 mb-5 mt-4 sm:mt-0">
                        <input type="text" placeholder="Level Label (e.g. Undergrad)" value={level.label || ''} onChange={e => {
                          const nl = [...formData.programmes.levels]; nl[lIdx].label = e.target.value; updateSection('programmes', { ...formData.programmes, levels: nl });
                        }} className="border border-[var(--border-default)] p-2.5 text-sm flex-1 font-bold outline-none focus:border-[var(--color-primary)] rounded-none" />
                        <div className="w-full sm:w-48">
                          <IconPicker value={level.icon} onChange={val => {
                            const nl = [...formData.programmes.levels]; nl[lIdx].icon = val; updateSection('programmes', { ...formData.programmes, levels: nl });
                          }} />
                        </div>
                      </div>
                      <NestedListEditor
                        label={`Courses in ${level.label || 'this level'}`}
                        items={level.courses}
                        newItemTemplate={{ name: '', slug: '', redirectUrl: '', description: '', specializations: [] }}
                        fields={[
                          { key: 'name', label: 'Course Name' },
                          { key: 'slug', label: 'Course Slug' },
                          { key: 'redirectUrl', label: 'Redirect URL (e.g. /phd or http://...)' },
                          { key: 'description', label: 'Short Description' },
                        ]}
                        onUpdate={cItems => {
                          const nl = [...formData.programmes.levels]; nl[lIdx].courses = cItems; updateSection('programmes', { ...formData.programmes, levels: nl });
                        }}
                      />
                      {/* Specializations Editor */}
                      <div className="mt-6 pt-5 border-t border-[var(--border-default)]">
                        <p className="text-[11px] font-black uppercase text-[var(--text-primary)] mb-4 tracking-widest flex items-center gap-2">
                          <Layers size={14} className="text-[var(--color-primary)]" />
                          Course Specializations & Standalone Slugs
                        </p>
                        <div className="space-y-4">
                          {level.courses.map((c, ci) => (
                            <div key={ci} className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none shadow-sm selection-none">
                              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border-light)]">
                                <Box size={14} className="text-[var(--text-muted)]" />
                                <label className="text-[11px] font-black uppercase text-[var(--text-primary)]">{c.name}</label>
                              </div>
                              <NestedListEditor
                                label=""
                                items={c.specializations || []}
                                newItemTemplate={{ name: '', slug: '' }}
                                fields={[
                                  { key: 'name', label: 'Spec Name (e.g. AI & ML)' },
                                  { key: 'slug', label: 'Standalone Slug (e.g. bca-ai-ml)' },
                                ]}
                                onUpdate={specs => {
                                  const nl = [...formData.programmes.levels];
                                  nl[lIdx].courses[ci].specializations = specs;
                                  updateSection('programmes', { ...formData.programmes, levels: nl });
                                }}
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
              <TitleEditor label="Placement Section Title" value={formData.placements.title} onChange={val => updateSection('placements', { ...formData.placements, title: val })} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Badge Label</label>
                  <input type="text" placeholder="e.g. Placements" value={formData.placements.label || ''} onChange={e => updateSection('placements', { ...formData.placements, label: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                </div>
                <div>
                  <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Section Subtitle</label>
                  <input type="text" placeholder="e.g. CPU Placement Records" value={formData.placements.subtitle || ''} onChange={e => updateSection('placements', { ...formData.placements, subtitle: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                </div>
              </div>
              <NestedListEditor
                label="Featured Placement Stories"
                items={formData.placements.list}
                newItemTemplate={{ name: '', company: '', package: '', city: '', course: '', youtubeLink: '', img: '', designation: '', classOf: '' }}
                fields={[
                  { key: 'name', label: 'Student Name / Title' },
                  { key: 'designation', label: 'Designation' },
                  { key: 'classOf', label: 'Class Of' },
                  { key: 'company', label: 'Company Name' },
                  { key: 'course', label: 'Course Name' },
                  { key: 'package', label: 'Package (e.g. 12 LPA)' },
                  { key: 'city', label: 'City' },
                  { key: 'youtubeLink', label: 'YouTube Video Link' },
                  { key: 'img', label: 'Photo / Thumbnail', type: 'image' }
                ]}
                onUpdate={items => updateSection('placements', { ...formData.placements, list: items })}
              />
            </div>
          )}

          {activeSection === 'alumni' && (
            <div className="space-y-6">
              <TitleEditor label="Alumni Section Title" value={formData.alumni.title} onChange={val => updateSection('alumni', { ...formData.alumni, title: val })} />
              <div>
                <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Badge Label</label>
                <input type="text" placeholder="e.g. Our Alumni" value={formData.alumni.label || ''} onChange={e => updateSection('alumni', { ...formData.alumni, label: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] mb-4 rounded-none" />
              </div>
              <NestedListEditor
                label="Alumni Success"
                items={formData.alumni.list}
                newItemTemplate={{ name: '', company: '', role: '', image: '', desc: '', slug: '' }}
                fields={[
                  { key: 'name', label: 'Full Name' },
                  { key: 'role', label: 'Role / Designation' },
                  { key: 'company', label: 'Current Company' },
                  { key: 'image', label: 'Photo URL', type: 'image' },
                  { key: 'desc', label: 'Short Description', type: 'textarea' },
                  { key: 'slug', label: 'Slug' }
                ]}
                onUpdate={items => updateSection('alumni', { ...formData.alumni, list: items })}
              />
            </div>
          )}

          {activeSection === 'industry' && (
            <div className="space-y-6">
              <TitleEditor label="Industry Section Title" value={formData.industry.title} onChange={val => updateSection('industry', { ...formData.industry, title: val })} />
              <div>
                <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Badge Label</label>
                <input type="text" placeholder="e.g. Collaborations" value={formData.industry.label || ''} onChange={e => updateSection('industry', { ...formData.industry, label: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] mb-4 rounded-none" />
              </div>
              <NestedListEditor
                label="Industry Partners (Logos)"
                items={formData.industry.partners}
                newItemTemplate={{ name: '', url: '', slug: '' }}
                fields={[{ key: 'name', label: 'Partner Name' }, { key: 'url', label: 'Logo URL', type: 'image' }, { key: 'slug', label: 'Slug' }]}
                onUpdate={items => updateSection('industry', { ...formData.industry, partners: items })}
              />
            </div>
          )}

          {activeSection === 'research' && (
            <div className="space-y-6">
              <TitleEditor label="Research Section Title" value={formData.research.title} onChange={val => updateSection('research', { ...formData.research, title: val })} />
              <div>
                <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Badge Label</label>
                <input type="text" placeholder="e.g. Eminence Research" value={formData.research.label || ''} onChange={e => updateSection('research', { ...formData.research, label: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] mb-4 rounded-none" />
              </div>

              <div className="space-y-4 pt-4 border-t border-[var(--border-light)]">
                <p className="text-[11px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-3">Research Statistics</p>
                {formData.research.stats?.map((s, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-3 items-end bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] relative group hover:border-[var(--border-dark)] transition-colors rounded-none">
                    <button onClick={() => updateSection('research', { ...formData.research, stats: formData.research.stats.filter((_, i) => i !== idx) })} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1 sm:static"><Trash2 size={16} /></button>
                    <div className="w-full sm:flex-1">
                      <label className="text-[9px] block mb-1 uppercase font-bold text-[var(--text-muted)]">Value</label>
                      <input type="text" value={s.value || ''} onChange={e => { const n = [...formData.research.stats]; n[idx].value = e.target.value; updateSection('research', { ...formData.research, stats: n }) }} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                    </div>
                    <div className="w-full sm:flex-1">
                      <label className="text-[9px] block mb-1 uppercase font-bold text-[var(--text-muted)]">Label</label>
                      <input type="text" value={s.label || ''} onChange={e => { const n = [...formData.research.stats]; n[idx].label = e.target.value; updateSection('research', { ...formData.research, stats: n }) }} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none" />
                    </div>
                    <div className="w-full sm:w-40">
                      <label className="text-[9px] block mb-1 uppercase font-bold text-[var(--text-muted)]">Icon</label>
                      <IconPicker value={s.icon} onChange={val => { const n = [...formData.research.stats]; n[idx].icon = val; updateSection('research', { ...formData.research, stats: n }) }} />
                    </div>
                  </div>
                ))}
                <button onClick={() => updateSection('research', { ...formData.research, stats: [...(formData.research.stats || []), { value: '', label: '', icon: 'Search' }] })} className="text-[10px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] uppercase tracking-widest transition-colors flex items-center gap-1.5"><Plus size={14} strokeWidth={2.5} /> ADD RESEARCH STAT</button>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--border-light)]">
                <NestedListEditor
                  label="Research Gallery / Links"
                  items={formData.research.gallery}
                  newItemTemplate={{ icon: 'FileText', label: '', link: '', slug: '' }}
                  fields={[
                    { key: 'icon', label: 'Icon', type: 'icon' },
                    { key: 'label', label: 'Label' },
                    { key: 'link', label: 'URL', type: 'image' },
                    { key: 'slug', label: 'Slug' }
                  ]}
                  onUpdate={items => updateSection('research', { ...formData.research, gallery: items })}
                />
              </div>
            </div>
          )}

          {activeSection === 'community' && (
            <div className="space-y-6">
              <TitleEditor label="Community Section Title" value={formData.community.title} onChange={val => updateSection('community', { ...formData.community, title: val })} />
              <div>
                <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Badge Label</label>
                <input type="text" placeholder="e.g. Community" value={formData.community.label || ''} onChange={e => updateSection('community', { ...formData.community, label: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] mb-4 rounded-none" />
              </div>
              <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-4 shadow-sm mb-6 rounded-none">
                <label className="block text-[11px] font-black text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Community Description (Rich Text)</label>
                <RichTextEditor
                  value={formData.community.description?.join('\n') || ''}
                  onChange={content => updateSection('community', { ...formData.community, description: [content] })}
                  useProse={formData.community.useProse !== false}
                  onProseChange={val => updateSection('community', { ...formData.community, useProse: val })}
                />
              </div>
              <NestedListEditor
                label="Community Gallery"
                items={formData.community.gallery}
                newItemTemplate={{ src: '', caption: '', slug: '' }}
                fields={[{ key: 'src', label: 'Image URL', type: 'image' }, { key: 'caption', label: 'Caption' }, { key: 'slug', label: 'Slug' }]}
                onUpdate={items => updateSection('community', { ...formData.community, gallery: items })}
              />
            </div>
          )}

          {activeSection === 'infrastructure' && (
            <div className="space-y-6">
              <TitleEditor label="Infrastructure Section Title" value={formData.infrastructure.title} onChange={val => updateSection('infrastructure', { ...formData.infrastructure, title: val })} />
              <div>
                <label className="text-[9px] block mb-1 font-bold uppercase text-[var(--text-muted)]">Badge Label</label>
                <input type="text" placeholder="e.g. Campus" value={formData.infrastructure.label || ''} onChange={e => updateSection('infrastructure', { ...formData.infrastructure, label: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] mb-4 rounded-none" />
              </div>
              <NestedListEditor
                label="Infrastructure Items"
                items={formData.infrastructure.list}
                newItemTemplate={{ title: '', image: '', desc: '', slug: '' }}
                fields={[
                  { key: 'title', label: 'Facility Name' },
                  { key: 'image', label: 'Photo URL', type: 'image' },
                  { key: 'desc', label: 'Description' },
                  { key: 'slug', label: 'Slug' }
                ]}
                onUpdate={items => updateSection('infrastructure', { ...formData.infrastructure, list: items })}
              />
            </div>
          )}

          {activeSection === 'testimonials' && (
            <div className="space-y-6">
              <TitleEditor
                label="Testimonials Section Title"
                value={{ main: formData.testimonials.title, highlight: formData.testimonials.highlight }}
                onChange={val => updateSection('testimonials', { ...formData.testimonials, title: val.main, highlight: val.highlight })}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--bg-muted)] p-3">
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Section Tagline</label>
                  <input type="text" value={formData.testimonials.tagline} onChange={e => updateSection('testimonials', { ...formData.testimonials, tagline: e.target.value })} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Map/Location Label</label>
                  <input type="text" value={formData.testimonials.location} onChange={e => updateSection('testimonials', { ...formData.testimonials, location: e.target.value })} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Package Label</label>
                  <input type="text" value={formData.testimonials.packageLabel} onChange={e => updateSection('testimonials', { ...formData.testimonials, packageLabel: e.target.value })} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Verify Label</label>
                  <input type="text" value={formData.testimonials.verifyLabel} onChange={e => updateSection('testimonials', { ...formData.testimonials, verifyLabel: e.target.value })} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
              </div>

              <NestedListEditor
                label="Student Feed"
                items={formData.testimonials.testimonials}
                newItemTemplate={{ name: '', course: '', company: '', package: '', rating: 5, batch: '', quote: '', img: '' }}
                fields={[
                  { key: 'name', label: 'Name' },
                  { key: 'course', label: 'Course/Degree' },
                  { key: 'company', label: 'Placed Company' },
                  { key: 'package', label: 'Salary/Offer' },
                  { key: 'batch', label: 'Batch' },
                  { key: 'rating', label: 'Rating (1-5)', type: 'number' },
                  { key: 'img', label: 'Student Photo', type: 'image', fullWidth: true },
                  { key: 'quote', label: 'Testimonial Quote', type: 'textarea', fullWidth: true }
                ]}
                onUpdate={items => updateSection('testimonials', { ...formData.testimonials, testimonials: items })}
              />
            </div>
          )}

          {activeSection === 'exploreDepartment' && (
            <div className="space-y-6">
              <TitleEditor label="Explore Department Title" value={formData.exploreDepartment.sectionTitle} onChange={val => updateSection('exploreDepartment', { ...formData.exploreDepartment, sectionTitle: val })} />
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Subtitle</label>
                <input type="text" value={formData.exploreDepartment.subtitle || ''} onChange={e => updateSection('exploreDepartment', { ...formData.exploreDepartment, subtitle: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none" placeholder="e.g. Discover our specialized wings" />
              </div>
              <NestedListEditor
                label="Department Items"
                items={formData.exploreDepartment.items || []}
                newItemTemplate={{ icon: 'ArrowRight', title: '', description: '', items: [], link: '', slug: '' }}
                fields={[
                  { key: 'icon', label: 'Icon', type: 'icon' },
                  { key: 'title', label: 'Title' },
                  { key: 'description', label: 'Description' },
                  { key: 'items', label: 'List Points', type: 'stringList' },
                  { key: 'link', label: 'Link URL' },
                  { key: 'slug', label: 'Slug' }
                ]}
                onUpdate={items => updateSection('exploreDepartment', { ...formData.exploreDepartment, items: items })}
              />
            </div>
          )}

          {activeSection === 'team' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Section Title</label>
                  <input type="text" value={formData.team.title || ''} onChange={e => updateSection('team', { ...formData.team, title: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none" placeholder="e.g. Meet Our Team" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Subtitle</label>
                  <input type="text" value={formData.team.subtitle || ''} onChange={e => updateSection('team', { ...formData.team, subtitle: e.target.value })} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none" placeholder="e.g. Board of Advisors" />
                </div>
              </div>
              <TeamMembersListEditor
                label="Team Members"
                items={formData.team.members || []}
                newItemTemplate={{ name: '', desc: '', img: '', logos: [] }}
                fields={[
                  { key: 'name', label: 'Name' },
                  { key: 'desc', label: 'Description' },
                  { key: 'img', label: 'Photo URL', type: 'image' },
                  { key: 'logos', label: 'Affiliated Logos', type: 'mediaList' }
                ]}
                onUpdate={items => updateSection('team', { ...formData.team, members: items })}
              />
            </div>
          )}

        </div>
      </Modal>

      {/* --- System Section Picker Modal --- */}
      <Modal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        title="ADD SYSTEM SECTION"
        maxWidth="max-w-2xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50/30">
          {[
            { id: 'hero', title: 'Hero Header', desc: 'Main banner & quick stats' },
            { id: 'stats', title: 'School Stats', desc: 'Numbers & achievements' },
            { id: 'about', title: 'About Vision/Mission', desc: 'Core identity & icons' },
            { id: 'programmes', title: 'Academic Programmes', desc: 'Course levels & lists' },
            { id: 'placements', title: 'Placements', desc: 'Top students & highlights' },
            { id: 'alumni', title: 'Notable Alumni', desc: 'Legacy & student stories' },
            { id: 'industry', title: 'Industry Tie Ups', desc: 'Corporate partners & logos' },
            { id: 'research', title: 'Research & Innovation', desc: 'Labs, stats & gallery' },
            { id: 'community', title: 'Community & Life', desc: 'Campus vibe & culture' },
            { id: 'infrastructure', title: 'Infrastructure', desc: 'Facilities & labs' },
            { id: 'testimonials', title: 'Testimonials', desc: 'Student feedback & reviews' },
            { id: 'team', title: 'AI Mentorship Team', desc: 'Mentors & industrial board' },
            { id: 'exploreDepartment', title: 'Explore Department', desc: 'Specialized wings & slides' }
          ].map(sec => (
            <button
              key={sec.id}
              onClick={() => addSystemSection(sec.id)}
              disabled={formData.layoutOrder.includes(sec.id)}
              className={`p-4 border-2 text-left transition-all group ${formData.layoutOrder.includes(sec.id)
                ? 'opacity-40 cursor-not-allowed border-gray-100 bg-gray-50'
                : 'border-white bg-white hover:border-[var(--color-primary)] hover:shadow-lg'
                }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[11px] font-black uppercase tracking-wider ${formData.layoutOrder.includes(sec.id) ? 'text-gray-400' : 'text-[var(--text-primary)]'}`}>
                  {sec.title}
                </span>
                {formData.layoutOrder.includes(sec.id) ? (
                  <CheckCircle2 size={14} className="text-[var(--color-success)]" />
                ) : (
                  <Box size={14} className="text-gray-300 group-hover:text-[var(--color-primary)]" />
                )}
              </div>
              <p className="text-[9px] text-gray-500 font-medium uppercase tracking-tighter leading-tight">
                {sec.desc}
              </p>
              {formData.layoutOrder.includes(sec.id) && (
                <span className="inline-block mt-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-1.5 py-0.5">Already Added</span>
              )}
            </button>
          ))}
        </div>
        <div className="p-4 bg-blue-50 border-t border-blue-100">
          <p className="text-[9px] text-blue-700 font-bold uppercase tracking-widest leading-relaxed">
            Tip: You can reorder these sections using the drag-and-drop handles in the main layout manager.
          </p>
        </div>
      </Modal>
    </div>
  );
}