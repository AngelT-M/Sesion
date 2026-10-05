import Barra from "../componets/barra"

export default function Inicio() {
  return (
    <div>
      <Barra />
      <br />
      <div className="contenido">
        <h1>Cotenido Pagina</h1>
        <div className="datos-personales">
          <h3>Datos Peronales</h3>
          <p>nombre: Miguel Angel Tomas</p>
          <p>Edad: 20 años</p>
        </div>
      </div>
    </div>
  )
}