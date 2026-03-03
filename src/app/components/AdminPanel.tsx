import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    X, Pencil, Trash2, Plus, GripVertical, Eye, EyeOff,
    Image as ImageIcon, Save, ChevronDown, ChevronUp,
} from 'lucide-react';
import { supabase, type Work, type Exhibition } from '../lib/supabase';
import { toast } from 'sonner';
import { WorkEditModal } from './WorkEditModal';
import { ExhibitionEditModal } from './ExhibitionEditModal';

type Tab = 'radovi' | 'izlozbe' | 'cover' | 'biografija';

interface AdminPanelProps {
    open: boolean;
    onClose: () => void;
}

// ─── UTIL: extract storage path from public URL ───────────────────────────────
function getStoragePath(url: string): string | null {
    try {
        const marker = '/images/';
        const idx = url.indexOf(marker);
        if (idx === -1) return null;
        return url.slice(idx + marker.length);
    } catch {
        return null;
    }
}

// ─── DELETE helpers ───────────────────────────────────────────────────────────
async function deleteWorkFromDB(work: Work) {
    if (work.image) {
        const path = getStoragePath(work.image);
        if (path) await supabase.storage.from('images').remove([path]);
    }
    const { error } = await supabase.from('works').delete().eq('id', work.id);
    if (error) throw error;
}

async function deleteExhibitionFromDB(exh: Exhibition) {
    if (exh.image) {
        const path = getStoragePath(exh.image);
        if (path) await supabase.storage.from('images').remove([path]);
    }
    const { error } = await supabase.from('exhibitions').delete().eq('id', exh.id);
    if (error) throw error;
}

