import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/appContext'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import SingUp from './routes/SingUp.tsx'
import Login from './routes/Login.tsx'
import WriterView from './routes/WriterView.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import ReaderView from './routes/ReaderView.jsx'
import AuthProvider from './auth/AuthProvider.tsx'

const router = createBrowserRouter([
  {path: '/login', element: <Login/>},
  {path: '/singup', element: <SingUp />},
  {path: '/', element: <ProtectedRoute />,
     children:[
      {
        path: '/writer',
        element: <WriterView />
      },
      {
        path:'/reader',
        element: <ReaderView />
      }]}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </AuthProvider>
  </StrictMode>,
)
