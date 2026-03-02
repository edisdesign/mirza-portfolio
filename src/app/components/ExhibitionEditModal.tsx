import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload } from 'lucide-react';
import { supabase, Exhibition } from '../lib/supabase';

type Props = {
  exhibition: Exhibition | null;
  onClose: () => void;
  onSaved?: () => void;
};

export function ExhibitionEditModal({ exhibition, onClose, onSaved }: Props) {
  const isNew = exhibition === null;
  const [form, setForm] = useState({
    title: exhibition?.title ?? '',
    venue: exhibition?.venue ?? '',
    location: exhibition?.location ?? '',
    date: exhibition?.date ?? String(new Date().getFullYear()),
    type: exhibition?.type ?? 'Grupna izložba',
    image: exhibition?.image ?? '',
    description: exhibition?.description ?? '',
    details: exhibition?.details ?? '',
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `exhibitions/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from('images').upload(path, file, { upsert: true });
    if (upErr) { setError('Upload slike nije uspio.'); setUploading(false); return; }
    const { data } = supabase.storage.from('images').getPublicUrl(path);
    set('image', data.publicUrl);
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setError('Naslov je obavezan.'); return; }
    setSaving(true);
    setError('');
    let err;
    if (isNew) {
      const res = await supabase.from('exhibitions').insert(form);
      err = res.error;
    } else {
      const res = await supabase.from('exhibitions').update(form).eq('id', exhibition!.id);
      err = res.error;
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved?.();
    onClose();
    window.dispatchEvent(new CustomEvent('mirza:refresh'));
  };

  const handleDelete = async () => {
    if (!exhibition) return;
    if (!confirm(`Izbrisati "${exhibition.title}"?`)) return;
    await supabase.from('exhibitions').delete().eq('id', exhibition.id);
    onSaved?.();
    onClose();
    window.dispatchEvent(new CustomEvent('mirza:refresh'));
  };

  const types = ['Samostalna izložba', 'Grupna izložba', 'Kolonija', 'Simpozijum', 'Akademska izložba'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[180] flex items-center justify-end"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <motion.div
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-[#111] border-l border-white/10 w-full max-w-[580px] h-full overflow-y-auto z-10"
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-[#111] border-b border-white/10 px-8 py-5 flex items-center justify-between z-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] font-['Outfit'] mb-1">
                {isNew ? 'Nova izložba' : 'Uredi izložbu'}
              </p>
              <h2 className="text-[18px] font-['Outfit'] font-bold text-[#f5f0eb]">{form.title || 'Bez naslova'}</h2>
            </div>
            <button onClick={onClose} className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#c9a96e]/40 transition-colors cursor-pointer">
              <X size={16} className="text-[#f5f0eb]" />
            </button>
          </div>

          <div className="px-8 py-6 space-y-5">
            {/* Image */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#8a8580] mb-3 font-['Outfit']">Slika izložbe</label>
              {form.image && (
                <div className="mb-3 relative">
                  <img src={form.image} alt="" className="w-full max-h-40 object-cover border border-white/10" />
                  <button onClick={() => set('image', '')} className="absolute top-2 right-2 w-7 h-7 bg-black/60 flex items-center justify-center border border-white/20 cursor-pointer hover:border-[#f87171] hover:text-[#f87171] text-white">
                    <X size={12} />
                  </button>
                </div>
              )}
              <div className="flex gap-3">
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0]); }} />
                <button onClick={() => fileRef.current?.click()} disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2.5 border border-white/10 text-[11px] tracking-[0.1em] uppercase font-['Outfit'] text-[#8a8580] hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-colors cursor-pointer disabled:opacity-50">
                  <Upload size={12} />
                  {uploading ? 'Upload...' : 'Upload sliku'}
                </button>
              </div>
              <input value={form.image} onChange={e => set('image', e.target.value)}
                placeholder="ili unesi URL slike..."
                className="mt-2 w-full bg-[#0a0a0a] border border-white/10 text-[#f5f0eb] px-3 py-2.5 text-[13px] font-['Outfit'] outline-none focus:border-[#c9a96e]/40 transition-colors" />
            </div>

            {/* Fields */}
            <EField label="Naslov izložbe *">
              <input value={form.title} onChange={e => set('title', e.target.value)} className="field-input" placeholder="npr. Tragovi" />
            </EField>

            <div className="grid grid-cols-2 gap-4">
              <EField label="Galerija / Venue">
                <input value={form.venue} onChange={e => set('venue', e.target.value)} className="field-input" placeholder="npr. Zavičajni muzej" />
              </EField>
              <EField label="Lokacija">
                <input value={form.location} onChange={e => set('location', e.target.value)} className="field-input" placeholder="npr. Visoko, BiH" />
              </EField>
              <EField label="Godina / Datum">
                <input value={form.date} onChange={e => set('date', e.target.value)} className="field-input" placeholder="2024" />
              </EField>
              <EField label="Tip">
                <select value={form.type} onChange={e => set('type', e.target.value)} className="field-input bg-[#0a0a0a]">
                  {types.map(t => <option key={t}>{t}</option>)}
                </select>
              </EField>
            </div>

            <EField label="Kratki opis (lista na sajtu)">
              <textarea value={form.description} onChange={e => set('description', e.target.value)}
                rows={3} className="field-input resize-y" placeholder="Kratki opis koji se prikazuje u listi..." />
              <p className="text-[11px] text-[#8a8580] mt-1 font-['Outfit']">Prikazuje se u listi izložbi na homepage-u i stranici.</p>
            </EField>

            <EField label="Detalji (popup panel)">
              <textarea value={form.details} onChange={e => set('details', e.target.value)}
                rows={5} className="field-input resize-y" placeholder="Detaljniji opis koji se prikazuje kad posjetilac klikne..." />
              <p className="text-[11px] text-[#8a8580] mt-1 font-['Outfit']">Prikazuje se u popup-u kad posjetilac klikne na izložbu.</p>
            </EField>

            {error && <p className="text-[#f87171] text-[13px] font-['Outfit']">{error}</p>}
          </div>

          <div className="sticky bottom-0 bg-[#111] border-t border-white/10 px-8 py-4 flex items-center gap-3">
            {!isNew && (
              <button onClick={handleDelete}
                className="text-[11px] tracking-[0.1em] uppercase font-['Outfit'] text-[#f87171] border border-[#f87171]/30 px-4 py-2.5 hover:bg-[#f87171]/10 transition-colors cursor-pointer mr-auto">
                🗑 Izbriši
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

function EField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] uppercase text-[#8a8580] mb-2 font-['Outfit']">{label}</label>
      {children}
    </div>
  );
}
