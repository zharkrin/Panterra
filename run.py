from flask import Flask, send_from_directory, render_template_string
import os

app = Flask(__name__, static_folder="frontend", static_url_path="")

# Ruta para todo lo que está en /frontend directamente
@app.route("/")
def home():
    return send_from_directory("frontend", "index.html")

# Rutas para las naciones
@app.route("/naciones/<id>.html")
def mostrar_nacion(id):
    ruta_nacion = f"frontend/naciones/{id}.html"
    
    if os.path.exists(ruta_nacion):
        return send_from_directory("frontend/naciones", f"{id}.html")
    
    # Cargar base.html como plantilla si no existe el submapa específico
    with open("frontend/naciones/base.html", encoding="utf-8") as f:
        contenido_base = f.read()
    
    contenido_personalizado = contenido_base.replace("Mapa de la Nación 1", f"Mapa de la Nación {id}")
    return render_template_string(contenido_personalizado)

# Rutas para cargar cualquier archivo estático (JS, CSS, imágenes, etc.)
@app.route("/<path:path>")
def servir_archivo(path):
    return send_from_directory("frontend", path)

if __name__ == "__main__":
    app.run(debug=True)