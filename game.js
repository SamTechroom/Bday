const output = document.getElementById("puzzle-output");
const input = document.getElementById("puzzle-input");

// --- ENHANCED & REORDERED PUZZLE GAME SECTION ---
// 1. Progress bar at the top
// 2. Puzzle question/output
// 3. Input box
// 4. Hint and Restart buttons in a row below input
// 5. Clean, modern button styles

// Remove old buttons if they exist (for hot reloads)
if (document.getElementById('puzzle-progress')) document.getElementById('puzzle-progress').remove();
if (document.getElementById('puzzle-hint-btn')) document.getElementById('puzzle-hint-btn').remove();
if (document.getElementById('puzzle-restart-btn')) document.getElementById('puzzle-restart-btn').remove();
if (document.getElementById('puzzle-btn-row')) document.getElementById('puzzle-btn-row').remove();

// Progress bar
const progress = document.createElement('div');
progress.id = 'puzzle-progress';
progress.style.margin = '0 0 1rem 0';
progress.style.fontWeight = 'bold';
progress.style.letterSpacing = '1px';
progress.style.fontSize = '1.1rem';
output.parentNode.insertBefore(progress, output);

// Input box comes after output (already in HTML)

// Button row
const btnRow = document.createElement('div');
btnRow.id = 'puzzle-btn-row';
btnRow.style.display = 'flex';
btnRow.style.justifyContent = 'center';
btnRow.style.gap = '1rem';
btnRow.style.marginTop = '1rem';
input.parentNode.insertBefore(btnRow, input.nextSibling);

// Hint button
const hintBtn = document.createElement('button');
hintBtn.id = 'puzzle-hint-btn';
hintBtn.innerText = 'Show Hint';
hintBtn.style.padding = '0.6rem 1.5rem';
hintBtn.style.borderRadius = '20px';
hintBtn.style.border = 'none';
hintBtn.style.background = '#3a8dde';
hintBtn.style.color = '#fff';
hintBtn.style.fontWeight = 'bold';
hintBtn.style.cursor = 'pointer';
hintBtn.style.fontSize = '1rem';
hintBtn.style.transition = 'background 0.2s';
hintBtn.style.display = 'inline-block';
btnRow.appendChild(hintBtn);

// Restart button
const restartBtn = document.createElement('button');
restartBtn.id = 'puzzle-restart-btn';
restartBtn.innerText = 'Restart';
restartBtn.style.padding = '0.6rem 1.5rem';
restartBtn.style.borderRadius = '20px';
restartBtn.style.border = 'none';
restartBtn.style.background = '#ff5e62';
restartBtn.style.color = '#fff';
restartBtn.style.fontWeight = 'bold';
restartBtn.style.cursor = 'pointer';
restartBtn.style.fontSize = '1rem';
restartBtn.style.transition = 'background 0.2s';
restartBtn.style.display = 'none';
btnRow.appendChild(restartBtn);

const levels = [
  {
    question: "Whats my name?",
    answer: "Sam",
    hint: "idk, it's a common name."
  },
  {
    question: "First alphabet of my name?",
    answer: "s",
    hint: "It's the 19th letter of the alphabet."
  },
  {
    question: "Second alphabet of my name?",
    answer: "a",
    hint: "It's the first letter of the alphabet."
  }
];

let currentLevel = 0;
let showingHint = false;

function updatePuzzle() {
  output.innerText = levels[currentLevel].question;
  progress.innerText = `Question ${currentLevel + 1} of ${levels.length}`;
  hintBtn.style.display = 'inline-block';
  showingHint = false;
}

function showHint() {
  if (!showingHint) {
    output.innerText += `\nHint: ${levels[currentLevel].hint}`;
    showingHint = true;
  }
}

function shakeOutput() {
  output.style.animation = 'shake 0.3s';
  setTimeout(() => { output.style.animation = ''; }, 300);
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const val = input.value.toLowerCase().trim();
    if (val === levels[currentLevel].answer) {
      currentLevel++;
      if (currentLevel < levels.length) {
        updatePuzzle();
      } else {
        output.innerText = "🎉 Congrats! You finished the game.\nHere’s your surprise gift: [Insert Your Heartfelt Message or Video Link]";
        progress.innerText = '';
        input.style.display = "none";
        hintBtn.style.display = 'none';
        restartBtn.style.display = 'inline-block';
      }
    } else {
      output.innerText += `\nWrong answer. Try again.`;
      shakeOutput();
    }
    input.value = "";
  }
});

hintBtn.addEventListener('click', showHint);

restartBtn.addEventListener('click', function () {
  currentLevel = 0;
  input.style.display = '';
  restartBtn.style.display = 'none';
  updatePuzzle();
});

updatePuzzle();

// Confetti animation
function createConfettiPiece() {
  const confetti = document.createElement('div');
  confetti.className = 'confetti-piece';
  confetti.style.position = 'absolute';
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.top = '-20px';
  confetti.style.width = confetti.style.height = Math.random() * 8 + 8 + 'px';
  confetti.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
  confetti.style.opacity = Math.random() * 0.5 + 0.5;
  confetti.style.borderRadius = '50%';
  confetti.style.zIndex = 1000;
  confetti.style.transition = 'top 2.5s linear';
  document.getElementById('confetti').appendChild(confetti);
  setTimeout(() => {
    confetti.style.top = '100vh';
  }, 10);
  setTimeout(() => {
    confetti.remove();
  }, 2600);
}
function launchConfettiBurst(count = 50) {
  for (let i = 0; i < count; i++) {
    setTimeout(createConfettiPiece, i * 30);
  }
}
window.addEventListener('DOMContentLoaded', () => {
  launchConfettiBurst(80);
});

// Add shake animation to CSS if not present
const style = document.createElement('style');
style.innerHTML = `@keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-8px); } 50% { transform: translateX(8px); } 75% { transform: translateX(-8px); } 100% { transform: translateX(0); } }`;
document.head.appendChild(style);

// --- Interactive Timeline Dots ---
document.querySelectorAll('.timeline li').forEach((li, idx, arr) => {
  li.addEventListener('click', function () {
    arr.forEach(el => el.classList.remove('active'));
    li.classList.add('active');
  });
});
// Optionally, activate the first dot by default:
document.querySelector('.timeline li')?.classList.add('active');
