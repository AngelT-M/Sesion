

export default function render({onNuevaTarea}) {
  

  return (
    <header className="app-header">
      <div className="juntar">      
        <div className="logo">Gestion de trabajo</div>
      <input
        type="text"
        className="buscador"
        placeholder="Busca tu tarea ..."
      />
      </div>

      <div className="header-derecho">
        <button
          className="btn-nuevatarea-header btn"
          onClick={onNuevaTarea}>
          + Nueva tarea</button>
      </div>

      <div className="usuario-actual">
        <span className="avatar">EM</span>
        Emma Maldonado
      </div>
    </header>
  );
}
