/**
 * Vamos a crear dos montones de tarjetas, uno de películas y otro de recursos relacionados:
 * 
 */
const NMOVIES = 5
const NELEMENTSPMOVIE = 3

const btnMovieConfiguration = () => {
    const btnMovie = document.querySelector('#btnMovie')
    const divPelicula = document.querySelector("#pelicula-caratula")
    btnMovie.addEventListener('click', () => {
        movieSelected = getElement(movieDeck)
        
        //Borramos la película antigua
        let oldMovie = document.querySelector("#pelicula-caratula img")
        if(oldMovie != null)
            divPelicula.removeChild(oldMovie)
        
        //Borramos los elementos que haya desplegados de la película antigua
        const elementsDiv = document.querySelector('#elementos-pelicula')
        while(elementsDiv.firstChild) {
            elementsDiv.removeChild(elementsDiv.firstChild)
        }

        //Creamos de nuevo el montón de elementos
        elementDeck = getElementsDeck()
        //Creamos el elemento de la película
        const imgMovie = document.createElement('img');
        imgMovie.src = `assets/movies/${movieSelected}.jpg`
        imgMovie.classList.add('elemento')
        divPelicula.append(imgMovie)
    })
}

const btnElementConfiguration = () => {
    const btnElement = document.querySelector('#btnElement')
    const divGlobal = document.querySelector("#elementos-pelicula")
    btnElement.addEventListener('click', () => {
        let element = getElement(elementDeck)
        //Creamos el elemento 
        const divElement = document.createElement('div')
        divElement.classList.add('elemento')

        const imgElement = document.createElement('img')
        imgElement.src = `assets/characters/${element}.jpg`
        imgElement.classList.add('recurso')
        divElement.append(imgElement)
        divElement.addEventListener('mouseup', selectEventListener)
        divGlobal.appendChild(divElement)
    })
}

const selectEventListener = (e) => {
    //Obtenemos el src de la img
    //Si pinchamos puede que estemos pinchando en el div o en la imagen, debemos obtener el src de la imagen
    let img = (e.target.tagName === 'DIV') ? e.target.querySelector('img') : e.target
    let elementName = img.src.split('/').pop() //Cojo el nombre de la imagen del elemento, sin la ruta completa
    isElementOfMovie(elementName, movieSelected) 
        ? img.parentElement.classList.add('ok')
        : img.parentElement.classList.add('fail')
}

const getMoviesDeck = () => {
    let movieDeck = []
    for(let i = 1; i <= NMOVIES; i++) {
        movieDeck.push("0"+i+"M")
    }
    //Barajamos con un método de la librería Underscore. Esta librería ofrece muchas funciones,
    //en este caso uso shuffle que recibe un arrayy lo devuelve de forma aleatoria
    movieDeck = _.shuffle(movieDeck)
    return movieDeck;
}

const getElementsDeck = () => {
    let elementDeck = []
    for(let i = 1; i <= NMOVIES; i++) {
        for(let j = 0; j < NELEMENTSPMOVIE; j++) {
            elementDeck.push("0"+i+"C"+j)
        } 
    }
    //Barajamos
    elementDeck = _.shuffle(elementDeck)
    return elementDeck;
}

const getElement = (elementDeck) => {
    if(elementDeck.length === 0)
        throw 'No hay más tarjetas'
    const tarjeta = elementDeck.pop()
    return tarjeta;
}

const isElementOfMovie = (element, movie) => element.substring(0,2) === movie.substring(0,2) ? true : false

let movieDeck = getMoviesDeck()
let elementDeck = getElementsDeck()
let movieSelected;
btnMovieConfiguration()
btnElementConfiguration()
