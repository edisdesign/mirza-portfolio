import { motion } from 'motion/react';
import atelierImg from '../../assets/bg.png';

export function ProcessSection() {
  const steps = [
    { num: '01', title: 'Inspiracija', desc: 'Sve počinje u tišini. Posmatranje prirode ili unutarnjeg osećaja.' },
    { num: '02', title: 'Skica', desc: 'Grubi potezi ugljenom na platnu pre prve boje.' },
    { num: '03', title: 'Slojevi', desc: 'Nanošenje boje u slojevima daje slici dubinu.' },
    { num: '04', title: 'Završetak', desc: 'Trenutak kada slika počinje da živi svoj život.' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div className="relative min-h-[500px] rounded-sm overflow-hidden">
            <img src={atelierImg} alt="Proces" className="absolute inset-0 w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </motion.div>
          <div className="grid gap-8">
            {steps.map((step, i) => (
              <div key={i} className="border-b border-white/5 pb-8">
                <div className="flex items-baseline gap-6 mb-3">
                  <span className="text-[#c9a96e] font-['Outfit'] text-sm">{step.num}</span>
                  <h3 className="text-[#f5f0eb] font-['Outfit'] text-2xl font-light">{step.title}</h3>
                </div>
                <p className="text-[#8a8580] font-['Outfit'] pl-10 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}