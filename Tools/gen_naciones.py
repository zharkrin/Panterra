#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
from pathlib import Path
from textwrap import dedent

TEMPLATE = """\
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Mapa de la Nación {nid}</title>
  <link rel="stylesheet" href="../assets/styles.css" />
  <style>
    #barra-iconos {{
      background: #222;
      padding: 10px;
      display: flex;
      gap: 10px;
      position: relative;
      z-index: 10;
    }}
    #barra-iconos img.icono-draggable {{
      width: 32px;
      height: 32px;
      cursor: grab;
    }}
    #mapa-container {{
      position: relative;
      width: 100%;
      height: 600px;
      background: url("../assets/mapa_nacion_base.JPG") no-repeat center/cover;
      overflow: hidden;
      border: 2px solid #333;
    }}
    .icono-mapa {{
      width: 32px;
      height: 32px;
      cursor: grab;
      user-select: none;
      position: absolute;
      filter: drop-shadow(0 0 2px rgba(0,0,0,0.4));
    }}
    #mapa-actions {{
      margin-top: 10px;
      display: flex;
      gap: 10px;
    }}
    #mapa-actions button {{
      padding: 6px 12px;
      cursor: pointer;
      border: none;
      background: #444;
      color: #fff;
      border-radius: 4px;
    }}
    #mapa-actions button:hover {{
      background: #666;
    }}
  </style>
</head>
<body>
  <h1>Mapa de la Nación {nid}</h1>

  <!-- Barra de iconos -->
  <div id="barra-iconos">
    <img src="../assets/iconos/Ciudad.svg" class="icono-draggable" draggable="true" data-icono="Ciudad" alt="Ciudad" />
    <img src="../assets/iconos/Pueblo.svg" class="icono-draggable" draggable="true" data-icono="Pueblo" alt="Pueblo" />
    <img src="../assets/iconos/Puesto_defensivo.svg" class="icono-draggable" draggable="true" data-icono="Puesto_defensivo" alt="Puesto Defensivo" />
    <img src="../assets/iconos/Ruinas.svg" class="icono-draggable" draggable="true" data-icono="Ruinas" alt="Ruinas" />
    <img src="../assets/iconos/Mazmorra.svg" class="icono-draggable" draggable="true" data-icono="Mazmorra" alt="Mazmorra" />
    <img src="../assets/iconos/Entrada_infraoscuridad.svg" class="icono-draggable" draggable="true" data-icono="Entrada_infraoscuridad" alt="Entrada Infraoscuridad" />
  </div>

  <!-- Contenedor del mapa -->
  <div id="mapa-container"></div>

  <!-- Acciones -->
  <div id="mapa-actions">
    <button onclick="guardarMapa()">Guardar mapa</button>
    <input type="file" id="cargarMapaInput" accept=".json" onchange="cargarMapa()" style="display:none;">
    <button onclick="document.getElementById('cargarMapaInput').click()">Cargar mapa</button>
    <button onclick="borrarMapa()">Borrar mapa</button>
  </div>

  <script src="../js/iconosMapa.js"></script>
</body>
</html>
"""

def main():
    parser = argparse.ArgumentParser(
        description="Genera archivos HTML de naciones (n.html) automáticamente")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--count", type=int, help="Número total de naciones a generar (empezando en 1)")
    group.add_argument("--range", nargs=2, type=int, metavar=("START", "END"),
                       help="Rango de IDs a generar, inclusive. Ej: --range 5 25")

    parser.add_argument(
        "--out",
        default="frontend/naciones",
        help="Carpeta de salida (por defecto: frontend/naciones)"
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Sobrescribir archivos existentes"
    )

    args = parser.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    if args.count:
        start, end = 1, args.count
    else:
        start, end = args.range
        if start > end:
            start, end = end, start

    print(f"Generando naciones {start}..{end} en {out_dir}")

    for nid in range(start, end + 1):
        html = TEMPLATE.format(nid=nid)
        fpath = out_dir / f"{nid}.html"
        if fpath.exists() and not args.overwrite:
            print(f" - {fpath.name} existe, saltando (usa --overwrite para forzar)")
            continue
        fpath.write_text(dedent(html), encoding="utf-8")
        print(f" + {fpath.name}")

    print("Listo.")

if __name__ == "__main__":
    main()