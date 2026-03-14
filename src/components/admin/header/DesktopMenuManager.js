'use client';

import { useState } from 'react';
import {
  Plus, Trash2, Save, GripVertical, Monitor,
  Layers, AlertCircle, CheckCircle2, X,
  Settings2, ExternalLink, Image as ImageIcon,
  Pencil, AlertTriangle
} from 'lucide-react';
import { saveFullNavigationData } from '@/lib/actions/navigation';
import Modal from '../ui/Modal';

// ─── helpers ──────────────────────────────────────────────────────────────────
const inputCls = `w-full bg-white px-3 py-2.5 text-[13px] text-gray-800 font-medium
  focus:outline-none focus:ring-2 focus:ring-[#1c54a3]/25 transition-all
  placeholder:text-gray-300 shadow-sm ring-1 ring-gray-200`
  .replace(/\n\s+/g, ' ');

const selectCls = inputCls + ' appearance-none cursor-pointer';

const TYPE_META = {
  'mega-columns':             { label: 'Mega Columns',    bg: 'bg-blue-50   text-blue-600' },
  'mega-columns-with-image':  { label: 'Columns + Promo', bg: 'bg-violet-50 text-violet-600' },
  'mega-columns-with-images': { label: 'Columns + Icons', bg: 'bg-teal-50   text-teal-600' },
  'split-action-menu':        { label: 'Split Action',    bg: 'bg-amber-50  text-amber-600' },
};

function TypeBadge({ type }) {
  const m = TYPE_META[type] || { label: type, bg: 'bg-gray-100 text-gray-500' };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${m.bg}`}
      style={{ borderRadius: 0 }}>
      {m.label}
    </span>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
      {children}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  return (
    <div style={{ borderRadius: 0 }}
      className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5
        shadow-xl text-[13px] font-semibold bg-white
        ${type === 'success' ? 'text-green-700 border-l-[3px] border-green-500' : 'text-red-600 border-l-[3px] border-red-400'}`}>
      {type === 'success'
        ? <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
        : <AlertCircle  size={16} className="text-red-400 flex-shrink-0" />}
      {msg}
      <button onClick={onClose} className="ml-2 text-gray-300 hover:text-gray-500"><X size={14} /></button>
    </div>
  );
}

// ─── Confirm Delete Modal ─────────────────────────────────────────────────────
function ConfirmModal({ isOpen, onClose, onConfirm, itemName }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Delete"
      subtitle="This action cannot be undone"
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            style={{ borderRadius: 0 }}
            className="flex-1 px-5 py-2.5 text-[13px] font-semibold text-gray-600
              bg-gray-100 hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            style={{ borderRadius: 0 }}
            className="flex-1 px-5 py-2.5 text-[13px] font-bold text-white
              bg-red-500 hover:bg-red-600 transition-all"
          >
            Yes, Delete
          </button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center py-4 gap-4">
        <div className="w-14 h-14 bg-red-50 flex items-center justify-center" style={{ borderRadius: 0 }}>
          <AlertTriangle size={26} className="text-red-400" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-[#1C2D38]">Delete &ldquo;{itemName}&rdquo;?</p>
          <p className="text-[12px] text-gray-400 mt-1 max-w-xs">
            All columns and links inside this menu section will be permanently removed.
          </p>
        </div>
      </div>
    </Modal>
  );
}

