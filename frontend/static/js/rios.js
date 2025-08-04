// frontend/static/js/rios.js

export function generarAltitud(ancho, alto) {
  const altitud = [];
  for (let y = 0; y < alto; y++) {
    altitud[y] = [];
    for (let x = 0; x < ancho; x++) {
      const ruido = Math.random() * 2 - 1;
      altitud[y][x] = Math.sin(x / 10) + Math.cos(y / 10) + ruido;
    }
  }
  return altitud;
}

export function generarRios(altitud, ancho, alto, cantidad = 5) {
  const rios = [];

  for (let i = 0; i < cantidad; i++) {
    // Punto alto inicial
    let max = -Infinity;
    let inicio = { x: 0, y: 0 };

    for (let y = 0; y < alto; y++) {
      for (let x = 0; x < ancho; x++) {
        if (altitud[y][x] > max) {
          max = altitud[y][x];
          inicio = { x, y };
        }
      }
    }

    const rio = [inicio];
    let actual = { ...inicio };

    for (let paso = 0; paso < 150; paso++) {
      const vecinos = obtenerVecinos(actual.x, actual.y, ancho, alto);
      let siguiente = null;
      let menorAltitud = altitud[actual.y][actual.x];

      for (const v of vecinos) {
        const a = altitud[v.y][v.x];
        if (a < menorAltitud) {
          menorAltitud = a;
          siguiente = v;
        }
      }

      if (!siguiente || rio.some(p => p.x === siguiente.x && p.y === siguiente.y)) break;

      rio.push(siguiente);
      actual = siguiente;
    }

    rios.push(rio);
  }

  return rios;
}

function obtenerVecinos(x, y, ancho, alto) {
  const vecinos = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < ancho && ny < alto) {
        vecinos.push({ x: nx, y: ny });
      }
    }
  }
  return vecinos;
}
