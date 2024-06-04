import Palyer from "./components/Palyer";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import { useState } from "react";
import { useEffect } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function currentActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  // const [activePalyer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  const activePalyer = currentActivePlayer(gameTurns);

  // Update gameBoard state based on turns
  useEffect(() => {
    const updatedBoard = [...initialGameBoard];
    for (const turn of gameTurns) {
      const { square, player } = turn;
      if (square && square.row !== undefined && square.col !== undefined) {
        updatedBoard[square.row][square.col] = player;
      } else {
        // Handle unexpected data format (optional)
        console.error("Invalid turn data:", turn);
      }
    }
    setGameBoard(updatedBoard);
  }, [gameTurns]);
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  function handleSelectedPlayer(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      const currentPlayer = currentActivePlayer(prevTurns);

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
        {winner && <p>You win, {winner}!</p>}
        <GameBoard onSelectSquare={handleSelectedPlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
