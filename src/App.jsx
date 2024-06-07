import Palyer from "./components/Palyer";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";
import { useState } from "react";
import { useEffect } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 1",
};

function currentActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function driveWinner(gameBoard, players) {
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
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  // const [activePalyer, setActivePlayer] = useState("X");
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  const activePalyer = currentActivePlayer(gameTurns);
  useEffect(() => {
    const updatedBoard = [...initialGameBoard.map((array) => [...array])];
    for (const turn of gameTurns) {
      const { square, player } = turn;
      if (square && square.row !== undefined && square.col !== undefined) {
        updatedBoard[square.row][square.col] = player;
      } else {
        console.error("Invalid turn data:", turn);
      }
    }
    setGameBoard(updatedBoard);
  }, [gameTurns]);

  const winner = driveWinner(gameBoard, players);
  const hasDrawa = gameTurns.length === 9 && !winner;
  function handleSelectedPlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = currentActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChanger(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Palyer
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePalyer === "X"}
            onChangeName={handlePlayerNameChanger}
          />
          <Palyer
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePalyer === "O"}
            onChangeName={handlePlayerNameChanger}
          />
        </ol>
        {(winner || hasDrawa) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectedPlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
