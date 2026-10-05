const COLORES_PRIORIDAD={
    ALTA: '#ef4444',
    MEDIA: '#f59e08',
    BAJA: '#16a34a'
};

function obtenerIniciales(nombreCompleto){
    return nombreCompleto
    .split(' ')
    .map(palabra => palabra[0])
    .join('')
    .toUpperCase();
}

export default function TarjetaTarea({tarea}){
    return(
        <div className="tarjeta-tarea">
            <div className="tarjeta-header">
                <h4>{tarea.titulo}</h4>
            </div>
            <p className="tarjeta-descripcion">{tarea.descripcion}</p>
            <div className="tarjeta-footer">
                <span 
                className="badge-prioridad" 
                style={{backgroundColor: COLORES_PRIORIDAD[tarea.prioridad]}}
                >
                    {tarea.prioridad === 'ALTA' && `🔴`}
                    {tarea.prioridad === 'MEDIA' && `🟠`}
                    {tarea.prioridad === 'BAJA' && `🟢`}
                    {' '}{tarea.prioridad}
                </span>
                <span className="avatar-pequeno">{obtenerIniciales(tarea.usuario)}</span>
            </div>
        </div>
    );
}