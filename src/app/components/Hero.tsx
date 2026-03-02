import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import heroBg from '../../assets/bg.png';

export function Hero() {
  const scrollToWorks = () => {
    const worksSection = document.getElementById('works');
    worksSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <motion.p className="text-[#c9a96e] font-['Outfit'] text-[14px] tracking-[0.3em] uppercase mb-6">
              Akademski Slikar
            </motion.p>
            <motion.h1 className="font-['Outfit'] text-[#f5f0eb] text-[48px] md:text-[80px] leading-[1.1] tracking-tight mb-8" style={{ fontWeight: 800 }}>
              Umetnost koja<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a96e] to-[#e0c58d]">
                diše tišinu
              </span>
            </motion.h1>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end pb-4">
            <p className="text-[#f5f0eb] font-['Outfit'] text-[16px] leading-relaxed max-w-md">
              Istraživanje unutrašnjih pejzaža kroz teksturu, svetlost i apstrakciju.
            </p>
          </div>
        </div>
      </div>

      <button onClick={scrollToWorks} className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#8a8580] hover:text-[#c9a96e] transition-colors cursor-pointer flex flex-col items-center gap-2 z-20">
        <span className="text-[10px] uppercase tracking-[0.2em]">Istraži</span>
        <ArrowDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
}