import Barra from "../components/Barra";
import CargarFotografia from "../components/CargarFotografia";
import VistaPrevia from "../components/VistaPrevia";
import HerramientasEdicion from "../components/HerramientasEdicion";
import { useState } from "react";


export default function EditorImagen(){
    const [imagenOriginal, setImagenOriginal] = useState(null);
    const [imagenProcesada, setImagenProcesada] = useState(null);

    const [rotacion, setRotacion] = useState(0);
    const [volteoH, setVolteoH] = useState(false);
    const [volteoV, setVolteoV] = useState(false);
    const [filtroActivo, setFiltroActivo] = useState('Original');

    const [brillo, setBrillo] = useState(100);
    const [contraste, setContraste] = useState(100);
    const [saturacion, setSaturacion] = useState(100);

    function rotar(grados){
        setRotacion(prev => (prev+grados+360)%360);
    }
    function volteoHorizontal() {
        setVolteoH(prev =>!prev);
    }
    function volteoVertical(){
        setVolteoV(prev =>!prev);
    }

    function reestablecer(){
        setRotacion(0);
        setVolteoH(false);
        setVolteoV(false);
        setFiltroActivo('Original')

        setBrillo(100);
        setContraste(100);
        setSaturacion(100);
    }

    return (
        <div className="app">
            <Barra></Barra>
            <main className="editor-layaut">
                <CargarFotografia 
                onImagenCargada = {setImagenOriginal}
                > </CargarFotografia>
                
                <VistaPrevia
                imagenOriginal={imagenOriginal}
                rotacion={rotacion}
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