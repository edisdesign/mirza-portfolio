import { motion } from 'motion/react';
import { Link } from 'react-router';
// Uvozimo TVOJ novi portret
import aboutImg from '../../assets/artist_portrait.png.png';

export function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-[#0f0f0f]">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Slika Sekcija - Podešeno za portret */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-[#1a1a1a]">
              <img 
                src={aboutImg} 
                alt="Mirza Smajlović - Portret" 
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" // object-top drži fokus na licu
              />
            </div>
            {/* Dekorativni okvir */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#c9a96e]/20 -z-10 hidden md:block" />
          </motion.div>

          {/* Tekst Sekcija */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-6">O Umetniku</p>
              <h2 className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[48px] leading-tight mb-8" style={{ fontWeight: 700 }}>
                Slikarstvo kao<br />ogledalo duše
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-[#8a8580] font-['Outfit'] text-[16px] leading-relaxed"
              style={{ fontWeight: 300 }}
            >
              <p>
                Rođen u Sjenici, moj umetnički put je potraga za onim neizrecivim što leži između svetlosti i senke. 
                Kroz godine stvaralaštva, platno je postalo prostor gde se emocija susreće sa materijom.
              </p>
              <p>
                Moja dela nisu samo slike; ona su dijalozi sa posmatračem. Koristeći tehniku ulja na platnu, 
                istražujem teksture koje pozivaju na dodir i boje koje bude uspavane uspomene.
              </p>
              
              <div className="pt-8">
                <Link 
                  to="/biografija"
                  className="inline-block text-[#f5f0eb] border-b border-[#c9a96e] pb-1 hover:text-[#c9a96e] transition-colors"
                >
                  Pročitaj punu biografiju
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}