// --- localStorageMapa.js ---
// Guarda, carga y borra iconos en el mapa

function guardarMapa() {
  const contenedor = document.getElementById("mapa-container");
  const iconos = contenedor.querySelectorAll(".icono-mapa");

  const datos = [];
  iconos.forEach(icono => {
    datos.push({
      tipo: icono.dataset.icono,
      x: icono.style.left,
      y: icono.style.top
    });
  });

  // Guardar en localStorage
  localStorage.setItem("iconosMapa", JSON.stringify(datos));

  // Descargar como archivo JSON
  const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "mapa_guardado.json";
  link.click();

  alert("Mapa guardado correctamente.");
}

function cargarMapa() {
  const input = document.getElementById("cargarMapaInput");
  if (!input.files.length) return;

  const archivo = input.files[0];
  const lector = new FileReader();

  lector.onload = function(e) {
    try {
      const datos = JSON.parse(e.target.result);
      restaurarMapa(datos);
      alert("Mapa cargado correctamente.");
    } catch (error) {
      alert("Error al cargar el archivo. Asegúrate de que es un JSON válido.");
    }
  };

  lector.readAsText(archivo);
}

function borrarMapa() {
  if (!confirm("¿Seguro que quieres borrar todos los iconos del mapa?")) return;

  const contenedor = document.getElementById("mapa-container");
  const iconos = contenedor.querySelectorAll(".icono-mapa");

  iconos.forEach(icono => contenedor.removeChild(icono));

  localStorage.removeItem("iconosMapa");
  alert("Todos los iconos han sido eliminados.");
}

function restaurarMapa(datos) {
  const contenedor = document.getElementById("mapa-container");
  contenedor.innerHTML = "";

  datos.forEach(icono => {
    const img = document.createElement("img");
    img.src = `../assets/iconos/${icono.tipo}.svg`;
    img.className = "icono-mapa";
    img.dataset.icono = icono.tipo;
    img.style.left = icono.x;
    img.style.top = icono.y;

    // Permitir arrastrar nuevamente
    img.addEventListener("mousedown", iniciarDrag);
    contenedor.appendChild(img);
  });
}

// Restaurar mapa desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const datosGuardados = localStorage.getItem("iconosMapa");
  if (datosGuardados) {
    restaurarMapa(JSON.parse(datosGuardados));
  }
});