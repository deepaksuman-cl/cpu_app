'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Edit, BookMarked, Layers, Monitor, AlertTriangle, X, Save, Loader2, Database, Settings } from 'lucide-react';
import { createCategory, deleteCategory, createCourse, updateCourse, deleteCourse, createSidebarLink, updateSidebarLink, deleteSidebarLink, seedProgrammesData, updateProgrammeSettings } from '@/lib/actions/programmeActions';
import IconPicker from '@/components/admin/ui/IconPicker';
import RichTextEditor from '@/components/admin/RichTextEditor';

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
    title: '', school: '', categoryId: '', icon: 'Monitor', colorHex: '#00588b', 
    iconBg: 'bg-sky-50', textColor: 'text-sky-700', borderHover: 'hover:border-sky-300', 
    programs: '', badgeLabel: '', badgeBgHex: '#fee2e2', badgeTextHex: '#dc2626', detailsSlug: '#'
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState(initialSettings || {});
  const [activeTab, setActiveTab] = useState('courses'); // courses | links | settings

  // --- Handlers ---
  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createCategory({ label: catLabel, order: initialCategories.length + 1 });
    setCatLabel('');
    setCatModalOpen(false);
    setLoading(false);
    router.refresh(); // Data refresh karne ke liye
  };

  const handleDeleteCategory = async (id) => {
    if(!confirm("Warning: Deleting this category will also delete ALL courses inside it. Are you sure?")) return;
    setLoading(true);
    await deleteCategory(id);
    setLoading(false);
    router.refresh();
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
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
      programs: courseForm.programs, // Rich text HTML!
      detailsSlug: courseForm.detailsSlug,
      badge: courseForm.badgeLabel ? { label: courseForm.badgeLabel, bgHex: courseForm.badgeBgHex, textHex: courseForm.badgeTextHex } : null
    };

    if (editingCourseId) {
      await updateCourse(editingCourseId, payload);
    } else {
      await createCourse(payload);
    }
    
    setCourseModalOpen(false);
    setEditingCourseId(null);
    setCourseForm({ title: '', school: '', categoryId: '', icon: 'Monitor', colorHex: '#00588b', iconBg: 'bg-sky-50', textColor: 'text-sky-700', borderHover: 'hover:border-sky-300', programs: '', badgeLabel: '', badgeBgHex: '#fee2e2', badgeTextHex: '#dc2626', detailsSlug: '#' }); // Reset
    setLoading(false);
    router.refresh();
  };

  const openEditCourse = (course) => {
    setCourseForm({
      title: course.title,
      school: course.school,
      categoryId: course.categoryId?._id || course.categoryId,
      icon: course.icon,
      colorHex: course.colorHex,
      iconBg: course.iconBg,
      textColor: course.textColor,
      borderHover: course.borderHover,
      programs: course.programs || '',
      detailsSlug: course.detailsSlug || '#',
      badgeLabel: course.badge?.label || '',
      badgeBgHex: course.badge?.bgHex || '#fee2e2',
      badgeTextHex: course.badge?.textHex || '#dc2626'
    });
    setEditingCourseId(course._id);
    setCourseModalOpen(true);
  };

  const handleDeleteCourse = async (id) => {
    if(!confirm("Are you sure you want to delete this course?")) return;
    setLoading(true);
    await deleteCourse(id);
    setLoading(false);
    router.refresh();
  };

  const handleSaveLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editingLinkId) {
      await updateSidebarLink(editingLinkId, linkForm);
    } else {
      await createSidebarLink({ ...linkForm, order: initialLinks.length + 1 });
    }
    setLinkModalOpen(false);
    setEditingLinkId(null);
    setLinkForm({ label: '', icon: '', slug: '', colorClass: '' });
    setLoading(false);
    router.refresh();
  };

  const openEditLink = (link) => {
    setLinkForm({
      label: link.label,
      icon: link.icon,
      slug: link.slug,
      colorClass: link.colorClass
    });
    setEditingLinkId(link._id);
    setLinkModalOpen(true);
  };

  const handleDeleteLink = async (id) => {
    if(!confirm("Are you sure you want to delete this link?")) return;
    setLoading(true);
    await deleteSidebarLink(id);
    setLoading(false);
    router.refresh();
  };

  const handleSeedData = async () => {
    if(!confirm("WARNING! Seeding data will wipe out all existing Catalogue records in the database and replace them exactly with the contents of src/data/programmes.json. Proceed?")) return;
    setLoading(true);
    const res = await seedProgrammesData();
    setLoading(false);
    if(res.success) {
      alert("Seeding complete!");
      router.refresh();
    } else {
      alert("Error seeding data: " + res.error);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateProgrammeSettings(settingsForm._id, settingsForm);
    setLoading(false);
    alert('Global Page Settings successfully updated!');
    router.refresh();
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* ── SEED ACTION BANNER ── */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded flex justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Database size={24} className="text-yellow-600" />
          <div>
            <h3 className="font-bold text-yellow-800">Local JSON Data Sync</h3>
            <p className="text-xs text-yellow-600">Populate the database instantly using the src/data/programmes.json seed file.</p>
          </div>
        </div>
        <button onClick={handleSeedData} disabled={loading} className="bg-yellow-600 text-white flex items-center gap-2 px-4 py-2 text-sm font-bold shadow-sm hover:bg-yellow-700 transition rounded-md">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Database size={16} />} 
          Seed Data From JSON
        </button>
      </div>

      <div className="border-b border-gray-300 flex">
        <button onClick={() => setActiveTab('courses')} className={`px-6 py-3 font-bold text-sm uppercase ${activeTab === 'courses' ? 'border-b-4 border-[#00588b] text-[#00588b]' : 'text-gray-500 hover:text-gray-800'}`}>Content Data</button>
        <button onClick={() => setActiveTab('settings')} className={`px-6 py-3 font-bold text-sm uppercase flex gap-2 items-center ${activeTab === 'settings' ? 'border-b-4 border-[#00588b] text-[#00588b]' : 'text-gray-500 hover:text-gray-800'}`}><Settings size={16}/> Page Settings</button>
      </div>

      {activeTab === 'settings' && (
         <div className="bg-white border border-gray-300 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Global Page Settings & Components</h2>
            <form onSubmit={handleSaveSettings} className="space-y-8">
              
              {/* MetaData */}
              <div className="bg-gray-50 p-4 border border-gray-200">
                <h4 className="font-bold text-sm text-[#00588b] uppercase mb-4">SEO & Metadata</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Meta Title</label>
                    <input type="text" value={settingsForm.metaTitle || ''} onChange={(e) => setSettingsForm({...settingsForm, metaTitle: e.target.value})} className="w-full border border-gray-300 p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Meta Description</label>
                    <textarea value={settingsForm.metaDescription || ''} onChange={(e) => setSettingsForm({...settingsForm, metaDescription: e.target.value})} className="w-full border border-gray-300 p-2 text-sm h-10 resize-none" />
                  </div>
                </div>
              </div>

              {/* Breadcrumbs */}
              <div className="bg-gray-50 p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-sm text-[#00588b] uppercase">Breadcrumbs Configurator</h4>
                  <button type="button" onClick={() => setSettingsForm({...settingsForm, breadcrumbs: [...(settingsForm.breadcrumbs||[]), {label: '', link: ''}]})} className="bg-blue-600 text-white px-2 py-1 text-xs rounded font-bold">+ Add Step</button>
                </div>
                {(settingsForm.breadcrumbs || []).map((crumb, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <span className="font-bold text-xs text-gray-400">#{idx+1}</span>
                    <input type="text" placeholder="Label (e.g. Home)" value={crumb.label} onChange={(e) => { const bc = [...settingsForm.breadcrumbs]; bc[idx].label = e.target.value; setSettingsForm({...settingsForm, breadcrumbs: bc}); }} className="border border-gray-300 p-1.5 text-sm w-1/3" />
                    <input type="text" placeholder="URL Link (e.g. /)" value={crumb.link} onChange={(e) => { const bc = [...settingsForm.breadcrumbs]; bc[idx].link = e.target.value; setSettingsForm({...settingsForm, breadcrumbs: bc}); }} className="border border-gray-300 p-1.5 text-sm w-1/3" />
                    <button type="button" onClick={() => { const bc = [...settingsForm.breadcrumbs]; bc.splice(idx, 1); setSettingsForm({...settingsForm, breadcrumbs: bc}); }} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={16}/></button>
                  </div>
                ))}
              </div>

              {/* Sidebar CTA */}
              <div className="bg-gray-50 p-4 border border-gray-200">
                <h4 className="font-bold text-sm text-[#00588b] uppercase mb-4">Sidebar 'Need Guidance' CTA Widget</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Widget Icon</label>
                    <IconPicker value={settingsForm.sidebarCta?.icon || ''} onChange={(val) => setSettingsForm({...settingsForm, sidebarCta: {...settingsForm.sidebarCta, icon: val}})} />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Title</label>
                    <input type="text" value={settingsForm.sidebarCta?.title || ''} onChange={(e) => setSettingsForm({...settingsForm, sidebarCta: {...(settingsForm.sidebarCta||{}), title: e.target.value}})} className="w-full border border-gray-300 p-2 text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Description Subtext</label>
                    <input type="text" value={settingsForm.sidebarCta?.description || ''} onChange={(e) => setSettingsForm({...settingsForm, sidebarCta: {...(settingsForm.sidebarCta||{}), description: e.target.value}})} className="w-full border border-gray-300 p-2 text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Button Text</label>
                    <input type="text" value={settingsForm.sidebarCta?.buttonText || ''} onChange={(e) => setSettingsForm({...settingsForm, sidebarCta: {...(settingsForm.sidebarCta||{}), buttonText: e.target.value}})} className="w-full border border-gray-300 p-2 text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Button Link URL</label>
                    <input type="text" value={settingsForm.sidebarCta?.buttonLink || ''} onChange={(e) => setSettingsForm({...settingsForm, sidebarCta: {...(settingsForm.sidebarCta||{}), buttonLink: e.target.value}})} className="w-full border border-gray-300 p-2 text-sm" />
                  </div>
                </div>
              </div>

               {/* Main Banner CTA */}
              <div className="bg-gray-50 p-4 border border-gray-200">
                <h4 className="font-bold text-sm text-[#00588b] uppercase mb-4">Bottom Main Admissions Poster CTA</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Top Icon</label>
                    <IconPicker value={settingsForm.mainCta?.icon || ''} onChange={(val) => setSettingsForm({...settingsForm, mainCta: {...settingsForm.mainCta, icon: val}})} />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Top Mini Text</label>
                    <input type="text" value={settingsForm.mainCta?.badgeText || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), badgeText: e.target.value}})} className="w-full border border-gray-300 p-2 text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Megaphone Title</label>
                    <input type="text" value={settingsForm.mainCta?.title || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), title: e.target.value}})} className="w-full border border-gray-300 p-2 text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Marketing Subtext Description</label>
                    <input type="text" value={settingsForm.mainCta?.description || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), description: e.target.value}})} className="w-full border border-gray-300 p-2 text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 border border-gray-200">
                    <label className="block text-xs font-bold text-orange-500 uppercase mb-1">Primary Yellow Button Text</label>
                    <input type="text" value={settingsForm.mainCta?.primaryBtnText || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), primaryBtnText: e.target.value}})} className="w-full border border-gray-300 p-2 text-sm mb-2" />
                    <label className="block text-xs font-bold text-orange-500 uppercase mb-1">Primary Button URL</label>
                    <input type="text" value={settingsForm.mainCta?.primaryBtnLink || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), primaryBtnLink: e.target.value}})} className="w-full border border-gray-300 p-2 text-sm" />
                  </div>
                  <div className="bg-white p-3 border border-gray-200">
                    <label className="block text-xs font-bold text-blue-500 uppercase mb-1">Secondary Transparent Button Text</label>
                    <input type="text" value={settingsForm.mainCta?.secondaryBtnText || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), secondaryBtnText: e.target.value}})} className="w-full border border-gray-300 p-2 text-sm mb-2" />
                    <label className="block text-xs font-bold text-blue-500 uppercase mb-1">Secondary Button URL</label>
                    <input type="text" value={settingsForm.mainCta?.secondaryBtnLink || ''} onChange={(e) => setSettingsForm({...settingsForm, mainCta: {...(settingsForm.mainCta||{}), secondaryBtnLink: e.target.value}})} className="w-full border border-gray-300 p-2 text-sm" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 font-bold flex justify-center items-center gap-2 hover:bg-green-700 shadow-xl">
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />} Publish Master Settings
              </button>
            </form>
         </div>
      )}

      {activeTab === 'courses' && (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
      {/* ── TOP SECTION: CATEGORIES ── */}
      <div className="bg-white border border-gray-300 p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
          <h2 className="text-lg font-bold flex items-center gap-2 text-[#00588b]">
            <BookMarked size={18} /> Programme Categories
          </h2>
          <button onClick={() => setCatModalOpen(true)} className="bg-[#00588b] text-white px-3 py-1.5 text-sm font-bold flex items-center gap-1 hover:bg-[#004570] transition">
            <Plus size={14} /> Add Category
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {initialCategories.length === 0 && <span className="text-sm text-gray-400">No categories found.</span>}
          {initialCategories.map(cat => (
            <div key={cat._id} className="bg-gray-50 border border-gray-300 px-3 py-1.5 flex items-center gap-3 rounded-md">
              <span className="font-semibold text-sm text-gray-700">{cat.label}</span>
              <button onClick={() => handleDeleteCategory(cat._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1 rounded">
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── QUICK LINKS SECTION ── */}
      <div className="bg-white border border-gray-300 p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
          <h2 className="text-lg font-bold flex items-center gap-2 text-[#00588b]">
            <Layers size={18} /> Quick Sidebar Links
          </h2>
          <button onClick={() => { setEditingLinkId(null); setLinkForm({ label: '', icon: '', slug: '', colorClass: '' }); setLinkModalOpen(true); }} className="bg-orange-500 text-white px-3 py-1.5 text-sm font-bold flex items-center gap-1 hover:bg-orange-600 transition">
            <Plus size={14} /> Add Quick Link
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {initialLinks.length === 0 && <span className="text-sm text-gray-400">No quick links configured.</span>}
          {initialLinks.map(link => (
            <div key={link._id} className="bg-gray-50 border border-gray-300 p-3 flex flex-col gap-2 rounded-md min-w-[200px] hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <span className="font-bold text-sm text-gray-800">{link.label}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEditLink(link)} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-1 rounded">
                    <Edit size={12} />
                  </button>
                  <button onClick={() => handleDeleteLink(link._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1 rounded">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="text-[10px] text-gray-500 font-mono break-all">{link.slug}</div>
              <div className="text-[10px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 inline-block self-start rounded">ICON: {link.icon}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN SECTION: COURSES TABLE ── */}
      <div className="bg-white border border-gray-300 p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
          <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
            <Monitor size={18} className="text-[#00588b]" /> All Master Courses
          </h2>
          <button onClick={() => { setEditingCourseId(null); setCourseForm({ title: '', school: '', categoryId: '', icon: 'Monitor', colorHex: '#00588b', iconBg: 'bg-sky-50', textColor: 'text-sky-700', borderHover: 'hover:border-sky-300', programs: '', badgeLabel: '', badgeBgHex: '#fee2e2', badgeTextHex: '#dc2626', detailsSlug: '#' }); setCourseModalOpen(true); }} disabled={initialCategories.length === 0} className="bg-green-600 disabled:opacity-50 text-white px-4 py-2 text-sm font-bold flex items-center gap-1 hover:bg-green-700 transition shadow-sm">
            <Plus size={16} /> Add New Course
          </button>
        </div>

        {initialCategories.length === 0 && (
          <div className="bg-yellow-50 text-yellow-800 p-3 text-sm font-semibold border-l-4 border-yellow-500 mb-4 flex items-center gap-2">
            <AlertTriangle size={16} /> Please add a Category first before adding courses.
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                <th className="p-3 border border-gray-200">Course / School</th>
                <th className="p-3 border border-gray-200">Category</th>
                <th className="p-3 border border-gray-200 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialCourses.length === 0 ? (
                <tr><td colSpan="4" className="p-5 text-center text-gray-400 text-sm">No courses added yet.</td></tr>
              ) : (
                initialCourses.map(course => (
                  <tr key={course._id} className="hover:bg-gray-50 border-b border-gray-200">
                    <td className="p-3 border border-gray-200">
                      <div className="font-bold text-gray-800 flex items-center gap-2">
                         <span style={{ color: course.colorHex }}>{course.title}</span>
                      </div>
                      <div className="text-xs text-gray-500">{course.school}</div>
                      {course.badge && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded mt-1 inline-block" style={{ backgroundColor: course.badge.bgHex, color: course.badge.textHex }}>{course.badge.label}</span>}
                    </td>
                    <td className="p-3 border border-gray-200">
                      <span className="bg-blue-50 text-[#00588b] px-2 py-1 text-xs font-semibold rounded border border-blue-100">
                        {course.categoryId?.label || 'Unknown'}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditCourse(course)} className="text-blue-600 bg-blue-50 hover:bg-blue-100 p-2 border border-blue-200 rounded transition-colors">
                          <Edit size={14} />
                        </button>
                        <button onClick={() => handleDeleteCourse(course._id)} className="text-red-600 bg-red-50 hover:bg-red-100 p-2 border border-red-200 rounded transition-colors">
                          <Trash2 size={14} />
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
      )}

      {/* ── MODALS ── */}
      
      {/* Category Modal */}
      {isCatModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[400px] border-t-4 border-[#00588b] shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Add New Category</h3>
              <button onClick={() => setCatModalOpen(false)}><X size={18} className="text-gray-500 hover:text-black" /></button>
            </div>
            <form onSubmit={handleAddCategory}>
              <input type="text" required value={catLabel} onChange={e => setCatLabel(e.target.value)} placeholder="e.g. Diploma, Under Graduate" className="w-full border border-gray-300 p-2 text-sm mb-4 outline-none focus:border-[#00588b]" />
              <button type="submit" disabled={loading} className="w-full bg-[#00588b] text-white py-2 font-bold flex justify-center items-center gap-2 hover:bg-[#004570]">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Category
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Course Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto border-t-4 border-green-600 shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b pb-2">
              <h3 className="font-black text-xl text-gray-800">{editingCourseId ? 'Edit Master Course' : 'Add New Master Course'}</h3>
              <button onClick={() => setCourseModalOpen(false)}><X size={22} className="text-gray-500 hover:text-red-500" /></button>
            </div>
            
            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Course Title *</label>
                  <input type="text" required value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} placeholder="e.g. Engineering" className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[#00588b]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">School Name *</label>
                  <input type="text" required value={courseForm.school} onChange={e => setCourseForm({...courseForm, school: e.target.value})} placeholder="e.g. School of Engineering" className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[#00588b]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Category Type *</label>
                  <select required value={courseForm.categoryId} onChange={e => setCourseForm({...courseForm, categoryId: e.target.value})} className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[#00588b] bg-white">
                    <option value="" disabled>Select Category</option>
                    {initialCategories.map(cat => <option key={cat._id} value={cat._id}>{cat.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Icon Name (Lucide)</label>
                  <IconPicker value={courseForm.icon} onChange={(val) => setCourseForm({...courseForm, icon: val})} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Specialisations (Rich Text)</label>
                <RichTextEditor value={courseForm.programs} onChange={(val) => setCourseForm({...courseForm, programs: val})} />
              </div>

              {/* Theme & Badge Settings */}
              <div className="bg-gray-50 p-4 border border-gray-200">
                <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase border-b pb-1">Appearance Settings & Calls to Action</h4>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase flex items-center justify-between">Hex Color <input type="color" className="w-[18px] h-[18px]" value={courseForm.colorHex} onChange={e => setCourseForm({...courseForm, colorHex: e.target.value})} /></label>
                    <input type="text" value={courseForm.colorHex} onChange={e => setCourseForm({...courseForm, colorHex: e.target.value})} className="w-full border border-gray-300 p-1.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase flex items-center justify-between">Badge BG <input type="color" className="w-[18px] h-[18px]" value={courseForm.badgeBgHex} onChange={e => setCourseForm({...courseForm, badgeBgHex: e.target.value})} /></label>
                    <input type="text" value={courseForm.badgeBgHex} onChange={e => setCourseForm({...courseForm, badgeBgHex: e.target.value})} className="w-full border border-gray-300 p-1.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase flex items-center justify-between">Badge Text <input type="color" className="w-[18px] h-[18px]" value={courseForm.badgeTextHex} onChange={e => setCourseForm({...courseForm, badgeTextHex: e.target.value})} /></label>
                    <input type="text" value={courseForm.badgeTextHex} onChange={e => setCourseForm({...courseForm, badgeTextHex: e.target.value})} className="w-full border border-gray-300 p-1.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase">Badge Label</label>
                    <input type="text" placeholder="e.g. Popular" value={courseForm.badgeLabel} onChange={e => setCourseForm({...courseForm, badgeLabel: e.target.value})} className="w-full border border-gray-300 p-1.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase text-blue-800">Details URL Slug</label>
                    <input type="text" placeholder="/courses/btech" value={courseForm.detailsSlug} onChange={e => setCourseForm({...courseForm, detailsSlug: e.target.value})} className="w-full border border-blue-400 p-1.5 text-sm bg-blue-50" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 font-bold flex justify-center items-center gap-2 hover:bg-green-700 text-lg shadow-md mt-4">
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />} {editingCourseId ? 'Update Master Course' : 'Publish Master Course'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[500px] border-t-4 border-orange-500 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{editingLinkId ? 'Edit Sidebar Link' : 'Add Sidebar Link'}</h3>
              <button onClick={() => setLinkModalOpen(false)}><X size={18} className="text-gray-500 hover:text-black" /></button>
            </div>
            <form onSubmit={handleSaveLink} className="space-y-3">
               <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Label</label>
                  <input type="text" required value={linkForm.label} onChange={e => setLinkForm({...linkForm, label: e.target.value})} placeholder="e.g. Testimonials" className="w-full border border-gray-300 p-2 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Slug Destination URL</label>
                  <input type="text" required value={linkForm.slug} onChange={e => setLinkForm({...linkForm, slug: e.target.value})} placeholder="e.g. /testimonials" className="w-full border border-gray-300 p-2 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Lucide Icon Name</label>
                  <IconPicker value={linkForm.icon} onChange={(val) => setLinkForm({...linkForm, icon: val})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Color CSS Class</label>
                  <input type="text" required value={linkForm.colorClass} onChange={e => setLinkForm({...linkForm, colorClass: e.target.value})} placeholder="e.g. text-[#00588b] bg-[#00588b]/10" className="w-full border border-gray-300 p-2 text-sm outline-none" />
                </div>
              <button type="submit" disabled={loading} className="w-full bg-orange-500 text-white py-2 font-bold flex justify-center items-center gap-2 mt-4 hover:bg-orange-600">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {editingLinkId ? 'Update Quick Link' : 'Save Quick Link'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}