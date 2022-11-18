import React, { useState } from "react";
import { Board } from "./Board";

export const Game = () => {
  const [start, setStart] = useState(false);
  const param = { height: 8, width: 8, mines: 10 };

  const handleClick = () => {
    setStart(true);
  };

  return (
    <div className="start-screen">
      <h1 hidden={start} className="title">
        Minesweeper
      </h1>
      <button onClick={handleClick} hidden={start}>
        PLAY THE GAME!
      </button>
      {start && <Board param={param} />}
    </div>
  );
};
