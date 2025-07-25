document.addEventListener("DOMContentLoaded", () => {
  const mapaContainer = document.getElementById("map-container");
  const nacionId = mapaContainer.getAttribute("data-nacion-id") || 1; // Por defecto 1

  // --- Cargar iconos desde el servidor ---
  async function cargarMapa() {
    try {
      const response = await fetch(`/api/nacion/${nacionId}`);
      if (!response.ok) throw new Error("Error al cargar mapa");
      const data = await response.json();

      mapaContainer.innerHTML = ""; // Limpia el contenedor

      if (data.iconos && Array.isArray(data.iconos)) {
        data.iconos.forEach(icono => {
          const img = document.createElement("img");
          img.src = `../assets/iconos/${icono.tipo}.svg`;
          img.className = "icono-mapa";
          img.style.left = icono.x + "px";
          img.style.top = icono.y + "px";
          img.dataset.tipo = icono.tipo;
          mapaContainer.appendChild(img);

          hacerArrastrable(img);
        });
      }
    } catch (err) {
      console.error("No se pudo cargar el mapa:", err);
    }
  }

  // --- Guardar iconos en el servidor ---
  async function guardarMapa() {
    const iconos = [];
    mapaContainer.querySelectorAll(".icono-mapa").forEach(img => {
      iconos.push({
        tipo: img.dataset.tipo,
        x: parseInt(img.style.left),
        y: parseInt(img.style.top)
      });
    });

    try {
      const response = await fetch(`/api/nacion/${nacionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ iconos })
      });
      if (response.ok) {
        alert("Mapa guardado con éxito en el servidor.");
      } else {
        throw new Error("Error al guardar");
      }
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar el mapa.");
    }
  }

  // --- Borrar iconos ---
  function borrarMapa() {
    if (!confirm("¿Seguro que quieres borrar todos los iconos del mapa?")) return;
    mapaContainer.innerHTML = "";
    guardarMapa(); // Guardamos el estado vacío
  }

  // --- Función para hacer arrastrables los iconos ---
  function hacerArrastrable(elemento) {
    let offsetX = 0, offsetY = 0, isDragging = false;

    elemento.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - elemento.offsetLeft;
      offsetY = e.clientY - elemento.offsetTop;
      elemento.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      elemento.style.left = (e.clientX - offsetX) + "px";
      elemento.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        elemento.style.cursor = "grab";
        guardarMapa(); // Guarda automáticamente al soltar
      }
    });
  }

  // --- Soporte para arrastrar iconos desde la barra ---
  const iconosBarra = document.querySelectorAll("#barra-iconos img");
  iconosBarra.forEach(icono => {
    icono.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("tipo", icono.dataset.icono);
    });
  });

  mapaContainer.addEventListener("dragover", (e) => e.preventDefault());

  mapaContainer.addEventListener("drop", (e) => {
    e.preventDefault();
    const tipo = e.dataTransfer.getData("tipo");
    const nuevoIcono = document.createElement("img");
    nuevoIcono.src = `../assets/iconos/${tipo}.svg`;
    nuevoIcono.className = "icono-mapa";
    nuevoIcono.dataset.tipo = tipo;
    nuevoIcono.style.left = (e.offsetX - 16) + "px";
    nuevoIcono.style.top = (e.offsetY - 16) + "px";
    mapaContainer.appendChild(nuevoIcono);
    hacerArrastrable(nuevoIcono);
    guardarMapa(); // Guarda el nuevo estado
  });

  // --- Botones ---
  window.guardarMapa = guardarMapa;
  window.borrarMapa = borrarMapa;

  // --- Cargar al inicio ---
  cargarMapa();
});