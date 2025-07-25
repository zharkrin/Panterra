// frontend/js/iconosMapa.js
// Arrastre desde la barra, colocación en el mapa, arrastre dentro del mapa
// Carga y guardado automático contra la API Flask (/api/cargar, /api/guardar)

(() => {
  const API_LOAD  = "/api/cargar";
  const API_SAVE  = "/api/guardar";

  let contenedor = null;
  let ICONS_BASE = "assets/iconos/"; // por defecto (index.html)
  let isNationPage = false;

  document.addEventListener("DOMContentLoaded", async () => {
    contenedor = document.getElementById("mapa-container") || document.getElementById("map-container");
    if (!contenedor) {
      console.warn("No se encontró #mapa-container / #map-container");
      return;
    }

    // Detectar si estamos en /nacion/ (para ajustar la ruta a ../assets/)
    isNationPage = /\/nacion\//.test(location.pathname) ||
                   !!document.querySelector('meta[name="nation-id"]');
    ICONS_BASE = isNationPage ? "../assets/iconos/" : "assets/iconos/";

    wireToolbar();
    wireMapDnD();

    // Cargar desde servidor al inicio
    await cargarDesdeServidor();
  });

  /** Vincula eventos a la toolbar de iconos (dragstart) */
  function wireToolbar() {
    const toolbarIcons = document.querySelectorAll(".icono-draggable");
    toolbarIcons.forEach(icono => {
      icono.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("tipoIcono", icono.dataset.icono);
      });
    });
  }

  /** Permite soltar iconos en el mapa */
  function wireMapDnD() {
    contenedor.addEventListener("dragover", (e) => e.preventDefault());

    contenedor.addEventListener("drop", async (e) => {
      e.preventDefault();
      const tipo = e.dataTransfer.getData("tipoIcono");
      if (!tipo) return;

      const rect = contenedor.getBoundingClientRect();
      const x = e.clientX - rect.left - 16;
      const y = e.clientY - rect.top - 16;

      crearIconoEnMapa(tipo, x, y);
      await guardarEnServidor();
    });
  }

  /** Crea un icono en el mapa y lo hace arrastrable */
  function crearIconoEnMapa(tipo, x, y) {
    const img = document.createElement("img");
    img.src = `${ICONS_BASE}${tipo}.svg`;
    img.className = "icono-mapa";
    img.dataset.icono = tipo;
    img.style.left = `${x}px`;
    img.style.top  = `${y}px`;

    hacerArrastrable(img);
    contenedor.appendChild(img);
    return img;
  }

  /** Hace un icono arrastrable con el ratón y borra con clic derecho */
  function hacerArrastrable(icono) {
    icono.style.cursor = "grab";

    icono.addEventListener("contextmenu", async (e) => {
      e.preventDefault();
      if (confirm("¿Eliminar este icono?")) {
        icono.remove();
        await guardarEnServidor();
      }
    });

    icono.addEventListener("mousedown", (e) => iniciarDrag(e, icono));
  }

  /** Inicia el drag manual de un icono en el mapa */
  function iniciarDrag(e, icono) {
    e.preventDefault();
    const rectMap = contenedor.getBoundingClientRect();
    const offsetX = e.clientX - (rectMap.left + parseInt(icono.style.left));
    const offsetY = e.clientY - (rectMap.top  + parseInt(icono.style.top));

    icono.style.cursor = "grabbing";

    function mover(ev) {
      const x = ev.clientX - rectMap.left - offsetX;
      const y = ev.clientY - rectMap.top  - offsetY;
      icono.style.left = `${x}px`;
      icono.style.top  = `${y}px`;
    }

    async function soltar() {
      document.removeEventListener("mousemove", mover);
      document.removeEventListener("mouseup", soltar);
      icono.style.cursor = "grab";
      await guardarEnServidor();
    }

    document.addEventListener("mousemove", mover);
    document.addEventListener("mouseup", soltar);
  }

  /** Exporta los iconos actualmente en el mapa a un array */
  function exportarData() {
    const iconos = contenedor.querySelectorAll(".icono-mapa");
    return Array.from(iconos).map(i => ({
      tipo: i.dataset.icono,
      x: parseInt(i.style.left),
      y: parseInt(i.style.top)
    }));
  }

  /** Limpia el mapa y restaura iconos desde un array */
  function restaurarDesdeData(data) {
    contenedor.querySelectorAll(".icono-mapa").forEach(i => i.remove());
    data.forEach(d => crearIconoEnMapa(d.tipo, d.x, d.y));
  }

  /** Cargar desde servidor */
  async function cargarDesdeServidor() {
    try {
      const res = await fetch(API_LOAD);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      // data puede ser [] o {iconos: [...]}, soportemos ambas
      const iconos = Array.isArray(data) ? data : (data.iconos || []);
      restaurarDesdeData(iconos);
    } catch (err) {
      console.warn("No se pudo cargar desde el servidor:", err);
    }
  }

  /** Guardar en servidor */
  async function guardarEnServidor() {
    const payload = { iconos: exportarData() };
    try {
      const res = await fetch(API_SAVE, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(await res.text());
      // opcional: mostrar toast / console.log
    } catch (err) {
      console.error("No se pudo guardar en el servidor:", err);
    }
  }

  // Exponer funciones globales si los botones llaman a estas:
  window.guardarMapa = guardarEnServidor;
  window.borrarMapa = async function () {
    if (!confirm("¿Seguro que quieres borrar todos los iconos del mapa?")) return;
    contenedor.querySelectorAll(".icono-mapa").forEach(i => i.remove());
    await guardarEnServidor(); // Guardamos el estado vacío
  };
})();