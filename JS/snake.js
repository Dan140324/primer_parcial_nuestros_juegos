const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");

const tamanoCuadro = 20;

let culebra = [
  { x: 200, y: 200 },
  { x: 180, y: 200 },
  { x: 160, y: 200 },
];

let manzana = {
  x: 0,
  y: 0,
};

let direccionX = tamanoCuadro;
let direccionY = 0;
let juegoTerminado = false;

let puntaje = 0;
const puntajeTexto = document.getElementById("puntaje");
const botonInicio = document.getElementById("btn_inicio");

ctx.fillStyle = "rgb(34, 34, 34)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function dibujarCulebra() {
  ctx.fillStyle = "rgb(26, 188, 156)";
  for (let i = 0; i < culebra.length; i++) {
    ctx.fillRect(culebra[i].x, culebra[i].y, tamanoCuadro, tamanoCuadro);
  }
}

function moverculebra() {
  const nuevaCabeza = {
    x: culebra[0].x + direccionX,
    y: culebra[0].y + direccionY,
  };

  culebra.unshift(nuevaCabeza);

  if (nuevaCabeza.x === manzana.x && nuevaCabeza.y === manzana.y) {
    puntaje = puntaje + 10;
    puntajeTexto.textContent = puntaje;
    colocarManzana();
  } else {
    culebra.pop();
  }
}

function hayChoque() {
  const cabeza = culebra[0];

  const chocaPared =
    cabeza.x < 0 ||
    cabeza.x >= canvas.width ||
    cabeza.y < 0 ||
    cabeza.y >= canvas.height;

  let chocaCuerpo = false;
  for (let i = 1; i < culebra.length; i++) {
    if (cabeza.x === culebra[i].x && cabeza.y === culebra[i].y) {
      chocaCuerpo = true;
    }
  }

  return chocaPared || chocaCuerpo;
}

function colocarManzana() {
  const columnas = canvas.width / tamanoCuadro;
  const filas = canvas.height / tamanoCuadro;

  manzana.x = Math.floor(Math.random() * columnas) * tamanoCuadro;
  manzana.y = Math.floor(Math.random() * filas) * tamanoCuadro;
}

function dibujarManzana() {
  ctx.fillStyle = "rgb(254, 25, 0)";
  ctx.fillRect(manzana.x, manzana.y, tamanoCuadro, tamanoCuadro);
}

function juego() {
  if (hayChoque()) {
    juegoTerminado = true;
  }

 if (juegoTerminado) {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("¡Game Over!", canvas.width / 2, canvas.height / 2);
    botonInicio.textContent = "Jugar de nuevo";
    clearInterval(intervalo);
    return;
}

  ctx.fillStyle = "rgb(34, 34, 34)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  dibujarManzana();
  moverculebra();
  dibujarCulebra();
}
/** Controles para PC */
document.addEventListener("keydown", function (evento) {
  const teclaArriba = evento.key === "ArrowUp";
  const teclaAbajo = evento.key === "ArrowDown";
  const teclaIzquierda = evento.key === "ArrowLeft";
  const teclaDerecha = evento.key === "ArrowRight";

  const yendoArriba = direccionY === -tamanoCuadro;
  const yendoAbajo = direccionY === tamanoCuadro;
  const yendoIzquierda = direccionX === -tamanoCuadro;
  const yendoDerecha = direccionX === tamanoCuadro;

  if (teclaArriba && !yendoAbajo) {
    direccionX = 0;
    direccionY = -tamanoCuadro;
  }
  if (teclaAbajo && !yendoArriba) {
    direccionX = 0;
    direccionY = tamanoCuadro;
  }
  if (teclaIzquierda && !yendoDerecha) {
    direccionX = -tamanoCuadro;
    direccionY = 0;
  }
  if (teclaDerecha && !yendoIzquierda) {
    direccionX = tamanoCuadro;
    direccionY = 0;
  }
});


/** Controles para móvil */
let inicioX = 0;
let inicioY = 0;

canvas.addEventListener("touchstart", function(evento) {
    inicioX = evento.touches[0].clientX;
    inicioY = evento.touches[0].clientY;
});

canvas.addEventListener("touchend", function(evento) {
    const finX = evento.changedTouches[0].clientX;
    const finY = evento.changedTouches[0].clientY;

    const difX = finX - inicioX;
    const difY = finY - inicioY;

    const yendoArriba = direccionY === -tamanoCuadro;
    const yendoAbajo = direccionY === tamanoCuadro;
    const yendoIzquierda = direccionX === -tamanoCuadro;
    const yendoDerecha = direccionX === tamanoCuadro;

    if (Math.abs(difX) > Math.abs(difY)) {
        if (difX > 0 && !yendoIzquierda) {
            direccionX = tamanoCuadro;
            direccionY = 0;
        } else if (difX < 0 && !yendoDerecha) {
            direccionX = -tamanoCuadro;
            direccionY = 0;
        }
    } else {
        if (difY > 0 && !yendoArriba) {
            direccionX = 0;
            direccionY = tamanoCuadro;
        } else if (difY < 0 && !yendoAbajo) {
            direccionX = 0;
            direccionY = -tamanoCuadro;
        }
    }
});

let intervalo;

function iniciarJuego() {
    culebra = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 }
    ];
    direccionX = tamanoCuadro;
    direccionY = 0;
    puntaje = 0;
    puntajeTexto.textContent = puntaje;
    juegoTerminado = false;

    colocarManzana();

    clearInterval(intervalo);
    intervalo = setInterval(juego, 150);
}

botonInicio.addEventListener("click", iniciarJuego);
