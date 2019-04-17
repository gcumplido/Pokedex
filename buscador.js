var infoPokemon = "";
const busqueda = document.querySelector("#formPokemon");
const busquedaPokemon = document.querySelector("#busquedaPokemon");
const mostrarInfo = document.querySelector("#muestraInfo");
const imgPokemon = document.querySelector("#imgPokemon");
const nombrePokemon = document.querySelector("#nombrePokemon");
const descripcion = document.querySelector("#descripcionPokemon");
var desPokemon = "";
var b = 0;
const felizPokemon = document.querySelector("#felizPokemon");
const capturaPokemon = document.querySelector("#capturaPokemon");
const eclosionPokemon = document.querySelector("#ecloPokemon");
const evoliconPokemon = document.querySelector("#evolucionPokemon");
const habitadPokemon = document.querySelector("#habitatPokemon");
const formaPokemon = document.querySelector("#formaPokemon");
const indexPokemon = document.querySelector("#indexPokemon");


// Dispara la peticion
busqueda.addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (busquedaPokemon.value == ""){
        snackbar("Ingresa un Pokemon");
        mostrarInfo.style.display = 'none';
    } else {
        pedirAPI(busquedaPokemon.value.toLowerCase());
    }
    busqueda.reset();
});

// Preticion fetch
function pedirAPI(nombre) {
    fetch("https://pokeapi.co/api/v2/pokemon-species/" + nombre)
        .then(function (respuesta) {
            if (respuesta.status == 200) {
                respuesta.json()
                    .then(function (pokemon) {
                        infoPokemon = pokemon;
                        recibidalaRespuesta()
                    })
            } else {
                mostrarInfo.style.display = 'none';
                snackbar("Pokemon no encotrado");
            }
        });
}

// Accion despues de recibir la respuesta
function recibidalaRespuesta() {
    imgPokemon.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + infoPokemon.id + ".png";
    nombrePokemon.innerHTML = infoPokemon.name.toUpperCase();
    desPokemon = "";
    b = 0;
    for (let i = 0; i < infoPokemon.flavor_text_entries.length; i++) {
        if (infoPokemon.flavor_text_entries[i].language.name == "es" && b <= 3) {
            desPokemon += infoPokemon.flavor_text_entries[i].flavor_text + " "
            b++
        }
    }
    descripcion.innerHTML = desPokemon;
    indexPokemon.innerHTML = "Su Pokeindex es: " + infoPokemon.id;
    felizPokemon.style.width = (((infoPokemon.base_happiness)/255)*100).toString() + "%";
    capturaPokemon.style.width = (((infoPokemon.capture_rate)/255)*100).toString() + "%";
    eclosionPokemon.style.width = (((infoPokemon.hatch_counter)/50)*100).toString() + "%";

    console.log(infoPokemon.base_happiness , infoPokemon.capture_rate , infoPokemon.hatch_counter);

    if (infoPokemon.evolves_from_species == null){
        evoliconPokemon.value = "Ninguno"
    }else {
        evoliconPokemon.value = infoPokemon.evolves_from_species.name.toUpperCase()
    }

    habitadPokemon.value = infoPokemon.habitat.name.toUpperCase();
    formaPokemon.value = infoPokemon.shape.name.toUpperCase();

    mostrarInfo.style.display = '';
}

//Snackbar
function snackbar(texto) {
    var x = document.getElementById("snackbar");
    x.innerHTML = texto;
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}

