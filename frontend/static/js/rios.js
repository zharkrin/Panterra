// frontend/static/js/rios.js

export function generarRios(altura, ancho, alto) {
  const drenajes = [];
  const flujo = Array.from({ length: alto }, () => Array(ancho).fill(0));

  function esMenor(x, y, nx, ny) {
    return altura[ny] && altura[ny][nx] < altura[y][x];
  }

  function encontrarSalida(x, y) {
    const vecinos = [[1,0],[0,1],[-1,0],[0,-1]];
    let minAltura = altura[y][x], destino = { x, y };
    for (const [dx, dy] of vecinos) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < ancho && ny < alto && esMenor(x, y, nx, ny)) {
        if (altura[ny][nx] < minAltura) {
          destino = { x: nx, y: ny };
          minAltura = altura[ny][nx];
        }
      }
    }
    return destino;
  }

  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      const destino = encontrarSalida(x, y);
      if (destino.x !== x || destino.y !== y) {
        drenajes.push({ from: { x, y }, to: destino });
        flujo[destino.y][destino.x]++;
      }
    }
  }

  const rios = drenajes.filter(d => flujo[d.to.y][d.to.x] > 1);
  return rios;
}