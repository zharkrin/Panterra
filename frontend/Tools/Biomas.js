// frontend/tools/biomas.js

// Definición de los biomas disponibles en el sistema
const biomasDisponibles = [
  { nombre: "Bosque", color: "#228B22" },
  { nombre: "Desierto", color: "#EDC9Af" },
  { nombre: "Montañas", color: "#A9A9A9" },
  { nombre: "Pantano", color: "#556B2F" },
  { nombre: "Tundra", color: "#B0C4DE" },
  { nombre: "Sabana", color: "#DAA520" },
  { nombre: "Jungla", color: "#006400" },
  { nombre: "Estepa", color: "#C2B280" },
  { nombre: "Llanura", color: "#98FB98" },
  { nombre: "Volcánico", color: "#8B0000" },
  { nombre: "Gélido", color: "#E0FFFF" },
  { nombre: "Cueva", color: "#3F3F3F" },
  { nombre: "Costero", color: "#87CEEB" },
];

// Crear selector visual de biomas
function crearSelectorBiomas(contenedorId = "bioma-selector") {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  biomasDisponibles.forEach(bioma => {
    const boton = document.createElement("button");
    boton.textContent = bioma.nombre;
    boton.style.backgroundColor = bioma.color;
    boton.classList.add("boton-bioma");
    boton.onclick = () => seleccionarBioma(bioma);
    contenedor.appendChild(boton);
  });
}

// Variable global para el bioma seleccionado
let biomaSeleccionado = null;

function seleccionarBioma(bioma) {
  biomaSeleccionado = bioma;
  document.getElementById("bioma-actual").textContent = `Bioma actual: ${bioma.nombre}`;
}

// Aplicar el bioma actual a una coordenada o región (a extender según implementación de mapa)
function aplicarBioma(x, y) {
  if (!bi