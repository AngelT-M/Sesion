const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'http://localhost/fs2026/tablerokanvas/public/api';

async function peticion(ruta, { metodo = 'GET', datos } = {}) {
  let respuesta;

  try {
    respuesta = await fetch(`${BASE_URL}/${ruta}`, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: datos ? JSON.stringify(datos) : undefined,
    });
  } catch (error) {
    throw new Error(`No se pudo conectar con la API: ${error.message}`);
  }

  const contenido = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    const mensaje =
      contenido?.messages
        ? Object.values(contenido.messages).join(' ')
        : contenido?.message ?? respuesta.statusText;
    throw new Error(`Error ${respuesta.status}: ${mensaje}`);
  }

  return contenido;
}

export const tareaApi = {
  listar: () => peticion('tareas'),
  crear: (datos) => peticion('crearTarea', { metodo: 'POST', datos }),
  actualizar: (id, datos) =>
    peticion(`actualizarTarea/${id}`, { metodo: 'PUT', datos }),
};

export const categoriaApi = {
  listar: () => peticion('categoria'),
};
