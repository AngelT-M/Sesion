const BASE_URL = import.meta.env.VITE_API_BAE ?? 'http://localhost/fs2026/tableroKanbanClase/public/';


async function peticion(ruta, {modelo='GET', datos}={}) {
   
    const respuesta = await fetch(`${BASE_URL}/${ruta}`,{
        method:modelo,
        headers: {'Content-Type':'Application/json', Accept:'Application/json'},
        body: datos ? JSON.stringify(datos): undefined
    }).catch(()=>{
        throw new Error('Error con la nocexion a base de datos');
    });

    const json = respuesta.json().catch(()=>null);

    if (! respuesta.ok) {
        const ms = json?.message ?? json?.messages
        ? Object.values(json.message ?? {}).join(' ')
        : respuesta.statusText;
    }
    return json;

}

export const tareaApi = {
    mostrar: ()=>peticion('tareas'),
    crear: (datos)=>peticion('tareascrear',{modelo:'POST',datos}),
    actualizar: (id, datos)=>peticion(`tareaActualizar/${id}`,{modelo:'PUT',datos}),
    eliminar:(id)=>peticion(`eliminartarea/${id}`,{modelo:'DELETE'})
}

export const categoriaApi ={
    mostrar: ()=>peticion('categorias')
}
export const usuarioApi = {
    mostrar: ()=>peticion('usuarios')
}


