// frontend/frontend/Tools/nombres/nombres_enanos.js
"use strict";

/**
 * Generador de nombres enanos
 * Autor: [Asmodeo]
 * Inspirado en la fonética de Tolkien y Warhammer
 */

const inicioEnano = [
  "B", "D", "G", "K", "Th", "Gr", "Dr", "Br", "Kr", "Thra", "Kha", "Dur", "Gim", "Thro"
];
const vocalesEnano = ["a", "o", "u", "i", "e"];
const medioEnano = [
  "nd", "rm", "rk", "rn", "lm", "gr", "dr", "kh", "th", "zg", "mk", "br", "rm", "lg"
];
const terminacionesEnano = [
  "in", "ar", "orn", "ur", "im", "arson", "grim", "dun", "orn", "or", "ain", "grom", "drin", "thur"
];

/**
 * Genera un nombre enano aleatorio
 * @param {number} minSyllables - número mínimo de sílabas
 * @param {number} maxSyllables - número máximo de sílabas
 * @returns {string} - nombre generado
 */
export function generarNombreEnano(minSyllables = 2, maxSyllables = 3) {
  const syllables = [];
  const totalSyllables = Math.floor(Math.random() * (maxSyllables - minSyllables + 1)) + minSyllables;

  // Primera parte
  syllables.push(
    random(inicioEnano) + random(vocalesEnano)
  );

  // Parte intermedia
  for (let i = 1; i < totalSyllables - 1; i++) {
    syllables.push(random(medioEnano) + random(vocalesEnano));
  }

  // Terminación
  syllables.push(random(terminacionesEnano));

  // Unir y capitalizar
  const nombre = syllables.join("");
  return nombre.charAt(0).toUpperCase() + nombre.slice(1);
}

/**
 * Devuelve un elemento aleatorio de un array
 */
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
