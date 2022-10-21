const plantMines = (data, height, width, mines) => {
  let minesPlanted = 0;
  while (minesPlanted < mines) {
    let randomX = Math.floor(Math.random() * width);
    let randomY = Math.floor(Math.random() * height);
    if (!data[randomX][randomY].isMine) {
      data[randomX][randomY].isMine = true;
      minesPlanted++;
    }
  }
  return data;
};

const generateNeighbors = (i, j, data, height, width) => {
  let neighbors = [];
  const surroundings = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  surroundings.forEach(([x, y]) => {
    const newX = i + x;
    const newY = j + y;
    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
      neighbors.push(data[newX][newY]);
    }
  });
  return neighbors;
};

const getNeighbors = (data, height, width) => {
  let dataCopy = data;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let mines = 0;
      const area = generateNeighbors(
        data[i][j].x,
        data[i][j].y,
        data,
        height,
        width
      );
      area.map((value) => {
        if (value.isMine) {
          return mines++;
        }
        return 0;
      });
      if (!mines) {
        dataCopy[i][j].isEmpty = true;
      }
      dataCopy[i][j].neighbors = mines;
    }
  }
  return dataCopy;
};

const showEmptyCells = (height, width, x, y, data) => {
  let neighbors = generateNeighbors(x, y, data, height, width);
  neighbors.map((cell) => {
    if (!cell.isRevealed && (cell.isEmpty || !cell.isMine)) {
      data[cell.x][cell.y].isRevealed = true;
      if (cell.isEmpty) {
        showEmptyCells(height, width, cell.x, cell.y, data);
      }
    }
    return null;
  });
  return data;
};

const showGrid = (data) => {
  const revealedGrid = [...data];
  revealedGrid.map((row) =>
    row.forEach((cell) => {
      if (cell.isFlagged !== cell.isMine || !cell.isRevealed !== cell.isFlagged)
        return { ...(cell.isRevealed = true) };
    })
  );
  return revealedGrid;
};

const checkWinner = (data, width, height) => {
  let counterRevealed = 0;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (data[i][j].isRevealed && !data[i][j].isMine) {
        counterRevealed++;
      }
    }
  }
  if (counterRevealed === 54) {
    return true;
  }
};

export {
  plantMines,
  generateNeighbors,
  getNeighbors,
  showEmptyCells,
  showGrid,
  checkWinner,
};
