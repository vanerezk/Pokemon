//! Volumen musica del HTML
let vid = document.getElementById("myMusic");
vid.volume = 0.05;

//! Evento del boton de busqueda con ENTER

document.getElementById("nombre").addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        document.getElementById("buscar").click();
    }
});

document.getElementById("buscar").addEventListener("click", async () => {

    const cards = document.querySelectorAll("body div.card");

    cards.forEach(card => {
        card.remove();
    });

    const notfound = document.querySelectorAll("h3");

    notfound.forEach(notfound => {
        notfound.remove();
    });

    let nombrePokemon = document.getElementById("nombre");
    let valor = nombrePokemon.value.toLowerCase();

    await buscarPokemon(valor);

    await buscarUrl(valor);

    await agregarFicha(valor);

});

const buscarPokemon = async (valor) => {
    const response = await fetch("./pokemon.json");
    const data = await response.json();
    let resultados = data.results.filter(pokemon => pokemon.name.includes(valor));

    if (resultados.length === 0 || resultados.length === 1126) {
        const h3 = document.createElement("h3")
        h3.classList.add("notfound");
        h3.textContent = `El nombre de este pokemon no existe`;
        document.body.appendChild(h3);
        return;
    }

    for (let i = 0; i <= resultados.length; i++) {
        let url = resultados[i].url;
        let dataDos = resultados[i].name;
        await agregarFicha(dataDos);
    }
};

// Función para buscar la url de cada pokemon de la API
const buscarUrl = async (valor) => {
    const responseUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`);
    const dataDos = await responseUrl.json();
    return dataDos;
}

// funcion para agregar la ficha de cada pokemon a la pagina
const agregarFicha = async (valor) => {
    console.log('Valor:', valor);
    const ficha = document.createElement("div");
    const dataDosObj = await buscarUrl(valor);
    console.log(dataDosObj);
}