from typing import List


class Piece:
    def __init__(self, col: int, row: int, is_white: bool):
        self.row = row
        self.col = col
        self.is_white = is_white

    type = "Unknown"

    @property
    def color(self):
        return "W" if self.is_white else "B"

    def __str__(self) -> str:
        return f"{self.col},{self.row} {self.type}-{self.color}   "


class Queen(Piece):
    type = "Q"

    def valid_move(self, pieces):
        print(self)


class Pawn(Piece):
    type = "P"

    def move(self):
        print(self)


class Game:
    def __init__(self, pieces: List[Piece]) -> None:
        self.pieces = pieces
        # self.board = [[None] * 8] * 8

    def __str__(self) -> str:
        return ""

    def get_piece(self, col: int, row: int):
        for p in self.pieces:
            if p.col == col and p.row == row:
                return p
        return None

    def move(self, col: int, row: int, to_col: int, to_row: int) -> None:
        piece = self.get_piece(col, row)
        taken_piece = self.get_piece(to_col, to_row)
        if not piece:
            raise BaseException("No piece at location")
        if taken_piece.is_white == piece.is_white:
            raise BaseException("Cannot take own pieces")
        if taken_piece:
            self.pieces.remove(taken_piece)
        piece.col = to_col
        piece.row = to_row
        return

    def print_board(self):
        print("------")
        print("------")
        for row in range(8):
            for col in range(8):
                piece = self.get_piece(col, row)
                if piece:
                    print(piece, end="")
                else:
                    print(f"{col},{row}       ", end="")
            print("")
        # for piece in self.pieces:
        #     print(piece)


p = Pawn(1, 2, False)
p2 = Pawn(2, 2, True)
q = Queen(3, 5, True)

g = Game([p, p2, q])
g.print_board()
g.move(1, 2, 3, 5)
g.print_board()