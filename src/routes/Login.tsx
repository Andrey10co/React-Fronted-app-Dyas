// Juan Miguel Dimaté 0000282752 
// Andrey Esteban Conejo 0000281295 
// Carlos Bello 0000272648 
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import DefaultLayout from './DefaultLayout';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, userType, setUserType, userId, setUserId } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorResponse(null);  // Reiniciar el error antes de hacer el intento de login
    
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          "email": email,
          "password": password
        }),
      });

      if (response.ok) {
        const json = await response.json();
        
        if (json.body.accessToken ) {
          sessionStorage.setItem('accessToken',json.body.accessToken );
          setUserType(json.body.userType);
          setUserId(json.body.userId);
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

  useEffect(() => {
      if (isAuthenticated) {
        if (userType === 'WRITER') {
          navigate('/writer');
        } else {
          navigate('/reader');
        }
      }
    }, [isAuthenticated, userType, navigate]);
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


