import { useState, useEffect } from 'react'
import './App.css'
import { 
  API_SIMULAR, 
  POR_PAGINA, 
  listarPublicaciones, 
  crearPublicacion, 
  actualizarPublicacion, 
  eliminarPublicacion, 
  mensajeDeError 
} from './api/publicaciones'
import Barra from './componets/Barra'
import FormularioPublicacion from './componets/FormularioPublicacion'
import Paginacion from './componets/Paginacion'
import DeteallePublicacion from './componets/DetallePublicacion'
import ModalConfirmar from './componets/ModalConfirmar'

function App() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHatMas] = useState(false);
  const [cargando, setCargado] = useState(false);
  const [error, setError] = useState('');
  const [intento, setIntento] = useState(0);
  const [busqueda, setBusqueda] = useState('');
 
  const [formulario, setFormulacio] = useState(null);
  const [verPublicacion, setVerPublicacion] = useState(null);
  const [porElliminar, setPorEliminar] = useState(null);
  const [eliminado, setEliminado] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState('');

  const [aviso, setAviso] = useState('');

  useEffect(()=>{
    let cancelado = false;
    async function cargar() {
      setCargado(true);
      setError('');
      try{
        const datos = await listarPublicaciones(pagina);
        if(!cancelado){
          setPublicaciones(datos);
          setHatMas(datos.length === POR_PAGINA);
        }
      }
      catch(e){
        if(!cancelado) setError(mensajeDeError(e));
      }
      finally{
        if(!cancelado) setCargado(false)
      }
    }
    cargar();
    return ()=>{
      cancelado= true;
    };
  }, [pagina, intento]);

  return (
    <main>

      <Barra/>
      <FormularioPublicacion/>
      
    </main>
  )
}

export default App
