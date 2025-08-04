// frontend/static/js/nivel_base.js

import { generarBiomas } from './biomas.js';
import { generarRios } from './rios.js';

const TILE = 64; // tamaño del tile base (ancho)
const TILE_HEIGHT = TILE / 2; // altura para vista isométrica

const ANCHO = 30;
const ALTO = 30;

const canvas = document.getElementById('mapa');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const visor = document.getElementById('visor');
const iconosContainer = document.getElementById('iconos');

let etiquetas = [];

// Funciones para convertir coordenadas cartesianas a isométricas
function isoX(x, y) {
  return (x - y) * TILE / 2 + canvas.width / 2;
}
function isoY(x, y) {
  return (x + y) * TILE_HEIGHT / 2;
}

// Obtener color según tipo de bioma
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

// Dibujar un tile isométrico (rombo)
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

// Limpiar etiquetas viejas
function limpiarEtiquetas() {
  etiquetas.forEach(e => e.remove());
  etiquetas = [];
}

// Crear etiquetas flotantes con nombre de bioma
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

// Dibujar todo el mapa (biomas)
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

// Dibujar ríos subterráneos
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

// Datos de iconos: tipo y posición (x,y)
const iconosData = [
  { tipo: 'pueblo', x: 3, y: 4 },
  { tipo: 'ciudad', x: 7, y: 2 },
  { tipo: 'entrada_infra', x: 1, y: 1 },
  { tipo: 'mazmorra', x: 6, y: 6 }
];

// Rutas locales a los iconos
const iconosPaths = {
  pueblo: '/static/iconos/pueblo.png',
  ciudad: '/static/iconos/ciudad.png',
  entrada_infra: '/static/iconos/entrada_infra.png',
  mazmorra: '/static/iconos/mazmorra.png'
};

// Limpiar iconos actuales
function limpiarIconos() {
  while (iconosContainer.firstChild) {
    iconosContainer.removeChild(iconosContainer.firstChild);
  }
}

// Crear y posicionar iconos sobre el mapa
function cargarIconos() {
  limpiarIconos();

  iconosData.forEach(({ tipo, x, y }) => {
    const img = document.createElement('img');
    img.src = iconosPaths[tipo];
    img.style.position = 'absolute';
    img.style.width = '64px';
    img.style.height = '64px';
    img.style.userSelect = 'none';
    img.style.pointerEvents = 'auto';

    // Posición isométrica con ajuste para centrar icono sobre tile
    const posX = (x - y) * TILE / 2 + canvas.width / 2 - 32; // -32 = la mitad del ancho del icono
    const posY = (x + y) * TILE_HEIGHT / 2 - 64 + TILE_HEIGHT / 2; // Ajuste para que quede justo encima

    img.style.left = `${posX}px`;
    img.style.top = `${posY}px`;

    iconosContainer.appendChild(img);
  });
}

// Función principal para inicializar y dibujar todo
function iniciar() {
  const biomas = generarBiomas(ANCHO, ALTO);
  const rios = generarRios(ANCHO, ALTO);

  dibujarTerreno(biomas);
  dibujarRios(rios);
  crearEtiquetas(biomas);
  cargarIconos();
}

// Ajustar canvas al tamaño ventana y redibujar al cambiar tamaño
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  iniciar();
});

// Inicio inicial
iniciar();