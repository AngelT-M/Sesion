import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import FormularioDireccion from './pages/FormularioDireccion';
import FormularioPersonasn from './pages/FormularioPersonal';
import Resumen from './pages/Resumen';
import Inicio from './pages/inicio';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
    <Route path='/' element={<Inicio/>}></Route>
    <Route path='/datos-personales' element={<FormularioPersonasn/>}></Route>
    <Route path='/direccion' element={<FormularioDireccion/>}></Route>
    <Route path='/resumen' element={<Resumen/>}></Route>
    </Routes>
    )
}

export default App
