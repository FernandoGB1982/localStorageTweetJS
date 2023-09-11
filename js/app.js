// variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets =[];

// Event Listeners
eventListeners();
function eventListeners(){
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        //console.log(tweets);

        crearHTML();
    });
}

// Funciones
function agregarTweet(e){
    e.preventDefault();
    //console.log('Agregando Tweet');

    //Text area donde el ususario escribe
    const tweet = document.querySelector('#tweet').value;
    // console.log(tweet);

    // Validacion...
    if(tweet === ''){
        //console.log('No puede ir vacio');
        mostrarError('Un mensaje, no puede ir vacio');
        return;// Evita que se ejecuten mas lineas de codigo
    }
    console.log('Agregando tweet');
    const tweetObj = {
        id : Date.now(),
        tweet //tweet : tweet
    }

    // Añadir al arreglo de tweet
    tweets = [...tweets, tweetObj];
    //console.log(tweets);

    // Una vez agregado introducimos en el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();

}


//Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Eliminar la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//Muestra un listado de los tweets
function crearHTML() {
    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach(tweet =>{
            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };

            // Crear el html
            const li = document.createElement('li');
            // Añadimos el texto
            li.innerText = tweet.tweet;

            // Asignar el boton
            li.appendChild(btnEliminar);

            // Insertalo en el HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agrega los tweets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Eliminar un tweet
function borrarTweet(id) {
    // console.log('Borrando...', id);
    tweets = tweets.filter( tweet => tweet.id !== id);
    //console.log(tweets);
    crearHTML();
}

//Limpìar el HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}