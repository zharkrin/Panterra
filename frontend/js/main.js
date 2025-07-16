document.addEventListener("DOMContentLoaded", () => {
  const nuevoBtn = document.getElementById("nuevoMundo");
  const cargarBtn = document.getElementById("cargarMundo");
  const mapa = document.getElementById("mapa");

  nuevoBtn.addEventListener("click", () => {
    mapa.innerHTML = "<p>🌍 Generando nuevo mundo... (simulado)</p>";
    // Aquí se insertará el generador real
  });

  cargarBtn.addEventListener("click", () => {
    mapa.innerHTML = "<p>📂 Cargando mundo desde archivo... (simulado)</p>";
    // Aquí se insertará el cargador real
  });
});
// Simulación de selección de nación para redirigir al submapa correspondiente
// Este código debería integrarse con el mapa real más adelante
document.addEventListener("DOMContentLoaded", () => {
  const mapa = document.getElementById("map-container");

  mapa.addEventListener("click", (e) => {
    // Por ahora simplemente redirigimos a nación 1
    // Luego lo conectaremos con IDs reales del mapa
    window.location.href = "/naciones/1";
  });
});