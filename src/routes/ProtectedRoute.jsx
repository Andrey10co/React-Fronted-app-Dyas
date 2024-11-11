import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'

function ProtectedRoute() {
    const [isAuth, setIsAuth] = React.useState(false);
  return isAuth ?  <Outlet /> : <Navigate to="/login" replace={true} />
}

export default ProtectedRoute