// localStorageMapa.js
// Gestiona guardar, cargar y borrar los iconos en el mapa usando localStorage.

document.addEventListener("DOMContentLoaded", () => {
  cargarIconosGuardados();
});

function guardarMapa() {
  const contenedor = document.getElementById("mapa-container");
  const iconos = contenedor.querySelectorAll(".icono-mapa");

  const iconosData = [];
  iconos.forEach(icono => {
    iconosData.push({
      tipo: icono.dataset.icono,
      x: icono.style.left,
      y: icono.style.top
    });
  });

  localStorage.setItem("iconosMapa", JSON.stringify(iconosData));
  alert("Mapa guardado correctamente en el navegador.");
}

function cargarMapa() {
  const fileInput = document.getElementById("cargarMapaInput");
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = JSON.parse(e.target.result);
    restaurarIconos(data);
    alert("Mapa cargado desde archivo.");
  };
  reader.readAsText(file);
}

function borrarMapa() {
  if (!confirm("¿Seguro que quieres borrar todos los iconos del mapa?")) return;

  const contenedor = document.getElementById("mapa-container");
  const iconos = contenedor.querySelectorAll(".icono-mapa");

  iconos.forEach(icono => contenedor.removeChild(icono));

  localStorage.removeItem("iconosMapa");
  alert("Mapa borrado.");
}

function cargarIconosGuardados() {
  const data = localStorage.getItem("iconosMapa");
  if (data) {
    restaurarIconos(JSON.parse(data));
  }
}

function restaurarIconos(data) {
  const contenedor = document.getElementById("mapa-container");
  contenedor.querySelectorAll(".icono-mapa").forEach(icono => contenedor.removeChild(icono));

  data.forEach(item => {
    const img = document.createElement("img");
    img.src = `../assets/iconos/${item.tipo}.svg`;
    img.classList.add("icono-mapa");
    img.dataset.icono = item.tipo;
    img.style.left = item.x;
    img.style.top = item.y;
    contenedor.appendChild(img);
    hacerArrastrable(img);
  });
}
