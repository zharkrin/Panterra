// frontend/static/js/nivel_base.js

import { generarBiomas } from './biomas.js';
import { generarRios } from './rios.js';

const canvas = document.getElementById('mapa');
const ctx = canvas.getContext('2d');

// Dimensiones
const TILE_WIDTH = 512;
const TILE_HEIGHT = 256;

// Mapa de 10x10 celdas como base
const MAP_WIDTH = 10;
const MAP_HEIGHT = 10;

// Tiles locales (sin dependencia externa)
const biomasTiles = {
  magma: '/static/Tiles/magma.png',
  hongos: '/static/Tiles/hongos.png',
  cristal: '/static/Tiles/cristal.png',
  ruinas: '/static/Tiles/ruinas.png',
  lago: '/static/Tiles/lago_subterraneo.png',
  vacio: '/static/Tiles/vacio.png'
};

// Cargar imagen desde ruta
function cargarImagen(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Dibuja un tile isométrico
function dibujarTile(img, x, y) {
  const isoX = (x - y) * (TILE_WIDTH / 2) + canvas.width / 2 - TILE_WIDTH / 2;
  const isoY = (x + y) * (TILE_HEIGHT / 2);
  ctx.drawImage(img, isoX, isoY, TILE_WIDTH, TILE_HEIGHT);
}

// Dibujar todo el mapa
async function dibujarMapa() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const biomas = generarBiomas(MAP_WIDTH, MAP_HEIGHT);
  const rios = generarRios(MAP_WIDTH, MAP_HEIGHT);

  // Cargar imágenes de biomas
  const imagenes = {};
  for (const clave in biomasTiles) {
    imagenes[clave] = await cargarImagen(biomasTiles[clave]);
  }

  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      const tipo = biomas[y][x] || 'vacio';
      const tile = imagenes[tipo];
      dibujarTile(tile, x, y);
    }
  }

  // Dibujar ríos como líneas azules (simplificado)
  ctx.strokeStyle = 'rgba(100,150,255,0.6)';
  ctx.lineWidth = 4;

  rios.forEach(rio => {
    ctx.beginPath();
    rio.forEach((p, i) => {
      const isoX = (p.x - p.y) * (TILE_WIDTH / 2) + canvas.width / 2;
      const isoY = (p.x + p.y) * (TILE_HEIGHT / 2) + TILE_HEIGHT / 2;
      if (i === 0) ctx.moveTo(isoX, isoY);
      else ctx.lineTo(isoX, isoY);
    });
    ctx.stroke();
  });
}

// Iniciar
dibujarMapa();