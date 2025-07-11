let halfX;
let halfY;

let nombreEscritoCheck;
let letraIndex;
//let eleccion;
let abecedario;
let textoConfirmacion;

let previusLetra;
let nextLetra;

let greenPressed;
let redPressed;

let confirmVote = `¿quieres darle tu, 
  apoyo a`;

//let confirmo;

let nameModeActive;
let popUpActive;

let votes = {
  kaiVote: 0,
  umbuVote: 0,
  lizVote: 0,
};

const characters = ["KAI", "HUMBU", "LIZ"];
const channel = new BroadcastChannel("votes");

let fontLinda;
let fontRegular;
let fontMedium;
let fontSemiBold;
let fontBold;
let fontExtraBold;
let fontBlack;

let kaiAlone;
let umbuAlone; 
let lizAlone;

function preload() {
  fontLinda = loadFont("./fonts/chelseaMrkt-reg.ttf");
  fontRegular = loadFont("./fonts/mirador-regular.otf");
  fontMedium = loadFont("./fonts/mirador-medium.otf");
  fontSemiBold = loadFont("./fonts/mirador-semibold.otf");
  fontBold = loadFont("./fonts/mirador-bold.otf");
  fontExtraBold = loadFont("./fonts/mirador-extrabold.otf");
  fontBlack = loadFont("./fonts/mirador-black.otf");

  kaiAlone = loadImage("./images/kai-solo.png");
  umbuAlone = loadImage("./images/umbu-solo.png");
  lizAlone = loadImage("./images/liz-solo.png");

    videoIntro = createVideo('video/animacionVoluntadGuiada.mp4', () => {
    videoIntro.hide();
  });
}
let indexCarruselConocer;

let flechaIzq;
let flechaDer;  



function declararVariables(){
  abecedario = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
    "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  ];
  //defino frameRate para crearel cursor parpadeante
  frameRate(30);

  //variables del texto
   textHere = "";
  letraIndex = 0;

  //variables de pantallas
  popUpActive = false;
  nameModeActive = false;
  modoCarruselActive=true;
 // flechaIzq = false;
  //flechaDer = false;
  
  //variables para mejorar la legibilidad
  halfX = width / 2;
  halfY = height / 2;

indexCarruselConocer=1;


}