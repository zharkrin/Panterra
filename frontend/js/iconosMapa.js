document.addEventListener("DOMContentLoaded", () => {
  const iconos = document.querySelectorAll(".icono-draggable");
  const mapa = document.getElementById("mapa");

  iconos.forEach(icono => {
    icono.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", e.target.dataset.icono);
    });
  });

  mapa.addEventListener("dragover", e => {
    e.preventDefault();
  });

  mapa.addEventListener("drop", e => {
    e.preventDefault();
    const tipo = e.dataTransfer.getData("text/plain");
    const nuevoIcono = document.createElement("img");
    nuevoIcono.src = `assets/iconos/${tipo}.svg`;
    nuevoIcono.classList.add("icono-mapa");
    nuevoIcono.style.left = `${e.offsetX}px`;
    nuevoIcono.style.top = `${e.offsetY}px`;
    nuevoIcono.style.position = "absolute";
    mapa.appendChild(nuevoIcono);
  });
});