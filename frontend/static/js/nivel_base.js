// frontend/static/js/nivel_base.js

import { generarBiomas } from './biomas.js';
import { generarRios } from './rios.js';

const TILE = 64; // tamaño de cada tile
const ANCHO = 30;
const ALTO = 30;

const canvas = document.getElementById('mapa');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const visor = document.getElementById('visor');

const biomas = generarBiomas(ANCHO, ALTO);
const rios = generarRios(ANCHO, ALTO);

// Utilidades de coordenadas isométricas
function isoX(x, y) {
  return (x - y) * TILE + canvas.width / 2;
}

function isoY(x, y) {
  return (x + y) * TILE / 2;
}

// Dibujar el terreno
function dibujarTerreno() {
  for (let y = 0; y < ALTO; y++) {
    for (let x = 0; x < ANCHO; x++) {
      const tipo = biomas[y][x];
      const screenX = isoX(x, y);
      const screenY = isoY(x, y);

      ctx.fillStyle = obtenerColorBioma(tipo);
      ctx.beginPath();
      ctx.moveTo(screenX, screenY);
      ctx.lineTo(screenX + TILE, screenY + TILE / 2);
      ctx.lineTo(screenX, screenY + TILE);
      ctx.lineTo(screenX - TILE, screenY + TILE / 2);
      ctx.closePath();
      ctx.fill();

      // Añadir etiqueta
      const etiqueta = document.createElement('div');
      etiqueta.className = 'etiqueta';
      etiqueta.textContent = tipo;
      etiqueta.style.left = `${screenX}px`;
      etiqueta.style.top = `${screenY}px`;
      visor.appendChild(etiqueta);
    }
  }
}

// Dibujar ríos
function dibujarRios() {
  ctx.strokeStyle = '#3ac6ff';
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();

  for (const rio of rios) {
    if (rio.length < 2) continue;
    const [x0, y0] = rio[0];
    ctx.moveTo(isoX(x0, y0), isoY(x0, y0));

    for (let i = 1; i < rio.length; i++) {
      const [xi, yi] = rio[i];
      ctx.lineTo(isoX(xi, yi), isoY(xi, yi));
    }
  }

  ctx.stroke();
  ctx.globalAlpha = 1.0;
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

// Inicializar dibujo
dibujarTerreno();
dibujarRios();