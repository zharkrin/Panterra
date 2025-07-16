document.addEventListener("DOMContentLoaded", () => {
  const mapaNacion = document.getElementById("mapa-nacion");

  mapaNacion.addEventListener("click", (e) => {
    const modo = localStorage.getItem("modoMarcador");
    const icono = localStorage.getItem("iconoSeleccionado");

    if (modo === "colocar" && icono) {
      const marcador = document.createElement("img");
      marcador.src = `../assets/iconos/${icono}.svg`;
      marcador.className = "icono-mapa";
      marcador.style.left = `${e.offsetX - 16}px`;
      marcador.style.top = `${e.offsetY - 16}px`;

      marcador.addEventListener("dblclick", () => {
        const confirmar = confirm("¿Deseas eliminar este marcador?");
        if (confirmar) marcador.remove();
      });

      mapaNacion.appendChild(marcador);
    }
  });

  const botones = document.querySelectorAll(".boton-marcador");
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const icono = boton.getAttribute("data-icono");
      localStorage.setItem("modoMarcador", "colocar");
      localStorage.setItem("iconoSeleccionado", icono);
    });
  });
});