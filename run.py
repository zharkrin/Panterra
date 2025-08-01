from flask import Flask, send_file
import os

app = Flask(__name__)

# Página principal
@app.route("/")
def inicio():
    return send_file("frontend/index.html")

# Submapas de Naciones
@app.route("/naciones/<id>")
def ver_nacion(id):
    ruta = f"frontend/frontend/Naciones/{id}.html"
    if os.path.exists(ruta):
        return send_file(ruta)
    return send_file("frontend/frontend/Naciones/base.html")

# Submapas de Infraoscuridad
@app.route("/infraoscuridad/<id>")
def ver_infra(id):
    ruta = f"frontend/frontend/Infraoscuridad/infra{id}.html"
    if os.path.exists(ruta):
        return send_file(ruta)
    return send_file("frontend/frontend/Infraoscuridad/base.html")

# Assets (CSS, imágenes, iconos)
@app.route("/assets/<path:archivo>")
def ver_assets(archivo):
    return send_file(f"frontend/assets/{archivo}")

# Scripts JS como gen_naciones.js y biomas.js
@app.route("/tools/<path:archivo>")
def ver_tools(archivo):
    return send_file(f"frontend/frontend/tools/{archivo}")

# Archivos sueltos
@app.route("/<archivo>")
def archivo_suelto(archivo):
    ruta = f"frontend/{archivo}"
    if os.path.exists(ruta):
        return send_file(ruta)
    return "Archivo no encontrado", 404

if __name__ == "__main__":
    app.run(debug=True)