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
  AlertCircle
} from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import MediaUploader from "@/components/admin/MediaUploader";
import IconPicker from "@/components/admin/ui/IconPicker";
import Modal from "@/components/admin/ui/Modal";

// --- Shared Local Components (Zero-Radius Design) ---

const Label = ({ children }) => (
  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
    {children}
  </label>
);

const Input = ({ ...props }) => (
  <input 
    {...props} 
    className="w-full border border-gray-300 p-2 text-xs outline-none focus:border-[#00588b] bg-white text-gray-800 rounded-none transition-colors" 
  />
);

const TextArea = ({ ...props }) => (
  <textarea 
    {...props} 
    className="w-full border border-gray-300 p-2 text-xs h-24 outline-none focus:border-[#00588b] bg-white text-gray-800 rounded-none transition-colors resize-none" 
  />
);

const StringListEditor = ({ value = [], onChange, label }) => (
  <div className="space-y-2 mt-3">
    <Label>{label}</Label>
    <div className="space-y-2 border-l-2 border-gray-100 pl-3">
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
            className="text-gray-400 hover:text-red-600 p-2 border border-gray-300 hover:border-red-200 hover:bg-red-50 transition-colors rounded-none"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button 
        onClick={() => onChange([...value, ""])}
        className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#00588b] hover:text-[#00446b] uppercase tracking-wide mt-1"
      >
        <Plus size={14} /> Add Item
      </button>
    </div>
  </div>
);

// --- Main Admin Page ---

