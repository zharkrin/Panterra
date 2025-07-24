// localStorageMapa.js
document.addEventListener("DOMContentLoaded", () => {
  const mapa = document.getElementById("map-container");

  // Cargar iconos guardados
  const iconosGuardados = JSON.parse(localStorage.getItem("iconosMapa")) || [];
  iconosGuardados.forEach(data => crearIcono(data.icono, data.x, data.y));

  // Guardar iconos actuales
  window.guardarMapa = function() {
    const iconos = Array.from(mapa.querySelectorAll(".icono-mapa"));
    const datos = iconos.map(icono => ({
      icono: icono.dataset.icono,
      x: icono.style.left,
      y: icono.style.top
    }));
    localStorage.setItem("iconosMapa", JSON.stringify(datos));
    alert("Mapa guardado en tu navegador.");
  };

  // Cargar desde archivo JSON
  window.cargarMapa = function() {
    const input = document.getElementById("cargarMapaInput");
    const archivo = input.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = e => {
      const datos = JSON.parse(e.target.result);
      limpiarMapa();
      datos.forEach(data => crearIcono(data.icono, data.x, data.y));
      localStorage.setItem("iconosMapa", JSON.stringify(datos));
      alert("Mapa cargado desde archivo.");
    };
    lector.readAsText(archivo);
  };

  // Borrar todos los iconos
  window.borrarMapa = function() {
    if (!confirm("¿Seguro que quieres borrar todos los iconos del mapa?")) return;
    limpiarMapa();
    localStorage.removeItem("iconosMapa");
  };

  function limpiarMapa() {
    mapa.querySelectorAll(".icono-mapa").forEach(icono => icono.remove());
  }

  function crearIcono(icono, x, y) {
    const nuevoIcono = document.createElement("img");
    nuevoIcono.src = `assets/iconos/${icono}.svg`;
    nuevoIcono.classList.add("icono-mapa");
    nuevoIcono.style.left = x;
    nuevoIcono.style.top = y;
    nuevoIcono.dataset.icono = icono;
    mapa.appendChild(nuevoIcono);
  }
});