import React from "react";
import "./App.css";
import { pieceTypes } from "./pieceTypes";
import produce from "immer";
import { BOARD_START } from "./BOARD_START";

function Tile({ rowIdx, colIdx, piece, onClick, style }) {
  const Icon = pieceTypes[piece?.type]?.icon;
  return (
    <div
      onClick={onClick}
      style={{
        height: "calc(100vw / 8)",
        background: (rowIdx + colIdx) % 2 === 0 ? "#ccc" : "#aaa",
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          opacity: 0.2,
          fontSize: 12,
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        r{rowIdx} c{colIdx}
      </div>
      <div style={{ padding: 10 }}>
        {piece ? <Icon isWhite={piece.isWhite} /> : piece}
      </div>
    </div>
  );
}

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
      {/* <pre>{JSON.stringify(possMoves)}</pre> */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
        }}
      >
        {board.map((row, rowIdx) =>
          row.map((piece, colIdx) => {
            const isPoss = !!possMoves.find(
              ({ row, col }) => row === rowIdx && col === colIdx
            );
            return (
              <Tile
                key={rowIdx + colIdx}
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
                    debugger;
                    setPossMoves(
                      pieceTypes[piece?.type].getPossMoves({
                        row: rowIdx,
                        col: colIdx,
                        isWhite: piece?.isWhite,
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
