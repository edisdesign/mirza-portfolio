import { Link } from 'react-router';
import { MoreHorizontal } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export function Footer() {
  const { isAdmin } = useAdmin();

  const handleAdminTrigger = () => {
    if (!isAdmin) {
      window.dispatchEvent(new Event('mirza:openlogin'));
    }
  };

  return (
    <footer className="bg-[#0a0a0a] py-12 px-6 md:px-12 border-t border-white/5 relative">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="flex items-center gap-3">
            <p className="text-[#8a8580] font-['Outfit'] text-[14px]">
              © {new Date().getFullYear()} Mirza Smajlović. Sva prava zadržana.
            </p>
            {!isAdmin && (
              <button
                onClick={handleAdminTrigger}
                className="w-7 h-7 flex items-center justify-center text-white/15 hover:text-[#c9a96e] transition-colors duration-300 cursor-pointer"
                title="Admin"
                aria-label="Admin Login"
              >
                <MoreHorizontal size={14} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-6">
            <Link to="/politika-privatnosti" className="text-[#8a8580] hover:text-[#c9a96e] transition-colors text-[14px]">
              Politika privatnosti
            </Link>
            <Link to="/impresum" className="text-[#8a8580] hover:text-[#c9a96e] transition-colors text-[14px]">
              Impresum
            </Link>
          </div>
        </div>

        <div>
          <a
            href="mailto:edis.design@outlook.com"
            className="text-[#444] hover:text-[#c9a96e] font-['Outfit'] text-[12px] tracking-widest uppercase transition-colors duration-300"
          >
            Designed by Ed
          </a>
        </div>
      </div>
    </footer>
  );
}