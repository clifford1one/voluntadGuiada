

function nameMode() {
  background(0, 11, 90);
  rectMode(CENTER);

  /*//////////////////////////////////////
  //lineas guías
  stroke(0);
  strokeWeight(1);
  line(0, height/2, width, height/2);
  line(width/2,0, width/2, height)
  //////////////////////////////////////*/

  //frame mayor
  fill(200, 220, 250);
  noStroke();
  rect(halfX, halfY, 1180, 590, 180);

  //textBox
  noStroke();
  strokeWeight(1);
  stroke(15);
  fill(246, 237, 226);
  rect(halfX, height / 4.5, 540, 70, 4);

  //sombras flechas - y +
  push();
  strokeJoin(ROUND);
  stroke(130, 20, 20);
  strokeWeight(100);
  triangle(
    halfX + 429,
    halfY + 9,
    halfX + 339,
    halfY + 59,
    halfX + 339,
    halfY - 50 + 9
  );
  triangle(
    halfX - 420 + 9,
    halfY + 9,
    halfX - 330 + 9,
    halfY + 59,
    halfX - 330 + 9,
    halfY - 50 + 9
  );
  //flechas - y +
  stroke(240, 20, 20);
  triangle(
    halfX + 420,
    halfY,
    halfX + 330,
    halfY + 50,
    halfX + 330,
    halfY - 50
  );
  triangle(
    halfX - 420,
    halfY,
    halfX - 330,
    halfY + 50,
    halfX - 330,
    halfY - 50
  );
  pop();

  yesNoButtons();

  //////LETTER SCROLL///////////////
  if (letraIndex < 0) {
    letraIndex = abecedario.length - 1;
  } else if (letraIndex >= abecedario.length) {
    letraIndex = 0;
  }
  //////////////////////////////////
  //letra del centro
  //fill(0, 11, 90);
  fill(10, 10, 100);
  stroke(0, 11, 90);
  textSize(140);
  textAlign(CENTER, CENTER);
  textFont(fontLinda);
  strokeWeight(6);
  text(abecedario[letraIndex], halfX, halfY - 10);

  // letra anterior (con wrap)
  strokeWeight(2);
  textSize(95);
  let previousLetra = (letraIndex - 1 + abecedario.length) % abecedario.length;
  text(abecedario[previousLetra], halfX - 150, halfY);

  // letra siguiente (con wrap)
  let nextLetra = (letraIndex + 1) % abecedario.length;
  text(abecedario[nextLetra], halfX + 150, halfY);

  textSize(45);
  noStroke();
  textAlign(LEFT);
  text(textHere, halfX - 240, halfY - 206);

  //cursor
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
  //pop up

  fill(0, 110);
  rect(halfX, halfY, 1280, 720);
  //fill(255,0,0);
  fill(190, 210, 240);
  stroke(20);
  //stroke(20,20,120);
  strokeWeight(8);
  rect(halfX, halfY + 20, 800, 510, 50);

  //
  textAlign(CENTER);
  strokeWeight(1);
  fill(20);
  text(
    `quieres darle tu 
apoyo a ` +
      textHere +
      " ?",
    halfX,
    halfY - 1
  );
  yesNoButtons();
}

function yesNoButtons() {
  //botón equis
  //sombra
  noStroke();
  fill(100, 20, 20);
  rect(halfX - 65 + 5, halfY + 200 + 5, 100, 100, 20);
  //color
  fill(200, 100, 100);
  noStroke();
  //fill(200);
  rect(halfX - 65, halfY + 200, 100, 100, 20);
  stroke(250, 250, 250);
  strokeWeight(20);
  strokeCap(SQUARE);
  //equis interna
  line(halfX - 90, halfY + 175, halfX - 40, halfY + 225);
  line(halfX - 40, halfY + 175, halfX - 90, halfY + 225);
  noStroke();

  //ticket
  //sombra boton verde
  fill(20, 120, 20);
  rect(halfX + 65 + 5, halfY + 200 + 5, 100, 100, 20);

  //color verde
  fill(100, 200, 100);
  rect(halfX + 65, halfY + 200, 100, 100, 20);
  /////////////
  stroke(255, 250, 250);
  noFill();
  strokeWeight(20);
  beginShape();
  vertex(halfX + 35, halfY + 200); // izq
  vertex(halfX + 55, halfY + 220); // abajo-medio
  vertex(halfX + 95, halfY + 180); //arriba derexa
  endShape();
}

function nuevoComputo(){
        if (greenPressed) {
        if (textHere === 'KAI') {
          votes.kaiVote++;
          lizVote=true;
        } else if (textHere === 'UMBU') {
          votes.umbuVote++;
          umbuVote=true;
        } else if (textHere === 'LIZDI' || textHere === 'LIZPI') {
          votes.lizVote++;
          lizVote=true;
        } else {
          reseteo();
        }
        
        reseteo();
  /*if(kaiVote || umbuVote || lizVote){
    channel.onmessage = (event) => {
  votes = event.data;
  console.log("Votos actualizados desde otro tab:", votes);*/

  }}


