const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')

let michipones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMichipones
let inputMaizena
let inputNena 
let inputPrieto
let mascotaJugador
let vidasJugador = 3
let vidasEnemigo = 3

class Michipon {
    constructor (nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }

}

let maizena = new Michipon('Maizena', './assets/michiponmaizena.png', 5)

let nena = new Michipon('Nena', './assets/michiponena.png', 5)

let prieto = new Michipon('Prieto', './assets/michiponprieto.png', 5)

maizena.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'}
)

nena.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'},
)

prieto.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'}
)

michipones.push(maizena,nena,prieto)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'

    michipones.forEach((michipon) => {
        opcionDeMichipones = `<input type="radio" name="mascota" id=${michipon.nombre} />
        <label class="tarjeta-de-michipon" for=${michipon.nombre}>
            <p>${michipon.nombre}</p>
            <img src=${michipon.foto} alt=${michipon.nombre}>
        </label>`

        contenedorTarjetas.innerHTML += opcionDeMichipones

        inputMaizena = document.getElementById('Maizena')
        inputNena = document.getElementById('Nena')
        inputPrieto = document.getElementById('Prieto')
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    botonFuego.addEventListener('click', ataqueFuego)
    
    botonAgua.addEventListener('click', ataqueAgua)
    
    botonTierra.addEventListener('click', ataqueTierra)

    botonReiniciar.addEventListener('click', reiniciarJuego)
    botonReiniciar.style.display = 'none'
}

function aleatorio(min, max) {
    return Math.floor( Math.random () * (max-min + 1) + min )

}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, michipones.length -1)

    spanMascotaEnemigo.innerHTML = michipones[mascotaAleatoria].nombre

}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'

    sectionSeleccionarAtaque.style.display = 'flex'

    if (inputMaizena.checked) {   
        spanMascotaJugador.innerHTML = inputMaizena.id
        mascotaJugador = inputMaizena.id
    } else if (inputNena.checked) {
        spanMascotaJugador.innerHTML = inputNena.id
        mascotaJugador = inputNena.id
    } else if (inputPrieto.checked) {
        spanMascotaJugador.innerHTML = inputPrieto.id
        mascotaJugador = inputPrieto.id
    }   else { 
        alert('No seleccionaste tu mascota') 
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()

}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < michipones.length; i++) {
        if (mascotaJugador === michipones[i].nombre) {
            ataques + michipones[i].ataques
        }
    }

    console.log(ataques)
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}

function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    combate()
    
}

function combate() {
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE") 
    } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador== 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()

}

function revisarVidas() {
    if(vidasEnemigo == 0) {
        crearMensajeFinal("¡FELICIDADES, GANADORX! 🎉🎉")
    } else if (vidasJugador == 0) {
        crearMensajeFinal("Perdedo-oooor... 😶")
    }
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.appendChild = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    botonReiniciar.style.display = 'block'
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function reiniciarJuego() {
    location.reload()
}
 
window.addEventListener('load', iniciarJuego)
