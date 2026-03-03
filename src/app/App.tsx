import { useState, useCallback, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { LoadingScreen } from './components/LoadingScreen';
import { AdminProvider } from './context/AdminContext';
import { AdminToolbar } from './components/AdminToolbar';
import { AdminLoginModal } from './components/AdminLoginModal';
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
        </div>
      )}
    </AdminProvider>
  );
}

