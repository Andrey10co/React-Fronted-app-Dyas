import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from '../auth/AuthProvider';
import DefaultLayout from './DefaultLayout';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState<string | null>(null);

  const { isAuthenticated, setIsAuthenticated, userType, setUserType, setToken } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorResponse(null);  // Reiniciar el error antes de hacer el intento de login
    
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const json = await response.json();
        
        if (json.body.accessToken && json.body.refreshToken) {
          setToken(json.body.accessToken);
          setUserType(json.body.userType);
          setIsAuthenticated(true);
        }
      } else {
        const json = await response.json();
        setErrorResponse(json.body.error || "Error de autenticación");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setErrorResponse("Error de conexión. Inténtalo más tarde.");
    }
  }

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorResponse, setErrorResponse] = useState<string | null>(null);
    
    const { isAuthenticated, userType, setIsAuthenticated, setUserType, setToken } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isAuthenticated) {
        if (userType === 'writer') {
          navigate('/writer');
        } else {
          navigate('/reader');
        }
      }
    }, [isAuthenticated, userType, navigate]); // Dependencias aseguran que el efecto solo corra cuando cambian
  };

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          {errorResponse && (
            <div className="text-red-500 mb-4">
              {errorResponse}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
          >
            Login
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Login;


