import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

const ADMIN_PASSWORD = 'mirza2025';
const STORAGE_KEY = 'mirza_admin';

type AdminContextType = {
  isAdmin: boolean;
  editMode: boolean;
  toggleEditMode: () => void;
  login: (password: string) => Promise<string | null>;
  logout: () => void;
};

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  editMode: false,
  toggleEditMode: () => {},
  login: async () => null,
  logout: () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = useCallback(async (password: string): Promise<string | null> => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsAdmin(true);
      setEditMode(true);
      return null;
    }
    return 'Pogrešna lozinka.';
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAdmin(false);
    setEditMode(false);
  }, []);

  const toggleEditMode = useCallback(() => {
    setEditMode(prev => !prev);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, editMode, toggleEditMode, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
