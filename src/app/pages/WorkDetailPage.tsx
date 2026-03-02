import { usePageTitle } from "../hooks/usePageTitle";
import { ShareMenu } from "../components/ShareMenu";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  X,
  ZoomIn,
  ZoomOut,
  MessageCircle,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { supabase, Work } from "../lib/supabase";

const PHONE = "+387603013005";
const EMAIL = "slikarsmajlovic@gmail.com";
const SWIPE_THRESHOLD = 60;

export function WorkDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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

  const work = works.find((w) => w.id === Number(id));
  const currentIndex = works.findIndex((w) => w.id === Number(id));

  usePageTitle(work?.title || "Rad");

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });

  // Swipe refs
  const swipeStartX = useRef(0);
  const swipeStartY = useRef(0);
  const swiping = useRef(false);

  // Persist origin in sessionStorage so it survives prev/next navigation
  const stateFrom = (location.state as { from?: string })?.from;
  const STORAGE_KEY = "work-detail-origin";

  // If we arrived with a fresh `from` state, store it; otherwise read stored
  const closePath = (() => {
    if (stateFrom) {
      try { sessionStorage.setItem(STORAGE_KEY, stateFrom); } catch {}
      return stateFrom;
    }
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === "/radovi") return "/radovi";
    } catch {}
    return "/";
  })();

  const prevWork = currentIndex > 0 ? works[currentIndex - 1] : null;
  const nextWork =
    currentIndex < works.length - 1 ? works[currentIndex + 1] : null;

  // Reset lightbox state
  useEffect(() => {
    if (!lightboxOpen) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  }, [lightboxOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") setLightboxOpen(false);
        if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.5, 5));
        if (e.key === "-") setZoom((z) => Math.max(z - 0.5, 1));
      } else {
        if (e.key === "Escape") navigate(closePath);
        if (e.key === "ArrowLeft" && prevWork)
          navigate(`/radovi/${prevWork.id}`);
        if (e.key === "ArrowRight" && nextWork)
          navigate(`/radovi/${nextWork.id}`);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, prevWork, nextWork, navigate, closePath]);

  // Scroll wheel zoom in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((z) => {
        const newZ = e.deltaY < 0 ? Math.min(z + 0.25, 5) : Math.max(z - 0.25, 1);
        if (newZ <= 1) setPan({ x: 0, y: 0 });
        return newZ;
      });
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [lightboxOpen]);

  // Mobile swipe navigation
  useEffect(() => {
    if (lightboxOpen) return;

    const handleTouchStart = (e: TouchEvent) => {
      swipeStartX.current = e.touches[0].clientX;
      swipeStartY.current = e.touches[0].clientY;
      swiping.current = true;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!swiping.current) return;
      swiping.current = false;
      const deltaX = e.changedTouches[0].clientX - swipeStartX.current;
      const deltaY = e.changedTouches[0].clientY - swipeStartY.current;

      // Only trigger if horizontal swipe is dominant
      if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaY) > Math.abs(deltaX)) return;

      if (deltaX > 0 && prevWork) {
        navigate(`/radovi/${prevWork.id}`);
      } else if (deltaX < 0 && nextWork) {
        navigate(`/radovi/${nextWork.id}`);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [lightboxOpen, prevWork, nextWork, navigate]);

  // Double click to toggle zoom
  const handleDoubleClick = useCallback(() => {
    if (zoom > 1) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    } else {
      setZoom(2.5);
    }
  }, [zoom]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom <= 1) return;
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      panStart.current = { ...pan };
    },
    [zoom, pan]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return;
      setPan({
        x: panStart.current.x + (e.clientX - dragStart.current.x),
        y: panStart.current.y + (e.clientY - dragStart.current.y),
      });
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleLightboxTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (zoom <= 1 || e.touches.length !== 1) return;
      isDragging.current = true;
      dragStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      panStart.current = { ...pan };
    },
    [zoom, pan]
  );

  const handleLightboxTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      setPan({
        x: panStart.current.x + (e.touches[0].clientX - dragStart.current.x),
        y: panStart.current.y + (e.touches[0].clientY - dragStart.current.y),
      });
    },
    []
  );

  if (!loading && !work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1
            className="font-['Outfit'] text-[#f5f0eb] text-[36px] mb-4"
            style={{ fontWeight: 800 }}
          >
            Rad nije pronađen
          </h1>
          <Link
            to="/radovi"
            className="text-[#c9a96e] font-['Outfit'] text-[14px] tracking-[0.15em] uppercase hover:underline"
          >
            Nazad na galeriju
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Pozdrav! Zanima me djelo "${work.title}" (${work.size}, ${work.year}). Da li je dostupno za kupovinu?`
  );
  const whatsappUrl = `https://wa.me/${PHONE.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`;
  const emailSubject = encodeURIComponent(
    `Upit za djelo: ${work.title}`
  );
  const emailBody = encodeURIComponent(
    `Pozdrav,\n\nZanima me djelo "${work.title}" (${work.size}, ${work.year}).\nDa li je dostupno za kupovinu?\n\nHvala!`
  );
  const emailUrl = `mailto:${EMAIL}?subject=${emailSubject}&body=${emailBody}`;

  // Related works: same category, exclude current, max 3
  const relatedWorks = works
    .filter((w) => w.id !== work.id && w.category === work.category)
    .slice(0, 3);
  // If not enough from same category, fill with random others
  if (relatedWorks.length < 3) {
    const others = works.filter(
      (w) => w.id !== work.id && !relatedWorks.find((r) => r.id === w.id)
    );
    for (const o of others) {
      if (relatedWorks.length >= 3) break;
      relatedWorks.push(o);
    }
  }

  return (
    <>
      <section className="pt-28 pb-20 px-6 md:px-12 min-h-screen">
        <div className="max-w-[1400px] mx-auto">
          {/* Top bar: prev/next + close */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between mb-10"
          >
            {/* Prev / Next navigation */}
            <div className="flex items-center gap-6">
              {prevWork ? (
                <Link
                  to={`/radovi/${prevWork.id}`}
                  className="group flex items-center gap-2.5 text-[#8a8580] hover:text-[#f5f0eb] transition-colors duration-300"
                >
                  <ArrowLeft
                    size={15}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  <div className="hidden sm:block">
                    <p className="font-['Inter'] text-[10px] tracking-[0.15em] uppercase opacity-50">
                      Prethodni
                    </p>
                    <p className="font-['Outfit'] text-[13px] max-w-[140px] truncate">
                      {prevWork.title}
                    </p>
                  </div>
                  <span className="sm:hidden font-['Inter'] text-[11px] tracking-[0.15em] uppercase">
                    Prethodni
                  </span>
                </Link>
              ) : (
                <div className="w-20" />
              )}

              <div className="w-px h-6 bg-white/10 hidden sm:block" />

              {nextWork ? (
                <Link
                  to={`/radovi/${nextWork.id}`}
                  className="group flex items-center gap-2.5 text-[#8a8580] hover:text-[#f5f0eb] transition-colors duration-300"
                >
                  <div className="hidden sm:block text-right">
                    <p className="font-['Inter'] text-[10px] tracking-[0.15em] uppercase opacity-50">
                      Sljedeći
                    </p>
                    <p className="font-['Outfit'] text-[13px] max-w-[140px] truncate">
                      {nextWork.title}
                    </p>
                  </div>
                  <span className="sm:hidden font-['Inter'] text-[11px] tracking-[0.15em] uppercase">
                    Sljedeći
                  </span>
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              ) : (
                <div className="w-20" />
              )}
            </div>

            {/* Share + Close buttons */}
            <div className="flex items-center gap-3">
              <ShareMenu
                title={`${work?.title || "Rad"} — Mirza Smajlović`}
                text={`Pogledajte djelo "${work?.title}" od Mirze Smajlovića`}
                url={typeof window !== "undefined" ? window.location.href : ""}
              />
              <Link
                to={closePath}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#8a8580] hover:text-[#f5f0eb] hover:border-white/25 transition-all duration-300"
                aria-label="Zatvori"
              >
                <X size={18} />
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative group cursor-zoom-in overflow-hidden bg-[#111]"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#c9a96e]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                    <ZoomIn size={22} className="text-[#0a0a0a]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col"
            >
              <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-4">
                {work.technique} — {work.year}
              </p>

              <h1
                className="font-['Outfit'] text-[#f5f0eb] text-[32px] md:text-[48px] leading-tight mb-8"
                style={{ fontWeight: 800 }}
              >
                {work.title}
              </h1>

              <p
                className="text-[#b0a99f] font-['Outfit'] text-[16px] md:text-[17px] leading-relaxed mb-10"
                style={{ fontWeight: 300 }}
              >
                {work.description}
              </p>

              {/* Info — only dimensions & category */}
              <div className="grid grid-cols-2 gap-6 mb-10 pb-10 border-b border-white/10">
                <div>
                  <p className="text-[#8a8580]/60 font-['Inter'] text-[11px] tracking-[0.2em] uppercase mb-2">
                    Dimenzije
                  </p>
                  <p className="text-[#f5f0eb] font-['Outfit'] text-[14px]">
                    {work.size}
                  </p>
                </div>
                <div>
                  <p className="text-[#8a8580]/60 font-['Inter'] text-[11px] tracking-[0.2em] uppercase mb-2">
                    Kategorija
                  </p>
                  <p className="text-[#f5f0eb] font-['Outfit'] text-[14px]">
                    {work.category}
                  </p>
                </div>
              </div>

              {/* Contact / Purchase */}
              <div>
                <p className="text-[#8a8580] font-['Inter'] text-[12px] tracking-[0.15em] uppercase mb-5">
                  Zainteresovani za kupovinu?
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 font-['Inter'] text-[12px] tracking-[0.15em] uppercase hover:bg-[#20bd5a] transition-all duration-300"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>

                  <a
                    href={emailUrl}
                    className="inline-flex items-center justify-center gap-3 border border-[#c9a96e]/40 text-[#c9a96e] px-8 py-4 font-['Inter'] text-[12px] tracking-[0.15em] uppercase hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300"
                  >
                    <Mail size={18} />
                    Email
                  </a>
                </div>
              </div>

              {/* Swipe hint — mobile only */}
              <div className="mt-8 flex items-center justify-center gap-2 text-[#8a8580]/40 md:hidden">
                <ArrowLeft size={12} />
                <p className="font-['Inter'] text-[10px] tracking-[0.15em] uppercase">
                  Swipe za navigaciju
                </p>
                <ArrowRight size={12} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={(e) => {
              if (e.target === e.currentTarget && zoom <= 1) setLightboxOpen(false);
            }}
          >
            {/* Controls */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
              <button
                onClick={() => {
                  setZoom((z) => Math.min(z + 0.5, 5));
                  setPan({ x: 0, y: 0 });
                }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ZoomIn size={18} />
              </button>
              <button
                onClick={() => {
                  const newZ = Math.max(zoom - 0.5, 1);
                  setZoom(newZ);
                  if (newZ <= 1) setPan({ x: 0, y: 0 });
                }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ZoomOut size={18} />
              </button>
              <button
                onClick={() => setLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Zoom level */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
              <p className="text-white/40 font-['Inter'] text-[12px]">
                {Math.round(zoom * 100)}%
              </p>
            </div>

            {/* Image */}
            <div
              className="w-full h-full flex items-center justify-center overflow-hidden select-none"
              style={{ cursor: zoom > 1 ? "grab" : "default" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleLightboxTouchStart}
              onTouchMove={handleLightboxTouchMove}
              onTouchEnd={handleMouseUp}
              onDoubleClick={handleDoubleClick}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center"
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="max-w-[90vw] max-h-[85vh] object-contain pointer-events-none"
                  style={{
                    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                    transition: isDragging.current
                      ? "none"
                      : "transform 0.3s ease-out",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related Works */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-t border-white/10 pt-16">
            <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-8">
              Možda vas zanima i
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedWorks.map((rw) => (
                <Link
                  key={rw.id}
                  to={`/radovi/${rw.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={rw.image}
                      alt={rw.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/40 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-end p-5">
                      <div className="flex items-end justify-between w-full">
                        <div>
                          <p className="text-[#c9a96e] font-['Inter'] text-[10px] tracking-[0.2em] uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {rw.category}
                          </p>
                          <h3
                            className="font-['Outfit'] text-[#f5f0eb] text-[16px] md:text-[18px] translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                            style={{ fontWeight: 600 }}
                          >
                            {rw.title}
                          </h3>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-9 h-9 rounded-full border border-[#c9a96e]/40 flex items-center justify-center">
                            <ArrowUpRight size={14} className="text-[#c9a96e]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#8a8580] font-['Inter'] text-[12px] mt-3">
                    {rw.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}