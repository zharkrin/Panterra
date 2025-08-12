// frontend/frontend/Tools/nombres/namesbase_elfico.js
"use strict";

/**
 * Generador de nombres élficos estilo Tolkien
 * Autor: [Asmodeo]
 * Se puede usar en cualquier proyecto.
 */

const consonantesInicio = [
  "l", "n", "s", "th", "f", "m", "c", "r", "v", "h", "d", "g", "t", "qu"
];
const vocales = ["a", "e", "i", "o", "u"];
const consonantesMedio = [
  "nd", "l", "n", "r", "m", "s", "th", "v", "ll", "c", "h", "f", "d", "g"
];
const terminaciones = [
  "ion", "iel", "ar", "eth", "ien", "or", "al", "as", "el", "ir", "uil", "orë", "ienn"
];

/**
 * Genera un nombre élfico aleatorio
 * @param {number} minSyllables - número mínimo de sílabas
 * @param {number} maxSyllables - número máximo de sílabas
 * @returns {string} - nombre generado
 */
export function generarNombreElfico(minSyllables = 2, maxSyllables = 4) {
  const syllables = [];
  const totalSyllables = Math.floor(Math.random() * (maxSyllables - minSyllables + 1)) + minSyllables;

  // Primera sílaba
  syllables.push(
    random(consonantesInicio) + random(vocales)
  );

  // Sílabas intermedias
  for (let i = 1; i < totalSyllables - 1; i++) {
    syllables.push(random(consonantesMedio) + random(vocales));
  }

  // Última sílaba con terminación
  syllables.push(random(terminaciones));

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
