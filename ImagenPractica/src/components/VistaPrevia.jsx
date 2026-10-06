import { useEffect, useRef } from "react";

const FILTROS_CSS = {
    Original: '',
    Gris: 'grayscale(100%)',
    Sepia: 'sepia(100%)',
    'Blanco y negro': 'grayscale(100%) contrast(120%)',
    Desenfoque: 'blur(4px)'
}

export default function VistaPrevia({imagenOriginal, rotacion, volteoH, volteoV, filtroActivo, brillo, contraste, saturacion, onImagenProcesada}){

    const canvasRef = useRef(null);

    useEffect(()=>{
        if(!imagenOriginal)return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();



    })

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