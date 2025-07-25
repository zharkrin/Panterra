from flask import Flask, render_template, send_from_directory, jsonify, request
import os
import json

# --- Configuración de Flask ---
app = Flask(__name__, static_folder='frontend/assets', template_folder='frontend')

# --- Rutas de páginas principales ---
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/naciones/<int:nacion_id>')
def mostrar_nacion(nacion_id):
    # Renderiza el submapa de la nación con ID específico
    file_name = f"{nacion_id}.html"
    ruta_naciones = os.path.join(app.template_folder, "naciones")
    html_path = os.path.join(ruta_naciones, file_name)
    if os.path.exists(html_path):
        return render_template(f"naciones/{file_name}")
    return render_template("naciones/base.html", nacion_id=nacion_id)

# --- Rutas estáticas ---
@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('frontend/js', path)

@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory('frontend/assets', path)

@app.route('/naciones/<path:path>')
def send_naciones(path):
    return send_from_directory('frontend/naciones', path)

# --- API para guardar y cargar mapas ---
DATA_DIR = os.path.join(os.getcwd(), "data", "naciones")
os.makedirs(DATA_DIR, exist_ok=True)

@app.route('/api/nacion/<int:nacion_id>', methods=['GET'])
def get_mapa_nacion(nacion_id):
    file_path = os.path.join(DATA_DIR, f"{nacion_id}.json")
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)
    return jsonify({"iconos": []})  # Si no existe, se devuelve vacío

@app.route('/api/nacion/<int:nacion_id>', methods=['POST'])
def save_mapa_nacion(nacion_id):
    file_path = os.path.join(DATA_DIR, f"{nacion_id}.json")
    data = request.json
    if not data or "iconos" not in data:
        return jsonify({"error": "Datos inválidos"}), 400

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    return jsonify({"status": "ok", "nacion_id": nacion_id})

# --- Arranque ---
if __name__ == '__main__':
    app.run(debug=True)