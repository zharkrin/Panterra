from flask import Flask, send_from_directory, abort
import os

app = Flask(__name__, static_folder='frontend', static_url_path='')

# Ruta raíz: carga el index principal
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Ruta para cargar submapas de naciones dinámicamente
@app.route('/naciones/<nacion_id>')
def nacion(nacion_id):
    naciones_path = os.path.join(app.static_folder, 'naciones')
    html_file = f"{nacion_id}.html"
    base_file = "base.html"

    # Si existe el archivo específico (ej. 1.html, 2.html, etc.)
    if os.path.exists(os.path.join(naciones_path, html_file)):
        return send_from_directory(naciones_path, html_file)
    # Si no, cargar base.html
    elif os.path.exists(os.path.join(naciones_path, base_file)):
        return send_from_directory(naciones_path, base_file)
    else:
        abort(404)

# Ruta para servir cualquier archivo estático dentro de /frontend/
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == "__main__":
    app.run(debug=True)