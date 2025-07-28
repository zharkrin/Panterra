// tools/biomas.js

// Tabla de biomas basada en elevación, humedad y latitud
function determinarBioma(elevacion, humedad, latitud) {
  if (elevacion > 0.8) return "montañas";
  if (elevacion < 0.1) return "océano";

  if (latitud > 0.75 || latitud < 0.25) {
    // Regiones frías
    if (humedad < 0.3) return "tundra";
    return "taiga";
  }

  if (humedad < 0.2) return "desierto";
  if (humedad < 0.4) return "sabana";
  if (humedad < 0.7) return "bosque templado";

  return "selva";
}

// Generador de valores simulados (puedes conectar con el generador real)
function generarBiomasAnchoAlto(ancho, alto) {
  const biomas = [];

  for (let y = 0; y < alto; y++) {
    const fila = [];
    for (let x = 0; x < ancho; x++) {
      // Simulación simple de datos de elevación, humedad y latitud
      const elevacion = Math.random(); // 0 a 1
      const humedad = Math.random();   // 0 a 1
      const latitud = y / alto;        // 0 (sur) a 1 (norte)

      const bioma = determinarBioma(elevacion, humedad, latitud);
      fila.push(bioma);
    }
    biomas.push(fila);
  }

  return biomas;
}

// Exportación para uso con HTML
if (typeof window !== 'undefined') {
  window.generarBiomasAnchoAlto = generarBiomasAnchoAlto;
  window.determinarBioma = determinarBioma;
}