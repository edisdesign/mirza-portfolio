import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

type AdminContextType = {
  isAdmin: boolean;
  editMode: boolean;
  toggleEditMode: () => void;
  login: (email: string, password: string) => Promise<string | null>;
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
    // Check existing session on load
    supabase.auth.getSession().then(({ data }) => {
      setIsAdmin(!!data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
      if (!session) setEditMode(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    setEditMode(true);
    return null;
  }, []);

  const logout = useCallback(() => {
    supabase.auth.signOut();
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
