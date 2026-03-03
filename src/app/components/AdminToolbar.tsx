import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Settings } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useState } from 'react';
import { AdminPanel } from './AdminPanel';

export function AdminToolbar() {
  const { isAdmin, logout } = useAdmin();
  const [panelOpen, setPanelOpen] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] flex items-center gap-2 bg-[#111]/95 border border-[#c9a96e]/40 px-4 py-3 shadow-2xl"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          <button
            onClick={() => setPanelOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-['Outfit'] font-semibold bg-[#c9a96e] text-[#0a0a0a] hover:bg-[#b8955e] transition-all cursor-pointer"
          >
            <Settings size={13} />
            Admin Panel
          </button>

          <div className="w-px h-6 bg-white/10" />

          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 text-[11px] text-[#8a8580] hover:text-[#f87171] transition-colors cursor-pointer"
            title="Odjava"
          >
            <LogOut size={13} />
          </button>
        </motion.div>
      </AnimatePresence>

      <AdminPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}
