from flask import Flask, send_file
import os

app = Flask(__name__)

# Ruta de inicio
@app.route("/")
def inicio():
    return send_file("frontend/index.html")

# Rutas para las naciones
@app.route("/naciones/<id>")
def ver_nacion(id):
    ruta = f"frontend/naciones/{id}.html"
    if os.path.exists(ruta):
        return send_file(ruta)
    return send_file("frontend/naciones/base.html")

# Rutas para la Infraoscuridad
@app.route("/infraoscuridad/<id>")
def ver_infra(id):
    ruta = f"frontend/infraoscuridad/infra{id}.html"
    if os.path.exists(ruta):
        return send_file(ruta)
    return send_file("frontend/infraoscuridad/base.html")

# Rutas para los recursos compartidos (CSS, imágenes, iconos)
@app.route("/assets/<path:archivo>")
def ver_assets(archivo):
    return send_file(f"frontend/assets/{archivo}")

# Rutas para herramientas JS (como gen_naciones.js, biomas.js, etc.)
@app.route("/tools/<path:archivo>")
def ver_tools(archivo):
    return send_file(f"frontend/frontend/tools/{archivo}")

# Fallback para otros HTML
@app.route("/<archivo>")
def archivo_suelto(archivo):
    ruta = f"frontend/{archivo}"
    if os.path.exists(ruta):
        return send_file(ruta)
    return "Archivo no encontrado", 404

if __name__ == "__main__":
    app.run(debug=True)