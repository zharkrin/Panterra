document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById("map-container");
  const iconos = document.querySelectorAll(".icono-draggable");

  // Cargar iconos guardados (localStorage)
  const guardados = JSON.parse(localStorage.getItem("iconosMapa")) || [];
  guardados.forEach(icono => crearIcono(icono.tipo, icono.x, icono.y));

  iconos.forEach(icono => {
    icono.addEventListener("dragstart", e => {
      e.dataTransfer.setData("icono", icono.dataset.icono);
    });
  });

  mapContainer.addEventListener("dragover", e => {
    e.preventDefault();
  });

  mapContainer.addEventListener("drop", e => {
    e.preventDefault();
    const tipo = e.dataTransfer.getData("icono");
    const x = e.offsetX;
    const y = e.offsetY;
    crearIcono(tipo, x, y);
    guardarIcono(tipo, x, y);
  });

  function crearIcono(tipo, x, y) {
    const img = document.createElement("img");
    img.src = `assets/iconos/${tipo}.svg`;
    img.className = "icono-mapa";
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.dataset.tipo = tipo;

    // Confirmación antes de borrar
    img.addEventListener("contextmenu", e => {
      e.preventDefault();
      const confirmacion = confirm("¿Estás seguro de que deseas eliminar este icono?");
      if (confirmacion) {
        img.remove();
        eliminarIcono(tipo, x, y);
      }
    });

    mapContainer.appendChild(img);
  }

  function guardarIcono(tipo, x, y) {
    const guardados = JSON.parse(localStorage.getItem("iconosMapa")) || [];
    guardados.push({ tipo, x, y });
    localStorage.setItem("iconosMapa", JSON.stringify(guardados));
  }

  function eliminarIcono(tipo, x, y) {
    let guardados = JSON.parse(localStorage.getItem("iconosMapa")) || [];
    guardados = guardados.filter(i => !(i.tipo === tipo && i.x === x && i.y === y));
    localStorage.setItem("iconosMapa", JSON.stringify(guardados));
  }
});