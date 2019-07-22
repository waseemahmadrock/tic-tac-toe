class Board {
  constructor() {
    this.board = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(0);
      }
      this.board.push(row);
    }
  }

  // move playing player/ai
  movePlayer = (x, y, player, cb) => {
    this.board[x][y] = player;
    typeof cb === 'function' && cb();
  };

  // determine which cell belongs to player
  getCell = (x, y) => {
    return this.board[x][y];
  };

  // array of available playable cells
  getOpenCells = () => {
    return this.board.reduce((freeCells, row, rowIdx) => {
      for (let colIdx = 0; colIdx < row.length; colIdx++) {
        if (this.board[rowIdx][colIdx] === 0) {
          freeCells.push([rowIdx, colIdx]);
        }
      }
      return freeCells;
    }, []);
  };

  findWinner = () => {
    const { board } = this;

    // find column matches
    const columns = [];
    for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
      const col = [];
      for (let colIdx = 0; colIdx < board[rowIdx].length; colIdx++) {
        col.push(board[colIdx][rowIdx]);
      }
      columns.push(col);
    }

    // find diagonal matches
    const diags = { left: [], right: [] };
    for (let i = 0; i < board.length; i++) {
      diags.left.push(board[i][i]);
      diags.right.push(board[board.length - i - 1][i]);
    }

    // check if all items in a single row are the same
    const allTheSame = row => {
      return row.every(cell => cell === row[0]);
    };

    // get winner after row, column, and diagonal matches are aggregated into arrays
    const checkMatrix = matrix => {
      for (let x = 0; x < matrix.length; x++) {
        if (allTheSame(matrix[x]) && matrix[x][0]) {
          return matrix[x][0];
        }
      }
    };

    // check rows, columns, and diagonals and return player 1, player 2, or nothing
    return checkMatrix(board)
      ? checkMatrix(board)
      : checkMatrix(columns)
      ? checkMatrix(columns)
      : checkMatrix([diags.left, diags.right]);
  };
}

export default Board;