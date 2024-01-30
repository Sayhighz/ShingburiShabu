import { useState } from 'react'
import Login from './login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashborad from './login/Dashborad'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/dashborad' element={<Dashborad/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
