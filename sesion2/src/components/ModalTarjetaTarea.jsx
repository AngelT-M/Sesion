
export default function ModalTarjetaTarea({tarea}){
    

    return(
        <div className="modal-overlay" >
            <div className="modal-contenido">
                <div className="contenido-titulo">
                <h1>DATOS TAREA</h1>
                </div>
                <div className="tarjeta-header">
                    <h4>{tarea.titulo}</h4>
                </div>
                <p className="tarjeta_descripcion">Decripcion: {tarea.descripcion}</p>
                <p className="">Prioridad: {tarea.prioridad}</p>
                <p className="">Estado: {tarea.estado}</p>
                <p className="">Usuario: {tarea.usuario}</p>
            </div>
        </div>
    );


}