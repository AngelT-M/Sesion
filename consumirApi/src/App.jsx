import './App.css'
import DetalleFoto from './components/DetalleFoto';
import Header from './components/Header';
import Paginacion from './components/Paginacion';
import TarjetaFoto from './components/TarjetaFoto';
import { useState, useEffect } from 'react';
import { listaFotos, mensajerError } from './api/picsum';


function App() {
  const [fotos, setFotos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [idSeleccionada, setIdSeleccionada] = useState(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
  let cancelado = false;

  async function cargar() {
    setCargando(true);
    setError('');
    try {
      const datos = await listaFotos(pagina);
      if (!cancelado) setFotos(datos);
    } catch (e) {
      if (!cancelado) setError(mensajerError(e));
    } finally {
      if (!cancelado) setCargando(false);
    }
  }

  cargar();

  return () => {
    cancelado = true;
  };
  }, [pagina, intento]);

  const fotosVisibles = fotos.filter((foto) =>
    foto.author.toLowerCase().includes(busqueda.toLocaleLowerCase())
  );



  return (
    <main className='principal'>
        
        <div className='barra'>
        <h1>Exlorador de fotos</h1>
        
        <div className='barra-busc'>
        <label htmlFor="">buscar</label>
        <input 
        className='buscador'
        placeholder='Buscar por autor'
        value={busqueda}
        onChange={(e)=> setBusqueda(e.target.value)}/>

        {cargando && <p className='estado'>Cargando fotos ...</p>}

        {!cargando && error &&(
          <div className='estado'>
            <p>{error}</p>
            <button onClick={()=> setIntento(intento+1)}>Reintentar</button>
          </div>
        )}
        </div>
        <p>Datos de la Api publuica PICSUM</p>
        </div>

        {!cargando && !error && fotosVisibles.length== 0 &&(
          <p className='estado'>No hay fotos de ese autor para mostrar</p>
        )}

        {!cargando && !error && fotosVisibles.length>0 &&(
          <div className='fotos-cont cont'>
              {fotosVisibles.map((foto) => (
                  <TarjetaFoto
                  key={foto.id}
                  foto={foto}
                  onSeleccionar={setIdSeleccionada}
                  ></TarjetaFoto>
              ))}
          </div>
        )}

        <Paginacion pagina={pagina} oncambiar={setPagina} deshabilitar={cargando}></Paginacion>

        {idSeleccionada &&(
          <DetalleFoto
          id={idSeleccionada}
          onCerrrar={()=>setIdSeleccionada(null)}
          ></DetalleFoto>

        )}

    </main>
  )
}

export default App
