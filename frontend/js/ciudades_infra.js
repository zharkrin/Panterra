function iniciarCiudadesInfra(nivel) {
  const mapa = document.getElementById("mapa");
  const btnAgregar = document.getElementById("boton-agregar");
  const btnBorrar = document.getElementById("boton-borrar");

  let contador = 0;
  const iconoSrc = "../assets/iconos/ciudad_infraoscuridad.png";
  const storageKey = `ciudades_infra_${nivel}`;

  // Cargar ciudades guardadas
  const guardadas = JSON.parse(localStorage.getItem(storageKey) || "[]");
  guardadas.forEach((ciudad) => crearIcono(ciudad.x, ciudad.y));

  btnAgregar.addEventListener("click", () => {
    const x = Math.random() * (window.innerWidth - 40);
    const y = Math.random() * (window.innerHeight - 40);
    crearIcono(x, y);
    guardar();
  });

  btnBorrar.addEventListener("click", () => {
    if (confirm("¿Borrar todas las ciudades de este nivel?")) {
      localStorage.removeItem(storageKey);
      document.querySelectorAll(".icono").forEach((i) => i.remove());
    }
  });

  function crearIcono(x, y) {
    const icono = document.createElement("img");
    icono.src = iconoSrc;
    icono.className = "icono";
    icono.style.left = x + "px";
    icono.style.top = y + "px";
    icono.draggable = false;

    let offsetX, offsetY;
    icono.addEventListener("mousedown", (e) => {
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      function mover(ev) {
        icono.style.left = ev.pageX - offsetX + "px";
        icono.style.top = ev.pageY - offsetY + "px";
      }
      function soltar() {
        document.removeEventListener("mousemove", mover);
        document.removeEventListener("mouseup", soltar);
        guardar();
      }
      document.addEventListener("mousemove", mover);
      document.addEventListener("mouseup", soltar);
    });

    mapa.appendChild(icono);
  }

  function guardar() {
    const datos = [];
    document.querySelectorAll(".icono").forEach((icono) => {
      datos.push({
        x: parseFloat(icono.style.left),
        y: parseFloat(icono.style.top),
      });
    });
    localStorage.setItem(storageKey, JSON.stringify(datos));
  }
}