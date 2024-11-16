import React, { useState } from 'react'
import {useContext} from 'react'
import {AppContext} from '../context/AppContext'
import { useAuth } from '../auth/AuthProvider';
import ContentManager from './ContentManager';

function BookCardView({book}) {
  const {deleteBook, purchasedBooks} =  useContext(AppContext)
  const { userType } = useAuth();
  const [isViewing,setIsViewing]= useState(false)
  


  const handleViewContent = () => {
    setIsViewing(true);
  };

  
  return (
    <div className='bg-slate-500 text-center text-amber-50 p-4 rounded-md'>
        <h3>Title: {book.title}</h3>
        <h3>Author: {book.writer.name}</h3>
        <h3>Genre: {book.genre}</h3>
        <h3>Type book: {book.type}</h3>
        <h3>Precio: {book.price}</h3>

        {userType === "WRITER" ? (
          <div>
            {/* Botones para escritores */}
            <button onClick={() => deleteBook(book.id)}>Eliminar libro</button>
            <button onClick={handleViewContent}>Ver contenido</button>

            {/* Modal para ver el contenido */}
            {isViewing && (
              <div className="modal">
                <button onClick={() => setIsViewing(false)}>Cerrar</button>
                <ContentManager fileUrl={book.content} type={book.format} />
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Verifica si el libro está en purchasedBooks */}
            {purchasedBooks.some((purchasedBook) => purchasedBook.bookId === book.bookId) ? (
              <>
                <button onClick={handleViewContent}>Ver contenido</button>

                {/* Modal para ver el contenido */}
                {isViewing && (
                  <div className="modal">
                    <button onClick={() => setIsViewing(false)}>Cerrar</button>
                    <ContentManager fileUrl={book.content} type={book.format} />
                  </div>
                )}
              </>
            ) : (
              // Botón para comprar si no está en purchasedBooks
              <button onClick={() => BuyBook(book.id)}>Comprar libro</button>
            )}
    </div>
  )}
        
        

        
    </div>
  )
  
}

export default BookCardView