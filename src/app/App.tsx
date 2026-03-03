import { useState, useCallback, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { MoreHorizontal } from 'lucide-react';
import { LoadingScreen } from './components/LoadingScreen';
import { AdminProvider } from './context/AdminContext';
import { AdminToolbar } from './components/AdminToolbar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { useAdmin } from './context/AdminContext';
import { router } from './routes';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => setFadeIn(true));
    }
  }, [loading]);

  // Secret login trigger via footer dot button
  useEffect(() => {
    const handler = () => setLoginOpen(true);
    window.addEventListener('mirza:openlogin', handler);
    return () => window.removeEventListener('mirza:openlogin', handler);
  }, []);

  return (
    <AdminProvider>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {!loading && (
        <div style={{ opacity: fadeIn ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <RouterProvider router={router} />
          <AdminToolbar />
          <AdminLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
          <AdminLoginTrigger onOpen={() => setLoginOpen(true)} />
        </div>
      )}
    </AdminProvider>
  );
}

function AdminLoginTrigger({ onOpen }: { onOpen: () => void }) {
  const { isAdmin } = useAdmin();
  if (isAdmin) return null;
  return (
    <button
      onClick={onOpen}
      className="fixed bottom-8 left-8 z-[90] w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/20 hover:text-[#c9a96e] hover:border-[#c9a96e]/50 hover:bg-white/5 transition-all duration-300 cursor-pointer backdrop-blur-sm"
      title="Admin Login"
      aria-label="Admin Login"
    >
      <MoreHorizontal size={15} />
    </button>
  );
}
