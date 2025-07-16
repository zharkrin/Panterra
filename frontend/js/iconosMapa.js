document.addEventListener("DOMContentLoaded", () => {
  const mapa = document.getElementById("mapa-nacion");

  // Detectar ID de nación desde la URL (ej: /naciones/5.html → id = 5)
  const urlPartes = window.location.pathname.split("/");
  const archivo = urlPartes[urlPartes.length - 1];
  const nacionID = archivo.split(".")[0] || "base"; // base si no hay número

  const keyLocalStorage = `iconosEnMapa_nacion_${nacionID}`;

  const posicionesGuardadas = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];
  posicionesGuardadas.forEach(({ tipo, x, y }) => {
    colocarIcono(tipo, x, y);
  });

  const iconos = document.querySelectorAll(".icono-draggable");
  iconos.forEach(icono => {
    icono.addEventListener("dragstart", e => {
      e.dataTransfer.setData("icono", icono.dataset.icono);
    });
  });

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
    localStorage.setItem(keyLocalStorage, JSON.stringify(posicionesGuardadas));
  }
});