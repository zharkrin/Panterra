from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_folder='frontend/assets', template_folder='frontend')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('frontend/js', path)

@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory('frontend/assets', path)

@app.route('/naciones/<id>')
def submapa_nacion(id):
    ruta_archivo = f'frontend/naciones/{id}.html'
    if os.path.exists(ruta_archivo):
        return render_template(f'naciones/{id}.html')
    else:
        return render_template('naciones/base.html')

if __name__ == '__main__':
    app.run(debug=True)