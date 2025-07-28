// frontend/frontend/tools/biomas.js

function asignarBiomasPersonalizados() {
  if (!window.pack || !pack.cells || !pack.cells.biome) {
    console.error("Mapa no compatible con el sistema de biomas.");
    return;
  }

  const biomas = {
    0: "Océano",
    1: "Tundra",
    2: "Taiga",
    3: "Bosque templado",
    4: "Pradera",
    5: "Bosque tropical",
    6: "Sabana",
    7: "Desierto cálido",
    8: "Desierto frío",
    9: "Pantano",
    10: "Selva tropical",
    11: "Alta montaña"
  };

  for (let i = 0; i < pack.cells.biome.length; i++) {
    const altura = pack.cells.h[i];
    const humedad = pack.cells.humidity[i];

    let biome = 0; // por defecto océano

    if (altura > 0.8) biome = 11;
    else if (altura > 0.6) biome = humedad < 0.2 ? 8 : 2;
    else if (altura > 0.3) {
      if (humedad < 0.1) biome = 7;
      else if (humedad < 0.3) biome = 6;
      else if (humedad < 0.5) biome = 4;
      else biome = 3;
    } else {
      if (humedad < 0.2) biome = 7;
      else if (humedad < 0.4) biome = 6;
      else if (humedad < 0.6) biome = 9;
      else biome = 10;
    }

    pack.cells.biome[i] = biome;
  }

  console.log("Biomas asignados:");
  Object.entries(biomas).forEach(([id, name]) =>
    console.log(`${id}: ${name}`)
  );
}