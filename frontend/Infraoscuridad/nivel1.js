window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("mapa-infraoscuridad");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 600;

    // Fondo inicial (oscuro)
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ejemplo de biomas subterráneos
    const biomas = [
        { color: "#4e342e", nombre: "Caverna Rocosa" },
        { color: "#2e7d32", nombre: "Bosque Fúngico" },
        { color: "#6d4c41", nombre: "Minas Abandonadas" }
    ];

    // Dibujamos zonas de ejemplo
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = biomas[i].color;
        ctx.beginPath();
        ctx.arc(200 + i * 200, 300, 100, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "14px Arial";
        ctx.fillText(biomas[i].nombre, 160 + i * 200, 300);
    }

    // Botón volver
    document.getElementById("volver").addEventListener("click", () => {
        window.location.href = "/";
    });
});
