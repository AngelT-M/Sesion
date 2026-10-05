import Contador from "./Contador";
import Lista from "./Lista";

import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return ((<Contador />), (<Lista />));
}

export default App;
