import { useEffect, useState } from "react";
import Header from "./components/Header";
import Tablero from "./components/Tablero";
import ModalNuevaTarea from "./components/ModalNuevaTarea";
import ModalTarjetaTarea from "./components/ModalTarjetaTarea";
import { categoriaApi, tareaApi } from "./services/api";
import './App.css';

const ESTADOS_TABLERO = {
  PENDIENTE: 'PENDIENTE',
  EN_PROCESO: 'EN_PROCESO',
  COMPLETA: 'COMPLETA',
  COMPLETADO: 'COMPLETA',
  COMPLETADA: 'COMPLETA',
};

function adaptarTarea(tarea) {
  const estado = String(tarea.estado ?? 'PENDIENTE')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '_');

  return {
    id_tarea: tarea.tarea_id,
    titulo: tarea.titulo ?? tarea.descripcion ?? '',
    descripcion: tarea.descripcion ?? '',
    categoria: tarea.nom_categoria ?? tarea.categoria ?? '',
    categoria_id: tarea.categoria_id,
    prioridad: String(tarea.prioridad ?? 'MEDIA').toUpperCase(),
    estado: ESTADOS_TABLERO[estado] ?? 'PENDIENTE',
    usuario: tarea.usuario || 'Sin asignar',
  };
}

function App() {
  const [tareas, setTareas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [modalNuevaAbierto, setModalNuevaAbierto] = useState(false);
  const [estadoParaNuevaTarea, setEstadoParaNuevaTarea] = useState('PENDIENTE');
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [listaTareas, listaCategorias] = await Promise.all([
          tareaApi.listar(),
          categoriaApi.listar(),
        ]);
        setTareas(listaTareas.map(adaptarTarea));
        setCategorias(listaCategorias);
        setError(null);
      } catch (e) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  function abrirModalNueva() {
    setEstadoParaNuevaTarea('PENDIENTE');
    setModalNuevaAbierto(true);
  }

  async function agregarTarea(nuevaTarea) {
    try {
      await tareaApi.crear({
        titulo: nuevaTarea.titulo,
        descripcion: nuevaTarea.descripcion,
        categoria_id: Number(nuevaTarea.categoria_id),
        prioridad:
          nuevaTarea.prioridad[0] +
          nuevaTarea.prioridad.slice(1).toLowerCase(),
        estado: nuevaTarea.estado,
        usuario: nuevaTarea.usuario,
      });
      const listaTareas = await tareaApi.listar();
      setTareas(listaTareas.map(adaptarTarea));
      setError(null);
    } catch (e) {
      setError(e.message);
      throw e;
    }
  }

  async function moverTarea(idTarea, nuevoEstado) {
    const tarea = tareas.find((item) => item.id_tarea === idTarea);
    if (!tarea || tarea.estado === nuevoEstado) return;

    try {
      await tareaApi.actualizar(idTarea, { estado: nuevoEstado });
      setTareas((prev) =>
        prev.map((item) =>
          item.id_tarea === idTarea ? { ...item, estado: nuevoEstado } : item
        )
      );
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  function verTarea(tarea) {
    setTareaSeleccionada(tarea);
  }

  return (
    <div className="app">
      <Header onNuevaTarea={abrirModalNueva} />
      {error && <p className="mensaje-api" role="alert">{error}</p>}
      {cargando ? (
        <p className="mensaje-api" role="status">Cargando tareas...</p>
      ) : (
        <Tablero
          tareas={tareas}
          onVerTarea={verTarea}
          onSoltarTarea={moverTarea}
        />
      )}

      {modalNuevaAbierto && (
        <ModalNuevaTarea
          estadoInicial={estadoParaNuevaTarea}
          categorias={categorias}
          onCrear={agregarTarea}
          onCerrar={() => setModalNuevaAbierto(false)}
        />
      )}

      {tareaSeleccionada && (
        <ModalTarjetaTarea
          tarea={tareaSeleccionada}
          onCerrar={() => setTareaSeleccionada(null)}
        />
      )}
    </div>
  );
}

export default App;
