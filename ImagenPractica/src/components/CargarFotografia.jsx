import { useState } from "react";

const FORMATO_PERMITDO = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const TAMANIO_MAXIMO = 10;

function validarArchivo(Archivo){
    if (FORMATO_PERMITDO.includes(Archivo.type)) {
        return 'EL el archivo tiene un formato invalido';
    }
    const tamanioMB = Archivo.size / (1024*1024);
    if (tamanioMB>TAMANIO_MAXIMO) {
        return `El archivo pesas ${tamanioMB}, lo maximo permitido es ${TAMANIO_MAXIMO}`;
    }
    return null;
}
export default function CargarFotografia({onImagenCargada}){
    const [error, setError] = useState('');
    const [arrastrar, setArrastrar] = useState(false);

    function procesarArchivo(Archivo){
        const mensjeError = validarArchivo(Archivo);
        if (mensjeError) {
            setError(mensjeError)
            return;
        }
        setError('');

        const lector = new FileReader();
        lector.onload = ()=>{
            onImagenCargada(lector.result);
        }
        lector.readAsDataURL(Archivo);
    }

    function manejarSeleccion(evento){
        const Archivo = evento.target.files[0];
        if(Archivo) procesarArchivo(Archivo);
    }

    function manejarDrop(evento){
        evento.prevenDefault();
        setArrastrar(false);
        const Archivo = evento.dataTrasfer.files[0];
        if(Archivo) procesarArchivo(Archivo);
    } 
    function manejarDragOver(evento){
        evento.prevenDefault();
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
                    type="files"
                    accept="image/*"
                    onChange={manejarSeleccion}
                    style={{display: 'none'}}
                    />
                </label>
                <p>solo se admiten archivos PNG, JPG o WEBP</p>
            </div>
            <div>
                <p>El tamaño maximo permitido de los archivos es 
                    de 10MB
                </p>

            </div>
        </section>


    );
}








