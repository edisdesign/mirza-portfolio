import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { Menu, X, Instagram, MessageCircle } from "lucide-react";
import svgPaths from "../../imports/svg-b9tvxp02ga";

function SignatureLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 406.372 96.618"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <g clipPath="url(#clip0_nav)">
        <path d={svgPaths.p1c3cc380} fill="currentColor" fillOpacity="0.97" />
        <path d={svgPaths.p2ac06900} fill="currentColor" fillOpacity="0.98" />
        <path d={svgPaths.p3cbfdff1} fill="currentColor" fillOpacity="0.99" />
        <path d={svgPaths.p311f4440} fill="currentColor" fillOpacity="0.98" />
        <path d={svgPaths.pd6a9000} fill="currentColor" fillOpacity="0.97" />
        <path d={svgPaths.p17339b80} fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_nav">
          <rect fill="white" height="96.618" width="406.372" />
        </clipPath>
      </defs>
    </svg>
  );
}

const navLinks = [
  { label: "Radovi", href: "/radovi" },
  { label: "O meni", anchor: "#about" },
  { label: "Izložbe", href: "/izlozbe" },
  { label: "Kontakt", anchor: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (link: (typeof navLinks)[0]) => {
    setMobileOpen(false);

    if (link.href) {
      navigate(link.href);
      return;
    }

    if (link.anchor) {
      if (location.pathname !== "/") {
        navigate("/" + link.anchor);
      } else {
        const el = document.querySelector(link.anchor);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const goHome = () => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <button
            onClick={goHome}
            className="text-[#f5f0eb] hover:text-[#c9a96e] transition-colors duration-300 cursor-pointer"
            aria-label="Početna stranica – Mirza Smajlović"
          >
            <SignatureLogo className="h-[31px] md:h-[36px] w-auto" />
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = link.href
                ? location.pathname.startsWith(link.href)
                : link.anchor === "#about"
                ? location.pathname === "/" && false
                : false;
              return (
                <button
                  key={link.label}
                  onClick={() => handleClick(link)}
                  className={`transition-colors duration-300 font-['Outfit'] text-[13px] tracking-[0.15em] uppercase cursor-pointer ${
                    isActive
                      ? "text-[#c9a96e]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#f5f0eb] cursor-pointer"
            aria-label={mobileOpen ? "Zatvori meni" : "Otvori meni"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => {
              const isActive = link.href
                ? location.pathname.startsWith(link.href)
                : false;
              return (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleClick(link)}
                  className={`font-['Outfit'] text-[28px] tracking-wider cursor-pointer ${
                    isActive ? "text-[#c9a96e]" : "text-[#f5f0eb]"
                  }`}
                  style={{ fontWeight: 300 }}
                >
                  {link.label}
                </motion.button>
              );
            })}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6 mt-6"
            >
              <a
                href="https://www.instagram.com/mirzasmajlovich/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-[#8a8580] hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/387603013005"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-[#8a8580] hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}