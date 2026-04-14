'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';

const Trash2 = LucideIcons.Trash2 || LucideIcons.Trash || (() => null);
const Plus = LucideIcons.Plus || LucideIcons.PlusCircle || (() => null);
const GripVertical = LucideIcons.GripVertical || LucideIcons.GripHorizontal || (() => null);
const ChevronDown = LucideIcons.ChevronDown || (() => null);
const ChevronUp = LucideIcons.ChevronUp || (() => null);
import IconPicker from '@/components/admin/ui/IconPicker';
import MediaUploader from '@/components/admin/MediaUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';

// --- Shared Internal UI Components for the Editors ---

const EditorHeader = ({ title, onAdd, addLabel = "ADD" }) => (
  <div className="flex justify-between items-center border-b border-[var(--border-light)] pb-2 mb-4">
    <h4 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{title}</h4>
    {onAdd && (
      <button 
        onClick={onAdd}
        className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-inverse)] bg-[var(--text-primary)] hover:bg-[var(--text-secondary)] transition-colors px-2 py-1 uppercase tracking-wide rounded-none"
      >
        <Plus size={14} /> {addLabel}
      </button>
    )}
  </div>
);

const EditorCard = ({ children, onDelete, index }) => (
  <div className="border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 relative group hover:border-[var(--border-dark)] transition-colors rounded-none mb-3">
    {onDelete && (
      <button 
        onClick={onDelete} 
        className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] p-1 transition-colors bg-[var(--bg-surface)] border border-transparent hover:border-[var(--color-danger-light)] rounded-none z-10"
      >
        <Trash2 size={16} />
      </button>
    )}
    {children}
  </div>
);

const InputGroup = ({ label, children, fullWidth = false }) => (
  <div className={fullWidth ? "col-span-full" : ""}>
    <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1">{label}</label>
    {children}
  </div>
);

const TextInput = ({ value, onChange, placeholder = "" }) => (
  <input 
    type="text" 
    value={value || ''} 
    onChange={e => onChange(e.target.value)} 
    className="w-full border border-[var(--border-default)] p-2 text-xs outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-none transition-colors" 
    placeholder={placeholder}
  />
);

// --- Individual AI Section Editors ---

