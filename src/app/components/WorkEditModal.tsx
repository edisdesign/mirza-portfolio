import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload } from 'lucide-react';
import { supabase, Work } from '../lib/supabase';

type Props = {
  work: Work | null;
  onClose: () => void;
  onSaved?: () => void;
};

export function WorkEditModal({ work, onClose, onSaved }: Props) {
  const isNew = work === null;
  const [form, setForm] = useState({
    title: work?.title ?? '',
    category: work?.category ?? 'Ulje na platnu',
    technique: work?.technique ?? '',
    year: work?.year ?? String(new Date().getFullYear()),
    size: work?.size ?? '',
    image: work?.image ?? '',
    description: work?.description ?? '',
    featured: work?.featured ?? false,
    landscape: work?.landscape ?? false,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `works/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from('images').upload(path, file, { upsert: true });
    if (upErr) { setError('Upload slike nije uspio: ' + upErr.message); setUploading(false); return; }
    const { data } = supabase.storage.from('images').getPublicUrl(path);
    set('image', data.publicUrl);
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setError('Naslov je obavezan.'); return; }
    setSaving(true);
    setError('');
    const payload = { ...form };
    let err;
    if (isNew) {
      const res = await supabase.from('works').insert(payload);
      err = res.error;
    } else {
      const res = await supabase.from('works').update(payload).eq('id', work!.id);
      err = res.error;
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved?.();
    onClose();
    window.dispatchEvent(new CustomEvent('mirza:refresh'));
  };

  const handleDelete = async () => {
    if (!work) return;
    if (!confirm(`Izbrisati "${work.title}"?`)) return;
    setDeleting(true);
    await supabase.from('works').delete().eq('id', work.id);
    onSaved?.();
    onClose();
    window.dispatchEvent(new CustomEvent('mirza:refresh'));
  };

  const categories = ['Ulje na platnu', 'Akvarel', 'Hemijska olovka na papiru', 'Tuš na papiru', 'Ugljen na papiru', 'Tuš i akvarel na papiru', 'Pastel', 'Mješovita tehnika', 'Crtež'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[180] flex items-center justify-end"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-[#111] border-l border-white/10 w-full max-w-[580px] h-full overflow-y-auto z-10"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#111] border-b border-white/10 px-8 py-5 flex items-center justify-between z-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] font-['Outfit'] mb-1">
                {isNew ? 'Novi rad' : 'Uredi rad'}
              </p>
              <h2 className="text-[18px] font-['Outfit'] font-bold text-[#f5f0eb]">
                {form.title || 'Bez naslova'}
              </h2>
            </div>
            <button onClick={onClose} className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#c9a96e]/40 transition-colors cursor-pointer">
              <X size={16} className="text-[#f5f0eb]" />
            </button>
          </div>

          <div className="px-8 py-6 space-y-6">
            {/* Image */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#8a8580] mb-3 font-['Outfit']">Slika rada</label>
              {form.image && (
                <div className="mb-3 relative">
                  <img src={form.image} alt="" className="w-full max-h-48 object-cover border border-white/10" />
                  <button onClick={() => set('image', '')} className="absolute top-2 right-2 w-7 h-7 bg-black/60 flex items-center justify-center border border-white/20 hover:border-[#f87171] hover:text-[#f87171] text-white cursor-pointer">
                    <X size={12} />
                  </button>
                </div>
              )}
              <div className="flex gap-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0]); }}
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2.5 border border-white/10 text-[11px] tracking-[0.1em] uppercase font-['Outfit'] text-[#8a8580] hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Upload size={12} />
                  {uploading ? 'Upload...' : 'Upload sliku'}
                </button>
              </div>
              <input
                value={form.image}
                onChange={e => set('image', e.target.value)}
                placeholder="ili unesi URL slike..."
                className="mt-2 w-full bg-[#0a0a0a] border border-white/10 text-[#f5f0eb] px-3 py-2.5 text-[13px] font-['Outfit'] outline-none focus:border-[#c9a96e]/40 transition-colors"
              />
            </div>

            {/* Title */}
            <Field label="Naslov *">
              <input value={form.title} onChange={e => set('title', e.target.value)}
                className="field-input" placeholder="npr. Sjećanje na Dom" />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Kategorija">
                <select value={form.category} onChange={e => set('category', e.target.value)} className="field-input bg-[#0a0a0a]">
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Godina">
                <input value={form.year} onChange={e => set('year', e.target.value)} className="field-input" placeholder="2024" />
              </Field>
            </div>

            <Field label="Tehnika">
              <input value={form.technique} onChange={e => set('technique', e.target.value)}
                className="field-input" placeholder="npr. Ulje na platnu, alla prima" />
            </Field>

            <Field label="Dimenzije">
              <input value={form.size} onChange={e => set('size', e.target.value)}
                className="field-input" placeholder="npr. 100 × 80 cm" />
            </Field>

            <Field label="Opis">
              <textarea value={form.description} onChange={e => set('description', e.target.value)}
                rows={4} className="field-input resize-y" placeholder="Opis rada..." />
            </Field>

            {/* Toggles */}
            <div className="flex gap-6">
              <Toggle label="⭐ Featured (homepage)" checked={form.featured} onChange={v => set('featured', v)} />
              <Toggle label="↔ Landscape format" checked={form.landscape} onChange={v => set('landscape', v)} />
            </div>

            {error && <p className="text-[#f87171] text-[13px] font-['Outfit']">{error}</p>}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-[#111] border-t border-white/10 px-8 py-4 flex items-center gap-3">
            {!isNew && (
              <button onClick={handleDelete} disabled={deleting}
                className="text-[11px] tracking-[0.1em] uppercase font-['Outfit'] text-[#f87171] border border-[#f87171]/30 px-4 py-2.5 hover:bg-[#f87171]/10 transition-colors cursor-pointer disabled:opacity-50 mr-auto">
                {deleting ? 'Brisanje...' : '🗑 Izbriši'}
              </button>
            )}
            <button onClick={onClose} className="px-5 py-2.5 text-[11px] tracking-[0.1em] uppercase font-['Outfit'] text-[#8a8580] border border-white/10 hover:border-white/20 transition-colors cursor-pointer">
              Odustani
            </button>
            <button onClick={handleSave} disabled={saving}
              className="px-6 py-2.5 bg-[#c9a96e] text-[#0a0a0a] text-[11px] tracking-[0.15em] uppercase font-bold font-['Outfit'] hover:opacity-85 transition-opacity cursor-pointer disabled:opacity-50">
              {saving ? 'Čuvanje...' : '💾 Sačuvaj'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] uppercase text-[#8a8580] mb-2 font-['Outfit']">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`w-10 h-6 rounded-full border transition-all relative flex-shrink-0 ${checked ? 'bg-[#c9a96e] border-[#c9a96e]' : 'bg-[#1a1a1a] border-white/20'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${checked ? 'left-5 bg-white' : 'left-1 bg-[#8a8580]'}`} />
      </div>
      <span className="text-[13px] font-['Outfit'] text-[#8a8580]">{label}</span>
    </label>
  );
}

// Add global styles for field inputs
const style = document.createElement('style');
style.textContent = `.field-input { width: 100%; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); color: #f5f0eb; padding: 10px 12px; font-size: 13px; font-family: 'Outfit', sans-serif; outline: none; transition: border-color 0.2s; } .field-input:focus { border-color: rgba(201,169,110,0.4); }`;
if (typeof document !== 'undefined' && !document.getElementById('field-styles')) {
  style.id = 'field-styles';
  document.head.appendChild(style);
}
