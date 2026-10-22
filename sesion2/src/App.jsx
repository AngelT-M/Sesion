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

  // ── Filtros ─────────────────────────────────────────────────────────
  const [buscar,       setBuscar]       = useState('');
  const [filPrioridad, setFilPrioridad] = useState('TODAS');
  const [filCategoria, setFilCategoria] = useState('TODAS');
  const [filUsuario,   setFilUsuario]   = useState('TODAS');

  // ── Control de modales ──────────────────────────────────────────────
  const [modalNueva, setModalNueva] = useState(false);
  const [tareaSelecion, setTareasSelecion] = useState(null);

  // Aplica los 4 filtros sobre la lista completa de tareas
  const tareasFiltro = tareas.filter((t) => {
    if (buscar) {
      const q = buscar.toLowerCase();
      const hayCoincidencia =
        t.titulo?.toLowerCase().includes(q) ||
        t.descripcion?.toLowerCase().includes(q) ||
        t.nom_categoria?.toLowerCase().includes(q) ||
        t.nom_usuario?.toLowerCase().includes(q);
      if (!hayCoincidencia) return false;
    }
    if (filPrioridad !== 'TODAS' && t.prioridad !== filPrioridad) return false;
    if (filCategoria !== 'TODAS' && String(t.categoria_id) !== String(filCategoria)) return false;
    if (filUsuario !== 'TODAS' && String(t.usuario_id) !== String(filUsuario)) return false;
    return true;
  });

  function limpiarFiltros() {
    setBuscar('');
    setFilPrioridad('TODAS');
    setFilCategoria('TODAS');
    setFilUsuario('TODAS');
  }

  // ── Carga inicial de datos ──────────────────────────────────────────
  // useEffect con [] = "ejecuta esto UNA sola vez cuando el componente aparece"
  useEffect(() => {
    async function cargar() {
      try {
        const [tareasMostradas, categoriasMostradas, usuariosMostrados] = await Promise.all([
          tareaApi.mostrar(),
          categoriaApi.mostrar(),
          usuarioApi.mostrar(),
        ]);
        setTareas(tareasMostradas);
        setCategorias(categoriasMostradas);
        setUsuarios(usuariosMostrados);
      } 
      catch (e) {
        setError(e.message);
      } 
      finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

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

  // ── CREAR tarea ─────────────────────────────────────────────────────
  async function agregarTarea(nueva) {
    try {
      await tareaApi.crear({
        titulo:         nueva.titulo,
        descripcion:    nueva.descripcion,
        categoria_id:   Number(nueva.categoria_id),
        usuario_id:     Number(nueva.usuario_id),
        prioridad:      nueva.prioridad,
        estado:         'PENDIENTE',
        orden:          0,
        fecha_creacion: new Date().toISOString().slice(0, 19).replace('T', ' '),
      });
      setTareas(await tareaApi.mostrar()); // recarga tareas actualizadas
    } catch (e) {
      setError(e.message);
      throw e;
    }
  }

  // ── EDITAR tarea ────────────────────────────────────────────────────
  async function editarTarea(idTarea, datos) {
    try {
      await tareaApi.actualizar(idTarea, datos);
      setTareas(await tareaApi.mostrar());
      setTareasSelecion(null); // cierra el modal
    } catch (e) {
      setError(e.message);
    }
  }

  async function eliminarTarea(idTarea) {
    try {
      await tareaApi.eliminar(idTarea);
      setTareas(await tareaApi.mostrar());
      setTareasSelecion(null);
    } catch (e) {
      setError(e.message);
      throw e;
    }
  }



  // ── Render ──────────────────────────────────────────────────────────
  return (
    <div className="app">

      <Header
        onNuevaTarea={() => setModalNueva(true)}
        buscar={buscar} onCambiarBuscar={setBuscar}
        filPrioridad={filPrioridad} onCambiarPrioridad={setFilPrioridad}
        filCategoria={filCategoria} onCambiarCategoria={setFilCategoria}
        filUsuario={filUsuario} onCambiarUsuario={setFilUsuario}
        categorias={categorias}
        usuarios={usuarios}
        totalTareas={tareas.length}
        totalFiltradas={tareasFiltro.length}
        onLimpiarFiltros={limpiarFiltros}
      />

      {error && <p className="msg-error">{error}</p>}

      {cargando ? (
        <p className="msg-carga">Cargando tareas...</p>
      ) : (
        <>
          {tareas.length > 0 && tareasFiltro.length === 0 && (
            <div className="sin-resultados">
              <p>🔍 Ninguna tarea coincide con los filtros.</p>
              <button className="btn btn-primario" onClick={limpiarFiltros}>
                Limpiar filtros
              </button>
            </div>
          )}
          <Tablero
            tareas={tareasFiltro}
            onVerTarea={setTareasSelecion}
            onSoltarTarea={moverTarea}
          />
        </>
      )}

      {modalNueva && (
        <ModalNuevaTarea
          categorias={categorias}
          usuarios={usuarios}
          onCrear={agregarTarea}
          onCerrar={() => setModalNueva(false)}
        />
      )}

      {tareaSelecion && (
        <ModalTarjetaTarea
          tarea={tareaSelecion}
          categorias={categorias}
          usuarios={usuarios}
          onActualizar={editarTarea}
          onEliminar={eliminarTarea}
          onCerrar={() => setTareasSelecion(null)}
        />
      )}

    </div>
  );
}

export default App;
