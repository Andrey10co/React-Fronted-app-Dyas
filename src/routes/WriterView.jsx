import React, { useContext } from 'react';
import { AppContext } from '../context/appContext';
import { useAuth } from '../auth/AuthProvider';
import BookForm from '../component/BookForm';
import ViewBooks from '../component/ViewBook';

function WriterView() {
  // Obtener el contexto de autenticación (si es necesario)
  const { userType } = useAuth();
  (AppContext);

  if (userType != 'WRITER') {
    return <div>Access denied. You must be a writer to view this page.</div>;
  }

  return (
    <div>
      <BookForm /> 
      <ViewBooks /> 
    </div>
  );
}

export default WriterView;
