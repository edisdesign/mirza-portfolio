import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, ArrowRight, Pencil } from 'lucide-react';
import { supabase, Work } from '../lib/supabase';
import { useAdmin } from '../context/AdminContext';
import { WorkEditModal } from './WorkEditModal';

export const FEATURED_IDS: number[] = []; // dynamic from DB

export function Works({ limit }: { limit?: number }) {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [editWork, setEditWork] = useState<Work | null | 'new'>(null);
  const { editMode } = useAdmin();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchWorks = async () => {
    setLoading(true);
    let query = supabase.from('works').select('*').order('sort_order', { ascending: true });
    if (limit) query = query.eq('featured', true).limit(limit);
    const { data } = await query;
    setWorks(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchWorks();
    const handler = () => fetchWorks();
    window.addEventListener('mirza:refresh', handler);
    return () => window.removeEventListener('mirza:refresh', handler);
  }, [limit]);

  const displayWorks = limit ? works.filter(w => w.featured) : works;

  const handleDelete = async (id: number) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete ovaj rad?')) return;
    setDeletingId(id);
    const { error } = await supabase.from('works').delete().eq('id', id);
    setDeletingId(null);
    if (!error) {
      window.dispatchEvent(new Event('mirza:refresh'));
    } else {
      alert('Greška pri brisanju: ' + error.message);
    }
  };

  return (
    <>
      <section id="works" className="py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6 md:flex-row items-start md:items-end justify-between mb-20"
          >
            <div>
              <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-4">Portfolio</p>
              <h2 className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[56px] leading-tight" style={{ fontWeight: 800 }}>
                Odabrani<br /><span className="text-[#c9a96e]">radovi</span>
              </h2>
            </div>
            {limit ? (
              <Link
                to="/radovi"
                className="group inline-flex items-center gap-3 border border-[#c9a96e]/30 px-7 py-3.5 hover:bg-[#c9a96e] hover:text-[#0a0a0a] text-[#c9a96e] transition-all duration-500"
              >
                <span className="font-['Outfit'] text-[12px] tracking-[0.2em] uppercase">Svi radovi</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            ) : (
              <p className="hidden md:block text-[#8a8580] font-['Outfit'] text-[14px] max-w-xs text-right leading-relaxed" style={{ fontWeight: 300 }}>
                Svaka slika je putovanje kroz unutrašnji pejzaž — intimno, sirovo, autentično.
              </p>
            )}
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[...Array(limit ?? 6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-[#111] aspect-[4/3]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {displayWorks.map((work, i) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: i % 2 === 0 ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative ${limit && (i === 0 || i === 5) ? 'md:col-span-2' : ''}`}
                  onMouseEnter={() => setHoveredId(work.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Edit pen button */}
                  {editMode && (
                    <div className="absolute top-3 right-3 z-20 flex gap-2">
                      <button
                        onClick={e => { e.stopPropagation(); setEditWork(work); }}
                        className="w-9 h-9 bg-[#c9a96e] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#d4b47a] cursor-pointer"
                        title="Uredi rad"
                      >
                        <Pencil size={14} className="text-[#0a0a0a]" />
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); handleDelete(work.id); }}
                        className="w-9 h-9 bg-[#f87171] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#fb9a9a] cursor-pointer"
                        title="Obriši rad"
                        disabled={deletingId === work.id}
                      >
                        {deletingId === work.id ? (
                          <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"/></svg>
                        )}
                      </button>
                    </div>
                  )}

                  <div className={`overflow-hidden ${work.landscape ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    {work.image ? (
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-[#333] font-['Outfit'] text-[14px]">
                        {editMode ? (
                          <button onClick={() => setEditWork(work)} className="flex flex-col items-center gap-2 text-[#c9a96e] cursor-pointer">
                            <Pencil size={24} />
                            <span className="text-[12px] tracking-[0.1em]">Dodaj sliku</span>
                          </button>
                        ) : (
                          <span>🖼</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className={`mt-4 flex items-start justify-between gap-4 transition-opacity duration-300 ${hoveredId !== null && hoveredId !== work.id ? 'opacity-40' : 'opacity-100'}`}>
                    <div>
                      <h3 className="font-['Outfit'] text-[#f5f0eb] text-[20px] font-semibold mb-1">{work.title}</h3>
                      <p className="text-[#8a8580] font-['Outfit'] text-[13px]" style={{ fontWeight: 300 }}>
                        {work.category} · {work.year} {work.size && `· ${work.size}`}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#c9a96e]/40 group-hover:bg-[#c9a96e]/10 transition-all duration-300 mt-1">
                      <ArrowUpRight size={16} className="text-[#8a8580] group-hover:text-[#c9a96e] transition-colors duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {editWork && (
        <WorkEditModal
          work={editWork === 'new' ? null : editWork}
          open={true}
          onClose={() => setEditWork(null)}
          onSave={fetchWorks}
        />
      )}
    </>
  );
}
