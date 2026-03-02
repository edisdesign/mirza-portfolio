import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import heroBg from '../../assets/bg.png';

export function Hero() {
  const scrollToWorks = () => {
    const worksSection = document.getElementById('works');
    worksSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={heroBg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 mt-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="md:col-span-8">
            <motion.p 
              variants={itemVariants}
              className="text-[#c9a96e] font-['Outfit'] text-[14px] tracking-[0.3em] uppercase mb-6"
            >
              Akademski Slikar
            </motion.p>
            <motion.h1 
              variants={titleVariants}
              className="font-['Outfit'] text-[#f5f0eb] text-[48px] md:text-[80px] leading-[1.1] tracking-tight mb-8" 
              style={{ fontWeight: 800 }}
            >
              Umetnost koja<br />
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a96e] to-[#e0c58d] inline-block"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                diše tišinu
              </motion.span>
            </motion.h1>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end pb-4">
            <motion.p 
              variants={itemVariants}
              className="text-[#f5f0eb] font-['Outfit'] text-[16px] leading-relaxed max-w-md"
            >
              Istraživanje unutrašnjih pejzaža kroz teksturu, svetlost i apstrakciju.
            </motion.p>
          </div>
        </motion.div>
      </div>

      <motion.button 
        onClick={scrollToWorks} 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#8a8580] hover:text-[#c9a96e] transition-colors cursor-pointer flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Istraži</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}