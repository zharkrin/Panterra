// frontend/frontend/tools/biomas.js

/**
 * Script para gestionar los biomas del mapa principal.
 * Puede integrarse con los datos de Azgaar o usarse en Panterra.
 */

const BIOMAS = [
  { nombre: "Bosque", color: "#228B22" },
  { nombre: "Desierto", color: "#EDC9AF" },
  { nombre: "Tundra", color: "#B4D2E7" },
  { nombre: "Montaña", color: "#A9A9A9" },
  { nombre: "Pantano", color: "#556B2F" },
  { nombre: "Pradera", color: "#ADFF2F" },
  { nombre: "Selva", color: "#006400" }
];

function aplicarBiomasEnMapa(mapaSVG) {
  const mapa = document.getElementById(mapaSVG);
  if (!mapa) return console.error("Mapa SVG no encontrado");

  BIOMAS.forEach(bioma => {
    const region = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    region.setAttribute("x", Math.random() * 800);
    region.setAttribute("y", Math.random() * 600);
    region.setAttribute("width", 150);
    region.setAttribute("height", 100);
    region.setAttribute("fill", bioma.color);
    region.setAttribute("opacity", 0.35);
    region.setAttribute("class", "bioma-area");
    region.setAttribute("title", bioma.nombre);
    mapa.appendChild(region);
  });
}

// Autoejecutar si el mapa está presente
window.addEventListener("DOMContentLoaded", () => {
  aplicarBiomasEnMapa("svg-mapa");
});