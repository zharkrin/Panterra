import os
from flask import Flask, render_template, send_from_directory

app = Flask(
    __name__,
    template_folder="frontend/naciones",     # Plantillas HTML por nación
    static_folder="frontend/assets"          # Archivos estáticos (imágenes, CSS, JS)
)

# Ruta principal: carga el index general
@app.route("/")
def index():
    return send_from_directory("frontend", "index.html")

# Ruta para cargar el submapa de una nación por su ID
@app.route("/nacion/<int:id>")
def mostrar_nacion(id):
    nombre_archivo = f"{id}.html"
    ruta_archivo = os.path.join(app.template_folder, nombre_archivo)

    if os.path.exists(ruta_archivo):
        return render_template(nombre_archivo)
    else:
        return render_template("base.html", id=id)

# Servir otros archivos estáticos desde la carpeta 'frontend'
@app.route('/<path:filename>')
def serve_frontend(filename):
    return send_from_directory("frontend", filename)

if __name__ == "__main__":
    app.run(debug=True)