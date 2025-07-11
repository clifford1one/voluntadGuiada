let videoIntro;
let isPlaying = false;
let videoEnded = false;
let interfazInicializada = false;

let tiempoInactivo = 0;
let maxInactividad = 30000; // Tiempo máximo sin interacción (ms)
let ultimoMovimiento = 0;

// Recibe votos desde otros tabs usando BroadcastChannel
channel.onmessage = function(event) {
  votes = event.data;
  console.log("Votos actualizados desde otro tab:", votes);
};

// Carga votos previamente guardados desde localStorage
function cargarVotosGuardados() {
  const votosGuardados = localStorage.getItem('votosGuardados');
  if (votosGuardados) {
    votes = JSON.parse(votosGuardados);
    channel.postMessage(votes); // Sincroniza con otras pestañas
  }
}

// Guarda los votos en localStorage y los comunica al resto de pestañas
function guardarVotos() {
  localStorage.setItem('votosGuardados', JSON.stringify(votes));
  channel.postMessage(votes);
}

function setup() {
  //createCanvas(1280, 720);
  //createCanvas(3840, 2160);
  createCanvas(windowWidth, windowHeight);
  
  declararVariables();

  ultimoMovimiento = millis(); // Marca el momento inicial de actividad

  // Al terminar el video de introducción, se oculta y marca como finalizado
  videoIntro.onended(() => {
    videoEnded = true;
    videoIntro.hide();
    videoIntro.size(width, height);
    videoIntro.position(0, 0);
  });
}

function draw() {
  // Si pasa el tiempo máximo sin actividad, se reinicia todo
  if (millis() - ultimoMovimiento > maxInactividad) {
    reiniciarExperiencia();
    return;
  }

  // Mientras no termina el video, se muestra o la pantalla de espera
  if (!videoEnded) {
    if (isPlaying && !videoIntro.elt.paused) {
      image(videoIntro, 0, 0, width, height);
    } else {
      dibujarPantallaEspera();
    }
    return;
  }

  // Activa la interfaz principal solo una vez, después del video
  if (!interfazInicializada) {
    modoCarruselActive = true;
    interfazInicializada = true;
  }

  // Interfaz principal: cambia según el modo activo
  background(200);
  if (modoCarruselActive) {
    modoConocer(peopleCarrusel[indexCarruselConocer]);
  } else if (popUpActive) {
    popUp();
  } else if (nameModeActive) {
    nameMode();
  }
}

// Muestra mensaje inicial cuando aún no se ha presionado nada
function dibujarPantallaEspera() {
  background(0);
  noStroke();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Presiona cualquier botón para comenzar", width / 2, height / 2);
}

function mousePressed() {
  ultimoMovimiento = millis(); // Registra actividad

  // Si el video aún no termina, lo inicia al primer click
  if (!videoEnded) {
    if (!isPlaying) {
      isPlaying = true;
      videoIntro.size(width, height);
      videoIntro.position(0, 0);
      videoIntro.show();
      videoIntro.play();
    }
    return;
  }

  // Reinicia estado de flechas al hacer clic
  flechaIzq = false;
  flechaDer = false;

  // Detecta si se hizo clic en el área izquierda o derecha
  if (mouseX > halfX - 485 && mouseX < halfX - 265 && mouseY > halfY - 115 && mouseY < halfY + 120) {
    flechaIzq = true;
  } else if (mouseX > halfX + 270 && mouseX < halfX + 485 && mouseY > halfY-115 && mouseY < halfY + 120) {
    flechaDer = true;
  }

  manejarFlechas(); // Aplica la navegación si corresponde

  // Lógica para interacción con pop-up de confirmación
  if (popUpActive) {
    if (mouseX > halfX + 15 && mouseX < halfX + 115 && mouseY > halfY + 150 && mouseY < halfY + 250) {
      greenPressed = true;
      nuevoComputo();
    } else if (mouseX > halfX - 115 && mouseX < halfX - 15 && mouseY > halfY + 150 && mouseY < halfY + 250) {
      reseteo();
    }
  } 
  // Lógica del modo de ingreso de nombre
  else if (nameModeActive) {
    if (flechaIzq) {
      letraIndex -= 1;
    } else if (flechaDer) {
      letraIndex += 1;
    }

    // Botón de confirmar letra
    if ((mouseX > halfX + 15 && mouseX < halfX + 115 && mouseY > halfY + 150 && mouseY < halfY + 250)|| (mouseX > halfX - 40 && mouseX < halfX + 40 && mouseY > halfY - 42 && mouseY < halfY + 42)) {
      textHere += abecedario[letraIndex];

      // Si el nombre coincide con alguno predefinido, se activa el pop-up
      if (["KAI", "HUMBU", "LIZPI", "LIZDI"].includes(textHere)) {
        popUpActive = true;
        nameModeActive = false;
      }
    } 
    // Botón para reiniciar nombre
    else if (mouseX > halfX - 115 && mouseX < halfX - 15 && mouseY > halfY + 150 && mouseY < halfY + 250) {
      textHere = "";
    }
  }

  // Salida del modo carrusel (volver al modo de nombre)
  if (modoCarruselActive &&  (mouseX > halfX + 215 && mouseX < halfX + 510 && mouseY > halfY - 270 && mouseY < halfY - 180)) {
    modoCarruselActive = false;
    nameModeActive = true;
    //background(0,200,0);
  }
}

// Controla el cambio de letra o personaje, según el modo activo
function manejarFlechas() {
  if (!flechaIzq && !flechaDer) return;

  if (modoCarruselActive) {
    if (flechaIzq) {
      indexCarruselConocer = (indexCarruselConocer - 1 + peopleCarrusel.length) % peopleCarrusel.length;
      console.log("Anterior personaje:", peopleCarrusel[indexCarruselConocer]);
    } else if (flechaDer) {
      indexCarruselConocer = (indexCarruselConocer + 1) % peopleCarrusel.length;
      console.log("Siguiente personaje:", peopleCarrusel[indexCarruselConocer]);
    }

    modoConocer(peopleCarrusel[indexCarruselConocer]);
  } else if (nameModeActive) {
    if (flechaIzq) {
      letraIndex = (letraIndex - 1 + abecedario.length) % abecedario.length;
      console.log("Letra anterior:", abecedario[letraIndex]);
    } else if (flechaDer) {
      letraIndex = (letraIndex + 1) % abecedario.length;
      console.log("Siguiente letra:", abecedario[letraIndex]);
    }
  }

  flechaIzq = false;
  flechaDer = false;
}

// Reinicia variables del modo nombre y oculta pop-up
function reseteo() {
  popUpActive = false;
  nameModeActive = true;
  textHere = "";
}

// Reinicia todo el flujo si no hay interacción por mucho tiempo
function reiniciarExperiencia() {
  console.log("Reiniciando por inactividad...");

  if (videoIntro && videoIntro.elt && !videoIntro.elt.paused) {
    videoIntro.stop();
    videoIntro.hide();
  }

  // Estado inicial de todas las flags y variables
  popUpActive = false;
  nameModeActive = false;
  modoCarruselActive = false;
  greenPressed = false;

  textHere = "";
  letraIndex = 0;
  indexCarruselConocer = 0;

  mostrarInterfaz = false;
  isPlaying = false;
  videoEnded = false;
  interfazInicializada = false;

  ultimoMovimiento = millis();
}

// Detecta movimiento del mouse para reiniciar el contador de inactividad
function mouseMoved() {
  ultimoMovimiento = millis();
}