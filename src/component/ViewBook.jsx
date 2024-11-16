import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../auth/AuthProvider"; // Asegúrate de tener acceso al AuthContext
import BookCardView from "./BookCard";

function ViewBooks() {
  const { books, booksByWriter, genres } = useContext(AppContext);
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

  // Si el usuario es lector, mostramos los libros por género
  return (
    <div className="catalog">
      {genres.map((genre) => (
        <section key={genre} className="genre-section">
          <h2>{genre}</h2>
          <div className="grid grid-cols-4 gap-4">
            {
              // Filtrar libros por el género actual
              books.filter((book) => book.genre === genre).length > 0 ? (
                books
                  .filter((book) => book.genre === genre)
                  .map((book) => <BookCardView key={book.bookId} book={book} />)
              ) : (
                <div>No books available in this genre.</div>
              )
            }
          </div>
        </section>
      ))}
    </div>
  );
}

export default ViewBooks;
