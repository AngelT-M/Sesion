import { useState } from "react";

const FORMATO_IMAGEN = ['image/jpg','image/jpeg', 'image/png', 'image/webp'];
const TAMANIO_MAXIMO = 10;

function validarArchivo(Archivo){
    if (!FORMATO_IMAGEN.includes(Archivo.type)) {
        return `Formato de imagen no perimitida`;
    }
    const tamanioMB = Archivo.size / (1024*1024);
    if (tamanioMB>TAMANIO_MAXIMO) { 
        return `EL Archivo pesa ${Math.round( tamanioMB)}MB, tamaño maximo admito ${TAMANIO_MAXIMO}MB`;
    }
    return null;
}

export default function InsertarImagen({onImagenOriginal}){
    const [error, setError] = useState('');
    const [arrastrar, setArrastrar]= useState(false);

    function procesarImagen(Archivo){    
        const mensajeError = validarArchivo(Archivo);
        if (mensajeError) {
            return setError(mensajeError);
        }        
        setError('')

        const lector = new FileReader();
        lector.onload=()=>{
            onImagenOriginal(lector.result);
        }
        lector.readAsDataURL(Archivo);
    }

    function manejarSelecion(accion){
        const Archivo = accion.target.files[0];
        if (Archivo) procesarImagen(Archivo);
    }

    function manejarDrop(accion){
        accion.preventDefault();
        setArrastrar(false);
        const Archivo = accion.dataTransfer.files[0];
        if(Archivo) procesarImagen(Archivo);
    }

    function manejarDragOver(accion){
        accion.preventDefault();
        setArrastrar(true);
    }
    function manejarDragLeave(){
        setArrastrar(false);
    }

    return(
        <section className="sec">
            <h2>ingresar Imagen</h2>
            <div
                className={`dropzone : ${arrastrar ? 'dropzoneActiovo':"" }`}
                onDrop={manejarDrop}
                onDragOver={manejarDragOver}
                onDragLeave={manejarDragLeave}

            >
                <p>arragrar imagen</p>
                <p>o</p>
                <label className="btn2">
                    selecionar Imagen
                    <input 
                    type="file" 
                    accept="image/*"
                    onChange={manejarSelecion}
                    style={{display: 'none'}}
                    />
                </label>
            </div>
            <div>
                {error && <p>{error}</p>}
                <p>el tamo maximo es de 10MB</p>
                <p>solo de admite archivos JPEG, PNG 0 WEBP</p>
            </div>


        </section>


    )


}