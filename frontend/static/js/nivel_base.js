// frontend/static/js/nivel_base.js

import { generarBiomas } from './biomas.js';
import { generarRios } from './rios.js';
import { ciudades } from './ciudades.js';

const TILE = 64;
const TILE_HEIGHT = TILE / 2;

const ANCHO = 30;
const ALTO = 30;

const canvas = document.getElementById('mapa');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const visor = document.getElementById('visor');
const iconosContainer = document.getElementById('iconos');

let etiquetas = [];

// Obtener nivel actual definido en HTML
const NIVEL_ACTUAL = window.NIVEL_ACTUAL || 1;

function isoX(x, y) {
  return (x - y) * TILE / 2 + canvas.width / 2;
}
function isoY(x, y) {
  return (x + y) * TILE_HEIGHT / 2;
}

function obtenerColorBioma(tipo) {
  switch (tipo) {
    case 'magma': return '#8b0000';
    case 'hongos': return '#2e8b57';
    case 'cristal': return '#87ceeb';
    case 'ruinas': return '#4b4b4b';
    case 'lago': return '#1e3f66';
    case 'vacio': return '#000000';
    default: return '#222222';
  }
}

function dibujarTile(x, y, color) {
  const px = isoX(x, y);
  const py = isoY(x, y);

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px + TILE / 2, py + TILE_HEIGHT / 2);
  ctx.lineTo(px, py + TILE_HEIGHT);
  ctx.lineTo(px - TILE / 2, py + TILE_HEIGHT / 2);
  ctx.closePath();
  ctx.fill();
}

function limpiarEtiquetas() {
  etiquetas.forEach(e => e.remove());
  etiquetas = [];
}

function crearEtiquetas(biomas) {
  limpiarEtiquetas();
  for (let y = 0; y < ALTO; y++) {
    for (let x = 0; x < ANCHO; x++) {
      const tipo = biomas[y][x];
      const px = isoX(x, y);
      const py = isoY(x, y);

      const etiqueta = document.createElement('div');
      etiqueta.className = 'etiqueta';
      etiqueta.textContent = tipo;
      etiqueta.style.left = `${px}px`;
      etiqueta.style.top = `${py}px`;
      visor.appendChild(etiqueta);
      etiquetas.push(etiqueta);
    }
  }
}

function dibujarTerreno(biomas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < ALTO; y++) {
    for (let x = 0; x < ANCHO; x++) {
      const tipo = biomas[y][x];
      const color = obtenerColorBioma(tipo);
      dibujarTile(x, y, color);
    }
  }
}

function dibujarRios(rios) {
  ctx.strokeStyle = 'rgba(58, 198, 255, 0.6)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  rios.forEach(rio => {
    if (rio.length < 2) return;

    ctx.beginPath();
    const p0 = rio[0];
    ctx.moveTo(isoX(p0.x, p0.y), isoY(p0.x, p0.y) + TILE_HEIGHT / 2);

    for (let i = 1; i < rio.length; i++) {
      const p = rio[i];
      ctx.lineTo(isoX(p.x, p.y), isoY(p.x, p.y) + TILE_HEIGHT / 2);
    }
    ctx.stroke();
  });
}

const iconosPaths = {
  pueblo: '/static/iconos/pueblo.png',
  ciudad: '/static/iconos/ciudad.png',
  entrada_infra: '/static/iconos/entrada_infra.png',
  mazmorra: '/static/iconos/mazmorra.png'
};

function limpiarIconos() {
  while (iconosContainer.firstChild) {
    iconosContainer.removeChild(iconosContainer.firstChild);
  }
}

function cargarIconos() {
  limpiarIconos();

  // Filtrar ciudades por nivel actual
  const ciudadesNivel = ciudades.filter(c => c.nivel === NIVEL_ACTUAL);

  ciudadesNivel.forEach(({ tipo, x, y, nombre }) => {
    const img = document.createElement('img');
    img.src = iconosPaths[tipo] || iconosPaths['pueblo'];
    img.title = nombre;
    img.style.position = 'absolute';
    img.style.width = '64px';
    img.style.height = '64px';
    img.style.userSelect = 'none';
    img.style.pointerEvents = 'auto';

    const posX = (x - y) * TILE / 2 + canvas.width / 2 - 32;
    const posY = (x + y) * TILE_HEIGHT / 2 - 64 + TILE_HEIGHT / 2;

    img.style.left = `${posX}px`;
    img.style.top = `${posY}px`;

    iconosContainer.appendChild(img);

    const etiqueta = document.createElement('div');
    etiqueta.className = 'etiqueta';
    etiqueta.textContent = nombre;
    etiqueta.style.left = `${posX + 32}px`;
    etiqueta.style.top = `${posY}px`;
    visor.appendChild(etiqueta);
    etiquetas.push(etiqueta);
  });
}

function iniciar() {
  const biomas = generarBiomas(ANCHO, ALTO);
  const rios = generarRios(ANCHO, ALTO);

  dibujarTerreno(biomas);
  dibujarRios(rios);
  crearEtiquetas(biomas);
  cargarIconos();
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  iniciar();
});

iniciar();