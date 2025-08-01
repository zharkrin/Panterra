import os
import shutil

# Ruta base y cantidad de submapas de Infraoscuridad a generar
carpeta_base = "frontend/Infraoscuridad"
base_html = os.path.join(carpeta_base, "base.html")
cantidad = 8  # Puedes aumentar este número según el número de entradas/submapas

def generar_submapas():
    if not os.path.exists(base_html):
        print("❌ No se encontró base.html en Infraoscuridad.")
        return

    for i in range(1, cantidad + 1):
        destino = os.path.join(carpeta_base, f"infra{i}.html")
        if not os.path.exists(destino):
            shutil.copy(base_html, destino)
            print(f"✅ Generado: infra{i}.html")
        else:
            print(f"⚠️ Ya existe: infra{i}.html (omitido)")

if __name__ == "__main__":
    generar_submapas()
    