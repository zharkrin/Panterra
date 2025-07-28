from flask import Flask, send_from_directory, render_template, abort
import os

app = Flask(__name__, static_folder="frontend", template_folder="frontend")

@app.route("/")
def index():
    return send_from_directory("frontend", "index.html")

@app.route("/nacion/<id>")
def mapa_nacion(id):
    ruta_nacion = os.path.join("frontend", "naciones", f"{id}.html")
    if os.path.exists(ruta_nacion):
        return send_from_directory("frontend/naciones", f"{id}.html")
    else:
        return send_from_directory("frontend/naciones", "base.html")

@app.route("/assets/<path:filename>")
def assets(filename):
    return send_from_directory("frontend/assets", filename)

@app.route("/naciones/<path:filename>")
def naciones_static(filename):
    return send_from_directory("frontend/naciones", filename)

if __name__ == "__main__":
    app.run(debug=True)