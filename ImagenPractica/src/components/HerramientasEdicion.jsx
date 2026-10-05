export default function HerramientasEdicion(){


    return(
        <section className="panel">
            <div className="herraminetas">
                <h3>Herramientas edicion</h3>
            </div>
            <div className="formato">

                <div className="grupo">
                    <p>filtros</p>
                    <div className="filtro-grid">
                        <button>sepia</button>
                        <button>blaco y negro</button>
                        <button>as</button>
                        <button>as</button>
                        <button>as</button>
                    </div>
                </div>

                <div className="grupo">
                    <p>Ajustes</p>
                    <div>
                        <label htmlFor="">Brillo</label>
                        <input type="range" disabled />
                    </div>
                    <div>
                        <label htmlFor="">Consteaste</label>
                        <input type="range" disabled />
                    </div>
                    <div>
                        <label htmlFor="">Saturacion</label>
                        <input type="range" disabled />
                    </div>
                </div>

                <div className="grupo">
                    <p>Trasformar</p>
                    <div className="botones-trasformar">
                        <button>90° Izquierdo</button>
                        <button>180°</button>
                        <button>90° Derecha</button>
                        <button>Originarl</button>
                    </div>

                    <div className="botones-trasformar">
                        <button>Horizontal</button>
                        <button>Vertical</button>
                    </div>

                </div>

            </div>

            <div className="acciones-finales">
                <button className="btn-secundario">Restablecer</button>
                <button className="btn-primario">Agrefar a galeria</button>
            </div>


        </section>


    )

}