import Rok from "./Icons/Rok";
import Knight from "./Icons/Knight";
import Pawn from "./Icons/Pawn";
import Queen from "./Icons/Queen";
import King from "./Icons/King";
import Bishop from "./Icons/Bishop";

const pieceTypes = {
  Knight: { icon: Knight },
  Bishop: { icon: Bishop },
  Rok: { icon: Rok },
  Pawn: {
    icon: Pawn,
    getPossMoves: ({ row, col, isWhite }) => {
      const offset = isWhite ? 1 : -1;
      // TODO add dooble first move and side attack
      return [{ row, col: col + offset }];
    },
  },
  King: {
    icon: King,
    getPossMoves: ({ row, col }) => {
      const moves = [];
      [-1, 0, 1].forEach((rowOffset) => {
        [-1, 0, 1].forEach((colOffset) => {
          const newRow = row + rowOffset;
          const newCol = col + colOffset;
          if (newRow === row && newCol === col) {
            // can't stay in place
          } else {
            moves.push({ row });
          }
        });
      });
      return [{ row, col: col + 1 }];
    },
  },
  Queen: { icon: Queen },
};

export { pieceTypes };
