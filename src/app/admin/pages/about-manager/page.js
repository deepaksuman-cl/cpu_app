"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Save, 
  Trash2, 
  Plus, 
  Image as ImageIcon, 
  Settings, 
  Layout, 
  Info, 
  Eye,
  CheckCircle2,
  AlertCircle,
  Pencil
} from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import MediaUploader from "@/components/admin/MediaUploader";
import IconPicker from "@/components/admin/ui/IconPicker";
import Modal from "@/components/admin/ui/Modal";

// --- Shared Local Components (Zero-Radius Design) ---

const Label = ({ children }) => (
  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1.5">
    {children}
  </label>
);

const Input = ({ ...props }) => (
  <input 
    {...props} 
    className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" 
  />
);

const TextArea = ({ ...props }) => (
  <textarea 
    {...props} 
    className="w-full border border-[var(--border-default)] p-2 text-xs h-24 outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors resize-none" 
  />
);

const StringListEditor = ({ value = [], onChange, label }) => (
  <div className="space-y-2 mt-3">
    <Label>{label}</Label>
    <div className="space-y-2 border-l-2 border-[var(--border-light)] pl-3">
      {value.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <Input 
            value={item} 
            onChange={e => {
              const newList = [...value]; 
              newList[idx] = e.target.value; 
              onChange(newList);
            }} 
            placeholder="Item text..."
          />
          <button 
            onClick={() => onChange(value.filter((_, i) => i !== idx))}
            className="text-[var(--text-muted)] hover:text-[var(--color-danger)] p-2 border border-[var(--border-default)] hover:border-[var(--color-danger-light)] hover:bg-[var(--color-danger-light)] transition-colors rounded-none"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button 
        onClick={() => onChange([...value, ""])}
        className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] uppercase tracking-wide mt-1"
      >
        <Plus size={14} /> Add Item
      </button>
    </div>
  </div>
);

