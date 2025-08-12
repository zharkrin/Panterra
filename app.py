# app.py
from flask import Flask, render_template, jsonify
import os

app = Flask(__name__, template_folder="templates", static_folder="static")


# Página principal del Nivel 1
@app.route("/infraoscuridad/nivel1")
def nivel1():
    return render_template("infraoscuridad/infraoscuridad1.html")


# Página de ciudad: usa plantilla específica si existe, si no muestra plantilla base
@app.route("/infraoscuridad/nivel1/ciudad/<int:ciudad_id>")
def ciudad(ciudad_id):
    tpl_path = f"infraoscuridad/ciudad_{ciudad_id}.html"
    if os.path.exists(os.path.join(app.template_folder, tpl_path)):
        return render_template(tpl_path)
    return render_template("infraoscuridad/base_infraoscuridad.html", id=ciudad_id)


# API: devuelve lista de ciudades para Nivel 1 (puedes cargar desde DB o archivo)
@app.route("/api/infraoscuridad/nivel1/ciudades")
def api_ciudades_nivel1():
    # Ejemplo de datos iniciales — modifica según necesites
    ciudades = [
        {"id": 1, "nombre": "Ciudad de las Sombras", "x": 5, "y": 6, "tipo": "ciudad", "descripcion": "Centro comercial subterráneo."},
        {"id": 2, "nombre": "Pueblo Hongos Vivos", "x": 8, "y": 3, "tipo": "pueblo", "descripcion": "Pequeño asentamiento entre hongos."},
        {"id": 3, "nombre": "Entrada Sellada", "x": 2, "y": 2, "tipo": "entrada", "descripcion": "Portal antiguo sellado con runas."}
    ]
    return jsonify(ciudades)


if __name__ == "__main__":
    app.run(debug=True)
