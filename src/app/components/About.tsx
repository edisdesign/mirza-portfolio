import { motion } from 'motion/react';
import { Link } from 'react-router';
import aboutImg from '../../assets/me.png';

export function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-[#0f0f0f]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div className="relative">
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-[#1a1a1a]">
              <img src={aboutImg} alt="Mirza Smajlović" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#c9a96e]/20 -z-10 hidden md:block" />
          </motion.div>

          <div>
            <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-6">O Umetniku</p>
            <h2 className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[48px] leading-tight mb-8" style={{ fontWeight: 700 }}>
              Slikarstvo kao<br />ogledalo duše
            </h2>
            <div className="space-y-6 text-[#8a8580] font-['Outfit'] text-[16px] leading-relaxed">
              <p>Rođen u Sjenici, moj umetnički put je potraga za onim neizrecivim što leži između svetlosti i senke.</p>
              <div className="pt-8">
                <Link to="/biografija" className="inline-block text-[#f5f0eb] border-b border-[#c9a96e] pb-1 hover:text-[#c9a96e] transition-colors">
                  Pročitaj punu biografiju
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}