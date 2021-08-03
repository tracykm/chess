from flask import Flask
from .pieces import Queen, Piece

app = Flask(__name__)


@app.route("/")
def index():
    la = "lala"
    q = Queen(1, 2, False)
    print(q)
    return "Index Paaage"


@app.route("/hello")
def hello():
    return "Hello, World"
