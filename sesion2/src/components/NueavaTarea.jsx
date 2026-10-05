export default function NuevaTarea(){
    return( 

        <div>
            <button className="btn-nueva-tarjeta" /*onClick={{miCuadro.showMOdal()}}*/>nueva tarjeta</button>

            <dialog id="miCuadro">
            <p>Datos</p>
            <button onclick="miCuadro.close()">Cancelar</button>
            <button onclick="alert('Guardado'); miCuadro.close()">Confirmar</button>
            </dialog>
        </div>
    );
}