import React from "react";
import "./App.css";
import { pieceTypes, canCastle } from "./pieceTypes";
import { BOARD_START } from "./BOARD_START";

const COL_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H"];

function Tile({ rowIdx, colIdx, piece, onClick, style }) {
  const Icon = pieceTypes[piece?.type]?.icon;
  return (
    <div
      onClick={onClick}
      style={{
        height: "min(calc(100vw / 8), calc(80vh / 8))",
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
        {/* {COL_NAMES[colIdx]}
        {8 - rowIdx} */}r{rowIdx} c{colIdx}
      </div>
      <div style={{ padding: 10 }}>
        {piece ? <Icon isWhite={piece.isWhite} /> : piece}
      </div>
    </div>
  );
}

function App() {
  const [possMoves, setPossMoves] = React.useState<
    { row: number; col: number }[]
  >([]);
  const [specialMoves, setSpecialMoves] = React.useState([]);
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
          maxWidth: "80vh",
          margin: "auto",
        }}
      >
        {board.map((row, rowIdx) =>
          row.map((piece, colIdx) => {
            const isPoss = !!possMoves.find(
              ({ row, col }) => row === rowIdx && col === colIdx
            );
            const currentSpecialMove = specialMoves.find(
              (d) => d.row === rowIdx && d.col === colIdx
            );
            return (
              <Tile
                key={rowIdx + colIdx}
                style={
                  isPoss || currentSpecialMove
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
                      const special = [];
                      const castleOpts = canCastle({
                        board,
                        piece: {
                          row: rowIdx,
                          col: colIdx,
                          isWhite: piece.isWhite,
                        },
                      });
                      castleOpts && special.push(castleOpts);
                      setSpecialMoves(special);
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
