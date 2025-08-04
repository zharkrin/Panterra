// static/js/ciudades.js

let ciudades = [];

function crearCiudad(x, y, nombre = "Nueva Ciudad", descripcion = "", tipo = "ciudad") {
  const ciudad = { id: Date.now(), x, y, nombre, descripcion, tipo };
  ciudades.push(ciudad);
  guardarCiudades();
  renderCiudad(ciudad);
}

function renderCiudad(ciudad) {
  const contenedor = document.getElementById("mapa");

  const icono = document.createElement("div");
  icono.className = "ciudad";
  icono.style.left = ciudad.x + "px";
  icono.style.top = ciudad.y + "px";
  icono.setAttribute("data-id", ciudad.id);

  const img = document.createElement("img");
  img.src = "/static/iconos/ciudad.png";
  img.alt = ciudad.nombre;
  icono.appendChild(img);

  const etiqueta = document.createElement("div");
  etiqueta.className = "etiqueta";
  etiqueta.innerText = ciudad.nombre;
  icono.appendChild(etiqueta);

  icono.addEventListener("dblclick", () => editarCiudad(ciudad.id));
  hacerArrastrable(icono);
  contenedor.appendChild(icono);
}

function hacerArrastrable(el) {
  el.onmousedown = function (e) {
    let shiftX = e.clientX - el.getBoundingClientRect().left;
    let shiftY = e.clientY - el.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      el.style.left = pageX - shiftX + 'px';
      el.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    el.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      el.onmouseup = null;

      const id = el.getAttribute("data-id");
      const ciudad = ciudades.find(c => c.id == id);
      ciudad.x = parseInt(el.style.left);
      ciudad.y = parseInt(el.style.top);
      guardarCiudades();
    };
  };

  el.ondragstart = () => false;
}

function editarCiudad(id) {
  const ciudad = ciudades.find(c => c.id == id);
  const nuevoNombre = prompt("Nombre:", ciudad.nombre);
  if (nuevoNombre !== null) ciudad.nombre = nuevoNombre;

  const nuevaDesc = prompt("Descripción:", ciudad.descripcion);
  if (nuevaDesc !== null) ciudad.descripcion = nuevaDesc;

  guardarCiudades();
  recargarCiudades();
}

function guardarCiudades() {
  localStorage.setItem("ciudades_infra", JSON.stringify(ciudades));
}

function cargarCiudades() {
  const datos = localStorage.getItem("ciudades_infra");
  if (datos) {
    ciudades = JSON.parse(datos);
    recargarCiudades();
  }
}

function recargarCiudades() {
  document.querySelectorAll(".ciudad").forEach(e => e.remove());
  ciudades.forEach(renderCiudad);
}

function inicializarCiudades() {
  cargarCiudades();

  document.getElementById("mapa").addEventListener("click", (e) => {
    if (e.target.id === "mapa") {
      const x = e.offsetX;
      const y = e.offsetY;
      crearCiudad(x, y);
    }
  });
}

document.addEventListener("DOMContentLoaded", inicializarCiudades);
