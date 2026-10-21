import { Link } from "react-router-dom";


export default function Barra(){

    return(
        <nav className="barra">
            <div className="logo">
                <h3>EDITOR IMG</h3>
            </div>
            <div className="lin">
                <Link to="/" className="link" >INICIO</Link>
                <Link to="/Editor" className="link">EDITOR IMG</Link>
            </div>
            <div className="registro">
                <a href="">acceder</a>
                <a href="" className="btn">Registro</a>
            </div>
        </nav>
    )


}