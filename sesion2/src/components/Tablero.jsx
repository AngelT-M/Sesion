
import ColumnaKanban from "./ColumnaKanban";

export default function Tablero({ tareas, onVerTarea, onSoltarTarea }) {
  const pendiente = tareas.filter(t => t.estado === "PENDIENTE");
  const enProceso = tareas.filter(t => t.estado === "EN_PROCESO");
  const completado = tareas.filter(t => t.estado === "COMPLETA");

  return (
    <div className="tablero">
      <ColumnaKanban 
        titulo="Pendiente" 
        estado="PENDIENTE" 
        color="#2563eb" 
        tareas={pendiente} 
        onVerTarea={onVerTarea}
        onSoltarTarea={onSoltarTarea} />
        
      <ColumnaKanban 
        titulo="En proceso" 
        estado="EN_PROCESO" 
        color="#f59e08" 
        tareas={enProceso} 
        onVerTarea={onVerTarea}
        onSoltarTarea={onSoltarTarea}/>

      <ColumnaKanban 
        titulo="Completadas" 
        estado="COMPLETA" 
        color="#16a34a" 
        tareas={completado} 
        onVerTarea={onVerTarea}
        onSoltarTarea={onSoltarTarea}/>

    </div>
  );
}
