let channel;
let voteCounts = { kaiVote: 0, umbuVote: 0, lizVote: 0 };
let kaiImg, umbuImg, lizImg, currentWinner;



function preload() {
  kaiImg = loadImage("./imgs/kaiWin.png");
  umbuImg = loadImage("./imgs/umbuWin.png");
  lizImg = loadImage("./imgs/lizWin.png");
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);

  cargarVotosGuardados();
  currentWinner = obtenerGanador();

  channel = new BroadcastChannel("votes");
  channel.onmessage = (e) => {
    voteCounts = e.data;
    currentWinner = obtenerGanador();
    guardarVotos();

     //imprimir en consola
  console.log("Votos actualizados:");
  console.log("KAI:", voteCounts.kaiVote + "  UMBU:", voteCounts.umbuVote + "  LIZ:", voteCounts.lizVote);
  };
}

function draw() {
  background(100,100,200);
  if (currentWinner) {
    imageMode(CENTER);
    image(currentWinner, width / 2, height / 2, windowWidth, windowHeight);
  }
}

function cargarVotosGuardados() {
  const votosGuardados = localStorage.getItem('votosGuardados');
  if (votosGuardados) {
    voteCounts = JSON.parse(votosGuardados);
  }
}

function guardarVotos() {
  localStorage.setItem('votosGuardados', JSON.stringify(voteCounts));
}

function obtenerGanador() {
  const { kaiVote, umbuVote, lizVote } = voteCounts;
  const max = Math.max(kaiVote, umbuVote, lizVote);

  if (kaiVote === max) return kaiImg;
  if (umbuVote === max) return umbuImg;
  if (lizVote === max) return lizImg;

  return null;
}
