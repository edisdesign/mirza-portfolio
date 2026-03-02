import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Instagram, MapPin, MessageCircle, ChevronDown, Check } from "lucide-react";

const PHONE = "+387603013005";
const EMAIL = "slikarsmajlovic@gmail.com";

const TOPICS = [
  { value: "", label: "Izaberite temu" },
  { value: "purchase", label: "Kupovina rada" },
  { value: "commission", label: "Komisija" },
  { value: "exhibition", label: "Izložba / Saradnja" },
  { value: "press", label: "Press / Mediji" },
  { value: "other", label: "Drugo" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [sent, setSent] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedLabel = TOPICS.find((t) => t.value === form.topic)?.label || "Izaberite temu";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const topicLabel = TOPICS.find((t) => t.value === form.topic)?.label || "";
    const subject = encodeURIComponent(
      topicLabel ? `${topicLabel} — Poruka sa web stranice` : "Poruka sa web stranice"
    );
    const body = encodeURIComponent(
      `Ime: ${form.name}\nEmail: ${form.email}\nTema: ${topicLabel}\n\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.3em] uppercase mb-6">
              Kontakt
            </p>
            <h2 className="font-['Outfit'] text-[#f5f0eb] text-[36px] md:text-[56px] leading-tight mb-8" style={{ fontWeight: 800 }}>
              Hajde da
              <br />
              <span className="text-[#c9a96e]">razgovaramo</span>
            </h2>
            <p className="text-[#8a8580] font-['Outfit'] text-[15px] leading-relaxed max-w-md mb-12" style={{ fontWeight: 300 }}>
              Zainteresovani ste za kupovinu, saradnju ili komisiju?
              Slobodno me kontaktirajte — volim da čujem od ljudi koji
              dele strast prema umetnosti.
            </p>

            <div className="space-y-6">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-4 text-[#f5f0eb] hover:text-[#c9a96e] transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#c9a96e]/40 transition-colors duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-['Outfit'] text-[14px]">{EMAIL}</p>
                  <p className="text-[#8a8580] font-['Outfit'] text-[12px]" style={{ fontWeight: 300 }}>
                    Email
                  </p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/mirzasmajlovich/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[#f5f0eb] hover:text-[#c9a96e] transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#c9a96e]/40 transition-colors duration-300">
                  <Instagram size={18} />
                </div>
                <div>
                  <p className="font-['Outfit'] text-[14px]">@mirzasmajlovich</p>
                  <p className="text-[#8a8580] font-['Outfit'] text-[12px]" style={{ fontWeight: 300 }}>
                    Instagram
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Pozdrav! Zanima me vaš rad.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[#f5f0eb] hover:text-[#c9a96e] transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#c9a96e]/40 transition-colors duration-300">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="font-['Outfit'] text-[14px]">+387 60 30 13 005</p>
                  <p className="text-[#8a8580] font-['Outfit'] text-[12px]" style={{ fontWeight: 300 }}>
                    WhatsApp
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-[#f5f0eb] group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-['Outfit'] text-[14px]">Visoko, Bosna i Hercegovina</p>
                  <p className="text-[#8a8580] font-['Outfit'] text-[12px]" style={{ fontWeight: 300 }}>
                    Atelje
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="text-[#8a8580] font-['Inter'] text-[12px] tracking-[0.15em] uppercase block mb-3">
                  Ime
                </label>
                <input
                  type="text"
                  placeholder="Vaše ime"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/10 focus:border-[#c9a96e] text-[#f5f0eb] font-['Inter'] text-[15px] pb-3 outline-none transition-colors duration-300 placeholder:text-[#8a8580]/40"
                />
              </div>
              <div>
                <label className="text-[#8a8580] font-['Inter'] text-[12px] tracking-[0.15em] uppercase block mb-3">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="vas@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/10 focus:border-[#c9a96e] text-[#f5f0eb] font-['Inter'] text-[15px] pb-3 outline-none transition-colors duration-300 placeholder:text-[#8a8580]/40"
                />
              </div>
              <div className="relative">
                <label className="text-[#8a8580] font-['Inter'] text-[12px] tracking-[0.15em] uppercase block mb-3">
                  Tema
                </label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`w-full text-left bg-transparent border-b pb-3 font-['Inter'] text-[15px] outline-none transition-colors duration-300 flex items-center justify-between cursor-pointer ${
                    form.topic
                      ? "text-[#f5f0eb] border-white/10"
                      : "text-[#8a8580]/40 border-white/10"
                  } ${dropdownOpen ? "border-[#c9a96e]" : ""}`}
                >
                  <span>{selectedLabel}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#8a8580] transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#151515] border border-white/10 z-30 overflow-hidden">
                    {TOPICS.filter((t) => t.value !== "").map((topic) => (
                      <button
                        key={topic.value}
                        type="button"
                        onClick={() => {
                          setForm({ ...form, topic: topic.value });
                          setDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-5 py-3.5 font-['Inter'] text-[14px] transition-all duration-200 cursor-pointer border-b border-white/5 last:border-b-0 ${
                          form.topic === topic.value
                            ? "bg-[#c9a96e]/10 text-[#c9a96e]"
                            : "text-[#8a8580] hover:text-[#f5f0eb] hover:bg-white/[0.03]"
                        }`}
                      >
                        {topic.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="text-[#8a8580] font-['Inter'] text-[12px] tracking-[0.15em] uppercase block mb-3">
                  Poruka
                </label>
                <textarea
                  rows={4}
                  placeholder="Vaša poruka..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b border-white/10 focus:border-[#c9a96e] text-[#f5f0eb] font-['Inter'] text-[15px] pb-3 outline-none transition-colors duration-300 resize-none placeholder:text-[#8a8580]/40"
                />
              </div>

              {sent ? (
                <div className="inline-flex items-center gap-3 px-10 py-4 border border-green-500/30 text-green-400 font-['Inter'] text-[12px] tracking-[0.2em] uppercase mt-4">
                  <Check size={16} />
                  Email klijent otvoren
                </div>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-[#c9a96e] text-[#0a0a0a] px-10 py-4 font-['Inter'] text-[12px] tracking-[0.2em] uppercase hover:bg-[#d4b87a] transition-all duration-300 cursor-pointer mt-4"
                >
                  Pošalji poruku
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}