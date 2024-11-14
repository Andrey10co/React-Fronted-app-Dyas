import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  userType: string | null;
  token: string | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserType: React.Dispatch<React.SetStateAction<string | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); 

  useEffect(() => {
    async function fetchUserId() {
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/api/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) throw new Error('Failed to fetch user ID');
          const data = await response.json();
          setUserId(data.userId); // Asumimos que el backend devuelve un campo `userId`
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error fetching user ID:', error);
          setIsAuthenticated(false);
          setUserId(null);
        }
      }
    }

    fetchUserId();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId,setIsAuthenticated, userType, setUserType, token, setToken }}
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

