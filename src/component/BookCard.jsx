import React, { useState } from 'react'
import {useContext} from 'react'
import {AppContext} from '../context/appContext'
import { useAuth } from '../auth/AuthProvider';
import ContentManager from './ContentManager';

function BookCardView({book}) {
  const {deleteBook} =  useContext(AppContext)
  const { userType } = useAuth();
  const [isViewing,setIsViewing]= useState(false)
  function addFavoritos() {
    alert('añadiendo a favoritos')
    //const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    //const [favoritos, setFavoritos] = React.useState([]);
  }

  const handleViewContent = () => {
    setIsViewing(true);
  };

  
  return (
    <div className='bg-slate-500 text-center text-amber-50 p-4 rounded-md'>
        <h3>Title: {book.title}</h3>
        <h3>Author: {book.writer.name}</h3>
        <h3>Genre: {book.genre}</h3>
        <h3>Content: {book.content}</h3>
        <h3>Type book: {book.type}</h3>
        <h3>Precio: {book.precio}</h3>
        
        {userType === "WRITER" ? (
          <button onClick={() => deleteBook(book.id)}>Eliminar libro</button>
        ) : (
          <button onClick={() => BuyBook(book.id)}>Comprar libro</button>
        )}
        <button onClick={handleViewContent}>Ver contenido</button>
            {/* Visualización del contenido */}
            {isViewing && (
                <div className="modal">
                    <button onClick={() => setIsViewing(false)}>Cerrar</button>
                    <ContentManager fileUrl={book.content} type={book.type} />
                </div>
            )}
    </div>
  )
  
}

export default BookCardView