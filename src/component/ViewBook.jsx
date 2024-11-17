import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../auth/AuthProvider"; // Asegúrate de tener acceso al AuthContext
import BookCardView from "./BookCard";

function ViewBooks() {
  const { books, genres, purchasedBooks } = useContext(AppContext);
  const { userType } = useAuth();

  

  // Si el usuario es escritor, mostramos sus libros. Si es lector, mostramos el catálogo por género
  if (userType == 'WRITER') {
    return (
      <div className="catalog">
        <h2>Your Books</h2>
        <div className="grid grid-cols-4 gap-4">
          
          {
            books.length > 0 ? (
              books.map((book) => (
                <BookCardView key={book.bookId} book={book} />
              ))
            ) : (
              <div>You haven't created any books yet.</div>
            )
          }
        </div>
      </div>
    );
  }
  else {  
    // Si el usuario es lector, mostramo los Libros que compró
    return (
      <div className="catalog">
        {/* Libros comprados */}
        <div className="purchased-books">
          
            <div>
              <h2>Libros Comprados</h2>
              <div className="grid grid-cols-4 gap-4">
                
              {
                purchasedBooks.length > 0 ? (
                  purchasedBooks.map((book) => (
                    <BookCardView key={book.bookId} book={book} />
                  ))
                ) : (
                  <div>You haven't created any books yet.</div>
                )
              }

              </div>
            </div>
           
        </div>
    
        {/* Catálogo por géneros */}
        {genres.map((genre) => (
          <section key={genre} className="genre-section">
            <h2>{genre}</h2>
            <div className="grid grid-cols-4 gap-4">
              {
                // Filtrar libros por el género actual No mostrar libros comprados
                books.filter((book) => book.genre === genre && !purchasedBooks.some((purchasedBook) => purchasedBook.bookId === book.bookId)).length > 0 ? (
                  books
                    .filter((book) => book.genre === genre )
                    .map((book) => <BookCardView key={book.bookId} book={book} />)
                ) : (
                  <div>No hay libros disponibles en este género.</div>
                )
              }
            </div>
          </section>
        ))}

      </div>
    );
    
  }
}

export default ViewBooks;
