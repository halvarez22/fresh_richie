import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
  role: 'admin' | 'editor';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Limpiar cualquier sesión existente al cargar
    localStorage.removeItem('fresh-richie-admin');
    localStorage.removeItem('fresh-richie-session-time');
    setUser(null);
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    console.log('Intentando login con:', username, password);
    
    // Credenciales hardcodeadas para simplicidad
    // En producción, esto debería conectarse a un backend seguro
    if (username === 'admin' && password === 'admin') {
      console.log('Credenciales válidas, estableciendo usuario');
      const userData: User = {
        username: 'admin',
        role: 'admin'
      };
      setUser(userData);
      console.log('Usuario establecido:', userData);
      return true;
    }
    console.log('Credenciales inválidas');
    return false;
  };

  const logout = () => {
    console.log('🔴 Cerrando sesión - Limpiando estado de autenticación');
    setUser(null);
    // Limpiar cualquier dato residual
    localStorage.removeItem('fresh-richie-admin');
    localStorage.removeItem('fresh-richie-session-time');
    console.log('✅ Sesión cerrada - Usuario eliminado del estado');
  };

  const isAuthenticated = user !== null;
  console.log('Verificando autenticación:', isAuthenticated, 'Usuario:', user);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
