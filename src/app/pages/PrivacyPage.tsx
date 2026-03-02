import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle";

export function PrivacyPage() {
  usePageTitle("Politika privatnosti");
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
            Politika privatnosti
          </h1>
          <div className="w-16 h-[2px] bg-[#c9a96e]/40 mb-12" />

          <div className="space-y-10 text-[#8a8580] font-['Inter'] text-[15px] leading-relaxed">
            <div>
              <p>
                Ova politika privatnosti objasnjava kako web stranica umjetnika Mirze Smajlovica prikuplja, koristi i stiti vase licne podatke. Posjecivanjem ove stranice prihvatate uslove opisane u ovom dokumentu.
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Odgovorno lice za obradu podataka
              </h2>
              <p>
                Mirza Smajlovic, slobodni umjetnik
                <br />
                E-mail:{" "}
                <a
                  href="mailto:slikarsmajlovic@gmail.com"
                  className="text-[#c9a96e] hover:underline"
                >
                  slikarsmajlovic@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Koje podatke prikupljamo
              </h2>
              <p>
                Ova web stranica moze prikupljati sljedece podatke:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-[#8a8580]/80">
                <li>
                  <span className="text-[#8a8580]">Podatke iz kontakt forme</span> — ime, e-mail adresu i sadrzaj poruke koju nam dobrovoljno posaljete
                </li>
                <li>
                  <span className="text-[#8a8580]">Tehnicke podatke</span> — IP adresu, tip preglednika, operativni sistem i druge tehnicke informacije koje vas preglednik automatski salje prilikom posjete
                </li>
                <li>
                  <span className="text-[#8a8580]">Kolacice (cookies)</span> — male tekstualne datoteke koje se pohranjuju na vasem uredjaju radi poboljsanja korisnickog iskustva
                </li>
              </ul>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Svrha prikupljanja podataka
              </h2>
              <p>Vasi podaci se koriste iskljucivo u sljedece svrhe:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-[#8a8580]/80">
                <li>Odgovaranje na vase upite putem kontakt forme</li>
                <li>Komunikacija u vezi sa mogucim narudzbama ili saradnjom</li>
                <li>Poboljsanje funkcionalnosti i korisnickog iskustva web stranice</li>
                <li>Anonimna statisticka analiza posjeta</li>
              </ul>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Dijeljenje podataka s trecim stranama
              </h2>
              <p>
                Vasi licni podaci nece biti prodati, iznajmljeni niti na bilo koji drugi nacin ustupljeni trecim stranama bez vase izrucite saglasnosti, osim u slucajevima kada to zahtijeva zakon.
              </p>
              <p className="mt-4">
                Ova stranica moze koristiti usluge trecih strana (npr. hosting provajder, analiticki alati) koji imaju pristup odredjenim tehnickim podacima iskljucivo u svrhu pruzanja svojih usluga, a obavezani su na povjerljivost i zastitu podataka.
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Kolacici (cookies)
              </h2>
              <p>
                Ova stranica koristi kolacice za osnovne funkcionalnosti. Koristeci ovu stranicu, pristajete na upotrebu kolacica. Mozete podesiti vas preglednik da odbija kolacice, ali to moze uticati na funkcionalnost stranice.
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Vasa prava
              </h2>
              <p>U skladu sa vazecim zakonima o zastiti podataka, imate pravo da:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-[#8a8580]/80">
                <li>Zatrazite uvid u licne podatke koje posjedujemo o vama</li>
                <li>Zatrazite ispravku netacnih podataka</li>
                <li>Zatrazite brisanje vasih licnih podataka</li>
                <li>Povucete saglasnost za obradu podataka u bilo kojem trenutku</li>
                <li>Podnesete zalbu nadleznom organu za zastitu licnih podataka</li>
              </ul>
              <p className="mt-4">
                Za ostvarivanje bilo kojeg od navedenih prava, kontaktirajte nas putem e-maila:{" "}
                <a
                  href="mailto:slikarsmajlovic@gmail.com"
                  className="text-[#c9a96e] hover:underline"
                >
                  slikarsmajlovic@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Zastita autorskih djela
              </h2>
              <p>
                Posebno naglasavamo da je zabranjeno preuzimanje, cuvanje, reprodukcija ili dijeljenje fotografija umjetnickih djela prikazanih na ovoj stranici bez pisane dozvole umjetnika. Neovlasteno koristenje slika predstavlja krsenje autorskih prava i podlijeze zakonskim sankcijama. Za vise informacija pogledajte nas{" "}
                <Link to="/impresum" className="text-[#c9a96e] hover:underline">
                  Impresum
                </Link>
                .
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Sigurnost podataka
              </h2>
              <p>
                Preduzimamo odgovarajuce tehnicke i organizacione mjere za zastitu vasih licnih podataka od neovlastenog pristupa, gubitka, unistenja ili izmjene. Medjutim, nijedan prenos podataka putem interneta ne moze biti garantovano siguran.
              </p>
            </div>

            <div>
              <h2
                className="font-['Outfit'] text-[#f5f0eb]/80 text-[18px] mb-4 tracking-[0.05em]"
                style={{ fontWeight: 600 }}
              >
                Izmjene politike privatnosti
              </h2>
              <p>
                Zadrzavamo pravo izmjene ove politike privatnosti u bilo kojem trenutku. Sve izmjene stupaju na snagu momentom objavljivanja na ovoj stranici. Preporucujemo da povremeno provjerite ovu stranicu radi eventualnih azuriranja.
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