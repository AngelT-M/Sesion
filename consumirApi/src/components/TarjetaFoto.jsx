import { urlMiniatura } from "../api/picsum";
import DetalleFoto from "./DetalleFoto";

export default function TarjetaFoto({foto, onSeleccionar}) {
    return (
        <button
        className="tarjeta"
        onClick={()=>onSeleccionar(foto.id)}
        >
        <img
            src={urlMiniatura(foto.id)}
            alt={`Foto de ${foto.author}`}
            loading="lazy"
        ></img>
        <span className="tarjeta-autor">{foto.author}</span>
        </button>
        
    )
}