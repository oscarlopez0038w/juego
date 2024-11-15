const scene = document.getElementById('scene');
const scoreElement = document.getElementById('score');
const congratsElement = document.getElementById('congrats');

// Lista de dinosaurios (emojis)
const dinosaurs = ['🦖', '🦕', '🐊', '🦩', '🦜'];

// Variables del juego
let score = 0;

// Crear confetti aleatorio
function createConfetti(amount, isExplosion = false) {
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';

    // Configuración aleatoria
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = Math.random() * 100 + 'vh';
    piece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    piece.style.width = isExplosion ? '20px' : `${Math.random() * 10 + 5}px`;
    piece.style.height = piece.style.width;

    // Si es una explosión, ajustar animación
    piece.style.animation = isExplosion
      ? `explosion 2s linear ${Math.random()}s`
      : `fall ${Math.random() * 2 + 1.5}s linear ${Math.random()}s`;

    scene.appendChild(piece);
  }

  setTimeout(() => {
    document.querySelectorAll('.confetti-piece').forEach(piece => piece.remove());
  }, 2500);
}

// Crear huevo sorpresa
function createEgg() {
  const egg = document.createElement('div');
  egg.className = 'egg';
  egg.style.left = Math.random() * 90 + 'vw';
  egg.style.top = Math.random() * 80 + 'vh';

  const surprise = document.createElement('div');
  surprise.className = 'surprise';
  surprise.textContent = dinosaurs[Math.floor(Math.random() * dinosaurs.length)];

  egg.appendChild(surprise);
  scene.appendChild(egg);

  egg.addEventListener('click', () => {
    egg.style.animation = 'none';
    surprise.style.display = 'block';
    egg.style.background = 'none';
    egg.style.border = 'none';
    createConfetti(20); // Confetti al abrir huevo

    // Incrementar puntaje
    score++;
    scoreElement.textContent = score;

    // Mostrar mensaje de felicitación y reiniciar si el puntaje llega a 10
    if (score === 10) {
      congratsElement.style.display = 'block';
      createConfetti(100, true); // Explosión masiva de confetti
      setTimeout(() => {
        resetGame();
      }, 1000); // Reinicio inmediato
    }

    setTimeout(() => {
      egg.remove();
    }, 1500);

    setTimeout(() => {
      if (score < 10) createEgg(); // No crear nuevos huevos después de ganar
    }, 500);
  });
}

// Reiniciar juego
function resetGame() {
  score = 0;
  scoreElement.textContent = score;
  congratsElement.style.display = 'none';

  // Limpiar los huevos restantes
  document.querySelectorAll('.egg').forEach(egg => egg.remove());

  // Crear nuevos huevos
  startGame();
}

// Crear múltiples huevos al iniciar
function startGame() {
  for (let i = 0; i < 5; i++) { // Cambia el número para más huevos
    createEgg();
  }
}

startGame();