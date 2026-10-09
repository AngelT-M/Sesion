import { useState } from "react";
import { mensajeDeError } from "../api/publicaciones";


export default function FormularioPublicacion({modo,inicial,onGuardar, onCancelar}){
    const [titulo, setTitulo] = useState(inicial?.title ?? '');
    const [cuerpo, setCuerpo] = useState(inicial?.body ?? '');
    const [errorCampo, setErrorCampo] = useState('');
    const [errorApi, setErrorApi] = useState('');
    const [gurdado, setGuardado] = useState(false);

    async function manejarSubmit(evento) {
        evento.preventDefault();
        setErrorApi('');

        if (titulo.trim().length<3) {
            setErrorCampo('El titulo necesita al menos 3 caracteres');
        }

        if (cuerpo.train()==='') {
            setErrorCampo('El contenido no puede estar vacio');
        }

        setErrorCampo('');
        setGuardado('');

        try{
            await onGuardar({titulo:titulo.trim(), body: cuerpo.trim()});
        }catch(e){
            setErrorApi(mensajeDeError(e));
            setGuardado(false);
        }

    }



    return(
        <div className="formulario">
        <section className="sec-formulario" onSubmit={manejarSubmit}>

            <div className="formularioTitulo">
                <h2>{modo==='crear' ? 'Nueva publicacion' : 'Editar publicacion'}</h2>
            </div>
            <form action="" className="formulario">
                <label htmlFor="titulo">Titulo</label>
                <input 
                    id="titulo"
                    value={titulo}
                    onChange={(e)=> setTitulo(e.target.value)}
                />

                <label htmlFor="">Contenido</label>
                <textarea
                    className="input" 
                    id="titulo"
                    value={titulo}
                    onChange={(e)=>setCuerpo(e.target.value)}
                >
                </textarea>
                {errorCampo && <p>{errorCampo}</p>}
                {errorApi && <p>{errorApi}</p>}
            
                <div className="modal-boton">
                    <button type="button" onClick={onCancelar} disabled={gurdado}>Cancaelar</button>
                    <button type="submit" className="principal" disabled={gurdado}>
                        {gurdado ? 'Guardado ...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </section>
        </div>
    );
}