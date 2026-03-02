import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
// MENJAMO Figma URL tvojom lokalnom slikom
import aboutPortrait from "../../assets/me.png";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { number: "50+", numericValue: 50, suffix: "+", label: "Radova" },
  { number: "Tragovi", label: "Solo izložba" },
  { number: "BiH", label: "Regija" },
  { number: "10+", numericValue: 10, suffix: "+", label: "Godina iskustva" },
];

export function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image - Sačuvan Figma stil */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)", x: -30 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-[#1a1a1a]">
              <img
                src={aboutPortrait}
                alt="Mirza Smajlović"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Dekorativni okvir iz Figme */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#c9a96e]/20 -z-10" />
          </motion.div>

          {/* Content - Sačuvan Figma stil */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)", x: 30 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-6">
              O umjetniku
            </p>
            <h2
              className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[48px] leading-tight mb-8"
              style={{ fontWeight: 800 }}
            >
              Svaki potez četkom
              <br />
              <span className="text-[#c9a96e]">bilježi tragove</span>
            </h2>

            <div className="space-y-6 mb-12">
              <p className="text-[#8a8580] font-['Outfit'] text-[15px] leading-relaxed" style={{ fontWeight: 300 }}>
                Mirza Smajlović (r. 1988, Visoko, Bosna i Hercegovina) je
                akademski slikar čiji se umjetnički rad razvija unutar savremenog
                figurativnog i ekspresivnog diskursa.
              </p>
              <p className="text-[#8a8580] font-['Outfit'] text-[15px] leading-relaxed" style={{ fontWeight: 300 }}>
                Njegov opus karakteriše snažan odnos prema motivu prostora i
                identiteta. Smajlović gradi kompoziciju kroz slojevitu strukturu
                boje i materijala.
              </p>
              <p className="text-[#8a8580] font-['Outfit'] text-[15px] leading-relaxed" style={{ fontWeight: 300 }}>
                Član je Udruženja likovnih umjetnika Likum '76 iz Visokog. Izlagao je
                na samostalnim i grupnim izložbama u Bosni i Hercegovini i regiji.
              </p>
            </div>

            {/* Stats - Sačuvani Figma brojači */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-8 pt-8 border-t border-white/10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <p
                    className="font-['Outfit'] text-[#c9a96e] text-[32px] md:text-[40px]"
                    style={{ fontWeight: 700 }}
                  >
                    {stat.numericValue != null ? (
                      <AnimatedNumber value={stat.numericValue} suffix={stat.suffix || ""} />
                    ) : (
                      stat.number
                    )}
                  </p>
                  <p className="text-[#8a8580] font-['Outfit'] text-[12px] tracking-[0.15em] uppercase mt-1" style={{ fontWeight: 300 }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}