const NestedListEditor = ({ label, items = [], fields, onUpdate, newItemTemplate }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center border-b border-[var(--border-light)] pb-2">
      <h4 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</h4>
      <button 
        onClick={() => onUpdate([...items, newItemTemplate])} 
        className="flex items-center justify-center gap-1 text-[10px] font-bold text-[var(--text-inverse)] bg-[var(--text-primary)] hover:bg-[var(--text-secondary)] transition-colors px-3 py-1.5 uppercase tracking-wide rounded-none"
      >
        <Plus size={14} /> Row
      </button>
    </div>
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 relative group hover:border-[var(--border-dark)] transition-colors rounded-none">
          <button 
            onClick={() => onUpdate(items.filter((_, i) => i !== idx))} 
            className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1 transition-colors bg-[var(--bg-surface)] border border-transparent hover:border-[var(--color-danger-light)] rounded-none"
          >
            <Trash2 size={16} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {fields.map(field => (
              <div key={field.key} className={field.type === 'textArea' ? 'md:col-span-2' : ''}>
                <Label>{field.label}</Label>
                {field.type === 'icon' ? (
                  <IconPicker 
                    value={item[field.key]} 
                    onChange={val => {
                      const newItems = [...items]; 
                      newItems[idx] = { ...newItems[idx], [field.key]: val }; 
                      onUpdate(newItems);
                    }} 
                  />
                ) : field.type === 'textArea' ? (
                  <TextArea 
                    value={item[field.key] || ''} 
                    onChange={e => {
                      const newItems = [...items]; 
                      newItems[idx] = { ...newItems[idx], [field.key]: e.target.value }; 
                      onUpdate(newItems);
                    }}
                    className="h-20"
                  />
                ) : (
                  <Input 
                    value={item[field.key] || ''} 
                    onChange={e => {
                      const newItems = [...items]; 
                      newItems[idx] = { ...newItems[idx], [field.key]: e.target.value }; 
                      onUpdate(newItems);
                    }} 
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Main Admin Page ---

export default function AboutManager() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: null, text: "" });

  // Dashboard State
  const [activeSection, setActiveSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Page Data States
  const [mainAbout, setMainAbout] = useState(null);
  const [ourRoots, setOurRoots] = useState(null);
  const [visionMission, setVisionMission] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/content/about");
      const result = await res.json();
      if (result.success) {
        setMainAbout(result.data.main_about);
        setOurRoots(result.data.our_roots);
        setVisionMission(result.data.vision_mission);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (sectionKey, content) => {
    setIsSaving(true);
    setMessage({ type: null, text: "" });
    try {
      const res = await fetch("/api/admin/content/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section_key: sectionKey, content }),
      });
      const result = await res.json();
      if (result.success) {
        setMessage({ type: "success", text: `${sectionKey.replace("_", " ")} updated successfully!` });
      } else {
        setMessage({ type: "error", text: result.error || "Save failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage({ type: null, text: "" }), 3000);
    }
  };

  const SectionCard = ({ id, title, description, icon: Icon }) => (
    <div className="border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-[var(--color-primary)] transition-all rounded-none group shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-none shrink-0 bg-[var(--color-primary-lighter)] text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-[var(--text-inverse)]">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="font-bold text-[var(--text-primary)] text-[13px] uppercase tracking-wide leading-tight">{title}</h3>
          <p className="text-[10px] text-[var(--text-muted)] mt-1 uppercase tracking-widest font-medium">{description}</p>
        </div>
      </div>
      <button 
        onClick={() => { setActiveSection(id); setIsModalOpen(true); }}
        className="w-full sm:w-auto px-5 py-2 border border-[var(--border-dark)] text-[var(--text-secondary)] font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] hover:text-[var(--text-inverse)] transition-all rounded-none flex items-center justify-center gap-2"
      >
        <Pencil size={12} strokeWidth={2.5} /> Edit Section
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  const SECTION_MAP = {
    main: { title: "Main About", desc: "Hero tags, group intro, and stats.", icon: Info },
    roots: { title: "Our Roots", desc: "History, heritage, and institutions.", icon: Settings },
    vision: { title: "Vision & Mission", desc: "Core values, vision, and approach.", icon: Eye },
  };

  const handleGlobalSave = async () => {
    setIsSaving(true);
    try {
      // Save all sections sequentially for simplicity, or use Promise.all
      await Promise.all([
        fetch("/api/admin/content/about", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section_key: "main_about", content: mainAbout }),
        }),
        fetch("/api/admin/content/about", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section_key: "our_roots", content: ourRoots }),
        }),
        fetch("/api/admin/content/about", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section_key: "vision_mission", content: visionMission }),
        })
      ]);
      setMessage({ type: "success", text: "All sections updated successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred during global save." });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage({ type: null, text: "" }), 3000);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 pb-32">
      {/* Header */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-6 shadow-[var(--shadow-sm)] space-y-4 rounded-none">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--color-primary)] p-2.5 rounded-none">
              <Layout className="text-[var(--text-inverse)]" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight">About Manager</h1>
              <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mt-0.5">Centralized dashboard for About Us pages</p>
            </div>
          </div>
          
          {message.text && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-none border text-xs font-bold uppercase tracking-wide animate-in fade-in slide-in-from-top-2 duration-300 ${
              message.type === "success" ? "bg-[var(--color-success-light)] border-[var(--color-success)] text-[var(--color-success-dark)]" : "bg-[var(--color-danger-light)] border-[var(--color-danger)] text-[var(--color-danger-dark)]"
            }`}>
              {message.type === "success" ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              {message.text}
            </div>
          )}
        </div>
        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          Manage the structural content of your university's "About" sections. 
          Each card below represents a major block of information. Click <strong>Edit Section</strong> to modify details in a modal. 
          Remember to save your changes using the floating bar at the bottom.
        </p>
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(SECTION_MAP).map(([key, section]) => (
          <SectionCard 
            key={key}
            id={key}
            title={section.title}
            description={section.desc}
            icon={section.icon}
          />
        ))}
      </div>

      {/* Floating Save Bar */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center justify-end">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-dark)] p-2.5 shadow-[var(--shadow-lg)] flex items-center gap-4 rounded-none">
          <div className="hidden sm:flex flex-col text-right px-4 border-r border-[var(--border-light)]">
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Global State</span>
            <span className="text-[11px] font-black text-[var(--color-primary)] uppercase">{isSaving ? 'Saving...' : 'Changes Ready'}</span>
          </div>
          <button
            onClick={handleGlobalSave}
            disabled={isSaving}
            className="px-10 py-3 bg-[var(--color-success-dark)] text-[var(--text-inverse)] text-[11px] font-black uppercase tracking-widest hover:bg-[var(--color-success)] flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50 shadow-[var(--shadow-md)]"
          >
            <Save size={16} />
            {isSaving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Edit ${SECTION_MAP[activeSection]?.title}`}
        footer={
          <div className="flex justify-between items-center w-full">
            <p className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Click Done to keep changes locally</p>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-8 py-2.5 bg-[var(--text-primary)] text-[var(--text-inverse)] text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--text-secondary)] transition-colors rounded-none"
            >
              Done Editing
            </button>
          </div>
        }
      >
        <div className="p-1 space-y-6">
          {activeSection === "main" && mainAbout && (
            <MainAboutTab 
              data={mainAbout} 
              onChange={setMainAbout} 
            />
          )}
          {activeSection === "roots" && ourRoots && (
            <OurRootsTab 
              data={ourRoots} 
              onChange={setOurRoots} 
            />
          )}
          {activeSection === "vision" && visionMission && (
            <VisionMissionTab 
              data={visionMission} 
              onChange={setVisionMission} 
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

// --- Tab: Main About ---

function MainAboutTab({ data, onChange }) {
  const [isUniModalOpen, setIsUniModalOpen] = useState(false);
  const [editingUni, setEditingUni] = useState(null);
  const [uniIdx, setUniIdx] = useState(-1);

  const openUniModal = (uni = null, idx = -1) => {
    setEditingUni(uni || {
      id: Date.now().toString(),
      name: "", location: "", established: "",
      campus: "", image: "", website: "",
      websiteUrl: "", description: "", highlights: [],
      color: "kota"
    });
    setUniIdx(idx);
    setIsUniModalOpen(true);
  };

  const saveUni = () => {
    const newList = [...data.universities];
    if (uniIdx >= 0) newList[uniIdx] = editingUni;
    else newList.push(editingUni);
    onChange({ ...data, universities: newList });
    setIsUniModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Group Tagline</Label>
            <Input value={data.group.tagline} onChange={e => onChange({...data, group: {...data.group, tagline: e.target.value}})} />
          </div>
          <div>
            <Label>Group Heading (Use \n for new line)</Label>
            <TextArea value={data.group.heading} onChange={e => onChange({...data, group: {...data.group, heading: e.target.value}})} />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label>Heading Highlight (Hero Strip)</Label>
            <TextArea value={data.group.highlight} onChange={e => onChange({...data, group: {...data.group, highlight: e.target.value}})} />
          </div>
          <div>
            <Label>Accreditation Banner Text</Label>
            <TextArea value={data.accreditation} onChange={e => onChange({...data, accreditation: e.target.value})} />
          </div>
        </div>
        <div className="md:col-span-2">
          <Label>Group Description</Label>
          <TextArea value={data.group.description} onChange={e => onChange({...data, group: {...data.group, description: e.target.value}})} />
        </div>
      </div>

      {/* Stats Editor */}
      <div className="pt-6 border-t border-[var(--border-light)]">
        <Label>Quick Stats (4 items recommended)</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
          {data.stats.map((stat, idx) => (
            <div key={idx} className="border border-[var(--border-default)] p-4 space-y-3 relative group bg-[var(--bg-muted)]/50">
              <button 
                onClick={() => onChange({...data, stats: data.stats.filter((_, i) => i !== idx)})}
                className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
              <div className="space-y-3">
                <div className="z-[60]">
                  <Label>Icon</Label>
                  <IconPicker value={stat.icon} onChange={val => {
                    const newList = [...data.stats]; newList[idx].icon = val; onChange({...data, stats: newList});
                  }} />
                </div>
                <div>
                  <Label>Value</Label>
                  <Input value={stat.value} onChange={e => {
                    const newList = [...data.stats]; newList[idx].value = e.target.value; onChange({...data, stats: newList});
                  }} />
                </div>
              </div>
              <div>
                <Label>Label</Label>
                <Input value={stat.label} onChange={e => {
                  const newList = [...data.stats]; newList[idx].label = e.target.value; onChange({...data, stats: newList});
                }} />
              </div>
            </div>
          ))}
          <button 
            onClick={() => onChange({...data, stats: [...data.stats, {icon: "Star", value: "", label: ""}]})}
            className="border-2 border-dashed border-[var(--border-default)] p-4 flex flex-col items-center justify-center text-[var(--text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] transition-all gap-2 h-full min-h-[120px] rounded-none"
          >
            <Plus size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Add Stat</span>
          </button>
        </div>
      </div>

      {/* Universities Editor */}
      <div className="pt-6 border-t border-[var(--border-light)]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Universities</h4>
          <button 
            onClick={() => openUniModal()}
            className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest"
          >
            <Plus size={14} /> Add University
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.universities.map((uni, idx) => (
            <div key={uni.id} className="flex gap-4 border border-[var(--border-default)] p-4 bg-[var(--bg-muted)]/50 group rounded-none">
              <div className="w-24 h-24 shrink-0 bg-[var(--bg-surface)] border border-[var(--border-default)] overflow-hidden rounded-none">
                {uni.image ? <img src={uni.image} className="w-full h-full object-cover" /> : <ImageIcon className="w-full h-full p-6 text-[var(--border-default)]" />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] font-bold text-[var(--text-primary)] truncate uppercase tracking-wide">{uni.name}</h4>
                <p className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-widest">{uni.location}</p>
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => openUniModal(uni, idx)}
                    className="text-[9px] font-bold text-[var(--color-primary)] border border-[var(--color-primary)] px-3 py-1 hover:bg-[var(--color-primary)] hover:text-[var(--text-inverse)] transition-all uppercase tracking-widest rounded-none"
                  >
                    Edit Info
                  </button>
                  <button 
                    onClick={() => onChange({...data, universities: data.universities.filter((_, i) => i !== idx)})}
                    className="text-[9px] font-bold text-[var(--color-danger)] border border-[var(--color-danger)] px-3 py-1 hover:bg-[var(--color-danger-light)] transition-all uppercase tracking-widest rounded-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* University Modal */}
      <Modal isOpen={isUniModalOpen} onClose={() => setIsUniModalOpen(false)} title="University Details">
        {editingUni && (
          <div className="space-y-5 p-1 max-h-[70vh] overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>University Name</Label>
                <Input value={editingUni.name} onChange={e => setEditingUni({...editingUni, name: e.target.value})} />
              </div>
              <div>
                <Label>Location</Label>
                <Input value={editingUni.location} onChange={e => setEditingUni({...editingUni, location: e.target.value})} />
              </div>
              <div>
                <Label>Established</Label>
                <Input value={editingUni.established} onChange={e => setEditingUni({...editingUni, established: e.target.value})} />
              </div>
              <div>
                <Label>Campus Size</Label>
                <Input value={editingUni.campus} onChange={e => setEditingUni({...editingUni, campus: e.target.value})} />
              </div>
              <div>
                <Label>Website Text</Label>
                <Input value={editingUni.website} onChange={e => setEditingUni({...editingUni, website: e.target.value})} />
              </div>
              <div>
                <Label>Website URL</Label>
                <Input value={editingUni.websiteUrl} onChange={e => setEditingUni({...editingUni, websiteUrl: e.target.value})} />
              </div>
            </div>
            
            <div>
              <Label>Campus Image</Label>
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center shrink-0">
                  {editingUni.image ? <img src={editingUni.image} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-300" />}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <Input value={editingUni.image} onChange={e => setEditingUni({...editingUni, image: e.target.value})} placeholder="Image URL..." />
                  <MediaUploader onUploadSuccess={url => setEditingUni({...editingUni, image: url})} />
                </div>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <TextArea value={editingUni.description} onChange={e => setEditingUni({...editingUni, description: e.target.value})} />
            </div>

            <StringListEditor 
              label="Highlights" 
              value={editingUni.highlights || []} 
              onChange={vals => setEditingUni({...editingUni, highlights: vals})} 
            />

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
              <button 
                onClick={() => setIsUniModalOpen(false)}
                className="px-6 py-2 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest hover:bg-[var(--bg-muted)] transition-all rounded-none"
              >
                Cancel
              </button>
              <button 
                onClick={saveUni}
                className="px-8 py-2 bg-[var(--color-primary)] text-[var(--text-inverse)] text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--color-primary-dark)] transition-all rounded-none"
              >
                Apply Changes
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// --- Tab: Our Roots ---

function OurRootsTab({ data, onChange }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Hero Badge</Label>
            <Input value={data.hero.badge} onChange={e => onChange({...data, hero: {...data.hero, badge: e.target.value}})} />
          </div>
          <div>
            <Label>Hero Title line 1</Label>
            <Input value={data.hero.title} onChange={e => onChange({...data, hero: {...data.hero, title: e.target.value}})} />
          </div>
          <div>
            <Label>Hero Title line 2 (Highlighted)</Label>
            <Input value={data.hero.subtitle} onChange={e => onChange({...data, hero: {...data.hero, subtitle: e.target.value}})} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Header Banner Text</Label>
          <TextArea value={data.bannerText} onChange={e => onChange({...data, bannerText: e.target.value})} className="h-[148px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Description Para 1</Label>
          <TextArea value={data.hero.description} onChange={e => onChange({...data, hero: {...data.hero, description: e.target.value}})} />
        </div>
        <div>
          <Label>Description Para 2</Label>
          <TextArea value={data.hero.description2} onChange={e => onChange({...data, hero: {...data.hero, description2: e.target.value}})} />
        </div>
        <div>
          <Label>Description Para 3</Label>
          <TextArea value={data.hero.description3} onChange={e => onChange({...data, hero: {...data.hero, description3: e.target.value}})} />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <Label>Institutions HTML Content (Rich Text)</Label>
        <div className="mt-3">
          <RichTextEditor 
            value={data.institutions_html} 
            onChange={val => onChange({...data, institutions_html: val})} 
            useProse={data.useProse}
            onProseChange={val => onChange({...data, useProse: val})}
          />
        </div>
      </div>
    </div>
  );
}

// --- Tab: Vision & Mission ---

function VisionMissionTab({ data, onChange }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quote and Hero Chips */}
        <div className="space-y-6">
          <div className="bg-[var(--bg-muted)]/30 p-5 border-l-2 border-[var(--color-primary)]">
            <Label>Top Quote Text</Label>
            <TextArea 
              value={data.quote.text} 
              onChange={e => onChange({...data, quote: {text: e.target.value}})} 
              className="h-24"
            />
          </div>

          <div className="pt-6 border-t border-[var(--border-light)]">
            <Label>Hero Chips (3 featured values)</Label>
            <div className="space-y-3 mt-3">
              {data.heroChips.map((chip, idx) => (
                <div key={idx} className="flex gap-3 bg-[var(--bg-muted)]/50 p-3 border border-[var(--border-default)] rounded-none">
                  <div className="w-40 shrink-0">
                    <Label>Icon</Label>
                    <IconPicker 
                      value={chip.icon} 
                      onChange={val => {
                        const newList = [...data.heroChips]; newList[idx].icon = val; onChange({...data, heroChips: newList});
                      }} 
                    />
                  </div>
                  <div className="flex-1">
                    <Label>Label</Label>
                    <Input 
                      value={chip.label} 
                      onChange={e => {
                        const newList = [...data.heroChips]; newList[idx].label = e.target.value; onChange({...data, heroChips: newList});
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision and Approach */}
        <div className="space-y-6">
          <div className="border border-[var(--border-default)] p-5 bg-[var(--bg-surface)] rounded-none shadow-sm">
            <div className="flex gap-3 items-center mb-6 pb-2 border-b border-[var(--border-light)]">
               <div className="w-40 shrink-0">
                <IconPicker 
                  value={data.vision.icon} 
                  onChange={val => onChange({...data, vision: {...data.vision, icon: val}})} 
                />
              </div>
              <h3 className="text-[12px] font-black text-[var(--color-primary)] uppercase tracking-widest flex-1">Vision Section</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Tag</Label>
                  <Input value={data.vision.tag} onChange={e => onChange({...data, vision: {...data.vision, tag: e.target.value}})} />
                </div>
                <div>
                  <Label>Heading</Label>
                  <Input value={data.vision.heading} onChange={e => onChange({...data, vision: {...data.vision, heading: e.target.value}})} />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <TextArea value={data.vision.description} onChange={e => onChange({...data, vision: {...data.vision, description: e.target.value}})} className="h-28" />
              </div>
            </div>
          </div>

          <div className="border border-[var(--border-default)] p-5 bg-[var(--bg-surface)] rounded-none shadow-sm">
            <div className="flex gap-3 items-center mb-6 pb-2 border-b border-[var(--border-light)]">
              <div className="w-40 shrink-0">
                <IconPicker 
                  value={data.approach.icon} 
                  onChange={val => onChange({...data, approach: {...data.approach, icon: val}})} 
                />
              </div>
              <h3 className="text-[12px] font-black text-[var(--color-warning-dark)] uppercase tracking-widest flex-1">Approach Section</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Tag</Label>
                  <Input value={data.approach.tag} onChange={e => onChange({...data, approach: {...data.approach, tag: e.target.value}})} />
                </div>
                <div>
                  <Label>Heading</Label>
                  <Input value={data.approach.heading} onChange={e => onChange({...data, approach: {...data.approach, heading: e.target.value}})} />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <TextArea value={data.approach.description} onChange={e => onChange({...data, approach: {...data.approach, description: e.target.value}})} className="h-28" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[var(--border-light)]">
        {/* Mission Section */}
        <NestedListEditor 
          label="Mission Items"
          items={data.mission.items}
          newItemTemplate={{ id: Date.now(), icon: "Star", text: "" }}
          fields={[
            { key: 'icon', label: 'Icon', type: 'icon' },
            { key: 'text', label: 'Point Text', type: 'textArea' }
          ]}
          onUpdate={newItems => onChange({...data, mission: {...data.mission, items: newItems}})}
        />

        {/* Values Section */}
        <NestedListEditor 
          label="Core Values"
          items={data.values.items}
          newItemTemplate={{ id: Date.now(), icon: "Star", label: "" }}
          fields={[
            { key: 'icon', label: 'Icon', type: 'icon' },
            { key: 'label', label: 'Value Name', type: 'text' }
          ]}
          onUpdate={newItems => onChange({...data, values: {...data.values, items: newItems}})}
        />
      </div>
    </div>
  );
}
