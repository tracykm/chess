import React from "react";
import "./App.css";
import { pieceTypes } from "./pieceTypes";
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
  const [isWhiteTurn, setIsWhiteTurn] = React.useState(true);
  return (
    <div className="App">
      <div
        style={{
          fontSize: "2em",
          padding: "1em",
          background: isWhiteTurn ? "white" : "black",
          color: isWhiteTurn ? "black" : "white",
        }}
      >
        {isWhiteTurn ? "White's Turn" : "Black's Turn"}
      </div>
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
                style={
                  isPoss
                    ? {
                        background: "cyan",
                        border: "#00bdbd solid",
                        boxSizing: "border-box",
                      }
                    : {}
                }
                onClick={() => {
                  if (isPoss) {
                    const myPiece = board[selectedPiece.row][selectedPiece.col];
                    board[selectedPiece.row][selectedPiece.col] = null;
                    board[rowIdx][colIdx] = myPiece;
                    setBoard([...board]);
                    setSelectedPiece(null);
                    setPossMoves([]);
                    setIsWhiteTurn(() => !isWhiteTurn);
                  } else if (piece) {
                    if (isWhiteTurn === piece.isWhite) {
                      setSelectedPiece({ piece, row: rowIdx, col: colIdx });
                      setPossMoves(
                        pieceTypes[piece?.type].getPossMoves({
                          row: rowIdx,
                          col: colIdx,
                          isWhite: piece?.isWhite,
                          board,
                        })
                      );
                    } else {
                      setPossMoves([]);
                    }
                  } else {
                    setPossMoves([]);
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
