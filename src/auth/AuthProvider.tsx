import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'writer' | 'reader' | null;
  token: string | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserType: React.Dispatch<React.SetStateAction<'writer' | 'reader' | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'writer' | 'reader' | null>(null);
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userType, setUserType, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de un AuthProvider");
  }
  return context;
}

