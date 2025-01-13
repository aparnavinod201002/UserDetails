import { useState } from 'react'

import './App.css'
import UserList from './Pages/UserList'
import Register from './Pages/Register'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'




function App() {
 

  return (
    <>
    
  
    <Routes>
      
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/userlist' element={<UserList/>}/>
    </Routes>
    </>
  )
}

export default App
