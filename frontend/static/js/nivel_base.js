// frontend/static/js/nivel_base.js

document.addEventListener("DOMContentLoaded", () => {
    const mapa = document.getElementById("mapa");
    const tilesX = 10;
    const tilesY = 10;

    const biomas = [
        "bioma-caverna",
        "bioma-cristal",
        "bioma-lava",
        "bioma-setas",
        "bioma-ruinas",
        "bioma-lago-subterraneo"
    ];

    // Renderizar biomas
    for (let y = 0; y < tilesY; y++) {
        for (let x = 0; x < tilesX; x++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            const tipo = biomas[Math.floor(Math.random() * biomas.length)];
            tile.classList.add(tipo);
            tile.style.left = `${x * 96}px`;
            tile.style.top = `${y * 48}px`;
            tile.title = tipo.replace("bioma-", "").replace(/-/g, " ");
            mapa.appendChild(tile);
        }
    }

    // Añadir ciudades desde localStorage
    const ciudades = JSON.parse(localStorage.getItem("ciudades") || "[]");
    ciudades.forEach(c => renderCiudad(c));

    // Click para crear nueva ciudad
    mapa.addEventListener("dblclick", e => {
        const rect = mapa.getBoundingClientRect();
        const nueva = {
            id: Date.now(),
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            nombre: "Nueva Ciudad",
            descripcion: "",
            tipo: "Refugio",
            tamano: "Pequeña"
        };
        renderCiudad(nueva);
        guardarCiudad(nueva);
        mostrarPanel(nueva);
    });
});

function renderCiudad(ciudad) {
    const mapa = document.getElementById("mapa");
    const el = document.createElement("div");
    el.className = "ciudad";
    el.style.left = ciudad.x + "px";
    el.style.top = ciudad.y + "px";
    el.textContent = ciudad.nombre;
    el.onclick = () => mostrarPanel(ciudad);
    mapa.appendChild(el);
}

function mostrarPanel(ciudad) {
    let panel = document.getElementById("panelCiudad");
    if (!panel) {
        panel = document.createElement("div");
        panel.id = "panelCiudad";
        panel.innerHTML = `
            <label>Nombre: <input id="nombreCiudad"></label><br>
            <label>Descripción: <textarea id="descCiudad"></textarea></label><br>
            <label>Tipo:
                <select id="tipoCiudad">
                    <option>Refugio</option>
                    <option>Fortaleza</option>
                    <option>Enclave</option>
                    <option>Santuario</option>
                </select>
            </label><br>
            <label>Tamaño:
                <select id="tamanoCiudad">
                    <option>Pequeña</option>
                    <option>Media</option>
                    <option>Grande</option>
                </select>
            </label><br>
            <button onclick="guardarCambios()">Guardar</button>
            <button onclick="cerrarPanel()">Cerrar</button>
        `;
        document.body.appendChild(panel);
    }

    panel.dataset.id = ciudad.id;
    document.getElementById("nombreCiudad").value = ciudad.nombre;
    document.getElementById("descCiudad").value = ciudad.descripcion;
    document.getElementById("tipoCiudad").value = ciudad.tipo;
    document.getElementById("tamanoCiudad").value = ciudad.tamano;
    panel.style.display = "block";
}

function cerrarPanel() {
    const panel = document.getElementById("panelCiudad");
    if (panel) panel.style.display = "none";
}

function guardarCiudad(ciudad) {
    const ciudades = JSON.parse(localStorage.getItem("ciudades") || "[]");
    ciudades.push(ciudad);
    localStorage.setItem("ciudades", JSON.stringify(ciudades));
}

function guardarCambios() {
    const panel = document.getElementById("panelCiudad");
    const id = parseInt(panel.dataset.id);
    let ciudades = JSON.parse(localStorage.getItem("ciudades") || "[]");
    const index = ciudades.findIndex(c => c.id === id);
    if (index >= 0) {
        ciudades[index].nombre = document.getElementById("nombreCiudad").value;
        ciudades[index].descripcion = document.getElementById("descCiudad").value;
        ciudades[index].tipo = document.getElementById("tipoCiudad").value;
        ciudades[index].tamano = document.getElementById("tamanoCiudad").value;
        localStorage.setItem("ciudades", JSON.stringify(ciudades));
        location.reload(); // Refrescar para aplicar cambios
    }
}