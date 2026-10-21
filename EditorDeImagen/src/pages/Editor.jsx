import { useState } from "react";
import Barra from "../components/Barra";
import HerramientasEdicion from "../components/HerramientasEdicion";
import InsertarImagen from "../components/InsertarImagen";
import MostrarImagen from "../components/MostarImagen";


export default function Editor(){
    const [imagenOriginal, setImagenOriginal] = useState(null);
    const [imagenProcesada, setImagenProcesada] = useState(null);

    const [rotar, setRotar] = useState(0);
    const [volteoH, setVolteoH] = useState(false);
    const [volteoV, setVolteoV] = useState(false);

    const [filtroActivo, setFiltroActivo] = useState('Original');

    const [brillo, setBrillo] = useState(100);
    const [contraste, setContraste] = useState(100);
    const [saturacion, setSaturacion] = useState(100);

    function Rotacion(grados){
        setRotar(prev => (prev+grados+360)%360);
    }
    function VolteoHorizontal(){
        setVolteoH(prev => !prev);
    }
    function VolteoVertical(){
        setVolteoV(prev => !prev);
    }

    function restablecer(){
        setRotar(0)
        setVolteoH(false);
        setVolteoV(false);
        setFiltroActivo('Original')

        setBrillo(100)
        setContraste(100)
        setSaturacion(100)
    }

    return(
        <div>
            <Barra></Barra>
            <div className="secciones">
                <InsertarImagen
                onImagenOriginal={setImagenOriginal}
                ></InsertarImagen>

                <MostrarImagen
                imagenOriginal={imagenOriginal}

                rotar={rotar}
                volteoH={volteoH}
                volteoV={volteoV}

                filtroActivo={filtroActivo}

                brillo={brillo}
                contraste={contraste}
                saturacion={saturacion}
                
                onImgaenProcesada={setImagenProcesada}
                ></MostrarImagen>

                <HerramientasEdicion
                imagenCargada={!!imagenOriginal}
                onFiltroActivo={setFiltroActivo}

                brillo={brillo}
                contraste={contraste}
                saturacion={saturacion}
                onManejarBrillo={setBrillo}
                onManejarContraste={setContraste}
                onManejarSatutacion={setSaturacion}

                onImagenProcesada={setImagenProcesada}    

                onRotarIzquierda={()=>Rotacion(-90)}
                onRotarDerecha={()=>Rotacion(90)}
                onRotar180={()=>Rotacion(180)}
                onRegresarRotacion={()=>setRotar(0)}

                onVolteoHorizontal={VolteoHorizontal}
                onVolteoVeritical={VolteoVertical}
                onRestablecer={restablecer}

                 
                ></HerramientasEdicion>
            </div>            
        </div>
    )

}