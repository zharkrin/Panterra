// frontend/frontend/tools/infra/infra_rivers.js
const infraRivers = [];

function generarInfraRios(nivel = 1, cantidad = 5) {
  for (let i = 0; i < cantidad; i++) {
    const puntos = generarCaminoSubterraneo();
    const esDescendente = Math.random() < 0.4; // 40% chance de bajar al siguiente nivel
    const rio = {
      id: `rio_n${nivel}_${i}`,
      nivel: nivel,
      puntos: puntos,
      desciende: esDescendente,
      coordenadaDescenso: esDescendente ? puntos[puntos.length - 1] : null,
      nivelDestino: esDescendente ? nivel + 1 : null
    };
    infraRivers.push(rio);
  }
  return infraRivers;
}

function generarCaminoSubterraneo(longitud = 6) {
  const camino = [];
  let x = Math.floor(Math.random() * 100);
  let y = Math.floor(Math.random() * 100);
  camino.push([x, y]);
  for (let i = 0; i < longitud; i++) {
    x += Math.floor(Math.random() * 7 - 3);
    y += Math.floor(Math.random() * 7 - 3);
    camino.push([x, y]);
  }
  return camino;
}

// Exportar los puntos de descenso
function obtenerDescensos(nivelActual) {
  return infraRivers
    .filter(r => r.nivel === nivelActual && r.desciende)
    .map(r => r.coordenadaDescenso);
}

export { generarInfraRios, obtenerDescensos };
