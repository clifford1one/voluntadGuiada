function nameMode() {
  background(79);
  rectMode(CENTER);

  // Frame mayor
  fill(170);
  noStroke();
  rect(halfX, halfY, 1180, 590, 180);

  // Caja donde se escribe el nombre
  noStroke();
  strokeWeight(1);
  stroke(15);
  fill(246, 237, 226);
  rect(halfX, height / 4.5, 540, 70, 4);

  flechas();           // Flechas para cambiar letra
  yesNoButtons();      // Botones de confirmación

  // Hace wrap del índice de letras si se sale del rango
  if (letraIndex < 0) {
    letraIndex = abecedario.length - 1;
  } else if (letraIndex >= abecedario.length) {
    letraIndex = 0;
  }

  // Resetea si el texto es demasiado largo
  if (textHere.length > 15) {
    reseteo();
  }

  // Letra central (seleccionada)
  fill(79);
  stroke(79);
  textSize(140);
  textAlign(CENTER, CENTER);
  textFont(fontLinda);
  strokeWeight(6);
  text(abecedario[letraIndex], halfX, halfY - 10);

  // Letra anterior y siguiente (para efecto de carrusel)
  strokeWeight(2);
  textSize(95);
  let previousLetra = (letraIndex - 1 + abecedario.length) % abecedario.length;
  text(abecedario[previousLetra], halfX - 150, halfY);
  let nextLetra = (letraIndex + 1) % abecedario.length;
  text(abecedario[nextLetra], halfX + 150, halfY);

  // Texto ingresado por el usuario (nombre acumulado)
  fill(79);
  textSize(45);
  noStroke();
  textAlign(LEFT);
  textFont(fontBold);
  text(textHere, halfX - 240, halfY - 206);

  // Cursor parpadeante
  if (frameCount % 60 < 30) {
    stroke(0);
    strokeWeight(4);
    line(
      textWidth(textHere) + halfX - 225,
      halfY - 220,
      textWidth(textHere) + halfX - 225,
      halfY - 180
    );
  }
}

function popUp() {
  background(79);
  // Fondo semitransparente
  fill(0, 110);
  rect(halfX, halfY, 1280, 720);

  // Ventana principal del pop-up
  fill(179);
  stroke(20);
  strokeWeight(8);
  rect(halfX, halfY + 20, 800, 510, 50);

  // Mensaje de confirmación con nombre
  textAlign(CENTER);
  strokeWeight(1);
  fill(20);
  textFont(fontMedium);
  text(
    `¿Quieres darle tu 
apoyo a ` + textHere + " ?",
    halfX,
    halfY - 1
  );

  yesNoButtons(); // Botones de aceptar o cancelar
}

function yesNoButtons() {
  // Botón rojo (equis)
  noStroke();
  fill(100, 20, 20); // sombra
  rect(halfX - 65 + 6, halfY + 200 + 6, 100, 100, 20);
  fill(235, 30, 30); // color principal
  rect(halfX - 65, halfY + 200, 100, 100, 20);
  stroke(250);
  strokeWeight(20);
  strokeCap(SQUARE);
  line(halfX - 90, halfY + 175, halfX - 40, halfY + 225);
  line(halfX - 40, halfY + 175, halfX - 90, halfY + 225);
  noStroke();

  // Botón verde (check)
  fill(20, 120, 20); // sombra
  rect(halfX + 65 + 6, halfY + 200 + 6, 100, 100, 20);
  fill(30, 225, 30); // color principal
  rect(halfX + 65, halfY + 200, 100, 100, 20);

  // Check blanco
  stroke(255);
  noFill();
  strokeWeight(20);
  beginShape();
  vertex(halfX + 35, halfY + 200);
  vertex(halfX + 55, halfY + 220);
  vertex(halfX + 95, halfY + 180);
  endShape();
}

