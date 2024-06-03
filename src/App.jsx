import Palyer from "./components/Palyer";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
function App() {
  const [activePalyer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectedPlayer(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
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
        <GameBoard onSelectSquare={handleSelectedPlayer} turns={gameTurns} />
      </div>
      <Log />
    </main>
  );
}

export default App;
