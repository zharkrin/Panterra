document.addEventListener("DOMContentLoaded", () => {
  const mapa = document.getElementById("mapa-nacion");

  // Cargar posiciones desde localStorage
  const posicionesGuardadas = JSON.parse(localStorage.getItem("iconosEnMapa")) || [];
  posicionesGuardadas.forEach(({ tipo, x, y }) => {
    colocarIcono(tipo, x, y);
  });

  // Manejar arrastre desde barra
  const iconos = document.querySelectorAll(".icono-draggable");
  iconos.forEach(icono => {
    icono.addEventListener("dragstart", e => {
      e.dataTransfer.setData("icono", icono.dataset.icono);
    });
  });

  // Permitir soltar en mapa
  mapa.addEventListener("dragover", e => e.preventDefault());
  mapa.addEventListener("drop", e => {
    e.preventDefault();
    const tipo = e.dataTransfer.getData("icono");
    const x = e.offsetX;
    const y = e.offsetY;
    colocarIcono(tipo, x, y);
    guardarIcono(tipo, x, y);
  });

  function colocarIcono(tipo, x, y) {
    const nuevo = document.createElement("img");
    nuevo.src = `../assets/iconos/${tipo}.svg`;
    nuevo.className = "icono-mapa";
    nuevo.style.left = x + "px";
    nuevo.style.top = y + "px";
    mapa.appendChild(nuevo);
  }

  function guardarIcono(tipo, x, y) {
    posicionesGuardadas.push({ tipo, x, y });
    localStorage.setItem("iconosEnMapa", JSON.stringify(posicionesGuardadas));
  }
});