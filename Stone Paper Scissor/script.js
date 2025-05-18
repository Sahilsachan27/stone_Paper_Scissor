let userScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll('.choice');
const you = document.querySelector('.you-div');
const computer = document.querySelector('.computer-div');
const result = document.querySelector('.result-text');
const resetBtn = document.getElementById('reset-btn');
let winSound=new Audio("win.mp3");
let loseSound=new Audio("lose.mp3");
let drawSound=new Audio("draw.mp3");

function startShake() {
  you.style.animation = 'shake 1s linear 3';
  computer.style.animation = 'shake 1s linear 3';
}

function stopShake() {
  you.style.animation = 'none';
  computer.style.animation = 'none';
}

function updateScore(winner) {
  if (winner === 'user') {
    userScore++;
    document.getElementById('user-score').innerText = userScore;
  } else if (winner === 'computer') {
    computerScore++;
    document.getElementById('computer-score').innerText = computerScore;
  }
}

function playGame(userChoice, computerChoice) {
  // Update hand displays
  you.innerText = userChoice === 'stone' ? '👊' : userChoice === 'paper' ? '✋' : '✌️';
  computer.innerText = computerChoice === 'stone' ? '👊' : computerChoice === 'paper' ? '✋' : '✌️';

  // Game logic
  if (userChoice === computerChoice) {
    drawSound.play();
    result.innerText = 'Draw';
    result.className = 'result-text draw';
  } else if (
    (userChoice === 'stone' && computerChoice === 'scissor') ||
    (userChoice === 'paper' && computerChoice === 'stone') ||
    (userChoice === 'scissor' && computerChoice === 'paper')
  ) {
    winSound.play();
    result.innerText = 'You Win';
    result.className = 'result-text win';
    updateScore('user');
  } else {
    loseSound.play()
    result.innerText = 'You Lose';
    result.className = 'result-text lose';
    updateScore('computer');
  }
}

// Event listeners for choices
choices.forEach((choice) => {
  choice.addEventListener('click', () => {
    // Reset result display
    result.className = 'result-text';
    result.innerText = '';
    
    you.innerText = '👊';
    computer.innerText = '👊';
    winSound.pause()
    loseSound.pause()
    drawSound.pause()

    const userChoice = choice.getAttribute('id');
    const options = ['stone', 'paper', 'scissor'];
    const computerChoice = options[Math.floor(Math.random() * 3)];

    startShake();
    setTimeout(() => {
      stopShake();
      playGame(userChoice, computerChoice);
    }, 3000);
  });
});

// Reset button handler
resetBtn.addEventListener('click', () => {
  userScore = 0;
  computerScore = 0;
  document.getElementById('user-score').innerText = '0';
  document.getElementById('computer-score').innerText = '0';
  you.innerText = '👊';
  computer.innerText = '👊';
  result.innerText = '';
  result.className = 'result-text';
});