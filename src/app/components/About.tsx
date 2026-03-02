import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { AnimatedStat } from './AnimatedStat';
import { useEffect, useState } from "react";

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  };

  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-[#0f0f0f]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image removed due to missing asset */}

          <div>
            <p 
              className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-6"
            >
              O umjetniku
            </p>
            <h2 
              className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[48px] leading-tight mb-8" 
              style={{ fontWeight: 700 }}
            >
              Svaki potez četkom<br />bilježi tragove
            </h2>
            <div className="space-y-6 text-[#8a8580] font-['Outfit'] text-[16px] leading-relaxed">
              <p>
                Mirza Smajlović (r. 1988, Visoko, Bosna i Hercegovina) je akademski slikar čiji se umjetnički rad razvija unutar savremenog figurativnog i ekspresivnog diskursa. Nakon završene Srednje škole primijenjenih umjetnosti u Sarajevu, diplomirao je slikarstvo na Akademiji likovnih umjetnosti u Sarajevu.
              </p>
              <p>
                Njegov opus karakteriše snažan odnos prema motivu prostora i identiteta. U radovima je prisutna emotivna rezonanca koja proizlazi iz ličnog iskustva, ali je oblikovana univerzalnim simbolima. Smajlović gradi kompoziciju kroz slojevitu strukturu boje i materijala, gdje površina platna postaje polje napetosti između unutrašnjeg i spoljašnjeg svijeta.
              </p>
              <p>
                Član je Udruženja likovnih umjetnika Likum '76 iz Visokog, kroz koje aktivno doprinosi razvoju lokalne likovne scene. Izlagao je na samostalnim i grupnim izložbama u Bosni i Hercegovini i regiji.
              </p>
              <div className="pt-8">
                <Link to="/biografija" className="inline-block text-[#f5f0eb] border-b border-[#c9a96e] pb-1 hover:text-[#c9a96e] transition-colors">
                  Pročitaj punu biografiju
                </Link>
              </div>
              {/* Animated statistics section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
                <AnimatedStat value={50} suffix="+" label="Radova" />
                <AnimatedStat value={10} suffix="+" label="Godina iskustva" />
                <AnimatedStat value={1} label="Regija / BiH" />
                <AnimatedStat value={1} label="Solo izložba" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
