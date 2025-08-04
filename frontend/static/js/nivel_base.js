// frontend/static/js/nivel_base.js

document.addEventListener("DOMContentLoaded", () => {
  const mapa = document.getElementById("mapa");
  const nivel = mapa.dataset.nivel || "1";

  const columnas = 10;
  const filas = 10;
  const tileSize = 128;
  const biomas = [
    "bioma-caverna",
    "bioma-lava",
    "bioma-cristales",
    "bioma-hongos",
    "bioma-ruinas",
    "bioma-abismo"
  ];

  // Generar tiles isométricos
  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");

      const bioma = biomas[Math.floor(Math.random() * biomas.length)];
      tile.classList.add(bioma);

      tile.style.left = `${(x - y) * tileSize / 2 + 500}px`;
      tile.style.top = `${(x + y) * tileSize / 4}px`;

      mapa.appendChild(tile);
    }
  }

  // Ciudades por nivel
  const ciudades = {
    "1": [
      { nombre: "Narak'zul", x: 2, y: 4 },
      { nombre: "Ulmora", x: 7, y: 2 }
    ],
    "2": [
      { nombre: "Kharag-Dum", x: 3, y: 5 },
      { nombre: "Thol-Zan", x: 6, y: 3 }
    ],
    "3": [
      { nombre: "Eru'Nir", x: 4, y: 6 },
      { nombre: "Vurag", x: 8, y: 1 }
    ]
  };

  // Mostrar ciudades
  if (ciudades[nivel]) {
    ciudades[nivel].forEach(ciudad => {
      const ciudadDiv = document.createElement("div");
      ciudadDiv.className = "ciudad";
      ciudadDiv.setAttribute("data-nombre", ciudad.nombre);
      ciudadDiv.style.left = `${(ciudad.x - ciudad.y) * tileSize / 2 + 500}px`;
      ciudadDiv.style.top = `${(ciudad.x + ciudad.y) * tileSize / 4 - 24}px`;
      mapa.appendChild(ciudadDiv);
    });
  }
});