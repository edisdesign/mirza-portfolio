import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle";

export function ImpresumPage() {
  usePageTitle("Impresum");
  return (
    <section className="min-h-screen pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#8a8580] hover:text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.15em] uppercase transition-colors duration-300 mb-12"
          >
            <ArrowLeft size={14} />
            Nazad
          </Link>

          <h1
            className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[48px] mb-4"
            style={{ fontWeight: 800 }}
          >
            Impresum
          </h1>
          <div className="w-16 h-[2px] bg-[#c9a96e]/40 mb-12" />

          <div className="space-y-10 text-[#8a8580] font-['Inter'] text-[15px] leading-relaxed">
            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Vlasnik i odgovorno lice
              </h2>
              <p>
                Mirza Smajlovic, slobodni umjetnik
                <br />
                Bosna i Hercegovina
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Kontakt
              </h2>
              <p>
                E-mail:{" "}
                <a
                  href="mailto:slikarsmajlovic@gmail.com"
                  className="text-[#c9a96e] hover:underline"
                >
                  slikarsmajlovic@gmail.com
                </a>
                <br />
                WhatsApp:{" "}
                <a
                  href="https://wa.me/387603013005"
                  className="text-[#c9a96e] hover:underline"
                >
                  +387 60 30 13 005
                </a>
                <br />
                Instagram:{" "}
                <a
                  href="https://www.instagram.com/mirzasmajlovich/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c9a96e] hover:underline"
                >
                  @mirzasmajlovich
                </a>
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Autorska prava
              </h2>
              <p>
                Sav vizuelni sadrzaj prikazan na ovoj web stranici — ukljucujuci, ali ne ogranicavajuci se na fotografije umjetnickih djela, reprodukcije slika, graficke elemente, tekstove i dizajn — predstavlja intelektualnu svojinu umjetnika Mirze Smajlovica i zasticen je zakonima o autorskim pravima Bosne i Hercegovine te medjunarodnim konvencijama o zastiti intelektualne svojine.
              </p>
              <p className="mt-4">
                Bilo kakvo kopiranje, reprodukcija, distribucija, javno prikazivanje, prerada, digitalna obrada ili bilo koji drugi oblik koristenja sadrzaja sa ove stranice — u cjelosti ili djelimicno — bez prethodne pisane saglasnosti umjetnika, strogo je zabranjeno i predstavlja krsenje autorskih prava.
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Koristenje slika u medijima
              </h2>
              <p>
                Novinari, blogeri, galerije i drugi medijski subjekti koji zele objaviti fotografije radova Mirze Smajlovica duzni su prethodno zatraziti dozvolu putem navedenih kontakt podataka. Svaka odobrena upotreba mora sadrzavati jasnu atribuciju: ime umjetnika, naziv djela i link na ovu web stranicu.
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Koristenje u komercijalne svrhe
              </h2>
              <p>
                Komercijalna upotreba bilo kojeg sadrzaja sa ove stranice — ukljucujuci reprodukcije na proizvodima, stampani materijal, digitalne medije, reklamne kampanje ili bilo koji drugi vid koristenja u svrhu sticanja materijalne koristi — apsolutno je zabranjena bez prethodno sklopljenog pisanog ugovora sa umjetnikom.
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Umjetna inteligencija i strojno ucenje
              </h2>
              <p>
                Izricito je zabranjeno koristenje bilo kojeg vizuelnog sadrzaja sa ove stranice za treniranje modela umjetne inteligencije, strojnog ucenja, generativnih modela ili bilo kojih drugih automatizovanih sistema za stvaranje sadrzaja. Ova zabrana odnosi se na sve oblike automatizovanog prikupljanja podataka (web scraping), indeksiranja u svrhu treniranja AI modela i bilo kakve druge automatizovane obrade.
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Dizajn i razvoj web stranice
              </h2>
              <p>
                Dizajn:{" "}
                <a
                  href="mailto:edis.design@outlook.com"
                  className="text-[#c9a96e] hover:underline"
                >
                  Ed — edis.design@outlook.com
                </a>
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Odricanje od odgovornosti
              </h2>
              <p>
                Sadrzaj ove web stranice pruza se iskljucivo u informativne i promotivne svrhe. Umjetnik zadrzava pravo izmjene, dopune ili uklanjanja bilo kojeg dijela sadrzaja bez prethodne najave. Boje prikazanih umjetnickih djela mogu se razlikovati od originala usljed razlika u kalibraciji monitora.
              </p>
            </div>

            <div className="pt-6 border-t border-white/5">
              <p className="text-[#8a8580]/40 text-[13px]">
                Posljednje azuriranje: Februar 2026.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}