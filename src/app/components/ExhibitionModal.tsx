import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Exhibition } from '../lib/supabase';

interface ExhibitionModalProps {
  exhibition: Exhibition;
  onClose: () => void;
  allExhibitions?: Exhibition[];
  onNavigate?: (id: number) => void;
}

export function ExhibitionModal({
  exhibition,
  onClose,
  allExhibitions = [],
  onNavigate
}: ExhibitionModalProps) {
  const currentIndex = allExhibitions.findIndex(e => e.id === exhibition.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allExhibitions.length - 1;

  const handlePrev = () => {
    if (hasPrev) onNavigate?.(allExhibitions[currentIndex - 1].id);
  };

  const handleNext = () => {
    if (hasNext) onNavigate?.(allExhibitions[currentIndex + 1].id);
  };

  return (
    <AnimatePresence>
      {exhibition && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-[#111] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#111] border-b border-white/10 p-6 flex items-center justify-between z-10">
              <div>
                <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.2em] uppercase mb-2">{exhibition.type}</p>
                <h2 className="font-['Outfit'] text-[#f5f0eb] text-[28px]" style={{ fontWeight: 700 }}>
                  {exhibition.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 transition-colors rounded-full"
              >
                <X size={24} className="text-[#8a8580]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-10">
              {exhibition.image && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="aspect-[16/9] mb-8 rounded-sm overflow-hidden bg-[#1a1a1a]"
                >
                  <img
                    src={exhibition.image}
                    alt={exhibition.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white/5"
              >
                <div>
                  <p className="text-[#8a8580]/60 font-['Outfit'] text-[12px] uppercase tracking-[0.1em] mb-2">Mesto</p>
                  <p className="text-[#f5f0eb] font-['Outfit'] text-[16px]">{exhibition.venue}</p>
                </div>
                <div>
                  <p className="text-[#8a8580]/60 font-['Outfit'] text-[12px] uppercase tracking-[0.1em] mb-2">Lokacija</p>
                  <p className="text-[#f5f0eb] font-['Outfit'] text-[16px]">{exhibition.location}</p>
                </div>
                <div>
                  <p className="text-[#8a8580]/60 font-['Outfit'] text-[12px] uppercase tracking-[0.1em] mb-2">Datum</p>
                  <p className="text-[#f5f0eb] font-['Outfit'] text-[16px]">{exhibition.date}</p>
                </div>
              </motion.div>

              {exhibition.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-[#8a8580] font-['Outfit'] text-[16px] leading-relaxed">
                    {exhibition.description}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Navigation */}
            {allExhibitions.length > 1 && (
              <div className="border-t border-white/10 p-6 flex items-center justify-between bg-[#0a0a0a]">
                <button
                  onClick={handlePrev}
                  disabled={!hasPrev}
                  className={`p-2 rounded-full transition-all ${hasPrev
                      ? 'hover:bg-[#c9a96e]/20 text-[#c9a96e]'
                      : 'text-[#8a8580]/30 cursor-not-allowed'
                    }`}
                >
                  <ChevronLeft size={24} />
                </button>
                <span className="text-[#8a8580] font-['Outfit'] text-[12px] tracking-[0.1em] uppercase">
                  {currentIndex + 1} / {allExhibitions.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={!hasNext}
                  className={`p-2 rounded-full transition-all ${hasNext
                      ? 'hover:bg-[#c9a96e]/20 text-[#c9a96e]'
                      : 'text-[#8a8580]/30 cursor-not-allowed'
                    }`}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
