// frontend/static/js/biomas.js

export function generarBiomas(ancho, alto) {
  const biomas = [];
  const tipos = [
    "piedra seca",
    "caverna húmeda",
    "magma",
    "roca porosa",
    "cristales",
    "abismo"
  ];

  for (let y = 0; y < alto; y++) {
    biomas[y] = [];
    for (let x = 0; x < ancho; x++) {
      const r = Math.random();
      if (r < 0.2) biomas[y][x] = "magma";
      else if (r < 0.4) biomas[y][x] = "piedra seca";
      else if (r < 0.6) biomas[y][x] = "caverna húmeda";
      else if (r < 0.75) biomas[y][x] = "roca porosa";
      else if (r < 0.9) biomas[y][x] = "cristales";
      else biomas[y][x] = "abismo";
    }
  }

  return biomas;
}
