import { useState, useContext } from "react"
import {AppContext} from '../context/AppContext'
import { useAuth } from '../auth/AuthProvider';
import "../styles/formContent.css"

function BookForm() {
    const [isbn, setIsbn] = useState('')
    const [title, setTitle ] = useState("") 
    const [type, setType] = useState('ebook')
    const [gender, setGender] = useState("")
    const  [publication, setPublication] = useState("")
    const [content, setContent] = useState("")


    const {createBook} = useContext(AppContext)
    const { userId } = useAuth();

    const  handleSubmit = (e) => {
        e.preventDefault();
        createBook({ isbn, title, type, gender, publication, content, writer: userId })
        setIsbn('');
        setTitle('');
        setType('ebook');
        setGender('');
        setPublication('');
        setContent('');
    }

  return (
    <form onSubmit={handleSubmit}>
    <h2>Agregar Nuevo Libro</h2>
    <label>ISBN</label>
    <input
      placeholder="Escribe el ISBN"
      onChange={(e) => setIsbn(e.target.value)}
      value={isbn}
    />
    
    <label>Título</label>
    <input
      placeholder="Escribe el título"
      onChange={(e) => setTitle(e.target.value)}
      value={title}
    />

    <label>Tipo</label>
    <select onChange={(e) => setType(e.target.value)} value={type}>
      <option value="ebook">eBook</option>
      <option value="printed">Printed</option>
    </select>

    <label>Género</label>
    <select onChange={(e) => setGender(e.target.value)} value={gender}>
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

    <label>Descripción</label>
    <textarea
      placeholder="Escribe la descripción"
      onChange={(e) => setContent(e.target.value)}
      value={content}
    />
    
    <button>Guardar</button>
  </form>
  )
}

export default BookForm