import { useState } from "react";

const FORMATO_VALIDO =['image/jpeg', 'image/jpg', 'image/pgn', 'image/webp'];
const TAMANIO_MAXIMO =10;

function validarArchivo(Archivo){
    if (!FORMATO_VALIDO.includes(Archivo.type)) {
        return 'EL formato no es valido, valido solo JPG, PGN o WEBP';
    }
    const tamanioMB = Archivo.size / (1024*1024);
    if (tamanioMB>TAMANIO_MAXIMO) {
        return `El archivo pesa ${tamanioMB}MB, maximo permitod ${TAMANIO_MAXIMO}MB`;
    }
    return null;
}

export default function CargarFotografia({onImagenCarga}){
    const [error, setError] = useState('');
    const [arrastrar, setArrastrar] = useState(false);

    function procesarArchivo(Archivo){
        const mensajeError = validarArchivo(Archivo);
        if (mensajeError) {
            setError(mensajeError)
            return;
        }
        setError('');

        const Lector = new FileReader();
        Lector.onload = ()=>{
            onImagenCarga=(Lector.result);
        };
        Lector.readAsDataURL(Archivo);
    }

    function manejarSeleccion(evento){
        const Archivo = evento.target.files[0];
        if(Archivo) procesarArchivo(Archivo);
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
                    style={{display: 'none'}}
                    />
                </label>
                <p>solo se admiten archivos PNG, JPG o WEBP</p>
            </div>
            <div>
                {error && <p>{error}</p>}
                <p>El tamaño maximo permitido de los archivos es 
                    de 10MB
                </p>

            </div>
        </section>


    );
}








