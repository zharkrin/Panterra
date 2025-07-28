from flask import Flask, render_template, send_from_directory, request, redirect, url_for, Response
import os

app = Flask(__name__, template_folder='frontend', static_folder='frontend')

@app.route('/')
def inicio():
    return redirect(url_for('mostrar_generador'))

@app.route('/generador')
def mostrar_generador():
    return render_template('index.html')

@app.route('/nacion/<int:nacion_id>')
def mostrar_nacion(nacion_id):
    ruta_archivo = os.path.join(app.template_folder, 'naciones', f'{nacion_id}.html')
    if os.path.exists(ruta_archivo):
        return render_template(f'naciones/{nacion_id}.html')
    else:
        return render_template('naciones/base.html')

@app.route('/guardar_mapa_html/<int:mapa_id>', methods=['POST'])
def guardar_mapa_html(mapa_id):
    html_content = request.data.decode('utf-8')
    ruta_destino = os.path.join(app.template_folder, 'naciones', f'{mapa_id}.html')

    try:
        with open(ruta_destino, 'w', encoding='utf-8') as f:
            f.write(html_content)
        return Response(status=200)
    except Exception as e:
        print(f"Error al guardar {mapa_id}.html: {e}")
        return Response("Error al guardar el archivo.", status=500)

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(app.static_folder), filename)

if __name__ == '__main__':
    app.run(debug=True)