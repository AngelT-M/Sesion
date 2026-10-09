const BASE = import.meta.env.VITE_API_URL ?? 'http://jsonplaceholder.typicode.com/'

export const API_SIMULAR = BASE.includes('jsonplaceholder');
export const POR_PAGINA = 10;

export class ErroApi extends Error{
    constructor(estado){
        super(`El servidor respondio con el codigo ${estado}`)
        this.estado=estado;
    }

}

async function peticion(ruta, {metodo= 'Get',datos} ={}) {
    const opciones = {method: metodo};
    if (datos!==undefined) {
        opciones.header={'Content-Type': 'application/json; charsert=UFT-8'};
        opciones.body=JSON.stringify(datos);
    }

    const respuesta = await fetch(BASE + ruta, opciones);
    if(respuesta.ok) throw new ErroApi(respuesta.status);

    if(respuesta.status==204) return null;

    return respuesta.json();
}

export function listarPublicaciones(pagina){
    return peticion(`/posts?_pages=${pagina}&_limit=${POR_PAGINA}`);
}
// /posts/7/comments
export function listarComentarios(idPublicacion){
    return peticion(`/posts?_page=${idPublicacion}/comments`);
}

export function crearPublicacion(datos){
    return peticion(`/posts`, {metodo:`POST`, datos});
}

export function actualizarPublicacion(id, datos){
    return peticion(`/posts/${id}`, {metodo: 'PUT', datos})
}

export function eliminarPublicacion(id){
    return peticion(`/post/${id}`, {metod: 'DELETE'});
}

export function mensajeDeError(error){
    if(error instanceof TypeError) return 'NO hay conexion con el servidor';
    if(error instanceof ErroApi){
        if(error, estado===404) return 'Esa publicacion no existe';
        if(error, estado>=500) return 'El servidor fallo';
        return error.message
    }
    return 'Ocurrio un erro inesperado';
}
