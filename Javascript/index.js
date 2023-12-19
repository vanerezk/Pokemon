//? Volumen musica
let vid = document.getElementById("myMusic");
vid.volume = 0.1;

//? Evento en los botones enter y click

document.getElementById("nombre").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("buscar").click();
  }
});

document.getElementById("buscar").addEventListener("click", async () => {
  const cards = document.querySelectorAll("body div.card");

  cards.forEach((card) => {
    card.remove();
  });

  const notfound = document.querySelectorAll("h3");

  notfound.forEach((notfound) => {
    notfound.remove();
  });

  let nombrePokemon = document.getElementById("nombre");
  let valor = nombrePokemon.value.toLowerCase();

  await buscarPokemon(valor);

  nombrePokemon.value = "";
});

const buscarPokemon = async (valor) => {
  if (valor.trim() === "") {
    return;
  }

  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1126");

  const data = await response.json();

  let resultados = data.results.filter(
    (pokemon) =>
      pokemon.name.includes(valor.toLowerCase()) ||
      pokemon.url.includes(`/${valor}/`)
  );

  if (resultados.length === 0) {
    const h3 = document.createElement("h3");
    h3.classList.add("notfound");
    h3.textContent = `No se ha encontrado ningún pokémon`;
    document.body.appendChild(h3);
    return;
  }

  for (let i = 0; i < resultados.length; i++) {
    await agregarFicha(resultados[i]);
  }
};

const buscarUrl = async (url) => {
  const responseUrl = await fetch(url);
  const datosPokemon = await responseUrl.json();
  return datosPokemon;
};

const agregarFicha = async (valor) => {
  const datosPokemon = await buscarUrl(valor.url);
  const ficha = document.createElement("div");

  const crearElemento = (tag, clase, contenido) => {
    const elemento = document.createElement(tag);
    if (clase) elemento.classList.add(clase);
    if (contenido) elemento.innerHTML = contenido;
    return elemento;
  };

  const typeColors = {
    electric: "#FFEA70",
    normal: "#B09398",
    fire: "#FF675C",
    water: "#0596C7",
    ice: "#AFEAFD",
    rock: "#999799",
    flying: "#7AE7C7",
    grass: "#4A9681",
    psychic: "#FFC6D9",
    ghost: "#561D25",
    bug: "#A2FAA3",
    poison: "#795663",
    ground: "#D2B074",
    dragon: "#DA627D",
    steel: "#1D8A99",
    fighting: "#2F2F2F",
    default: "#2A1A1",
  };

  const idPokemon = crearElemento("h2", "id", datosPokemon.id);
  const nombre = crearElemento("h2", "nombre", datosPokemon.name);
  const altura = crearElemento("p", "altura", datosPokemon.height / 10);
  const peso = crearElemento("p", "peso", datosPokemon.weight / 10);
  const hP = crearElemento("p", "vida", datosPokemon.stats[0].base_stat);
  const aP = crearElemento("p", "ataque", datosPokemon.stats[1].base_stat);
  const aD = crearElemento("p", "defensa", datosPokemon.stats[3].base_stat);
  const speed = crearElemento(
    "p",
    "velocidad",
    datosPokemon.stats[5].base_stat
  );
  const tipo =
    datosPokemon.types.length === 1
      ? crearElemento("p", "tipo", datosPokemon.types[0].type.name)
      : crearElemento(
          "p",
          "tipo",
          datosPokemon.types[0].type.name +
            " & " +
            datosPokemon.types[1].type.name
        );

  tipo.style.backgroundColor =
    typeColors[
      datosPokemon.types[0].type.name || datosPokemon.types[1].type.name
    ];

  const imagen = crearElemento("img", null, null);
  if (
    (imagen.src =
      datosPokemon.sprites.front_default &&
      datosPokemon.sprites.front_default !== null)
  ) {
    imagen.src = datosPokemon.sprites.front_default;
    imagen.alt = "Parte frontal";
    imagen.addEventListener("mouseover", () => {
      imagen.src = datosPokemon.sprites.front_shiny;
    });
    imagen.addEventListener("mouseout", () => {
      imagen.src = datosPokemon.sprites.front_default;
    });
  } else {
    imagen.setAttribute("style", "display: none");
  }

  const imagenBack = crearElemento("img", null, null);
  if (
    (imagenBack.src =
      datosPokemon.sprites.back_default &&
      datosPokemon.sprites.back_default !== null)
  ) {
    imagenBack.src = datosPokemon.sprites.back_default;
    imagen.alt = "Parte trasera";
    imagenBack.addEventListener("mouseover", () => {
      imagenBack.src = datosPokemon.sprites.back_shiny;
    });
    imagenBack.addEventListener("mouseout", () => {
      imagenBack.src = datosPokemon.sprites.back_default;
    });
  } else {
    imagenBack.setAttribute("style", "display: none");
  }

  const parentSection = document.querySelector(".parent");
  parentSection.appendChild(ficha);

  ficha.classList.add("card");
  ficha.appendChild(nombre);
  ficha.appendChild(idPokemon);
  ficha.appendChild(altura);
  ficha.appendChild(peso);
  ficha.appendChild(hP);
  ficha.appendChild(aP);
  ficha.appendChild(aD);
  ficha.appendChild(speed);
  ficha.appendChild(tipo);
  ficha.appendChild(imagen);
  ficha.appendChild(imagenBack);
};
