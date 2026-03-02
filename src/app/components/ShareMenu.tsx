import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Share2, Link2, Check, MessageCircle, Instagram } from "lucide-react";

interface ShareMenuProps {
  title: string;
  text: string;
  url: string;
}

export function ShareMenu({ title, text, url }: ShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        setOpen(false);
      } catch {
        // User cancelled or not supported
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1500);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1500);
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;

  // Instagram doesn't have a direct web share URL, but we can open Instagram DM
  // The best approach is to copy the link first, then open Instagram
  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // silent fail
    }
    window.open("https://www.instagram.com/direct/inbox/", "_blank");
    setOpen(false);
  };

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => {
          if (hasNativeShare && window.innerWidth < 768) {
            handleNativeShare();
          } else {
            setOpen(!open);
          }
        }}
        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#8a8580] hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all duration-300 cursor-pointer"
        aria-label="Podijeli"
      >
        <Share2 size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-3 w-56 bg-[#151515] border border-white/10 z-50 overflow-hidden shadow-xl shadow-black/30"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5">
              <p className="font-['Outfit'] text-[#8a8580] text-[11px] tracking-[0.15em] uppercase">
                Podijeli
              </p>
            </div>

            {/* WhatsApp */}
            <button
              onClick={() => {
                window.open(whatsappShareUrl, "_blank");
                setOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3.5 text-left text-[#f5f0eb] hover:bg-white/[0.04] transition-colors duration-200 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={14} className="text-[#25D366]" />
              </div>
              <span className="font-['Inter'] text-[13px]">WhatsApp</span>
            </button>

            {/* Instagram DM */}
            <button
              onClick={handleInstagramShare}
              className="flex items-center gap-3 w-full px-4 py-3.5 text-left text-[#f5f0eb] hover:bg-white/[0.04] transition-colors duration-200 cursor-pointer border-t border-white/5"
            >
              <div className="w-8 h-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center flex-shrink-0">
                <Instagram size={14} className="text-[#E1306C]" />
              </div>
              <div>
                <span className="font-['Inter'] text-[13px] block">Instagram DM</span>
                <span className="font-['Inter'] text-[10px] text-[#8a8580]">
                  Link se kopira automatski
                </span>
              </div>
            </button>

            {/* Copy link */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-3 w-full px-4 py-3.5 text-left text-[#f5f0eb] hover:bg-white/[0.04] transition-colors duration-200 cursor-pointer border-t border-white/5"
            >
              <div className="w-8 h-8 rounded-full bg-[#c9a96e]/10 flex items-center justify-center flex-shrink-0">
                {copied ? (
                  <Check size={14} className="text-[#c9a96e]" />
                ) : (
                  <Link2 size={14} className="text-[#c9a96e]" />
                )}
              </div>
              <span className="font-['Inter'] text-[13px]">
                {copied ? "Kopirano!" : "Kopiraj link"}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
