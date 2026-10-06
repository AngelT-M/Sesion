

export default function Paginacion({pagina, oncambiar, deshabilitar}) {
    return (
        <section className="paginacion">
            <button
            className="btn-primario"
            onClick={()=>oncambiar(pagina-1)}
            disabled={(deshabilitar || pagina===1)}
            >
                Anterior
            </button>
            <button
            className="btn-primario"
                onClick={()=>oncambiar(pagina+1)}
                disabled={deshabilitar}
            >
                siguiente
            </button>
        </section>
    )
}