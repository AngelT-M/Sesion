import Inicio from './pages/Inicio'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import EditorImagen from './pages/EditorImagen'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Inicio></Inicio>}></Route>
      <Route path='/editor' element={<EditorImagen/>}></Route>
    </Routes>
  )
}

export default App
