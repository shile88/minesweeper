import React, { useState } from "react";
import "../assets/style/Main.css";
import { Cell } from "./Cell";
import {
  plantMines,
  getNeighbors,
  showEmptyCells,
  showGrid,
  checkWinner,
} from "../helper";

export const Board = ({ param, setStart }) => {
  const initBoard = () => {
    const createEmptyArray = Array(param.width)
      .fill()
      .map((_, indexH) =>
        Array(param.height)
          .fill()
          .map((_, indexW) => ({
            x: indexH,
            y: indexW,
            isMine: false,
            neighbors: 0,
            isEmpty: false,
            isRevealed: false,
            isFlagged: false,
          }))
      );

    let newArrayWithMines = plantMines(
      createEmptyArray,
      param.height,
      param.width,
      param.mines
    );

    let newArrayWithNeighbors = getNeighbors(
      newArrayWithMines,
      param.height,
      param.width
    );
    return newArrayWithNeighbors;
  };

  const [gameStatus, setGameStatus] = useState({ end: false, winner: false });
  const [grid, setGrid] = useState(() => initBoard(param));
  const [minesCounter, setMinesCounter] = useState(10);

  const onLeftClick = (event, x, y) => {
    event.preventDefault();
    if (grid[x][y].isRevealed || grid[x][y].isFlagged) return;
    const updatedGrid = [...grid];
    updatedGrid[x][y].isRevealed = true;
    if (updatedGrid[x][y].isEmpty) {
      showEmptyCells(param.height, param.width, x, y, updatedGrid);
    }
    if (checkWinner(updatedGrid, param.width, param.height) === true) {
      setGameStatus({ winner: true });
    }
    if (updatedGrid[x][y].isMine) {
      setGrid(showGrid(updatedGrid));
      setGameStatus({ end: true });
    }

    setGrid(updatedGrid);
  };

  const resetGame = (e, param) => {
    e.preventDefault();
    setGameStatus({ end: false });
    setGrid(initBoard(param));
  };

  const onRightClick = (event, x, y) => {
    event.preventDefault();
    if (grid[x][y].isRevealed) return;
    const updatedGrid = [...grid];
    updatedGrid[x][y].isFlagged = !updatedGrid[x][y].isFlagged;
    setGrid(updatedGrid);
    if (grid[x][y].isFlagged && minesCounter > 0) {
      setMinesCounter(minesCounter - 1);
    }
    if (!grid[x][y].isFlagged && minesCounter < 10) {
      setMinesCounter(minesCounter + 1);
    }
  };

  return (
    <div className="board">
      {!gameStatus.end && !gameStatus.winner && (
        <h1 className="title">Minesweeper</h1>
      )}
      {gameStatus.end && <h1 className="status">YOU LOST!</h1>}
      {gameStatus.winner && <h1 className="status">YOU WIN!</h1>}
      <div className="board-items">
        <h2>Mines remaining: {minesCounter}</h2>
        <div className="grid">
          {grid.map((row, i) =>
            row.map((col, j) => (
              <Cell
                onLClick={(e, i, j) => onLeftClick(e, i, j)}
                onRClick={(e, i, j) => onRightClick(e, i, j)}
                key={`${i}-${j}`}
                col={col}
                i={i}
                j={j}
              />
            ))
          )}
        </div>
      </div>
      {(gameStatus.end || gameStatus.winner) && (
        <button onClick={(e) => resetGame(e, param)}>TRY AGAIN!</button>
      )}
    </div>
  );
};
