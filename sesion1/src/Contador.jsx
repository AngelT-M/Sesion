import { useState } from "react";

function Contador() {
  const [clics, setClics] = useState(0);

  return (
    <dir>
      <p>Has hecho clic {clics} veces</p>
      <button onClick={() => setClics(clics + 1)}>Clic boton</button>
    </dir>
  );
}
export default Contador;



