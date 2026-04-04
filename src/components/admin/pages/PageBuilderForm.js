'use client';

import MediaUploader from '@/components/admin/MediaUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import IconPicker from '@/components/admin/ui/IconPicker';
import { createPage, updatePage } from '@/lib/actions/pageActions';
import { AlertTriangle, ArrowDown, ArrowLeft, ArrowUp, BarChart3, GripVertical, Image as ImageIcon, Images, Layout, Loader2, Megaphone, Plus, Save, Trash2, Type, Users, CheckCircle2, AlertCircle, X, Mail, ChevronRight, SquareStack, Columns, Settings, Monitor, MousePointer2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';

// --- Toast Notification Pattern ---
function Toast({ msg, type, onClose }) {
  return (
    <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 shadow-xl text-[13px] font-semibold bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none ${
      type === 'success'
        ? 'text-[var(--color-success-dark)] border-l-[3px] border-l-[var(--color-success)]'
        : 'text-[var(--color-danger)] border-l-[3px] border-l-[var(--color-danger)]'
    }`}>
      {type === 'success'
        ? <CheckCircle2 size={16} className="text-[var(--color-success)] flex-shrink-0" />
        : <AlertCircle size={16} className="text-[var(--color-danger)] flex-shrink-0" />}
      {msg}
      <button onClick={onClose} className="ml-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"><X size={14} /></button>
    </div>
  );
}

const BLOCK_DEFINITIONS = [
  { type: 'RichTextFull', label: 'Rich Text Paragraph', icon: Type },
  { type: 'SplitLayout', label: '50/50 Split (Text + Image)', icon: Layout },
  { type: 'Accordion', label: 'Accordion (FAQ)', icon: GripVertical },
  { type: 'ProfileGrid', label: 'Profiles Directory Grid', icon: Users },
  { type: 'StatsGrid', label: 'Statistics / Metrics Grid', icon: BarChart3 },
  { type: 'SingleImage', label: 'Single Image', icon: ImageIcon },
  { type: 'GalleryBlock', label: 'Interactive Gallery', icon: Images },
  { type: 'HeroWithStats', label: 'Hero Section with Stats', icon: Layout },
  { type: 'LeaderProfile', label: 'Leader Profile & Message', icon: Users },
  { type: 'CTABanner', label: 'Call-to-Action Banner', icon: Megaphone },
  { type: 'tabbed', label: 'Tabbed / Accordion Block', icon: SquareStack },
  { type: 'slider-grid', label: 'Advanced Slider/Grid Block', icon: Columns }
];

const getEmptyBlock = (type) => {
  const base = { blockType: type, content: '', useProse: true, image: '', imageHeight: '', imageWidth: '', isReversed: false, cssId: '', cssClass: '', splitConfig: '50-50', singleImage: { path: '', height: '', width: '', align: 'center' }, galleryHeading: { badge: '', title: '', highlight: '', description: '' }, accordionItems: [], profileItems: [], statsItems: [] };
  if (type === 'Accordion') base.accordionItems = [{ title: '', content: '' }];
  if (type === 'ProfileGrid') base.profileItems = [{ name: '', designation: '', company: '', slug: '', image: '' }];
  if (type === 'StatsGrid') base.statsItems = [{ label: '', value: '', icon: '' }];
  if (type === 'GalleryBlock') base.galleryItems = [{ image: '', title: '', category: '' }];
  
  if (type === 'HeroWithStats') base.heroStats = { badgeText: '', titleMain: '', titleHighlight: '', subtitle: '', stats: [] };
  if (type === 'LeaderProfile') base.leaderProfile = { image: '', name: '', role: '', organization: '', qualifications: [], greeting: '', welcomeHeadline: '', messageHTML: '', visionQuote: '', signatureQuals: '' };
  if (type === 'CTABanner') base.ctaBanner = { badgeText: '', titleMain: '', titleHighlight: '', primaryBtnText: '', primaryBtnUrl: '', primaryBtnIcon: 'ChevronRight', secondaryBtnText: '', secondaryBtnUrl: '', secondaryBtnIcon: 'Mail' };

  if (type === 'tabbed') {
    base.layout = 'sidebar';
    base.tabs = [{ _id: Date.now().toString(), title: 'New Tab', icon: 'SquareStack', content: '' }];
  }

  if (type === 'slider-grid') {
    return {
      ...base,
      showHeader: false,
      headerTitle: "",
      headerSubtitle: "",
      bgImage: "",
      bgOverlay: false,
      bgParallax: false,
      displayMode: "slider", 
      gridColumns: "3", 
      sliderAutoplay: true,
      sliderLoop: true,
      sliderArrows: true,
      sliderDots: true,
      isFullWidth: false, 
      itemHeight: "450px", 
      itemWidth: "100%", 
      useItemOverlay: true, 
      slidesPerViewMobile: "1", 
      slidesPerViewTablet: "2", 
      navStyle: "outside", 
      sliderGap: "30", 
      overlayOpacity: "40", 
      imageHeight: "100%", 
      imageWidth: "100%", 
      aspectRatio: "16:9", 
      imageFit: "cover", 
      cardStyle: "elevated", 
      items: [ 
        { "_id": "item_1", "image": "", "title": "New Item", "subtitle": "", "link": "", "buttonText": "", "newTab": false } 
      ]
    };
  }

  return base;
};

export default function PageBuilderForm({ mode = 'create', initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [meta, setMeta] = useState({
    title: initialData?.meta?.title || '',
    description: initialData?.meta?.description || ''
  });
  const [hero, setHero] = useState({
    title: initialData?.hero?.title || '',
    bgImage: initialData?.hero?.bgImage || '',
    badge: initialData?.hero?.badge || '',
    hideHero: initialData?.hero?.hideHero || false
  });
  const [pageCssId, setPageCssId] = useState(initialData?.pageCssId || '');
  const [pageCssClass, setPageCssClass] = useState(initialData?.pageCssClass || '');
  const [blocks, setBlocks] = useState(initialData?.blocks || []);
  const [showBlockMenu, setShowBlockMenu] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !slug) {
      setError('Title and Slug are strictly required.');
      return;
    }
    setLoading(true);
    setError(null);
    const payload = { title, slug, meta, hero, blocks, pageCssId, pageCssClass };
    
    const res = mode === 'edit' 
      ? await updatePage(initialData.id, payload)
      : await createPage(payload);

    if (res.success) {
      showToast('Page configuration saved successfully!');
      setLoading(false);
      setTimeout(() => {
        router.push('/admin/pages');
        router.refresh();
      }, 1000);
    } else {
      showToast('Error saving: ' + (res.error || 'Unknown error'), 'error');
      setLoading(false);
    }
  };

  const addBlock = useCallback((type) => setBlocks(prev => [...prev, getEmptyBlock(type)]), []);
  
  const removeBlock = useCallback((index) => setBlocks(prev => prev.filter((_, i) => i !== index)), []);
  
  const moveBlock = useCallback((index, dir) => {
    setBlocks(prev => {
      if ((dir === -1 && index === 0) || (dir === 1 && index === prev.length - 1)) return prev;
      const newBlocks = [...prev];
      [newBlocks[index], newBlocks[index + dir]] = [newBlocks[index + dir], newBlocks[index]];
      return newBlocks;
    });
  }, []);

  const updateBlock = useCallback((index, field, value) => {
    setBlocks(prev => {
      const newBlocks = [...prev];
      newBlocks[index] = { ...newBlocks[index], [field]: value };
      return newBlocks;
    });
  }, []);

  // Array Managers
  const addArrayItem = useCallback((blockIndex, arrayField, emptyItem) => {
    setBlocks(prev => {
      const newBlocks = [...prev];
      newBlocks[blockIndex] = { 
        ...newBlocks[blockIndex], 
        [arrayField]: [...newBlocks[blockIndex][arrayField], emptyItem] 
      };
      return newBlocks;
    });
  }, []);

  const removeArrayItem = useCallback((blockIndex, arrayField, itemIndex) => {
    setBlocks(prev => {
      const newBlocks = [...prev];
      const newArray = [...newBlocks[blockIndex][arrayField]];
      newArray.splice(itemIndex, 1);
      newBlocks[blockIndex] = { ...newBlocks[blockIndex], [arrayField]: newArray };
      return newBlocks;
    });
  }, []);

  const updateArrayItem = useCallback((blockIndex, arrayField, itemIndex, field, value) => {
    setBlocks(prev => {
      const newBlocks = [...prev];
      const newArray = [...newBlocks[blockIndex][arrayField]];
  newArray[itemIndex] = { ...newArray[itemIndex], [field]: value };
  newBlocks[blockIndex] = { ...newBlocks[blockIndex], [arrayField]: newArray };
  return newBlocks;
});
}, []);

const moveArrayItem = useCallback((blockIndex, arrayField, itemIndex, dir) => {
setBlocks(prev => {
  const newBlocks = [...prev];
  const newArray = [...newBlocks[blockIndex][arrayField]];
  if ((dir === -1 && itemIndex === 0) || (dir === 1 && itemIndex === newArray.length - 1)) return prev;
  [newArray[itemIndex], newArray[itemIndex + dir]] = [newArray[itemIndex + dir], newArray[itemIndex]];
  newBlocks[blockIndex] = { ...newBlocks[blockIndex], [arrayField]: newArray };
  return newBlocks;
});
}, []);

// Tab state for the new Slider/Grid block (managed per block index)
const [activeSettingsTab, setActiveSettingsTab] = useState({});

const setSettingsTab = (blockIndex, tab) => {
setActiveSettingsTab(prev => ({ ...prev, [blockIndex]: tab }));
};

  const pageTitle = initialData?.title || 'New Page';
  const pageSlug = initialData?.slug || '';

  return (
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)] flex flex-col">

      {/* Sticky Header */}
      <div className="sticky top-0 z-[30] flex items-center justify-between h-[44px] w-full bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm" style={{ position: 'sticky', top: 0, marginTop: 0 }}>
        <div className="flex items-center h-full px-4 gap-3">
          <a href="/admin/pages" className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-[11px] font-bold uppercase tracking-widest">
            <ArrowLeft size={14} strokeWidth={2.5} />
            <span className="hidden sm:block">Back to Pages</span>
          </a>
          <div className="w-[1px] h-4 bg-[var(--border-default)]"></div>
          <Layout size={14} className="text-[var(--text-muted)] hidden sm:block" strokeWidth={2.5} />
          <h1 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-wider">
            {mode === 'edit' ? `Edit: ${pageTitle}` : 'Create New Page'}
          </h1>
          {pageSlug && (
            <>
              <div className="hidden md:block w-[1px] h-4 bg-[var(--border-default)]"></div>
              <span className="hidden md:inline-block text-[11px] text-[var(--text-muted)] font-mono">/{pageSlug}</span>
            </>
          )}
        </div>
        <div className="flex items-center h-full px-4 gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="flex items-center justify-center h-[32px] px-3 sm:px-4 bg-[var(--color-success)] hover:bg-[var(--color-success-dark)] text-[var(--text-inverse)] transition-colors rounded-none shadow-sm uppercase tracking-widest text-[11px] font-bold gap-1.5 disabled:opacity-50"
          >
            {loading ? <div className="w-3.5 h-3.5 border-2 border-[var(--bg-surface)] border-t-[var(--text-inverse)] rounded-full animate-spin" /> : <Save size={13} strokeWidth={2.5} />}
            <span className="hidden sm:block">{loading ? 'Saving...' : (mode === 'edit' ? 'Commit Changes' : 'Publish Page')}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="w-[98%] lg:w-[95%] xl:w-[92%] mx-auto py-6 pb-32 space-y-5">
      {error && (
        <div className="bg-[var(--bg-surface)] border-l-4 border-[var(--color-danger)] p-4 text-sm font-semibold text-[var(--color-danger)] flex items-center gap-2">
          <AlertTriangle size={18} /> {error}
        </div>
      )}

      {/* CORE CONFIGURATION */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-5 rounded-none">
        <h2 className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest mb-4 border-b border-[var(--border-light)] pb-2">Page Identity & SEO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Internal Reference Title *</label>
            <input 
              type="text" required value={title} onChange={e => setTitle(e.target.value)} 
              className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] rounded-none" 
              placeholder="e.g. Placement Policy 2026" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">URL Slug *</label>
            <div className="flex">
              <span className="bg-[var(--bg-muted)] border border-[var(--border-default)] border-r-0 px-3 text-[var(--text-muted)] text-sm font-mono flex items-center">/</span>
              <input 
                type="text" required value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} 
                className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] rounded-none font-mono" 
                placeholder="placement-policy" 
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">SEO Meta Title</label>
            <input 
              type="text" value={meta.title} onChange={e => setMeta({...meta, title: e.target.value})} 
              className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] rounded-none" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">SEO Meta Description</label>
            <input 
              type="text" value={meta.description} onChange={e => setMeta({...meta, description: e.target.value})} 
              className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] rounded-none" 
            />
          </div>
        </div>
      </div>
      {/* ADVANCED PAGE SETTINGS */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-5 rounded-none">
        <h2 className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest mb-4 border-b border-[var(--border-light)] pb-2">Page Advanced Settings (Custom CSS)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Page CSS ID</label>
            <input 
              type="text" value={pageCssId} onChange={e => setPageCssId(e.target.value)} 
              className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] rounded-none font-mono" 
              placeholder="e.g. main-admission-page"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Page CSS Class</label>
            <input 
              type="text" value={pageCssClass} onChange={e => setPageCssClass(e.target.value)} 
              className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] rounded-none font-mono" 
              placeholder="e.g. custom-theme-dark" 
            />
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-5 rounded-none shadow-sm">
        <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-2 mb-4">
          <h2 className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest ">Top Banner / Hero Configuration</h2>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={hero.hideHero} 
              onChange={e => setHero({...hero, hideHero: e.target.checked})} 
              className="w-3.5 h-3.5 accent-[var(--color-primary)] cursor-pointer" 
            />
            <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest group-hover:text-[var(--text-primary)] transition-colors">Hide Hero on Page</span>
          </label>
        </div>
        {!hero.hideHero ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Display Main Heading (H1)</label>
              <input 
                type="text" value={hero.title} onChange={e => setHero({...hero, title: e.target.value})} 
                className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] rounded-none" 
                placeholder="e.g. Discover Engineering" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Badge Tagline (Optional)</label>
              <input 
                type="text" value={hero.badge} onChange={e => setHero({...hero, badge: e.target.value})} 
                className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] rounded-none" 
                placeholder="e.g. ADMISSIONS 2026" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Hero Background Image URL</label>
              <input 
                type="text" value={hero.bgImage} readOnly 
                className="w-full bg-[var(--bg-muted)] border border-[var(--border-default)] px-3 py-2.5 text-sm text-[var(--text-muted)] outline-none rounded-none" 
                placeholder="Upload via Media Uploader ->" 
              />
            </div>
          </div>
          <div className="border border-[var(--border-default)] p-4 bg-[var(--bg-muted)]">
            <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Hero Image Media</label>
            <div className="mb-4">
              {hero.bgImage ? (
                <img src={hero.bgImage} className="w-full h-40 object-cover border border-[var(--border-default)] shadow-sm" alt="Hero Banner Preview" />
              ) : (
                <div className="w-full h-40 bg-[var(--bg-body)] border border-dashed border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)]">
                  <ImageIcon size={28} />
                </div>
              )}
            </div>
            <MediaUploader category="pages" onUploadSuccess={(url) => setHero({...hero, bgImage: url})} />
          </div>
        </div>
        ) : (
          <div className="py-8 text-center bg-[var(--bg-muted)] border border-dashed border-[var(--border-default)]">
            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">Hero Section is currently disabled for this page</p>
          </div>
        )}
      </div>

      {/* BLOCK CANVAS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3">
          <h2 className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest">Content Blocks Canvas</h2>
          
          <div className="relative">
            <button 
              type="button"
              onClick={() => setShowBlockMenu(!showBlockMenu)}
              className="flex items-center gap-2 h-[32px] px-3 bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--color-primary)] text-[var(--text-primary)] transition-all shadow-sm rounded-none text-[11px] font-bold uppercase tracking-widest"
            >
              <Plus size={14} className={showBlockMenu ? 'rotate-45 transition-transform' : 'transition-transform'} />
              <span>Append New Block</span>
            </button>

            {showBlockMenu && (
              <>
                <div className="fixed inset-0 z-[40]" onClick={() => setShowBlockMenu(false)}></div>
                <div className="absolute right-0 top-full mt-1.5 z-[50] w-[240px] bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-xl p-1 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[min(450px,70vh)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                  <div className="grid grid-cols-1 gap-0.5">
                    {BLOCK_DEFINITIONS.map(bd => {
                      const Icon = bd.icon;
                      return (
                        <button
                          key={bd.type}
                          type="button"
                          onClick={() => {
                            addBlock(bd.type);
                            setShowBlockMenu(false);
                          }}
                          className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-[var(--bg-muted)] transition-colors group border border-transparent hover:border-[var(--border-light)]"
                        >
                          <div className="bg-[var(--bg-body)] p-1.5 text-[var(--text-muted)] group-hover:text-[var(--color-primary)] transition-colors">
                            <Icon size={14} />
                          </div>
                          <span className="text-[11px] font-bold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] uppercase tracking-wider">{bd.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {blocks.length === 0 && (
          <div className="py-12 text-center border-2 border-dashed border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-muted)] rounded-none">
            <Layout className="mx-auto mb-3" size={28} />
            <p className="font-semibold text-sm">Canvas is empty.</p>
            <p className="text-xs mt-1">Select a block type above to start building this page.</p>
          </div>
        )}

        {blocks.map((block, index) => {
          const typeDef = BLOCK_DEFINITIONS.find(bd => bd.type === block.blockType) || { label: block.blockType, icon: Layout };
          const BlockIcon = typeDef.icon;

          return (
            <div key={index} className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none shadow-sm duration-150 relative group">
              
              {/* Block Header */}
              <div className="bg-[var(--bg-muted)] border-b border-[var(--border-default)] px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--color-primary)] text-white p-1"><BlockIcon size={14} /></div>
                  <span className="font-bold text-[var(--text-primary)] uppercase text-[11px] tracking-widest">Block #{index + 1}: {typeDef.label}</span>
                </div>
                <div className="flex gap-1">
                  <button type="button" onClick={() => moveBlock(index, -1)} disabled={index === 0} className="p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] disabled:opacity-30 transition-colors"><ArrowUp size={14} /></button>
                  <button type="button" onClick={() => moveBlock(index, 1)} disabled={index === blocks.length - 1} className="p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] disabled:opacity-30 transition-colors"><ArrowDown size={14} /></button>
                  <div className="w-px h-5 bg-[var(--border-default)] mx-1"></div>
                  <button type="button" onClick={() => removeBlock(index)} className="p-1.5 text-[var(--color-danger)] hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>

              {/* Block Body Content based on type */}
              <div className="p-5">
                
                {/* Block-Level Advanced Settings (ID/Class/Style) */}
                <div className="mb-6 pb-4 border-b border-gray-100 flex flex-wrap gap-4 items-end">
                   <div className="flex-1 min-w-[150px]">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Block CSS ID</label>
                      <input type="text" value={block.cssId || ''} onChange={e => updateBlock(index, 'cssId', e.target.value)} className="w-full border border-gray-200 p-1.5 text-xs outline-none focus:border-[var(--color-primary)] font-mono" placeholder="section-unique-id" />
                   </div>
                   <div className="flex-1 min-w-[150px]">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Block CSS Class</label>
                      <input type="text" value={block.cssClass || ''} onChange={e => updateBlock(index, 'cssClass', e.target.value)} className="w-full border border-gray-200 p-1.5 text-xs outline-none focus:border-[var(--color-primary)] font-mono" placeholder="custom-section-class" />
                   </div>
                </div>
                
                {block.blockType === 'RichTextFull' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Rich Text Paragraph Content</label>
                    <RichTextEditor 
                      value={block.content} 
                      onChange={(val) => updateBlock(index, 'content', val)} 
                      useProse={block.useProse !== false}
                      onProseChange={(val) => updateBlock(index, 'useProse', val)}
                    />
                  </div>
                )}

                {block.blockType === 'SplitLayout' && (
                  <div className="space-y-6">
                    <div className="flex gap-6 items-center bg-gray-50 p-3 border border-gray-200">
                      <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                        <input type="checkbox" checked={block.isReversed} onChange={e => updateBlock(index, 'isReversed', e.target.checked)} className="w-4 h-4 accent-[#00588b]" />
                        Reverse Layout (Image on Left)
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-600">Split Ratio:</span>
                        <select value={block.splitConfig} onChange={e => updateBlock(index, 'splitConfig', e.target.value)} className="border border-gray-300 outline-none p-1 text-sm bg-white">
                          <option value="50-50">50 - 50</option>
                          <option value="30-70">30 - 70</option>
                          <option value="70-30">70 - 30</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Text Side Content</label>
                        <RichTextEditor 
                          value={block.content} 
                          onChange={(val) => updateBlock(index, 'content', val)} 
                          useProse={block.useProse !== false}
                          onProseChange={(val) => updateBlock(index, 'useProse', val)}
                        />
                      </div>
                      <div className="border border-gray-200 p-4">
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Visual Side Media</label>
                        <div className="flex gap-2 mb-4">
                          <div>
                             <label className="block text-[10px] font-bold text-gray-500 uppercase">Width</label>
                             <input type="text" placeholder="100%" value={block.imageWidth || ''} onChange={e => updateBlock(index, 'imageWidth', e.target.value)} className="w-full border border-gray-300 p-1.5 text-sm outline-none bg-white" />
                          </div>
                          <div>
                             <label className="block text-[10px] font-bold text-gray-500 uppercase">Height (e.g. 400px)</label>
                             <input type="text" placeholder="auto" value={block.imageHeight || ''} onChange={e => updateBlock(index, 'imageHeight', e.target.value)} className="w-full border border-gray-300 p-1.5 text-sm outline-none bg-white" />
                          </div>
                        </div>
                        <div className="mb-4">
                           {block.image ? (
                             <img src={block.image} className="w-full object-cover border border-gray-300 shadow-sm" style={{ height: block.imageHeight || '192px' }} alt="Split Graphic" />
                           ) : (
                             <div className="w-full h-48 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                               <ImageIcon size={32} />
                             </div>
                           )}
                        </div>
                        <MediaUploader category="pages" onUploadSuccess={url => updateBlock(index, 'image', url)} />
                      </div>
                    </div>
                  </div>
                )}

                {block.blockType === 'Accordion' && (
                  <div>
                    <div className="mb-4 flex justify-between items-end border-b border-gray-200 pb-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase">Accordion / FAQ Drops</label>
                      <button type="button" onClick={() => addArrayItem(index, 'accordionItems', { title: '', content: '' })} className="text-xs font-bold bg-[#00588b] text-white px-3 py-1.5 hover:bg-[#004570] transition-colors flex gap-1 items-center">
                        <Plus size={14} /> Add Row Node
                      </button>
                    </div>
                    <div className="space-y-4">
                      {block.accordionItems.map((item, aIdx) => (
                        <div key={aIdx} className="border border-gray-300 p-4 bg-gray-50 relative">
                          <button type="button" onClick={() => removeArrayItem(index, 'accordionItems', aIdx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-red-50 p-1 border border-red-100">
                            <Trash2 size={14} />
                          </button>
                          <div className="mb-3 pr-8">
                            <label className="block text-xs font-bold text-gray-600 mb-1">Clickable Trigger Title</label>
                            <input type="text" value={item.title} onChange={e => updateArrayItem(index, 'accordionItems', aIdx, 'title', e.target.value)} className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[#00588b]" placeholder="e.g. What are the eligibility criteria?" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Expanded Content (HTML)</label>
                            <RichTextEditor 
                              value={item.content} 
                              onChange={val => updateArrayItem(index, 'accordionItems', aIdx, 'content', val)} 
                              useProse={item.useProse !== false}
                              onProseChange={val => updateArrayItem(index, 'accordionItems', aIdx, 'useProse', val)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {block.blockType === 'ProfileGrid' && (
                  <div>
                    <div className="mb-4 flex justify-between items-end border-b border-gray-200 pb-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase">Profile Grid Members</label>
                      <button type="button" onClick={() => addArrayItem(index, 'profileItems', { name: '', designation: '', company: '', slug: '', image: '' })} className="text-xs font-bold bg-[#00588b] text-white px-3 py-1.5 hover:bg-[#004570] transition-colors flex gap-1 items-center">
                        <Plus size={14} /> Add Profile
                      </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {block.profileItems.map((profile, pIdx) => (
                        <div key={pIdx} className="border border-gray-300 p-4 bg-gray-50 flex gap-4 items-start relative">
                          <button type="button" onClick={() => removeArrayItem(index, 'profileItems', pIdx)} className="absolute bottom-2 right-2 text-red-500 hover:text-red-700 p-1 border border-red-100 bg-white shadow-sm z-10">
                            <Trash2 size={14} />
                          </button>
                          
                          <div className="w-1/3 flex-shrink-0">
                             {profile.image ? (
                               <img src={profile.image} className="w-full aspect-square object-cover border border-gray-300 mb-2" alt={profile.name} />
                             ) : (
                               <div className="w-full aspect-square bg-gray-200 flex items-center justify-center text-gray-400 border-dashed border-2 border-gray-300 mb-2">
                                 <ImageIcon size={24} />
                               </div>
                             )}
                             <div className="w-full">
                                <MediaUploader category="pages" onUploadSuccess={url => updateArrayItem(index, 'profileItems', pIdx, 'image', url)} />
                             </div>
                          </div>
                          
                          <div className="w-2/3 space-y-2">
                            <div>
                               <label className="block text-[10px] font-bold text-gray-500 uppercase">Full Name</label>
                               <input type="text" value={profile.name} onChange={e => updateArrayItem(index, 'profileItems', pIdx, 'name', e.target.value)} className="w-full border border-gray-300 p-1.5 text-sm outline-none" />
                            </div>
                            <div>
                               <label className="block text-[10px] font-bold text-gray-500 uppercase">Designation / Role</label>
                               <input type="text" value={profile.designation} onChange={e => updateArrayItem(index, 'profileItems', pIdx, 'designation', e.target.value)} className="w-full border border-gray-300 p-1.5 text-sm outline-none" />
                            </div>
                            <div>
                               <label className="block text-[10px] font-bold text-gray-500 uppercase">Company / Sub-text</label>
                               <input type="text" value={profile.company} onChange={e => updateArrayItem(index, 'profileItems', pIdx, 'company', e.target.value)} className="w-full border border-gray-300 p-1.5 text-sm outline-none" />
                            </div>
                            <div>
                               <label className="block text-[10px] font-bold text-gray-400 uppercase">Profile Slug / Page URL (Optional)</label>
                               <input type="text" value={profile.slug || ''} onChange={e => updateArrayItem(index, 'profileItems', pIdx, 'slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} className="w-full border border-gray-300 p-1.5 text-sm outline-none font-mono" placeholder="e.g. dr-john-doe" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {block.blockType === 'StatsGrid' && (
                  <div>
                    <div className="mb-4 flex justify-between items-end border-b border-gray-200 pb-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase">Metrics / Statistics Highlights</label>
                      <button type="button" onClick={() => addArrayItem(index, 'statsItems', { label: '', value: '', icon: '' })} className="text-xs font-bold bg-[#00588b] text-white px-3 py-1.5 hover:bg-[#004570] transition-colors flex gap-1 items-center">
                        <Plus size={14} /> Add Metric
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
                       {block.statsItems.map((stat, sIdx) => (
                         <div key={sIdx} className="border border-gray-300 p-4 bg-gray-50 relative group">
                            <button type="button" onClick={() => removeArrayItem(index, 'statsItems', sIdx)} className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white border border-red-100 shadow-sm z-10">
                              <Trash2 size={14} />
                            </button>
                            <div className="mb-3 space-y-2">
                               <div>
                                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Icon Selection</label>
                                  <IconPicker value={stat.icon} onChange={val => updateArrayItem(index, 'statsItems', sIdx, 'icon', val)} />
                               </div>
                               <div>
                                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Emphasized Value</label>
                                  <input type="text" value={stat.value} onChange={e => updateArrayItem(index, 'statsItems', sIdx, 'value', e.target.value)} className="w-full border border-gray-300 p-1.5 text-lg font-bold outline-none text-[#00588b] font-mono text-center" placeholder="95%" />
                               </div>
                               <div>
                                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Metric Label</label>
                                  <input type="text" value={stat.label} onChange={e => updateArrayItem(index, 'statsItems', sIdx, 'label', e.target.value)} className="w-full border border-gray-300 p-1.5 text-sm outline-none font-semibold text-center" placeholder="Placement Rate" />
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {block.blockType === 'SingleImage' && (
                  <div className="space-y-4 bg-gray-50 border border-gray-200 p-4">
                    <label className="block text-xs font-bold text-gray-700 uppercase">Single Image Settings</label>
                    <div className="mb-4">
                       {block.singleImage?.path ? (
                         <img src={block.singleImage.path} style={{ height: block.singleImage.height || '192px', width: block.singleImage.width || '100%', objectFit: 'cover' }} className="border border-gray-300 shadow-sm mx-auto" alt="Preview" />
                       ) : (
                         <div className="w-full h-48 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                           <ImageIcon size={32} />
                         </div>
                       )}
                    </div>
                    <MediaUploader category="pages" onUploadSuccess={url => updateBlock(index, 'singleImage', { ...block.singleImage, path: url })} />
                    <div className="flex gap-4 mt-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase">Custom Width</label>
                        <input type="text" placeholder="e.g. 100%, 800px" value={block.singleImage?.width || ''} onChange={e => updateBlock(index, 'singleImage', { ...block.singleImage, width: e.target.value })} className="border border-gray-300 p-1.5 text-sm w-full outline-none bg-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase">Custom Height</label>
                        <input type="text" placeholder="e.g. auto, 400px" value={block.singleImage?.height || ''} onChange={e => updateBlock(index, 'singleImage', { ...block.singleImage, height: e.target.value })} className="border border-gray-300 p-1.5 text-sm w-full outline-none bg-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase">Alignment</label>
                        <select value={block.singleImage?.align || 'center'} onChange={e => updateBlock(index, 'singleImage', { ...block.singleImage, align: e.target.value })} className="border border-gray-300 p-1.5 text-sm w-full outline-none bg-white">
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                {block.blockType === 'GalleryBlock' && (
                  <div>
                    <div className="bg-white border text-gray-800 border-gray-300 p-4 mb-6 relative">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#ffb900]"></div>
                      <h3 className="text-xs font-bold text-[#00588b] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Gallery Header Configuration</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase">Top Badge Text</label>
                          <input type="text" value={block.galleryHeading?.badge || ''} onChange={e => updateBlock(index, 'galleryHeading', { ...block.galleryHeading, badge: e.target.value })} className="w-full border border-gray-300 p-1.5 text-sm outline-none" placeholder="e.g. Our Gallery" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase">Main Title</label>
                          <input type="text" value={block.galleryHeading?.title || ''} onChange={e => updateBlock(index, 'galleryHeading', { ...block.galleryHeading, title: e.target.value })} className="w-full border border-gray-300 p-1.5 text-sm outline-none" placeholder="e.g. Explore Our" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase">Highlighted Highlight Word</label>
                          <input type="text" value={block.galleryHeading?.highlight || ''} onChange={e => updateBlock(index, 'galleryHeading', { ...block.galleryHeading, highlight: e.target.value })} className="w-full border border-gray-300 p-1.5 text-sm outline-none" placeholder="e.g. Visual World" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase">Subtext Description</label>
                          <textarea value={block.galleryHeading?.description || ''} onChange={e => updateBlock(index, 'galleryHeading', { ...block.galleryHeading, description: e.target.value })} className="w-full border border-gray-300 p-1.5 text-sm outline-none h-10 resize-y" placeholder="Brief intro to the gallery..." />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 border-b border-gray-200 pb-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase">Interactive Gallery Images</label>
                      <div className="flex flex-wrap gap-2">
                        <MediaUploader 
                           multiple={true} 
                           category="pages" 
                           buttonText="Bulk Add Images" 
                           onUploadSuccess={(urls) => {
                             if (Array.isArray(urls)) {
                               urls.forEach(url => addArrayItem(index, 'galleryItems', { image: url, title: '', category: '' }));
                             }
                           }}
                        />
                        <button type="button" onClick={() => addArrayItem(index, 'galleryItems', { image: '', title: '', category: '' })} className="h-[34px] text-xs font-bold bg-white border border-[#00588b] text-[#00588b] px-3 py-1.5 hover:bg-gray-50 transition-colors flex gap-1 items-center">
                          <Plus size={14} /> Add Empty Row
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {block.galleryItems?.map((item, gIdx) => (
                        <div key={gIdx} className="border border-gray-300 p-4 bg-gray-50 relative group flex flex-col gap-3">
                          
                          {/* Delete Button */}
                          <button type="button" onClick={() => removeArrayItem(index, 'galleryItems', gIdx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 bg-white border border-red-100 shadow-sm z-10">
                            <Trash2 size={14} />
                          </button>

                          {/* Image Uploader Area */}
                          <div>
                            {item.image ? (
                              <img src={item.image} className="w-full h-32 object-cover border border-gray-300 mb-2" alt={item.title || 'Gallery Preview'} />
                            ) : (
                              <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-400 border-dashed border-2 border-gray-300 mb-2">
                                <ImageIcon size={24} />
                              </div>
                            )}
                            <div className="w-full">
                                <MediaUploader category="pages" onUploadSuccess={url => updateArrayItem(index, 'galleryItems', gIdx, 'image', url)} />
                            </div>
                          </div>

                          {/* Text Inputs */}
                          <div className="space-y-2">
                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 uppercase">Image Title</label>
                              <input type="text" value={item.title} onChange={e => updateArrayItem(index, 'galleryItems', gIdx, 'title', e.target.value)} className="w-full border border-gray-300 p-1.5 text-sm outline-none bg-white" placeholder="e.g. Campus View" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 uppercase">Category</label>
                              <input type="text" value={item.category} onChange={e => updateArrayItem(index, 'galleryItems', gIdx, 'category', e.target.value)} className="w-full border border-gray-300 p-1.5 text-sm outline-none bg-white" placeholder="e.g. Infrastructure" />
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {block.blockType === 'HeroWithStats' && (
                  <div className="space-y-6">
                    <div className="bg-white border-l-4 border-[var(--color-primary)] p-5 shadow-sm space-y-4">
                      <h3 className="text-[11px] font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-gray-100 pb-2">Hero Header & Typography</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Badge / Tagline</label>
                          <input type="text" value={block.heroStats?.badgeText || ''} onChange={e => updateBlock(index, 'heroStats', { ...block.heroStats, badgeText: e.target.value })} className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[var(--color-primary)]" placeholder="e.g. ESTABLISHED 1993" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Main Title (Normal)</label>
                          <input type="text" value={block.heroStats?.titleMain || ''} onChange={e => updateBlock(index, 'heroStats', { ...block.heroStats, titleMain: e.target.value })} className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[var(--color-primary)]" placeholder="e.g. Leading the way in" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Title Highlight (Bold/Color)</label>
                          <input type="text" value={block.heroStats?.titleHighlight || ''} onChange={e => updateBlock(index, 'heroStats', { ...block.heroStats, titleHighlight: e.target.value })} className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[var(--color-primary)] font-bold text-[var(--color-primary)]" placeholder="e.g. Global Education" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Hero Subtitle</label>
                          <input type="text" value={block.heroStats?.subtitle || ''} onChange={e => updateBlock(index, 'heroStats', { ...block.heroStats, subtitle: e.target.value })} className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[var(--color-primary)]" placeholder="A brief catchphrase..." />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 p-5">
                      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                        <label className="block text-xs font-bold text-gray-700 uppercase">Interactive Hero Stats</label>
                        <button type="button" 
                          onClick={() => {
                            const newStats = [...(block.heroStats?.stats || []), { icon: 'Star', value: '', label: '' }];
                            updateBlock(index, 'heroStats', { ...block.heroStats, stats: newStats });
                          }} 
                          className="text-xs font-bold bg-[var(--color-primary)] text-white px-3 py-1.5 hover:opacity-90 transition-colors flex gap-1 items-center">
                          <Plus size={14} /> Add Hero Stat
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(block.heroStats?.stats || []).map((stat, sIdx) => (
                          <div key={sIdx} className="bg-white border border-gray-300 p-4 relative group shadow-sm">
                            <button type="button" 
                              onClick={() => {
                                const newStats = block.heroStats.stats.filter((_, i) => i !== sIdx);
                                updateBlock(index, 'heroStats', { ...block.heroStats, stats: newStats });
                              }}
                              className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white border border-red-100 shadow-sm z-10">
                              <Trash2 size={12} />
                            </button>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-[9px] font-bold text-gray-400 uppercase">Icon</label>
                                <IconPicker value={stat.icon} onChange={val => {
                                  const newStats = [...block.heroStats.stats];
                                  newStats[sIdx].icon = val;
                                  updateBlock(index, 'heroStats', { ...block.heroStats, stats: newStats });
                                }} />
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold text-gray-400 uppercase">Large Value</label>
                                <input type="text" value={stat.value} 
                                  onChange={e => {
                                    const newStats = [...block.heroStats.stats];
                                    newStats[sIdx].value = e.target.value;
                                    updateBlock(index, 'heroStats', { ...block.heroStats, stats: newStats });
                                  }}
                                  className="w-full border border-gray-200 p-1.5 text-lg font-black text-[var(--color-primary)] outline-none text-center font-mono" placeholder="30+" />
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold text-gray-400 uppercase">Subtext Label</label>
                                <input type="text" value={stat.label} 
                                  onChange={e => {
                                    const newStats = [...block.heroStats.stats];
                                    newStats[sIdx].label = e.target.value;
                                    updateBlock(index, 'heroStats', { ...block.heroStats, stats: newStats });
                                  }}
                                  className="w-full border border-gray-200 p-1.5 text-xs font-bold text-gray-600 outline-none text-center" placeholder="Years Excellence" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {block.blockType === 'LeaderProfile' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* Left Column: Visual & Qualifications */}
                    <div className="space-y-6">
                      <div className="border border-gray-200 p-5 bg-white shadow-sm">
                        <label className="block text-xs font-bold text-[#00588b] uppercase tracking-wider mb-4 border-b pb-2">Profile Card Configuration</label>
                        <div className="flex gap-4">
                          <div className="w-1/3">
                            <div className="aspect-[3/4] bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 mb-2 overflow-hidden">
                              {block.leaderProfile?.image ? (
                                <img src={block.leaderProfile.image} className="w-full h-full object-cover" alt="Profile" />
                              ) : <ImageIcon size={32} />}
                            </div>
                            <div className="scale-90 origin-top-left w-[111%]">
                              <MediaUploader category="leaders" onUploadSuccess={url => updateBlock(index, 'leaderProfile', { ...block.leaderProfile, image: url })} />
                            </div>
                          </div>
                          <div className="w-2/3 space-y-3">
                            <input type="text" value={block.leaderProfile?.name || ''} onChange={e => updateBlock(index, 'leaderProfile', { ...block.leaderProfile, name: e.target.value })} className="w-full border-b border-gray-300 p-2 text-sm outline-none font-bold" placeholder="Leader's Full Name" />
                            <input type="text" value={block.leaderProfile?.role || ''} onChange={e => updateBlock(index, 'leaderProfile', { ...block.leaderProfile, role: e.target.value })} className="w-full border-b border-gray-300 p-2 text-xs outline-none uppercase tracking-wide text-gray-500" placeholder="Role (e.g. Honorable Chancellor)" />
                            <input type="text" value={block.leaderProfile?.organization || ''} onChange={e => updateBlock(index, 'leaderProfile', { ...block.leaderProfile, organization: e.target.value })} className="w-full border-b border-gray-300 p-2 text-xs outline-none text-[#00588b] font-semibold" placeholder="Organization (e.g. CPU Kota)" />
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 p-5 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                          <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Academic Qualifications</label>
                          <button type="button" 
                            onClick={() => {
                              const newQuals = [...(block.leaderProfile?.qualifications || []), { icon: 'GraduationCap', degree: '', institute: '' }];
                              updateBlock(index, 'leaderProfile', { ...block.leaderProfile, qualifications: newQuals });
                            }}
                            className="text-[10px] bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors uppercase font-bold">+ Add Qual</button>
                        </div>
                        <div className="space-y-3">
                          {(block.leaderProfile?.qualifications || []).map((qual, qIdx) => (
                            <div key={qIdx} className="bg-white border border-gray-200 p-3 flex gap-2 items-center relative group">
                              <IconPicker value={qual.icon} onChange={val => {
                                const newQuals = [...block.leaderProfile.qualifications];
                                newQuals[qIdx].icon = val;
                                updateBlock(index, 'leaderProfile', { ...block.leaderProfile, qualifications: newQuals });
                              }} />
                              <input type="text" value={qual.degree} onChange={e => {
                                const newQuals = [...block.leaderProfile.qualifications];
                                newQuals[qIdx].degree = e.target.value;
                                updateBlock(index, 'leaderProfile', { ...block.leaderProfile, qualifications: newQuals });
                              }} className="flex-1 text-xs border-none outline-none font-bold" placeholder="Degree (e.g. Ph.D.)" />
                              <input type="text" value={qual.institute} onChange={e => {
                                const newQuals = [...block.leaderProfile.qualifications];
                                newQuals[qIdx].institute = e.target.value;
                                updateBlock(index, 'leaderProfile', { ...block.leaderProfile, qualifications: newQuals });
                              }} className="flex-1 text-[11px] border-none outline-none text-gray-500 italic" placeholder="Institution" />
                              <button type="button" onClick={() => {
                                const newQuals = block.leaderProfile.qualifications.filter((_, i) => i !== qIdx);
                                updateBlock(index, 'leaderProfile', { ...block.leaderProfile, qualifications: newQuals });
                              }} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Greetings & Rich Message */}
                    <div className="space-y-6">
                      <div className="bg-white border border-gray-200 p-5 shadow-sm space-y-4">
                        <label className="block text-xs font-bold text-[#00588b] uppercase tracking-wider border-b pb-2 mb-2">Welcome Content Area</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Greeting Text</label>
                            <input type="text" value={block.leaderProfile?.greeting || ''} onChange={e => updateBlock(index, 'leaderProfile', { ...block.leaderProfile, greeting: e.target.value })} className="w-full border border-gray-300 p-2 text-sm outline-none" placeholder="e.g. A Hearty Welcome" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Welcome Headline</label>
                            <input type="text" value={block.leaderProfile?.welcomeHeadline || ''} onChange={e => updateBlock(index, 'leaderProfile', { ...block.leaderProfile, welcomeHeadline: e.target.value })} className="w-full border border-gray-300 p-2 text-sm outline-none" placeholder="e.g. From the Chancellor's Desk" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Rich Text Message HTML</label>
                          <RichTextEditor 
                            value={block.leaderProfile?.messageHTML || ''} 
                            onChange={val => updateBlock(index, 'leaderProfile', { ...block.leaderProfile, messageHTML: val })} 
                            useProse={block.useProse !== false}
                            onProseChange={val => updateBlock(index, 'useProse', val)}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Vision Quote / Bottom Line</label>
                          <textarea value={block.leaderProfile?.visionQuote || ''} onChange={e => updateBlock(index, 'leaderProfile', { ...block.leaderProfile, visionQuote: e.target.value })} className="w-full border border-gray-300 p-2 text-xs outline-none italic text-[#00588b] mb-4" placeholder="e.g. My vision is to nurture world-class leaders..." />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Academic Signature Sub-line (Under Name)</label>
                          <input type="text" value={block.leaderProfile?.signatureQuals || ''} onChange={e => updateBlock(index, 'leaderProfile', { ...block.leaderProfile, signatureQuals: e.target.value })} className="w-full border border-gray-300 p-2 text-[11px] outline-none text-gray-500 font-medium" placeholder="e.g. B.Tech., IIT Delhi • OPM, Harvard Business School" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {block.blockType === 'CTABanner' && (
                  <div className="bg-[#00588b] p-8 border border-[#1c54a3] shadow-md space-y-6">
                    <div className="flex gap-1 border-b border-[#ffffff33] pb-3 mb-2">
                       <Megaphone size={16} className="text-[#fec53a]" />
                       <h3 className="text-white text-xs font-black uppercase tracking-widest">Call-To-Action Banner Editor</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-blue-200 uppercase mb-1">Banner Badge</label>
                        <input type="text" value={block.ctaBanner?.badgeText || ''} onChange={e => updateBlock(index, 'ctaBanner', { ...block.ctaBanner, badgeText: e.target.value })} className="w-full bg-[#1c54a3] border border-[#2a6dbd] p-2.5 text-sm outline-none text-white focus:border-[#fec53a]" placeholder="ADMISSIONS 2026" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-blue-200 uppercase mb-1">Main Title</label>
                        <input type="text" value={block.ctaBanner?.titleMain || ''} onChange={e => updateBlock(index, 'ctaBanner', { ...block.ctaBanner, titleMain: e.target.value })} className="w-full bg-[#1c54a3] border border-[#2a6dbd] p-2.5 text-sm outline-none text-white focus:border-[#fec53a]" placeholder="Your Journey Starts" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-blue-200 uppercase mb-1">Highlight Word</label>
                        <input type="text" value={block.ctaBanner?.titleHighlight || ''} onChange={e => updateBlock(index, 'ctaBanner', { ...block.ctaBanner, titleHighlight: e.target.value })} className="w-full bg-[#1c54a3] border border-[#2a6dbd] p-2.5 text-sm outline-none text-[#fec53a] font-bold focus:border-[#fec53a]" placeholder="Right Here" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#ffffff11]">
                       <div className="space-y-3">
                          <label className="block text-[10px] font-bold text-[#fec53a] uppercase tracking-widest">Primary Action Button</label>
                          <div className="grid grid-cols-1 gap-2">
                             <div className="grid grid-cols-2 gap-2">
                                <input type="text" value={block.ctaBanner?.primaryBtnText || ''} onChange={e => updateBlock(index, 'ctaBanner', { ...block.ctaBanner, primaryBtnText: e.target.value })} className="w-full bg-white border-none p-2 text-xs outline-none font-bold" placeholder="Button Text (e.g. Apply Now)" />
                                <input type="text" value={block.ctaBanner?.primaryBtnUrl || ''} onChange={e => updateBlock(index, 'ctaBanner', { ...block.ctaBanner, primaryBtnUrl: e.target.value })} className="w-full bg-white border-none p-2 text-xs outline-none" placeholder="Button Link (/apply)" />
                             </div>
                             <div className="bg-[#1c54a3] p-1.5 flex items-center gap-3">
                                <span className="text-[9px] font-bold text-blue-200 uppercase">Button Icon</span>
                                <div className="flex-1"><IconPicker value={block.ctaBanner?.primaryBtnIcon || 'ChevronRight'} onChange={val => updateBlock(index, 'ctaBanner', { ...block.ctaBanner, primaryBtnIcon: val })} /></div>
                             </div>
                          </div>
                       </div>
                       <div className="space-y-3">
                          <label className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest">Secondary Outline Button (Mail/Contact)</label>
                          <div className="grid grid-cols-1 gap-2">
                             <div className="grid grid-cols-2 gap-2">
                                <input type="text" value={block.ctaBanner?.secondaryBtnText || ''} onChange={e => updateBlock(index, 'ctaBanner', { ...block.ctaBanner, secondaryBtnText: e.target.value })} className="w-full bg-transparent border border-[#ffffff44] p-2 text-xs outline-none text-white font-bold" placeholder="Button Text" />
                                <input type="text" value={block.ctaBanner?.secondaryBtnUrl || ''} onChange={e => updateBlock(index, 'ctaBanner', { ...block.ctaBanner, secondaryBtnUrl: e.target.value })} className="w-full bg-transparent border border-[#ffffff44] p-2 text-xs outline-none text-white" placeholder="Link URL" />
                             </div>
                             <div className="bg-[#1c54a3] p-1.5 flex items-center gap-3">
                                <span className="text-[9px] font-bold text-blue-200 uppercase">Button Icon</span>
                                <div className="flex-1"><IconPicker value={block.ctaBanner?.secondaryBtnIcon || 'Mail'} onChange={val => updateBlock(index, 'ctaBanner', { ...block.ctaBanner, secondaryBtnIcon: val })} /></div>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {block.blockType === 'tabbed' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-gray-50 p-4 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Layout size={14} className="text-[#00588b]" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Navigation Layout:</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button 
                          type="button" 
                          onClick={() => updateBlock(index, 'layout', 'sidebar')}
                          className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border transition-all ${block.layout === 'sidebar' ? 'bg-[#00588b] text-white border-[#00588b] shadow-sm' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'}`}
                        >Sidebar Tabs</button>
                        <button 
                          type="button" 
                          onClick={() => updateBlock(index, 'layout', 'top')}
                          className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border transition-all ${block.layout === 'top' ? 'bg-[#00588b] text-white border-[#00588b] shadow-sm' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'}`}
                        >Top Navigation</button>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2">
                         <SquareStack size={14} className="text-[#fec53a]" />
                         <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Manage Content Tabs / Sections</label>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => addArrayItem(index, 'tabs', { _id: Date.now().toString(), title: 'New Tab', icon: 'SquareStack', content: '' })} 
                        className="text-[10px] font-black bg-[#00588b] text-white px-4 py-2 hover:bg-[#004570] transition-colors flex gap-2 items-center uppercase tracking-widest shadow-sm"
                      >
                        <Plus size={14} strokeWidth={3} /> Add New Tab
                      </button>
                    </div>

                    <div className="space-y-5">
                      {(block.tabs || []).map((tab, tIdx) => (
                        <div key={tab._id || tIdx} className="border border-gray-200 p-5 bg-white relative group shadow-sm hover:border-gray-300 transition-colors">
                          
                          {/* Item Toolbar */}
                          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button type="button" onClick={() => moveArrayItem(index, 'tabs', tIdx, -1)} disabled={tIdx === 0} className="p-1.5 bg-gray-50 border border-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-20 transition-all"><ArrowUp size={14} /></button>
                            <button type="button" onClick={() => moveArrayItem(index, 'tabs', tIdx, 1)} disabled={tIdx === (block.tabs || []).length - 1} className="p-1.5 bg-gray-50 border border-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-20 transition-all"><ArrowDown size={14} /></button>
                            <div className="w-px h-5 bg-gray-200 mx-1"></div>
                            <button type="button" onClick={() => removeArrayItem(index, 'tabs', tIdx)} className="p-1.5 bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 size={14} /></button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5 border-b border-gray-50 pb-4">
                             <div className="md:col-span-8">
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Tab Label / Navigation Title</label>
                                <input 
                                  type="text" 
                                  value={tab.title} 
                                  onChange={e => updateArrayItem(index, 'tabs', tIdx, 'title', e.target.value)} 
                                  className="w-full border border-gray-200 p-2.5 text-[13px] font-bold outline-none focus:border-[#00588b] bg-gray-50 focus:bg-white transition-all" 
                                  placeholder="e.g. Admission Criteria" 
                                />
                             </div>
                             <div className="md:col-span-4">
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Navigation Icon</label>
                                <IconPicker 
                                  value={tab.icon} 
                                  onChange={val => updateArrayItem(index, 'tabs', tIdx, 'icon', val)} 
                                />
                             </div>
                          </div>
                          
                          <div className="bg-gray-50/50 p-4 border border-gray-100">
                            <label className="block text-[9px] font-black text-[#00588b] uppercase tracking-widest mb-2.5 flex items-center gap-2">
                               <Monitor size={12} /> Rich Content Editor
                            </label>
                            <RichTextEditor 
                              value={tab.content} 
                              onChange={val => updateArrayItem(index, 'tabs', tIdx, 'content', val)} 
                              useProse={block.useProse !== false}
                              onProseChange={val => updateBlock(index, 'useProse', val)}
                            />
                          </div>
                        </div>
                      ))}

                      {(block.tabs || []).length === 0 && (
                        <div className="py-10 text-center border-2 border-dashed border-gray-100 bg-gray-50/30 text-gray-400">
                           <SquareStack size={28} className="mx-auto mb-2 opacity-50" />
                           <p className="text-[10px] font-black uppercase tracking-widest">No tabs configured for this block</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {block.blockType === 'slider-grid' && (
                  <div className="space-y-6">
                    {/* Settings Tabs */}
                    <div className="flex bg-white border border-gray-200 p-0.5 shadow-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                      {[
                        { id: 'header', icon: Type, label: 'Header' },
                        { id: 'bg', icon: ImageIcon, label: 'Background' },
                        { id: 'layout', icon: Layout, label: 'Layout' },
                        { id: 'design', icon: Monitor, label: 'Card Design' },
                        { id: 'items', icon: Images, label: 'Manage Items' }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setSettingsTab(index, tab.id)}
                          className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                            (activeSettingsTab[index] || 'header') === tab.id
                              ? 'bg-[var(--color-primary)] text-white shadow-md'
                              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <tab.icon size={12} />
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white border border-gray-200 p-5 shadow-sm min-h-[200px]">
                      
                      {(activeSettingsTab[index] || 'header') === 'header' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-4">
                            <h3 className="text-[11px] font-bold text-[#00588b] uppercase tracking-widest">Section Header Settings</h3>
                            <label className="flex items-center gap-2 cursor-pointer group">
                              <input 
                                type="checkbox" 
                                checked={block.showHeader} 
                                onChange={e => updateBlock(index, 'showHeader', e.target.checked)} 
                                className="w-3.5 h-3.5 accent-[#00588b]" 
                              />
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-black">Show Header</span>
                            </label>
                          </div>
                          {block.showHeader && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Header Title</label>
                                <input 
                                  type="text" 
                                  value={block.headerTitle || ''} 
                                  onChange={e => updateBlock(index, 'headerTitle', e.target.value)} 
                                  className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b]" 
                                  placeholder="e.g. Our Infrastructure" 
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Header Subtitle / Tagline</label>
                                <input 
                                  type="text" 
                                  value={block.headerSubtitle || ''} 
                                  onChange={e => updateBlock(index, 'headerSubtitle', e.target.value)} 
                                  className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b]" 
                                  placeholder="e.g. World class facilities for our students" 
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {(activeSettingsTab[index] || 'header') === 'bg' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                          <h3 className="text-[11px] font-bold text-[#00588b] uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Block Background Configuration</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Background Image URL</label>
                                <div className="flex gap-2">
                                  <input 
                                    type="text" 
                                    value={block.bgImage || ''} 
                                    readOnly 
                                    className="flex-1 border border-gray-200 bg-gray-50 p-2 text-xs outline-none text-gray-400 font-mono" 
                                    placeholder="Upload image ->" 
                                  />
                                  {block.bgImage && (
                                    <button 
                                      type="button" 
                                      onClick={() => updateBlock(index, 'bgImage', '')} 
                                      className="px-3 bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all text-[10px] font-bold uppercase"
                                    >Clear</button>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-6 p-3 bg-gray-50 border border-gray-100">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                  <input 
                                    type="checkbox" 
                                    checked={block.bgOverlay} 
                                    onChange={e => updateBlock(index, 'bgOverlay', e.target.checked)} 
                                    className="w-3.5 h-3.5 accent-[#00588b]" 
                                  />
                                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-black">Dark Overlay</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                  <input 
                                    type="checkbox" 
                                    checked={block.bgParallax} 
                                    onChange={e => updateBlock(index, 'bgParallax', e.target.checked)} 
                                    className="w-3.5 h-3.5 accent-[#00588b]" 
                                  />
                                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-black">Parallax Effect</span>
                                </label>
                              </div>
                            </div>
                            <div className="border border-dashed border-gray-300 p-2 bg-gray-50 flex flex-col gap-2">
                              {block.bgImage ? (
                                <img src={block.bgImage} className="w-full h-24 object-cover border border-gray-200" alt="BG Preview" />
                              ) : (
                                <div className="w-full h-24 flex items-center justify-center text-gray-300"><ImageIcon size={24} /></div>
                              )}
                              <MediaUploader category="pages" onUploadSuccess={url => updateBlock(index, 'bgImage', url)} />
                            </div>
                          </div>
                        </div>
                      )}

                      {(activeSettingsTab[index] || 'header') === 'layout' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                          <h3 className="text-[11px] font-bold text-[#00588b] uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Display & Layout Controls</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5">Display Mode</label>
                                <div className="flex gap-1 p-1 bg-gray-100 rounded-none border border-gray-200">
                                  <button 
                                    type="button" 
                                    onClick={() => updateBlock(index, 'displayMode', 'slider')}
                                    className={`flex-1 py-1.5 px-3 text-[10px] font-black uppercase tracking-wider transition-all ${block.displayMode === 'slider' ? 'bg-[#00588b] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                  >Slider</button>
                                  <button 
                                    type="button" 
                                    onClick={() => updateBlock(index, 'displayMode', 'grid')}
                                    className={`flex-1 py-1.5 px-3 text-[10px] font-black uppercase tracking-wider transition-all ${block.displayMode === 'grid' ? 'bg-[#00588b] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                  >Grid</button>
                                </div>
                              </div>

                               {block.displayMode === 'grid' && (
                                <div className="animate-in fade-in slide-in-from-left-2 duration-200 space-y-5">
                                  <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Slides Per View (Desktop)</label>
                                    <select 
                                      value={block.gridColumns || '3'} 
                                      onChange={e => updateBlock(index, 'gridColumns', e.target.value)}
                                      className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b] bg-white font-bold"
                                    >
                                      <option value="1">1 Slide (Full Width)</option>
                                      <option value="2">2 Slides</option>
                                      <option value="3">3 Slides</option>
                                      <option value="4">4 Slides</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Space Between Cards (Gap)</label>
                                    <select 
                                      value={block.sliderGap || '30'} 
                                      onChange={e => updateBlock(index, 'sliderGap', e.target.value)}
                                      className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b] bg-white text-xs"
                                    >
                                      <option value="0">0px (No Gap)</option>
                                      <option value="10">10px (Very Small)</option>
                                      <option value="20">20px (Small)</option>
                                      <option value="30">30px (Default / Regular)</option>
                                      <option value="40">40px (Large)</option>
                                      <option value="50">50px (Very Large)</option>
                                    </select>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Slides (Tablet)</label>
                                      <select 
                                        value={block.slidesPerViewTablet || '2'} 
                                        onChange={e => updateBlock(index, 'slidesPerViewTablet', e.target.value)}
                                        className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b] bg-white font-bold"
                                      >
                                        <option value="1">1 Slide</option>
                                        <option value="2">2 Slides</option>
                                        <option value="3">3 Slides</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Slides (Mobile)</label>
                                      <select 
                                        value={block.slidesPerViewMobile || '1'} 
                                        onChange={e => updateBlock(index, 'slidesPerViewMobile', e.target.value)}
                                        className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b] bg-white font-bold"
                                      >
                                        <option value="1">1 Slide</option>
                                        <option value="2">2 Slides</option>
                                      </select>
                                    </div>
                                  </div>
                                  <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                       type="checkbox" 
                                       checked={block.isFullWidth} 
                                       onChange={e => updateBlock(index, 'isFullWidth', e.target.checked)} 
                                       className="w-3.5 h-3.5 accent-[#00588b]" 
                                    />
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-black">Full Screen Stretch</span>
                                  </label>
                                </div>
                              )}
                            </div>

                             {block.displayMode === 'slider' && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50/50 border border-blue-100 animate-in fade-in slide-in-from-right-2 duration-200">
                                    <label className="flex items-center justify-between cursor-pointer group col-span-2 border-b border-blue-100 pb-2 mb-1">
                                      <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Full Width Hero Mode</span>
                                      <input type="checkbox" checked={block.isFullWidth} onChange={e => updateBlock(index, 'isFullWidth', e.target.checked)} className="w-4 h-4 accent-[#00588b]" />
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer group col-span-2 border-b border-blue-100 pb-2 mb-1">
                                      <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Enable Text Overlay (Dark Shade)</span>
                                      <input type="checkbox" checked={block.useItemOverlay !== false} onChange={e => updateBlock(index, 'useItemOverlay', e.target.checked)} className="w-4 h-4 accent-[#00588b]" />
                                    </label>
                                    <div className="col-span-2 border-b border-blue-100 pb-2 mb-1 pt-1">
                                      <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest mb-2">Text Overlay / Shade Opacity</label>
                                      <select 
                                        value={block.overlayOpacity || '40'} 
                                        onChange={e => updateBlock(index, 'overlayOpacity', e.target.value)}
                                        className="w-full border border-blue-200 p-1.5 text-xs outline-none focus:border-[#00588b] bg-white font-bold"
                                      >
                                        <option value="0">0% (Completely Off)</option>
                                        <option value="10">10% (Very Light)</option>
                                        <option value="20">20% (Light)</option>
                                        <option value="40">40% (Medium - Default)</option>
                                        <option value="60">60% (Strong)</option>
                                        <option value="80">80% (Darker)</option>
                                      </select>
                                    </div>
                                    <label className="flex items-center justify-between cursor-pointer group">
                                      <span className="text-[9px] font-black text-blue-900 uppercase tracking-widest">Autoplay</span>
                                      <input type="checkbox" checked={block.sliderAutoplay} onChange={e => updateBlock(index, 'sliderAutoplay', e.target.checked)} className="w-3.5 h-3.5 accent-[#00588b]" />
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer group">
                                      <span className="text-[9px] font-black text-blue-900 uppercase tracking-widest">Infinite Loop</span>
                                      <input type="checkbox" checked={block.sliderLoop} onChange={e => updateBlock(index, 'sliderLoop', e.target.checked)} className="w-3.5 h-3.5 accent-[#00588b]" />
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer group">
                                      <span className="text-[9px] font-black text-blue-900 uppercase tracking-widest">Show Arrows</span>
                                      <input type="checkbox" checked={block.sliderArrows} onChange={e => updateBlock(index, 'sliderArrows', e.target.checked)} className="w-3.5 h-3.5 accent-[#00588b]" />
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer group">
                                      <span className="text-[9px] font-black text-blue-900 uppercase tracking-widest">Show Dots</span>
                                      <input type="checkbox" checked={block.sliderDots} onChange={e => updateBlock(index, 'sliderDots', e.target.checked)} className="w-3.5 h-3.5 accent-[#00588b]" />
                                    </label>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      )}

                      {(activeSettingsTab[index] || 'header') === 'design' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                          <h3 className="text-[11px] font-bold text-[#00588b] uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Card Visual Design</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Container Height (e.g. 500px)</label>
                              <input 
                                type="text" 
                                value={block.itemHeight || '450px'} 
                                onChange={e => updateBlock(index, 'itemHeight', e.target.value)}
                                className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b] bg-white font-mono" 
                                placeholder="450px"
                              />
                            </div>
                            <div className="md:col-span-1">
                              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Container Width (e.g. 100%, 1200px)</label>
                              <input 
                                type="text" 
                                value={block.itemWidth || '100%'} 
                                onChange={e => updateBlock(index, 'itemWidth', e.target.value)}
                                className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b] bg-white font-mono" 
                                placeholder="100%"
                              />
                            </div>
                            <div className="md:col-span-1">
                              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Image Size (e.g. 100%, 250px)</label>
                              <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  value={block.imageWidth || '100%'} 
                                  onChange={e => updateBlock(index, 'imageWidth', e.target.value)}
                                  className="flex-1 border border-gray-200 p-2 text-[10px] outline-none focus:border-[#00588b] bg-white font-mono" 
                                  placeholder="Width"
                                />
                                <input 
                                  type="text" 
                                  value={block.imageHeight || '100%'} 
                                  onChange={e => updateBlock(index, 'imageHeight', e.target.value)}
                                  className="flex-1 border border-gray-200 p-2 text-[10px] outline-none focus:border-[#00588b] bg-white font-mono" 
                                  placeholder="Height"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Image Aspect Ratio</label>
                              <select 
                                value={block.aspectRatio || '16:9'} 
                                onChange={e => updateBlock(index, 'aspectRatio', e.target.value)}
                                className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b] bg-white font-bold"
                              >
                                <option value="1:1">1:1 (Square)</option>
                                <option value="16:9">16:9 (Landscape)</option>
                                <option value="4:5">4:5 (Portrait)</option>
                                <option value="original">Original Ratio</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Image Fit Mode</label>
                              <select 
                                value={block.imageFit || 'cover'} 
                                onChange={e => updateBlock(index, 'imageFit', e.target.value)}
                                className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b] bg-white font-bold"
                              >
                                <option value="cover">Cover (Fill)</option>
                                <option value="contain">Contain (Fit)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {(activeSettingsTab[index] || 'header') === 'items' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-top-1 duration-200">
                          <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-4">
                            <h3 className="text-[11px] font-bold text-[#00588b] uppercase tracking-widest">Manage Grid/Slider Cards</h3>
                            <button 
                              type="button" 
                              onClick={() => addArrayItem(index, 'items', { _id: Date.now().toString(), image: '', title: 'New Item', subtitle: '', link: '', newTab: false })} 
                              className="text-xs font-bold bg-[#00588b] text-white px-3 py-1.5 hover:bg-[#004570] transition-colors flex gap-1 items-center"
                            >
                              <Plus size={14} /> Add New Card
                            </button>
                          </div>

                          <div className="space-y-4">
                            {(block.items || []).map((item, iIdx) => (
                              <div key={item._id || iIdx} className="bg-gray-50 border border-gray-200 p-4 relative group shadow-sm hover:border-gray-300 transition-colors">
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button 
                                    type="button" 
                                    onClick={() => moveArrayItem(index, 'items', iIdx, -1)} 
                                    disabled={iIdx === 0}
                                    className="p-1.5 bg-white border border-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-20 transition-all shadow-sm"
                                  >
                                    <ArrowUp size={14} />
                                  </button>
                                  <button 
                                    type="button" 
                                    onClick={() => moveArrayItem(index, 'items', iIdx, 1)} 
                                    disabled={iIdx === (block.items.length - 1)}
                                    className="p-1.5 bg-white border border-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-20 transition-all shadow-sm"
                                  >
                                    <ArrowDown size={14} />
                                  </button>
                                  <button 
                                    type="button" 
                                    onClick={() => removeArrayItem(index, 'items', iIdx)} 
                                    className="p-1.5 bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                                  {/* Item Image */}
                                  <div className="md:col-span-3 space-y-2">
                                    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Card Image</label>
                                    <div className="aspect-[16/9] bg-gray-200 border border-gray-300 relative overflow-hidden group/img">
                                      {item.image ? (
                                        <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                          <ImageIcon size={24} />
                                        </div>
                                      )}
                                    </div>
                                    <MediaUploader category="pages" onUploadSuccess={url => updateArrayItem(index, 'items', iIdx, 'image', url)} />
                                  </div>

                                  {/* Item Content */}
                                  <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Title</label>
                                      <input 
                                        type="text" 
                                        value={item.title} 
                                        onChange={e => updateArrayItem(index, 'items', iIdx, 'title', e.target.value)} 
                                        className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b] bg-white font-bold" 
                                        placeholder="Enter card title..." 
                                      />
                                    </div>
                                    <div className="md:col-span-2">
                                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Subtitle / Description</label>
                                      <textarea 
                                        value={item.subtitle} 
                                        onChange={e => updateArrayItem(index, 'items', iIdx, 'subtitle', e.target.value)} 
                                        className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b] bg-white h-16 resize-none" 
                                        placeholder="Enter short description..." 
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Action Link / Slug</label>
                                      <input 
                                        type="text" 
                                        value={item.link} 
                                        onChange={e => updateArrayItem(index, 'items', iIdx, 'link', e.target.value)} 
                                        className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b] bg-white font-mono" 
                                        placeholder="/path-or-slug" 
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Button Label (Optional)</label>
                                      <input 
                                        type="text" 
                                        value={item.buttonText || ''} 
                                        onChange={e => updateArrayItem(index, 'items', iIdx, 'buttonText', e.target.value)} 
                                        className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-[#00588b] bg-white" 
                                        placeholder="e.g. Learn More" 
                                      />
                                    </div>
                                    <div className="flex items-end">
                                      <label className="flex items-center gap-2 cursor-pointer pb-2 group">
                                        <input 
                                          type="checkbox" 
                                          checked={item.newTab} 
                                          onChange={e => updateArrayItem(index, 'items', iIdx, 'newTab', e.target.checked)} 
                                          className="w-3.5 h-3.5 accent-[#00588b]" 
                                        />
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-black transition-colors">Open in New Tab</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}

                            {(block.items || []).length === 0 && (
                              <div className="py-12 text-center border-2 border-dashed border-gray-200 bg-white text-gray-400">
                                <Images size={32} className="mx-auto mb-2 opacity-50" />
                                <p className="text-[11px] font-bold uppercase tracking-widest">No cards added yet</p>
                                <button 
                                  type="button" 
                                  onClick={() => addArrayItem(index, 'items', { _id: Date.now().toString(), image: '', title: 'New Item', subtitle: '', link: '', newTab: false })}
                                  className="mt-3 text-[10px] font-black text-[#00588b] uppercase border-b-2 border-transparent hover:border-[#00588b] transition-all"
                                >
                                  Click here to add your first card
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      </form>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
