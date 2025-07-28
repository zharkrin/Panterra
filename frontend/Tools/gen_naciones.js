import os

# Ruta base del proyecto
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Ruta a la carpeta de naciones
NACIONES_DIR = os.path.join(BASE_DIR, "frontend", "naciones")

# Ruta a tools (por si se necesitan utilidades JS u otros)
TOOLS_DIR = os.path.join(BASE_DIR, "frontend", "tools")

# Plantilla base para naciones
PLANTILLA_BASE = os.path.join(NACIONES_DIR, "base.html")


def crear_nacion_html(numero: int):
    """
    Crea un archivo HTML para una nueva nación copiando base.html
    :param numero: número de nación (ej. 3 crea 3.html)
    """
    destino = os.path.join(NACIONES_DIR, f"{numero}.html")

    if os.path.exists(destino):
        print(f"⚠️  El archivo {numero}.html ya existe. No se sobrescribirá.")
        return

    try:
        with open(PLANTILLA_BASE, "r", encoding="utf-8") as f_base:
            contenido = f_base.read()

        # Opcional: podrías modificar el título dinámicamente aquí
        contenido = contenido.replace("Mapa de la Nación 1", f"Mapa de la Nación {numero}")

        with open(destino, "w", encoding="utf-8") as f_dest:
            f_dest.write(contenido)

        print(f"✅ Nación {numero}.html creada con éxito.")
    except Exception as e:
        print(f"❌ Error al crear la nación {numero}.html: {e}")


def crear_varias(n: int):
    """
    Crea múltiples archivos de nación del 1 al n (si no existen)
    """
    for i in range(1, n + 1):
        crear_nacion_html(i)


if __name__ == "__main__":
    # Cambia el número aquí según las naciones que quieras crear
    crear_varias(10)