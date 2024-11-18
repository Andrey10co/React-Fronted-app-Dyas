// Juan Miguel Dimaté 0000282752 
// Andrey Esteban Conejo 0000281295 
// Carlos Bello 0000272648 

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider'; // Asegúrate de ajustar la ruta si es necesario

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  // Si el usuario está autenticado, muestra las rutas anidadas (Outlet)
  // Si no, redirige al login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace={true} />;
}

export default ProtectedRoute;