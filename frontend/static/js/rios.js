// frontend/static/js/rios.js

// Genera ríos subterráneos simulando cauces aleatorios dentro del mapa
export function generarRios(ancho, alto, cantidad = 7) {
  const rios = [];

  for (let i = 0; i < cantidad; i++) {
    let longitud = 50 + Math.floor(Math.random() * 50);
    let x = Math.floor(Math.random() * ancho);
    let y = Math.floor(Math.random() * alto);
    const puntos = [{ x, y }];

    for (let j = 1; j < longitud; j++) {
      const direccion = Math.floor(Math.random() * 6);
      switch (direccion) {
        case 0: x += 1; break;
        case 1: x -= 1; break;
        case 2: y += 1; break;
        case 3: y -= 1; break;
        case 4: x += 1; y += 1; break;
        case 5: x -= 1; y -= 1; break;
      }
      // Limitar dentro del mapa
      if (x < 0 || x >= ancho || y < 0 || y >= alto) break;

      puntos.push({ x, y });
    }
    rios.push(puntos);
  }

  return rios;
}