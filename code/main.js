let videoIntro;
let isPlaying = false;
let videoEnded = false;
let interfazInicializada = false;

let tiempoInactivo = 0;
let maxInactividad = 30000; // tiempo máximo sin interacción (ms)
let ultimoMovimiento = 0;

//recibe votos desde 
channel.onmessage = function(event) {
  votes = event.data;
  console.log("Votos actualizados desde otro tab:", votes);
};

//carga votos previamente guardados desde localStorage
function cargarVotosGuardados() {
  const votosGuardados = localStorage.getItem('votosGuardados');
  if (votosGuardados) {
    votes = JSON.parse(votosGuardados);
    channel.postMessage(votes); // Sincroniza con otras pestañas
  }
}

//guarda los votos en localStorage y los comunica al resto de pestañas
function guardarVotos() {
  localStorage.setItem('votosGuardados', JSON.stringify(votes));
  channel.postMessage(votes);
}

function setup() {
  //createCanvas(1280, 720);
  //createCanvas(3840, 2160);
  createCanvas(windowWidth, windowHeight);
  
  declararVariables();

  ultimoMovimiento = millis(); //marca el momento inicial de actividad

  //al terminar el video de introducción, se oculta y marca como finalizado
  videoIntro.onended(() => {
    videoEnded = true;
    videoIntro.hide();
    videoIntro.size(width, height);
    videoIntro.position(0, 0);
  });
}

function draw() {
  //si pasa el tiempo máximo sin actividad, se reinicia todo
  if (millis() - ultimoMovimiento > maxInactividad) {
    reiniciarExperiencia();
    return;
  }

  //mientras no termina el video, se muestra o la pantalla de espera
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

  //dinámica de intercambio de interfaces
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
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Presiona cualquier botón para comenzar", width / 2, height / 2);
}

function mousePressed() {
  ultimoMovimiento = millis(); //registra actividad

  // si el video aún no termina, lo inicia al primer click
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

  manejarFlechas(); //funcion que maneja 

  //interacción pop-up de confirmación
  if (popUpActive) {
    if (mouseX > halfX + 15 && mouseX < halfX + 115 && mouseY > halfY + 150 && mouseY < halfY + 250) {
      greenPressed = true;
      nuevoComputo();
    } else if (mouseX > halfX - 115 && mouseX < halfX - 15 && mouseY > halfY + 150 && mouseY < halfY + 250) {
      reseteo();
    }
  } 
  //modo de ingreso de nombre
  else if (nameModeActive) {
    if (flechaIzq) {
      letraIndex -= 1;
    } else if (flechaDer) {
      letraIndex += 1;
    }

    //confirmar letra
    if ((mouseX > halfX + 15 && mouseX < halfX + 115 && mouseY > halfY + 150 && mouseY < halfY + 250)|| (mouseX > halfX - 40 && mouseX < halfX + 40 && mouseY > halfY - 42 && mouseY < halfY + 42)) {
      textHere += abecedario[letraIndex];

      // Si el nombre coincide , se activa el pop-up
      if (["KAI", "HUMBU", "LIZPI", "LIZDI"].includes(textHere)) {
        popUpActive = true;
        nameModeActive = false;
      }
    } 
    // botón pa reiniciar nombre
    else if (mouseX > halfX - 115 && mouseX < halfX - 15 && mouseY > halfY + 150 && mouseY < halfY + 250) {
      textHere = "";
    }
  }

  //volver al modo de nombre
  if (modoCarruselActive &&  (mouseX > halfX + 215 && mouseX < halfX + 510 && mouseY > halfY - 270 && mouseY < halfY - 180)) {
    modoCarruselActive = false;
    nameModeActive = true;
    //background(0,200,0);
  }
}

//función que controla las acciones de las flechas
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

//función que reseta el modoNombre para que la textBox se vacíe
function reseteo() {
  popUpActive = false;
  nameModeActive = true;
  textHere = "";
}

//reinicia todo si se detecta inactividad (por 30s)
function reiniciarExperiencia() {
  console.log("Reiniciando por inactividad...");

  if (videoIntro && videoIntro.elt && !videoIntro.elt.paused) {
    videoIntro.stop();
    videoIntro.hide();
  }

 
  //popUpActive = false;
  //nameModeActive = false;
  //modoCarruselActive = false;
  //greenPressed = false;

  //textHere = "";
  //letraIndex = 0;
  //indexCarruselConocer = 0;


}

//detecta actividad e inactividad
function mouseMoved() {
  ultimoMovimiento = millis();
}
