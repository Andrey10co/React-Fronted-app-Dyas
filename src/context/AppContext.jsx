import { createContext, useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider'; // Asegúrate de tener acceso al AuthContext

export const AppContext = createContext();

export function AppContextProvider(props) {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]); // Lista de géneros disponibles
  const { userId, userType } = useAuth(); // Obtener userId y userType desde el AuthContext

  // Función para obtener libros agrupados por género desde el backend
  async function fetchBooksByGenres() {
    try {
      const response = await fetch("http://localhost:8080/api/books/bygenres");
      if (!response.ok) throw new Error("Error al obtener los géneros");
      
      const data = await response.json();
      setGenres(data); // Suponiendo que el backend devuelve un objeto con géneros y libros
    } catch (error) {
      console.error("Error al obtener los géneros y libros:", error);
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

  // Cargar libros y géneros al iniciar el contexto
  useEffect(() => {
    fetchBooksByGenres();
  }, []);

  // Filtrar los libros por el escritor (si es un escritor)
  const booksByWriter = books.filter((book) => book.writer === userId);

  return (
    <AppContext.Provider
      value={{
        books: userType === 'writer' ? booksByWriter : books, // Si es escritor, solo mostrar sus libros
        genres, // Para mostrar los géneros y hacer filtrado en el frontend
        createBook,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