export default function AboutManager() {
  const [activeTab, setActiveTab] = useState("main");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: null, text: "" });

  // Page Data States
  const [mainAbout, setMainAbout] = useState(null);
  const [ourRoots, setOurRoots] = useState(null);
  const [visionMission, setVisionMission] = useState(null);

  // Modals for array editing
  const [editingItem, setEditingItem] = useState({ type: null, index: -1, data: null });

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00588b]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-gray-200 p-5 rounded-none shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#00588b] p-2 rounded-none">
            <Layout className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black text-gray-900 uppercase tracking-tight">About Manager</h1>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest mt-0.5">Manage dynamic content for About pages</p>
          </div>
        </div>
        
        {message.text && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-none border text-xs font-bold uppercase tracking-wide ${
            message.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"
          }`}>
            {message.type === "success" ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
            {message.text}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex bg-white border border-gray-200 p-1 rounded-none shadow-sm overflow-x-auto">
        {[
          { id: "main", label: "Main About", icon: Info },
          { id: "roots", label: "Our Roots", icon: Settings },
          { id: "vision", label: "Vision & Mission", icon: Eye },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all duration-200 whitespace-nowrap rounded-none border-b-2 ${
              activeTab === tab.id 
                ? "bg-[#00588b]/5 border-[#00588b] text-[#00588b]" 
                : "bg-transparent border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            <tab.icon size={14} strokeWidth={2.5} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-gray-200 p-8 rounded-none shadow-sm min-h-[500px]">
        {activeTab === "main" && mainAbout && (
          <MainAboutTab 
            data={mainAbout} 
            onChange={setMainAbout} 
            onSave={() => handleSave("main_about", mainAbout)}
            isSaving={isSaving}
          />
        )}
        {activeTab === "roots" && ourRoots && (
          <OurRootsTab 
            data={ourRoots} 
            onChange={setOurRoots} 
            onSave={() => handleSave("our_roots", ourRoots)}
            isSaving={isSaving}
          />
        )}
        {activeTab === "vision" && visionMission && (
          <VisionMissionTab 
            data={visionMission} 
            onChange={setVisionMission} 
            onSave={() => handleSave("vision_mission", visionMission)}
            isSaving={isSaving}
          />
        )}
      </div>
    </div>
  );
}

// --- Tab: Main About ---

function MainAboutTab({ data, onChange, onSave, isSaving }) {
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
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Main About Configuration</h2>
        <button 
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#00588b] hover:bg-[#00446b] text-white px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all rounded-none disabled:opacity-50"
        >
          <Save size={14} /> {isSaving ? "Saving..." : "Save Main About"}
        </button>
      </div>

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
      <div className="pt-6 border-t border-gray-100">
        <Label>Quick Stats (4 items recommended)</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
          {data.stats.map((stat, idx) => (
            <div key={idx} className="border border-gray-200 p-4 space-y-3 relative group bg-gray-50">
              <button 
                onClick={() => onChange({...data, stats: data.stats.filter((_, i) => i !== idx)})}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
              <div className="flex gap-2">
                <div className="w-1/3">
                  <Label>Icon</Label>
                  <IconPicker value={stat.icon} onChange={val => {
                    const newList = [...data.stats]; newList[idx].icon = val; onChange({...data, stats: newList});
                  }} />
                </div>
                <div className="w-2/3">
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
            className="border-2 border-dashed border-gray-200 p-4 flex flex-col items-center justify-center text-gray-400 hover:text-[#00588b] hover:border-[#00588b] transition-all gap-2 h-full min-h-[120px]"
          >
            <Plus size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Add Stat</span>
          </button>
        </div>
      </div>

      {/* Universities Editor */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <Label>Universities</Label>
          <button 
            onClick={() => openUniModal()}
            className="flex items-center gap-1.5 text-[10px] font-bold text-[#00588b] uppercase tracking-widest"
          >
            <Plus size={14} /> Add University
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.universities.map((uni, idx) => (
            <div key={uni.id} className="flex gap-4 border border-gray-200 p-4 bg-gray-50 group">
              <div className="w-24 h-24 shrink-0 bg-white border border-gray-200 overflow-hidden">
                {uni.image ? <img src={uni.image} className="w-full h-full object-cover" /> : <ImageIcon className="w-full h-full p-6 text-gray-200" />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] font-bold text-gray-900 truncate">{uni.name}</h4>
                <p className="text-[10px] text-gray-500 font-medium">{uni.location}</p>
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => openUniModal(uni, idx)}
                    className="text-[9px] font-bold text-[#00588b] border border-[#00588b] px-3 py-1 hover:bg-[#00588b] hover:text-white transition-all uppercase tracking-widest"
                  >
                    Edit Info
                  </button>
                  <button 
                    onClick={() => onChange({...data, universities: data.universities.filter((_, i) => i !== idx)})}
                    className="text-[9px] font-bold text-red-500 border border-red-500 px-3 py-1 hover:bg-red-50 transition-all uppercase tracking-widest"
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
                className="px-6 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:bg-gray-50 transition-all rounded-none"
              >
                Cancel
              </button>
              <button 
                onClick={saveUni}
                className="px-8 py-2 bg-[#00588b] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#00446b] transition-all rounded-none"
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

function OurRootsTab({ data, onChange, onSave, isSaving }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Our Roots Configuration</h2>
        <button 
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#00588b] hover:bg-[#00446b] text-white px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all rounded-none disabled:opacity-50"
        >
          <Save size={14} /> {isSaving ? "Saving..." : "Save Our Roots"}
        </button>
      </div>

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

function VisionMissionTab({ data, onChange, onSave, isSaving }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Vision & Mission Configuration</h2>
        <button 
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#00588b] hover:bg-[#00446b] text-white px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all rounded-none disabled:opacity-50"
        >
          <Save size={14} /> {isSaving ? "Saving..." : "Save Vision & Mission"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quote and Hero Chips */}
        <div className="space-y-6">
          <div>
            <Label>Top Quote Text</Label>
            <TextArea 
              value={data.quote.text} 
              onChange={e => onChange({...data, quote: {text: e.target.value}})} 
              className="h-24"
            />
          </div>

          <div className="pt-6 border-t border-gray-100">
            <Label>Hero Chips (3 featured values)</Label>
            <div className="space-y-3 mt-3">
              {data.heroChips.map((chip, idx) => (
                <div key={idx} className="flex gap-3 bg-gray-50 p-3 border border-gray-200">
                  <div className="w-20">
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
          <div className="border border-gray-200 p-5 bg-[#f0f7ff]/30">
            <div className="flex gap-3 items-center mb-4">
              <div className="w-10 h-10 bg-[#00588b]/10 flex items-center justify-center">
                <IconPicker 
                  value={data.vision.icon} 
                  onChange={val => onChange({...data, vision: {...data.vision, icon: val}})} 
                />
              </div>
              <h3 className="text-[11px] font-black text-[#00588b] uppercase tracking-widest">Vision Section</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Tag</Label>
                <Input value={data.vision.tag} onChange={e => onChange({...data, vision: {...data.vision, tag: e.target.value}})} />
              </div>
              <div>
                <Label>Heading</Label>
                <Input value={data.vision.heading} onChange={e => onChange({...data, vision: {...data.vision, heading: e.target.value}})} />
              </div>
              <div>
                <Label>Description</Label>
                <TextArea value={data.vision.description} onChange={e => onChange({...data, vision: {...data.vision, description: e.target.value}})} />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 p-5 bg-[#ffb900]/5">
            <div className="flex gap-3 items-center mb-4">
              <div className="w-10 h-10 bg-[#ffb900]/10 flex items-center justify-center">
                <IconPicker 
                  value={data.approach.icon} 
                  onChange={val => onChange({...data, approach: {...data.approach, icon: val}})} 
                />
              </div>
              <h3 className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Approach Section</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Tag</Label>
                <Input value={data.approach.tag} onChange={e => onChange({...data, approach: {...data.approach, tag: e.target.value}})} />
              </div>
              <div>
                <Label>Heading</Label>
                <Input value={data.approach.heading} onChange={e => onChange({...data, approach: {...data.approach, heading: e.target.value}})} />
              </div>
              <div>
                <Label>Description</Label>
                <TextArea value={data.approach.description} onChange={e => onChange({...data, approach: {...data.approach, description: e.target.value}})} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
        {/* Mission Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Mission Items</Label>
            <button 
              onClick={() => onChange({...data, mission: {...data.mission, items: [...data.mission.items, {id: Date.now(), icon: "Star", text: ""}]}})}
              className="text-[10px] font-bold text-[#00588b] uppercase tracking-widest flex items-center gap-1"
            >
              <Plus size={14} /> Add Mission Point
            </button>
          </div>
          <div className="space-y-3">
            {data.mission.items.map((item, idx) => (
              <div key={item.id} className="border border-gray-200 p-4 bg-gray-50 flex gap-4">
                <div className="w-16">
                  <Label>Icon</Label>
                  <IconPicker 
                    value={item.icon} 
                    onChange={val => {
                      const newList = [...data.mission.items]; newList[idx].icon = val; onChange({...data, mission: {...data.mission, items: newList}});
                    }} 
                  />
                </div>
                <div className="flex-1">
                  <Label>Point Text</Label>
                  <TextArea 
                    value={item.text} 
                    onChange={e => {
                      const newList = [...data.mission.items]; newList[idx].text = e.target.value; onChange({...data, mission: {...data.mission, items: newList}});
                    }}
                    className="h-20"
                  />
                </div>
                <button 
                  onClick={() => onChange({...data, mission: {...data.mission, items: data.mission.items.filter((_, i) => i !== idx)}})}
                  className="self-start text-gray-400 hover:text-red-500 mt-6"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Core Values</Label>
            <button 
              onClick={() => onChange({...data, values: {...data.values, items: [...data.values.items, {id: Date.now(), icon: "Star", label: ""}]}})}
              className="text-[10px] font-bold text-[#00588b] uppercase tracking-widest flex items-center gap-1"
            >
              <Plus size={14} /> Add Value
            </button>
          </div>
          <div className="space-y-3">
            {data.values.items.map((item, idx) => (
              <div key={item.id} className="border border-gray-200 p-4 bg-gray-50 flex gap-4 items-center">
                <div className="w-16">
                  <Label>Icon</Label>
                  <IconPicker 
                    value={item.icon} 
                    onChange={val => {
                      const newList = [...data.values.items]; newList[idx].icon = val; onChange({...data, values: {...data.values, items: newList}});
                    }} 
                  />
                </div>
                <div className="flex-1">
                  <Label>Value Name</Label>
                  <Input 
                    value={item.label} 
                    onChange={e => {
                      const newList = [...data.values.items]; newList[idx].label = e.target.value; onChange({...data, values: {...data.values, items: newList}});
                    }} 
                  />
                </div>
                <button 
                  onClick={() => onChange({...data, values: {...data.values, items: data.values.items.filter((_, i) => i !== idx)}})}
                  className="text-gray-400 hover:text-red-500 mt-4"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
