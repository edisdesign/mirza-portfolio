import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AdminLoginModal({ open, onClose }: Props) {
  const { login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password) return;
    setLoading(true);
    setError('');
    const err = await login(password);
    setLoading(false);
    if (err) {
      setError('Pogrešna lozinka. Pokušajte ponovo.');
    } else {
      onClose();
      setPassword('');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#111] border border-white/10 p-10 w-full max-w-md z-10"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#c9a96e]/50 transition-colors cursor-pointer"
            >
              <X size={16} className="text-[#f5f0eb]" />
            </button>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 border border-[#c9a96e]/30 bg-[#c9a96e]/10 flex items-center justify-center">
                <Lock size={16} className="text-[#c9a96e]" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] font-['Outfit']">Admin</p>
                <h2 className="text-[20px] font-['Outfit'] font-bold text-[#f5f0eb]">Prijava</h2>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#8a8580] mb-2 font-['Outfit']">Lozinka</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  className="w-full bg-[#0a0a0a] border border-white/10 text-[#f5f0eb] px-4 py-3 text-[14px] font-['Outfit'] outline-none focus:border-[#c9a96e]/40 transition-colors"
                  placeholder="••••••••"
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <p className="text-[#f87171] text-[13px] mb-4 font-['Outfit']">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#c9a96e] text-[#0a0a0a] py-3.5 text-[11px] tracking-[0.2em] uppercase font-bold font-['Outfit'] hover:opacity-85 transition-opacity disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Prijava...' : 'Prijavi se →'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
