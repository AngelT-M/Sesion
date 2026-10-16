import { useEffect, useRef } from "react";

const FILTROS_CSS = {
    Original: '',
    Gris: 'grayscale(100%)',
    Sepia: 'sepia(100%)',
    'Blanco y Negro' : 'grayscale(100%) contrast(120%)',
    Desenfoque: 'blur(4px)'
}

export default function VistaPrevia(imagenOriginal, rotacion, volteoH, volteoV, filtroActivo, brillo, contraste, saturacion, onImagenProcesada){
    const canvasRef = useRef(null);

    useEffect(()=>{
        if(imagenOriginal)return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload=()=>{
            const deCostado = rotacion===90 || rotacion==270;
            canvas.width = deCostado ? img.height : img.width;
            canvas.height = deCostado ? img.width : img.height;
            
            ctx.save()
            ctx.clearReact(0,0, canvas.width, canvas.height);
            ctx.translate(canvas.width/2 , canvas.height/2);
            ctx.rotate((rotacion * Math.PI)/180);
            ctx.scale(volteoH ? -1 : 1 , volteoV ? -1 : 1);

            const filtroBase = FILTROS_CSS[filtroActivo] || '';
            ctx.filter = `${filtroBase} brightness(${brillo}%) contrast(${contraste}%) saturate(${saturacion}%)`.trim();
            ctx.drawImage(img, -img.width/2 , -img.height/2);
            ctx.restore();
        }
        img.src = imagenOriginal;

    },[imagenOriginal, rotacion, volteoH, volteoV, filtroActivo, brillo, contraste, saturacion, onImagenProcesada]
);
    

    return(
        <section className="panel">
            <h3>Vistra previa</h3>
            <div className="vista-previa-area">
            {imagenOriginal ? (
                <canvas ref={canvasRef}></canvas>
            ):(
                <p>Aqui se mira la imagen</p>
            )}              
            </div>
        </section>
    );
}