export default function Ejercicio() {
  const tareas = [
    { id: 1, titulo: "Diseño de mockups" },
    { id: 2, titulo: "Configurar" },
  ];

  return (
    <ul>
      {tareas.map((tarea) => (
        <li key={tarea.id}>{tarea.titulo}</li>
      ))}
    </ul>
  );
}
