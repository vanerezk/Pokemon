let vid = document.getElementById("myMusic");
vid.volume = 0.1;

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

  await buscarUrl(valor);

  await agregarFicha(valor);
});

const buscarPokemon = async (valor) => {
  const response = await fetch("./pokemon.json");
  const data = await response.json();
  let resultados = data.results.filter((pokemon) =>
    pokemon.name.includes(valor)
  );

  if (resultados.length === 0 || resultados.length === 1126) {
    const h3 = document.createElement("h3");
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

const buscarUrl = async (valor) => {
  const responseUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`);
  const dataDos = await responseUrl.json();
  return dataDos;
};

const agregarFicha = async (valor) => {
  console.log("Valor:", valor);
  const ficha = document.createElement("div");
  const dataDosObj = await buscarUrl(valor);
  console.log(dataDosObj);

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

  const nombre = crearElemento("h2", "nombre", dataDosObj.name);
  const altura = crearElemento("p", "altura", dataDosObj.height / 10);
  const peso = crearElemento("p", "peso", dataDosObj.weight / 10);
  const hP = crearElemento("p", "vida", dataDosObj.stats[0].base_stat);
  const aP = crearElemento("p", "ataque", dataDosObj.stats[1].base_stat);
  const aD = crearElemento("p", "defensa", dataDosObj.stats[3].base_stat);
  const speed = crearElemento("p", "velocidad", dataDosObj.stats[5].base_stat);

  const tipo =
    dataDosObj.types.length === 1
      ? crearElemento("p", "tipo", dataDosObj.types[0].type.name)
      : crearElemento(
          "p",
          "tipo",
          dataDosObj.types[0].type.name + " & " + dataDosObj.types[1].type.name
        );
  tipo.style.backgroundColor =
    typeColors[dataDosObj.types[0].type.name || dataDosObj.types[1].type.name];

  const imagen = crearElemento("img", null, null);
  if (
    (imagen.src =
      dataDosObj.sprites.front_default &&
      dataDosObj.sprites.front_default !== null)
  ) {
    imagen.src = dataDosObj.sprites.front_default;
  } else {
    imagen.setAttribute("style", "display: none");
  }
  const imagenBack = crearElemento("img", null, null);
  if (
    (imagenBack.src =
      dataDosObj.sprites.back_default &&
      dataDosObj.sprites.back_default !== null)
  ) {
    imagenBack.src = dataDosObj.sprites.back_default;
  } else {
    imagenBack.setAttribute("style", "display: none");
  }
  const imagenShiny = crearElemento("img", null, null);
  if (
    (imagenShiny.src =
      dataDosObj.sprites.front_shiny && dataDosObj.sprites.front_shiny !== null)
  ) {
    imagenShiny.src = dataDosObj.sprites.front_shiny;
  } else {
    imagenShiny.setAttribute("style", "display: none");
  }
  const imagenShinyBack = crearElemento("img", null, null);
  if (
    (imagenShinyBack.src =
      dataDosObj.sprites.back_shiny && dataDosObj.sprites.back_shiny !== null)
  ) {
    imagenShinyBack.src = dataDosObj.sprites.back_shiny;
  } else {
    imagenShinyBack.setAttribute("style", "display: none");
  }
  document.body.insertBefore(ficha, document.body.lastElementChild);

  ficha.classList.add("card");

  ficha.appendChild(nombre);
  ficha.appendChild(altura);
  ficha.appendChild(peso);
  ficha.appendChild(hP);
  ficha.appendChild(aP);
  ficha.appendChild(aD);
  ficha.appendChild(speed);
  ficha.appendChild(tipo);
  ficha.appendChild(imagen);
  ficha.appendChild(imagenBack);
  ficha.appendChild(imagenShiny);
  ficha.appendChild(imagenShinyBack);
};
