// iconosMapa.js
// Maneja el arrastre y colocación de iconos en el mapa

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("mapa-container");
  const iconos = document.querySelectorAll(".icono-draggable");

  // Evento de arrastre desde la barra de iconos
  iconos.forEach(icono => {
    icono.addEventListener("dragstart", e => {
      e.dataTransfer.setData("icono", icono.dataset.icono);
    });
  });

  // Permitir soltar iconos sobre el mapa
  contenedor.addEventListener("dragover", e => {
    e.preventDefault();
  });

  contenedor.addEventListener("drop", e => {
    e.preventDefault();
    const tipoIcono = e.dataTransfer.getData("icono");
    if (!tipoIcono) return;

    const img = document.createElement("img");
    img.src = `assets/iconos/${tipoIcono}.svg`;
    img.classList.add("icono-mapa");
    img.dataset.icono = tipoIcono;

    // Posición del icono en el mapa
    const rect = contenedor.getBoundingClientRect();
    img.style.left = `${e.clientX - rect.left - 16}px`;
    img.style.top = `${e.clientY - rect.top - 16}px`;

    contenedor.appendChild(img);
    hacerArrastrable(img);

    guardarMapa(); // Guardar automáticamente después de añadir un icono
  });
});

// Hacer que un icono ya en el mapa sea arrastrable
function hacerArrastrable(element) {
  let offsetX, offsetY;

  element.addEventListener("mousedown", e => {
    e.preventDefault();
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;

    const mover = eMove => {
      element.style.left = `${eMove.clientX - offsetX}px`;
      element.style.top = `${eMove.clientY - offsetY}px`;
    };

    const soltar = () => {
      document.removeEventListener("mousemove", mover);
      document.removeEventListener("mouseup", soltar);
      guardarMapa(); // Guardar posiciones al soltar
    };

    document.addEventListener("mousemove", mover);
    document.addEventListener("mouseup", soltar);
  });
}