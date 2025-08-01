function iniciarRiosInfra(nivel) {
  const mapa = document.getElementById("mapa");
  const btnAgregar = document.getElementById("btn-agregar-rio");
  const btnBorrar = document.getElementById("btn-borrar-rios");

  const storageKey = `rios_infra_${nivel}`;

  // Crear contenedor SVG sobre el mapa
  let svg = document.getElementById("svg-rios");
  if (!svg) {
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "svg-rios");
    svg.style.position = "absolute";
    svg.style.top = 0;
    svg.style.left = 0;
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.pointerEvents = "none"; // para que no interfiera con drag iconos
    mapa.appendChild(svg);
  }

  let rios = [];

  // Cargar rios guardados
  const guardados = JSON.parse(localStorage.getItem(storageKey) || "[]");
  guardados.forEach((rioData) => {
    const rio = crearRio(rioData.puntos);
    rios.push(rio);
  });

  btnAgregar.addEventListener("click", () => {
    const ancho = mapa.clientWidth;
    const alto = mapa.clientHeight;
    // Crear río con 3 puntos aleatorios iniciales
    const puntos = [
      { x: ancho * 0.1, y: alto * 0.3 },
      { x: ancho * 0.3, y: alto * 0.5 },
      { x: ancho * 0.6, y: alto * 0.4 },
    ];
    const rio = crearRio(puntos);
    rios.push(rio);
    guardar();
  });

  btnBorrar.addEventListener("click", () => {
    if (confirm("¿Borrar todos los ríos de este nivel?")) {
      rios.forEach((rio) => rio.eliminar());
      rios = [];
      localStorage.removeItem(storageKey);
    }
  });

  function crearRio(puntos) {
    const grupo = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svg.appendChild(grupo);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "rgba(0, 50, 150, 0.7)");
    path.setAttribute("stroke-width", "4");
    path.setAttribute("fill", "none");
    path.style.pointerEvents = "stroke"; // para capturar eventos en el trazo
    grupo.appendChild(path);

    // Crear circulos de control para cada punto
    const controles = puntos.map((p, i) => {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", p.x);
      c.setAttribute("cy", p.y);
      c.setAttribute("r", 8);
      c.setAttribute("fill", "rgba(0, 100, 255, 0.6)");
      c.setAttribute("stroke", "#0055cc");
      c.setAttribute("stroke-width", 2);
      c.style.cursor = "pointer";
      c.style.pointerEvents = "all";
      grupo.appendChild(c);

      // Dragging
      let offsetX, offsetY;
      c.addEventListener("mousedown", (e) => {
        e.preventDefault();
        offsetX = e.clientX - p.x;
        offsetY = e.clientY - p.y;

        function mover(ev) {
          p.x = ev.clientX - offsetX;
          p.y = ev.clientY - offsetY;
          c.setAttribute("cx", p.x);
          c.setAttribute("cy", p.y);
          actualizarPath();
        }
        function soltar() {
          document.removeEventListener("mousemove", mover);
          document.removeEventListener("mouseup", soltar);
          guardar();
        }
        document.addEventListener("mousemove", mover);
        document.addEventListener("mouseup", soltar);
      });

      return c;
    });

    function actualizarPath() {
      const d = puntos.map((pt, i) => (i === 0 ? "M" : "L") + pt.x + " " + pt.y).join(" ");
      path.setAttribute("d", d);
    }

    actualizarPath();

    return {
      grupo,
      puntos,
      controles,
      eliminar() {
        grupo.remove();
      },
    };
  }

  function guardar() {
    const datos = rios.map((rio) => ({
      puntos: rio.puntos.map((p) => ({ x: p.x, y: p.y })),
    }));
    localStorage.setItem(storageKey, JSON.stringify(datos));
  }
}