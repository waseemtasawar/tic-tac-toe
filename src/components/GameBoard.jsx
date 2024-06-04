import React, { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({ onSelectSquare, turns }) => {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // Update gameBoard state based on turns
  React.useEffect(() => {
    const updatedBoard = [...initialGameBoard];
    for (const turn of turns) {
      const { square, player } = turn;
      if (square && square.row !== undefined && square.col !== undefined) {
        updatedBoard[square.row][square.col] = player;
      } else {
        // Handle unexpected data format (optional)
        console.error("Invalid turn data:", turn);
      }
    }
    setGameBoard(updatedBoard);
  }, [turns]);

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
