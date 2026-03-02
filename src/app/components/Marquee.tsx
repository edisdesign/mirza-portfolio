import { motion } from "motion/react";

const items = [
  "Apstrakcija",
  "Ulje na platnu",
  "Emocija",
  "Svetlost",
  "Tekstura",
  "Kompozicija",
  "Boja",
  "Meditacija",
];

export function Marquee() {
  return (
    <div className="py-16 overflow-hidden border-y border-white/5">
      <div
        className="flex gap-8 whitespace-nowrap animate-marquee-fast"
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-['Outfit'] text-[48px] md:text-[72px] text-white/[0.04] flex items-center gap-8"
            style={{
              fontWeight: 800,
              transform: "scaleY(1.15)",
              transformOrigin: "center",
            }}
          >
            {item}
            <span className="w-2 h-2 rounded-full bg-[#c9a96e]/20 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}