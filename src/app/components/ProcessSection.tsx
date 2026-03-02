import { motion } from 'framer-motion';
import atelierImg from '../../assets/bg.png';

export function ProcessSection() {
  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-6">
              Proces
            </p>
            <h2
              className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[48px] leading-tight mb-8"
              style={{ fontWeight: 800 }}
            >
              Od motiva do<br />
              <span className="text-[#c9a96e]">transformacije</span>
            </h2>
            <p
              className="text-[#8a8580] font-['Outfit'] text-[15px] leading-relaxed mb-10 max-w-md"
              style={{ fontWeight: 300 }}
            >
              Slikarstvo doživljavam kao proces slojevitog bilježenja unutrašnjih i spoljašnjih stanja. Svaki rad nastaje kao rezultat dijaloga između motiva i emocije. Površina platna je prostor traganja — za identitetom, za vremenom, za prisustvom.
            </p>

            <div className="space-y-8">
              {[{
                step: "01",
                title: "Vizija i Motiv",
                <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-6">
                  Proces
                </p>
                <h2
                  className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[48px] leading-tight mb-8"
                  style={{ fontWeight: 800 }}
                >
                  Od motiva do<br />
                  <span className="text-[#c9a96e]">transformacije</span>
                </h2>
                <p
                  className="text-[#8a8580] font-['Outfit'] text-[15px] leading-relaxed mb-10 max-w-md"
                  style={{ fontWeight: 300 }}
                >
                  Slikarstvo doživljavam kao proces slojevitog bilježenja unutrašnjih i spoljašnjih stanja. Svaki rad nastaje kao rezultat dijaloga između motiva i emocije. Površina platna je prostor traganja — za identitetom, za vremenom, za prisustvom.
                </p>

                <div className="space-y-8">
                  {[{
                    step: "01",
                    title: "Vizija i Motiv",
                    desc: "Rad često polazi od realnog prizora — portreta, pejzaža ili urbane scene — koji se kroz proces slikanja transformiše",
                  }, {
                    step: "02",
                    title: "Slojeviti Nanos",
                    desc: "Eksperiment sa slojevitim nanosom boje, naglašenim potezom četke i kontrastom svjetla i tamnih tonova",
                  }, {
                    step: "03",
                    title: "Emotivna Energija",
                    desc: "Boja nije dekorativni element, već nosilac emocionalne energije. Potez ostaje vidljiv — naglašavajući prisustvo umjetnika",
                  }].map((item, i) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, filter: "blur(8px)", x: -12 }}
                      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="flex gap-6"
                    >
                      <span
                        className="font-['Outfit'] text-[#c9a96e]/30 text-[32px]"
                        style={{ fontWeight: 700 }}
                      >
                        {item.step}
                      </span>
                      <div>
                        <h4
                          className="text-[#f5f0eb] font-['Outfit'] text-[16px] mb-1"
                          style={{ fontWeight: 500 }}
                        >
                          {item.title}
                        </h4>
                        <p
                          className="text-[#8a8580] font-['Outfit'] text-[14px] leading-relaxed"
                          style={{ fontWeight: 300 }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
}