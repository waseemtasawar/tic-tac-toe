import Palyer from "./components/Palyer";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
function App() {
  const [activePalyer, setActivePlayer] = useState("X");

  function handleSelectedPlayer() {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Palyer
            initialName="Palyer 1"
            symbol="X"
            isActive={activePalyer === "X"}
          />
          <Palyer
            initialName="Palyer 2"
            symbol="O"
            isActive={activePalyer === "O"}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectedPlayer}
          activePlayerSymbol={activePalyer}
        />
      </div>
    </main>
  );
}

export default App;
