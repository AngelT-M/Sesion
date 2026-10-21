import { useEffect, useState } from "react";
import Header            from "./components/Header";
import Tablero           from "./components/Tablero";
import ModalNuevaTarea   from "./components/ModalNuevaTarea";
import ModalTarjetaTarea from "./components/ModalTarjetaTarea";
import { categoriaApi, tareaApi, usuarioApi } from "./services/api";
import './App.css';

function App() {
  // ── Datos del servidor ──────────────────────────────────────────────
  const [tareas,     setTareas]     = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [usuarios,   setUsuarios]   = useState([]);
  const [cargando,   setCargando]   = useState(true);
  const [error,      setError]      = useState(null);

  // ── Control de modales ──────────────────────────────────────────────
  const [modalNuevaAbierto,   setModalNuevaAbierto]   = useState(false);
  const [tareaSeleccionada,   setTareaSeleccionada]   = useState(null);

  // ── Filtros ─────────────────────────────────────────────────────────
  const [busqueda,        setBusqueda]        = useState('');
  const [filtroPrioridad, setFiltroPrioridad] = useState('TODAS');
  const [filtroCategoria, setFiltroCategoria] = useState('TODAS');
  const [filtroUsuario,   setFiltroUsuario]   = useState('TODOS');

  // Aplica los 4 filtros sobre la lista completa de tareas
  const tareasFiltradas = tareas.filter((t) => {
    if (busqueda) {
      const q = busqueda.toLowerCase();
      const hayCoincidencia =
        t.titulo?.toLowerCase().includes(q) ||
        t.descripcion?.toLowerCase().includes(q) ||
        t.nom_categoria?.toLowerCase().includes(q) ||
        t.nom_usuario?.toLowerCase().includes(q);
      if (!hayCoincidencia) return false;
    }
    if (filtroPrioridad !== 'TODAS'  && t.prioridad  !== filtroPrioridad)      return false;
    if (filtroCategoria !== 'TODAS'  && String(t.categoria_id) !== String(filtroCategoria)) return false;
    if (filtroUsuario   !== 'TODOS'  && String(t.usuario_id)   !== String(filtroUsuario))   return false;
    return true;
  });

  function limpiarFiltros() {
    setBusqueda('');
    setFiltroPrioridad('TODAS');
    setFiltroCategoria('TODAS');
    setFiltroUsuario('TODOS');
  }

  // ── Carga inicial de datos ──────────────────────────────────────────
  // useEffect con [] = "ejecuta esto UNA sola vez cuando el componente aparece"
  useEffect(() => {
    async function cargar() {
      try {
        const [listaTareas, listaCategorias, listaUsuarios] = await Promise.all([
          tareaApi.listar(),
          categoriaApi.listar(),
          usuarioApi.listar(),
        ]);
        setTareas(listaTareas);
        setCategorias(listaCategorias);
        setUsuarios(listaUsuarios);
      } catch (e) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  // ── CREAR tarea ─────────────────────────────────────────────────────
  async function agregarTarea(nueva) {
    try {
      await tareaApi.crear({
        titulo:         nueva.titulo,
        descripcion:    nueva.descripcion,
        categoria_id:   Number(nueva.categoria_id),
        usuario_id:     1,
        prioridad:      nueva.prioridad,
        estado:         'PENDIENTE',
        orden:          0,
        fecha_creacion: new Date().toISOString().slice(0, 19).replace('T', ' '),
      });
      setTareas(await tareaApi.listar()); // recarga lista actualizada
    } catch (e) {
      setError(e.message);
      throw e;
    }
  }

  // ── MOVER tarea (drag & drop entre columnas) ────────────────────────
  async function moverTarea(idTarea, nuevoEstado) {
    const tarea = tareas.find(t => t.tarea_id === idTarea);
    if (!tarea || tarea.estado === nuevoEstado) return;

    // Calcula el orden dentro de la nueva columna
    const maxOrden = tareas
      .filter(t => t.estado === nuevoEstado)
      .reduce((max, t) => Math.max(max, t.orden ?? 0), 0);

    try {
      await tareaApi.actualizar(idTarea, { estado: nuevoEstado, orden: maxOrden + 1 });
      // Actualiza localmente sin recargar todo
      setTareas(prev =>
        prev.map(t => t.tarea_id === idTarea ? { ...t, estado: nuevoEstado, orden: maxOrden + 1 } : t)
      );
    } catch (e) {
      setError(e.message);
    }
  }

  // ── EDITAR tarea ────────────────────────────────────────────────────
  async function editarTarea(idTarea, datos) {
    try {
      await tareaApi.actualizar(idTarea, datos);
      setTareas(await tareaApi.listar());
      setTareaSeleccionada(null); // cierra el modal
    } catch (e) {
      setError(e.message);
    }
  }

  // ── Render ──────────────────────────────────────────────────────────
  return (
    <div className="app">

      <Header
        onNuevaTarea={()  => setModalNuevaAbierto(true)}
        busqueda={busqueda}           onCambiarBusqueda={setBusqueda}
        filtroPrioridad={filtroPrioridad} onCambiarPrioridad={setFiltroPrioridad}
        filtroCategoria={filtroCategoria} onCambiarCategoria={setFiltroCategoria}
        filtroUsuario={filtroUsuario}     onCambiarUsuario={setFiltroUsuario}
        categorias={categorias}
        usuarios={usuarios}
        totalTareas={tareas.length}
        totalFiltradas={tareasFiltradas.length}
        onLimpiarFiltros={limpiarFiltros}
      />

      {error && <p className="msg-error">{error}</p>}

      {cargando ? (
        <p className="msg-carga">Cargando tareas...</p>
      ) : (
        <>
          {tareas.length > 0 && tareasFiltradas.length === 0 && (
            <div className="sin-resultados">
              <p>🔍 Ninguna tarea coincide con los filtros.</p>
              <button className="btn btn-primario" onClick={limpiarFiltros}>
                Limpiar filtros
              </button>
            </div>
          )}
          <Tablero
            tareas={tareasFiltradas}
            onVerTarea={setTareaSeleccionada}
            onSoltarTarea={moverTarea}
          />
        </>
      )}

      {modalNuevaAbierto && (
        <ModalNuevaTarea
          categorias={categorias}
          onCrear={agregarTarea}
          onCerrar={() => setModalNuevaAbierto(false)}
        />
      )}

      {tareaSeleccionada && (
        <ModalTarjetaTarea
          tarea={tareaSeleccionada}
          categorias={categorias}
          usuarios={usuarios}
          onActualizar={editarTarea}
          onCerrar={() => setTareaSeleccionada(null)}
        />
      )}

    </div>
  );
}

export default App;
