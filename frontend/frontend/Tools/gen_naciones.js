// frontend/frontend/tools/gen_naciones.js

function generarNaciones(numero) {
  if (!window.pack || !pack.cells || !pack.features) {
    console.error("Mapa no cargado o no compatible con el sistema de naciones.");
    return;
  }

  const usedCells = new Set();
  const naciones = [];

  for (let i = 1; i <= numero; i++) {
    const cell = pack.cells.i.find(c => !usedCells.has(c) && !pack.cells.h[c]); // celda terrestre y libre
    if (cell === undefined) continue;

    usedCells.add(cell);

    const nombre = `Nación ${i}`;
    const capital = pack.cells.p[cell]; // posición
    const color = d3.color(d3.interpolateRainbow(i / numero)).hex();

    const nuevaNacion = {
      id: i,
      nombre,
      cell,
      capital,
      color
    };

    naciones.push(nuevaNacion);

    // Añadir al pack si lo deseas usar directamente en el mapa
    if (!pack.states) pack.states = [];
    pack.states.push({
      i,
      name: nombre,
      capital: cell,
      color,
      expansionism: 1,
      cells: 1
    });
  }

  console.log(`Se han generado ${naciones.length} naciones.`);
  return naciones;
}