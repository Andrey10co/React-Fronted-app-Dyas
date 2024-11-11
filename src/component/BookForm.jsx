import { useState, useContext } from "react"
import {AppContext} from '../context/appContext'

function BookForm() {

    const [title, setTitle ] = useState("") 
    const [author, setAuthor] = useState("")
    const [gender, setGender] = useState("")
    const  [year, setYear] = useState("")
    const [content, setContent] = useState("")


    const {createBook} = useContext(AppContext)


    const  handleSubmit = (e) => {
        e.preventDefault();
        createBook({title,author,gender,year,content})
        setAuthor("")
        setContent("")
        setTitle("");
        setYear("");
        setGender("");
    }

  return (
        <form onSubmit={handleSubmit}>
            <input placeholder ="Escribe el titulo"
            onChange={ (e) => setTitle(e.target.value)} value={title} autoFocus
            />
            <input placeholder ="Escribe author"
            onChange={ (e) => setAuthor(e.target.value)} value={author}
            />
            <input placeholder ="Escribe el genero"
            onChange={ (e) => setGender(e.target.value)} value={gender}
            />
            <textarea placeholder ="Escribe la Descripcion"
            onChange={ (e) => setContent(e.target.value)} value={content}
            />
            <input placeholder ="Escribe año publicacion" type="number" 
            onChange={ (e) => setYear(e.target.value)} value={year}
            />
            <button > Guardar </button>
        
        </form>
  )
}

export default BookForm