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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
