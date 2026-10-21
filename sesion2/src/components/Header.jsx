export default function Header({
  onNuevaTarea,
  busqueda, onCambiarBusqueda,
  filtroPrioridad, onCambiarPrioridad,
  filtroCategoria, onCambiarCategoria,
  filtroUsuario, onCambiarUsuario,
  categorias = [], usuarios = [],
  totalTareas, totalFiltradas,
  onLimpiarFiltros,
}) {
  const prioridades = ['TODAS', 'ALTA', 'MEDIA', 'BAJA'];

  const hayFiltros =
    busqueda ||
    filtroPrioridad !== 'TODAS' ||
    filtroCategoria !== 'TODAS' ||
    filtroUsuario !== 'TODOS';

  return (
    <header className="app-header">

      {/* Fila superior: logo, buscador, botón, usuario */}
      <div className="header-fila">
        <span className="logo">📋 Gestión de Trabajo</span>

        <div className="buscador-caja">
          🔍
          <input
            className="buscador"
            type="text"
            placeholder="Buscar tarea..."
            value={busqueda}
            onChange={e => onCambiarBusqueda(e.target.value)}
          />
          {busqueda && (
            <button className="btn-x" onClick={() => onCambiarBusqueda('')}>✕</button>
          )}
        </div>

        <button className="btn btn-oscuro" onClick={onNuevaTarea}>+ Nueva tarea</button>

        <div className="usuario">
          <span className="avatar">EM</span>
          <span>Emma Maldonado</span>
        </div>
      </div>

      {/* Barra de filtros */}
      <div className="filtro-barra">

        {/* Pills de prioridad */}
        <div className="filtro-grupo">
          <span className="filtro-label">⚡ Prioridad:</span>
          {prioridades.map(p => (
            <button
              key={p}
              className={`pill ${filtroPrioridad === p ? 'pill-activo' : ''}`}
              onClick={() => onCambiarPrioridad(p)}
            >
              {p === 'TODAS' ? 'Todas' : p[0] + p.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Select de categoría */}
        <div className="filtro-grupo">
          <span className="filtro-label">📁 Categoría:</span>
          <select className="filtro-select" value={filtroCategoria} onChange={e => onCambiarCategoria(e.target.value)}>
            <option value="TODAS">Todas</option>
            {categorias.map(c => (
              <option key={c.categoria_id} value={c.categoria_id}>{c.nom_categoria}</option>
            ))}
          </select>
        </div>

        {/* Select de usuario */}
        <div className="filtro-grupo">
          <span className="filtro-label">👤 Usuario:</span>
          <select className="filtro-select" value={filtroUsuario} onChange={e => onCambiarUsuario(e.target.value)}>
            <option value="TODOS">Todos</option>
            {usuarios.map(u => (
              <option key={u.usuario_id} value={u.usuario_id}>{u.nom_usuario}</option>
            ))}
          </select>
        </div>

        {/* Contador y botón limpiar */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="contador">{totalFiltradas} / {totalTareas} tareas</span>
          {hayFiltros && (
            <button className="btn-limpiar" onClick={onLimpiarFiltros}>🔄 Limpiar</button>
          )}
        </div>

      </div>
    </header>
  );
}
