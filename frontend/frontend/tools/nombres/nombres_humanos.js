// frontend/frontend/Tools/nombres/nombres_humanos.js
"use strict";

/**
 * Nombres humanos organizados por cultura
 * Cada array exportado por separado para mantener estructura modular y liviana
 */

// Vikingos / Nórdicos
export const nombresVikingos = [
  "Bjorn", "Leif", "Erik", "Ragnar", "Sigurd", "Hakon", "Ingrid", "Astrid", "Freya", "Sigrid"
];

// Celtas / Irlandeses
export const nombresCeltas = [
  "Aedan", "Bran", "Dylan", "Ewan", "Liam", "Fiona", "Maeve", "Niamh", "Rhiannon", "Grainne"
];

// Árabes
export const nombresArabes = [
  "Omar", "Yusuf", "Khalid", "Hassan", "Ali", "Aisha", "Fatima", "Layla", "Zahra", "Samira"
];

// Medievales / Ingleses clásicos
export const nombresMedievales = [
  "William", "Richard", "Edward", "Henry", "Robert", "Isabella", "Eleanor", "Catherine", "Matilda", "Joan"
];

// Orientales (japoneses/asiáticos)
export const nombresOrientales = [
  "Hiroshi", "Kenji", "Akira", "Haruto", "Daichi", "Aiko", "Yuki", "Sakura", "Hana", "Emiko"
];

/**
 * Obtiene un nombre aleatorio según cultura.
 * @param {string} cultura - Nombre de cultura: 'vikingos', 'celtas', 'arabes', 'medievales', 'orientales'
 * @returns {string|null} - Nombre elegido o null si cultura no existe
 */
export function generarNombreHumanoPorCultura(cultura) {
  const mapping = {
    vikingos: nombresVikingos,
    celtas: nombresCeltas,
    arabes: nombresArabes,
    medievales: nombresMedievales,
    orientales: nombresOrientales,
  };
  const lista = mapping[cultura];
  if (!lista) return null;
  return lista[Math.floor(Math.random() * lista.length)];
}
