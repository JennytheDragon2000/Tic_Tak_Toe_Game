import { useState } from "react";

function GameBoard({ handleSelectSqure, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li id={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li id={colIndex}>
                <button
                  onClick={() => handleSelectSqure(rowIndex, colIndex)}
                  disabled={col !== null}
                >
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
export default GameBoard;
