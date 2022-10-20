import React from "react";

export const Cell = ({ col, i, j, onLClick, onRClick }) => {
  const getValue = (cellData) => {
    const { isMine, neighbors, isRevealed, isFlagged } = cellData;
    if (!isRevealed) return isFlagged ? "🚩" : "";
    if (isMine) return "💣";
    if (neighbors) return neighbors;
  };
  return (
    <div
      className={`${col.isRevealed ? "cell show-cell" : "cell"}  ${
        col.isRevealed && col.isMine ? "mine" : "cell"
      }`}
      onClick={(e) => onLClick(e, i, j)}
      onContextMenu={(e) => onRClick(e, i, j)}
    >
      {getValue(col)}
    </div>
  );
};
