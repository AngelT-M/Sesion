import Barra from "../components/Barra";
import CargarFotografia from "../components/CargarFotografia";
import VistaPrevia from "../components/VistaPrevia";
import HerramientasEdicion from "../components/HerramientasEdicion";
import { useState } from "react";



export default function EditorImagen(){

    const [imagenOriginal, setImagenOriginal]  = useState(null);
    const [imagenProcesada, setImagenProcesada] = useState(null);

    const [rotarcion, setRotacion] = useState(0);
    const [volteoH, setVolteroH] = useState(false);
    const [volteroV, setVoleteoV] = useState(false);
    const [filtroActivo, setFiltroActico] = useState('Original');

    const [brillo, setBrillo] = useState(100);
    const [contraste, setContraste] = useState(100);
    const [saturacio, setSaturacion] = useState(100);

    const [galeria, setGaleria ]  = useState([]);

    function rotar(grados){
        setRotacion(prev =>(prev+grados+360)%360);
    }
    function volteoHorizontal(){
        setVoleteoV(prev => !prev);
    }    
    function volteoVertical(){
        setVoleteoV(prev => !prev)
    }

    function reestablecer(){
        setRotacion = useState(0);
        setVoleteoV = useState(false);
        setVolteroH = useState(false);
        setFiltroActico = useState('Original');

        setBrillo = useState(100);
        setContraste = useState(100);
        setSaturacion = useState(100);
    
    }


    return (
        <div className="app">
            <Barra></Barra>
            <main className="editor-layaut">
                <CargarFotografia 
                onImagenCargada={setImagenOriginal}
                > </CargarFotografia>
                
                <VistaPrevia
                imagenOriginal={imagenOriginal}
                rotacion={rotarcion}
                volteoH={volteoH}
                volteoV={volteroV}
                filtroActivo={filtroActivo}

                brillo={brillo}
                contraste={contraste}
                saturacio={saturacio}

                onImagenProcesada={setImagenProcesada}

                ></VistaPrevia>
                
                <HerramientasEdicion></HerramientasEdicion>
            </main>
        </div>
    );
}