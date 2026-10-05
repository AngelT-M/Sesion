import { useRef } from "react";

const FILSTROS_CSS = {
    Original: '',
    Gris: 'graysacale(100%)',
    Sepia: 'sepia(100%)',
    'Blanco Y Negro': 'grayscale(100%) contrast(120%)',
    Desenfoque: 'blur(4px)'
}


export default function VistaPrevia({imagenOriginal, rotacion, volteoH, volteoV, filtroActivo, brillo, contraste, saturacion, onImagenProcesada}){
    
    const canvasRef = useRef(null);

    
  
    return(
        <section className="panel">
            <h3>Vistra previa</h3>
            <div className="vista-previa">

            <canvas></canvas>
            <p>Aqui aparece tu imagen</p>
            </div>
        </section>
    );
}