// ─── RADOVI TAB ───────────────────────────────────────────────────────────────
function RadoviTab() {
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [editWork, setEditWork] = useState<Work | null | 'new'>('none' as any);
    const [confirmDelete, setConfirmDelete] = useState<Work | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase.from('works').select('*').order('sort_order', { ascending: true });
        setWorks(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetch(); }, [fetch]);
    useEffect(() => {
        const h = () => fetch();
        window.addEventListener('mirza:refresh', h);
        return () => window.removeEventListener('mirza:refresh', h);
    }, [fetch]);

    const toggleVisibility = async (work: Work) => {
        // We repurpose `landscape` field as hidden flag... actually let's use a simpler approach:
        // just show/hide from works page via a `hidden` field, but that requires migration.
        // For now, skip visibility toggle — just edit/delete.
        toast.info('Vidljivost se mijenja kroz dugme "Edit"');
    };

    const handleDelete = async (work: Work) => {
        try {
            await deleteWorkFromDB(work);
            setConfirmDelete(null);
            toast.success('Rad obrisan!');
            window.dispatchEvent(new Event('mirza:refresh'));
            fetch();
        } catch (e: any) {
            toast.error('Greška: ' + e.message);
        }
    };

    if (loading) return (
        <div className="space-y-3 p-6">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-white/5 animate-pulse rounded" />
            ))}
        </div>
    );

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <p className="text-white/40 font-['Inter'] text-[11px] tracking-[0.2em] uppercase">
                    {works.length} radova
                </p>
                <button
                    onClick={() => setEditWork(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#c9a96e] text-[#0a0a0a] font-['Inter'] text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-[#b8955e] transition-colors cursor-pointer"
                >
                    <Plus size={13} />
                    Dodaj rad
                </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                {works.map((work) => (
                    <div
                        key={work.id}
                        className="flex items-center gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/3 transition-colors group"
                    >
                        {/* Thumbnail */}
                        <div className="w-12 h-12 flex-shrink-0 overflow-hidden bg-white/5">
                            {work.image ? (
                                <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon size={16} className="text-white/20" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="font-['Outfit'] text-[#f5f0eb] text-[14px] truncate">{work.title}</p>
                            <p className="font-['Inter'] text-white/30 text-[11px]">
                                {work.year} · {work.size}
                            </p>
                        </div>

                        {/* Featured badge */}
                        {work.featured && (
                            <span className="text-[#c9a96e] font-['Inter'] text-[9px] tracking-[0.15em] uppercase border border-[#c9a96e]/30 px-2 py-0.5 flex-shrink-0">
                                Cover
                            </span>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => setEditWork(work)}
                                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-[#c9a96e] transition-colors cursor-pointer"
                                title="Uredi"
                            >
                                <Pencil size={13} />
                            </button>
                            <button
                                onClick={() => setConfirmDelete(work)}
                                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                                title="Obriši"
                            >
                                <Trash2 size={13} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit modal */}
            {editWork !== ('none' as any) && (
                <WorkEditModal
                    work={editWork as Work | null}
                    onClose={() => { setEditWork('none' as any); fetch(); }}
                />
            )}

            {/* Delete confirm */}
            <AnimatePresence>
                {confirmDelete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 flex items-center justify-center z-10"
                    >
                        <div className="bg-[#1a1a1a] border border-white/10 p-6 max-w-sm w-full mx-4">
                            <p className="font-['Outfit'] text-[#f5f0eb] text-[16px] mb-2">Obriši rad?</p>
                            <p className="text-white/40 font-['Inter'] text-[13px] mb-6">
                                „{confirmDelete.title}" će biti trajno obrisan zajedno sa slikom.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setConfirmDelete(null)}
                                    className="flex-1 py-2 border border-white/10 text-white/60 font-['Inter'] text-[12px] hover:bg-white/5 transition-colors cursor-pointer"
                                >
                                    Otkaži
                                </button>
                                <button
                                    onClick={() => handleDelete(confirmDelete)}
                                    className="flex-1 py-2 bg-red-500/80 text-white font-['Inter'] text-[12px] hover:bg-red-500 transition-colors cursor-pointer"
                                >
                                    Obriši
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── IZLOŽBE TAB ──────────────────────────────────────────────────────────────
function IzlozbeTab() {
    const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
    const [loading, setLoading] = useState(true);
    const [editExh, setEditExh] = useState<Exhibition | null | 'none'>('none');
    const [confirmDelete, setConfirmDelete] = useState<Exhibition | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase.from('exhibitions').select('*').order('sort_order', { ascending: true });
        setExhibitions(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetch(); }, [fetch]);
    useEffect(() => {
        const h = () => fetch();
        window.addEventListener('mirza:refresh', h);
        return () => window.removeEventListener('mirza:refresh', h);
    }, [fetch]);

    const handleDelete = async (exh: Exhibition) => {
        try {
            await deleteExhibitionFromDB(exh);
            setConfirmDelete(null);
            toast.success('Izložba obrisana!');
            window.dispatchEvent(new Event('mirza:refresh'));
            fetch();
        } catch (e: any) {
            toast.error('Greška: ' + e.message);
        }
    };

    if (loading) return (
        <div className="space-y-3 p-6">
            {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-white/5 animate-pulse rounded" />)}
        </div>
    );

    return (
        <div className="flex flex-col h-full relative">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <p className="text-white/40 font-['Inter'] text-[11px] tracking-[0.2em] uppercase">
                    {exhibitions.length} izložbi
                </p>
                <button
                    onClick={() => setEditExh(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#c9a96e] text-[#0a0a0a] font-['Inter'] text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-[#b8955e] transition-colors cursor-pointer"
                >
                    <Plus size={13} />
                    Dodaj izložbu
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {exhibitions.map((exh) => (
                    <div key={exh.id} className="flex items-center gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/3 transition-colors group">
                        <div className="w-12 h-12 flex-shrink-0 overflow-hidden bg-white/5">
                            {exh.image ? (
                                <img src={exh.image} alt={exh.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon size={16} className="text-white/20" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-['Outfit'] text-[#f5f0eb] text-[14px] truncate">{exh.title}</p>
                            <p className="font-['Inter'] text-white/30 text-[11px]">{exh.type} · {exh.date}</p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => setEditExh(exh)}
                                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-[#c9a96e] transition-colors cursor-pointer"
                            >
                                <Pencil size={13} />
                            </button>
                            <button
                                onClick={() => setConfirmDelete(exh)}
                                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                            >
                                <Trash2 size={13} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editExh !== 'none' && (
                <ExhibitionEditModal
                    exhibition={editExh as Exhibition | null}
                    onClose={() => { setEditExh('none'); fetch(); }}
                />
            )}

            <AnimatePresence>
                {confirmDelete && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 flex items-center justify-center z-10"
                    >
                        <div className="bg-[#1a1a1a] border border-white/10 p-6 max-w-sm w-full mx-4">
                            <p className="font-['Outfit'] text-[#f5f0eb] text-[16px] mb-2">Obriši izložbu?</p>
                            <p className="text-white/40 font-['Inter'] text-[13px] mb-6">
                                „{confirmDelete.title}" će biti trajno obrisana.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2 border border-white/10 text-white/60 font-['Inter'] text-[12px] hover:bg-white/5 transition-colors cursor-pointer">Otkaži</button>
                                <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2 bg-red-500/80 text-white font-['Inter'] text-[12px] hover:bg-red-500 transition-colors cursor-pointer">Obriši</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── COVER TAB ────────────────────────────────────────────────────────────────
function CoverTab() {
    const [allWorks, setAllWorks] = useState<Work[]>([]);
    const [coverWorks, setCoverWorks] = useState<Work[]>([]);
    const [showPicker, setShowPicker] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dragIdx, setDragIdx] = useState<number | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase.from('works').select('*').order('sort_order', { ascending: true });
        const all = data ?? [];
        setAllWorks(all);
        setCoverWorks(all.filter(w => w.featured));
        setLoading(false);
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    const addToCover = (work: Work) => {
        if (coverWorks.find(w => w.id === work.id)) return;
        setCoverWorks(prev => [...prev, work]);
        setShowPicker(false);
    };

    const removeFromCover = (id: number) => {
        setCoverWorks(prev => prev.filter(w => w.id !== id));
    };

    const moveCover = (from: number, to: number) => {
        const arr = [...coverWorks];
        const [item] = arr.splice(from, 1);
        arr.splice(to, 0, item);
        setCoverWorks(arr);
    };

    const saveCover = async () => {
        setSaving(true);
        try {
            // Set featured=true for cover works, false for others
            const coverIds = coverWorks.map(w => w.id);

            // Update all works: set featured based on whether in coverWorks
            const updates = allWorks.map((w, i) => ({
                id: w.id,
                featured: coverIds.includes(w.id),
                sort_order: w.sort_order,
            }));

            for (const u of updates) {
                await supabase.from('works').update({ featured: u.featured }).eq('id', u.id);
            }

            toast.success('Cover sačuvan!');
            window.dispatchEvent(new Event('mirza:refresh'));
            fetch();
        } catch (e: any) {
            toast.error('Greška: ' + e.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6 space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-white/5 animate-pulse rounded" />)}</div>;

    const nonCoverWorks = allWorks.filter(w => !coverWorks.find(c => c.id === w.id));

    return (
        <div className="flex flex-col h-full">
            <div className="px-6 py-4 border-b border-white/10">
                <p className="text-white/40 font-['Inter'] text-[11px] tracking-[0.2em] uppercase mb-1">Cover / Hero Slideshow</p>
                <p className="text-white/25 font-['Inter'] text-[11px]">Odabrani radovi se prikazuju kao pozadina na naslovnici.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {coverWorks.map((work, idx) => (
                    <div
                        key={work.id}
                        draggable
                        onDragStart={() => setDragIdx(idx)}
                        onDragOver={(e) => { e.preventDefault(); }}
                        onDrop={() => { if (dragIdx !== null && dragIdx !== idx) moveCover(dragIdx, idx); setDragIdx(null); }}
                        className={`flex items-center gap-3 p-3 border transition-colors cursor-grab active:cursor-grabbing ${dragIdx === idx ? 'border-[#c9a96e]/50 bg-[#c9a96e]/5' : 'border-white/8 hover:border-white/15 bg-white/3'}`}
                    >
                        <GripVertical size={14} className="text-white/20 flex-shrink-0" />
                        <div className="w-10 h-10 flex-shrink-0 overflow-hidden bg-white/5">
                            {work.image && <img src={work.image} alt={work.title} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-['Outfit'] text-[#f5f0eb] text-[13px] truncate">{work.title}</p>
                            <p className="font-['Inter'] text-white/30 text-[10px]">{work.year}</p>
                        </div>
                        <span className="text-white/30 font-['Inter'] text-[11px] font-mono w-5 text-right">{(idx + 1).toString().padStart(2, '0')}</span>
                        <button
                            onClick={() => removeFromCover(work.id)}
                            className="w-6 h-6 flex items-center justify-center text-white/20 hover:text-red-400 transition-colors cursor-pointer"
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}

                {/* Add button */}
                <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="w-full py-3 border border-dashed border-white/15 text-white/30 font-['Inter'] text-[11px] tracking-[0.15em] uppercase hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                    <Plus size={12} />
                    Dodaj rad na cover
                </button>

                {/* Picker */}
                <AnimatePresence>
                    {showPicker && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden border border-white/10 bg-[#111]"
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                                <p className="font-['Inter'] text-white/40 text-[11px] tracking-[0.15em] uppercase">Odaberi rad</p>
                                <button onClick={() => setShowPicker(false)} className="text-white/20 hover:text-white/60 cursor-pointer"><X size={14} /></button>
                            </div>
                            <div className="max-h-48 overflow-y-auto">
                                {nonCoverWorks.length === 0 ? (
                                    <p className="px-4 py-6 text-white/25 font-['Inter'] text-[12px] text-center">Svi radovi su na coveru</p>
                                ) : nonCoverWorks.map(work => (
                                    <button
                                        key={work.id}
                                        onClick={() => addToCover(work)}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer text-left border-b border-white/5"
                                    >
                                        <div className="w-10 h-10 flex-shrink-0 overflow-hidden bg-white/5">
                                            {work.image && <img src={work.image} alt={work.title} className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <p className="font-['Outfit'] text-[#f5f0eb] text-[13px]">{work.title}</p>
                                            <p className="font-['Inter'] text-white/30 text-[10px]">{work.year}</p>
                                        </div>
                                        <Plus size={12} className="ml-auto text-[#c9a96e]" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Save button */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={saveCover}
                    disabled={saving}
                    className="w-full py-3 bg-[#c9a96e] text-[#0a0a0a] font-['Inter'] text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-[#b8955e] transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                    <Save size={13} />
                    {saving ? 'Čuvanje...' : 'Sačuvaj Cover'}
                </button>
            </div>
        </div>
    );
}

// ─── BIOGRAFIJA TAB ───────────────────────────────────────────────────────────
const DEFAULT_BIO = `Mirza Smajlović (r. 1988, Visoko, Bosna i Hercegovina) je akademski slikar čiji se umjetnički rad razvija unutar savremenog figurativnog i ekspresivnog diskursa.

Njegov opus karakteriše snažan odnos prema motivu prostora i identiteta. Smajlović gradi kompoziciju kroz slojevitu strukturu boje i materijala.

Član je Udruženja likovnih umjetnika Likum '76 iz Visokog. Izlagao je na samostalnim i grupnim izložbama u Bosni i Hercegovini i regiji.`;

function BiografijaTab() {
    const [bio, setBio] = useState('');
    const [education, setEducation] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { data } = await supabase.from('settings').select('key, value').in('key', ['biography', 'education']);
            const bioRow = data?.find(r => r.key === 'biography');
            const eduRow = data?.find(r => r.key === 'education');
            setBio(bioRow?.value ?? DEFAULT_BIO);
            setEducation(eduRow?.value ?? '');
            setLoading(false);
        })();
    }, []);

    const save = async () => {
        setSaving(true);
        try {
            await supabase.from('settings').upsert([
                { key: 'biography', value: bio },
                { key: 'education', value: education },
            ], { onConflict: 'key' });
            toast.success('Biografija sačuvana!');
            window.dispatchEvent(new Event('mirza:refresh'));
        } catch (e: any) {
            toast.error('Greška: ' + e.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6 space-y-3"><div className="h-48 bg-white/5 animate-pulse rounded" /></div>;

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-3">
                    <label className="font-['Inter'] text-white/40 text-[11px] tracking-[0.2em] uppercase block">
                        Biografija (vidljivo na naslovnici)
                    </label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={10}
                        className="w-full bg-white/5 border border-white/10 text-[#f5f0eb] font-['Outfit'] text-[14px] leading-relaxed p-4 resize-none focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                        placeholder="Tekst biografije..."
                    />
                </div>

                <div className="space-y-3">
                    <label className="font-['Inter'] text-white/40 text-[11px] tracking-[0.2em] uppercase block">
                        Edukacija / Fusnote (opcionalno)
                    </label>
                    <textarea
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 text-[#f5f0eb] font-['Outfit'] text-[14px] leading-relaxed p-4 resize-none focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                        placeholder="npr. Akademija likovnih umjetnosti, Sarajevo, 2010..."
                    />
                </div>
            </div>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={save}
                    disabled={saving}
                    className="w-full py-3 bg-[#c9a96e] text-[#0a0a0a] font-['Inter'] text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-[#b8955e] transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                    <Save size={13} />
                    {saving ? 'Čuvanje...' : 'Sačuvaj Biografiju'}
                </button>
            </div>
        </div>
    );
}

// ─── MAIN PANEL ───────────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string }[] = [
    { id: 'radovi', label: 'Radovi' },
    { id: 'izlozbe', label: 'Izložbe' },
    { id: 'cover', label: 'Cover' },
    { id: 'biografija', label: 'Biografija' },
];

export function AdminPanel({ open, onClose }: AdminPanelProps) {
    const [activeTab, setActiveTab] = useState<Tab>('radovi');

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 bg-black/40 z-[200]"
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-[480px] bg-[#0f0f0f] border-l border-white/10 z-[201] flex flex-col shadow-2xl"
                    >
                        {/* Panel header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
                            <div>
                                <p className="font-['Outfit'] text-[#f5f0eb] text-[16px] font-semibold">Admin Panel</p>
                                <p className="font-['Inter'] text-white/30 text-[11px] tracking-[0.1em]">Mirza Smajlović Portfolio</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-9 h-9 flex items-center justify-center text-white/30 hover:text-white border border-white/10 hover:border-white/25 transition-all cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-white/10 flex-shrink-0">
                            {TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-3 font-['Inter'] text-[11px] tracking-[0.15em] uppercase transition-all cursor-pointer ${activeTab === tab.id
                                            ? 'text-[#c9a96e] border-b-2 border-[#c9a96e] -mb-px'
                                            : 'text-white/30 hover:text-white/60'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab content */}
                        <div className="flex-1 overflow-hidden relative">
                            {activeTab === 'radovi' && <RadoviTab />}
                            {activeTab === 'izlozbe' && <IzlozbeTab />}
                            {activeTab === 'cover' && <CoverTab />}
                            {activeTab === 'biografija' && <BiografijaTab />}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
