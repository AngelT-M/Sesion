import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Editor from './pages/Editor'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path='/' element={<Inicio/>} ></Route>
        <Route path='/Editor' element={<Editor/>}></Route>
      </Routes>
  )
}

export default App
