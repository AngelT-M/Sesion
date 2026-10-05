import { Link } from "react-router-dom";


export default function Barra(){

    return(
        <div className="div-barra">
            <nav className="barra">
                <div className="logo">
                    <a href="">logotipo</a>
                </div>
                <div className="busqueda">
                    <p>buscador</p>
                    <input type="text" className="barra-buscador" placeholder="Buscar..."/>                    
                </div>
                <div className="links">
                    <a href=""  >📖</a>
                    <a href=""  >📅</a>
                    <a href="" >📸</a>
                </div>
            </nav>
        </div>
    );


}