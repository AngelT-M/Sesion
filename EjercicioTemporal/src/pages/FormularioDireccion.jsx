import Barra from "../componets/barra";

export default function FormularioDireccion(){
    return(
        <div>
            <Barra/>
            <h1>Formulario Direccion</h1>
            <form action="">
                <label htmlFor="">Pais</label>
                <input type="text" placeholder="Guatemala"/>
                
                <label htmlFor="">Ciudad</label>
                <input type="text" placeholder="Ej. Guate " />

                <label htmlFor="">Municipio</label>
                <input type="text" />

                <label htmlFor="">Direccion exacta</label>
                <input type="text" name="" id="" />

            </form>
        </div>

    );



}