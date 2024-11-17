
import React, { useState } from 'react'
import {useContext} from 'react'
import {AppContext} from '../context/AppContext'
import { useAuth } from '../auth/AuthProvider';

import DisplayContent from './DisplayContent';

import { PayPalButtons } from "@paypal/react-paypal-js";

function BookCardView({book}) {
  const {deleteBook, purchasedBooks, purchase} =  useContext(AppContext)
  const { userType, userId } = useAuth();
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
            <button onClick={() => deleteBook(book.bookId)}>Eliminar libro</button>
            <button onClick={handleViewContent}>Ver contenido</button>

            {/* Modal para ver el contenido */}
            {isViewing && (
              <div className="modal">
                <button onClick={() => setIsViewing(false)}>Cerrar</button>
                <DisplayContent fileUrl={book.content} type={book.format} />
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
                    <DisplayContent fileUrl={book.content} type={book.format} />
                  </div>
                )}
              </>
            ) : (
              <div>
                {/* Removido PayPalScriptProvider, solo usa PayPalButtons */}
                <PayPalButtons
                  fundingSource="paypal"
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: book.price,
                        },
                      }],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    try {
                      const details = await actions.order.capture();
                      await purchase(userId, book.bookId);
                      console.log("Payment successful!", details);
                      return details;
                    } catch (err) {
                      console.error("Payment failed:", err);
                      throw err;
                    }
                  }}
                />
              </div>
            )}
    </div>
  )}
        
        

        
    </div>
  )
  
}

export default BookCardView