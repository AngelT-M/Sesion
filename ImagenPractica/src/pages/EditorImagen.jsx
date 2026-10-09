import Barra from "../components/Barra";
import CargarFotografia from "../components/CargarFotografia";
import VistaPrevia from "../components/VistaPrevia";
import HerramientasEdicion from "../components/HerramientasEdicion";
import { useState } from "react";



export default function EditorImagen(){
    const [imagenOriginal, setImagenOriginal ] = useState(null);
    const [imagenProcesada, setImagenProcesada] = useState(null);

    const [rotar, setRotar] = useState(0);
    const [volteoH, setVolteoH] = useState(false);
    const [volteoV, setVolteoV] = useState(false);
    const [filtroActivo, setFiltroActivo] = useState('Original');

    const [brillo, setBrillo] = useState(100);
    const [contraste, setContraste] = useState(100);
    const [saturacion, setSaturacion] = useState(100);

    function rotacion(grados){
        setRotar = (prev=>(prev+grados+360)%360);
    }
    function volteoHorizontal(){
        setVolteoH(prev => !prev);
    }
    function volteoVertical(){
        setVolteoV(prev => !prev);
    }
    function reestablecer(){
        setRotar = useState(0);
        setVolteoH = useState(false);
        setVolteoV = useState(false);
        setFiltroActivo = useState('Original');

        setBrillo = useState(100);
        setContraste = useState(100);
        setSaturacion = useState(100);
    }

    return (
        <div className="app">
            <Barra></Barra>
            <main className="editor-layaut">
                <CargarFotografia 
                onIMagenCargada = {setImagenOriginal}
                > </CargarFotografia>
                
                <VistaPrevia
                imagenOriginal={imagenOriginal}
                rotar={rotar}
                volteoH={volteoH}
                volteoV={volteoV}
                filtroActivo={filtroActivo}

                brillo={brillo}
                contraste={contraste}
                saturacion={saturacion}

                onImagenProcesada={setImagenProcesada}
                
                ></VistaPrevia>
                
                <HerramientasEdicion></HerramientasEdicion>
            </main>
        </div>
    );
}