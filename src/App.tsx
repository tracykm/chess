import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Rok from "./Icons/Rok";
import { pieceTypes } from "./pieceTypes";

function Tile({ rowIdx, colIdx, piece }) {
  const Icon = pieceTypes[piece?.type]?.icon;
  return (
    <div
      style={{
        width: 150,
        height: 150,
        background: "#ccc",
        margin: "1px",
        // border: "solid pink",
      }}
    >
      {piece ? <Icon /> : piece}
      rowIdx {rowIdx}
    </div>
  );
}

const board = [
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
];

const pieces = {
  p0: { type: "Pawn", row: 1, col: 0, id: "p0" },
  p1: { type: "Pawn", row: 1, col: 1, id: "p1" },
  p2: { type: "Pawn", row: 1, col: 2, id: "p2" },
  p3: { type: "Pawn", row: 1, col: 3, id: "p3" },
  p4: { type: "Pawn", row: 1, col: 4, id: "p4" },
  p5: { type: "Pawn", row: 1, col: 5, id: "p5" },
  p6: { type: "Pawn", row: 1, col: 6, id: "p6" },
  p7: { type: "Pawn", row: 1, col: 7, id: "p7" },
  p8: { type: "Pawn", row: 1, col: 8, id: "p8" },
};

function App() {
  return (
    <div className="App">
      <Rok />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)" }}>
        {board.map((row, rowIdx) =>
          row.map((tile, colIdx) => {
            const piece = Object.values(pieces).find(
              (p) => p.row === rowIdx && p.col === colIdx
            );
            return <Tile {...{ rowIdx, colIdx, piece }} />;
          })
        )}
      </div>
    </div>
  );
}

export default App;
