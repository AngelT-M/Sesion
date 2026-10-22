import { use, useState } from 'react'
import './App.css'


function App() {
  
  const [tareas, setTareas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [cargar, setCargar] = useState(true);
  const [error, serError] = useState(null);
  //filtro
  const [buscar, setBuscar] = useState('');
  const [filPrioridad, setFilPrioridad] = useState('TODAS');
  const [filCategoria, setFilCategoria] = useState('TODAS');
  const [filUsuario, setFilUsuario] = useState('TODAS');

  //acciones 
  const [modalNueva, setModalNueva] = useState(false);
  const [tareaSeleccion, setTareasSeleccion] = useState(null);

  const tareasFiltro = tareas.filter((t)=>{
    

  })




  return (
    <>

    </>
  )
}

export default App
