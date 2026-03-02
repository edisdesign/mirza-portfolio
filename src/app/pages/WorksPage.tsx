import { Footer } from "../components/Footer";
import { usePageTitle } from "../hooks/usePageTitle";
import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowUpRight, ArrowLeft, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, Work } from "../lib/supabase";

const filters = [
  { label: "Sve", key: "sve" },
  { label: "Ulje", key: "ulje" },
  { label: "Akril", key: "akril" },
  { label: "Crtež", key: "crtez" },
  { label: "Grafika", key: "grafika" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

function matchFilter(category: string, filter: FilterKey): boolean {
  if (filter === "sve") return true;
  const cat = category.toLowerCase();
  if (filter === "ulje") return cat.includes("ulje");
  if (filter === "akril") return cat.includes("akril");
  if (filter === "crtez") {
    return (
      cat.includes("olovka") ||
      cat.includes("ugljen") ||
      cat.includes("tuš") ||
      cat.includes("mješana")
    );
  }
  if (filter === "grafika") return cat.includes("grafika");
  return false;
}

export function WorksPage() {
  usePageTitle("Radovi");
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = (searchParams.get("filter") || "sve") as FilterKey;
  const validFilter = filters.some((f) => f.key === filterParam) ? filterParam : "sve";
  const [activeFilter, setActiveFilter] = useState<FilterKey>(validFilter);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorks = async () => {
    setLoading(true);
    const { data } = await supabase.from('works').select('*').order('sort_order', { ascending: true });
    setWorks(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchWorks();
    const handler = () => fetchWorks();
    window.addEventListener('mirza:refresh', handler);
    return () => window.removeEventListener('mirza:refresh', handler);
  }, []);

  const handleFilterChange = (key: FilterKey) => {
    setActiveFilter(key);
    if (key === "sve") {
      setSearchParams({});
    } else {
      setSearchParams({ filter: key });
    }
  };

  const filtered = works.filter((w) => matchFilter(w.category, activeFilter));
  const activeLabel = filters.find((f) => f.key === activeFilter)?.label || "Sve";

  // Close dropdown on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

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

            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-4">
                  Kompletna kolekcija
                </p>
                <h1
                  className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[56px] leading-tight"
                  style={{ fontWeight: 800 }}
                >
                  Svi <span className="text-[#c9a96e]">radovi</span>
                </h1>
              </div>
              <p className="hidden md:block text-[#8a8580]/60 font-['Outfit'] text-[14px]">
                {filtered.length}{" "}
                {filtered.length === 1
                  ? "rad"
                  : filtered.length < 5
                  ? "rada"
                  : "radova"}
              </p>
            </div>
          </motion.div>

          {/* Desktop Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden sm:flex flex-wrap gap-3 mb-16"
          >
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => handleFilterChange(f.key)}
                className={`px-5 py-2.5 font-['Outfit'] text-[12px] tracking-[0.1em] uppercase border transition-all duration-300 cursor-pointer ${
                  activeFilter === f.key
                    ? "bg-[#c9a96e] text-[#0a0a0a] border-[#c9a96e]"
                    : "bg-transparent text-[#8a8580] border-white/10 hover:border-[#c9a96e]/40 hover:text-[#f5f0eb]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Mobile Filter Button + Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="sm:hidden mb-10 relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center gap-3 px-5 py-3 border border-white/10 text-[#f5f0eb] font-['Outfit'] text-[12px] tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer w-full justify-between"
            >
              <span className="flex items-center gap-2.5">
                <SlidersHorizontal size={14} className="text-[#c9a96e]" />
                {activeLabel}
              </span>
              <span className="text-[#8a8580]/60 text-[11px]">
                {filtered.length}{" "}
                {filtered.length === 1
                  ? "rad"
                  : filtered.length < 5
                  ? "rada"
                  : "radova"}
              </span>
            </button>

            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-[#151515] border border-white/10 z-30 overflow-hidden"
                >
                  {filters.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => {
                        handleFilterChange(f.key);
                        setMobileOpen(false);
                      }}
                      className={`block w-full text-left px-5 py-3.5 font-['Outfit'] text-[12px] tracking-[0.1em] uppercase transition-all duration-200 cursor-pointer border-b border-white/5 last:border-b-0 ${
                        activeFilter === f.key
                          ? "bg-[#c9a96e]/10 text-[#c9a96e]"
                          : "text-[#8a8580] hover:text-[#f5f0eb] hover:bg-white/[0.03]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-[#111] aspect-[4/3]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((work, i) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                  duration: 0.4,
                  delay: Math.min(i * 0.03, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={work.landscape ? "md:col-span-2" : ""}
              >
                <Link
                  to={`/radovi/${work.id}`}
                  state={{ from: "/radovi" }}
                  className="group block"
                >
                  <div
                    className={`relative overflow-hidden ${
                      work.landscape ? "aspect-[16/9]" : "aspect-[4/5]"
                    }`}
                  >
                    <img
                      src={work.image}
                      alt={work.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/40 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-end p-6">
                      <div className="flex items-end justify-between w-full">
                        <div>
                          <p className="text-[#c9a96e] font-['Inter'] text-[11px] tracking-[0.2em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {work.category} — {work.year}
                          </p>
                          <h3
                            className="font-['Outfit'] text-[#f5f0eb] text-[20px] md:text-[24px] translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                            style={{ fontWeight: 600 }}
                          >
                            {work.title}
                          </h3>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                          <div className="w-10 h-10 rounded-full border border-[#c9a96e]/40 flex items-center justify-center">
                            <ArrowUpRight
                              size={16}
                              className="text-[#c9a96e]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-[#8a8580] font-['Inter'] text-[13px]">
                      {work.title}
                    </p>
                    <p className="text-[#8a8580]/60 font-['Inter'] text-[12px]">
                      {work.size}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#8a8580] font-['Outfit'] text-[16px]">
                Nema radova u ovoj kategoriji.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}