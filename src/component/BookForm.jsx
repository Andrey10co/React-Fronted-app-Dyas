import { useState, useContext } from "react"
import {AppContext} from '../context/appContext'
import { useAuth } from '../auth/AuthProvider';
import "../styles/formContent.css"

function BookForm() {
    const [title, setTitle ] = useState("") 
    const [type, setType] = useState("EBook")
    const [genre, setGenre] = useState("")
    const  [publication, setPublication] = useState("")
    const [content, setContent] = useState(null)
    const [price, setPrice] = useState("")
    const [format, setFormat] = useState("")


    const {createBook} = useContext(AppContext)
    const { userId } = useAuth();

    const  handleSubmit = (e) => {

        e.preventDefault();
        createBook({title, type, genre, publication, content, writer: userId, price, format})
        setTitle('');
        setType('');
        setGenre('');
        setPublication('');
        setPrice('')
        setContent(null);
      
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        switch (file.type) {
          // Manejar archivo EPUB
          case "application/epub+zip":
            setContent(file);
            setType("EBook")
            setFormat("ebook")
            break;
          
          // Manejar archivo PDF
          case "application/pdf":
            setContent(file);
            setType("EBook")
            setFormat("pdf")
            break;

          // Manejar archivo MP3  
          case "audio/mpeg":
            setContent(file);
            setType("Audio Book")
            setFormat("audiobook")
            break;

          default:
            alert("Formato de archivo no soportado. Por favor, selecciona un archivo EPUB, PDF o MP3.");
            e.target.value = null; // Restablecer el input
            break;
        }
      }
    };
    

    

  return (
    <form onSubmit={handleSubmit}>
    <h2>Agregar Nuevo Libro</h2>
    
    <label>Título</label>
    <input
      placeholder="Escribe el título"
      onChange={(e) => setTitle(e.target.value)}
      value={title}
    />

    <label>Tipo</label>
    <select onChange={(e) => setType(e.target.value)} value={type}>
      <option value="Ebook">EBook</option>
      <option value="Audio">Audio</option>
    </select>

    <label>Género</label>
    <select onChange={(e) => setGenre(e.target.value)} value={genre}>
      <option value="" disabled>Selecciona un género</option>
      <option value="Ficción">Ficción</option>
      <option value="No Ficción">No Ficción</option>
      <option value="Aventura">Aventura</option>
      <option value="Biografía">Biografía</option>
      <option value="Ciencia Ficción">Ciencia Ficción</option>
      <option value="Cuento">Cuento</option>
      <option value="Drama">Drama</option>
      <option value="Fantasía">Fantasía</option>
      <option value="Histórico">Histórico</option>
      <option value="Horror">Horror</option>
      <option value="Infantil">Infantil</option>
      <option value="Misterio">Misterio</option>
      <option value="Poesía">Poesía</option>
      <option value="Romance">Romance</option>
      <option value="Suspenso">Suspenso</option>
      <option value="Terror">Terror</option>
      <option value="Thriller">Thriller</option>
      <option value="Otros">Otros</option>
    </select>

    <label>Fecha de Publicación</label>
    <input
      placeholder="Fecha de publicación"
      type="date"
      onChange={(e) => setPublication(e.target.value)}
      value={publication}
    />

    <label>Contenido</label>
    <input
      type="file"
      accept=".pdf,.mp3,.epub"
      onChange={handleFileChange}
    />

    <label>Precio</label>
    <input
        type="number"
        step="0.01"
        min="0"
        placeholder="$ Ingrese el valor del Libro"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
    />
      
    <button>Guardar</button>
  </form>
  )
}

export default BookForm