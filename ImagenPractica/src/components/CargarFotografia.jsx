import { useState } from "react";

const FORMATOS_PERMITIDOS = ['image/jpeg','image/jpg','image/png','image/webp'];
const TAMANIO_MAXIMO = 10;

function validarArchivo(Archivo){
    if (!FORMATOS_PERMITIDOS.includes(Archivo.type)) {
        return 'El formato del archivo es invalido, solo se permite, jpg, png o webp'
    }
    const tamanioMB = Archivo.size / (1024*1024);
    if (tamanioMB>TAMANIO_MAXIMO) {
        return `El archivo pesa ${tamanioMB}MB, lo maximo admitido es ${TAMANIO_MAXIMO}MB`;
    }
    return null;
}

export default function CargarFotografia({onImagenCargada}){
    const [error, setError] = useState('');
    const [arrastrar, setArrastrar] = useState(false);

    function procesarArchivo(Archivo){
        const mensajeEror = validarArchivo(Archivo);
        if (mensajeEror) {
            setError(mensajeEror)
            return;
        }
        setError('');

        const lector = new FileReader();
        lector.onload = () =>{
            onImagenCargada(lector.result);
        };
        lector.onerror = () => {
            setError('No se pudo cargar la imagen. Intenta con otro archivo.');
        };
        lector.readAsDataURL(Archivo);
    }


    function manejarSeleccion(evento){
        const Archivo = evento.target.files[0];
        if (Archivo) procesarArchivo(Archivo);
    }

    function manejarDrop(evento){
        evento.preventDefault();
        setArrastrar(false);
        const Archivo = evento.dataTransfer.files[0];
        if(Archivo) procesarArchivo(Archivo);
    }

    function manejarDragOver(evento){
        evento.preventDefault();
        setArrastrar(true);
    }
    function manejarDragLeave(){
        setArrastrar(false);
    }


    return(
        <section className="panel">
            <h3>Ingresar Archivo</h3>
            <div
            className={`dropzone ${arrastrar ? 'dropzone-activo':""}`}
            onDrop={manejarDrop}
            onDragOver={manejarDragOver}
            onDragLeave={manejarDragLeave}
            >
                <p>Arrastrear Archivo</p>
                <p>0</p>
                <label  className="btn-primario">
                    selecionar Archivo
                    <input 
                    type="file"
                    accept="image/*"
                    onChange={manejarSeleccion}
                    style={{display :`none`}}
                    />
                </label>
                <p>solo se admiten archivos PNG, JPG o WEBP</p>
            </div>
            <div>
               {error && <p className="error">{error}</p>}
                <p>El tamaño maximo permitido de los archivos es 
                    de 10MB
                </p>

            </div>
        </section>


    );
}








