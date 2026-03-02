import { motion } from 'motion/react';
import { Link } from 'react-router';
import aboutImg from '../../assets/me.png';

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
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-[#0f0f0f]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="relative" variants={imageVariants}>
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-[#1a1a1a]">
              <img src={aboutImg} alt="Mirza Smajlović" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            </div>
            <motion.div 
              className="absolute -bottom-6 -right-6 w-full h-full border border-[#c9a96e]/20 -z-10 hidden md:block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p 
              variants={itemVariants}
              className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-6"
            >
              O Umetniku
            </motion.p>
            <motion.h2 
              variants={itemVariants}
              className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[48px] leading-tight mb-8" 
              style={{ fontWeight: 700 }}
            >
              Slikarstvo kao<br />ogledalo duše
            </motion.h2>
            <motion.div className="space-y-6 text-[#8a8580] font-['Outfit'] text-[16px] leading-relaxed">
              <motion.p variants={itemVariants}>
                Mirza Smajlović (1988, Visoko, Bosna i Hercegovina) je akademski slikar čiji se umjetnički rad razvija unutar savremenog figurativnog i ekspresivnog diskursa. Njegovog opusa karakteriše snažan odnos prema motivu prostora i identiteta.
              </motion.p>
              <motion.p variants={itemVariants}>
                U njegovim radovima prisutna je emotivna rezonanca koja proizlazi iz ličnog iskustva, ali je oblikovana univerzalnim simbolima prepoznatljivim široj auditoriji. Gradi kompoziciju kroz slojevitu strukturu boje i materijala.
              </motion.p>
              <motion.div className="pt-8" variants={itemVariants}>
                <Link to="/biografija" className="inline-block text-[#f5f0eb] border-b border-[#c9a96e] pb-1 hover:text-[#c9a96e] transition-colors">
                  Pročitaj punu biografiju
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}