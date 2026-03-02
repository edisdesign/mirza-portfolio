import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Calendar, Tag, ArrowLeft } from "lucide-react";
import { Exhibition } from "../lib/supabase";

interface ExhibitionModalProps {
  exhibition: Exhibition | null;
  onClose: () => void;
  onNavigate: (id: number) => void;
  allExhibitions?: Exhibition[];
}

export function ExhibitionModal({
  exhibition,
  onClose,
  onNavigate,
  allExhibitions = [],
}: ExhibitionModalProps) {
  const [direction, setDirection] = useState(0);

  const currentIndex = exhibition
    ? allExhibitions.findIndex((e) => e.id === exhibition.id)
    : -1;
  const prevEx = currentIndex > 0 ? allExhibitions[currentIndex - 1] : null;
  const nextEx =
    currentIndex < allExhibitions.length - 1
      ? allExhibitions[currentIndex + 1]
      : null;

  useEffect(() => {
    if (exhibition) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [exhibition]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleNav = (id: number, dir: number) => {
    setDirection(dir);
    onNavigate(id);
  };

  return (
    <AnimatePresence>
      {exhibition && (
        <motion.div
          key="exhibition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-sm" />

          <motion.div
            key={exhibition.id}
            initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative ml-auto w-full max-w-[720px] h-full bg-[#111] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="sticky top-0 right-0 z-10 float-right mt-6 mr-6 w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:border-[#c9a96e]/50 hover:bg-[#c9a96e]/10 transition-all duration-300 bg-[#111]/80 backdrop-blur-sm cursor-pointer"
            >
              <X size={18} className="text-[#f5f0eb]" />
            </button>

            <div className="px-8 md:px-12 pt-8 pb-16 clear-both">
              {exhibition.image && (
                <div className="relative aspect-[16/9] overflow-hidden mb-10 -mx-8 md:-mx-12 -mt-8">
                  <img
                    src={exhibition.image}
                    alt={exhibition.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="px-4 py-1.5 border border-[#c9a96e]/40 text-[#c9a96e] font-['Outfit'] text-[11px] tracking-[0.15em] uppercase">
                  {exhibition.type}
                </span>
                <span className="text-[#8a8580] font-['Outfit'] text-[13px]">
                  {exhibition.date}
                </span>
              </div>

              <h2
                className="font-['Outfit'] text-[#f5f0eb] text-[32px] md:text-[48px] leading-tight mb-10"
                style={{ fontWeight: 800 }}
              >
                {exhibition.title}
              </h2>

              <div className="flex flex-col sm:flex-row gap-6 mb-10 pb-10 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                    <MapPin size={16} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-[#f5f0eb] font-['Outfit'] text-[14px]">{exhibition.venue}</p>
                    <p className="text-[#8a8580] font-['Outfit'] text-[13px]" style={{ fontWeight: 300 }}>{exhibition.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                    <Calendar size={16} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-[#f5f0eb] font-['Outfit'] text-[14px]">{exhibition.date}</p>
                    <p className="text-[#8a8580] font-['Outfit'] text-[13px]" style={{ fontWeight: 300 }}>Godina</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                    <Tag size={16} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-[#f5f0eb] font-['Outfit'] text-[14px]">{exhibition.type}</p>
                    <p className="text-[#8a8580] font-['Outfit'] text-[13px]" style={{ fontWeight: 300 }}>Tip</p>
                  </div>
                </div>
              </div>

              <h3 className="font-['Outfit'] text-[#f5f0eb] text-[22px] md:text-[28px] mb-6" style={{ fontWeight: 600 }}>O izložbi</h3>
              <p className="text-[#b0a99f] font-['Outfit'] text-[16px] md:text-[17px] leading-relaxed mb-10" style={{ fontWeight: 300 }}>
                {exhibition.description}
              </p>

              {exhibition.details && (
                <>
                  <h3 className="font-['Outfit'] text-[#f5f0eb] text-[22px] md:text-[28px] mb-6" style={{ fontWeight: 600 }}>Detalji</h3>
                  <p className="text-[#b0a99f] font-['Outfit'] text-[16px] md:text-[17px] leading-relaxed mb-16" style={{ fontWeight: 300 }}>
                    {exhibition.details}
                  </p>
                </>
              )}

              <div className="flex items-center justify-between border-t border-white/10 pt-10">
                {prevEx ? (
                  <button onClick={() => handleNav(prevEx.id, -1)} className="group flex items-center gap-3 text-[#8a8580] hover:text-[#f5f0eb] transition-colors duration-300 cursor-pointer">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <div className="text-left">
                      <p className="font-['Outfit'] text-[11px] tracking-[0.15em] uppercase opacity-50">Prethodna</p>
                      <p className="font-['Outfit'] text-[14px]">{prevEx.title}</p>
                    </div>
                  </button>
                ) : <div />}

                {nextEx ? (
                  <button onClick={() => handleNav(nextEx.id, 1)} className="group flex items-center gap-3 text-[#8a8580] hover:text-[#f5f0eb] transition-colors duration-300 text-right cursor-pointer">
                    <div>
                      <p className="font-['Outfit'] text-[11px] tracking-[0.15em] uppercase opacity-50">Sljedeća</p>
                      <p className="font-['Outfit'] text-[14px]">{nextEx.title}</p>
                    </div>
                    <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : <div />}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
