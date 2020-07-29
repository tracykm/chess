import Rok from "./Icons/Rok";
import Knight from "./Icons/Knight";
import Pawn from "./Icons/Pawn";
import Queen from "./Icons/Queen";
import King from "./Icons/King";
import Bishop from "./Icons/Bishop";

const pieceTypes = {
  Knight: {
    icon: Knight,
    getPossMoves: ({ row, col, isWhite, board }) => {
      const moves = [];
      [-2, 2, -1, 1].forEach((rowOffset) => {
        [-1, 1, -2, 2].forEach((colOffset) => {
          const newRow = row + rowOffset;
          const newCol = col + colOffset;
          if (Math.abs(rowOffset) === Math.abs(colOffset)) {
          } else if (newRow === row && newCol === col) {
            // can't stay in place
          } else {
            const pieceInWay = board[newRow]?.[newCol];
            if (pieceInWay?.isWhite !== isWhite) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        });
      });
      // this still returns moves off board but that's not been an issue yet
      return moves;
    },
  },
  Bishop: {
    icon: Bishop,
  },
  Rok: {
    icon: Rok,
    getPossMoves: ({ row, col, board, isWhite }) => {
      const moves = [];
      let newCol = col;
      while (newCol < 7) {
        newCol++;
        const pieceInWay = board[row][newCol];
        if (pieceInWay) {
          if (pieceInWay.isWhite !== isWhite) {
            moves.push({ row, col: newCol });
          }
          break;
        }
        moves.push({ row, col: newCol });
      }
      newCol = col;
      while (newCol > -1) {
        newCol--;
        const pieceInWay = board[row][newCol];
        if (pieceInWay) {
          if (pieceInWay.isWhite !== isWhite) {
            moves.push({ row, col: newCol });
          }
          break;
        }
        moves.push({ row, col: newCol });
      }

      // vertical moves
      let newRow = row;
      while (newRow < 7) {
        newRow++;

        const pieceInWay = board[newRow][col];
        if (pieceInWay) {
          if (pieceInWay.isWhite !== isWhite) {
            moves.push({ row: newRow, col });
          }
          break;
        }
        moves.push({ row: newRow, col });
      }
      newRow = col;
      while (newRow > -1) {
        newRow--;
        const pieceInWay = board[newRow][col];
        if (pieceInWay) {
          if (pieceInWay.isWhite !== isWhite) {
            moves.push({ row: newRow, col });
          }
          break;
        }
        moves.push({ row: newRow, col });
      }

      return moves;
    },
  },
  Pawn: {
    icon: Pawn,
    getPossMoves: ({ row, col, isWhite, board }) => {
      const offset = isWhite ? 1 : -1;
      // TODO add dooble first move and side attack
      return [{ row: row + offset, col }];
    },
  },
  King: {
    icon: King,
    getPossMoves: ({ row, col, isWhite, board }) => {
      const moves = [];
      [-1, 0, 1].forEach((rowOffset) => {
        [-1, 0, 1].forEach((colOffset) => {
          const newRow = row + rowOffset;
          const newCol = col + colOffset;
          if (newRow === row && newCol === col) {
            // can't stay in place
          } else {
            const pieceInWay = board[newRow]?.[newCol];
            if (pieceInWay?.isWhite !== isWhite) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        });
      });
      return moves;
    },
  },
  Queen: { icon: Queen },
};

export { pieceTypes };
