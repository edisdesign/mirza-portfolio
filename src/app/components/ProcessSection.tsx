import { motion } from 'framer-motion';
import atelierImg from '../../assets/bg.png';

export function ProcessSection() {
  const steps = [
    { num: '01', title: 'Inspiracija', desc: 'Sve počinje u tišini. Posmatranje prirode ili unutarnjeg osećaja.' },
    { num: '02', title: 'Skica', desc: 'Grubi potezi ugljenom na platnu pre prve boje.' },
    { num: '03', title: 'Slojevi', desc: 'Nanošenje boje u slojevima daje slici dubinu.' },
    { num: '04', title: 'Završetak', desc: 'Trenutak kada slika počinje da živi svoj život.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
    <section className="py-32 px-6 md:px-12 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="relative min-h-[500px] rounded-sm overflow-hidden" variants={imageVariants}>
            <motion.img 
              src={atelierImg} 
              alt="Proces" 
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
          <motion.div className="grid gap-8" variants={containerVariants}>
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                className="border-b border-white/5 pb-8 hover:border-[#c9a96e]/30 transition-colors duration-300"
                variants={itemVariants}
                whileHover={{ x: 8 }}
              >
                <motion.div 
                  className="flex items-baseline gap-6 mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <span className="text-[#c9a96e] font-['Outfit'] text-sm font-bold">{step.num}</span>
                  <h3 className="text-[#f5f0eb] font-['Outfit'] text-2xl font-light">{step.title}</h3>
                </motion.div>
                <motion.p 
                  className="text-[#8a8580] font-['Outfit'] pl-10 text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                >
                  {step.desc}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}