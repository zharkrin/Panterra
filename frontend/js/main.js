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