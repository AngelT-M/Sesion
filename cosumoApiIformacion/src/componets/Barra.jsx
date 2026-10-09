

export default function Barra(){
    


    return(
        <nav className="barra">
            <div>
                <h4>Logotipo</h4>
            </div>
            <div>
                <label htmlFor="barra">Buscar</label>
                <input id="barra" type="text"  placeholder="Buscar...."/>
            </div>

            <div>
                <a href="">inicio</a>
                <a href="">formulario</a>
            </div>

        </nav>
    );
}