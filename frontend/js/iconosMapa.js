// frontend/js/iconosMapa.js
// Maneja: arrastre desde la toolbar, colocación en el mapa y arrastre interno

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("mapa-container");
    if (!contenedor) return;

    const toolbarIcons = document.querySelectorAll(".icono-draggable");

    // Ruta base de iconos (index.html usa assets/, nacion.html usa ../assets/)
    const ICONS_BASE = document.querySelector('meta[name="nation-id"]')
      ? "../assets/iconos/"
      : "assets/iconos/";

    // ---- Drag desde la barra de iconos ----
    toolbarIcons.forEach(icono => {
      icono.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("tipoIcono", icono.dataset.icono);
      });
    });

    contenedor.addEventListener("dragover", (e) => e.preventDefault());

    contenedor.addEventListener("drop", (e) => {
      e.preventDefault();
      const tipo = e.dataTransfer.getData("tipoIcono");
      if (!tipo) return;

      const rect = contenedor.getBoundingClientRect();
      const x = e.clientX - rect.left - 16;
      const y = e.clientY - rect.top - 16;

      crearIconoEnMapa(tipo, x, y);
      if (typeof guardarMapa === "function") guardarMapa();
    });

    // ---- API pública ----
    window.hacerArrastrable = hacerArrastrable;
    window.iniciarDrag = iniciarDrag; // alias para compatibilidad con localStorageMapa.js
    window.crearIconoEnMapa = crearIconoEnMapa;

    // ---- Implementaciones ----
    function crearIconoEnMapa(tipo, x, y) {
      const img = document.createElement("img");
      img.src = `${ICONS_BASE}${tipo}.svg`;
      img.className = "icono-mapa";
      img.dataset.icono = tipo;
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      contenedor.appendChild(img);
      hacerArrastrable(img);
      return img;
    }

    // hace a un icono del mapa arrastrable con mouse
    function hacerArrastrable(icono) {
      icono.addEventListener("mousedown", iniciarDrag);
      // Botón derecho para borrar (opcional)
      icono.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (confirm("¿Eliminar este icono?")) {
          icono.remove();
          if (typeof guardarMapa === "function") guardarMapa();
        }
      });
    }

    // función expuesta para ser usada desde otros scripts
    function iniciarDrag(e) {
      e.preventDefault();
      const icono = e.currentTarget;
      const contRect = contenedor.getBoundingClientRect();

      let offsetX = e.clientX - icono.offsetLeft - contRect.left;
      let offsetY = e.clientY - icono.offsetTop - contRect.top;

      function mover(ev) {
        icono.style.left = `${ev.clientX - contRect.left - offsetX}px`;
        icono.style.top = `${ev.clientY - contRect.top - offsetY}px`;
      }

      function soltar() {
        document.removeEventListener("mousemove", mover);
        document.removeEventListener("mouseup", soltar);
        if (typeof guardarMapa === "function") guardarMapa();
      }

      document.addEventListener("mousemove", mover);
      document.addEventListener("mouseup", soltar);
    }
  });
})();