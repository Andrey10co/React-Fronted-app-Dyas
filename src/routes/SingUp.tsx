import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import DefaultLayout from "./DefaultLayout";
import { AuthResponse, AuthResponseError } from "../types/types";
import { useNavigate } from 'react-router-dom';


function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('');
  const { setUserId, userType, setUserType } = useAuth();
  const [errorResponse, setErrorResponse] = useState<string | null>(null);

  const navigate = useNavigate();
  const auth = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "name": name,
          "email": email,
          "password": password,
          "userType": userType
        }),
      });
      
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
         // Redirige según el tipo de usuario j
      
        sessionStorage.setItem('accessToken',json.accessToken );
        setUserId(json.userId);
        auth.setIsAuthenticated(true);

      
        console.log(userType);
        navigate(auth.userType === 'WRITER' ? "/writer" : "/reader");
        
        
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      setErrorResponse("Error de conexión. Inténtalo más tarde.");
    }
  }

 

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          
          {errorResponse && (
            <div className="text-red-500 mb-4">
              {errorResponse}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
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
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="user-type" className="block font-medium mb-2">
                User Type
              </label>
              <select
                id="user-type"
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                value={tipo}
                onChange={(e) => {
                  setTipo(e.target.value);
                  setUserType(e.target.value);
                }}
              >
                <option value="">Select user type</option>
                <option value="WRITER">Writer</option>
                <option value="READER">Reader</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default SignUp;
 