import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver";

function deriveActivePlayer(gameTurns) {
  let activePlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
}

function App() {
  const grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  let winner;

  const [gameTurns, setgameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const [playerNames, setplayerNames] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  function handlePlayerNameChange(symbol, newName) {
    setplayerNames((prevNames) => {
      return {
        ...prevNames,
        [symbol]: newName,
      };
    });
  }

  let gameboard = grid;
  for (const turn of gameTurns) {
    const { row, col, player } = turn;
    gameboard[row][col] = player;
  }
  for (const combination of WINNING_COMBINATIONS) {
    const firstBox = gameboard[combination[0].row][combination[0].column];
    const secondBox = gameboard[combination[1].row][combination[1].column];
    const thirdBox = gameboard[combination[2].row][combination[2].column];
    if (firstBox && firstBox === secondBox && firstBox === thirdBox) {
      // console.log(firstBox);
      // winner = firstBox;
      winner = playerNames[firstBox];
      console.log(playerNames[firstBox]);
      break;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSqure(rowIndex, colIndex) {
    setgameTurns((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns);
      console.log(currentPlayer);
      const updatedGameTurn = {
        row: rowIndex,
        col: colIndex,
        player: currentPlayer,
      };
      const updatedGameTurns = [updatedGameTurn, ...prevGameTurns];
      return updatedGameTurns;
    });
  }
  function GameRematch() {
    setgameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X" ? true : false}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O" ? true : false}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} rematch={GameRematch}></GameOver>
        )}
        <GameBoard
          handleSelectSqure={handleSelectSqure}
          board={gameboard}
        ></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App;
