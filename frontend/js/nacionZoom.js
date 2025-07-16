// nacionZoom.js

document.addEventListener("DOMContentLoaded", () => {
  const mapaDetalle = document.getElementById("mapa-detalle");
  const contenedor = document.getElementById("detalleNacion");

  // Simula abrir un mapa detallado de una nación
  window.abrirMapaNacion = (nombre) => {
    contenedor.style.display = "block";
    mapaDetalle.innerHTML = `
      <h2>Submapa de ${nombre}</h2>
      <div class="zona-submapa" id="zonaSubmapa">
        <!-- Aquí irán los íconos al hacer clic -->
      </div>
      <button onclick="cerrarDetalle()">Cerrar</button>
    `;
    
    const zona = document.getElementById("zonaSubmapa");
    zona.addEventListener("click", (e) => {
      const icono = document.createElement("img");
      icono.src = "assets/iconos/pueblo.svg"; // Usa otro si quieres
      icono.className = "marcador";
      icono.style.left = `${e.offsetX}px`;
      icono.style.top = `${e.offsetY}px`;
      zona.appendChild(icono);
    });
  };

  window.cerrarDetalle = () => {
    contenedor.style.display = "none";
    mapaDetalle.innerHTML = "";
  };
});
document.addEventListener("DOMContentLoaded", () => {
  const detalleNacion = document.getElementById("detalleNacion");
  const cerrarDetalleBtn = document.getElementById("cerrarDetalle");
  const mapa = document.getElementById("mapa");

  // Función para abrir el submapa de la nación
  function abrirSubmapa(nacionNombre) {
    detalleNacion.style.display = "block";
    detalleNacion.querySelector("h2").textContent = `Detalle de la Nación: ${nacionNombre}`;

    // Limpiamos marcadores anteriores
    const contenedorMarcadores = detalleNacion.querySelector(".zona-submapa");
    contenedorMarcadores.innerHTML = "";

    // Ejemplo: añadimos algunos marcadores de ejemplo con iconos personalizados
    const puntos = [
      { nombre: "Pueblo Viejo", tipo: "pueblo", x: 100, y: 120, icon: "1.svg" },
      { nombre: "Ciudad Central", tipo: "ciudad", x: 200, y: 180, icon: "2.svg" },
      { nombre: "Entrada a Infraoscuridad", tipo: "entrada", x: 300, y: 90, icon: "3.svg" },
      { nombre: "Mazmorra del Dragón", tipo: "mazmorra", x: 150, y: 220, icon: "4.svg" }
    ];

    puntos.forEach(punto => {
      const icono = document.createElement("img");
      icono.src = `assets/iconos/${punto.icon}`;
      icono.alt = punto.nombre;
      icono.title = punto.nombre;
      icono.classList.add("marcador");
      icono.style.position = "absolute";
      icono.style.left = punto.x + "px";
      icono.style.top = punto.y + "px";
      icono.style.width = "24px";
      icono.style.height = "24px";

      contenedorMarcadores.appendChild(icono);
    });
  }

  // Evento para cerrar el submapa
  cerrarDetalleBtn.addEventListener("click", () => {
    detalleNacion.style.display = "none";
  });

  // Ejemplo: para activar el submapa al hacer clic en una nación del mapa principal
  // Aquí asumo que cada nación tiene una clase .nacion con atributo data-nombre
  mapa.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("nacion")) {
      const nombre = target.getAttribute("data-nombre") || "Nación Desconocida";
      abrirSubmapa(nombre);
    }
  });
});