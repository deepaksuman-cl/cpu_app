'use client';
import MediaUploader from '@/components/admin/MediaUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import IconPicker from '@/components/admin/ui/IconPicker';
import ColorPicker from '@/components/admin/ui/ColorPicker';
import Modal from '@/components/admin/ui/Modal';
import { createCourse, updateCourse } from '@/lib/actions/courseActions';
import { AlertCircle, CheckCircle2, Pencil, Plus, Save, Trash2, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import * as LucideIcons from 'lucide-react';
import { 
  GripVertical, FileText, BarChart, Layers, Zap, Info, Bot, Award, Users, Target, 
  HelpCircle, CircleHelp, Briefcase, LayoutTemplate, History, Image as ImageIcon, Rocket, 
  ShieldAlert, AlertShield, Cpu, RotateCcw, Layout
} from 'lucide-react';
import * as AiEditors from './AiSectionEditors';

// --- Ultra-Safe Component Wrapper ---
const SafelyRenderIcon = ({ iconName, fallbackIcon: Fallback, ...props }) => {
  // Try dynamic resolution from star import
  let Component = LucideIcons[iconName];
  
  // Fallback to specific named icons if available
  if (!Component) {
    if (iconName === 'HelpCircle' || iconName === 'CircleHelp') Component = CircleHelp || HelpCircle;
    if (iconName === 'Zap') Component = Zap;
    if (iconName === 'Info') Component = Info;
    if (iconName === 'Layers') Component = Layers;
    if (iconName === 'Cpu') Component = Cpu;
  }

  // Final fallbacks to avoid crash
  const ResolvedIcon = Component || Fallback || HelpCircle || Info || 'span';
  
  if (typeof ResolvedIcon === 'string') return <span className="w-[18px] h-[18px] bg-blue-100 flex items-center justify-center text-[10px]">?</span>;
  
  return <ResolvedIcon {...props} />;
};

// --- Shared Internal Components ---

const TitleEditor = ({ label, value, onChange }) => {
  const v = value || {};
  return (
    <div className="space-y-3 p-4 bg-[var(--bg-muted)] border-l-2 border-[var(--color-primary)] mb-4">
      <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Main Title</label>
          <input type="text" value={v.main || ''} onChange={e => onChange({...v, main: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" placeholder="e.g. Course Overview" />
        </div>
        <div>
          <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Highlight Word</label>
          <input type="text" value={v.highlight || ''} onChange={e => onChange({...v, highlight: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" placeholder="e.g. Overview" />
        </div>
        <div>
          <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Sky Highlight</label>
          <input type="text" value={v.skyHighlight || ''} onChange={e => onChange({...v, skyHighlight: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" placeholder="Optional" />
        </div>
      </div>
    </div>
  );
};

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

const SchoolPicker = ({ options = [], value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const selected = options.find(s => s.id === (value?.id || value));
  const filtered = options.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  const SchoolIcon = LucideIcons.School || LucideIcons.Building2 || LucideIcons.Building;
  const SearchIcon = LucideIcons.Search;
  const ChevronIcon = LucideIcons.ChevronDown;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[var(--bg-surface)] border-2 border-[var(--border-default)] hover:border-[var(--color-primary-light)] p-3 text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center justify-between transition-all outline-none rounded-none group shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-blue-50 text-[var(--color-primary)] group-hover:bg-blue-100 transition-colors">
            <SchoolIcon size={16} />
          </div>
          <span className="truncate">{selected ? selected.name : 'Select Parent School'}</span>
        </div>
        <ChevronIcon size={16} className={`text-[var(--text-muted)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)} />
          <div className="absolute z-[110] top-full mt-1 left-0 right-0 bg-white border-2 border-[var(--border-dark)] shadow-2xl animate-in fade-in zoom-in-95 duration-200 origin-top overflow-hidden">
            <div className="p-2 border-b border-gray-100 bg-gray-50/50">
              <div className="relative">
                <SearchIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="SEARCH SCHOOLS..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-[10px] font-bold uppercase tracking-widest border border-gray-200 focus:border-[var(--color-primary)] outline-none bg-white transition-all"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-[220px] overflow-y-auto custom-scroll">
              {filtered.length > 0 ? filtered.map(school => (
                <button
                  key={school.id}
                  type="button"
                  onClick={() => {
                    onChange(school.id);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-blue-50 transition-colors group ${selected?.id === school.id ? 'bg-blue-50/50 border-r-4 border-[var(--color-primary)]' : ''}`}
                >
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-wide ${selected?.id === school.id ? 'text-[var(--color-primary)]' : 'text-gray-800'}`}>
                      {school.name}
                    </p>
                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">ID: {school.id}</p>
                  </div>
                  {selected?.id === school.id && <LucideIcons.Check size={14} className="text-[var(--color-primary)]" />}
                </button>
              )) : (
                <div className="p-8 text-center border-t border-gray-50">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No Schools Found</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// --- Custom Block Settings Panel ---
function CustomBlockSettingsPanel({ block, updateBlock }) {
  const [open, setOpen] = useState(false);

  const PADDING_OPTIONS = [
    { label: 'None (0px)', value: '0' },
    { label: 'XS (20px)', value: '20' },
    { label: 'SM (40px)', value: '40' },
    { label: 'MD (60px) — Default', value: '60' },
    { label: 'LG (80px)', value: '80' },
    { label: 'XL (100px)', value: '100' },
    { label: '2XL (120px)', value: '120' },
    { label: 'Custom', value: 'custom' },
  ];

  const paddingTopVal = block?.sectionPaddingTop ?? '60';
  const paddingBottomVal = block?.sectionPaddingBottom ?? '60';
  const isPaddingTopCustom = !PADDING_OPTIONS.slice(0,-1).some(o => o.value === paddingTopVal);
  const isPaddingBottomCustom = !PADDING_OPTIONS.slice(0,-1).some(o => o.value === paddingBottomVal);

  return (
    <div className="mb-5 border border-[var(--border-default)] rounded-none">
      {/* Toggle Header */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-blue-50 text-blue-900 hover:bg-blue-100 transition-colors group"
      >
        <div className="flex items-center gap-2">
          <Layout size={14} className="text-blue-700" strokeWidth={2.5} />
          <span className="text-[11px] font-black uppercase tracking-widest">
            Section Settings
          </span>
          {/* Quick preview badges */}
          <span className="hidden sm:flex items-center gap-1 ml-2">
            {(paddingTopVal !== '60' || paddingBottomVal !== '60') && (
              <span className="text-[9px] font-bold bg-white text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                Padding: {paddingTopVal}↑ / {paddingBottomVal}↓
              </span>
            )}
            {block?.sectionContainer === 'full' && (
              <span className="text-[9px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Full Width</span>
            )}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-blue-700 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="p-4 bg-[var(--bg-surface)] border-t border-blue-100 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 animate-in fade-in slide-in-from-top-1 duration-150">

          {/* --- 1. Padding Top --- */}
          <div>
            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
              Padding Top
            </label>
            <select
              value={isPaddingTopCustom ? 'custom' : paddingTopVal}
              onChange={e => {
                if (e.target.value !== 'custom') updateBlock('sectionPaddingTop', e.target.value);
              }}
              className="w-full border border-gray-200 p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-white mb-1.5"
            >
              {PADDING_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            {isPaddingTopCustom && (
              <input
                type="text"
                value={paddingTopVal}
                onChange={e => updateBlock('sectionPaddingTop', e.target.value)}
                className="w-full border border-blue-300 p-1.5 text-xs outline-none font-mono focus:border-blue-500"
                placeholder="e.g. 75px or 5rem"
              />
            )}
            {!isPaddingTopCustom && (
              <button
                type="button"
                onClick={() => updateBlock('sectionPaddingTop', paddingTopVal + 'x')}
                className="text-[9px] text-gray-400 hover:text-blue-600 underline transition-colors"
              >
                Enter custom value
              </button>
            )}
          </div>

          {/* --- 2. Padding Bottom --- */}
          <div>
            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
              Padding Bottom
            </label>
            <select
              value={isPaddingBottomCustom ? 'custom' : paddingBottomVal}
              onChange={e => {
                if (e.target.value !== 'custom') updateBlock('sectionPaddingBottom', e.target.value);
              }}
              className="w-full border border-gray-200 p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-white mb-1.5"
            >
              {PADDING_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            {isPaddingBottomCustom && (
              <input
                type="text"
                value={paddingBottomVal}
                onChange={e => updateBlock('sectionPaddingBottom', e.target.value)}
                className="w-full border border-blue-300 p-1.5 text-xs outline-none font-mono focus:border-blue-500"
                placeholder="e.g. 75px or 5rem"
              />
            )}
            {!isPaddingBottomCustom && (
              <button
                type="button"
                onClick={() => updateBlock('sectionPaddingBottom', paddingBottomVal + 'x')}
                className="text-[9px] text-gray-400 hover:text-blue-600 underline transition-colors"
              >
                Enter custom value
              </button>
            )}
          </div>

          {/* --- 3. Container Width --- */}
          <div>
            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
              Section Container
            </label>
            <div className="flex gap-1 p-1 bg-gray-100 border border-gray-200">
              {[
                { value: 'container', label: 'Boxed (Container)' },
                { value: 'full', label: 'Full 100% Width' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateBlock('sectionContainer', opt.value)}
                  className={`flex-1 py-1.5 px-2 text-[9px] font-black uppercase tracking-wider transition-all ${
                    (block?.sectionContainer || 'container') === opt.value
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-[9px] text-gray-400 mt-1.5 leading-tight">
              {(block?.sectionContainer || 'container') === 'full'
                ? '⚡ Content will span full browser width (no side padding).'
                : '📦 Content bound inside max-width container.'}
            </p>
          </div>

          {/* --- 4. Background Color --- */}
          <div>
            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
              Background Color
            </label>
            <ColorPicker 
              value={block?.sectionBgColor} 
              onChange={val => updateBlock('sectionBgColor', val)} 
            />
          </div>

          {/* --- 5. Background Image --- */}
          <div>
            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
              Background Image
            </label>
            {block?.sectionBgImage ? (
              <div className="relative mb-2">
                <img
                  src={block.sectionBgImage}
                  className="w-full h-20 object-cover border border-gray-200"
                  alt="Section BG Preview"
                />
                <button
                  type="button"
                  onClick={() => updateBlock('sectionBgImage', '')}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white shadow hover:bg-red-700 transition-colors"
                  title="Remove background image"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ) : (
              <div className="w-full h-16 bg-gray-50 border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-300 mb-2">
                <ImageIcon size={18} />
                <span className="text-[9px] mt-1">No image set</span>
              </div>
            )}
            <MediaUploader category="courses" onUploadSuccess={url => updateBlock('sectionBgImage', url)} />
          </div>

          {/* --- 6. CSS ID & Class --- */}
          <div className="space-y-3">
            <div>
              <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                Block CSS ID
              </label>
              <input
                type="text"
                value={block?.cssId || ''}
                onChange={e => updateBlock('cssId', e.target.value)}
                className="w-full border border-gray-200 p-2 text-xs outline-none focus:border-[var(--color-primary)] font-mono"
                placeholder="section-unique-id"
              />
            </div>
            <div>
              <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                Block CSS Class
              </label>
              <input
                type="text"
                value={block?.cssClass || ''}
                onChange={e => updateBlock('cssClass', e.target.value)}
                className="w-full border border-gray-200 p-2 text-xs outline-none focus:border-[var(--color-primary)] font-mono"
                placeholder="custom-section-class"
              />
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// --- Main Form Component ---

export default function CourseBuilderForm({ schools, initialData = null }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [formData, setFormData] = useState(() => {
    const defaults = {
      name: '', slug: '', metaTitle: '', metaDescription: '', schoolId: '', title: '', duration: '', eligibility: '', description: '',
      courseType: 'regular',
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
      faq: { sectionTitle: { main: 'FAQ' }, subtitle: '', items: [], useProse: true },
      exploreDepartment: { sectionTitle: { main: 'Explore Our Department', highlight: 'Department' }, subtitle: 'Discover our specialized wings', slides: [] },
      roadmap: { sectionTitle: { main: '4 Year Learning Roadmap', highlight: 'Roadmap' }, subtitle: 'Your journey from foundation to industry expert.', years: [] },
      placements: { sectionTitle: { main: 'Placements' }, subtitle: '', stats: [], list: [] },
      industry: { sectionTitle: { main: 'Industry Partners' }, subtitle: '', partners: [] },
      testimonials: { 
        title: 'Student Stories', 
        highlight: 'Stories',
        tagline: 'OUR STUDENTS SPEAK',
        location: 'LADYBIRD, DELHI',
        packageLabel: 'OFFERED PACKAGE',
        verifyLabel: 'VERIFIED STUDENT',
        testimonials: [] 
      },
      // Specialization (AI-First) Defaults
      ai_hero: { title: ['', ''], subtitle: '', stats: [], specializations: [], cta: [], heroImage: '' },
      ai_highlights: [],
      ai_features: { title: '', subtitle: '', features: [] },
      ai_curriculum: { title: '', description: '', data: [] },
      ai_admissions: { title: '', leftSide: { title: '', eligibility: {}, ctaText: '' }, timelineSteps: [] },
      ai_placements: { title: '', subtitle: '', pillars: [], companies: [] },
      ai_comparison: { title: '', subtitle: '', data: [] },
      ai_team: { title: '', subtitle: '', members: [] },
      ai_cta: { title: '', subtitle: '', points: [], buttonText: '', ctaImage: '' },
      ai_faq: { title: '', subtitle: '', data: {} },
      breadcrumb: [],
      layoutOrder: null,
      customSections: {}
    };

    const base = initialData || defaults;
    const merged = { ...defaults, ...base };
    
    // Explicitly merge sections known to have nested objects
    const sections = [
      'hero', 'accomplishments', 'overview', 'scope', 'curriculum', 
      'admissionFee', 'scholarships', 'whyJoin', 'uniqueFeatures', 
      'applySteps', 'faq', 'exploreDepartment', 'roadmap',
      'placements', 'industry', 'testimonials',
      'ai_hero', 'ai_highlights', 'ai_features', 'ai_curriculum', 
      'ai_admissions', 'ai_placements', 'ai_comparison', 
      'ai_team', 'ai_cta', 'ai_faq'
    ];

    sections.forEach(sec => {
      // Check if the section exists in current data
      if (merged[sec] !== undefined) {
        // CASE 1: Top-level section is a plain object - Perform deep merge
        if (merged[sec] && typeof merged[sec] === 'object' && !Array.isArray(merged[sec])) {
          merged[sec] = { ...defaults[sec], ...merged[sec] };
          
          // Deep merge sub-keys
          Object.keys(defaults[sec]).forEach(subKey => {
            if (merged[sec][subKey] === null || merged[sec][subKey] === undefined) {
               merged[sec][subKey] = defaults[sec][subKey];
            }
            if (defaults[sec][subKey] && typeof defaults[sec][subKey] === 'object' && !Array.isArray(defaults[sec][subKey])) {
               merged[sec][subKey] = { ...defaults[sec][subKey], ...merged[sec][subKey] };
            }
          });
        } 
        // CASE 2: Top-level section is an array (like ai_highlights) - Preserve as is from base
        else if (Array.isArray(merged[sec])) {
          // Do nothing, base already has the array from merged = { ...defaults, ...base }
        }
      } else {
        merged[sec] = defaults[sec];
      }
    });

    // Fallback logic for layoutOrder
    if (!merged.layoutOrder) {
      if (merged.courseType === 'specialization') {
        merged.layoutOrder = [
          'ai_hero', 'ai_highlights', 'ai_features', 'ai_curriculum', 
          'ai_admissions', 'ai_placements', 'ai_comparison', 
          'ai_team', 'ai_cta', 'ai_faq'
        ];
      } else {
        merged.layoutOrder = [
          'hero', 'accomplishments', 'overview', 'scope', 'curriculum', 
          'roadmap', 'exploreDepartment', 'admissionFee', 'scholarships', 
          'whyJoin', 'uniqueFeatures', 'applySteps', 'faq', 
          'placements', 'industry', 'testimonials'
        ];
      }
    }
    if (!merged.customSections) merged.customSections = {};

    return merged;
  });

  const updateSection = useCallback((section, data) => {
    setFormData(prev => ({ ...prev, [section]: data }));
  }, []);

  const handleSave = async () => {
    if (!formData.schoolId) return alert("Parent school is required.");
    if (!formData.name) return alert("Course name is required.");
    
    // Safety: Ensure layoutOrder contains valid values
    const cleanLayout = formData.layoutOrder.filter(id => id);
    const finalData = { ...formData, layoutOrder: cleanLayout };

    setIsSaving(true);
    try {
      const result = initialData?.id ? await updateCourse(initialData.id, finalData) : await createCourse(finalData);
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

  const handleTypeChange = (newType) => {
    if (confirm(`Switching to ${newType} will reset the layout for new courses. Proceed?`)) {
      setFormData(prev => {
        const newLayout = newType === 'specialization' 
          ? ['ai_hero', 'ai_highlights', 'ai_features', 'ai_curriculum', 'ai_admissions', 'ai_placements', 'ai_comparison', 'ai_team', 'ai_cta', 'ai_faq']
          : ['hero', 'accomplishments', 'overview', 'scope', 'curriculum', 'roadmap', 'exploreDepartment', 'admissionFee', 'scholarships', 'whyJoin', 'uniqueFeatures', 'applySteps', 'faq', 'placements', 'industry', 'testimonials'];
        
        return { ...prev, courseType: newType, layoutOrder: newLayout };
      });
    }
  };

  const addSystemSection = (sectionId) => {
    if (formData.layoutOrder.includes(sectionId)) return alert("Section already exists in layout.");
    setFormData(prev => ({ ...prev, layoutOrder: [...prev.layoutOrder, sectionId] }));
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
           }} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1.5 border border-transparent hover:border-[var(--color-danger-light)] transition-all"><Trash2 size={14}/></button>
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
      
      {/* ── Basic Configuration ── */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-5 shadow-[var(--shadow-sm)] space-y-5 rounded-none">
        <div className="flex items-center gap-2 border-b border-[var(--border-light)] pb-3">
          <Settings size={18} className="text-[var(--color-primary)]" />
          <h2 className="text-[14px] font-black text-[var(--text-primary)] uppercase tracking-wide">Base Config & Type</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Parent School *</label>
            <SchoolPicker 
              options={schools}
              value={formData.schoolId}
              onChange={(val) => setFormData({...formData, schoolId: val})}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Course Type *</label>
            <div className="flex bg-[var(--bg-muted)] p-1 rounded-none border border-[var(--border-default)]">
              <button 
                onClick={() => handleTypeChange('regular')}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${formData.courseType === 'regular' ? 'bg-[var(--color-primary)] text-white shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
              >
                REGULAR
              </button>
              <button 
                onClick={() => handleTypeChange('specialization')}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${formData.courseType === 'specialization' ? 'bg-[var(--color-primary)] text-white shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
              >
                SPECIALIZATION
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Course Name *</label>
            <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]" placeholder="e.g. B.Tech CSE" />
          </div>
          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">URL Slug</label>
            <input type="text" value={formData.slug || ''} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-muted)] font-mono" placeholder="btech-cse" />
          </div>
          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Duration</label>
            <input type="text" value={formData.duration || ''} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]" placeholder="e.g. 4 Years" />
          </div>
          <div className="md:col-span-3">
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Eligibility</label>
            <input type="text" value={formData.eligibility || ''} onChange={(e) => setFormData({...formData, eligibility: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)]" placeholder="e.g. 10+2 with 50%" />
          </div>
          <div className="md:col-span-3 pt-3 border-t border-[var(--border-light)]">
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Meta Title</label>
            <input type="text" value={formData.metaTitle || ''} onChange={(e) => setFormData({...formData, metaTitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)] mb-3" placeholder="SEO Title..." />
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Meta Description</label>
            <textarea value={formData.metaDescription || ''} onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs h-20 focus:border-[var(--color-primary)] outline-none rounded-none bg-[var(--bg-surface)] resize-none" placeholder="SEO Description..." />
          </div>
          <div className="md:col-span-3 pt-3 border-t border-[var(--border-light)]">
            <NestedListEditor label="Custom Breadcrumbs Override" items={formData.breadcrumb || []} newItemTemplate={{ label: '', link: '' }} fields={[{key: 'label', label: 'Label'}, {key: 'link', label: 'Link'}]} onUpdate={items => setFormData({...formData, breadcrumb: items})} />
            <p className="text-[9px] text-[var(--text-muted)] mt-2 font-bold uppercase tracking-wide">Note: Course breadcrumbs are usually generated automatically, use this only for custom overrides.</p>
          </div>
        </div>
      </div>

      {/* --- Dynamic Sections Layout (Drag & Drop) --- */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-3">
          <h2 className="text-[14px] font-black text-[var(--text-primary)] uppercase tracking-wide">Course Layout Sections</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={() => setIsPickerOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border-2 border-[var(--border-dark)] text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--bg-muted)] hover:border-[var(--color-primary)] transition-all rounded-none text-[var(--text-primary)]"
            >
              <Layers size={14} className="text-[var(--color-primary)]" /> ADD SYSTEM SECTION
            </button>
            <button 
              onClick={addCustomBlock}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--text-primary)] text-[var(--bg-surface)] text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--text-secondary)] transition-all rounded-none"
            >
              <Plus size={14} strokeWidth={2.5} /> CUSTOM BLOCK
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="course-sections">
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
                    const mappings = {
                      hero: { title: "Hero Header", description: "Banner, duration & eligibility.", isComplete: !!formData.hero?.title?.main, isHidden: formData.hero?.hide, onToggleHide: v => updateSection('hero', {...formData.hero, hide: v}) },
                      accomplishments: { title: "Impact Stats", description: "Badges & numbers.", isComplete: !!formData.accomplishments?.heading, isHidden: formData.accomplishments?.hide, onToggleHide: v => updateSection('accomplishments', {...formData.accomplishments, hide: v}) },
                      overview: { title: "Overview", description: "Summary & grid cards.", isComplete: !!formData.overview?.sectionTitle?.main, isHidden: formData.overview?.hide, onToggleHide: v => updateSection('overview', {...formData.overview, hide: v}) },
                      scope: { title: "Career Scope", description: "Future opportunities.", isComplete: !!formData.scope?.body, isHidden: formData.scope?.hide, onToggleHide: v => updateSection('scope', {...formData.scope, hide: v}) },
                      curriculum: { title: "Curriculum", description: "Semester breakdowns.", isComplete: formData.curriculum?.accordionSections?.length > 0, isHidden: formData.curriculum?.hide, onToggleHide: v => updateSection('curriculum', {...formData.curriculum, hide: v}) },
                      roadmap: { title: "Roadmap", description: "Yearly learning flow.", isComplete: formData.roadmap?.years?.length > 0, isHidden: formData.roadmap?.hide, onToggleHide: v => updateSection('roadmap', {...formData.roadmap, hide: v}) },
                      exploreDepartment: { title: "Department", description: "Related facilities/slides.", isComplete: formData.exploreDepartment?.slides?.length > 0, isHidden: formData.exploreDepartment?.hide, onToggleHide: v => updateSection('exploreDepartment', {...formData.exploreDepartment, hide: v}) },
                      admissionFee: { title: "Admission", description: "Criteria & fees.", isComplete: formData.admissionFee?.feeDetails?.length > 0, isHidden: formData.admissionFee?.hide, onToggleHide: v => updateSection('admissionFee', {...formData.admissionFee, hide: v}) },
                      scholarships: { title: "Scholarships", description: "Merit & phase slabs.", isComplete: formData.scholarships?.rows?.length > 0, isHidden: formData.scholarships?.hide, onToggleHide: v => updateSection('scholarships', {...formData.scholarships, hide: v}) },
                      whyJoin: { title: "Why Join", description: "Key benefits.", isComplete: formData.whyJoin?.reasons?.length > 0, isHidden: formData.whyJoin?.hide, onToggleHide: v => updateSection('whyJoin', {...formData.whyJoin, hide: v}) },
                      uniqueFeatures: { title: "Features", description: "Unique points.", isComplete: formData.uniqueFeatures?.features?.length > 0, isHidden: formData.uniqueFeatures?.hide, onToggleHide: v => updateSection('uniqueFeatures', {...formData.uniqueFeatures, hide: v}) },
                      applySteps: { title: "How to Apply", description: "Guide & steps.", isComplete: formData.applySteps?.steps?.length > 0, isHidden: formData.applySteps?.hide, onToggleHide: v => updateSection('applySteps', {...formData.applySteps, hide: v}) },
                      faq: { title: "FAQs", description: "Common Q&A.", isComplete: formData.faq?.items?.length > 0, isHidden: formData.faq?.hide, onToggleHide: v => updateSection('faq', {...formData.faq, hide: v}) },
                      placements: { title: "Placements", description: "Highlights & student list.", isComplete: formData.placements?.list?.length > 0, isHidden: formData.placements?.hide, onToggleHide: v => updateSection('placements', {...formData.placements, hide: v}) },
                      industry: { title: "Partners", description: "Industry tie-ups.", isComplete: formData.industry?.partners?.length > 0, isHidden: formData.industry?.hide, onToggleHide: v => updateSection('industry', {...formData.industry, hide: v}) },
                      testimonials: { title: "Testimonials", description: "Student reviews.", isComplete: formData.testimonials?.list?.length > 0, isHidden: formData.testimonials?.hide, onToggleHide: v => updateSection('testimonials', {...formData.testimonials, hide: v}) },
                      // AI SPECIALIZATION MAPPINGS
                      ai_hero: { title: "AI Hero (Special)", description: "Dynamic backdrop & stats.", isComplete: !!formData.ai_hero?.title?.[0], isHidden: formData.ai_hero?.hide, onToggleHide: v => updateSection('ai_hero', {...formData.ai_hero, hide: v}) },
                      ai_highlights: { title: "AI Highlights", description: "Horizontal metric cards.", isComplete: formData.ai_highlights?.length > 0, isHidden: formData.ai_highlights?.hide, onToggleHide: v => updateSection('ai_highlights', {...formData.ai_highlights, hide: v}) },
                      ai_features: { title: "AI Flip Features", description: "Hover-effect feature cards.", isComplete: formData.ai_features?.features?.length > 0, isHidden: formData.ai_features?.hide, onToggleHide: v => updateSection('ai_features', {...formData.ai_features, hide: v}) },
                      ai_curriculum: { title: "AI Journey Map", description: "4-Year complex roadmap.", isComplete: formData.ai_curriculum?.data?.length > 0, isHidden: formData.ai_curriculum?.hide, onToggleHide: v => updateSection('ai_curriculum', {...formData.ai_curriculum, hide: v}) },
                      ai_admissions: { title: "AI Admissions", description: "Timeline & eligibility.", isComplete: formData.ai_admissions?.timelineSteps?.length > 0, isHidden: formData.ai_admissions?.hide, onToggleHide: v => updateSection('ai_admissions', {...formData.ai_admissions, hide: v}) },
                      ai_placements: { title: "AI Career Track", description: "Pillars & company marquee.", isComplete: formData.ai_placements?.pillars?.length > 0, isHidden: formData.ai_placements?.hide, onToggleHide: v => updateSection('ai_placements', {...formData.ai_placements, hide: v}) },
                      ai_comparison: { title: "AI Benchmark", description: "CPU vs Traditional table.", isComplete: formData.ai_comparison?.data?.length > 0, isHidden: formData.ai_comparison?.hide, onToggleHide: v => updateSection('ai_comparison', {...formData.ai_comparison, hide: v}) },
                      ai_team: { title: "AI Mentorship", description: "Expert board slider.", isComplete: formData.ai_team?.members?.length > 0, isHidden: formData.ai_team?.hide, onToggleHide: v => updateSection('ai_team', {...formData.ai_team, hide: v}) },
                      ai_cta: { title: "AI CTA Banner", description: "Final conversion block.", isComplete: !!formData.ai_cta?.title, isHidden: formData.ai_cta?.hide, onToggleHide: v => updateSection('ai_cta', {...formData.ai_cta, hide: v}) },
                      ai_faq: { title: "AI FAQ Display", description: "Specialization Q&A categories.", isComplete: Object.keys(formData.ai_faq?.data || {}).length > 0, isHidden: formData.ai_faq?.hide, onToggleHide: v => updateSection('ai_faq', {...formData.ai_faq, hide: v}) },
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
          
          {activeSection?.startsWith('custom_') && (
            <div className="space-y-6">
              <CustomBlockSettingsPanel 
                block={formData.customSections[activeSection]} 
                updateBlock={(field, value) => {
                  const newCustoms = { ...formData.customSections };
                  newCustoms[activeSection] = { ...newCustoms[activeSection], [field]: value };
                  setFormData(prev => ({ ...prev, customSections: newCustoms }));
                }}
              />
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
                  placeholder="e.g. Additional Eligibility Details" 
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

          {/* HERO */}
          {activeSection === 'hero' && (
            <div className="space-y-6">
              <TitleEditor label="Hero Title" value={formData.hero.title} onChange={val => updateSection('hero', {...formData.hero, title: val})} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Badge Text</label>
                  <input type="text" value={formData.hero.badge || ''} onChange={e => updateSection('hero', {...formData.hero, badge: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
                <div>
                   <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">BG Image URL</label>
                   <div className="flex flex-col sm:flex-row gap-2">
                     <input type="text" value={formData.hero.bgImage || ''} onChange={e => updateSection('hero', {...formData.hero, bgImage: e.target.value})} className="flex-1 border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                     <div className="w-full sm:w-auto shrink-0"><MediaUploader category="courses" onUploadSuccess={url => updateSection('hero', {...formData.hero, bgImage: url})} /></div>
                   </div>
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Hero Description</label>
                <textarea placeholder="Hero Description" value={formData.hero.description || ''} onChange={e => updateSection('hero', {...formData.hero, description: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs h-20 outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none resize-none" />
              </div>
              <div className="pt-5 border-t border-[var(--border-light)]">
                <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Hero Actions (CTAs)</p>
                <div className="space-y-3">
                  {formData.hero.cta?.map((btn, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-[var(--bg-muted)] p-3 border border-[var(--border-light)] hover:border-[var(--border-default)] rounded-none transition-colors">
                      <input type="text" placeholder="Label" value={btn.label || ''} onChange={e => { const n = [...formData.hero.cta]; n[idx].label = e.target.value; updateSection('hero', {...formData.hero, cta: n})}} className="w-full sm:flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      <input type="text" placeholder="Link" value={btn.link || ''} onChange={e => { const n = [...formData.hero.cta]; n[idx].link = e.target.value; updateSection('hero', {...formData.hero, cta: n})}} className="w-full sm:flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
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
                        <input type="text" value={s.value || ''} onChange={e => { const n = [...formData.hero.quickStats]; n[idx].value = e.target.value; updateSection('hero', {...formData.hero, quickStats: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none bg-[var(--bg-surface)]" />
                      </div>
                      <div className="w-full sm:flex-1">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold uppercase block mb-1">Label</label>
                        <input type="text" value={s.label || ''} onChange={e => { const n = [...formData.hero.quickStats]; n[idx].label = e.target.value; updateSection('hero', {...formData.hero, quickStats: n})}} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] rounded-none bg-[var(--bg-surface)]" />
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
                  <input type="text" placeholder="Heading" value={formData.accomplishments?.heading || ''} onChange={e => updateSection('accomplishments', {...formData.accomplishments, heading: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
               </div>
               <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Trust Badge Text</label>
                  <input type="text" placeholder="Trust Badge Text" value={formData.accomplishments?.trustBadge || ''} onChange={e => updateSection('accomplishments', {...formData.accomplishments, trustBadge: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
               </div>
               <NestedListEditor 
                label="Impact Stats Cards"
                items={formData.accomplishments?.stats || []}
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
                <input type="text" value={formData.overview.subtitle || ''} onChange={e => updateSection('overview', {...formData.overview, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
              </div>
              <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Introduction (Rich Text)</label>
                <RichTextEditor 
                  value={formData.overview.paragraphs?.join('') || ''}
                  onChange={content => updateSection('overview', {...formData.overview, paragraphs: [content]})}
                  useProse={formData.overview.useProse !== false}
                  onProseChange={val => updateSection('overview', {...formData.overview, useProse: val})}
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
                <input type="text" value={formData.scope.subtitle || ''} onChange={e => updateSection('scope', {...formData.scope, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Endless opportunities" />
              </div>
              <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] overflow-hidden rounded-none">
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">Background Image</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input type="text" value={formData.scope.bgImage || ''} onChange={e => updateSection('scope', {...formData.scope, bgImage: e.target.value})} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                  <div className="w-full sm:w-auto shrink-0"><MediaUploader category="courses" onUploadSuccess={url => updateSection('scope', {...formData.scope, bgImage: url})} /></div>
                </div>
              </div>
              <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Scope Body (Rich Text)</label>
                <RichTextEditor 
                  value={formData.scope.body || ''} 
                  onChange={val => updateSection('scope', {...formData.scope, body: val})} 
                  useProse={formData.scope.useProse !== false}
                  onProseChange={val => updateSection('scope', {...formData.scope, useProse: val})}
                />
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
                <RichTextEditor 
                  value={formData.curriculum.introNote || ''} 
                  onChange={val => updateSection('curriculum', {...formData.curriculum, introNote: val})} 
                  useProse={formData.curriculum.useProse !== false}
                  onProseChange={val => updateSection('curriculum', {...formData.curriculum, useProse: val})}
                />
              </div>
              <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">Outro Note</label>
                <RichTextEditor 
                  value={formData.curriculum.outroNote || ''} 
                  onChange={val => updateSection('curriculum', {...formData.curriculum, outroNote: val})} 
                  useProse={formData.curriculum.useProse !== false}
                  onProseChange={val => updateSection('curriculum', {...formData.curriculum, useProse: val})}
                />
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
                <input type="text" value={formData.exploreDepartment.subtitle || ''} onChange={e => updateSection('exploreDepartment', {...formData.exploreDepartment, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Discover our specialized wings" />
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
                <input type="text" value={formData.admissionFee.subtitle || ''} onChange={e => updateSection('admissionFee', {...formData.admissionFee, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Simple steps to join" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] overflow-hidden rounded-none">
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">Background Image</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text" value={formData.admissionFee.bgImage || ''} onChange={e => updateSection('admissionFee', {...formData.admissionFee, bgImage: e.target.value})} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                    <div className="w-full sm:w-auto shrink-0"><MediaUploader category="courses" onUploadSuccess={url => updateSection('admissionFee', {...formData.admissionFee, bgImage: url})} /></div>
                  </div>
                </div>
                <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none">
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">YouTube Video ID</label>
                  <input type="text" placeholder="e.g. ScMzIvxBSi4" value={formData.admissionFee.youtubeVideoId || ''} onChange={e => updateSection('admissionFee', {...formData.admissionFee, youtubeVideoId: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
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
                  <input type="text" value={formData.scholarships.subtitle || ''} onChange={e => updateSection('scholarships', {...formData.scholarships, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Scholarship for Session 2026-27" />
               </div>
               <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] mt-2 rounded-none">
                 <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">Section Background</label>
                 <div className="flex flex-col sm:flex-row gap-2">
                   <input type="text" value={formData.scholarships.bgImage || ''} onChange={e => updateSection('scholarships', {...formData.scholarships, bgImage: e.target.value})} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
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
                             const nr = [...formData.scholarships.rows]; nr[rIdx].range = e.target.value; updateSection('scholarships', {...formData.scholarships, range: nr});
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
            <div className="space-y-6">
              <NestedListEditor 
                label="Course Questions"
                items={formData.faq.items}
                newItemTemplate={{ q: '', a: '', useProse: true }}
                fields={[{key: 'q', label: 'Question'}, {key: 'a', label: 'Answer', type: 'richText'}]}
                onUpdate={items => updateSection('faq', {...formData.faq, items: items})}
              />
            </div>
          )}

          {/* WHY JOIN */}
           {activeSection === 'whyJoin' && (
             <div className="space-y-6">
               <TitleEditor label="Why Join Section" value={formData.whyJoin.sectionTitle} onChange={val => updateSection('whyJoin', {...formData.whyJoin, sectionTitle: val})} />
               <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Subtitle</label>
                  <input type="text" value={formData.whyJoin.subtitle || ''} onChange={e => updateSection('whyJoin', {...formData.whyJoin, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Unlock your potential" />
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
                <input type="text" value={formData.uniqueFeatures.subtitle || ''} onChange={e => updateSection('uniqueFeatures', {...formData.uniqueFeatures, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs focus:border-[var(--color-primary)] outline-none bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Setting us apart" />
              </div>
              <div className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] overflow-hidden rounded-none">
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2">Features Background Image</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input type="text" value={formData.uniqueFeatures.bgImage || ''} onChange={e => updateSection('uniqueFeatures', {...formData.uniqueFeatures, bgImage: e.target.value})} className="flex-1 border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2 tracking-wider">Guide Subtitle</label>
                  <input type="text" value={formData.applySteps.guideLabel || ''} onChange={e => updateSection('applySteps', {...formData.applySteps, guideLabel: e.target.value})} className="w-full border border-[var(--border-default)] p-3 text-sm outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none shadow-sm" placeholder="e.g. Guide to Register Online" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2 tracking-wider">CTA Label</label>
                  <input type="text" value={formData.applySteps.ctaLabel || ''} onChange={e => updateSection('applySteps', {...formData.applySteps, ctaLabel: e.target.value})} className="w-full border border-[var(--border-default)] p-3 text-sm outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none shadow-sm" placeholder="e.g. Start Your Application" />
                </div>
                <div className="md:col-span-2 bg-[var(--bg-muted)] p-5 border border-[var(--border-light)] mt-2">
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-2 tracking-wider">Section Background Image (Optimized View)</label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input type="text" value={formData.applySteps.bgImage || ''} onChange={e => updateSection('applySteps', {...formData.applySteps, bgImage: e.target.value})} className="w-full flex-1 border border-[var(--border-default)] p-3 text-sm outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none shadow-sm" placeholder="Enter image URL or select media..." />
                    <div className="w-full sm:w-auto shrink-0"><MediaUploader category="courses" onUploadSuccess={url => updateSection('applySteps', {...formData.applySteps, bgImage: url})} /></div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-[var(--border-light)]">
                <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-3 tracking-widest">Application Steps</p>
                {formData.applySteps.steps?.map((s, idx) => (
                  <div key={idx} className="bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] relative group hover:border-[var(--border-dark)] transition-colors rounded-none">
                    <button onClick={() => updateSection('applySteps', {...formData.applySteps, steps: formData.applySteps.steps.filter((_, i) => i !== idx)})} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2 sm:mt-0">
                      <div className="sm:col-span-1">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1.5 uppercase tracking-wider">Step Number</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 1"
                          value={s.step} 
                          onChange={e => { const n = [...formData.applySteps.steps]; n[idx].step = e.target.value; updateSection('applySteps', {...formData.applySteps, steps: n})}} 
                          className="w-full border border-[var(--border-default)] p-3 text-sm font-bold outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none shadow-sm" 
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1.5 uppercase tracking-wider">Step Title / Label</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Online Registration"
                          value={s.label} 
                          onChange={e => { const n = [...formData.applySteps.steps]; n[idx].label = e.target.value; updateSection('applySteps', {...formData.applySteps, steps: n})}} 
                          className="w-full border border-[var(--border-default)] p-3 text-sm font-bold outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none shadow-sm" 
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1.5 uppercase tracking-wider">Step Instructions (Rich Text)</label>
                        <RichTextEditor 
                          value={s.desc} 
                          onChange={content => { 
                            const n = [...formData.applySteps.steps]; 
                            n[idx].desc = content; 
                            updateSection('applySteps', {...formData.applySteps, steps: n})
                          }}
                          placeholder="Detail the steps for the student..."
                          useProse={true}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[9px] text-[var(--text-muted)] font-bold block mb-1.5 uppercase tracking-wider">Step Icon</label>
                        <IconPicker value={s.icon} onChange={val => { const n = [...formData.applySteps.steps]; n[idx].icon = val; updateSection('applySteps', {...formData.applySteps, steps: n})}} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateSection('applySteps', {...formData.applySteps, steps: [...(formData.applySteps.steps || []), { icon: 'UserCheck', step: '1', label: '', desc: '' }]})} className="text-[10px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] uppercase tracking-widest transition-colors flex items-center gap-1.5"><Plus size={14} strokeWidth={2.5}/> ADD STEP</button>
              </div>
            </div>
          )}

          {/* ROADMAP */}
          {activeSection === 'roadmap' && (
            <div className="space-y-6">
              <TitleEditor 
                label="Roadmap Section Title" 
                value={formData.roadmap.sectionTitle} 
                onChange={val => updateSection('roadmap', {...formData.roadmap, sectionTitle: val})} 
              />
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Section Subtitle</label>
                <input 
                  type="text" 
                  value={formData.roadmap.subtitle || ''} 
                  onChange={e => updateSection('roadmap', {...formData.roadmap, subtitle: e.target.value})} 
                  className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" 
                  placeholder="e.g. Your journey from foundation to industry expert."
                />
              </div>

              <div className="flex justify-between items-center border-b border-[var(--border-light)] pt-6 pb-3">
                <h4 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Yearly Learning Roadmap</h4>
                <button 
                  onClick={() => updateSection('roadmap', {
                    ...formData.roadmap,
                    years: [...(formData.roadmap.years || []), { 
                      id: Date.now(), tabLabel: `YEAR ${formData.roadmap.years?.length + 1}`, tabTitle: 'New Year', 
                      contentTitle: 'Year Heading', contentDesc: 'Year Description', badge: `YEAR-${formData.roadmap.years?.length + 1}`,
                      skills: [], aiTools: [], concepts: [], projects: [], subjects: [] 
                    }]
                  })} 
                  className="bg-[var(--text-primary)] text-[var(--bg-surface)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide hover:bg-[var(--text-secondary)] transition-colors rounded-none"
                >
                  ADD YEAR
                </button>
              </div>

              <div className="space-y-4">
                {(formData.roadmap.years || []).map((year, yIdx) => (
                  <div key={yIdx} className="border border-[var(--border-default)] bg-[var(--bg-muted)] p-5 relative rounded-none">
                    <button 
                      onClick={() => updateSection('roadmap', {
                        ...formData.roadmap,
                        years: formData.roadmap.years.filter((_, i) => i !== yIdx)
                      })} 
                      className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 pb-5 border-b border-[var(--border-light)]">
                      <div>
                        <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase block mb-1">Tab Label (e.g. YEAR 1)</label>
                        <input type="text" value={year.tabLabel} onChange={e => { const n = [...formData.roadmap.years]; n[yIdx].tabLabel = e.target.value; updateSection('roadmap', {...formData.roadmap, years: n}); }} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase block mb-1">Tab Title (e.g. Foundation)</label>
                        <input type="text" value={year.tabTitle} onChange={e => { const n = [...formData.roadmap.years]; n[yIdx].tabTitle = e.target.value; updateSection('roadmap', {...formData.roadmap, years: n}); }} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase block mb-1">Badge (e.g. YEAR-1)</label>
                        <input type="text" value={year.badge} onChange={e => { const n = [...formData.roadmap.years]; n[yIdx].badge = e.target.value; updateSection('roadmap', {...formData.roadmap, years: n}); }} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      </div>
                      <div className="lg:col-span-2">
                        <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase block mb-1">Content Title (Main Heading)</label>
                        <input type="text" value={year.contentTitle} onChange={e => { const n = [...formData.roadmap.years]; n[yIdx].contentTitle = e.target.value; updateSection('roadmap', {...formData.roadmap, years: n}); }} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                      </div>
                      <div className="md:col-span-2 lg:col-span-3">
                        <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase block mb-1">Content Description</label>
                        <textarea value={year.contentDesc} onChange={e => { const n = [...formData.roadmap.years]; n[yIdx].contentDesc = e.target.value; updateSection('roadmap', {...formData.roadmap, years: n}); }} className="w-full border border-[var(--border-default)] p-2 text-xs h-16 outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none resize-none" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <StringListEditor label="Skills (Tags)" value={year.skills || []} onChange={val => { const n = [...formData.roadmap.years]; n[yIdx].skills = val; updateSection('roadmap', {...formData.roadmap, years: n}); }} />
                      <div className="pt-4 border-t border-[var(--border-light)]">
                        <NestedListEditor 
                          label="AI Tools" 
                          items={year.aiTools || []} 
                          newItemTemplate={{ name: '', desc: '', icon: 'Bot', color: '#000' }}
                          fields={[{key: 'name', label: 'Name'}, {key: 'desc', label: 'Description'}, {key: 'icon', label: 'Icon', type: 'icon'}, {key: 'color', label: 'Color', type: 'color'}]}
                          onUpdate={items => { const n = [...formData.roadmap.years]; n[yIdx].aiTools = items; updateSection('roadmap', {...formData.roadmap, years: n}); }}
                        />
                      </div>
                      <div className="pt-4 border-t border-[var(--border-light)]">
                        <NestedListEditor 
                          label="Classroom Concepts" 
                          items={year.concepts || []} 
                          newItemTemplate={{ title: '', desc: '', icon: '🖥️' }}
                          fields={[{key: 'title', label: 'Title'}, {key: 'desc', label: 'Description'}, {key: 'icon', label: 'Emoji/Icon'}]}
                          onUpdate={items => { const n = [...formData.roadmap.years]; n[yIdx].concepts = items; updateSection('roadmap', {...formData.roadmap, years: n}); }}
                        />
                      </div>
                      <div className="pt-4 border-t border-[var(--border-light)]">
                        <NestedListEditor 
                          label="Projects" 
                          items={year.projects || []} 
                          newItemTemplate={{ name: '', desc: '', companies: '', color: '#3ccc8b' }}
                          fields={[{key: 'name', label: 'Project Name'}, {key: 'desc', label: 'Description'}, {key: 'companies', label: 'Target Companies'}, {key: 'color', label: 'Accent Color', type: 'color'}]}
                          onUpdate={items => { const n = [...formData.roadmap.years]; n[yIdx].projects = items; updateSection('roadmap', {...formData.roadmap, years: n}); }}
                        />
                      </div>
                      <div className="pt-4 border-t border-[var(--border-light)]">
                        <StringListEditor label="View All Subjects List" value={year.subjects || []} onChange={val => { const n = [...formData.roadmap.years]; n[yIdx].subjects = val; updateSection('roadmap', {...formData.roadmap, years: n}); }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PLACEMENTS */}
          {activeSection === 'placements' && (
            <div className="space-y-6">
              <TitleEditor label="Placements Title" value={formData.placements.title} onChange={val => updateSection('placements', {...formData.placements, title: val})} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Badge/Label</label>
                  <input type="text" value={formData.placements.label || ''} onChange={e => updateSection('placements', {...formData.placements, label: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Placement Records" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Subtitle</label>
                  <input type="text" value={formData.placements.subtitle || ''} onChange={e => updateSection('placements', {...formData.placements, subtitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                </div>
              </div>
              <NestedListEditor 
                label="Placement Stats"
                items={formData.placements.stats || []}
                newItemTemplate={{ value: '', label: '', icon: 'TrendingUp' }}
                fields={[{key: 'icon', label: 'Icon', type: 'icon'}, {key: 'value', label: 'Value'}, {key: 'label', label: 'Label'}]}
                onUpdate={items => updateSection('placements', {...formData.placements, stats: items})}
              />
              <NestedListEditor 
                label="Highlighted Students"
                items={formData.placements.list || []}
                newItemTemplate={{ name: '', company: '', img: '', pkg: '', role: '' }}
                fields={[
                  {key: 'name', label: 'Student Name'}, 
                  {key: 'company', label: 'Company'}, 
                  {key: 'img', label: 'Photo URL', type: 'image'}, 
                  {key: 'pkg', label: 'Package'}, 
                  {key: 'role', label: 'Role'}
                ]}
                onUpdate={items => updateSection('placements', {...formData.placements, list: items})}
              />
            </div>
          )}

          {/* INDUSTRY PARTNERS */}
          {activeSection === 'industry' && (
            <div className="space-y-6">
              <TitleEditor label="Industry Partners Title" value={formData.industry.title} onChange={val => updateSection('industry', {...formData.industry, title: val})} />
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Section Label (Badge)</label>
                <input type="text" value={formData.industry.label || ''} onChange={e => updateSection('industry', {...formData.industry, label: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" placeholder="e.g. Industry Tie-ups" />
              </div>
              <NestedListEditor 
                label="Partner Logos"
                items={formData.industry.partners || []}
                newItemTemplate={{ name: '', url: '' }}
                fields={[{key: 'name', label: 'Partner Name'}, {key: 'url', label: 'Logo URL', type: 'image'}]}
                onUpdate={items => updateSection('industry', {...formData.industry, partners: items})}
              />
            </div>
          )}

          {/* TESTIMONIALS */}
          {activeSection === 'testimonials' && (
            <div className="space-y-6">
                <TitleEditor 
                  label="Testimonials Title" 
                  value={{ main: formData.testimonials.title, highlight: formData.testimonials.highlight }} 
                  onChange={val => updateSection('testimonials', {...formData.testimonials, title: val.main, highlight: val.highlight})} 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--bg-muted)] p-3">
                   <div>
                     <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Section Tagline</label>
                     <input type="text" value={formData.testimonials.tagline} onChange={e => updateSection('testimonials', {...formData.testimonials, tagline: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                   </div>
                   <div>
                     <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Map/Location Label</label>
                     <input type="text" value={formData.testimonials.location} onChange={e => updateSection('testimonials', {...formData.testimonials, location: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                   </div>
                   <div>
                     <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Package Label</label>
                     <input type="text" value={formData.testimonials.packageLabel} onChange={e => updateSection('testimonials', {...formData.testimonials, packageLabel: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                   </div>
                   <div>
                     <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">Verify Label</label>
                     <input type="text" value={formData.testimonials.verifyLabel} onChange={e => updateSection('testimonials', {...formData.testimonials, verifyLabel: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none" />
                   </div>
                </div>

                <NestedListEditor 
                  label="Student Feed"
                  items={formData.testimonials.testimonials || []}
                  newItemTemplate={{ name: '', course: '', company: '', package: '', rating: 5, batch: '', quote: '', img: '' }}
                  fields={[
                    {key: 'name', label: 'Name'},
                    {key: 'course', label: 'Course/Degree'},
                    {key: 'company', label: 'Placed Company'},
                    {key: 'package', label: 'Salary/Offer'},
                    {key: 'batch', label: 'Batch'},
                    {key: 'rating', label: 'Rating (1-5)', type: 'number'},
                    {key: 'img', label: 'Student Photo', type: 'image', fullWidth: true},
                    {key: 'quote', label: 'Testimonial Quote', type: 'textarea', fullWidth: true}
                  ]}
                  onUpdate={items => updateSection('testimonials', {...formData.testimonials, testimonials: items})}
                />
            </div>
          )}

          {/* AI SPECIALIZATION EDITORS */}
          {activeSection === 'ai_hero' && <AiEditors.AiHeroEditor data={formData.ai_hero} onChange={v => updateSection('ai_hero', v)} />}
          {activeSection === 'ai_highlights' && <AiEditors.AiHighlightsEditor data={formData.ai_highlights} onChange={v => updateSection('ai_highlights', v)} />}
          {activeSection === 'ai_features' && <AiEditors.AiFeaturesEditor data={formData.ai_features} onChange={v => updateSection('ai_features', v)} />}
          {activeSection === 'ai_curriculum' && <AiEditors.AiCurriculumEditor data={formData.ai_curriculum} onChange={v => updateSection('ai_curriculum', v)} />}
          {activeSection === 'ai_admissions' && <AiEditors.AiAdmissionsEditor data={formData.ai_admissions} onChange={v => updateSection('ai_admissions', v)} />}
          {activeSection === 'ai_placements' && <AiEditors.AiPlacementsEditor data={formData.ai_placements} onChange={v => updateSection('ai_placements', v)} />}
          {activeSection === 'ai_comparison' && <AiEditors.AiComparisonEditor data={formData.ai_comparison} onChange={v => updateSection('ai_comparison', v)} />}
          {activeSection === 'ai_team' && <AiEditors.AiTeamEditor data={formData.ai_team} onChange={v => updateSection('ai_team', v)} />}
          {activeSection === 'ai_cta' && <AiEditors.AiCTAEditor data={formData.ai_cta} onChange={v => updateSection('ai_cta', v)} />}
          {activeSection === 'ai_faq' && <AiEditors.AiFAQEditor data={formData.ai_faq} onChange={v => updateSection('ai_faq', v)} />}

        </div>
      </Modal>

      {/* --- Smart Section Picker Modal --- */}
      <Modal 
        isOpen={isPickerOpen} 
        onClose={() => setIsPickerOpen(false)} 
        title="Add System Section"
        maxWidth="max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-1">
          {/* Regular Sections */}
          <div>
            <div className="flex items-center gap-2 border-b-2 border-gray-100 pb-3 mb-4">
              <LayoutTemplate size={16} className="text-gray-400" />
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Regular Course Sections</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                 { id: 'hero', label: 'Hero (Premium)', icon: 'LayoutTemplate' },
                 { id: 'overview', label: 'Overview', icon: 'Info' },
                 { id: 'curriculum', label: 'Syllabus', icon: 'FileText' },
                 { id: 'roadmap', label: 'Course Path', icon: 'Rocket' },
                 { id: 'admissionFee', label: 'Fees & Entry', icon: 'Layers' },
                 { id: 'scholarships', label: 'Financial Aid', icon: 'Award' },
                 { id: 'whyJoin', label: 'Value Prop', icon: 'Zap' },
                 { id: 'uniqueFeatures', label: 'Key Pillars', icon: 'Target' },
                 { id: 'applySteps', label: 'How to Apply', icon: 'History' },
                 { id: 'faq', label: 'Generic FAQs', icon: 'HelpCircle' },
                 { id: 'industry', label: 'Hiring Partners', icon: 'Briefcase' },
                 { id: 'exploreDepartment', label: 'Dept. Wings', icon: 'Layers' },
                 { id: 'accomplishments', label: 'Impact Data', icon: 'BarChart' },
              ].map(sec => (
                <button 
                  key={sec.id}
                  disabled={formData.layoutOrder.includes(sec.id)}
                  onClick={() => { addSystemSection(sec.id); setIsPickerOpen(false); }}
                  className={`flex items-center gap-3 p-3 text-left transition-all border ${formData.layoutOrder.includes(sec.id) ? 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed' : 'bg-white hover:bg-[var(--bg-muted)] hover:border-[var(--color-primary)] border-gray-200'}`}
                >
                   <SafelyRenderIcon 
                     iconName={sec.icon} 
                     fallbackIcon={CircleHelp} 
                     size={18} 
                     className={formData.layoutOrder.includes(sec.id) ? 'text-gray-300' : 'text-[var(--color-primary)]'} 
                   />
                   <span className="text-[10px] font-bold uppercase tracking-wide">{sec.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Specialization Sections */}
          <div>
            <div className="flex items-center gap-2 border-b-2 border-blue-100 pb-3 mb-4">
              <Zap size={16} className="text-blue-500 fill-blue-500" />
              <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Specialization (AI-First)</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'ai_hero', label: 'AI Particles Hero', icon: 'Cpu' },
                { id: 'ai_highlights', label: 'Metric Pill Highlights', icon: 'Zap' },
                { id: 'ai_features', label: 'AI Flip Cards', icon: 'RotateCcw' },
                { id: 'ai_curriculum', label: '4-Year Journey Map', icon: 'Layers' },
                { id: 'ai_admissions', label: 'AI Timeline Steps', icon: 'History' },
                { id: 'ai_placements', label: 'Career Pillars', icon: 'Award' },
                { id: 'ai_comparison', label: 'CPU vs Others Table', icon: 'ShieldAlert' },
                { id: 'ai_team', label: 'Mentorship Board', icon: 'Users' },
                { id: 'ai_cta', label: 'AI Call To Action', icon: 'Target' },
                { id: 'ai_faq', label: 'AI Native FAQs', icon: 'HelpCircle' },
              ].map(sec => (
                <button 
                  key={sec.id}
                  disabled={formData.layoutOrder.includes(sec.id)}
                  onClick={() => { addSystemSection(sec.id); setIsPickerOpen(false); }}
                  className={`flex items-center gap-3 p-3 text-left transition-all border ${formData.layoutOrder.includes(sec.id) ? 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed' : 'bg-blue-50/40 hover:bg-blue-50 hover:border-blue-400 border-blue-100'}`}
                >
                   <SafelyRenderIcon 
                     iconName={sec.icon} 
                     fallbackIcon={Zap} 
                     size={18} 
                     className={formData.layoutOrder.includes(sec.id) ? 'text-gray-300' : 'text-blue-600'} 
                   />
                   <span className="text-[10px] font-bold uppercase tracking-wide text-blue-900">{sec.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}