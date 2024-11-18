// Juan Miguel Dimaté 0000282752 
// Andrey Esteban Conejo 0000281295 
// Carlos Bello 0000272648 

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppContextProvider } from './context/AppContext';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import SingUp from './routes/SingUp.tsx';
import Login from './routes/Login.tsx';
import WriterView from './routes/WriterView.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import ReaderView from './routes/ReaderView.jsx';
import AuthProvider from './auth/AuthProvider.tsx';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: "AVFm0EIV2vwh3AbkUN1H9EBcsLulSMTOcI4V8vkfDPOZ7izPNfB_jfo25o0p9uXey8T7rm4SuNM9iSU2",
};

// Configuración del enrutador
const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/singup', element: <SingUp /> },
  {
    path: '/',
    element: (
      <AppContextProvider>
        <ProtectedRoute />
      </AppContextProvider>
    ),
    children: [
      { path: 'writer', element: <WriterView /> },
      { path: 'reader', element: <ReaderView /> },
    ],
  },
]);

// Renderizado de la aplicación
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PayPalScriptProvider options={initialOptions}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </PayPalScriptProvider>
  </StrictMode>
);
