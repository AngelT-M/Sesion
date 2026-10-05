

export default function FormularioPersonasn(){
    return(
        <div>
            <h1>Formulario Direccion</h1>
            <form action="">
                <label htmlFor="">Nombre</label>
                <input type="text" placeholder="Guatemala"/>
                
                <label htmlFor="">Edad</label>
                <input type="date" placeholder="Ej. Guate " />

                <label htmlFor="">telefono</label>
                <input type="num" />

                <label htmlFor="">Genero</label>
                <select name="" id="" disabled="disabled">
                    <option value="">Masculino</option>
                    <option value="">Femenino</option>
                </select>

            </form>
        </div>

    );



}