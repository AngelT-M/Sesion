// URL base de la API — cámbiala según tu proyecto
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost/fs2026/tableroKanbanClase/public/api';

// ── Función genérica que hace todas las peticiones HTTP ──────────────
async function peticion(ruta, { metodo = 'GET', datos } = {}) {

  const respuesta = await fetch(`${BASE_URL}/${ruta}`, {
    method: metodo,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: datos ? JSON.stringify(datos) : undefined,
  }).catch(() => { 
    throw new Error('No se pudo conectar con el servidor'); 
  });

  const json = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    const msg = json?.message ?? json?.messages
      ? Object.values(json.messages ?? {}).join(' ')
      : respuesta.statusText;
    throw new Error(`Error ${respuesta.status}: ${msg}`);
  }

  return json;
}

// ── Tareas ────────────────────────────────────────────────────────────
export const tareaApi = {
  mostrar: () => peticion('tareas'),
  crear: (datos) => peticion('tareaCrear', { metodo: 'POST', datos }),
  actualizar: (id, datos) => peticion(`tareaActualizar/${id}`, { metodo: 'PUT', datos }),
  eliminar: (id) => peticion(`tareaEliminar/${id}`, { metodo: 'DELETE' }),
};

// ── Categorías ────────────────────────────────────────────────────────
export const categoriaApi = {
  mostrar: () => peticion('categorias'),
};

// ── Usuarios ──────────────────────────────────────────────────────────
export const usuarioApi = {
  mostrar: () => peticion('usuarios'),
};
