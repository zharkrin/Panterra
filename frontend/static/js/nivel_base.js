// nivel_base.js

document.addEventListener("DOMContentLoaded", function () {
    const mapa = document.getElementById("mapa");
    const filas = 10;
    const columnas = 10;
    const tileSize = 128; // Tamaño base (puedes escalar más tarde)

    const biomasDisponibles = [
        "bioma-caverna",
        "bioma-cristal",
        "bioma-lava",
        "bioma-setas",
        "bioma-ruinas",
        "bioma-lago-subterraneo"
    ];

    // Crear tiles isométricos
    for (let fila = 0; fila < filas; fila++) {
        for (let col = 0; col < columnas; col++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");

            // Posición isométrica
            const left = (col - fila) * (tileSize / 2);
            const top = (col + fila) * (tileSize / 4);

            tile.style.left = `${left}px`;
            tile.style.top = `${top}px`;

            // Asignar bioma aleatorio
            const bioma = biomasDisponibles[Math.floor(Math.random() * biomasDisponibles.length)];
            tile.classList.add(bioma);

            // Información flotante
            tile.title = bioma.replace("bioma-", "").replace("-", " ");

            mapa.appendChild(tile);
        }
    }
});
