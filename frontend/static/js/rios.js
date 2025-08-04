// frontend/static/js/rios.js

// Función para generar un conjunto de ríos subterráneos
export function generarRios(ancho, alto, cantidad = 8) {
  const rios = [];

  for (let i = 0; i < cantidad; i++) {
    let largo = 40 + Math.floor(Math.random() * 60); // Longitud entre 40 y 100
    let x = Math.floor(Math.random() * ancho);
    let y = Math.floor(Math.random() * alto);
    const puntos = [{ x, y }];

    for (let j = 1; j < largo; j++) {
      const dirección = Math.floor(Math.random() * 6);
      switch (dirección) {
        case 0: x += 1; break;
        case 1: x -= 1; break;
        case 2: y += 1; break;
        case 3: y -= 1; break;
        case 4: x += 1; y += 1; break;
        case 5: x -= 1; y -= 1; break;
      }

      // Asegurar que el río no se salga del mapa
      if (x < 0 || x >= ancho || y < 0 || y >= alto) break;

      puntos.push({ x, y });
    }

    rios.push(puntos);
  }

  return rios;
}