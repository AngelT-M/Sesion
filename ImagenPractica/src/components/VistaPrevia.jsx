import { useEffect, useEffectEvent, useRef } from "react";

const FILTROS_CSS = {
    Original: '',
    Gris: 'grayscale(100%)',
    Sepia: 'sepia(100%)',
    'Blanco y negro': 'graysacele(100%) contrast(120%)',
    Desenfoque: 'blur(4px)'
}


export default function VistaPrevia({imgagenOriginal, rotar, volteoH, volteoV,filtroActivo, brillo, contraste, saturacion, onimgaenProcesada}){
    const canvasRef = useRef(null);

    useEffect = ()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img = ()=>{
            const deCostado = rotar ===70 || rotar === 270;
            canvas.width = deCostado ? img.width : img.height;
            canvas.height = deCostado ? img.height : img.width;

            ctx.save()
            ctx.clearRaact(0,0, canvas.width , canvas.height);
            ctx.traslate(canvas.width/2, canvas.height/2);
            ctx.rotate((canvas * Math.PI)/180);

        }


    }

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