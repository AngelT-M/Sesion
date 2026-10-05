import { useState } from "react";

export default function ModalNuevaTarea({estadoInicial,onCrear,onCerrar}){
    const[titulo, setTitulo] = useState('');
    const[descripcion, setDescripcion] = useState('');
    const[categoria, setCategoria] = useState('Desarrollo');
    const[prioridad, setPrioridad] = useState('MEDIA');

    function manejarSubmit(evento){
        evento.preventDefault();

        if(!titulo.trim()) return;

        const nuevaTarea={
            id_tarea: Date.now(),
            titulo,
            descripcion,
            categoria,
            prioridad,
            estado: estadoInicial,
            usuario: 'sin asignar'
        }
        onCrear(nuevaTarea);
        onCerrar();
    }
    return(
        <div className="modal-overlay" onClick={onCerrar}>
            
            <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                <div className="contenido-titulo">
                <h1 className="titulo">AGREAGAR TAREA</h1>
                </div>
                <form onSubmit={manejarSubmit}>

                    <label htmlFor="">Titulo</label>
                    <input value={titulo} onChange={(e) => setTitulo(e.target.value)} autoFocus />

                    <label htmlFor="">Descripcion</label>
                    <textarea name="" id="" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} ></textarea>

                    <label htmlFor="">Categoria</label>
                    <select name="" id="" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="">Diseño</option>
                        <option value="">Desarollo</option>
                        <option value="">QA</option>
                    </select>

                    <label htmlFor="">Prioridad</label>
                    <select name="" id="" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                        <option value="ALTA">Alta</option>
                        <option value="MEDIA">Media</option>
                        <option value="BAJA">Baja</option>
                    </select>

                    <div className="modal-acciones">
                        <button type="button" onClick={onCerrar} className="btn btn-cerrar">Cancelar</button>
                        <button type="submit" className="btn btn-primario">Crear tarea</button>
                    </div>

                </form>

            </div>
        </div>

    );
}
