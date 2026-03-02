import { Link } from "react-router";
import svgPaths from "../../imports/svg-b9tvxp02ga";

function Signature({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 406.372 96.618"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <g clipPath="url(#clip0_footer)">
        <path
          d={svgPaths.p1c3cc380}
          fill="currentColor"
          fillOpacity="0.97"
        />
        <path
          d={svgPaths.p2ac06900}
          fill="currentColor"
          fillOpacity="0.98"
        />
        <path
          d={svgPaths.p3cbfdff1}
          fill="currentColor"
          fillOpacity="0.99"
        />
        <path
          d={svgPaths.p311f4440}
          fill="currentColor"
          fillOpacity="0.98"
        />
        <path
          d={svgPaths.pd6a9000}
          fill="currentColor"
          fillOpacity="0.97"
        />
        <path d={svgPaths.p17339b80} fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_footer">
          <rect fill="white" height="96.618" width="406.372" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Signature SVG instead of text */}
          <div className="text-[#f5f0eb]/40 hover:text-[#c9a96e]/60 transition-colors duration-500">
            <Signature className="h-[28px] w-auto" />
          </div>
          <div className="flex items-center gap-8">
            <a
              href="https://www.instagram.com/mirzasmajlovich/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8a8580] hover:text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="mailto:slikarsmajlovic@gmail.com"
              className="text-[#8a8580] hover:text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Email
            </a>
            <a
              href="https://wa.me/387603013005"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8a8580] hover:text-[#c9a96e] font-['Outfit'] text-[12px] tracking-[0.15em] uppercase transition-colors duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <div className="flex items-center gap-6">
            <Link
              to="/impresum"
              className="text-[#8a8580]/50 hover:text-[#8a8580] font-['Outfit'] text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Impresum
            </Link>
            <Link
              to="/politika-privatnosti"
              className="text-[#8a8580]/50 hover:text-[#8a8580] font-['Outfit'] text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Politika privatnosti
            </Link>
          </div>
          <p className="text-[#8a8580]/40 font-['Outfit'] text-[12px]">
            &copy; 2026 Sva prava zadržana
          </p>
          <div className="flex items-center gap-3">
            <a
              href="mailto:edis.design@outlook.com"
              className="text-[#8a8580]/30 hover:text-[#c9a96e]/60 font-['Outfit'] text-[11px] tracking-[0.1em] transition-colors duration-300"
            >
              Designed by Ed
            </a>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('mirza:openlogin'))}
              className="w-2 h-2 rounded-full bg-transparent hover:bg-[#c9a96e]/20 transition-colors duration-300 cursor-pointer"
              title=""
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
