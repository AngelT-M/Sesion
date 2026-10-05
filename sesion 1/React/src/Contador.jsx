import { useState } from "react";

function Contador() {
  const [clics, setClics] = useState(0);

  return (
    <div>
      <p>Has hecho clic {clics} veces</p>
      <button onClick={() => setClics(clics + 1)}>clic al boton</button>
    </div>
  );
}

export default Contador;
