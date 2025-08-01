function iniciarCiudadesInfra(nivel) {
  const mapa = document.getElementById("mapa");
  const btnAgregar = document.getElementById("boton-agregar");
  const btnBorrar = document.getElementById("boton-borrar");

  const iconoSrc = "../assets/iconos/ciudad_infraoscuridad.png";
  const storageKey = `ciudades_infra_${nivel}`;

  let contador = 1;

  // Cargar ciudades guardadas
  const guardadas = JSON.parse(localStorage.getItem(storageKey) || "[]");
  guardadas.forEach((ciudad) => {
    crearIcono(ciudad.x, ciudad.y, ciudad.nombre);
  });

  btnAgregar.addEventListener("click", () => {
    const x = Math.random() * (window.innerWidth - 40);
    const y = Math.random() * (window.innerHeight - 40);
    crearIcono(x, y, `Ciudad ${contador++}`);
    guardar();
  });

  btnBorrar.addEventListener("click", () => {
    if (confirm("¿Borrar todas las ciudades de este nivel?")) {
      localStorage.removeItem(storageKey);
      document.querySelectorAll(".ciudad-wrapper").forEach((i) => i.remove());
      contador = 1;
    }
  });

  function crearIcono(x, y, nombre = `Ciudad ${contador++}`) {
    const wrapper = document.createElement("div");
    wrapper.className = "ciudad-wrapper";
    wrapper.style.position = "absolute";
    wrapper.style.left = x + "px";
    wrapper.style.top = y + "px";
    wrapper.style.cursor = "grab";
    wrapper.style.zIndex = 10;

    const img = document.createElement("img");
    img.src = iconoSrc;
    img.className = "icono";
    img.style.width = "40px";
    img.style.height = "40px";
    img.draggable = false;

    const label = document.createElement("div");
    label.className = "ciudad-label";
    label.contentEditable = true;
    label.innerText = nombre;
    label.style.position = "absolute";
    label.style.top = "-20px";
    label.style.left = "50%";
    label.style.transform = "translateX(-50%)";
    label.style.color = "#fff";
    label.style.font = "12px sans-serif";
    label.style.textAlign = "center";
    label.style.background = "rgba(0, 0, 0, 0.5)";
    label.style.padding = "1px 4px";
    label.style.borderRadius = "4px";
    label.style.userSelect = "text";

    wrapper.appendChild(label);
    wrapper.appendChild(img);
    mapa.appendChild(wrapper);

    // Drag
    let offsetX, offsetY;
    img.addEventListener("mousedown", (e) => {
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      function mover(ev) {
        wrapper.style.left = ev.pageX - offsetX + "px";
        wrapper.style.top = ev.pageY - offsetY + "px";
      }
      function soltar() {
        document.removeEventListener("mousemove", mover);
        document.removeEventListener("mouseup", soltar);
        guardar();
      }
      document.addEventListener("mousemove", mover);
      document.addEventListener("mouseup", soltar);
    });

    // Guardar al editar nombre
    label.addEventListener("input", guardar);
  }

  function guardar() {
    const datos = [];
    document.querySelectorAll(".ciudad-wrapper").forEach((wrapper) => {
      const x = parseFloat(wrapper.style.left);
      const y = parseFloat(wrapper.style.top);
      const nombre = wrapper.querySelector(".ciudad-label").innerText.trim();
      datos.push({ x, y, nombre });
    });
    localStorage.setItem(storageKey, JSON.stringify(datos));
  }
}