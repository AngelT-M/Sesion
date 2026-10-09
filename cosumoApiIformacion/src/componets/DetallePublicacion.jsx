import { use, useEffect, useState } from "react";

import { listarComentarios, mensajeDeError } from "../api/publicaciones";


export default function DeteallePublicacion({publicacion,onCerrar}){
    const [comentario, setComentario] = useState(null);
    const [error, setError] = useState('');

    useEffect(()=>{
        if(publicacion.local) return;

        let cancelar = false;
        listarComentarios(publicacion.id)
        .them((datos)=>{
                if(!cancelar) setComentario(datos);
        })
        .catch((e)=>{
            if(!cancelar) setError(mensajeDeError(e));
        })
        return() =>{
            cancelar=true;
        }
    }, [publicacion]);

    const cargando = !publicacion.local && comentario=== null && !error;
    const lista = comentario ??[];

    return(
        <div className="fondo-modal0" onClick={onCerrar}>
            <div className="modal modal-ancho" onClick={(e)=> e.stopPropagation}>
                <button className="modal-cerrar" onClick={onCerrar} aria-label="Cerrar">X</button>
                <h2>{publicacion.title}</h2>
                <p>{publicacion.body}</p>

                <h3>Comentarios</h3>
                {cargando && <p>Cargado Comentario ...</p>}
                {error && <p className="menaje-error">{error}</p>}

                <ul className="comentarios">
                    {
                        lista.map((e)=>{
                            <li key={e.id}>
                                <strong>{e.email}</strong>
                                <p>{e.body}</p>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>

    );

}

