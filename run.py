from flask import Flask, render_template, send_from_directory, abort
import os

app = Flask(__name__, static_folder='frontend/assets', template_folder='frontend')

@app.route('/')
def index():
    return render_template('index.html')
    
    @app.route('/')
def index():
    return render_template('index.html')

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('frontend/js', path)

@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory('frontend/assets', path)

@app.route('/nacion/<int:id_nacion>')
def mostrar_nacion(id_nacion):
    ruta = f'frontend/naciones/{id_nacion}.html'
    if os.path.exists(ruta):
        return render_template(f'naciones/{id_nacion}.html')
    else:
        return render_template('naciones/base.html', id_nacion=id_nacion)

if __name__ == '__main__':
    app.run(debug=True)