// Juan Miguel Dimaté 0000282752 
// Andrey Esteban Conejo 0000281295 
// Carlos Bello 0000272648 

import React from 'react'
import ViewBooks from '../component/ViewBook'
import UserLayout from './UserLayout'

function ReaderView() {
  return (
    <div>
      <UserLayout/>
      <ViewBooks/>
    </div>
    
  )
}

export default ReaderView