
function setup() {
  createCanvas(1280, 720);

  preload();

  declararVariables();
  
}

function draw() {
  //empieza con el modo nombre
  background(200);

  if (popUpActive) {
    popUp();
  } else if (nameModeActive) {
    nameMode();
  }
  print('kai:'+votes.kaiVote, 'umbu:'+votes.umbuVote, 'liz:'+votes.lizVote);
}

function mousePressed() {
  if (popUpActive) {
    // BOTÓN VERDE en popup
    if (
      mouseX > halfX + 15 &&
      mouseX < halfX + 115 &&
      mouseY > halfY + 150 &&
      mouseY < halfY + 250
    ) {
      greenPressed = true;

nuevoComputo();
    }
        /*
  // Enviar votos actualizados a otros tabs
  channel.postMessage(votes);
    */
       else if (
      //boton rojo en popUp
      mouseX > halfX - 115 &&
      mouseX < halfX - 15 &&
      mouseY > halfY + 150 &&
      mouseY < halfY + 250
    ) {
      reseteo();
    }
  } else if (nameModeActive) {
    if (mouseX > 160 && mouseX < 420 && mouseY > 200 && mouseY < 520) {
      //background(0);
      letraIndex -= 1; //flecha hacia la izq
    } else if (
      mouseX > halfX + 160 &&
      mouseX < halfX + 420 &&
      mouseY > 200 &&
      mouseY < 520
    ) {
      //background(0);
      letraIndex += 1; //flecha hacia la der
    }
    // BOTÓN VERDE en nameMode - Añadir letra
    if (
      mouseX > halfX + 15 &&
      mouseX < halfX + 115 &&
      mouseY > halfY + 150 &&
      mouseY < halfY + 250
    ) {
      textHere += abecedario[letraIndex];
      if (["KAI", "UMBU", "LIZ", "LIF"].includes(textHere)) {
        popUpActive = true;
        nameModeActive = false;
      }
    }
    // BOTÓN ROJO en nameMode - Borrar
    else if (
      mouseX > halfX - 115 &&
      mouseX < halfX - 15 &&
      mouseY > halfY + 150 &&
      mouseY < halfY + 250
    ) {
      textHere = "";
    }
  }
}

function reseteo() {
  popUpActive = false;
  nameModeActive = true;
  textHere = "";
}

// Al confirmar un voto:
function confirmarVoto() {
    if (textHere === 'KAI') votes.kai++;
    else if (textHere === 'UMBU') votes.umbu++;
    else if (textHere === 'LIZ') votes.liz++;
    
    channel.postMessage(votes); // Enviar a results.html
}