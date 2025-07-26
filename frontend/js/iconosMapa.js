document.addEventListener("DOMContentLoaded", () => {
  const mapa = document.getElementById("map-container") || document.getElementById("mapa-container");
  const iconos = document.querySelectorAll(".icono-draggable");

  // Evitar error si no existe el mapa
  if (!mapa) return;

  // Arrastrar iconos desde la barra
  iconos.forEach(icono => {
    icono.addEventListener("dragstart", e => {
      e.dataTransfer.setData("icono", icono.dataset.icono);
    });
  });

  // Permitir soltar iconos en el mapa
  mapa.addEventListener("dragover", e => e.preventDefault());
  mapa.addEventListener("drop", e => {
    e.preventDefault();
    const tipo = e.dataTransfer.getData("icono");
    const x = e.offsetX;
    const y = e.offsetY;
    agregarIconoMapa(tipo, x, y);
    guardarMapaDetectado();
  });

  // Cargar iconos guardados
  cargarMapaDetectado();

  // Función para agregar un icono al mapa
  function agregarIconoMapa(tipo, x, y) {
    const nuevoIcono = document.createElement("img");
    nuevoIcono.src = `assets/iconos/${tipo}.svg`;
    nuevoIcono.classList.add("icono-mapa");
    nuevoIcono.style.left = `${x - 16}px`;
    nuevoIcono.style.top = `${y - 16}px`;
    nuevoIcono.draggable = true;

    // Reposicionar icono arrastrándolo dentro del mapa
    nuevoIcono.addEventListener("dragstart", e => {
      e.dataTransfer.setData("mover", `${e.offsetX},${e.offsetY}`);
      e.dataTransfer.setData("tipo", tipo);
    });

    nuevoIcono.addEventListener("dragend", e => {
      const rect = mapa.getBoundingClientRect();
      nuevoIcono.style.left = `${e.clientX - rect.left - 16}px`;
      nuevoIcono.style.top = `${e.clientY - rect.top - 16}px`;
      guardarMapaDetectado();
    });

    // Eliminar icono con doble clic (con confirmación)
    nuevoIcono.addEventListener("dblclick", () => {
      if (confirm("¿Eliminar este icono?")) {
        mapa.removeChild(nuevoIcono);
        guardarMapaDetectado();
      }
    });

    mapa.appendChild(nuevoIcono);
  }

  // Guardar mapa en localStorage
  function guardarMapaDetectado() {
    const key = mapa.id.includes("mapa") ? "mapa_principal" : "mapa_nacion";
    const iconos = mapa.querySelectorAll(".icono-mapa");
    const data = Array.from(iconos).map(icono => ({
      tipo: icono.src.split("/").pop().replace(".svg", ""),
      x: icono.style.left,
      y: icono.style.top
    }));
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Cargar mapa desde localStorage
  function cargarMapaDetectado() {
    const key = mapa.id.includes("mapa") ? "mapa_principal" : "mapa_nacion";
    const data = localStorage.getItem(key);
    if (!data) return;
    const iconos = JSON.parse(data);
    iconos.forEach(icono => {
      const x = parseInt(icono.x);
      const y = parseInt(icono.y);
      agregarIconoMapa(icono.tipo, x + 16, y + 16);
    });
  }

  // Funciones globales para botones
  window.guardarMapa = (key) => guardarMapaDetectado();
  window.borrarMapa = (key) => {
    if (!confirm("¿Seguro que quieres borrar todos los iconos del mapa?")) return;
    mapa.querySelectorAll(".icono-mapa").forEach(icono => mapa.removeChild(icono));
    localStorage.removeItem(key === 'principal' ? "mapa_principal" : "mapa_nacion");
  };
});