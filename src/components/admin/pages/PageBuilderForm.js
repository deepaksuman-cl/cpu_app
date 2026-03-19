'use client';

import MediaUploader from '@/components/admin/MediaUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import IconPicker from '@/components/admin/ui/IconPicker';
import { createPage, updatePage } from '@/lib/actions/pageActions';
import { AlertTriangle, ArrowDown, ArrowUp, BarChart3, GripVertical, Image as ImageIcon, Images, Layout, Loader2, Plus, Save, Trash2, Type, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const BLOCK_DEFINITIONS = [
  { type: 'RichTextFull', label: 'Rich Text Paragraph', icon: Type },
  { type: 'SplitLayout', label: '50/50 Split (Text + Image)', icon: Layout },
  { type: 'Accordion', label: 'Accordion (FAQ)', icon: GripVertical },
  { type: 'ProfileGrid', label: 'Profiles Directory Grid', icon: Users },
  { type: 'StatsGrid', label: 'Statistics / Metrics Grid', icon: BarChart3 },
  { type: 'SingleImage', label: 'Single Image', icon: ImageIcon },
  { type: 'GalleryBlock', label: 'Interactive Gallery', icon: Images }
];

const getEmptyBlock = (type) => {
  const base = { blockType: type, content: '', image: '', imageHeight: '', imageWidth: '', isReversed: false, splitConfig: '50-50', singleImage: { path: '', height: '', width: '', align: 'center' }, galleryHeading: { badge: '', title: '', highlight: '', description: '' }, accordionItems: [], profileItems: [], statsItems: [] };
  if (type === 'Accordion') base.accordionItems = [{ title: '', content: '' }];
  if (type === 'ProfileGrid') base.profileItems = [{ name: '', designation: '', company: '', image: '' }];
  if (type === 'StatsGrid') base.statsItems = [{ label: '', value: '', icon: '' }];
  if (type === 'GalleryBlock') base.galleryItems = [{ image: '', title: '', category: '' }];
  return base;
};

export default function PageBuilderForm({ mode = 'create', initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [meta, setMeta] = useState(initialData?.meta || { title: '', description: '' });
  const [hero, setHero] = useState(initialData?.hero || { title: '', bgImage: '', badge: '' });
  const [blocks, setBlocks] = useState(initialData?.blocks || []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !slug) {
      setError('Title and Slug are strictly required.');
      return;
    }
    setLoading(true);
    setError(null);
    const payload = { title, slug, meta, hero, blocks };
    
    const res = mode === 'edit' 
      ? await updatePage(initialData._id, payload)
      : await createPage(payload);

    if (res.success) {
      setLoading(false);
      router.push('/admin/pages');
      router.refresh();
    } else {
      setError(res.error || 'Failed to save page configuration.');
      setLoading(false);
    }
  };

  const addBlock = (type) => setBlocks([...blocks, getEmptyBlock(type)]);
  const removeBlock = (index) => setBlocks(blocks.filter((_, i) => i !== index));
  
  const moveBlock = (index, dir) => {
    if ((dir === -1 && index === 0) || (dir === 1 && index === blocks.length - 1)) return;
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index + dir]] = [newBlocks[index + dir], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const updateBlock = (index, field, value) => {
    const newBlocks = [...blocks];
    newBlocks[index][field] = value;
    setBlocks(newBlocks);
  };

  // Array Managers
  const addArrayItem = (blockIndex, arrayField, emptyItem) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex][arrayField].push(emptyItem);
    setBlocks(newBlocks);
  };
  const removeArrayItem = (blockIndex, arrayField, itemIndex) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex][arrayField].splice(itemIndex, 1);
    setBlocks(newBlocks);
  };
  const updateArrayItem = (blockIndex, arrayField, itemIndex, field, value) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex][arrayField][itemIndex][field] = value;
    setBlocks(newBlocks);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-32">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm font-semibold text-red-700 flex items-center gap-2">
          <AlertTriangle size={18} /> {error}
        </div>
      )}

      {/* CORE CONFIGURATION */}
      <div className="bg-gray-50 border border-gray-300 p-6 rounded-none">
        <h2 className="text-lg font-bold text-[#00588b] mb-4">Core Core Identity & SEO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Internal Reference Title *</label>
            <input 
              type="text" required value={title} onChange={e => setTitle(e.target.value)} 
              className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[#00588b] rounded-none" 
              placeholder="e.g. Placement Policy 2026" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">URL Slug *</label>
            <div className="flex">
              <span className="bg-gray-200 border-y border-l border-gray-300 px-3 py-2 text-gray-500 text-sm font-mono leading-none flex items-center">/</span>
              <input 
                type="text" required value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} 
                className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[#00588b] rounded-none font-mono" 
                placeholder="placement-policy" 
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">SEO Meta Title</label>
            <input 
              type="text" value={meta.title} onChange={e => setMeta({...meta, title: e.target.value})} 
              className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[#00588b] rounded-none" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">SEO Meta Description</label>
            <input 
              type="text" value={meta.description} onChange={e => setMeta({...meta, description: e.target.value})} 
              className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[#00588b] rounded-none" 
            />
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="bg-white border text-gray-800 border-gray-300 p-6 rounded-none shadow-sm">
        <h2 className="text-lg font-bold text-[#00588b] mb-4 border-b border-gray-200 pb-2">Top Banner / Hero Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Display Main Heading (H1)</label>
              <input 
                type="text" value={hero.title} onChange={e => setHero({...hero, title: e.target.value})} 
                className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[#00588b] rounded-none" 
                placeholder="e.g. Discover Engineering" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Badge Tagline (Optional)</label>
              <input 
                type="text" value={hero.badge} onChange={e => setHero({...hero, badge: e.target.value})} 
                className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-[#00588b] rounded-none" 
                placeholder="e.g. ADMISSIONS 2026" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Background Image</label>
              <div className="flex gap-2">
                <input 
                  type="text" value={hero.bgImage} readOnly 
                  className="w-full border border-gray-300 bg-gray-50 p-2 text-sm outline-none rounded-none text-gray-500" 
                  placeholder="Upload via Media Uploader ->" 
                />
              </div>
            </div>
          </div>
          <div className="border border-gray-200 p-4">
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Hero Image Media</label>
            <div className="mb-4">
              {hero.bgImage ? (
                <img src={hero.bgImage} className="w-full h-48 object-cover border border-gray-300 shadow-sm" alt="Hero Banner Preview" />
              ) : (
                <div className="w-full h-48 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                  <ImageIcon size={32} />
                </div>
              )}
            </div>
            <MediaUploader category="pages" onUploadSuccess={(url) => setHero({...hero, bgImage: url})} />
          </div>
        </div>
      </div>

      {/* BLOCK CANVAS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-gray-800 pb-2 mb-4">
          <h2 className="text-xl font-black text-gray-900 uppercase">Structural Content Blocks Canvas</h2>
          <div className="flex items-center gap-2">
            <select 
              className="border border-gray-300 bg-white text-sm font-semibold p-2 rounded-none outline-none focus:border-[#00588b]"
              onChange={(e) => { addBlock(e.target.value); e.target.value = ""; }}
              defaultValue=""
            >
              <option value="" disabled>-- Append New Block --</option>
              {BLOCK_DEFINITIONS.map(bd => <option key={bd.type} value={bd.type}>{bd.label}</option>)}
            </select>
          </div>
        </div>

        {blocks.length === 0 && (
          <div className="p-12 text-center border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 rounded-none">
            <Layout className="mx-auto mb-3 text-gray-400" size={32} />
            <p className="font-semibold">Canvas is empty.</p>
            <p className="text-sm">Select a block structural type from the dropdown above to start assembling this page.</p>
          </div>
        )}

        {blocks.map((block, index) => {
          const typeDef = BLOCK_DEFINITIONS.find(bd => bd.type === block.blockType) || { label: block.blockType, icon: Layout };
          const BlockIcon = typeDef.icon;

          return (
            <div key={index} className="bg-white border border-gray-300 rounded-none shadow-sm duration-150 relative group">
              
              {/* Block Header */}
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#00588b] text-white p-1 rounded-sm"><BlockIcon size={16} /></div>
                  <span className="font-bold text-gray-800 uppercase text-sm tracking-wide">Block #{index + 1}: {typeDef.label}</span>
                </div>
                <div className="flex gap-1">
                  <button type="button" onClick={() => moveBlock(index, -1)} disabled={index === 0} className="p-1.5 text-gray-600 hover:bg-gray-200 disabled:opacity-30 transition-colors border border-transparent"><ArrowUp size={16} /></button>
                  <button type="button" onClick={() => moveBlock(index, 1)} disabled={index === blocks.length - 1} className="p-1.5 text-gray-600 hover:bg-gray-200 disabled:opacity-30 transition-colors border border-transparent"><ArrowDown size={16} /></button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <button type="button" onClick={() => removeBlock(index)} className="p-1.5 text-red-600 hover:bg-red-100 transition-colors border border-transparent"><Trash2 size={16} /></button>
                </div>
              </div>

              {/* Block Body Content based on type */}
              <div className="p-5">
                
                {block.blockType === 'RichTextFull' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Rich Text Paragraph Content</label>
                    <RichTextEditor value={block.content} onChange={(val) => updateBlock(index, 'content', val)} />
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
                        <RichTextEditor value={block.content} onChange={(val) => updateBlock(index, 'content', val)} />
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
                            <RichTextEditor value={item.content} onChange={val => updateArrayItem(index, 'accordionItems', aIdx, 'content', val)} />
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
                      <button type="button" onClick={() => addArrayItem(index, 'profileItems', { name: '', designation: '', company: '', image: '' })} className="text-xs font-bold bg-[#00588b] text-white px-3 py-1.5 hover:bg-[#004570] transition-colors flex gap-1 items-center">
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
                             <div className="scale-75 origin-top-left w-[133%]">
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

                    <div className="mb-4 flex justify-between items-end border-b border-gray-200 pb-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase">Interactive Gallery Images</label>
                      <button type="button" onClick={() => addArrayItem(index, 'galleryItems', { image: '', title: '', category: '' })} className="text-xs font-bold bg-[#00588b] text-white px-3 py-1.5 hover:bg-[#004570] transition-colors flex gap-1 items-center">
                        <Plus size={14} /> Add Image
                      </button>
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
                            <div className="scale-90 origin-top-left w-[111%]">
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

              </div>
            </div>
          );
        })}
      </div>

      {/* FIXED ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 md:left-[280px] bg-white border-t border-gray-300 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-600">
          Status: {loading ? <span className="text-blue-600">Syncing with server...</span> : <span className="text-green-600">Ready</span>}
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className="bg-green-600 text-white px-8 py-2.5 text-sm font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors rounded-none shadow-sm disabled:opacity-50"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {mode === 'edit' ? 'Commit Changes to Server' : 'Publish New Page'}
        </button>
      </div>

    </form>
  );
}
