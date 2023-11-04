//! Volumen musica del HTML
let vid = document.getElementById("myMusic");
vid.volume = 0.05;

//! Evento del boton de busqueda con ENTER

document.getElementById("nombre").addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        document.getElementById("buscar").click();
    }
});