function flechas() {
  // Sombra de flechas (izquierda y derecha)
  push();
  strokeJoin(ROUND);
  stroke(160, 75, -10);
  strokeWeight(100);
  triangle(halfX + 429, halfY + 9, halfX + 339, halfY + 59, halfX + 339, halfY - 41);
  triangle(halfX - 411, halfY + 9, halfX - 321, halfY + 59, halfX - 321, halfY - 41);

  // Flechas en color principal
  stroke(240, 155, 70);
  triangle(halfX + 420, halfY, halfX + 330, halfY + 50, halfX + 330, halfY - 50);
  triangle(halfX - 420, halfY, halfX - 330, halfY + 50, halfX - 330, halfY - 50);
  pop();
}

function nuevoComputo() {
  if (greenPressed) {
    if (textHere === 'KAI') {
      votes.kaiVote++;
      lizVote = true;
    } else if (textHere === 'HUMBU') {
      votes.umbuVote++;
      umbuVote = true;
    } else if (textHere === 'LIZDI' || textHere === 'LIZPI') {
      votes.lizVote++;
      lizVote = true;
    } else {
      reseteo();
      return;
    }

    channel.postMessage(votes);
    guardarVotos();
    console.log("Votos actualizados:", votes);

    reiniciarExperiencia(); // 👈 Esto te lleva de vuelta al standby
  }
}


const peopleCarrusel = ["elKai", "elUmbu", "elLiz"];

function modoConocer(quien) {
  background(79);
 
  rectMode(CENTER);
  imageMode(CENTER);

  //frame mayor
    fill(170);
  rect(halfX, halfY, 1180, 590, 180);

  flechas(); // Mostrar flechas para cambiar personaje


 // boton continuar
 fill(20, 120, 20);
 rect(halfX+365+7, halfY - 227+7, 265, 70, 7); 

 fill(30, 225, 30);
 rect(halfX+365, halfY - 227, 265, 70, 7); 
 textFont(fontMedium);
 textSize(44);
 fill(235);
 text('Continuar',halfX+345, halfY - 232);
 push();
 fill(235);
 noStroke();
 let flechaX = halfX + 458; // posición X de la flecha (ajusta si es necesario)
 let flechaY = halfY - 226; // posición Y centrada con el texto
 beginShape();
 vertex(flechaX, flechaY - 18);   // punta superior
 vertex(flechaX + 32, flechaY);   // punta derecha
 vertex(flechaX, flechaY + 18);   // punta inferior
 vertex(flechaX + 10, flechaY);   // base de la flecha (centro)
 endShape(CLOSE);
 pop();

 fill(20);
 noStroke();

 // Información personalizada según el personaje
 if (quien === 'elKai') {
    textFont(fontBold);
    textAlign(LEFT);
    textSize(75);
    text('KAI', halfX - 500, halfY - 232);
    image(kaiAlone, halfX, halfY - 35, 420, 680);
    textSize(36);
    textAlign(CENTER);
    textFont(fontMedium);
    text('"Antes éramos felices, si llega alguien más todo se arruina"', halfX, halfY + 250);

 } else if (quien === 'elUmbu') {
    textFont(fontBold);
    textAlign(LEFT);
    textSize(75);
    text('HUMBU', halfX - 500, halfY - 232);
    image(umbuAlone, halfX, halfY + 10, 350, 500);
    textSize(36);
    textAlign(CENTER);
    textFont(fontMedium);
    text('"Yo solo quiero tener amigues con quien jugar :("', halfX, halfY + 250);

  } else if (quien === 'elLiz') {
    textFont(fontBold);
    textSize(75);
    textAlign(LEFT);
    text('LIZPI y LIZDI', halfX - 500, halfY - 232);
    image(lizAlone, halfX, halfY + 10, 530, 700);
    textSize(36);
    textAlign(CENTER);
    textFont(fontMedium);
    text('"Nos gustaría que pudieramos ser amigxs todxs"', halfX, halfY + 250);
  }
}