import { useState } from "react";

const FORMATO_ARCHIVO = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const TAMANIO_PERMITIDO = 10;

function validarArchivo(Archivo){
    if (!FORMATO_ARCHIVO.includes(Archivo.type)) {
        return 'El formato del archivo es invalido ';
    }
    const tamanioMB = Archivo.size / (1024*1024);
    if (tamanioMB>TAMANIO_PERMITIDO) {
        return `El archivo pesa ${tamanioMB}, lo maximo permitido es ${TAMANIO_PERMITIDO}`;
    }
    return null;
}
export default function CargarFotografia({onImagenCargada}){
    const [error, setError] = useState('');
    const [arrastrar, setArrastrar] = useState(false);

    function procesarArchivo(Archivo){
        const mensajeError = validarArchivo(Archivo)
        if (mensajeError) {
            setError(mensajeError)
            return;
        }
        setError('');

        const Lector = new FileReader();
        Lector.onload = ()=>{
            onImagenCargada(Lector.result);
        };
        Lector.readAsDataURL(Archivo);
    }

    function seleccionarDrop(evento){
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
            onDragLeave={manejarDragLeave}
            onDragOver={manejarDragOver}
            >
                <p>Arrastrear Archivo</p>
                <p>0</p>
                <label  className="btn-primario">
                    selecionar Archivo
                    <input
                    type="file"
                    accept="image/*"
                    onChange={seleccionarDrop}
                    style={{display: 'none'}}
                    />
                </label>
                <p>solo se admiten archivos PNG, JPG o WEBP</p>
            </div>
            <div>
                {error && <p className="ms-error">{error}</p>}
                <p>El tamaño maximo permitido de los archivos es 
                    de 10MB
                </p>

            </div>
        </section>


    );
}








