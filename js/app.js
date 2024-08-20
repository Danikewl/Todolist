//variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// eventListener
eventListeners()

function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweet)

    // cuando el documento está listo
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];
        crearHTML();
    });
}

//Funciones

function agregarTweet(e) {
    e.preventDefault()
    // textarea
    const tweet = document.querySelector("#tweet").value;
    // Validación 
    if (tweet === "") {
        mostrarError("Un mensaje no puede ir vacío")
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //añadir al arreglo teewtss
    tweets = [...tweets, tweetObj];
    crearHTML();
    //resetear el formulario cuando agregas un tweet
    formulario.reset();

}

// mostrar mensaje de error

function mostrarError(error) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");

    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML(){
    limpiarHTML()
    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            const btnEliminar = document.createElement("a")
            btnEliminar.classList.add("borrar-tweet")
            btnEliminar.innerText = "X"

            //funcion eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement("li");
            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar)

            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
};

function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets))
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML()
}