export default function Header(){
      return(
        <header className="app-header">
            <div className="logo">
                <input type="text" 
                className="buscador"
                placeholder="busca tu tarea...."
                />
            </div>
            <div className="usuario-actual">
                <span className="avatar">EM</span>
                Emma Maldonado
            </div>
        </header>
      );  
}