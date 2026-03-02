export interface Exhibition {
  id: number;
  title: string;
  venue: string;
  location: string;
  date: string;
  type: string;
  description: string;
  details: string;
  image?: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: 1,
    title: "Tragovi",
    venue: "Zavičajni muzej Visoko",
    location: "Visoko, Bosna i Hercegovina",
    date: "2024",
    type: "Samostalna izložba",
    description:
      "Prva samostalna izložba Mirze Smajlovića u rodnom gradu. Izložba \"Tragovi\" predstavlja retrospektivni presjek rada od akademskih studija do najnovijih djela — od crteža hemijskom olovkom do monumentalnih uljanih platna.",
    details:
      "Izložba je okupila 25 radova iz perioda 2017–2024, uključujući seriju portreta, bosanskih pejzaža i enterijerskih studija. Otvorenje je popraćeno govorom profesora sa Akademije likovnih umjetnosti u Sarajevu i muzičkim programom. Izložba je bila otvorena tokom mjeseca decembra 2024.",
    image:
      "https://images.unsplash.com/photo-1742497360136-3c7f3110bc26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbiUyMG9wZW5pbmd8ZW58MXx8fHwxNzcyMjQ1NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    title: "Likovna kolonija Herceg-Novi-Sad",
    venue: "Galerija Josip Bepo Benković",
    location: "Herceg Novi, Crna Gora",
    date: "2024",
    type: "Kolonija",
    description:
      "Učešće na tradicionalnoj likovnoj koloniji koja povezuje umjetnike iz regiona. Tokom boravka u Herceg Novom, Mirza je radio na seriji marinističkih pejzaža inspirisanih jadranskom obalom.",
    details:
      "Kolonija je trajala 10 dana tokom kojih su umjetnici radili u pleneru na lokacijama oko Herceg Novog. Radovi nastali tokom kolonije izloženi su u Galeriji Josip Bepo Benković. Mirza je predstavio tri uljana platna inspirisana lukom, tvrđavom i čamcima na obali.",
    image:
      "https://images.unsplash.com/photo-1756298041997-c37748e6f0ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwY29hc3RhbCUyMHRvd24lMjBNb250ZW5lZ3JvfGVufDF8fHx8MTc3MjMxODQyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    title: "Kolektivna izložba Likum '76",
    venue: "Galerija Likum '76",
    location: "Visoko, Bosna i Hercegovina",
    date: "2023",
    type: "Grupna izložba",
    description:
      "Godišnja izložba članova Udruženja likovnih umjetnika Likum '76 iz Visokog. Mirza je predstavio nove radove iz serije bosanskih enterijerskih studija.",
    details:
      "Udruženje Likum '76 okuplja likovne umjetnike iz Visokog i šire regije. Na godišnjoj izložbi Mirza je izložio četiri rada, uključujući \"Stolicu Kraj Prozora\" i \"Atelje sa Natpisom\" — radove koji istražuju intimne prostore stvaranja.",
    image:
      "https://images.unsplash.com/photo-1551126665-79140b66286d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdHVkaW8lMjBwYWludGluZyUyMGV4aGliaXRpb258ZW58MXx8fHwxNzcyMzE4NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    title: "Savremena figuracija BiH",
    venue: "Collegium Artisticum",
    location: "Sarajevo, Bosna i Hercegovina",
    date: "2023",
    type: "Grupna izložba",
    description:
      "Grupna izložba posvećena savremenoj figurativnoj umjetnosti u Bosni i Hercegovini. Izložba je okupila mlade umjetnike koji rade u figurativnom izrazu.",
    details:
      "Održana u prestižnom prostoru Collegium Artisticum u Sarajevu, izložba je predstavila radove 12 mladih umjetnika iz BiH. Mirza je učestvovao sa tri portretne studije i jednim pejzažem, demonstrirajući raspon svog figurativnog izraza.",
    image:
      "https://images.unsplash.com/photo-1769971361672-62bf7b7354c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBnYWxsZXJ5JTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzcyMzE4NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 5,
    title: "Unutrašnji Pejzaži",
    venue: "Galerija Općine Visoko",
    location: "Visoko, Bosna i Hercegovina",
    date: "2022",
    type: "Grupna izložba",
    description:
      "Tematska grupna izložba koja istražuje koncept unutrašnjeg pejzaža — emocionalnih i psiholoških prostora koji se reflektuju u umjetničkom izrazu.",
    details:
      "Izložba je okupila 8 umjetnika iz centralne Bosne. Mirza je predstavio seriju radova koja kombinira portret i pejzaž, istražujući kako se unutrašnji emocionalni svijet manifestuje u vizualnom izrazu. Posebnu pažnju privukli su crteži hemijskom olovkom iz 2017. godine.",
    image:
      "https://images.unsplash.com/photo-1766890410688-77af00a1dc41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxsZXJ5JTIwd2FsbCUyMHBhaW50aW5ncyUyMGZyYW1lZCUyMGFydHdvcmt8ZW58MXx8fHwxNzcyMzE4NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 6,
    title: "Likovna kolonija Počitelj",
    venue: "Galerija Počitelj",
    location: "Počitelj, Bosna i Hercegovina",
    date: "2023",
    type: "Kolonija",
    description:
      "Učešće na jednoj od najstarijih i najprestižnijih likovnih kolonija u Bosni i Hercegovini. Rad u pleneru na lokacijama historijskog grada Počitelja uz Neretvu.",
    details:
      "Kolonija u Počitelju okuplja domaće i međunarodne umjetnike u ambijentu srednjovjekovnog grada. Mirza je tokom sedmodnevnog boravka naslikao seriju pejzaža uljenim bojama, fokusirajući se na kontrast stare kamene arhitekture i mediteranskog zelenila.",
    image:
      "https://images.unsplash.com/photo-1754837103621-fa43e06bf6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb3NuaWFuJTIwbGFuZHNjYXBlJTIwbWVkaWV2YWwlMjB0b3dufGVufDF8fHx8MTc3MjMxODQyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 7,
    title: "Mladi bh. umjetnici",
    venue: "Nacionalna galerija BiH",
    location: "Sarajevo, Bosna i Hercegovina",
    date: "2022",
    type: "Grupna izložba",
    description:
      "Reprezentativna izložba nove generacije likovnih umjetnika iz Bosne i Hercegovine. Selektovani radovi studenata i svježih diplomanata Akademija likovnih umjetnosti.",
    details:
      "Izložba je obuhvatila radove 18 mladih umjetnika iz Sarajeva, Banja Luke i Mostara. Mirza je predstavio dva portreta velikog formata rađena uljem na platnu, koji su privukli pažnju kritike kao primjeri savremene interpretacije klasičnog portretnog slikarstva.",
    image:
      "https://images.unsplash.com/photo-1743119638006-a01d4625745d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9uJTIwdmVybmlzc2FnZSUyMGNyb3dkfGVufDF8fHx8MTc3MjMxODQzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 8,
    title: "Likovna kolonija Jajce",
    venue: "Muzej Jajce",
    location: "Jajce, Bosna i Hercegovina",
    date: "2022",
    type: "Kolonija",
    description:
      "Tradicionalna likovna kolonija u historijskom gradu Jajcu. Plenerski rad inspirisan vodopadima, tvrđavom i kulturnim naslijeđem ovog bosanskog grada.",
    details:
      "Tokom petodnevne kolonije Mirza je radio na četiri platna u tehnici ulja na platnu. Glavni motivi bili su vodopad Plive i panorama grada sa tvrđavom. Završna izložba održana je u Muzeju grada Jajca.",
    image:
      "https://images.unsplash.com/photo-1660496852407-529030176c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjB0b3duJTIwQm9zbmlhJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MjMxODQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 9,
    title: "Simpozijum savremene grafike",
    venue: "BKC Tuzla",
    location: "Tuzla, Bosna i Hercegovina",
    date: "2022",
    type: "Simpozijum",
    description:
      "Simpozijum posvećen tehnikama savremene grafike i eksperimentalnom otisku. Radionice, predavanja i završna izložba učesnika.",
    details:
      "Mirza je učestvovao u radionici dubokog tiska i predstavio seriju eksperimentalnih grafičkih listova. Simpozijum je trajao četiri dana i okupio 15 umjetnika iz regiona. Završna izložba održana je u galeriji Bosanskog kulturnog centra u Tuzli.",
    image:
      "https://images.unsplash.com/photo-1688818228656-cccc0a933b30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludG1ha2luZyUyMHdvcmtzaG9wJTIwZ3JhcGhpYyUyMGFydHxlbnwxfHx8fDE3NzIzMTg0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 10,
    title: "Godišnja izložba ALU Sarajevo",
    venue: "Akademija likovnih umjetnosti",
    location: "Sarajevo, Bosna i Hercegovina",
    date: "2021",
    type: "Akademska izložba",
    description:
      "Godišnja izložba studenata Akademije likovnih umjetnosti u Sarajevu. Predstavljeni su najbolji radovi studenata svih odsjeka nastali tokom akademske godine.",
    details:
      "Mirza je na ovoj izložbi predstavio seriju crteža velikog formata rađenih hemijskom olovkom na papiru. Radovi su nastali kao dio studijskog programa portretnog i figurativnog crteža. Izložba je bila otvorena u prostorima Akademije tokom juna 2021.",
    image:
      "https://images.unsplash.com/photo-1759823420520-546e46818322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYXJ0JTIwYWNhZGVteSUyMHN0dWRlbnRzfGVufDF8fHx8MTc3MjMxODQyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 11,
    title: "Likovna kolonija Travnik",
    venue: "Zavičajni muzej Travnik",
    location: "Travnik, Bosna i Hercegovina",
    date: "2021",
    type: "Kolonija",
    description:
      "Likovna kolonija u gradu vezira — Travniku. Plenerski rad u historijskom ambijentu sa fokusom na orijentalnu arhitekturu i pejzaže centralne Bosne.",
    details:
      "Kolonija je okupila 12 umjetnika iz BiH i regiona. Mirza je naslikao tri uljana platna inspirisana Šarenom džamijom, Sulejmanija bibliotekom i panoramom Travnika sa Bijele tvrđave. Radovi su izloženi u Zavičajnom muzeju.",
    image:
      "https://images.unsplash.com/photo-1769866709683-033d7d437f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwbGVpbiUyMGFpciUyMHBhaW50aW5nJTIwb3V0ZG9vcnN8ZW58MXx8fHwxNzcyMzE4NDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 12,
    title: "Zimski salon",
    venue: "Galerija Općine Visoko",
    location: "Visoko, Bosna i Hercegovina",
    date: "2021",
    type: "Grupna izložba",
    description:
      "Tradicionalni Zimski salon likovnih umjetnika Visokog i okoline. Godišnji presjek stvaralaštva lokalnih umjetnika.",
    details:
      "Na Zimskom salonu Mirza je izložio pet radova iz serije enterijerskih studija — intimnih scena koje prikazuju ateljee, sobe i kutke svakodnevnog života. Poseban akcenat stavljen je na igru prirodnog svjetla i sjene u zatvorenom prostoru.",
    image:
      "https://images.unsplash.com/photo-1731652469571-32de25beca06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBwYWludGluZyUyMGNhbnZhcyUyMGNsb3NlJTIwdXAlMjBicnVzaHxlbnwxfHx8fDE3NzIzMTg0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 13,
    title: "Likovna kolonija Konjic",
    venue: "Galerija Konjic",
    location: "Konjic, Bosna i Hercegovina",
    date: "2021",
    type: "Kolonija",
    description:
      "Likovna kolonija na obalama Neretve u Konjicu. Plenerski rad fokusiran na pejzaže rijeke, Starog mosta i brdskog okruženja.",
    details:
      "Sedmodnevna kolonija omogućila je Mirzi da istraži raznolikost motiva konjičkog kraja. Nastala su dva velika uljana platna i serija studija olovkom. Izložba je organizovana u Galeriji Konjic uz prisustvo lokalnih i regionalnih ljubitelja umjetnosti.",
    image:
      "https://images.unsplash.com/photo-1748793925818-8a1f65e9e8d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBlYXNlbCUyMGNhbnZhcyUyMHBsZWluJTIwYWlyJTIwcml2ZXJ8ZW58MXx8fHwxNzcyMzE4NDM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 14,
    title: "Proljetni salon mladih",
    venue: "Dom mladih Sarajevo",
    location: "Sarajevo, Bosna i Hercegovina",
    date: "2020",
    type: "Grupna izložba",
    description:
      "Izložba mladih umjetnika u organizaciji Doma mladih Sarajevo. Fokus na svježe pristupe figuraciji, pejzažu i apstrakciji.",
    details:
      "Mirza je predstavio rad iz serije portreta rađenih tehnikom ulja na platnu. Izložba je okupila 20 mladih umjetnika iz Sarajeva i okolnih gradova. Proljetni salon je tradicionalna platforma za promociju mladih likovnih talenata u BiH.",
    image:
      "https://images.unsplash.com/photo-1761403799063-a5261ba9c1d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGFydCUyMGV4aGliaXRpb24lMjBjb250ZW1wb3Jhcnl8ZW58MXx8fHwxNzcyMzE4NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 15,
    title: "Crtež kao temelj",
    venue: "Akademija likovnih umjetnosti",
    location: "Sarajevo, Bosna i Hercegovina",
    date: "2020",
    type: "Akademska izložba",
    description:
      "Tematska izložba posvećena crtežu kao temeljnoj disciplini likovne umjetnosti. Predstavljeni su studentski radovi koji demonstriraju virtuoznost u crtačkim tehnikama.",
    details:
      "Mirza je izložio šest crteža hemijskom olovkom velikog formata — detaljne portretne i figurativne studije koje svjedoče o preciznosti i strpljenju. Radovi su nastali tokom dvosemestralnog kursa akademskog crteža pod mentorstvom profesora Safeta Zeca.",
    image:
      "https://images.unsplash.com/photo-1765029582782-8b53b4ae41bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmF3aW5nJTIwY2hhcmNvYWwlMjBwb3J0cmFpdCUyMHNrZXRjaHxlbnwxfHx8fDE3NzIzMTg0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 16,
    title: "Likovna kolonija Stolac",
    venue: "Galerija Stolac",
    location: "Stolac, Bosna i Hercegovina",
    date: "2020",
    type: "Kolonija",
    description:
      "Likovna kolonija u starom gradu Stocu na rijeci Bregavi. Plenerski rad inspirisan nekropolama stećaka, kamenim kućama i hercegovačkim krajolikom.",
    details:
      "Kolonija je trajala šest dana. Mirza je radio na tri uljana platna i nizu crtačkih studija. Posebno se istaknuo rad inspirisan nekropolom stećaka Radimlja, koji kombinira savremeni slikarski pristup sa historijskim motivima.",
    image:
      "https://images.unsplash.com/photo-1755632337178-09d52743cdff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBzdG9uZSUyMGZvcnRyZXNzJTIwaGlzdG9yaWMlMjB0b3dufGVufDF8fHx8MTc3MjMxODQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 17,
    title: "Regionalni likovni susreti",
    venue: "Kulturni centar Zenica",
    location: "Zenica, Bosna i Hercegovina",
    date: "2019",
    type: "Grupna izložba",
    description:
      "Regionalni likovni susreti koji okupljaju umjetnike iz gradova centralne Bosne. Izložba i predavanja o stanju savremene likovne scene.",
    details:
      "Mirza je učestvovao sa dva crteža tušem i jednim uljanim platnom. Susreti su organizovani u Kulturnom centru Zenice i trajali su tri dana. Pored izložbe, održana su i predavanja o aktuelnim tendencijama u bh. likovnoj umjetnosti.",
    image:
      "https://images.unsplash.com/photo-1762780087351-703502cdb85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGNlbnRlciUyMGJ1aWxkaW5nJTIwbW9kZXJufGVufDF8fHx8MTc3MjMxODQzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 18,
    title: "Studentska izložba — Odjel za slikarstvo",
    venue: "Akademija likovnih umjetnosti",
    location: "Sarajevo, Bosna i Hercegovina",
    date: "2019",
    type: "Akademska izložba",
    description:
      "Izložba studenata Odjela za slikarstvo ALU Sarajevo. Predstavljeni su radovi nastali tokom akademske godine kao dio redovnog studijskog programa.",
    details:
      "Mirza je predstavio četiri portreta velikog formata i jednu figurativnu kompoziciju. Radovi su nastali u ateljeu Akademije pod mentorstvom profesora sa katedre za slikarstvo. Izložba je bila otvorena tokom sedmice otvorenih vrata ALU.",
    image:
      "https://images.unsplash.com/photo-1596649300028-340ad0ec6146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxsZXJ5JTIwb3BlbmluZyUyMG5pZ2h0JTIwYXJ0JTIwcmVjZXB0aW9ufGVufDF8fHx8MTc3MjMxODQzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 19,
    title: "Likovna kolonija Fojnica",
    venue: "Franjevački samostan Fojnica",
    location: "Fojnica, Bosna i Hercegovina",
    date: "2019",
    type: "Kolonija",
    description:
      "Likovna kolonija u ambijentu Franjevačkog samostana u Fojnici. Rad inspirisan bogatom historijom i prirodnom ljepotom ovog bosanskog gradića.",
    details:
      "Mirza je tokom petodnevne kolonije naslikao dva pejzaža uljenim bojama i napravio seriju crtačkih studija arhitekture samostana. Radovi su izloženi u prostoru samostana koji čuva jednu od najznačajnijih zbirki umjetnina u BiH.",
    image:
      "https://images.unsplash.com/photo-1729176990188-b11bdb3d902a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25hc3RlcnklMjBoZXJpdGFnZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzIzMTg0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 20,
    title: "Prve linije — Debitantska izložba",
    venue: "Galerija Općine Visoko",
    location: "Visoko, Bosna i Hercegovina",
    date: "2018",
    type: "Grupna izložba",
    description:
      "Debitantska izložba mladih likovnih talenata iz Visokog. Prve javne prezentacije radova studenata likovnih akademija iz regiona.",
    details:
      "Mirza je prvi put javno izložio svoje radove — pet crteža hemijskom olovkom na papiru koji prikazuju detaljne portretne studije. Izložba je organizovana u saradnji sa Udruženjem Likum '76 i predstavljala je njegov prvi korak u profesionalnom likovnom svijetu.",
    image:
      "https://images.unsplash.com/photo-1596649300028-340ad0ec6146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxsZXJ5JTIwb3BlbmluZyUyMG5pZ2h0JTIwYXJ0JTIwcmVjZXB0aW9ufGVufDF8fHx8MTc3MjMxODQzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];
