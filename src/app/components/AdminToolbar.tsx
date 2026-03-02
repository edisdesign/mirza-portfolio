import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Eye, Edit3, Plus } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useState } from 'react';
import { WorkEditModal } from './WorkEditModal';
import { ExhibitionEditModal } from './ExhibitionEditModal';

export function AdminToolbar() {
  const { isAdmin, editMode, toggleEditMode, logout } = useAdmin();
  const [addWork, setAddWork] = useState(false);
  const [addExh, setAddExh] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] flex items-center gap-2 bg-[#111] border border-[#c9a96e]/40 px-4 py-3 shadow-2xl"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          {/* Edit mode toggle */}
          <button
            onClick={toggleEditMode}
            className={`flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-['Outfit'] font-semibold transition-all cursor-pointer ${
              editMode
                ? 'bg-[#c9a96e] text-[#0a0a0a]'
                : 'text-[#c9a96e] border border-[#c9a96e]/30 hover:bg-[#c9a96e]/10'
            }`}
          >
            {editMode ? <Edit3 size={13} /> : <Eye size={13} />}
            {editMode ? 'Edit mod' : 'Pregledaj'}
          </button>

          {editMode && (
            <>
              <div className="w-px h-6 bg-white/10" />
              <button
                onClick={() => setAddWork(true)}
                className="flex items-center gap-2 px-3 py-2 text-[11px] tracking-[0.15em] uppercase font-['Outfit'] text-[#f5f0eb] hover:text-[#c9a96e] transition-colors cursor-pointer"
              >
                <Plus size={13} />
                Rad
              </button>
              <button
                onClick={() => setAddExh(true)}
                className="flex items-center gap-2 px-3 py-2 text-[11px] tracking-[0.15em] uppercase font-['Outfit'] text-[#f5f0eb] hover:text-[#c9a96e] transition-colors cursor-pointer"
              >
                <Plus size={13} />
                Izložba
              </button>
            </>
          )}

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

      {addWork && <WorkEditModal work={null} onClose={() => setAddWork(false)} />}
      {addExh && <ExhibitionEditModal exhibition={null} onClose={() => setAddExh(false)} />}
    </>
  );
}
