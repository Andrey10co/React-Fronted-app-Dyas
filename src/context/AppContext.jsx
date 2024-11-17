import { createContext, useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider'; 

export const AppContext = createContext();

export function AppContextProvider(props) {
  const [books, setBooks] = useState([]);
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [genres, setGenres] = useState([]); 
  const { userId, userType, isTokenExpired } = useAuth(); 
  const token = sessionStorage.getItem('accessToken');

  
  
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

  //arma la lista de libros disponibles si es lector o la de lista de libros publicadps si es escritor
  async function fetchBooks() {
    try {
      if(userType == "WRITER" && !isTokenExpired(token)){

        const response = await fetch("http://localhost:8080/api/books/BooksByWriter" ,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener los libros del Autor");
        const booksList = await response.json();
        setBooks(booksList);
      }
      else{
        if (!isTokenExpired(token)){

          const response = await fetch("http://localhost:8080/api/books/allBooks");
          if (!response.ok) throw new Error("Error al obtener los libros disponibles");
          const booksList = await response.json();
          setBooks(booksList);

          
          const response2 = await fetch("http://localhost:8080/api/users/purchased-books" ,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response2.ok) throw new Error("Error al obtener los libros del Autor");
          const purchasedBooksList = await response2.json();
          setPurchasedBooks(purchasedBooksList);
          console.log(purchasedBooksList)

        } else {
          window.location.href = '/login';
        }
        
        

      }
      
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  }



  // Función para agregar un libro al backend y al estado local
  async function createBook(book) {
    try {
      const formData = new FormData();
      
      const bookData = {
        "title":book.title,"genre":book.genre,"publication":book.publication,"writer":userId,"price":book.price,"type":book.type,"format":book.format
      }

      formData.append("book", JSON.stringify(bookData));
      formData.append("content", book.content);
     
      if (!isTokenExpired(token)){
            
        const response = await fetch("http://localhost:8080/api/books/addBook", {
          method: "POST",
          body: formData,
        });

        if (!response.ok){
          const errorResponse = await response.text();
          console.error("Error al agregar el libro:", errorResponse);
          throw new Error("Error al agregar el libro");
      

        } 
        
        const addedBook = await response.json();
        setBooks((prevBooks) => [...prevBooks, addedBook]);        
      } else {
        window.location.href = '/login';
      }

    } catch (error) {
      console.error("Error al agregar el libro:", error);
      throw error
    }
  }

  async function deleteBook(bookId) {
    try {
      if (!isTokenExpired(token)){
        const response = await fetch(`http://localhost:8080/api/books/DeleteBook?id=${bookId}`, {
          method: "DELETE",
        });
        
        if (!response.ok) throw new Error("Error al eliminar el libro");
        
        setBooks((prevBooks) => prevBooks.filter((book) => book.bookId !== bookId));

      } else{
        window.location.href = '/login';
      }
      
    
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  }

  async function purchase(idUsuario,bookId) {
    try {
      if (!isTokenExpired(token)){
        const response = await fetch(`http://localhost:8080/purchases/new?userId=${idUsuario}&bookId=${bookId}`, {
          method: "POST",
          });
          if (!response.ok) throw new Error("Error al realizar compra");
          fetchBooks();
      } else{
        window.location.href = '/login';
      }
      
    } catch (error){
      console.error("No se registró el pago :(")
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
        genres,
        purchasedBooks: purchasedBooks,
        createBook,
        deleteBook,
        fetchBooks,
        purchase
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
