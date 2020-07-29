import React from "react";
import "./App.css";
import { pieceTypes } from "./pieceTypes";
import produce from "immer";

function Tile({ rowIdx, colIdx, piece, onClick, style }) {
  const Icon = pieceTypes[piece?.type]?.icon;
  return (
    <div
      onClick={onClick}
      style={{
        width: 150,
        height: 150,
        background: "#ccc",
        marginBottom: 10,
        ...style,
      }}
    >
      <div style={{ opacity: 0.2 }}>
        r{rowIdx} c{colIdx}
      </div>
      <div style={{ padding: 10 }}>
        {piece ? <Icon isWhite={piece.isWhite} /> : piece}
      </div>
    </div>
  );
}

let BOARD_START = [
  [
    null,
    { type: "King", id: "k0", isWhite: true },
    { type: "Rok", id: "r0", isWhite: true },
    { type: "Knight", id: "kg0", isWhite: true },
    null,
    null,
    null,
    null,
  ],
  [
    { type: "Pawn", id: "p0", isWhite: true },
    { type: "Pawn", id: "p1", isWhite: true },
    { type: "Pawn", id: "p2", isWhite: true },
    { type: "Pawn", id: "p3", isWhite: true },
    { type: "Pawn", id: "p4", isWhite: true },
    { type: "Pawn", id: "p5", isWhite: true },
    { type: "Pawn", id: "p6", isWhite: true },
    { type: "Pawn", id: "p7", isWhite: true },
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    null,
    null,
    null,
    { type: "Knight", id: "kg0", isWhite: true },
    null,
    null,
    { type: "Rok", id: "r0", isWhite: true },
    ,
    null,
  ],
  [null, null, null, null, null, null, null, null],
  [
    { type: "Pawn", id: "p0", isWhite: false },
    { type: "Rok", id: "r0", isWhite: true },
    null,
    { type: "Pawn", id: "p3", isWhite: false },
    { type: "Pawn", id: "p4", isWhite: false },
    { type: "Pawn", id: "p5", isWhite: false },
    { type: "Pawn", id: "p6", isWhite: false },
    { type: "Pawn", id: "p7", isWhite: false },
  ],
  [
    null,
    null,
    null,
    null,
    { type: "Rok", id: "r0", isWhite: true },
    ,
    null,
    null,
    null,
  ],
];

function App() {
  const [possMoves, setPossMoves] = React.useState([]);
  const [board, setBoard] = React.useState(BOARD_START);
  const [selectedPiece, setSelectedPiece] = React.useState<{
    piece: {};
    row: number;
    col: number;
  }>();
  return (
    <div className="App">
      <pre>{JSON.stringify(possMoves)}</pre>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)" }}>
        {board.map((row, rowIdx) =>
          row.map((piece, colIdx) => {
            const isPoss = !!possMoves.find(
              ({ row, col }) => row === rowIdx && col === colIdx
            );
            return (
              <Tile
                style={isPoss ? { background: "cyan" } : {}}
                onClick={() => {
                  if (isPoss) {
                    const myPiece = board[selectedPiece.row][selectedPiece.col];
                    board[selectedPiece.row][selectedPiece.col] = null;
                    board[rowIdx][colIdx] = myPiece;
                    setBoard([...board]);
                    setSelectedPiece(null);
                    setPossMoves([]);
                  } else if (piece) {
                    setSelectedPiece({ piece, row: rowIdx, col: colIdx });
                    setPossMoves(
                      pieceTypes[piece?.type].getPossMoves({
                        row: rowIdx,
                        col: colIdx,
                        isWhite: piece.isWhite,
                        board,
                      })
                    );
                  }
                }}
                {...{ rowIdx, colIdx, piece }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
