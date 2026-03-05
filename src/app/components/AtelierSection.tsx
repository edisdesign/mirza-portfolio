import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, ExternalLink } from "lucide-react";
import atelierImg from "../../assets/atelier.jpg";
import starryNightLogo from "../../assets/starry_night_logo.png";
import { supabase, type AtelierImage } from "../lib/supabase";

export function AtelierSection() {
    const [images, setImages] = useState<string[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Fetch atelje images from Supabase
    useEffect(() => {
        (async () => {
            const { data } = await supabase
                .from("atelier_images")
                .select("*")
                .order("sort_order", { ascending: true });
            if (data && data.length > 0) {
                setImages((data as AtelierImage[]).map((d) => d.url));
            }
        })();

        const h = () => {
            (async () => {
                const { data } = await supabase
                    .from("atelier_images")
                    .select("*")
                    .order("sort_order", { ascending: true });
                if (data && data.length > 0) {
                    setImages((data as AtelierImage[]).map((d) => d.url));
                }
            })();
        };
        window.addEventListener("mirza:refresh", h);
        return () => window.removeEventListener("mirza:refresh", h);
    }, []);

    // Auto-rotate slideshow every 4s
    useEffect(() => {
        const total = images.length > 0 ? images.length : 1;
        if (total <= 1) return;
        timerRef.current = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % total);
        }, 4000);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [images]);

    // Only Supabase images; local atelier.jpg is visual fallback only if DB is empty
    const displayImages = images.length > 0 ? images : [atelierImg];
    const currentSrc = displayImages[currentIdx % displayImages.length];

    return (
        <section
            id="atelje"
            className="py-32 px-6 md:px-12 bg-[#0d0d0d] relative overflow-hidden"
        >
            {/* Subtle background texture */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        45deg,
                        #c9a96e 0px,
                        #c9a96e 1px,
                        transparent 0px,
                        transparent 50%
                    )`,
                    backgroundSize: "20px 20px",
                }}
            />

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16"
                >
                    <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-4">
                        Lokacija ateljea
                    </p>
                    <h2
                        className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[48px] leading-tight"
                        style={{ fontWeight: 800 }}
                    >
                        Novo poglavlje —{" "}
                        <span className="text-[#c9a96e]">od aprila u Visokom</span>
                    </h2>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                    {/* LEFT — Slideshow */}
                    <motion.div
                        initial={{ opacity: 0, x: -30, filter: "blur(12px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm group">
                            {/* Crossfade images */}
                            <AnimatePresence mode="sync">
                                <motion.img
                                    key={currentSrc}
                                    src={currentSrc}
                                    alt="Atelje Mirza Smajlović – Starry Night Retreat"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, ease: "easeInOut" }}
                                />
                            </AnimatePresence>

                            {/* Bottom gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent pointer-events-none" />

                            {/* Starry Night logo overlay — bottom left */}
                            <a
                                href="https://www.starrynightretreat.ba"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute bottom-4 left-4 flex items-center gap-3 bg-black/50 backdrop-blur-md border border-white/10 hover:border-[#c9a96e]/40 rounded-sm px-3 py-2 transition-all duration-300 group/logo z-10"
                                title="Starry Night Retreat"
                            >
                                <img
                                    src={starryNightLogo}
                                    alt="Starry Night Retreat – sponzor ateljea"
                                    className="h-8 w-auto object-contain"
                                    style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.5))" }}
                                />
                                <ExternalLink
                                    size={11}
                                    className="text-[#c9a96e] opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"
                                />
                            </a>

                            {/* Dot indicators (only if multiple images) */}
                            {displayImages.length > 1 && (
                                <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
                                    {displayImages.map((_, i) => (
                                        <span
                                            key={i}
                                            className={`block rounded-full transition-all duration-500 ${i === currentIdx % displayImages.length
                                                ? "w-4 h-1.5 bg-[#c9a96e]"
                                                : "w-1.5 h-1.5 bg-white/30"
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Decorative frame */}
                        <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#c9a96e]/15 -z-10 rounded-sm" />
                    </motion.div>

                    {/* RIGHT — Info bez mape */}
                    <motion.div
                        initial={{ opacity: 0, x: 30, filter: "blur(12px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                        className="flex flex-col gap-8"
                    >
                        {/* Description */}
                        <div className="space-y-5">
                            <p
                                className="text-[#8a8580] font-['Outfit'] text-[15px] leading-relaxed"
                                style={{ fontWeight: 300 }}
                            >
                                Od <strong className="text-[#c9a96e]">1. aprila 2025.</strong> Mirza
                                Smajlović otvara svoj atelje u sklopu{" "}
                                <strong className="text-[#f5f0eb]">Starry Night Retreat</strong>{" "}
                                parka — izuzetnog ambijenta u srcu Bosne, inspirisanog slavljenim
                                Van Goghhovim platnom.
                            </p>
                            <p
                                className="text-[#8a8580] font-['Outfit'] text-[15px] leading-relaxed"
                                style={{ fontWeight: 300 }}
                            >
                                Park prostire 70 hektara prirode u blizini Visokog, sa 130.000
                                lavandovih grmova i trinaest jezera — savršen prostor za kreativno
                                stvaranje i susret s umjetnošću.
                            </p>
                        </div>

                        {/* Location card */}
                        <div className="border border-white/8 bg-white/[0.02] rounded-sm p-5 space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin
                                    size={15}
                                    className="text-[#c9a96e] mt-0.5 flex-shrink-0"
                                />
                                <div>
                                    <p
                                        className="text-[#f5f0eb] font-['Outfit'] text-[14px]"
                                        style={{ fontWeight: 500 }}
                                    >
                                        Starry Night Retreat
                                    </p>
                                    <p className="text-[#8a8580] font-['Outfit'] text-[13px] mt-0.5">
                                        Lužnica bb, Visoko, Bosna i Hercegovina
                                    </p>
                                </div>
                            </div>

                            <a
                                href="https://maps.google.com/?q=Starry+Night+Retreat+Visoko+Bosnia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.15em] uppercase hover:gap-3 transition-all duration-300 group/map"
                            >
                                <ExternalLink size={12} />
                                <span>Prikaži na Google Maps</span>
                            </a>
                        </div>

                        {/* Date badge */}
                        <div className="flex items-center gap-3 pt-2">
                            <div className="w-8 h-px bg-[#c9a96e]/40" />
                            <p
                                className="text-[#8a8580] font-['Outfit'] text-[12px] tracking-[0.2em] uppercase"
                                style={{ fontWeight: 300 }}
                            >
                                Otvoreno od 1. aprila 2025.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
