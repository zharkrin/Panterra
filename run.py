from flask import Flask, render_template, send_from_directory, jsonify, request
import os
import json

app = Flask(__name__, static_folder='frontend/assets', template_folder='frontend')

# --- RUTA PRINCIPAL ---
@app.route('/')
def index():
    return render_template('index.html')

# --- RUTA PARA JS ---
@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('frontend/js', path)

# --- RUTA PARA ASSETS ---
@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory('frontend/assets', path)

# --- RUTA PARA NACIONES DINÁMICAS ---
@app.route('/nacion/<int:nacion_id>')
def nacion(nacion_id):
    # Busca archivo HTML específico (1.html, 2.html, etc.)
    nacion_path = f'frontend/naciones/{nacion_id}.html'
    if os.path.exists(nacion_path):
        return render_template(f'naciones/{nacion_id}.html')
    else:
        return render_template('naciones/base.html')

# --- API: GUARDAR MAPA ---
@app.route('/api/guardar', methods=['POST'])
def api_guardar():
    data = request.json
    try:
        with open('frontend/data/iconos.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        return jsonify({"status": "ok", "mensaje": "Mapa guardado correctamente."})
    except Exception as e:
        return jsonify({"status": "error", "mensaje": str(e)}), 500

# --- API: CARGAR MAPA ---
@app.route('/api/cargar', methods=['GET'])
def api_cargar():
    try:
        if os.path.exists('frontend/data/iconos.json'):
            with open('frontend/data/iconos.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
            return jsonify(data)
        else:
            return jsonify([])
    except Exception as e:
        return jsonify({"status": "error", "mensaje": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)