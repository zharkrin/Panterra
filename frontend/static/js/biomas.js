// frontend/static/js/biomas.js

// Tipos de biomas para Infraoscuridad, con sus probabilidades
const tiposBioma = [
  { tipo: 'magma', prob: 0.15 },
  { tipo: 'hongos', prob: 0.30 },
  { tipo: 'cristal', prob: 0.20 },
  { tipo: 'ruinas', prob: 0.20 },
  { tipo: 'lago', prob: 0.10 },
  { tipo: 'vacio', prob: 0.05 }
];

// Función para generar biomas aleatorios ponderados
export function generarBiomas(ancho, alto) {
  const biomas = [];

  for (let y = 0; y < alto; y++) {
    const fila = [];
    for (let x = 0; x < ancho; x++) {
      const r = Math.random();
      let acumulado = 0;
      let tipo = 'vacio';

      for (const t of tiposBioma) {
        acumulado += t.prob;
        if (r < acumulado) {
          tipo = t.tipo;
          break;
        }
      }
      fila.push(tipo);
    }
    biomas.push(fila);
  }

  return biomas;
}