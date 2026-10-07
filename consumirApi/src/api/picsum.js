const BASE = 'https://picsum.photos/';

/*funcion para listar fotos  */
export async function listaFotos(pagina, limite =12) {
    const respuesta = await fetch(`${BASE}v2/list?page=${pagina}&limit=${limite}`);

    if (!respuesta.ok) {
        throw new Error(`El servidor respondio con el codigo ${respuesta.status}`)
    }
    return respuesta.json();

}

export async function obtenerFoto(id) {
    const respuesta = await fetch(`${BASE}/id/${id}/info`);
    if (!respuesta.ok) {
        throw new Error(`El servidor respondio con el codigo ${respuesta.status}`);
    }
    return respuesta.json();
}

export function urlMiniatura(id, ancho=400, alto=400){
    return `${BASE}id/${id}/${ancho}/${alto}`;
}

export function mensajerError(error){
    if (error instanceof TypeError) {
        return 'No hay conexion con el servidor, revise su internet.';
    }
    return error.message;
}


