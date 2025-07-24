// localStorageMapa.js
document.addEventListener("DOMContentLoaded", () => {
  cargarIconosGuardados();
});

// Guardar mapa en localStorage
function guardarMapa() {
  const contenedor = document.getElementById("mapa-container");
  const iconos = contenedor.querySelectorAll(".icono-mapa");

  let datos = [];
  iconos.forEach(icono => {
    datos.push({
      tipo: icono.dataset.icono,
      x: icono.style.left,
      y: icono.style.top
    });
  });

  localStorage.setItem("iconosMapa", JSON.stringify(datos));
  alert("Mapa guardado correctamente.");
}

// Cargar mapa desde archivo o localStorage
function cargarMapa() {
  const input = document.getElementById("cargarMapaInput");
  if (input.files.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const datos = JSON.parse(e.target.result);
      restaurarIconos(datos);
    };
    reader.readAsText(input.files[0]);
  } else {
    cargarIconosGuardados();
  }
}

function cargarIconosGuardados() {
  const datos = localStorage.getItem("iconosMapa");
  if (datos) {
    restaurarIconos(JSON.parse(datos));
  }
}

// Restaurar iconos en el mapa
function restaurarIconos(datos) {
  const contenedor = document.getElementById("mapa-container");
  contenedor.innerHTML = ""; // Limpiar el contenedor

  datos.forEach(item => {
    const nuevoIcono = document.createElement("img");
    nuevoIcono.src = `assets/iconos/${item.tipo}.svg`;
    nuevoIcono.classList.add("icono-mapa");
    nuevoIcono.dataset.icono = item.tipo;
    nuevoIcono.style.left = item.x;
    nuevoIcono.style.top = item.y;
    hacerArrastrable(nuevoIcono);
    contenedor.appendChild(nuevoIcono);
  });
}

// Borrar mapa (con confirmación)
function borrarMapa() {
  if (!confirm("¿Seguro que quieres borrar todos los iconos del mapa?")) return;

  const contenedor = document.getElementById("mapa-container");
  contenedor.innerHTML = "";
  localStorage.removeItem("iconosMapa");
  alert("Mapa borrado.");
}