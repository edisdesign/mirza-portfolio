import { Link } from 'react-router';
import { MoreHorizontal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] py-12 px-6 md:px-12 border-t border-white/5 relative">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <p className="text-[#8a8580] font-['Outfit'] text-[14px]">
            © {new Date().getFullYear()} Mirza Smajlović. Sva prava zadržana.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privatnost" className="text-[#8a8580] hover:text-[#c9a96e] transition-colors text-[14px]">
              Politika privatnosti
            </Link>
            <Link to="/impresum" className="text-[#8a8580] hover:text-[#c9a96e] transition-colors text-[14px]">
              Impresum
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-[#444] font-['Outfit'] text-[12px] tracking-widest uppercase">
            Designed by Ed
          </p>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('mirza:openlogin'))}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-white/20 hover:text-[#c9a96e] hover:border-[#c9a96e] hover:bg-white/5 transition-all duration-300"
            title="Admin Login"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}