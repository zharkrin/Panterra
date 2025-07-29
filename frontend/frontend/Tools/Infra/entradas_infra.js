// frontend/frontend/tools/infra/entradas_infra.js

const entradasInfra = [];

function generarEntradasInfraoscuridad(cantidad = 10, ancho = 100, alto = 100) {
  entradasInfra.length = 0;

  for (let i = 0; i < cantidad; i++) {
    const x = Math.floor(Math.random() * ancho);
    const y = Math.floor(Math.random() * alto);

    entradasInfra.push({
      id: `entrada_${i}`,
      coordenadas: [x, y],
      conectadaA: `infra_nivel_1`, // en el futuro se puede enlazar con regiones específicas
      tipo: 'cueva'
    });
  }

  return entradasInfra;
}

// Opcional: renderizado simple si usamos canvas o SVG
function dibujarEntradasInfra(ctx, escala = 1) {
  entradasInfra.forEach(entrada => {
    const [x, y] = entrada.coordenadas;
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.arc(x * escala, y * escala, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.stroke();
  });
}

export { generarEntradasInfraoscuridad, dibujarEntradasInfra, entradasInfra };