// ─── Link Row ─────────────────────────────────────────────────────────────────
function LinkRow({ link, onUpdate, onRemove }) {
  return (
    <div className="group flex items-start gap-2 bg-white px-3 py-2.5 transition-all
      shadow-sm hover:shadow-md ring-1 ring-gray-100 hover:ring-[#1c54a3]/25"
      style={{ borderRadius: 0 }}>
      <GripVertical size={14} className="mt-0.5 text-gray-200 cursor-grab flex-shrink-0" />
      <div className="flex-1 min-w-0 space-y-1">
        <input
          value={link.label}
          placeholder="Link label"
          onChange={(e) => onUpdate('label', e.target.value)}
          className="w-full text-[13px] font-semibold text-gray-800 bg-transparent outline-none
            border-b border-transparent focus:border-gray-200 placeholder:text-gray-300 transition-colors"
        />
        <div className="flex items-center gap-1">
          <ExternalLink size={10} className="text-gray-300 flex-shrink-0" />
          <input
            value={link.slug}
            placeholder="/path"
            onChange={(e) => onUpdate('slug', e.target.value)}
            className="w-full text-[11px] text-gray-400 bg-transparent outline-none font-mono
              border-b border-transparent focus:border-gray-200 placeholder:text-gray-300 transition-colors"
          />
        </div>
      </div>
      <button
        onClick={onRemove}
        className="mt-0.5 p-1 opacity-0 group-hover:opacity-100
          text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all"
        style={{ borderRadius: 0 }}
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}

// ─── Column Card ─────────────────────────────────────────────────────────────
function ColumnCard({ col, onUpdateHeading, onAddLink, onRemoveLink, onUpdateLink, onRemove }) {
  return (
    <div className="bg-white overflow-hidden group/col transition-all shadow-sm
      hover:shadow-md ring-1 ring-gray-100" style={{ borderRadius: 0 }}>
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Layers size={12} className="text-gray-300 flex-shrink-0" />
          <input
            value={col.heading}
            onChange={(e) => onUpdateHeading(e.target.value)}
            className="flex-1 text-[13px] font-bold text-[#1C2D38] bg-transparent outline-none
              border-b border-transparent focus:border-[#1c54a3] min-w-0 transition-colors"
            placeholder="Column heading"
          />
        </div>
        <button
          onClick={onRemove}
          style={{ borderRadius: 0 }}
          className="p-1.5 opacity-0 group-hover/col:opacity-100
            text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all"
        >
          <Trash2 size={13} />
        </button>
      </div>
      {/* Links */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {col.links.length} link{col.links.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={onAddLink}
            style={{ borderRadius: 0 }}
            className="flex items-center gap-1 text-[11px] font-bold text-[#1c54a3]
              bg-blue-50 hover:bg-blue-100 px-2.5 py-1 transition-all"
          >
            <Plus size={11} /> Add Link
          </button>
        </div>
        <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-0.5
          [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200">
          {col.links.length === 0 ? (
            <div className="text-center py-5 text-[12px] text-gray-300 bg-gray-50">No links yet</div>
          ) : col.links.map((link, lIdx) => (
            <LinkRow
              key={lIdx}
              link={link}
              onUpdate={(field, val) => onUpdateLink(lIdx, field, val)}
              onRemove={() => onRemoveLink(lIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Edit Modal Body ──────────────────────────────────────────────────────────
function MenuEditContent({ m, onUpdateField, onAddColumn, onRemoveColumn,
  onAddLink, onRemoveLink, onUpdateLink, onUpdateColumnHeading }) {
  return (
    <div className="space-y-7">
      {/* Settings */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Basic Settings</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 shadow-sm ring-1 ring-gray-100"
          style={{ borderRadius: 0 }}>
          <Field label="Section Title">
            <input value={m.title} onChange={(e) => onUpdateField('title', e.target.value)}
              className={inputCls} placeholder="e.g. Academics" style={{ borderRadius: 0 }} />
          </Field>
          <Field label="Panel Type">
            <select value={m.type} onChange={(e) => onUpdateField('type', e.target.value)}
              className={selectCls} style={{ borderRadius: 0 }}>
              <option value="mega-columns">Mega Columns (Standard)</option>
              <option value="mega-columns-with-image">Mega Columns + Promo Image</option>
              <option value="mega-columns-with-images">Mega Columns + Icons/Images</option>
              <option value="split-action-menu">Split Action Menu</option>
            </select>
          </Field>
          {(m.type === 'mega-columns-with-image' || m.type === 'split-action-menu') && (<>
            <Field label="Promo Image URL">
              <div className="relative">
                <input value={m.promoImage || ''} onChange={(e) => onUpdateField('promoImage', e.target.value)}
                  className={inputCls + ' pl-9'} placeholder="https://..." style={{ borderRadius: 0 }} />
                <ImageIcon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
            </Field>
            <Field label="Promo Description">
              <textarea value={m.promoDescription || ''} onChange={(e) => onUpdateField('promoDescription', e.target.value)}
                className={inputCls + ' resize-none'} rows={2} placeholder="Short description..."
                style={{ borderRadius: 0 }} />
            </Field>
          </>)}
        </div>
      </div>

      {/* Columns */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Columns — {m.columns?.length || 0}
          </p>
          <button onClick={onAddColumn} style={{ borderRadius: 0 }}
            className="flex items-center gap-1.5 text-[12px] font-bold text-[#1c54a3]
              bg-blue-50 hover:bg-blue-100 px-3 py-1.5 transition-all">
            <Plus size={13} /> Add Column
          </button>
        </div>
        {(!m.columns || m.columns.length === 0) ? (
          <div className="text-center py-10 bg-white text-[12px] text-gray-300 ring-1 ring-gray-100"
            style={{ borderRadius: 0 }}>
            No columns yet — click Add Column
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {m.columns.map((col, cIdx) => (
              <ColumnCard key={cIdx} col={col}
                onUpdateHeading={(val) => onUpdateColumnHeading(cIdx, val)}
                onAddLink={() => onAddLink(cIdx)}
                onRemoveLink={(lIdx) => onRemoveLink(cIdx, lIdx)}
                onUpdateLink={(lIdx, field, val) => onUpdateLink(cIdx, lIdx, field, val)}
                onRemove={() => onRemoveColumn(cIdx)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DesktopMenuManager({ initialData, initialTopMenu }) {
  const [menu, setMenu]               = useState(initialTopMenu);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // { idx, name }
  const [saving, setSaving]           = useState(false);
  const [toast, setToast]             = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── save ──
  const saveAll = async () => {
    setSaving(true);
    const result = await saveFullNavigationData({ ...initialData, topMenu: menu });
    setSaving(false);
    if (result.success) showToast('Navigation saved successfully!', 'success');
    else showToast('Error: ' + result.error, 'error');
  };

  // ── menu crud ──
  const addMenu = () => {
    const newMenu = { title: 'New Menu', type: 'mega-columns',
      columns: [{ heading: 'New Column', links: [{ label: 'New Link', slug: '/' }] }] };
    setMenu(prev => { setEditingIndex(prev.length); return [...prev, newMenu]; });
  };

  const confirmDelete = (idx) => setDeleteTarget({ idx, name: menu[idx]?.title || 'Untitled' });

  const doDelete = () => {
    if (deleteTarget === null) return;
    const updated = [...menu];
    updated.splice(deleteTarget.idx, 1);
    setMenu(updated);
    if (editingIndex === deleteTarget.idx) setEditingIndex(null);
    setDeleteTarget(null);
  };

  const updateMenuField = (idx, field, value) => {
    setMenu(prev => { const u = [...prev]; u[idx] = { ...u[idx], [field]: value }; return u; });
  };
  const addColumn    = (mIdx) => setMenu(prev => { const u=[...prev]; u[mIdx].columns=[...(u[mIdx].columns||[]),{heading:'New Column',links:[]}]; return u; });
  const removeColumn = (mIdx, cIdx) => setMenu(prev => { const u=[...prev]; u[mIdx].columns.splice(cIdx,1); return u; });
  const addLink      = (mIdx, cIdx) => setMenu(prev => { const u=[...prev]; u[mIdx].columns[cIdx].links=[...u[mIdx].columns[cIdx].links,{label:'New Link',slug:'/'}]; return u; });
  const removeLink   = (mIdx, cIdx, lIdx) => setMenu(prev => { const u=[...prev]; u[mIdx].columns[cIdx].links.splice(lIdx,1); return u; });
  const updateLink   = (mIdx, cIdx, lIdx, field, value) => setMenu(prev => { const u=[...prev]; u[mIdx].columns[cIdx].links[lIdx]={...u[mIdx].columns[cIdx].links[lIdx],[field]:value}; return u; });
  const updateColumnHeading = (mIdx, cIdx, value) => setMenu(prev => { const u=[...prev]; u[mIdx].columns[cIdx].heading=value; return u; });

  const editingMenu = editingIndex !== null ? menu[editingIndex] : null;

  return (
    <div className="min-h-screen bg-[#f7f8fc] pb-24">

      {/* ── PAGE HEADER ── */}
      <div className="bg-white px-8 py-5 sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#1c54a3]/8" style={{ borderRadius: 0 }}>
              <Monitor size={17} className="text-[#1c54a3]" />
            </div>
            <div>
              <h1 className="text-[15px] font-bold text-[#1C2D38]">Desktop Mega Menus</h1>
              <p className="text-[12px] text-gray-400 mt-0.5">
                {menu.length} section{menu.length !== 1 ? 's' : ''} configured
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={addMenu} style={{ borderRadius: 0 }}
              className="flex items-center gap-2 text-[13px] font-semibold text-gray-600
                bg-gray-100 hover:bg-gray-200 px-4 py-2.5 transition-all">
              <Plus size={15} /> Add Menu
            </button>
            <button onClick={saveAll} disabled={saving} style={{ borderRadius: 0 }}
              className="flex items-center gap-2 bg-[#1c54a3] text-white text-[13px] font-bold
                px-5 py-2.5 hover:bg-[#174a94] active:scale-95 transition-all shadow-md disabled:opacity-60">
              {saving
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <Save size={15} />}
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* ── MENU LIST ── */}
      <div className="max-w-5xl mx-auto px-8 pt-8 space-y-2">
        {menu.length === 0 ? (
          <div className="text-center py-20 bg-white shadow-sm" style={{ borderRadius: 0 }}>
            <Monitor size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-[14px] font-semibold text-gray-400">No menus yet</p>
            <p className="text-[12px] text-gray-300 mb-5">Add your first menu section to get started</p>
            <button onClick={addMenu} style={{ borderRadius: 0 }}
              className="inline-flex items-center gap-2 bg-[#1c54a3] text-white
                text-[13px] font-bold px-5 py-2.5 hover:bg-[#174a94] transition-all">
              <Plus size={15} /> Add First Menu
            </button>
          </div>
        ) : menu.map((m, mIdx) => {
          const totalLinks = m.columns?.reduce((a, c) => a + (c.links?.length || 0), 0) || 0;
          return (
            <div key={mIdx}
              className="group bg-white shadow-sm hover:shadow-md transition-all overflow-hidden"
              style={{ borderRadius: 0 }}>
              <div className="flex items-center gap-4 px-5 py-4">
                <GripVertical size={15} className="text-gray-200 cursor-grab flex-shrink-0" />
                <div className="p-2 bg-gray-50 flex-shrink-0" style={{ borderRadius: 0 }}>
                  <Settings2 size={14} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14px] font-bold text-[#1C2D38] truncate">
                      {m.title || 'Untitled Menu'}
                    </span>
                    <TypeBadge type={m.type} />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {m.columns?.length || 0} columns · {totalLinks} links
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => confirmDelete(mIdx)}
                    style={{ borderRadius: 0 }}
                    className="p-2 text-gray-200 hover:text-red-400 hover:bg-red-50
                      transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 size={15} />
                  </button>
                  <button
                    onClick={() => setEditingIndex(mIdx)}
                    style={{ borderRadius: 0 }}
                    className="flex items-center gap-2 text-[12px] font-bold text-[#1c54a3]
                      bg-blue-50 hover:bg-blue-100 px-3.5 py-2 transition-all">
                    <Pencil size={13} /> Edit
                  </button>
                </div>
              </div>
              {m.columns?.length > 0 && (
                <div className="flex items-center gap-2 px-5 pb-3 flex-wrap">
                  {m.columns.map((col, cIdx) => (
                    <span key={cIdx}
                      className="inline-flex items-center gap-1 text-[11px] text-gray-400 bg-gray-50 px-2.5 py-1"
                      style={{ borderRadius: 0 }}>
                      <Layers size={10} className="text-gray-300" />
                      {col.heading || 'Unnamed'} · {col.links?.length || 0}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── EDIT MODAL ── */}
      {editingMenu && (
        <Modal
          isOpen={editingIndex !== null}
          onClose={() => setEditingIndex(null)}
          title={`Editing — ${editingMenu.title || 'Untitled Menu'}`}
          subtitle="Configure columns, links, and panel settings"
          size="xl"
          footer={
            <>
              <div className="text-[11px] text-gray-400">
                {editingMenu.columns?.length || 0} columns ·&nbsp;
                {editingMenu.columns?.reduce((a,c) => a + (c.links?.length||0), 0) || 0} links
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setEditingIndex(null)} style={{ borderRadius: 0 }}
                  className="px-5 py-2.5 text-[13px] font-semibold text-gray-600
                    bg-gray-100 hover:bg-gray-200 transition-all">
                  Close
                </button>
                <button onClick={saveAll} disabled={saving} style={{ borderRadius: 0 }}
                  className="flex items-center gap-2 px-6 py-2.5 text-[13px] font-bold
                    text-white bg-[#1c54a3] hover:bg-[#174a94] transition-all shadow-sm disabled:opacity-60">
                  {saving
                    ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <Save size={14} />}
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </>
          }
        >
          <MenuEditContent
            m={editingMenu}
            onUpdateField={(field, val) => updateMenuField(editingIndex, field, val)}
            onAddColumn={() => addColumn(editingIndex)}
            onRemoveColumn={(cIdx) => removeColumn(editingIndex, cIdx)}
            onAddLink={(cIdx) => addLink(editingIndex, cIdx)}
            onRemoveLink={(cIdx, lIdx) => removeLink(editingIndex, cIdx, lIdx)}
            onUpdateLink={(cIdx, lIdx, f, val) => updateLink(editingIndex, cIdx, lIdx, f, val)}
            onUpdateColumnHeading={(cIdx, val) => updateColumnHeading(editingIndex, cIdx, val)}
          />
        </Modal>
      )}

      {/* ── CONFIRM DELETE MODAL ── */}
      <ConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={doDelete}
        itemName={deleteTarget?.name || ''}
      />

      {/* ── TOAST ── */}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}