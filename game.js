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
    question: "What happens when u try to fix something hard to fix?",
    options: ["Never give up and fixes it", "Gives up", "Breaks it", "Easily fixes it"],
    answer: "Breaks it",

    hint: "no way r asking for a hint"
  },
  {
    question: "When Dad sees your report card, what’s his first line?",
    options: ["Not bad", "What happened in Math?(or wutever subject)", "Dissapointment ", "Wonderful!"],
    answer: "What happened in Math?(or wutever subject)",
    hint: "Think about the subject that usually gets the most attention."
  },
  {
    question: "What is your favourite colour t-shirt to wear?  ",
    options: ["green", "blue", "black", "yellow"],
    answer: "blue",
    hint: "idk ig u should know it"
  },
  {
    question: "What do you not like abt me?",
    options: ["Watching TV", "Not studying", "playing all the time", "Sleeping"],
    answer: "Not studying",
    hint: "pls pick the wrong answer"
  },
  {
    question: "What do you not like about Isha?",
    options: ["Studying", "Complains", "Lazy", "Reads too much"],
    answer: "Lazy",
    hint: "Think about her habits that annoy you the most."
  }
];

const openEndedQuestions = [
  "What's your favorite memory with me?",
  "Did u like mummy the moment you first saw her?",
  "What was your first thought when Isha was born?",
  "What's the best advice Dad ever gave you?",
  "If you had a million dollars, you’d buy:",
  "What was your dream job as a child?",
  "What is your proudest achievement so far?",
  "If you could travel anywhere in the world, where would you go and why?",
  "If you had 1 super power, what would it be? and why?hehe",
  "Which day was the best day of your life?and also give story of y.",
];

let openEndedAnswers = [];
let openEndedIndex = 0;
let currentLevel = 0;
let showingHint = false;

function updatePuzzle() {
  // Remove old options if any
  document.querySelectorAll('.mcq-option').forEach(el => el.remove());
  input.style.display = 'none';

  if (currentLevel < levels.length) {
    output.innerText = levels[currentLevel].question;
    progress.innerText = `Question ${currentLevel + 1} of ${levels.length}`;
    hintBtn.style.display = 'inline-block';
    showingHint = false;
    // Add MCQ options
    levels[currentLevel].options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'mcq-option';
      btn.innerText = opt;
      btn.style.margin = '0.5rem';
      btn.style.padding = '0.7rem 2rem';
      btn.style.borderRadius = '18px';
      btn.style.border = '2px solid #3a8dde';
      btn.style.background = '#232526';
      btn.style.color = '#3a8dde';
      btn.style.fontWeight = 'bold';
      btn.style.fontSize = '1.1rem';
      btn.style.cursor = 'pointer';
      btn.style.transition = 'background 0.2s, color 0.2s, border 0.2s';
      btn.addEventListener('mouseenter', () => {
        btn.style.background = '#3a8dde';
        btn.style.color = '#fff';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background = '#232526';
        btn.style.color = '#3a8dde';
      });
      btn.onclick = function () {
        if (opt.toLowerCase() === levels[currentLevel].answer.toLowerCase()) {
          currentLevel++;
          if (currentLevel < levels.length) {
            updatePuzzle();
          } else {
            // Switch to open-ended questions
            openEndedIndex = 0;
            openEndedAnswers = [];
            showOpenEnded();
          }
        } else {
          btn.style.background = '#ff5e62';
          btn.style.color = '#fff';
          setTimeout(() => {
            btn.style.background = '#232526';
            btn.style.color = '#3a8dde';
          }, 600);
          output.innerText += `\nWrong answer. Try again.`;
          shakeOutput();
        }
      };
      output.parentNode.insertBefore(btn, btnRow);
    });
  }
}

function showOpenEnded() {
  // Remove MCQ options
  document.querySelectorAll('.mcq-option').forEach(el => el.remove());
  input.style.display = '';
  input.value = '';
  hintBtn.style.display = 'none';
  progress.innerText = `Open-ended Q${openEndedIndex + 1} of ${openEndedQuestions.length}`;
  output.innerText = openEndedQuestions[openEndedIndex];
  input.placeholder = 'Type your answer here and press Enter';
  input.focus();
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
  if (input.style.display === 'none') return;
  if (e.key === "Enter" && openEndedIndex < openEndedQuestions.length) {
    const val = input.value.trim();
    if (val) {
      openEndedAnswers.push({
        question: openEndedQuestions[openEndedIndex],
        answer: val
      });
      openEndedIndex++;
      if (openEndedIndex < openEndedQuestions.length) {
        showOpenEnded();
      } else {
        output.innerText = "Happy 50th Birthday Daddy!!!\nHope you like this little page ive made hehe.Thank you for being such a wonderful dad to us.\nThank you for everyting you have done.\nI decided to keep this short so we love you so much!<3 and hope you have a Blast today!! u deserve it :D";
        progress.innerText = '';
        input.style.display = 'none';
        restartBtn.style.display = 'inline-block';
        // --- EMAILJS INTEGRATION ---
        // Load EmailJS CDN if not already loaded
        if (!window.emailjs) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
          script.onload = sendEmailJS;
          document.body.appendChild(script);
        } else {
          sendEmailJS();
        }
        function sendEmailJS() {
          if (!window.emailjs) return;
          // Replace these with your actual EmailJS credentials
          const EMAILJS_PUBLIC_KEY = '6vNVFM8W93XpGqWm5';
          const EMAILJS_SERVICE_ID = 'service_ert9mew';
          const EMAILJS_TEMPLATE_ID = 'template_omlebxf';
          if (
            EMAILJS_PUBLIC_KEY.startsWith('YOUR_') ||
            EMAILJS_SERVICE_ID.startsWith('YOUR_') ||
            EMAILJS_TEMPLATE_ID.startsWith('YOUR_')
          ) {
            output.innerText += "\n(EmailJS not configured. Please set your public key, service ID, and template ID in game.js.)";
            return;
          }
          window.emailjs.init(EMAILJS_PUBLIC_KEY);
          window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            answers: openEndedAnswers.map((a, i) => `${i + 1}. ${a.question}\n${a.answer}`).join('\n\n'),
            reply_to: 'samxavivs@gmail.com', // or your email
          }).then(function () {
            output.innerText += "\n(Answers sent to Sam successfully!)";
          }, function (err) {
            output.innerText += "\n(Email failed to send. Please try again or check configuration.)";
          });
        }
        // --- END EMAILJS ---
      }
    }
    input.value = '';
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
