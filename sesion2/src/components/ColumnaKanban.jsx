import TarjetaTarea from "./TarjetaTarea";

export default function ColumnaKanban({ titulo, estado, color, tareas, onVerTarea, onSoltarTarea }) {
  function manejarDragOver(evento) {
    evento.preventDefault();
  }

  function manejarDrop(evento) {
    const idTarea = evento.dataTransfer.getData("text/plain");
    onSoltarTarea(Number(idTarea), estado);
  }

  return (
    <div
      className="columna-kanban"
      onDragOver={manejarDragOver}
      onDrop={manejarDrop}
    >
      <div className="columna-header" style={{ borderTop: `4px solid ${color}` }}>
        <h3>{titulo}</h3>
        <span className="contador">{tareas.length}</span>
      </div>

      <div className="columna-body">
        {tareas.length === 0 ? (
          <p className="plasholder">Sin Tareas Todavia</p>
        ) : (
          tareas.map((tarea) => (
            <TarjetaTarea
              key={tarea.id_tarea}
              tarea={tarea}
              onVerTarea={onVerTarea}
            />
          ))
        )}
      </div>
    </div>
  );
}
