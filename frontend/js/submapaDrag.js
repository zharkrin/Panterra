document.addEventListener("DOMContentLoaded", () => {
  const iconos = document.querySelectorAll(".icono-mapa");

  iconos.forEach(icono => {
    icono.addEventListener("mousedown", iniciarArrastre);
  });

  function iniciarArrastre(e) {
    e.preventDefault();
    const icono = e.target;
    let offsetX = e.clientX - icono.getBoundingClientRect().left;
    let offsetY = e.clientY - icono.getBoundingClientRect().top;

    function moverIcono(ev) {
      ev.preventDefault();
      icono.style.left = (ev.clientX - offsetX) + "px";
      icono.style.top = (ev.clientY - offsetY) + "px";
    }

    function soltarIcono() {
      document.removeEventListener("mousemove", moverIcono);
      document.removeEventListener("mouseup", soltarIcono);
    }

    document.addEventListener("mousemove", moverIcono);
    document.addEventListener("mouseup", soltarIcono);
  }
});