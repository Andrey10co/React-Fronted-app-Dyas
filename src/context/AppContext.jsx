import { createContext, useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider'; 

export const AppContext = createContext();

export function AppContextProvider(props) {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]); // Lista de géneros disponibles
  const { userId, userType, token } = useAuth(); 

  
  
  async function fetchGenres() {
    try {
      const response = await fetch("http://localhost:8080/api/books/allGenres");
      if (!response.ok) throw new Error("Error al obtener los géneros");
      
      const genreList = await response.json();
      setGenres(genreList); 
    } catch (error) {
      console.error("Error al obtener los géneros y libros:", error);
    }
  }

  async function fetchBooks() {
    try {
      console.log(userType)
      if(userType == "WRITER"){

        console.log("El id es:"+ userId+" Y el tipo es: "+ userType)
        const response = await fetch("http://localhost:8080/api/books/BooksByWriter" ,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener los libros");
        const booksList = await response.json();
        setBooks(booksList);
      }
      else{
        const response = await fetch("http://localhost:8080/api/books/allBooks");
        if (!response.ok) throw new Error("Error al obtener los libros");
        const booksList = await response.json();
        setBooks(booksList);
      }
      
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  }

  // Función para agregar un libro al backend y al estado local
  async function createBook(book) {
    try {
      const newBook = { ...book, writer: userId }; // Asignar el userId del escritor al libro
      const response = await fetch("http://localhost:8080/api/books/addBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) throw new Error("Error al agregar el libro");
      
      const addedBook = await response.json();
      setBooks((prevBooks) => [...prevBooks, addedBook]);
    } catch (error) {
      console.error("Error al agregar el libro:", error);
    }
  }

  async function deleteBook(bookId) {
    try {
      const response = await fetch(`http://localhost:8080/api/books/${bookId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) throw new Error("Error al eliminar el libro");
      
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  }

  // Cargar libros y géneros al iniciar el contexto
  useEffect(() => {
    fetchGenres();
    fetchBooks();
  }, []);
    

  return (
    <AppContext.Provider
      value={{
        books:  books,
        genres, // Para mostrar los géneros y
        createBook,
        deleteBook,
        fetchBooks,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
