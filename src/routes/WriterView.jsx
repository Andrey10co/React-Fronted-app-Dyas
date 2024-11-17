import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useAuth } from '../auth/AuthProvider';
import BookForm from '../component/BookForm';
import ViewBooks from '../component/ViewBook';
import UserLayout from './UserLayout';

function WriterView() {
  // Obtener el contexto de autenticación (si es necesario)
  const { userType } = useAuth();
  (AppContext);

  if (userType != 'WRITER') {
    return <div>Access denied. You must be a writer to view this page.</div>;
  }

  return (
    <div>
      <UserLayout/>
      <BookForm /> 
      <ViewBooks /> 
    </div>
  );
}

export default WriterView;
