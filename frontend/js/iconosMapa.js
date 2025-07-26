document.addEventListener("DOMContentLoaded", () => {
  const barraIconos = document.getElementById("barra-iconos");
  const mapa = document.getElementById("map-container");

  if (!barraIconos || !mapa) return; // Si no hay barra o mapa, no hacer nada

  // Drag & Drop para colocar iconos
  barraIconos.querySelectorAll(".icono-draggable").forEach(icono => {
    icono.addEventListener("dragstart", e => {
      e.dataTransfer.setData("icono", icono.getAttribute("data-icono"));
    });
  });

  mapa.addEventListener("dragover", e => e.preventDefault());

  mapa.addEventListener("drop", e => {
    e.preventDefault();
    const tipo = e.dataTransfer.getData("icono");
    if (!tipo) return;

    const x = e.offsetX;
    const y = e.offsetY;
    agregarIcono(tipo, x, y);
    guardarEnLocalStorage();
  });

  // Cargar iconos previos
  cargarDesdeLocalStorage();

  // Funciones principales
  function agregarIcono(tipo, x, y) {
    const icono = document.createElement("img");
    icono.src = `assets/iconos/${tipo}.svg`;
    icono.classList.add("icono-mapa");
    icono.style.left = `${x - 24}px`;
    icono.style.top = `${y - 24}px`;

    // Hacer iconos arrastrables dentro del mapa
    icono.addEventListener("mousedown", iniciarArrastre);

    mapa.appendChild(icono);
  }

  function iniciarArrastre(e) {
    e.preventDefault();
    const icono = e.target;
    let offsetX = e.clientX - icono.offsetLeft;
    let offsetY = e.clientY - icono.offsetTop;

    function moverIcono(e) {
      icono.style.left = `${e.clientX - offsetX}px`;
      icono.style.top = `${e.clientY - offsetY}px`;
    }

    function soltarIcono() {
      document.removeEventListener("mousemove", moverIcono);
      document.removeEventListener("mouseup", soltarIcono);
      guardarEnLocalStorage();
    }

    document.addEventListener("mousemove", moverIcono);
    document.addEventListener("mouseup", soltarIcono);
  }

  // Guardar en localStorage
  function guardarEnLocalStorage() {
    const datos = [];
    mapa.querySelectorAll(".icono-mapa").forEach(icono => {
      datos.push({
        src: icono.src,
        left: icono.style.left,
        top: icono.style.top
      });
    });
    localStorage.setItem("iconosMapa", JSON.stringify(datos));
  }

  // Cargar desde localStorage
  function cargarDesdeLocalStorage() {
    const guardado = localStorage.getItem("iconosMapa");
    if (!guardado) return;
    const datos = JSON.parse(guardado);
    datos.forEach(d => {
      const icono = document.createElement("img");
      icono.src = d.src;
      icono.classList.add("icono-mapa");
      icono.style.left = d.left;
      icono.style.top = d.top;
      icono.addEventListener("mousedown", iniciarArrastre);
      mapa.appendChild(icono);
    });
  }

  // Botón: Guardar mapa
  window.guardarMapa = function() {
    guardarEnLocalStorage();
    alert("Mapa guardado correctamente.");
  };

  // Botón: Cargar mapa
  window.cargarMapa = function() {
    const archivo = document.getElementById("cargarMapaInput").files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = function(e) {
      try {
        const datos = JSON.parse(e.target.result);
        localStorage.setItem("iconosMapa", JSON.stringify(datos));
        mapa.innerHTML = ""; // Limpiar
        datos.forEach(d => {
          const icono = document.createElement("img");
          icono.src = d.src;
          icono.classList.add("icono-mapa");
          icono.style.left = d.left;
          icono.style.top = d.top;
          icono.addEventListener("mousedown", iniciarArrastre);
          mapa.appendChild(icono);
        });
        alert("Mapa cargado correctamente.");
      } catch (err) {
        alert("Error al cargar el archivo de mapa.");
      }
    };
    lector.readAsText(archivo);
  };

  // Botón: Borrar mapa
  window.borrarMapa = function() {
    if (!confirm("¿Seguro que quieres borrar todos los iconos del mapa?")) return;
    mapa.innerHTML = "";
    localStorage.removeItem("iconosMapa");
  };
});