import { use, useEffect, useState } from 'react'
import './App.css'


function App() {
  const [tareas, setTareas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [Usuarios, setUsuarios] = useState([]);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  //filtros 
  const [buscar, setBuscar] = useState('');
  const [filPrioridad, setFilPrioridad] = useState('TODAS');
  const [filCategoria, setFilCategoria] = useState('TODAS');
  const [filUsuario, setFilUsuario] = useState('TODAS');

  //accion 
  const [ModalNueva, setModalNueva] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  const TareaFiltro = tareas.filter((t)=>{
    if (buscar) {
      const q = buscar.toLowerCase();
      const hatCoincidencia = 
      t.titulo?.toLowerCase().includes(q)||
      t.descripcion?.toLowerCase().includes(q)||
      t.nom_categoria?.toLowerCase().includes(q)||
      t.nom_usuario?.toLowerCase().includes(q);
      if (!hatCoincidencia)return false;
    }
    if(filPrioridad !== 'TODAS' && t.prioridad !== filPrioridad)return false;
    if(filCategoria !== 'TODAS' && String(t.nom_categoria) !== String(filCategoria))return false;
    if(filUsuario !== 'TODAS' && String(t.nom_usuario) !== String(filUsuario))return false;
    return true;
  })

  function limpiarFiltro(){
    setBuscar('');
    setFilPrioridad('TODAS');
    setFilCategoria('TODAS');
    setFilUsuario('TODAS');
  }

  useEffect(()=>{
    async function cargar() {
      try{
        
      }
    }
  })



  return (
    <>

    </>
  )
}

export default App
