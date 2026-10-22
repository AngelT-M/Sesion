const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost/fs2026/tableroKanbanClase/public/';

async function peticion(ruta, {metodo='GET',datos}={}) {
    
    const respuesta = await fetch(`${BASE_URL}/${ruta}`,{
        method:metodo,
        headers: {'Content-Type':'Application/json',Accept:'Application/json'},
        body: datos ? JSON.stringify(datos):undefined
    }).catch(()=>{
        throw new Error('Error al conectarse al servidor')
    });

    const json = await respuesta.json().catch(()=>null);

    if (!respuesta.ok) {
        const ms = json?.message ?? json?.messages
        ? Object.values(json.messages ?? {}).join(' ')
        : respuesta.statusText;
        throw new Error(`Erorr ${respuesta.status}: ${ms}`);
    }

    return json;
}

export const tareaApi ={
    mostrar: ()=>peticion('tarea'),
    crear: (datos)=>peticion('tareaCrear',{metodo:'POST',datos}),
    actualizar: (id,datos)=>peticion(`tareaActualizar${id}`,{metodo:'PUT',datos}),
    elimiar: (id)=>peticion(`tareaEliminar${id}`, {metodo: 'DELETE'})
};

export const categoriaApi = {
    mostrar: ()=>peticion('categorias')
};
export const usuarioApi ={
    mostrar: ()=>peticion('usuarios')
};





