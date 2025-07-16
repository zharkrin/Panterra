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