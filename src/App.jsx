import { useState } from "react";
import { Fragment } from "react";
import React from "react";

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  return (
    <div className={className} onClick={updateBoard}>
      {children}
    </div>
  );
};

const TURNS = {
  x: "❌",
  o: "⭕",
};

const winnerCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function App() {
  const [turn, setTurn] = useState(TURNS.x);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const handeClick = () => {
    updateBoard(index);
  };

  const updateBoard = (index) => {
    const newTurn = turn == TURNS.x ? TURNS.o : TURNS.x;
    if (board[index] || winner) return;
    setTurn(newTurn);
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  const checkWinner = (boardtoCheck) => {
    for (const combo of winnerCombo) {
      const [a, b, c] = combo;
      if (
        boardtoCheck[a] &&
        boardtoCheck[a] == boardtoCheck[b] &&
        boardtoCheck[a] == boardtoCheck[c]
      ) {
        return boardtoCheck[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    const newBoard = Array(9).fill(null);
    setBoard(newBoard);
    setTurn(TURNS.x);
    setWinner(null);
  };

  return (
    <>
      <main className="board">
        <h1>wao</h1>
        <section className="game">
          {board.map((_, index) => (
            <Square
              key={index}
              index={index}
              updateBoard={() => updateBoard(index)}
            >
              {board[index]}
            </Square>
          ))}
        </section>
        <section className="turn">
          <Square isSelected={turn == TURNS.x}>{TURNS.x}</Square>
          <Square isSelected={turn == TURNS.o}>{TURNS.o}</Square>
        </section>
        {winner !== null && (
          <>
            <section className="winner">
              <div className="text">
                <h2>{winner == false ? "Es un empate" : `gano`}</h2>

                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
export default App;
