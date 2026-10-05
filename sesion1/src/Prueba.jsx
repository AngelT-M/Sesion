import { useState } from "react";

import Datos from "./Datos";

export default function Prueba() {
  const [visible, setVisible] = useState(false);

  function alternar() {
    setVisible(!visible);
  }

  return (
    <div>
      <button onClick={alternar}>
        {visible ? "Ocultar nota" : "Mostrar Nota"}
      </button>
      {visible && <Datos />}
    </div>
  );
}
