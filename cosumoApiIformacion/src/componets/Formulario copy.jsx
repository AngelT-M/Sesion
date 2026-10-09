



export default function Formulario(){
    
    return(
        <section className="sec-formulario">
            <div className="formularioTitulo">
                <h2>Formulario de API</h2>
            </div>
            <form action="" className="formulario">
                <label htmlFor="">UserId</label>
                <input type="text" placeholder="1,2,3,4" />

                <label htmlFor="">id</label>
                <input type="text" placeholder="1,2,3,4" />
            
                <label htmlFor="">Titulo</label>
                <input type="text" placeholder="sunt auto force" />

                <label htmlFor="">body</label>
                <input type="text" placeholder="contenido" />
            </form>
        </section>
    );
}