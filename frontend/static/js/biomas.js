// frontend/static/js/biomas.js

// Lista de tipos de biomas para la Infraoscuridad
const tiposBioma = [
  'magma',
  'hongos',
  'cristal',
  'ruinas',
  'lago',
  'vacio'
];

// Función para generar un mapa de biomas de ancho x alto
export function generarBiomas(ancho, alto) {
  const biomas = [];

  for (let y = 0; y < alto; y++) {
    const fila = [];
    for (let x = 0; x < ancho; x++) {
      // Probabilidad ponderada para cada tipo
      const r = Math.random();
      let tipo;

      if (r < 0.15) tipo = 'magma';
      else if (r < 0.35) tipo = 'hongos';
      else if (r < 0.50) tipo = 'cristal';
      else if (r < 0.70) tipo = 'ruinas';
      else if (r < 0.85) tipo = 'lago';
      else tipo = 'vacio';

      fila.push(tipo);
    }
    biomas.push(fila);
  }

  return biomas;
}