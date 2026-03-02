import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { ArrowUpRight, ArrowRight, Pencil } from 'lucide-react';
import { supabase, Exhibition } from '../lib/supabase';
import { useAdmin } from '../context/AdminContext';
import { ExhibitionEditModal } from './ExhibitionEditModal';
import { ExhibitionModal } from './ExhibitionModal';

const HOMEPAGE_LIMIT = 6;

export function Exhibitions() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Exhibition | null>(null);
  const [editExh, setEditExh] = useState<Exhibition | null>(null);
  const { editMode } = useAdmin();

  const fetchExhibitions = async () => {
    setLoading(true);
    const { data } = await supabase.from('exhibitions').select('*').order('sort_order', { ascending: true });
    setExhibitions(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchExhibitions();
    const handler = () => fetchExhibitions();
    window.addEventListener('mirza:refresh', handler);
    return () => window.removeEventListener('mirza:refresh', handler);
  }, []);

  const displayExhibitions = exhibitions.slice(0, HOMEPAGE_LIMIT);

  return (
    <>
      <section id="exhibitions" className="py-32 px-6 md:px-12 bg-[#0d0d0d]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-4">Galerije & Kolonije</p>
              <h2 className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[56px] leading-tight" style={{ fontWeight: 800 }}>
                Izložbe & <span className="text-[#c9a96e]">nastupi</span>
              </h2>
            </div>
            <Link
              to="/izlozbe"
              className="group inline-flex items-center gap-3 text-[#8a8580] hover:text-[#c9a96e] transition-colors duration-300 font-['Outfit'] text-[13px] tracking-[0.15em] uppercase flex-shrink-0"
            >
              Vidi sve izložbe
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          <div className="border-t border-white/10">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="border-b border-white/10 py-8 animate-pulse">
                  <div className="h-6 bg-[#1a1a1a] w-64 mb-3" />
                  <div className="h-4 bg-[#1a1a1a] w-40" />
                </div>
              ))
            ) : (
              displayExhibitions.map((ex, i) => (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="group relative"
                >
                  {editMode && (
                    <button
                      onClick={e => { e.stopPropagation(); setEditExh(ex); }}
                      className="absolute right-16 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[#c9a96e] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#d4b47a] cursor-pointer"
                      title="Uredi izložbu"
                    >
                      <Pencil size={12} className="text-[#0a0a0a]" />
                    </button>
                  )}

                  <button
                    onClick={() => !editMode && setSelected(ex)}
                    className="group block w-full text-left border-b border-white/10 py-8 md:py-10 cursor-pointer hover:bg-white/[0.02] transition-colors duration-300 px-2 md:px-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-['Outfit'] text-[#f5f0eb] text-[20px] md:text-[26px] group-hover:text-[#c9a96e] transition-colors duration-300" style={{ fontWeight: 600 }}>
                            {ex.title}
                          </h3>
                        </div>
                        <p className="text-[#8a8580] font-['Outfit'] text-[14px]" style={{ fontWeight: 300 }}>
                          {ex.venue} · {ex.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-[#8a8580]/60 font-['Outfit'] text-[12px] tracking-[0.15em] uppercase">{ex.type}</p>
                          <p className="text-[#f5f0eb] font-['Outfit'] text-[14px] mt-1">{ex.date}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#c9a96e]/40 group-hover:bg-[#c9a96e]/10 transition-all duration-300">
                          <ArrowUpRight size={16} className="text-[#8a8580] group-hover:text-[#c9a96e] transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))
            )}
          </div>

          {exhibitions.length > HOMEPAGE_LIMIT && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12 text-center"
            >
              <Link
                to="/izlozbe"
                className="group inline-flex items-center gap-3 px-10 py-4 border border-[#c9a96e]/30 text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.2em] uppercase hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-400"
              >
                Sve izložbe ({exhibitions.length})
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {selected && (
        <ExhibitionModal
          exhibition={selected}
          onClose={() => setSelected(null)}
          allExhibitions={exhibitions}
          onNavigate={(id) => {
            const ex = exhibitions.find(e => e.id === id);
            if (ex) setSelected(ex);
          }}
        />
      )}

      {editExh && (
        <ExhibitionEditModal exhibition={editExh} onClose={() => setEditExh(null)} onSaved={fetchExhibitions} />
      )}
    </>
  );
}
