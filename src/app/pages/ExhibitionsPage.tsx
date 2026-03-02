import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router";
import { ArrowLeft, ArrowUpRight, MapPin, Pencil } from "lucide-react";
import { supabase, Exhibition } from "../lib/supabase";
import { ExhibitionEditModal } from "../components/ExhibitionEditModal";
import { ExhibitionModal } from "../components/ExhibitionModal";
import { Footer } from "../components/Footer";
import { usePageTitle } from "../hooks/usePageTitle";
import { useAdmin } from "../context/AdminContext";

const types = [
  "Sve",
  "Samostalna izložba",
  "Grupna izložba",
  "Kolonija",
  "Simpozijum",
  "Akademska izložba",
];

export function ExhibitionsPage() {
  usePageTitle("Izložbe");
  const { editMode } = useAdmin();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<Exhibition | null>(null);
  const [editExh, setEditExh] = useState<Exhibition | null>(null);
  const [activeType, setActiveType] = useState("Sve");
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExhibitions = async () => {
    setLoading(true);
    const { data } = await supabase.from('exhibitions').select('*').order('sort_order', { ascending: true });
    setExhibitions(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchExhibitions();
    const listener = () => fetchExhibitions();
    window.addEventListener('mirza:refresh', listener);
    return () => window.removeEventListener('mirza:refresh', listener);
  }, []);

  // Auto-open exhibition from ?open=ID query param
  useEffect(() => {
    const openId = searchParams.get("open");
    if (openId) {
      const ex = exhibitions.find((e) => e.id === Number(openId));
      if (ex) setSelected(ex);
      setSearchParams({}, { replace: true });
    }
  }, [exhibitions]);

  const filtered =
    activeType === "Sve"
      ? exhibitions
      : exhibitions.filter((ex) => ex.type === activeType);

  // Group by year
  const grouped: Record<string, Exhibition[]> = {};
  for (const ex of filtered) {
    if (!grouped[ex.date]) grouped[ex.date] = [];
    grouped[ex.date].push(ex);
  }
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <section className="pt-32 pb-20 px-6 md:px-12 min-h-screen">
        <div className="max-w-[1400px] mx-auto">
          {/* Back + Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#8a8580] hover:text-[#c9a96e] transition-colors duration-300 mb-10 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              <span className="font-['Outfit'] text-[13px] tracking-[0.15em] uppercase">
                Početna
              </span>
            </Link>

            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-4">
                  Galerije · Kolonije · Simpozijumi
                </p>
                <h1
                  className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[56px] leading-tight"
                  style={{ fontWeight: 800 }}
                >
                  Izložbe &amp; <span className="text-[#c9a96e]">nastupi</span>
                </h1>
              </div>
              <p className="hidden md:block text-[#8a8580]/60 font-['Outfit'] text-[14px]">
                {filtered.length}{" "}
                {filtered.length === 1
                  ? "izložba"
                  : filtered.length < 5
                  ? "izložbe"
                  : "izložbi"}
              </p>
            </div>

            <p
              className="text-[#b0a99f] font-['Outfit'] text-[16px] md:text-[18px] leading-relaxed max-w-[700px] mb-14"
              style={{ fontWeight: 300 }}
            >
              Pregled samostalnih i grupnih izložbi, likovnih kolonija i
              simpozijuma od početaka akademskog obrazovanja do danas.
            </p>
          </motion.div>

          {/* Type Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap gap-3 mb-16"
          >
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-4 py-2 font-['Outfit'] text-[11px] tracking-[0.1em] uppercase border transition-all duration-300 cursor-pointer ${
                  activeType === type
                    ? "bg-[#c9a96e] text-[#0a0a0a] border-[#c9a96e]"
                    : "bg-transparent text-[#8a8580] border-white/10 hover:border-[#c9a96e]/40 hover:text-[#f5f0eb]"
                }`}
              >
                {type}
              </button>
            ))}
          </motion.div>

          {/* Exhibition List by Year */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-[#8a8580]">Učitavanje izložbi...</p>
            </div>
          ) : years.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#8a8580] font-['Outfit'] text-[16px]">Nema dostupnih izložbi.</p>
            </div>
          ) : (
            years.map((year) => (
              <div key={year} className="mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <h2
                    className="font-['Outfit'] text-[#c9a96e] text-[32px] md:text-[42px]"
                    style={{ fontWeight: 800 }}
                  >
                    {year}
                  </h2>
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[#8a8580]/50 font-['Inter'] text-[12px]">
                    {grouped[year].length} {grouped[year].length === 1 ? "izložba" : "izložbe"}
                  </span>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {grouped[year].map((ex, i) => (
                    <motion.div
                      key={ex.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: Math.min(i * 0.06, 0.3),
                        duration: 0.5,
                      }}
                      className="group relative"
                    >
                      {editMode && (
                        <button
                          onClick={e => { e.stopPropagation(); setEditExh(ex); }}
                          className="absolute top-3 right-3 z-20 w-9 h-9 bg-[#c9a96e] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#d4b47a] cursor-pointer"
                          title="Uredi izložbu"
                        >
                          <Pencil size={14} className="text-[#0a0a0a]" />
                        </button>
                      )}
                      <button
                        onClick={() => setSelected(ex)}
                        className="group w-full text-left bg-[#111]/50 border border-white/5 hover:border-[#c9a96e]/20 hover:bg-[#111] transition-all duration-300 cursor-pointer overflow-hidden"
                      >
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img
                            src={ex.image || ""}
                            alt={ex.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="p-6 md:p-8">
                          <h3
                            className="font-['Outfit'] text-[#f5f0eb] text-[18px] md:text-[22px] mb-3 group-hover:text-[#c9a96e] transition-colors duration-300"
                            style={{ fontWeight: 600 }}
                          >
                            {ex.title}
                          </h3>
                          <p
                            className="text-[#8a8580] font-['Outfit'] text-[13px] leading-relaxed mb-4"
                            style={{ fontWeight: 300 }}
                          >
                            {ex.description}
                          </p>
                          <div className="flex items-center gap-2 text-[#8a8580]/50">
                            <MapPin size={11} />
                            <p className="font-['Inter'] text-[11px] truncate">
                              {ex.venue}, {ex.location}
                            </p>
                          </div>
                        </div>
                        <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#c9a96e]/40 group-hover:bg-[#c9a96e]/10 transition-all duration-300 mt-1">
                          <ArrowUpRight
                            size={14}
                            className="text-[#8a8580] group-hover:text-[#c9a96e] transition-colors duration-300"
                          />
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#8a8580] font-['Outfit'] text-[16px]">
                Nema izložbi u ovoj kategoriji.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {selected && (
        <ExhibitionModal
          exhibition={selected}
          onClose={() => setSelected(null)}
          onNavigate={(id) => {
            const ex = exhibitions.find((e) => e.id === id);
            if (ex) setSelected(ex);
          }}
          allExhibitions={exhibitions}
        />
      )}

      {editExh && (
        <ExhibitionEditModal exhibition={editExh} onClose={() => setEditExh(null)} onSaved={() => { /* refresh will come from event */ }} />
      )}
    </>
  );
}