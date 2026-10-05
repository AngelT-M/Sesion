import { useState } from "react";
import Header from "./components/Header";
import Tablero from "./components/Tablero";
import ModalNuevaTarea from "./components/ModalNuevaTarea";
import {tareasPrueba} from "./data/tareasPrueba"
import ModalTarjetaTarea from "./components/ModalTarjetaTarea";
import './App.css'


function App() {
  const [tareas,setTareas] = useState(tareasPrueba);
  const [ModalNuevaAbierto, setModalNuevaAbierto] = useState(false);
  const [estadoParaNuevaTarea, setestadoParaNuevaTarea] = useState('PENDIENTE');
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  function abrirModalNueva(){
    setestadoParaNuevaTarea('PENDIENTE');
    setModalNuevaAbierto(true);
  }

  function agregarTarea(nuevaTarea){
    setTareas(prev => [...prev, nuevaTarea])
  }

  function moverTarea(idTarea, nuevoEstado){
    setTareas(prev =>
      prev.map(tarea =>
        tarea.id_tarea === idTarea
        ? {...tarea, estado:nuevoEstado}
        : tarea
      )
    )
  }
  function verTarea(tarea){
    setTareaSeleccionada(tarea);
  }



  return (
    <div className='app'>
      <Header
       onNuevaTarea={abrirModalNueva}/>
      <Tablero
      tareas={tareas}
      onVerTarea={verTarea}
      onSoltarTarea={moverTarea}
      />

      {ModalNuevaAbierto &&(
        <ModalNuevaTarea
        estadoInicial={estadoParaNuevaTarea}
        onCrear={agregarTarea}
        onCerrar={() => setModalNuevaAbierto(false)}
        ></ModalNuevaTarea>
      )}

      {tareaSeleccionada && (
        <ModalTarjetaTarea
          tarea={tareaSeleccionada}
          onCerrar={() => setTareaSeleccionada(null)}
        />
      )}
      

    </div>
  )
}

export default App;
