import { Link } from "react-router-dom";

export default function Barra(){


    return(
        <div>
            <nav className="barra">
                <div className="logo">
                    <p>Logo 📖 </p>
                </div>
                <div className="buscador">
                    <label className="" htmlFor="buscar">Buscar</label>
                    <input type="text" placeholder="Buscar..." id="buscar" name="buscar" />
                </div>
                <div className="links">
                    <Link className="bus" to="/" >Inicio</Link>
                    <Link className="bus" to="/editor">Editor</Link>
                </div>
            </nav>
        </div>

    );


}