import { useState, useEffect } from "react"
import { obtenerFoto, mensajerError, urlMiniatura } from "../api/picsum"


export default function DetalleFoto({id,onCerrrar}) {
    const [foto, setFoto] = useState(null);
    const [error, setError] = useState('');

    useEffect(()=>{
        let cancelado = false;
        obtenerFoto(id)
            .then((datos)=>{
                if(!cancelado) setFoto(datos);
            })
            .catch((e)=>{
                if(!cancelado) setError(mensajerError(e));
            })

            return()=>{
                cancelado=true;
            };
    }, [id]);


    return (
        <section className="fondo-modal detalle-foto" onClick={onCerrrar}>

            <div className="modal" onClick={(e)=>e.stopPropagation()}>
                <button className="modal-cerrar btn-primario" onClick={onCerrrar} aria-label="Cerrar" >X</button>
            </div>
            {error && <p className="mensaje-error">{error}</p>}
            {!error && !foto && <p>Cargando Foto...</p>}


            {foto && (
                <>
                    <img
                    className="modal-imagen"
                    src={urlMiniatura(foto.id, 800, 600)}
                    alt={`foto de ${foto.author}`}
                    />
                    <h2>{foto.author}</h2>
                    <p>
                        Original: {foto.width} x {foto.height} px
                    </p>
                    <a href={foto.url} target="_blank" rel="noreferrer">
                        Ver foto original
                    </a>
                </>

            )}
        </section>
    )
}