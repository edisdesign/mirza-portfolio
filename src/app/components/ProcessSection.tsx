import { motion } from 'motion/react';
// Placeholder slika ateljea
import atelierImg from '../assets/32271cfd070102d1b170812e93e278c9cba4e6ed.png';

export function ProcessSection() {
  const steps = [
    { num: '01', title: 'Inspiracija', desc: 'Sve počinje u tišini. Posmatranje prirode, svetla ili unutarnjeg osećaja koji traži izraz.' },
    { num: '02', title: 'Skica', desc: 'Grubi potezi ugljenom na platnu. Traženje kompozicije i ravnoteže pre prve boje.' },
    { num: '03', title: 'Slojevi', desc: 'Nanošenje boje u slojevima. Vreme između nanosa daje slici dubinu i karakter.' },
    { num: '04', title: 'Završetak', desc: 'Trenutak kada slika počinje da živi svoj život, odvojena od autora.' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-4">Proces</p>
            <h2 className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[48px] leading-tight" style={{ fontWeight: 700 }}>
              Kako nastaje<br />umetnost
            </h2>
          </div>
          <div className="hidden lg:block h-[1px] bg-white/10 w-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Slika Procesa */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative h-[400px] lg:h-full min-h-[500px] rounded-sm overflow-hidden"
          >
            <img 
              src={atelierImg} 
              alt="Proces rada" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8">
              <p className="text-[#f5f0eb] font-['Outfit'] text-xl italic">"Atelje je moj hram."</p>
            </div>
          </motion.div>

          {/* Koraci */}
          <div className="grid gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group border-b border-white/5 pb-8 hover:border-[#c9a96e]/30 transition-colors"
              >
                <div className="flex items-baseline gap-6 mb-3">
                  <span className="text-[#c9a96e] font-['Outfit'] text-sm tracking-widest">{step.num}</span>
                  <h3 className="text-[#f5f0eb] font-['Outfit'] text-2xl font-light group-hover:text-[#c9a96e] transition-colors">
                    {step.title}
                  </h3>
                </div>
                <p className="text-[#8a8580] font-['Outfit'] pl-10 text-sm leading-relaxed max-w-md">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}