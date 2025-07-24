// iconosMapa.js
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("mapa-container");
  const iconosDraggables = document.querySelectorAll(".icono-draggable");

  // Eventos para arrastrar iconos desde la barra
  iconosDraggables.forEach(icono => {
    icono.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("tipoIcono", icono.dataset.icono);
    });
  });

  // Evitar el comportamiento por defecto al arrastrar sobre el mapa
  contenedor.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  // Soltar icono en el mapa
  contenedor.addEventListener("drop", (e) => {
    e.preventDefault();
    const tipoIcono = e.dataTransfer.getData("tipoIcono");
    if (tipoIcono) {
      colocarIcono(tipoIcono, e.offsetX, e.offsetY);
      guardarMapa(); // Guardar automáticamente tras colocar un icono
    }
  });

  // Hacer iconos ya en el mapa arrastrables
  function colocarIcono(tipo, x, y) {
    const nuevoIcono = document.createElement("img");
    nuevoIcono.src = `assets/iconos/${tipo}.svg`;
    nuevoIcono.classList.add("icono-mapa");
    nuevoIcono.dataset.icono = tipo;
    nuevoIcono.style.left = `${x}px`;
    nuevoIcono.style.top = `${y}px`;

    hacerArrastrable(nuevoIcono);
    contenedor.appendChild(nuevoIcono);
  }

  // Función para hacer arrastrables los iconos en el mapa
  window.hacerArrastrable = function (icono) {
    let offsetX, offsetY;
    icono.addEventListener("mousedown", (e) => {
      e.preventDefault();
      offsetX = e.clientX - icono.getBoundingClientRect().left;
      offsetY = e.clientY - icono.getBoundingClientRect().top;

      function moverIcono(ev) {
        icono.style.left = `${ev.clientX - offsetX - contenedor.getBoundingClientRect().left}px`;
        icono.style.top = `${ev.clientY - offsetY - contenedor.getBoundingClientRect().top}px`;
      }

      function soltarIcono() {
        document.removeEventListener("mousemove", moverIcono);
        document.removeEventListener("mouseup", soltarIcono);
        guardarMapa(); // Guardar posición al soltar
      }

      document.addEventListener("mousemove", moverIcono);
      document.addEventListener("mouseup", soltarIcono);
    });
  };
});