// frontend/frontend/tools/gen_naciones.js

/**
 * Script para generar iconos y nombres de naciones en el mapa principal.
 * Este archivo se debe integrar en el sistema de generación de Panterra.
 */

const NACIONES_PREDEFINIDAS = [
  { id: 1, nombre: "Arenzhul", color: "#c19a6b" },
  { id: 2, nombre: "Valtheria", color: "#5e9ca0" },
  { id: 3, nombre: "Drakmor", color: "#9e1b1b" },
  { id: 4, nombre: "Elvaron", color: "#3a7d44" },
  { id: 5, nombre: "Thandur", color: "#5555aa" }
];

function generarNacionesEnMapa(mapaSVG) {
  const mapa = document.getElementById(mapaSVG);
  if (!mapa) return console.error("Mapa no encontrado:", mapaSVG);

  NACIONES_PREDEFINIDAS.forEach(nacion => {
    const elemento = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    elemento.setAttribute("cx", Math.random() * 800); // Posición aleatoria
    elemento.setAttribute("cy", Math.random() * 600);
    elemento.setAttribute("r", 12);
    elemento.setAttribute("fill", nacion.color);
    elemento.setAttribute("class", "nacion-icono");
    elemento.setAttribute("data-id", nacion.id);
    elemento.setAttribute("title", nacion.nombre);

    elemento.addEventListener("click", () => {
      window.location.href = `/naciones/${nacion.id}.html`;
    });

    mapa.appendChild(elemento);
  });
}

// Autoejecutar si el SVG está presente
window.addEventListener("DOMContentLoaded", () => {
  generarNacionesEnMapa("svg-mapa");
});