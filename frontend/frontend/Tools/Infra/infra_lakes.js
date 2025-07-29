// frontend/frontend/tools/infra/infra_lakes.js
const infraLakes = [];

function generarLagos(nivel, entradasDesdeArriba = [], cantidad = 3) {
  entradasDesdeArriba.forEach((coord, i) => {
    infraLakes.push({
      id: `lago_n${nivel}_entrada_${i}`,
      nivel: nivel,
      punto: coord,
      origen: 'descenso'
    });
  });

  for (let i = 0; i < cantidad; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    infraLakes.push({
      id: `lago_n${nivel}_extra_${i}`,
      nivel: nivel,
      punto: [x, y],
      origen: 'natural'
    });
  }

  return infraLakes;
}

export { generarLagos };