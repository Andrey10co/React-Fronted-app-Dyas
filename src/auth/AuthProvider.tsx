import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isTokenExpired(token): boolean;
  isAuthenticated: boolean;
  userId: string | null;
  userType: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserType: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    const currentTime = Date.now() / 1000;
    if (payload.exp < currentTime) {
      return true;
    }
    return false
  } catch (error) {
    return true;
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); 
  const token = sessionStorage.getItem('accessToken');

  useEffect(() => {
    async function fetchUserId() {
      if (token && !isTokenExpired(token)) {
        try {
          const response = await fetch('http://localhost:8080/api/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) throw new Error('Failed to fetch user ID');
          const data = await response.json();
          setUserId(data.userId);
          setUserType(data.userType);
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
      value={{ isAuthenticated, userId,setIsAuthenticated, userType, setUserType,  setUserId, isTokenExpired }}
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

