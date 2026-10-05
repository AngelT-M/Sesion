import { useState } from "react";

export default function Interruptor() {
  const [visible, setVisible] = useState(false);

  function alternar() {
    setVisible(!visible);
  }

  return (
    <div>
      <button onClick={alternar}>
        {visible ? "Ocultar mensaje" : "Mostrar mensaje"}
      </button>
      {visible && <p>Aqui esta el mensaje!</p>}
    </div>
  );
}
