import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Rok from "./Icons/Rok";
import { pieceTypes } from "./pieceTypes";

function Tile({ rowIdx, colIdx, piece, onClick, style }) {
  const Icon = pieceTypes[piece?.type]?.icon;
  return (
    <div
      onClick={onClick}
      style={{
        width: 150,
        height: 150,
        background: "#ccc",
        margin: "1px",
        ...style,
      }}
    >
      {piece ? <Icon /> : piece}
      rowIdx {rowIdx}
    </div>
  );
}

const board = [
  [
    null,
    { type: "King", row: 0, col: 1, id: "k0", isWhite: true },
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    { type: "Pawn", row: 1, col: 0, id: "p0", isWhite: true },
    { type: "Pawn", row: 1, col: 1, id: "p1", isWhite: true },
    { type: "Pawn", row: 1, col: 2, id: "p2", isWhite: true },
    { type: "Pawn", row: 1, col: 3, id: "p3", isWhite: true },
    { type: "Pawn", row: 1, col: 4, id: "p4", isWhite: true },
    { type: "Pawn", row: 1, col: 5, id: "p5", isWhite: true },
    { type: "Pawn", row: 1, col: 6, id: "p6", isWhite: true },
    { type: "Pawn", row: 1, col: 7, id: "p7", isWhite: true },
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    { type: "Pawn", row: 1, col: 0, id: "p0", isWhite: false },
    { type: "Pawn", row: 1, col: 1, id: "p1", isWhite: false },
    { type: "Pawn", row: 1, col: 2, id: "p2", isWhite: false },
    { type: "Pawn", row: 1, col: 3, id: "p3", isWhite: false },
    { type: "Pawn", row: 1, col: 4, id: "p4", isWhite: false },
    { type: "Pawn", row: 1, col: 5, id: "p5", isWhite: false },
    { type: "Pawn", row: 1, col: 6, id: "p6", isWhite: false },
    { type: "Pawn", row: 1, col: 7, id: "p7", isWhite: false },
  ],
  [null, null, null, null, null, null, null, null],
];

function App() {
  const [possMoves, setPossMoves] = React.useState([]);
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
                style={isPoss ? { background: "green" } : {}}
                onClick={() => {
                  setPossMoves(
                    pieceTypes[piece?.type].getPossMoves({
                      row: rowIdx,
                      col: colIdx,
                      isWhite: piece.isWhite,
                    })
                  );
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