export const AiHeroEditor = ({ data, onChange }) => {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup label="Title Line 1">
          <TextInput value={data?.title?.[0]} onChange={v => update('title', [v, data?.title?.[1] || ''])} />
        </InputGroup>
        <InputGroup label="Title Line 2 (Highlighted)">
          <TextInput value={data?.title?.[1]} onChange={v => update('title', [data?.title?.[0] || '', v])} />
        </InputGroup>
        <InputGroup label="Subtitle">
          <TextInput value={data?.subtitle} onChange={v => update('subtitle', v)} />
        </InputGroup>
        <InputGroup label="Hero Image (Optional)">
          <MediaUploader category="courses" onUploadSuccess={url => update('heroImage', url)} />
          <div className="mt-2 text-[9px] text-gray-400 break-all">{data?.heroImage || 'No image uploaded'}</div>
        </InputGroup>
      </div>

      <EditorHeader title="Specialization Badges" onAdd={() => update('specializations', [...(data?.specializations || []), { icon: 'Bot', name: '' }])} />
      <div className="space-y-2">
        {(Array.isArray(data?.specializations) ? data.specializations : []).map((spec, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className="w-32"><IconPicker value={spec.icon} onChange={v => {
              const n = [...data.specializations]; n[i].icon = v; update('specializations', n);
            }} /></div>
            <TextInput value={spec.name} onChange={v => {
              const n = [...data.specializations]; n[i].name = v; update('specializations', n);
            }} placeholder="Specialization Name" />
            <button onClick={() => update('specializations', (data?.specializations || []).filter((_, idx) => idx !== i))} className="text-red-500 p-2"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>

      <EditorHeader title="Quick Stats" onAdd={() => update('stats', [...(data?.stats || []), { label: '', value: '' }])} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(Array.isArray(data?.stats) ? data.stats : []).map((stat, i) => (
          <div key={i} className="flex gap-2 items-center p-2 bg-gray-50 border border-dashed border-gray-200">
            <div className="flex-1">
              <TextInput value={stat.label} onChange={v => {
                const n = [...data.stats]; n[i].label = v; update('stats', n);
              }} placeholder="Label (e.g. Duration)" />
              <TextInput value={stat.value} onChange={v => {
                const n = [...data.stats]; n[i].value = v; update('stats', n);
              }} placeholder="Value (e.g. 4 Years)" />
            </div>
            <button onClick={() => update('stats', (data?.stats || []).filter((_, idx) => idx !== i))} className="text-red-500 p-2"><Trash2 size={14}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AiHighlightsEditor = ({ data, onChange }) => {
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="space-y-4">
      <EditorHeader title="Highlight Cards" onAdd={() => onChange([...safeData, { id: Date.now(), icon: 'LaptopCode', title: '', desc: '' }])} />
      {safeData.map((item, i) => (
        <EditorCard key={item.id} onDelete={() => onChange(safeData.filter((_, idx) => idx !== i))}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputGroup label="Icon">
              <IconPicker value={item.icon} onChange={v => {
                const n = [...safeData]; n[i].icon = v; onChange(n);
              }} />
            </InputGroup>
            <div className="md:col-span-2 space-y-3">
              <InputGroup label="Title">
                <TextInput value={item.title} onChange={v => {
                  const n = [...safeData]; n[i].title = v; onChange(n);
                }} />
              </InputGroup>
              <InputGroup label="Description">
                <TextInput value={item.desc} onChange={v => {
                  const n = [...safeData]; n[i].desc = v; onChange(n);
                }} />
              </InputGroup>
            </div>
          </div>
        </EditorCard>
      ))}
    </div>
  );
};

export const AiFeaturesEditor = ({ data, onChange }) => {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup label="Section Title">
          <TextInput value={data.title} onChange={v => update('title', v)} />
        </InputGroup>
        <InputGroup label="Section Subtitle">
          <TextInput value={data.subtitle} onChange={v => update('subtitle', v)} />
        </InputGroup>
      </div>

      <EditorHeader title="Flip Cards" onAdd={() => update('features', [...(data?.features || []), { id: Date.now(), number: '01', icon: 'Code', title: '', desc: '' }])} />
      {(Array.isArray(data?.features) ? data.features : []).map((feat, i) => (
        <EditorCard key={feat.id} onDelete={() => update('features', (data?.features || []).filter((_, idx) => idx !== i))}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <InputGroup label="Number">
              <TextInput value={feat.number} onChange={v => {
                const n = [...data.features]; n[i].number = v; update('features', n);
              }} />
            </InputGroup>
            <InputGroup label="Icon">
              <IconPicker value={feat.icon} onChange={v => {
                const n = [...data.features]; n[i].icon = v; update('features', n);
              }} />
            </InputGroup>
            <div className="md:col-span-2">
              <InputGroup label="Title">
                <TextInput value={feat.title} onChange={v => {
                  const n = [...data.features]; n[i].title = v; update('features', n);
                }} />
              </InputGroup>
            </div>
            <InputGroup label="Description" fullWidth>
              <TextInput value={feat.desc} onChange={v => {
                const n = [...data.features]; n[i].desc = v; update('features', n);
              }} />
            </InputGroup>
          </div>
        </EditorCard>
      ))}
    </div>
  );
};

export const AiCurriculumEditor = ({ data, onChange }) => {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup label="Section Title">
          <TextInput value={data.title} onChange={v => update('title', v)} />
        </InputGroup>
        <InputGroup label="Description">
          <TextInput value={data.description} onChange={v => update('description', v)} />
        </InputGroup>
      </div>

      <EditorHeader title="Yearly Journey" onAdd={() => update('data', [...(data?.data || []), { 
        id: (data?.data?.length || 0) + 1, title: '', subtitle: '', stats: [], semesters: [], categories: [], outcomes: [] 
      }])} />
      
      {(Array.isArray(data?.data) ? data.data : []).map((year, yIdx) => (
        <div key={yIdx} className="border-2 border-[var(--border-default)] p-4 mb-6 relative bg-white">
          <div className="absolute top-[-10px] left-4 bg-[var(--color-primary)] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest">
            Year {year.id}
          </div>
          <button onClick={() => update('data', (data?.data || []).filter((_, idx) => idx !== yIdx))} className="absolute top-2 right-2 text-red-500"><Trash2 size={16}/></button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InputGroup label="Year Heading">
              <TextInput value={year.title} onChange={v => {
                const n = [...data.data]; n[yIdx].title = v; update('data', n);
              }} />
            </InputGroup>
            <InputGroup label="Year Subtitle">
              <TextInput value={year.subtitle} onChange={v => {
                const n = [...data.data]; n[yIdx].subtitle = v; update('data', n);
              }} />
            </InputGroup>
          </div>

          <div className="mt-6 space-y-6">
            <div className="bg-gray-50 p-3">
              <EditorHeader title="Year Stats" onAdd={() => {
                const n = [...data.data]; n[yIdx].stats = [...(n[yIdx].stats || []), { label: '', value: '' }]; update('data', n);
              }} />
              <div className="flex flex-wrap gap-2">
                {year.stats?.map((stat, sIdx) => (
                  <div key={sIdx} className="flex gap-2 items-center bg-white p-2 border border-gray-200">
                    <TextInput value={stat.label} onChange={v => {
                      const n = [...data.data]; n[yIdx].stats[sIdx].label = v; update('data', n);
                    }} placeholder="Label" />
                    <TextInput value={stat.value} onChange={v => {
                      const n = [...data.data]; n[yIdx].stats[sIdx].value = v; update('data', n);
                    }} placeholder="Value" />
                    <button onClick={() => {
                      const n = [...data.data]; n[yIdx].stats = n[yIdx].stats.filter((_, i) => i !== sIdx); update('data', n);
                    }}><Trash2 size={14} className="text-red-400"/></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[0, 1].map(semIdx => (
                <div key={semIdx} className="border border-gray-200 p-3 bg-white">
                  <h5 className="text-[10px] font-bold uppercase mb-3 text-blue-600">Semester {semIdx + 1}</h5>
                  <div className="space-y-3">
                    <InputGroup label="Toggle Special (Bootcamp/Internship)">
                      <input type="checkbox" checked={year.semesters?.[semIdx]?.isSpecial} onChange={e => {
                        const n = [...data.data]; 
                        if(!n[yIdx].semesters[semIdx]) n[yIdx].semesters[semIdx] = { badges: [], subjects: [] };
                        n[yIdx].semesters[semIdx].isSpecial = e.target.checked; 
                        update('data', n);
                      }} />
                    </InputGroup>
                    {year.semesters?.[semIdx]?.isSpecial ? (
                      <>
                        <TextInput placeholder="Special Title" value={year.semesters[semIdx].specialTitle} onChange={v => {
                          const n = [...data.data]; n[yIdx].semesters[semIdx].specialTitle = v; update('data', n);
                        }} />
                        <TextInput placeholder="Special Description" value={year.semesters[semIdx].specialDesc} onChange={v => {
                          const n = [...data.data]; n[yIdx].semesters[semIdx].specialDesc = v; update('data', n);
                        }} />
                      </>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Subjects</label>
                        {year.semesters?.[semIdx]?.subjects?.map((sub, subIdx) => (
                          <div key={subIdx} className="flex gap-2">
                            <TextInput value={sub.name} onChange={v => {
                              const n = [...data.data]; n[yIdx].semesters[semIdx].subjects[subIdx].name = v; update('data', n);
                            }} />
                            <button onClick={() => {
                              const n = [...data.data]; 
                              n[yIdx].semesters[semIdx].subjects = n[yIdx].semesters[semIdx].subjects.filter((_, i) => i !== subIdx);
                              update('data', n);
                            }}><Trash2 size={14}/></button>
                          </div>
                        ))}
                        <button onClick={() => {
                          const n = [...data.data];
                          if(!n[yIdx].semesters[semIdx]) n[yIdx].semesters[semIdx] = { subjects: [], badges: [] };
                          n[yIdx].semesters[semIdx].subjects = [...(n[yIdx].semesters[semIdx].subjects || []), { name: '' }];
                          update('data', n);
                        }} className="text-[9px] font-bold text-blue-500 uppercase">+ ADD SUBJECT</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-3">
              <EditorHeader title="Year Outcomes" onAdd={() => {
                const n = [...data.data]; n[yIdx].outcomes = [...(n[yIdx].outcomes || []), { img: '', title: '' }]; update('data', n);
              }} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {year.outcomes?.map((out, oIdx) => (
                  <div key={oIdx} className="bg-white p-2 border border-gray-200">
                    <MediaUploader category="courses" onUploadSuccess={url => {
                      const n = [...data.data]; n[yIdx].outcomes[oIdx].img = url; update('data', n);
                    }} />
                    <TextInput value={out.title} onChange={v => {
                      const n = [...data.data]; n[yIdx].outcomes[oIdx].title = v; update('data', n);
                    }} placeholder="Outcome Name" />
                    <button onClick={() => {
                      const n = [...data.data]; n[yIdx].outcomes = n[yIdx].outcomes.filter((_, i) => i !== oIdx); update('data', n);
                    }} className="w-full text-red-500 text-[10px] mt-1 font-bold">DELETE</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const AiAdmissionsEditor = ({ data, onChange }) => {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div className="space-y-6">
      <InputGroup label="Main Section Title">
        <TextInput value={data.title} onChange={v => update('title', v)} />
      </InputGroup>

      <div className="bg-gray-50 p-4 border border-gray-200 space-y-4">
        <h5 className="text-[10px] font-bold uppercase text-blue-600">Left Content Config</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup label="Left Title">
            <TextInput value={data.leftSide?.title} onChange={v => update('leftSide', { ...data.leftSide, title: v })} />
          </InputGroup>
          <InputGroup label="CTA Button Text">
            <TextInput value={data.leftSide?.ctaText} onChange={v => update('leftSide', { ...data.leftSide, ctaText: v })} />
          </InputGroup>
          <InputGroup label="Eligibility Heading">
            <TextInput value={data.leftSide?.eligibility?.title} onChange={v => update('leftSide', { ...data.leftSide, eligibility: { ...data.leftSide?.eligibility, title: v } })} />
          </InputGroup>
          <InputGroup label="Eligibility Description">
            <TextInput value={data.leftSide?.eligibility?.description} onChange={v => update('leftSide', { ...data.leftSide, eligibility: { ...data.leftSide?.eligibility, description: v } })} />
          </InputGroup>
        </div>
      </div>

      <EditorHeader title="Timeline Steps" onAdd={() => update('timelineSteps', [...(data?.timelineSteps || []), { id: Date.now(), number: '1', title: '', desc: '', label: '' }])} />
      {(Array.isArray(data?.timelineSteps) ? data.timelineSteps : []).map((step, i) => (
        <EditorCard key={step.id} onDelete={() => update('timelineSteps', (data?.timelineSteps || []).filter((_, idx) => idx !== i))}>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <InputGroup label="No.">
              <TextInput value={step.number} onChange={v => {
                const n = [...data.timelineSteps]; n[i].number = v; update('timelineSteps', n);
              }} />
            </InputGroup>
            <div className="md:col-span-2">
              <InputGroup label="Step Title">
                <TextInput value={step.title} onChange={v => {
                  const n = [...data.timelineSteps]; n[i].title = v; update('timelineSteps', n);
                }} />
              </InputGroup>
            </div>
            <div className="md:col-span-3">
              <InputGroup label="Description">
                <TextInput value={step.desc} onChange={v => {
                  const n = [...data.timelineSteps]; n[i].desc = v; update('timelineSteps', n);
                }} />
              </InputGroup>
            </div>
            <InputGroup label="Footer Label (Blue Link Text)" fullWidth>
              <TextInput value={step.label} onChange={v => {
                const n = [...data.timelineSteps]; n[i].label = v; update('timelineSteps', n);
              }} />
            </InputGroup>
          </div>
        </EditorCard>
      ))}
    </div>
  );
};

export const AiPlacementsEditor = ({ data, onChange }) => {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup label="Section Title">
          <TextInput value={data.title} onChange={v => update('title', v)} />
        </InputGroup>
        <InputGroup label="Subtitle">
          <TextInput value={data.subtitle} onChange={v => update('subtitle', v)} />
        </InputGroup>
      </div>

      <EditorHeader title="Placement Pillars" onAdd={() => update('pillars', [...(data?.pillars || []), { id: Date.now(), icon: 'Rocket', title: '', desc: '' }])} />
      {(Array.isArray(data?.pillars) ? data.pillars : []).map((p, i) => (
        <EditorCard key={p.id} onDelete={() => update('pillars', (data?.pillars || []).filter((_, idx) => idx !== i))}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <InputGroup label="Icon">
              <IconPicker value={p.icon} onChange={v => {
                const n = [...data.pillars]; n[i].icon = v; update('pillars', n);
              }} />
            </InputGroup>
            <div className="md:col-span-3 space-y-2">
              <TextInput placeholder="Pillar Title" value={p.title} onChange={v => {
                const n = [...data.pillars]; n[i].title = v; update('pillars', n);
              }} />
              <TextInput placeholder="Pillar Description" value={p.desc} onChange={v => {
                const n = [...data.pillars]; n[i].desc = v; update('pillars', n);
              }} />
            </div>
          </div>
        </EditorCard>
      ))}

      <EditorHeader title="Company Marquee Logos" onAdd={() => update('companies', [...(data?.companies || []), { name: '', url: '' }])} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(Array.isArray(data?.companies) ? data.companies : []).map((c, i) => (
          <div key={i} className="bg-white p-2 border border-gray-200">
            <MediaUploader category="courses" onUploadSuccess={url => {
              const n = [...data.companies]; n[i].url = url; update('companies', n);
            }} />
            <TextInput value={c.name} onChange={v => {
              const n = [...data.companies]; n[i].name = v; update('companies', n);
            }} placeholder="Company Name" />
            <button onClick={() => update('companies', (data?.companies || []).filter((_, idx) => idx !== i))} className="w-full text-red-500 text-[10px] mt-1 uppercase font-bold">REMOVE</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AiComparisonEditor = ({ data, onChange }) => {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup label="Section Title">
          <TextInput value={data.title} onChange={v => update('title', v)} />
        </InputGroup>
        <InputGroup label="Subtitle">
          <TextInput value={data.subtitle} onChange={v => update('subtitle', v)} />
        </InputGroup>
      </div>

      <EditorHeader title="Comparison Rows" onAdd={() => update('data', [...(data?.data || []), { id: Date.now(), label: '', labelIcon: 'Briefcase', cpu: '', other: '' }])} />
      {(Array.isArray(data?.data) ? data.data : []).map((row, i) => (
        <EditorCard key={row.id} onDelete={() => update('data', (data?.data || []).filter((_, idx) => idx !== i))}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <InputGroup label="Row Icon">
              <IconPicker value={row.labelIcon} onChange={v => {
                const n = [...data.data]; n[i].labelIcon = v; update('data', n);
              }} />
            </InputGroup>
            <InputGroup label="Row Label (e.g. Practical Learning)">
              <TextInput value={row.label} onChange={v => {
                const n = [...data.data]; n[i].label = v; update('data', n);
              }} />
            </InputGroup>
            <InputGroup label="CPU Offering">
              <TextInput value={row.cpu} onChange={v => {
                const n = [...data.data]; n[i].cpu = v; update('data', n);
              }} />
            </InputGroup>
            <InputGroup label="Traditional Offerings">
              <TextInput value={row.other} onChange={v => {
                const n = [...data.data]; n[i].other = v; update('data', n);
              }} />
            </InputGroup>
          </div>
        </EditorCard>
      ))}
    </div>
  );
};

export const AiTeamEditor = ({ data, onChange }) => {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup label="Section Title">
          <TextInput value={data.title} onChange={v => update('title', v)} />
        </InputGroup>
        <InputGroup label="Subtitle">
          <TextInput value={data.subtitle} onChange={v => update('subtitle', v)} />
        </InputGroup>
      </div>

      <EditorHeader title="Board Members" onAdd={() => update('members', [...(data?.members || []), { id: Date.now(), name: '', desc: '', img: '', logos: [] }])} />
      {(Array.isArray(data?.members) ? data.members : []).map((member, i) => (
        <EditorCard key={member.id} onDelete={() => update('members', (data?.members || []).filter((_, idx) => idx !== i))}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputGroup label="Photo">
              <MediaUploader category="courses" onUploadSuccess={url => {
                const n = [...data.members]; n[i].img = url; update('members', n);
              }} />
              <div className="mt-2 text-[9px] text-gray-400 break-all">{member.img || 'No Image'}</div>
            </InputGroup>
            <div className="md:col-span-2 space-y-4">
              <TextInput placeholder="Member Name" value={member.name} onChange={v => {
                const n = [...data.members]; n[i].name = v; update('members', n);
              }} />
              <textarea placeholder="Member Biography" value={member.desc} onChange={e => {
                const n = [...data.members]; n[i].desc = e.target.value; update('members', n);
              }} className="w-full border border-[var(--border-default)] p-2 text-xs h-20 outline-none focus:border-[var(--color-primary)] bg-[var(--bg-surface)] rounded-none resize-none" />
              
              <div className="bg-gray-50 p-2">
                <label className="block text-[9px] font-bold text-gray-500 uppercase mb-2">Company Logos (Max 3)</label>
                <div className="flex gap-2">
                  {[0, 1, 2].map(lIdx => (
                    <div key={lIdx} className="flex-1 bg-white border border-dashed border-gray-300 p-1">
                      <MediaUploader category="courses" onUploadSuccess={url => {
                        const n = [...data.members];
                        const newLogos = [...(n[i].logos || [])];
                        newLogos[lIdx] = url;
                        n[i].logos = newLogos;
                        update('members', n);
                      }} />
                      {member.logos?.[lIdx] && <button onClick={() => {
                        const n = [...data.members];
                        const newLogos = member.logos.filter((_, idx) => idx !== lIdx);
                        n[i].logos = newLogos;
                        update('members', n);
                      }} className="w-full text-[8px] text-red-400 font-bold uppercase mt-1">Clear</button>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </EditorCard>
      ))}
    </div>
  );
};

export const AiCTAEditor = ({ data, onChange }) => {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div className="space-y-6">
      <InputGroup label="Main Title">
        <TextInput value={data.title} onChange={v => update('title', v)} />
      </InputGroup>
      <InputGroup label="Subtitle">
        <TextInput value={data.subtitle} onChange={v => update('subtitle', v)} />
      </InputGroup>
      <InputGroup label="Points List (Key Benefits)" fullWidth>
        <div className="space-y-2">
          {(Array.isArray(data?.points) ? data.points : []).map((p, i) => (
            <div key={i} className="flex gap-2">
              <TextInput value={p} onChange={v => {
                const n = [...data.points]; n[i] = v; update('points', n);
              }} />
              <button onClick={() => update('points', (data?.points || []).filter((_, idx) => idx !== i))}><Trash2 size={16}/></button>
            </div>
          ))}
          <button onClick={() => update('points', [...(data?.points || []), ''])} className="text-[10px] font-bold text-blue-500 uppercase">+ ADD POINT</button>
        </div>
      </InputGroup>
      <InputGroup label="Button Text">
        <TextInput value={data?.buttonText} onChange={v => update('buttonText', v)} />
      </InputGroup>
      <InputGroup label="CTA Image (Optional)">
        <MediaUploader category="courses" onUploadSuccess={url => update('ctaImage', url)} />
        <div className="mt-2 text-[9px] text-gray-400 break-all">{data?.ctaImage || 'No image uploaded (Default will show)'}</div>
      </InputGroup>
    </div>
  );
};

export const AiFAQEditor = ({ data, onChange }) => {
  const update = (field, val) => onChange({ ...data, [field]: val });
  
  // Ensure we have a valid data object for questions
  const faqData = data?.data || {};
  const categories = Object.keys(faqData);

  const addCategory = () => {
    const name = prompt("Enter category name (e.g. Admission, Tech Stack):");
    if (name && !faqData[name]) {
      update('data', { ...faqData, [name]: [] });
    }
  };

  const removeCategory = (cat) => {
    if (confirm(`Are you sure you want to delete the entire "${cat}" category and all its questions?`)) {
      const newData = { ...faqData };
      delete newData[cat];
      update('data', newData);
    }
  };

  const addQuestion = (cat) => {
    const newData = { ...faqData };
    newData[cat] = [...(newData[cat] || []), { id: Date.now(), q: '', a: '' }];
    update('data', newData);
  };

  const updateQuestion = (cat, index, field, val) => {
    const newData = { ...faqData };
    newData[cat] = [...newData[cat]];
    newData[cat][index] = { ...newData[cat][index], [field]: val };
    update('data', newData);
  };

  const removeQuestion = (cat, index) => {
    const newData = { ...faqData };
    newData[cat] = newData[cat].filter((_, i) => i !== index);
    update('data', newData);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup label="Section Title">
          <TextInput value={data.title} onChange={v => update('title', v)} />
        </InputGroup>
        <InputGroup label="Section Subtitle">
          <TextInput value={data.subtitle} onChange={v => update('subtitle', v)} />
        </InputGroup>
      </div>

      <div className="space-y-8">
        <div className="flex justify-between items-center border-b-2 border-blue-100 pb-2">
          <h4 className="text-xs font-black text-blue-800 uppercase tracking-widest">FAQ Categories & Content</h4>
          <button 
            onClick={addCategory}
            className="text-[10px] font-bold bg-blue-600 text-white px-3 py-1 hover:bg-blue-700 transition-colors"
          >
            + ADD CATEGORY
          </button>
        </div>

        {categories.length === 0 && (
          <div className="p-10 border-2 border-dashed border-gray-200 text-center text-gray-400">
            <p className="text-xs font-medium">No FAQ categories found. Click "Add Category" to begin.</p>
          </div>
        )}

        {categories.map(cat => (
          <div key={cat} className="bg-white border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <span className="text-[11px] font-black text-gray-700 uppercase tracking-wider">{cat}</span>
              <div className="flex gap-4">
                <button onClick={() => addQuestion(cat)} className="text-[9px] font-bold text-blue-600 hover:underline">
                  + ADD QUESTION
                </button>
                <button onClick={() => removeCategory(cat)} className="text-[9px] font-bold text-red-500 hover:underline">
                  DELETE CATEGORY
                </button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {(faqData[cat] || []).map((faq, idx) => (
                <div key={faq.id} className="border border-gray-100 p-4 relative bg-white hover:border-gray-300 transition-all">
                  <button 
                    onClick={() => removeQuestion(cat, idx)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                  
                  <div className="space-y-4 pt-2">
                    <InputGroup label="Question">
                      <TextInput 
                        value={faq.q} 
                        onChange={v => updateQuestion(cat, idx, 'q', v)}
                        placeholder="e.g. What is the eligibility criteria?"
                      />
                    </InputGroup>
                    <InputGroup label="Answer Content" fullWidth>
                      <RichTextEditor 
                        value={faq.a} 
                        onChange={v => updateQuestion(cat, idx, 'a', v)}
                      />
                    </InputGroup>
                  </div>
                </div>
              ))}
              {(faqData[cat] || []).length === 0 && (
                <p className="text-center text-[10px] text-gray-400 italic">No questions in this category yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-blue-50/50 border border-blue-100/50 rounded-none">
        <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
          <strong>Pro Tip:</strong> Reordering categories and questions is currently handled by the order of addition. 
          Use the <strong>"RichTextEditor"</strong> to include tables, lists, and formatted text in your answers.
        </p>
      </div>
    </div>
  );
};
