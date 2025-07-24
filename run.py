from flask import Flask, render_template
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIR = BASE_DIR / "frontend"

app = Flask(
    __name__,
    static_folder=str(FRONTEND_DIR / "assets"),
    template_folder=str(FRONTEND_DIR)
)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/nacion/<int:nid>")
def nacion(nid: int):
    # Renderizamos la plantilla base, pasando el ID
    return render_template("naciones/nacion.html", nation_id=nid)

if __name__ == "__main__":
    app.run(debug=True)