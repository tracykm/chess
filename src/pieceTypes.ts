import Rok from "./Icons/Rok";
import Knight from "./Icons/Knight";
import Pawn from "./Icons/Pawn";
import Queen from "./Icons/Queen";
import King from "./Icons/King";
import Bishop from "./Icons/Bishop";

/** gets moves in a straight line one direction
 * ex: getStraightMoves({ board, piece, offset: { row: 0, col: 1 }}) # gets horizontal moves left
 */
function getStraightMoves({
  board,
  piece,
  offset,
}: {
  board: any;
  piece: { col: number; row: number; isWhite: boolean };
  offset: { col: number; row: number };
}) {
  const moves = [];
  let newCol = piece.col;
  let newRow = piece.row;
  while (newCol <= 7 && newCol >= 0 && newRow <= 7 && newRow >= 0) {
    newCol += offset.col;
    newRow += offset.row;
    const pieceInWay = board[newRow]?.[newCol];
    if (pieceInWay) {
      if (pieceInWay.isWhite !== piece.isWhite) {
        moves.push({ row: newRow, col: newCol });
      }
      break;
    }
    moves.push({ row: newRow, col: newCol });
  }
  return moves;
}

function getHorizontalMoves({ board, piece }) {
  return [
    ...getStraightMoves({
      board,
      piece,
      offset: { row: 0, col: 1 },
    }),
    ...getStraightMoves({
      board,
      piece,
      offset: { row: 0, col: -1 },
    }),
  ];
}

function getVerticalMoves({ board, piece }) {
  return [
    ...getStraightMoves({
      board,
      piece,
      offset: { row: 1, col: 0 },
    }),
    ...getStraightMoves({
      board,
      piece,
      offset: { row: -1, col: 0 },
    }),
  ];
}

function getDiagonalMoves({ board, piece }) {
  return [
    ...getStraightMoves({
      board,
      piece,
      offset: { row: 1, col: 1 },
    }),
    ...getStraightMoves({
      board,
      piece,
      offset: { row: -1, col: -1 },
    }),
    ...getStraightMoves({
      board,
      piece,
      offset: { row: -1, col: 1 },
    }),
    ...getStraightMoves({
      board,
      piece,
      offset: { row: 1, col: -1 },
    }),
  ];
}

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
    getPossMoves: ({ row, col, board, isWhite }) => {
      const piece = { isWhite, row, col };
      return getDiagonalMoves({ board, piece });
    },
  },
  Rok: {
    icon: Rok,
    getPossMoves: ({ row, col, board, isWhite }) => {
      const piece = { isWhite, row, col };
      return [
        ...getHorizontalMoves({ board, piece }),
        ...getVerticalMoves({ board, piece }),
      ];
    },
  },
  Pawn: {
    icon: Pawn,
    getPossMoves: ({ row, col, isWhite, board }) => {
      const offset = isWhite ? -1 : 1;
      let moves = [{ row: row + offset, col }];

      // double first move
      if ((isWhite && row === 6) || (!isWhite && row === 1)) {
        // only when no one in front
        if (!board[row + offset][col]) {
          moves.push({ row: row + offset * 2, col });
        }
      }
      moves = moves.filter((p) => {
        if (board[p.row]?.[p.col]) {
          // can't hit others
          return false;
        } else {
          return true;
        }
      });
      // Attacks
      let pieceInWay = board[row + offset]?.[col + offset];
      if (pieceInWay && pieceInWay.isWhite !== isWhite) {
        moves.push({ row: row + offset, col: col + offset });
      }
      pieceInWay = board[row + offset][col - offset];
      if (pieceInWay && pieceInWay.isWhite !== isWhite) {
        moves.push({ row: row + offset, col: col - offset });
      }
      return moves;
    },
  },
  King: {
    icon: King,
    getPossMoves: ({ row, col, isWhite, board }) => {
      const piece = { row, col, isWhite };
      const moves = [];
      [-1, 0, 1].forEach((rowOffset) => {
        [-1, 0, 1].forEach((colOffset) => {
          const move = getStraightMoves({
            board,
            piece,
            offset: { row: rowOffset, col: colOffset },
          })[0];
          if (move) {
            moves.push(move);
          }
        });
      });
      return moves;
    },
  },
  Queen: {
    icon: Queen,
    getPossMoves: ({ row, col, board, isWhite }) => {
      const piece = { isWhite, row, col };
      return [
        ...getHorizontalMoves({ board, piece }),
        ...getVerticalMoves({ board, piece }),
        ...getDiagonalMoves({ board, piece }),
      ];
    },
  },
};

export { pieceTypes };
