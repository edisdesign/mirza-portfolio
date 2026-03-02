import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { supabase, Exhibition } from "../lib/supabase";

export function TragoviBanner() {
  const [tragovi, setTragovi] = useState<Exhibition | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('exhibitions').select('*').eq('id', 1).single();
      setTragovi(data || null);
    };
    load();
  }, []);

  if (!tragovi) return null;

  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <Link to="/izlozbe?open=1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden border border-white/5 group cursor-pointer hover:border-[#c9a96e]/20 transition-colors duration-500"
          >
            {/* Background image */}
            {tragovi.image && (
              <div className="absolute inset-0">
                <img
                  src={tragovi.image}
                  alt={tragovi.title}
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/70" />
              </div>
            )}

            <div className="relative px-8 md:px-16 py-14 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 border border-[#c9a96e]/40 text-[#c9a96e] font-['Outfit'] text-[10px] tracking-[0.2em] uppercase">
                    Samostalna izložba
                  </span>
                  <span className="text-[#8a8580] font-['Inter'] text-[12px]">
                    {tragovi.date}
                  </span>
                </div>

                <h3
                  className="font-['Outfit'] text-[#f5f0eb] text-[28px] md:text-[40px] leading-tight mb-3"
                  style={{ fontWeight: 800 }}
                >
                  &ldquo;{tragovi.title}&rdquo;
                </h3>

                <p
                  className="text-[#8a8580] font-['Outfit'] text-[14px] md:text-[15px] leading-relaxed max-w-lg"
                  style={{ fontWeight: 300 }}
                >
                  {tragovi.venue} &middot; {tragovi.location}
                </p>
              </div>

              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] group-hover:bg-[#c9a96e] group-hover:text-[#0a0a0a] transition-all duration-300">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}