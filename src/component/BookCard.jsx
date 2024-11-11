import React from 'react'
import {useContext} from 'react'
import {AppContext} from '../context/appContext'

function BookCardView({book}) {

  const {deleteBook} =  useContext(AppContext)

  function addFavoritos() {
    alert('añadiendo a favoritos')
    //const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    //const [favoritos, setFavoritos] = React.useState([]);
  }

  

  return (
    <div className='bg-slate-500 text-center text-amber-50 p-4 rounded-md'>
        <h3>Title: {book.title}</h3>
        <h3>Author: {book.author}</h3>
        <h3>Gender: {book.gender}</h3>
        <h3>Content: {book.content}</h3>
        
        <button onClick={()=> deleteBook(book.id)}>Eliminar libro</button>

    </div>
  )
}

export default BookCardView