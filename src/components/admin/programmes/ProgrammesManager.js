'use client';

import RichTextEditor from '@/components/admin/RichTextEditor';
import IconPicker from '@/components/admin/ui/IconPicker';
import Modal from '@/components/admin/ui/Modal';
import { createCategory, createCourse, createSidebarLink, deleteCategory, deleteCourse, deleteSidebarLink, getCourses, updateCourse, updateProgrammeSettings, updateSidebarLink } from '@/lib/actions/programmeActions';
import { seedDatabase } from '@/lib/actions/seedActions';
import { AlertTriangle, BookMarked, ChevronRight, Database, Edit, Layers, Loader2, Monitor, Plus, Save, Settings, Trash2,Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


import toast, { Toaster } from 'react-hot-toast';

export default function ProgrammesManager({ initialCategories, initialCourses, initialLinks, initialSettings }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  // Modal States
  const [isCatModalOpen, setCatModalOpen] = useState(false);
  const [isCourseModalOpen, setCourseModalOpen] = useState(false);
  const [isLinkModalOpen, setLinkModalOpen] = useState(false);

  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingLinkId, setEditingLinkId] = useState(null);
  
  // Form States
  const [catLabel, setCatLabel] = useState('');
  const [linkForm, setLinkForm] = useState({ label: '', icon: '', slug: '', colorClass: '' });
  
  // Course Form State
  const [courseForm, setCourseForm] = useState({
    title: '', school: '', categoryId: '', icon: 'Monitor', colorHex: '#1c54a3', 
    iconBg: 'bg-blue-50', textColor: 'text-[#1c54a3]', borderHover: 'hover:border-[#1c54a3]', 
    programs: '', useProse: true, badgeLabel: '', badgeBgHex: '#fee2e2', badgeTextHex: '#dc2626', detailsSlug: '#'
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState(initialSettings || {});
  const [activeTab, setActiveTab] = useState('courses'); // courses | links | settings
  const [courseFilter, setCourseFilter] = useState('all');
  const [courses, setCourses] = useState(initialCourses || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    setCourses(initialCourses);
  }, [initialCourses]);

  // Server-Side Search & Filter Effect
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const res = await getCourses({ 
          categoryId: courseFilter, 
          search: searchQuery 
        });
        if (res.success) {
          setCourses(res.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsFetching(false);
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 400);

    return () => clearTimeout(timer);
  }, [courseFilter, searchQuery]);


  // --- Handlers ---
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!catLabel) return;
    setLoading(true);
    const res = await createCategory({ label: catLabel, order: initialCategories.length + 1 });
    setLoading(false);
    if (res.success) {
      setCatLabel('');
      setCatModalOpen(false);
      toast.success('Category created successfully!');
      router.refresh();
    } else {
      toast.error(res.message || 'Error creating category');
    }
  };

  const handleDeleteCategory = async (id) => {
    if(!confirm("Warning: Deleting this category will also delete ALL courses inside it. Are you sure?")) return;
    setLoading(true);
    const res = await deleteCategory(id);
    setLoading(false);
    if (res.success) {
      toast.success('Category deleted successfully!');
      router.refresh();
    } else {
      toast.error(res.message || 'Error deleting category');
    }
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.school || !courseForm.categoryId) {
      toast.error('Please fill in title, school and category!');
      return;
    }

    setLoading(true);
    const payload = {
      title: courseForm.title,
      school: courseForm.school,
      categoryId: courseForm.categoryId,
      icon: courseForm.icon,
      colorHex: courseForm.colorHex,
      iconBg: courseForm.iconBg,
      textColor: courseForm.textColor,
      borderHover: courseForm.borderHover,
      programs: courseForm.programs,
      useProse: courseForm.useProse,
      detailsSlug: courseForm.detailsSlug,
      badge: courseForm.badgeLabel ? { label: courseForm.badgeLabel, bgHex: courseForm.badgeBgHex, textHex: courseForm.badgeTextHex } : null
    };

    let res;
    if (editingCourseId) {
      res = await updateCourse(editingCourseId, payload);
    } else {
      res = await createCourse(payload);
    }
    
    setLoading(false);
    if (res.success) {
      toast.success(editingCourseId ? 'Course updated successfully!' : 'Course created successfully!');
      setCourseModalOpen(false);
      setEditingCourseId(null);
      setCourseForm({ title: '', school: '', categoryId: '', icon: 'Monitor', colorHex: '#1c54a3', iconBg: 'bg-blue-50', textColor: 'text-[#1c54a3]', borderHover: 'hover:border-[#1c54a3]', programs: '', badgeLabel: '', badgeBgHex: '#fee2e2', badgeTextHex: '#dc2626', detailsSlug: '#' });
      router.refresh();
    } else {
      toast.error(res.message || 'Error saving course');
    }
  };

  const openEditCourse = (course) => {
    setCourseForm({
      title: course.title,
      school: course.school,
      categoryId: course.categoryId?.id || course.categoryId,
      icon: course.icon,
      colorHex: course.colorHex,
      iconBg: course.iconBg,
      textColor: course.textColor,
      borderHover: course.borderHover,
      programs: course.programs || '',
      useProse: course.useProse !== false,
      detailsSlug: course.detailsSlug || '#',
      badgeLabel: course.badge?.label || '',
      badgeBgHex: course.badge?.bgHex || '#fee2e2',
      badgeTextHex: course.badge?.textHex || '#dc2626'
    });
    setEditingCourseId(course.id);
    setCourseModalOpen(true);
  };

  const handleDeleteCourse = async (id) => {
    if(!confirm("Are you sure you want to delete this course?")) return;
    setLoading(true);
    const res = await deleteCourse(id);
    setLoading(false);
    if (res.success) {
      toast.success('Course deleted successfully!');
      router.refresh();
    } else {
      toast.error(res.message || 'Error deleting course');
    }
  };

  const handleSaveLink = async (e) => {
    e.preventDefault();
    if (!linkForm.label || !linkForm.slug || !linkForm.icon || !linkForm.colorClass) {
      toast.error('Please fill in all required link fields!');
      return;
    }

    setLoading(true);
    let res;
    if (editingLinkId) {
      res = await updateSidebarLink(editingLinkId, linkForm);
      if (res.success) {
        toast.success('Link updated successfully!');
        setLinkModalOpen(false);
        setEditingLinkId(null);
        setLinkForm({ label: '', icon: '', slug: '', colorClass: '' });
      } else {
        toast.error(res.message || 'Error updating link');
      }
    } else {
      res = await createSidebarLink({ ...linkForm, order: initialLinks.length + 1 });
      if (res.success) {
        toast.success('Link created successfully!');
        setLinkModalOpen(false);
        setEditingLinkId(null);
        setLinkForm({ label: '', icon: '', slug: '', colorClass: '' });
      } else {
        toast.error(res.message || 'Error creating link');
      }
    }
    setLoading(false);
    if (res.success) router.refresh();
  };

  const openEditLink = (link) => {
    setLinkForm({
      label: link.label,
      icon: link.icon,
      slug: link.slug,
      colorClass: link.colorClass
    });
    setEditingLinkId(link.id);
    setLinkModalOpen(true);
  };

  const handleDeleteLink = async (id) => {
    if(!confirm("Are you sure you want to delete this link?")) return;
    setLoading(true);
    const res = await deleteSidebarLink(id);
    setLoading(false);
    if (res.success) {
      toast.success('Link deleted successfully!');
      router.refresh();
    } else {
      toast.error(res.message || 'Error deleting link');
    }
  };

  const handleSeedData = async () => {
    if(!confirm("WARNING! Seeding data will wipe out all existing Catalogue records in the database and replace them exactly with the contents of src/data/programmes.json. Proceed?")) return;
    setLoading(true);
    const res = await seedDatabase();
    setLoading(false);
    if(res.success) {
      toast.success(res.message || 'Database seeded successfully!');
      router.refresh();
    } else {
      toast.error(res.message || 'Error seeding data');
    }
  };


  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateProgrammeSettings(settingsForm.id, settingsForm);
    setLoading(false);
    toast.success('Global Page Settings successfully updated!');
    router.refresh();
  };

  const generateSlug = (label) => {
    return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const filteredCourses = courses;

  return (
    <>
      <Toaster position="bottom-right" />
      
      {/* ── Fixed/Sticky Header (Exactly 44px Height) ── */}
      <div className="sticky top-0 z-30 flex items-center justify-between h-[44px] w-full bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm">
        
        {/* Left: Title */}
        <div className="flex items-center h-full px-4 gap-3">
          <BookMarked size={14} className="text-[var(--text-muted)] hidden sm:block" strokeWidth={2.5} />
          <h1 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-wider">
            Academic Catalog Management
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center h-full px-4 gap-2.5">
          <button
            onClick={handleSeedData}
            disabled={loading}
            className={`h-[32px] px-3 flex items-center justify-center gap-1.5 rounded-sm transition-colors border text-[10px] font-bold shadow-sm uppercase tracking-widest shrink-0
              ${loading 
                ? 'bg-[var(--bg-muted)] text-[var(--text-muted)] border-[var(--border-default)] cursor-not-allowed' 
                : 'bg-[var(--bg-surface)] text-[var(--color-warning-dark)] border-[var(--border-default)] hover:border-[var(--color-warning-dark)] hover:bg-[var(--color-warning-lighter)]'
              }`}
            title="Seed Data from JSON"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Database size={14} strokeWidth={2} />}
            <span className="hidden sm:block">{loading ? 'Seeding...' : 'Seed Database'}</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6 pb-20 w-full animate-in fade-in duration-200">
        <div className="border-b border-[var(--border-default)] flex overflow-x-auto w-full">
        <button onClick={() => setActiveTab('courses')} className={`px-6 py-3 font-bold text-xs sm:text-sm uppercase whitespace-nowrap ${activeTab === 'courses' ? 'border-b-[3px] border-[var(--color-primary)] text-[var(--color-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>Content Data</button>
        <button onClick={() => setActiveTab('settings')} className={`px-6 py-3 font-bold text-xs sm:text-sm uppercase flex gap-2 items-center whitespace-nowrap ${activeTab === 'settings' ? 'border-b-[3px] border-[var(--color-primary)] text-[var(--color-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}><Settings size={16}/> Page Settings</button>
      </div>

      {activeTab === 'settings' && (
         <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-4 sm:p-6 shadow-sm rounded-none">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-6 border-b border-[var(--border-light)] pb-2">Global Page Settings & Components</h2>
            <form onSubmit={handleSaveSettings} className="space-y-8">
              
              {/* MetaData */}
              <div className="bg-[var(--bg-body)] p-4 border border-[var(--border-default)] rounded-none">
                <h4 className="font-bold text-sm text-[var(--color-primary)] uppercase mb-4 tracking-widest">SEO & Metadata</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text[10px] font-bold text-[var(--text-secondary)] uppercase mb-1">Meta Title</label>
                    <input type="text" value={settingsForm.metaTitle || ''} onChange={(e) => setSettingsForm({...settingsForm, metaTitle: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-sm rounded-none outline-none focus:border-[var(--color-primary)]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1">Meta Description</label>
                    <textarea value={settingsForm.metaDescription || ''} onChange={(e) => setSettingsForm({...settingsForm, metaDescription: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-sm h-[42px] resize-none rounded-none outline-none focus:border-[var(--color-primary)]" />
                  </div>
                </div>
              </div>

              {/* Sidebar CTA */}
              <div className="bg-[var(--bg-body)] p-4 border border-[var(--border-default)] rounded-none">
                <h4 className="font-bold text-sm text-[var(--color-primary)] uppercase mb-4 tracking-widest">Sidebar 'Need Guidance' CTA Widget</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="col-span-2 lg:col-span-1">
                    <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1">Widget Icon</label>
                    <IconPicker value={settingsForm.sidebarCta?.icon || ''} onChange={(val) => setSettingsForm({...settingsForm, sidebarCta: {...settingsForm.sidebarCta, icon: val}})} />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1">Title</label>
                    <input type="text" value={settingsForm.sidebarCta?.title || ''} onChange={(e) => setSettingsForm({...settingsForm, sidebarCta: {...(settingsForm.sidebarCta||{}), title: e.target.value}})} className="w-full border border-[var(--border-default)] p-2.5 text-sm rounded-none outline-none focus:border-[var(--color-primary)]" />
                  </div>
                  <div className="col-span-2 lg:col-span-2">
                    <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1">Description Subtext</label>
                    <input type="text" value={settingsForm.sidebarCta?.description || ''} onChange={(e) => setSettingsForm({...settingsForm, sidebarCta: {...(settingsForm.sidebarCta||{}), description: e.target.value}})} className="w-full border border-[var(--border-default)] p-2.5 text-sm rounded-none outline-none focus:border-[var(--color-primary)]" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1">Button Text</label>
                    <input type="text" value={settingsForm.sidebarCta?.buttonText || ''} onChange={(e) => setSettingsForm({...settingsForm, sidebarCta: {...(settingsForm.sidebarCta||{}), buttonText: e.target.value}})} className="w-full border border-[var(--border-default)] p-2.5 text-sm rounded-none outline-none focus:border-[var(--color-primary)]" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1">Button Link URL</label>
                    <input type="text" value={settingsForm.sidebarCta?.buttonLink || ''} onChange={(e) => setSettingsForm({...settingsForm, sidebarCta: {...(settingsForm.sidebarCta||{}), buttonLink: e.target.value}})} className="w-full border border-[var(--border-default)] p-2.5 text-sm rounded-none outline-none focus:border-[var(--color-primary)]" />
                  </div>
                </div>
              </div>

               {/* Main Banner CTA */}
              <div className="bg-[var(--bg-body)] p-4 border border-[var(--border-default)] rounded-none">
                <h4 className="font-bold text-sm text-[var(--color-primary)] uppercase mb-4 tracking-widest">Bottom Main Admissions Poster CTA</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="col-span-2 lg:col-span-1">
                    <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1">Top Icon</label>
                    <IconPicker value={settingsForm.mainCta?.icon || ''} onChange={(val) => setSettingsForm({...settingsForm, mainCta: {...settingsForm.mainCta, icon: val}})} />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1">Top Mini Text</label>
                    <input type="text" value={settingsForm.mainCta?.badgeText || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), badgeText: e.target.value}})} className="w-full border border-[var(--border-default)] p-2.5 text-sm rounded-none outline-none focus:border-[var(--color-primary)]" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1">Megaphone Title</label>
                    <input type="text" value={settingsForm.mainCta?.title || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), title: e.target.value}})} className="w-full border border-[var(--border-default)] p-2.5 text-sm rounded-none outline-none focus:border-[var(--color-primary)]" />
                  </div>
                  <div className="col-span-2 lg:col-span-4">
                    <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1">Marketing Subtext Description</label>
                    <input type="text" value={settingsForm.mainCta?.description || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), description: e.target.value}})} className="w-full border border-[var(--border-default)] p-2.5 text-sm rounded-none outline-none focus:border-[var(--color-primary)]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[var(--bg-surface)] p-3 border border-[var(--border-default)] rounded-none">
                    <label className="block text-[10px] font-bold text-[var(--color-warning)] uppercase mb-1">Primary Yellow Button Text</label>
                    <input type="text" value={settingsForm.mainCta?.primaryBtnText || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), primaryBtnText: e.target.value}})} className="w-full border border-[var(--border-default)] p-2 text-sm mb-3 rounded-none outline-none focus:border-[var(--color-warning)]" />
                    <label className="block text-[10px] font-bold text-[var(--color-warning)] uppercase mb-1">Primary Button URL</label>
                    <input type="text" value={settingsForm.mainCta?.primaryBtnLink || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), primaryBtnLink: e.target.value}})} className="w-full border border-[var(--border-default)] p-2 text-sm rounded-none outline-none focus:border-[var(--color-warning)]" />
                  </div>
                  <div className="bg-[var(--bg-surface)] p-3 border border-[var(--border-default)] rounded-none">
                    <label className="block text-[10px] font-bold text-[var(--color-primary)] uppercase mb-1">Secondary Transparent Button Text</label>
                    <input type="text" value={settingsForm.mainCta?.secondaryBtnText || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), secondaryBtnText: e.target.value}})} className="w-full border border-[var(--border-default)] p-2 text-sm mb-3 rounded-none outline-none focus:border-[var(--color-primary)]" />
                    <label className="block text-[10px] font-bold text-[var(--color-primary)] uppercase mb-1">Secondary Button URL</label>
                    <input type="text" value={settingsForm.mainCta?.secondaryBtnLink || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), secondaryBtnLink: e.target.value}})} className="w-full border border-[var(--border-default)] p-2 text-sm rounded-none outline-none focus:border-[var(--color-primary)]" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[var(--color-success)] text-[var(--text-inverse)] py-3.5 font-bold flex justify-center items-center gap-2 hover:bg-[var(--color-success-dark)] shadow-sm rounded-none uppercase tracking-widest text-xs transition-colors">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Publish Master Settings
              </button>
            </form>
         </div>
      )}

      {activeTab === 'courses' && (
        <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* ── TOP SECTION: CATEGORIES ── */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-4 sm:p-5 shadow-sm rounded-none">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 border-b border-[var(--border-light)] pb-2.5">
          <h2 className="text-[15px] font-black flex items-center gap-2 text-[var(--color-primary)] uppercase tracking-wide">
            <BookMarked size={18} strokeWidth={2.5} /> Programme Categories
          </h2>
          <button onClick={() => setCatModalOpen(true)} className="bg-[var(--color-primary)] text-[var(--text-inverse)] px-4 py-2 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[var(--color-primary-dark)] transition-colors rounded-none uppercase tracking-widest w-full sm:w-auto">
            <Plus size={14} strokeWidth={2.5} /> Add Category
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {initialCategories.map(cat => {
            const definedSlug = cat.slug || generateSlug(cat.label);
            return (
            <div key={cat.id} className="bg-[var(--bg-body)] border border-[var(--border-default)] flex items-stretch rounded-none shadow-sm group">
              <div className="px-3 py-2 flex flex-col justify-center">
                <span className="font-bold text-[13px] text-[var(--text-primary)] uppercase tracking-wide leading-tight">{cat.label}</span>
                {/* Dynamically displaying slug for referencing in Mega Menu */}
                <span className="text-[10px] text-[var(--text-secondary)] font-mono mt-0.5" title="Use this in desktop menu slug">type={definedSlug}</span>
              </div>
              <button title="Delete Category" onClick={() => handleDeleteCategory(cat.id)} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] bg-[var(--bg-muted)] hover:bg-[var(--color-danger-light)] px-3 border-l border-[var(--border-default)] transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
            );
          })}
        </div>
      </div>

      {/* ── QUICK LINKS SECTION ── */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-4 sm:p-5 shadow-sm rounded-none">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 border-b border-[var(--border-light)] pb-2.5">
          <h2 className="text-[15px] font-black flex items-center gap-2 text-[var(--color-primary)] uppercase tracking-wide">
            <Layers size={18} strokeWidth={2.5} /> Quick Sidebar Links
          </h2>
          <button onClick={() => { setEditingLinkId(null); setLinkForm({ label: '', icon: '', slug: '', colorClass: '' }); setLinkModalOpen(true); }} className="bg-[var(--color-warning-dark)] text-[var(--text-inverse)] px-4 py-2 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[var(--color-warning)] transition-colors rounded-none uppercase tracking-widest shadow-sm w-full sm:w-auto">
            <Plus size={14} strokeWidth={2.5} /> Add Quick Link
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {initialLinks.length === 0 && <span className="text-xs text-[var(--text-muted)] font-bold tracking-widest uppercase">No quick links configured.</span>}
          {initialLinks.map(link => (
            <div key={link.id} className="bg-[var(--bg-body)] border border-[var(--border-default)] p-3 flex flex-col gap-2 min-w-[200px] hover:shadow-md transition-shadow rounded-none">
              <div className="flex justify-between items-start">
                <span className="font-bold text-xs uppercase tracking-wide text-[var(--text-primary)]">{link.label}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEditLink(link)} className="text-[var(--text-muted)] hover:text-[var(--color-primary)] bg-[var(--bg-surface)] border border-[var(--border-default)] p-1.5 rounded-none transition-colors">
                    <Edit size={12} />
                  </button>
                  <button onClick={() => handleDeleteLink(link.id)} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] bg-[var(--bg-surface)] border border-[var(--border-default)] p-1.5 rounded-none transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="text-[10px] text-[var(--text-secondary)] font-mono break-all bg-[var(--bg-surface)] px-1.5 py-0.5 border border-[var(--border-light)] self-start">{link.slug}</div>
              <div className="text-[9px] font-black text-white bg-[var(--color-primary)] px-1.5 py-0.5 inline-block self-start rounded-none tracking-widest uppercase">ICON: {link.icon}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN SECTION: COURSES TABLE ── */}
      <div className="space-y-4">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 bg-[var(--bg-surface)] border border-[var(--border-default)] p-4 shadow-sm rounded-none">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h2 className="text-[15px] font-black flex items-center gap-2 text-[var(--text-primary)] uppercase tracking-wide">
              <Monitor size={18} className="text-[var(--color-primary)]" strokeWidth={2.5} /> All Master Courses
            </h2>

            {/* Search Input */}
            <div className="relative flex items-center h-[34px] w-full md:w-[240px]">
              <div className="absolute left-3 text-[var(--text-muted)] pointer-events-none">
                {isFetching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} strokeWidth={2.5} />}
              </div>
              <input
                type="text"
                placeholder="Search by title, school..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-full w-full pl-9 pr-4 bg-[var(--bg-body)] border border-[var(--border-default)] focus:border-[var(--color-primary)] outline-none text-[11px] font-bold uppercase tracking-wider rounded-none transition-all placeholder:text-[var(--text-muted)]/50"
              />
            </div>

            <div className="relative">

              <button 
                type="button"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center gap-2 h-[34px] px-4 bg-[var(--bg-body)] border border-[var(--border-default)] hover:border-[var(--color-primary)] text-[var(--color-primary)] transition-all shadow-sm rounded-none text-[11px] font-bold uppercase tracking-widest whitespace-nowrap min-w-[160px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[var(--text-muted)]">Courses:</span>
                  <span>{courseFilter === 'all' ? 'All Courses' : initialCategories.find(c => c.id === courseFilter)?.label}</span>
                </div>
                <ChevronRight size={14} className={`transition-transform ${showFilterMenu ? 'rotate-90' : ''}`} />
              </button>

              {showFilterMenu && (
                <>
                  <div className="fixed inset-0 z-[40]" onClick={() => setShowFilterMenu(false)}></div>
                  <div className="absolute left-0 top-full mt-1.5 z-[50] w-[220px] bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-xl p-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    <button
                      type="button"
                      onClick={() => {
                        setCourseFilter('all');
                        setShowFilterMenu(false);
                      }}
                      className={`flex items-center gap-3 w-full px-3 py-2 text-left transition-colors border border-transparent uppercase tracking-wider text-[10px] font-bold ${courseFilter === 'all' ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'hover:bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                    >
                      All Courses
                    </button>
                    <div className="h-px bg-[var(--border-light)] my-1"></div>
                    <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                      {initialCategories.map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setCourseFilter(cat.id);
                            setShowFilterMenu(false);
                          }}
                          className={`flex items-center gap-3 w-full px-3 py-2 text-left transition-colors border border-transparent uppercase tracking-wider text-[10px] font-bold mb-0.5 ${courseFilter === cat.id ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'hover:bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <button onClick={() => { setEditingCourseId(null); setCourseForm({ title: '', school: '', categoryId: '', icon: 'Monitor', colorHex: '#1c54a3', iconBg: 'bg-blue-50', textColor: 'text-[#1c54a3]', borderHover: 'hover:border-[#1c54a3]', programs: '', badgeLabel: '', badgeBgHex: '#fee2e2', badgeTextHex: '#dc2626', detailsSlug: '#' }); setCourseModalOpen(true); }} disabled={initialCategories.length === 0} className="bg-[var(--color-success)] disabled:opacity-50 text-[var(--text-inverse)] px-4 py-2 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[var(--color-success-dark)] transition-colors rounded-none shadow-sm uppercase tracking-widest w-full md:w-auto">
            <Plus size={14} strokeWidth={2.5} /> Add New Course
          </button>
        </div>

        {initialCategories.length === 0 && (
          <div className="bg-[var(--color-warning-lighter)] text-[var(--color-warning-dark)] p-3 text-xs font-bold border-l-[3px] border-[var(--color-warning)] flex items-center gap-2 tracking-wide rounded-none">
            <AlertTriangle size={16} /> Please add a Category first before adding courses.
          </div>
        )}

        {/* Mobile Responsive Data Table / Cards */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none overflow-hidden shadow-sm">
          <div className="w-full max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 max-h-[calc(100vh-280px)] overflow-y-auto">
            <table className="w-full border-collapse text-left block md:table min-w-full md:min-w-[850px]">
              <thead className="hidden md:table-header-group bg-[var(--bg-muted)] border-b border-[var(--border-default)] sticky top-0 z-[20]">
                <tr className="md:table-row">
                  <th className="py-2.5 px-4 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-[10px] border-r border-[var(--border-light)] w-[40%] bg-[var(--bg-muted)]">Course / School</th>
                  <th className="py-2.5 px-4 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-[10px] border-r border-[var(--border-light)] w-[40%] bg-[var(--bg-muted)]">Category</th>
                  <th className="py-2.5 px-4 text-center font-bold text-[var(--text-secondary)] uppercase tracking-widest text-[10px] w-[20%] bg-[var(--bg-muted)]">Actions</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group divide-y divide-[var(--border-light)]">
                {filteredCourses.length === 0 ? (
                  <tr className="block md:table-row">
                    <td colSpan="3" className="block md:table-cell py-10 text-center">
                      <div className="flex flex-col items-center gap-2">
                         <Monitor size={24} className="text-[var(--text-muted)]" strokeWidth={1.5} />
                          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                            {searchQuery ? `No courses matching "${searchQuery}"` : (courseFilter === 'all' ? 'No courses added yet' : 'No courses found in this category')}
                          </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map(course => (
                    <tr key={course.id} className="block md:table-row hover:bg-[var(--bg-muted)] transition-colors group p-4 md:p-0">
                      <td className="block md:table-cell py-1 md:py-3 px-0 md:px-4 border-none md:border-r border-[var(--border-light)] mb-2 md:mb-0">
                        <span className="md:hidden text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Course / School</span>
                        <div className="font-bold text-[14px] md:text-[13px] flex flex-wrap items-center gap-2">
                           <span style={{ color: course.colorHex }}>{course.title}</span>
                           {course.badge && <span className="text-[9px] font-black px-1.5 py-0.5 mt-0.5 uppercase tracking-widest rounded-none inline-block border border-[var(--border-light)]" style={{ backgroundColor: course.badge.bgHex, color: course.badge.textHex }}>{course.badge.label}</span>}
                        </div>
                        <div className="text-[11px] font-medium text-[var(--text-secondary)] mt-0.5">{course.school}</div>
                      </td>
                      <td className="block md:table-cell py-1 md:py-3 px-0 md:px-4 border-none md:border-r border-[var(--border-light)] mb-3 md:mb-0">
                        <span className="md:hidden text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-1">Category</span>
                        <span className="font-mono text-[11px] md:text-[10px] bg-[var(--bg-body)] border border-[var(--border-default)] text-[var(--text-muted)] inline-block uppercase tracking-widest px-2 py-0.5">
                          {course.category?.label || 'Unknown'}
                        </span>
                      </td>
                      <td className="block md:table-cell py-2 md:py-3 px-0 md:px-4 border-t border-[var(--border-light)] pt-3 md:border-none md:pt-0">
                        <div className="flex justify-start md:justify-center items-center gap-3 md:gap-2">
                          <button onClick={() => openEditCourse(course)} className="bg-[var(--bg-body)] text-[var(--text-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--text-inverse)] p-2 md:p-1.5 border border-[var(--border-default)] transition-colors rounded-none flex items-center justify-center. " title="Edit">
                            <Edit size={15} className="md:w-3.5 md:h-3.5" />
                            <span className="md:hidden text-[10px] font-bold uppercase ml-2 tracking-widest">Edit</span>
                          </button>
                          <button onClick={() => handleDeleteCourse(course.id)} className="bg-[var(--bg-body)] text-[var(--text-secondary)] hover:bg-[var(--color-danger)] hover:text-[var(--text-inverse)] p-2 md:p-1.5 border border-[var(--border-default)] transition-colors rounded-none flex items-center justify-center " title="Delete">
                            <Trash2 size={15} className="md:w-3.5 md:h-3.5" />
                            <span className="md:hidden text-[10px] font-bold uppercase ml-2 tracking-widest">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      )}

      {/* ── MODALS USING THE UI MODAL ── */}
      
      {/* Category Modal */}
      <Modal
        isOpen={isCatModalOpen}
        onClose={() => setCatModalOpen(false)}
        title="Add New Category"
        subtitle="Create a new type of curriculum or program level"
        size="md"
        footer={(
          <button type="button" onClick={handleAddCategory} disabled={loading} className="w-full bg-[var(--color-primary)] text-[var(--text-inverse)] py-2.5 font-bold flex justify-center items-center gap-2 hover:bg-[var(--color-primary-dark)] text-xs uppercase tracking-widest transition-colors rounded-none shadow-sm">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} strokeWidth={2.5} />} Save Category
          </button>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5 tracking-widest">Category Label *</label>
            <input type="text" required value={catLabel} onChange={e => setCatLabel(e.target.value)} placeholder="e.g. Diploma, Under Graduate" className="w-full border border-[var(--border-default)] p-2.5 text-sm outline-none focus:border-[var(--color-primary)] rounded-none bg-white" />
          </div>
        </div>
      </Modal>

      {/* Course Modal */}
      <Modal
        isOpen={isCourseModalOpen}
        onClose={() => setCourseModalOpen(false)}
        title={editingCourseId ? 'Edit Master Course' : 'Add New Master Course'}
        subtitle="Manage the curriculum overview details"
        size="2xl"
        footer={(
           <button type="submit" form="course-form" disabled={loading} className="w-full bg-[var(--color-success)] text-[var(--text-inverse)] py-3 font-bold flex justify-center items-center gap-2 hover:bg-[var(--color-success-dark)] shadow-sm uppercase tracking-widest text-xs transition-colors rounded-none">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} strokeWidth={2.5} />} {editingCourseId ? 'Update Master Course' : 'Publish Master Course'}
          </button>
        )}
      >
        <form id="course-form" onSubmit={handleSaveCourse} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5 tracking-widest">Course Title *</label>
              <input type="text" required value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} placeholder="e.g. Engineering" className="w-full border border-[var(--border-default)] p-2.5 text-sm outline-none focus:border-[var(--color-primary)] rounded-none bg-[var(--bg-body)]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5 tracking-widest">School Name *</label>
              <input type="text" required value={courseForm.school} onChange={e => setCourseForm({...courseForm, school: e.target.value})} placeholder="e.g. School of Engineering" className="w-full border border-[var(--border-default)] p-2.5 text-sm outline-none focus:border-[var(--color-primary)] rounded-none bg-[var(--bg-body)]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5 tracking-widest">Category Type *</label>
              <select required value={courseForm.categoryId} onChange={e => setCourseForm({...courseForm, categoryId: e.target.value})} className="w-full border border-[var(--border-default)] p-2.5 text-sm outline-none focus:border-[var(--color-primary)] bg-[var(--bg-body)] rounded-none">
                <option value="" disabled>Select Category</option>
                {initialCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5 tracking-widest">Icon Name (Lucide)</label>
              <IconPicker value={courseForm.icon} onChange={(val) => setCourseForm({...courseForm, icon: val})} disabled={false} />
            </div>
          </div>

          <div className="bg-[var(--bg-body)] border border-[var(--border-default)] p-4 rounded-none">
            <label className="block text-[10px] font-bold text-[var(--color-primary)] uppercase mb-2.5 tracking-widest">Specialisations (Rich Text)</label>
            <RichTextEditor 
              value={courseForm.programs} 
              onChange={(val) => setCourseForm({...courseForm, programs: val})} 
              useProse={courseForm.useProse !== false}
              onProseChange={(val) => setCourseForm({...courseForm, useProse: val})}
            />
          </div>

          {/* Theme & Badge Settings */}
          <div className="bg-[var(--bg-body)] border border-[var(--border-default)] p-4 rounded-none">
            <h4 className="text-[10px] font-black text-[var(--text-primary)] mb-3 uppercase tracking-widest border-b border-[var(--border-light)] pb-2 flex items-center gap-2">
              <Settings size={14} /> Appearance Settings & Calls to Action
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              <div>
                <label className="flex items-center justify-between text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Hex Color <input type="color" className="w-5 h-5 cursor-pointer rounded-none border-0 p-0" value={courseForm.colorHex} onChange={e => setCourseForm({...courseForm, colorHex: e.target.value})} /></label>
                <input type="text" value={courseForm.colorHex} onChange={e => setCourseForm({...courseForm, colorHex: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs rounded-none outline-none focus:border-[var(--color-primary)] font-mono" />
              </div>
              <div>
                <label className="flex items-center justify-between text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Badge BG <input type="color" className="w-5 h-5 cursor-pointer rounded-none border-0 p-0" value={courseForm.badgeBgHex} onChange={e => setCourseForm({...courseForm, badgeBgHex: e.target.value})} /></label>
                <input type="text" value={courseForm.badgeBgHex} onChange={e => setCourseForm({...courseForm, badgeBgHex: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs rounded-none outline-none focus:border-[var(--color-primary)] font-mono" />
              </div>
              <div>
                <label className="flex items-center justify-between text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Badge Text <input type="color" className="w-5 h-5 cursor-pointer rounded-none border-0 p-0" value={courseForm.badgeTextHex} onChange={e => setCourseForm({...courseForm, badgeTextHex: e.target.value})} /></label>
                <input type="text" value={courseForm.badgeTextHex} onChange={e => setCourseForm({...courseForm, badgeTextHex: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs rounded-none outline-none focus:border-[var(--color-primary)] font-mono" />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Badge Label</label>
                <input type="text" placeholder="e.g. Popular" value={courseForm.badgeLabel} onChange={e => setCourseForm({...courseForm, badgeLabel: e.target.value})} className="w-full border border-[var(--border-default)] p-2 text-xs rounded-none outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1">Details URL Slug</label>
                <input type="text" placeholder="/courses/btech" value={courseForm.detailsSlug} onChange={e => setCourseForm({...courseForm, detailsSlug: e.target.value})} className="w-full border border-[var(--color-primary-light)] border-l-2 border-l-[var(--color-primary)] bg-[var(--color-primary)]/5 p-2 text-xs rounded-none outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-mono" />
              </div>
            </div>
          </div>
        </form>
      </Modal>

      {/* Link Modal */}
      <Modal
        isOpen={isLinkModalOpen}
        onClose={() => setLinkModalOpen(false)}
        title={editingLinkId ? 'Edit Sidebar Link' : 'Add Sidebar Link'}
        subtitle="Manage quick links for the sidebar"
        size="md"
        footer={(
           <button type="button" onClick={handleSaveLink} disabled={loading} className="w-full bg-[var(--color-warning-dark)] text-[var(--text-inverse)] py-2.5 font-bold flex justify-center items-center gap-2 hover:bg-[var(--color-warning)] text-xs uppercase tracking-widest transition-colors rounded-none shadow-sm">
             {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} strokeWidth={2.5} />} {editingLinkId ? 'Update Quick Link' : 'Save Quick Link'}
           </button>
        )}
      >
        <div className="space-y-4">
           <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5 tracking-widest">Label</label>
              <input type="text" required value={linkForm.label} onChange={e => setLinkForm({...linkForm, label: e.target.value})} placeholder="e.g. Testimonials" className="w-full border border-[var(--border-default)] p-2.5 text-sm outline-none focus:border-[var(--color-primary)] rounded-none bg-white" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5 tracking-widest">Slug Destination URL</label>
              <input type="text" required value={linkForm.slug} onChange={e => setLinkForm({...linkForm, slug: e.target.value})} placeholder="e.g. /testimonials" className="w-full border border-[var(--border-default)] p-2.5 text-sm outline-none focus:border-[var(--color-primary)] rounded-none bg-white font-mono" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5 tracking-widest">Lucide Icon Name</label>
              <IconPicker value={linkForm.icon} onChange={(val) => setLinkForm({...linkForm, icon: val})} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5 tracking-widest">Color CSS Class</label>
              <input type="text" required value={linkForm.colorClass} onChange={e => setLinkForm({...linkForm, colorClass: e.target.value})} placeholder="e.g. text-[#1c54a3] bg-[#1c54a3]/10" className="w-full border border-[var(--border-default)] p-2.5 text-sm outline-none focus:border-[var(--color-primary)] rounded-none bg-white font-mono" />
            </div>
        </div>
      </Modal>

      </div>
    </>
  );
}