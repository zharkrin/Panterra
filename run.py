from flask import Flask, send_from_directory, render_template, redirect, url_for, request
import os

app = Flask(__name__, static_folder='frontend', template_folder='frontend')

@app.route('/')
def inicio():
    return redirect('/generador')

@app.route('/generador')
def generador():
    return send_from_directory('frontend/azgaar', 'index.html')

@app.route('/nacion/<int:nacion_id>')
def mostrar_nacion(nacion_id):
    ruta_archivo = os.path.join(app.template_folder, 'naciones', f'{nacion_id}.html')
    if os.path.exists(ruta_archivo):
        return send_from_directory('frontend/naciones', f'{nacion_id}.html')
    else:
        # Redirige a base.html con parámetro de nación (ej: base.html?mapa=24)
        return redirect(url_for('base_nacion', mapa=nacion_id))

@app.route('/naciones/base.html')
def base_nacion():
    mapa = request.args.get('mapa', default='0')
    return send_from_directory('frontend/naciones', 'base.html')

# Archivos estáticos (estilo, assets, etc.)
@app.route('/assets/<path:archivo>')
def assets(archivo):
    return send_from_directory('frontend/assets', archivo)

@app.route('/styles/<path:archivo>')
def styles(archivo):
    return send_from_directory('frontend/styles', archivo)

@app.route('/scripts/<path:archivo>')
def scripts(archivo):
    return send_from_directory('frontend/scripts', archivo)

# Archivos para Azgaar
@app.route('/azgaar/<path:archivo>')
def azgaar(archivo):
    return send_from_directory('frontend/azgaar', archivo)

if __name__ == '__main__':
    app.run(debug=True)
    