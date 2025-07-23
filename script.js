// Array of cute messages
const messages = [
  'You make my heart flutter!',
  'Love is in the air!',
  'Sending you hugs!',
  'You are my sunshine!',
  'My heart beats for you!'
];

const envelope = document.getElementById('envelope');
const notes = document.getElementById('notes');
const clearBtn = document.getElementById('clear-btn');

// Function to create heart burst
function burstHearts(x, y) {
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    document.body.appendChild(heart);
    // random position offset
    const dx = (Math.random() - 0.5) * 200;
    const dy = (Math.random() - 1) * 200;
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
    setTimeout(() => {
      heart.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
      heart.style.opacity = '0';
    }, 20);
    // remove after animation
    setTimeout(() => heart.remove(), 1020);
  }
}

// Function to create and stick message
function stickMessage(text) {
  const note = document.createElement('div');
  note.classList.add('note');
  note.textContent = text;
  // random position in viewport
  note.style.left = Math.random() * (window.innerWidth - 150) + 'px';
  note.style.top = Math.random() * (window.innerHeight - 50) + 'px';
  notes.appendChild(note);
}

// Handler for envelope click
function handleLove(e) {
  const rect = envelope.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  burstHearts(x, y);
  // select random message
  const msg = messages[Math.floor(Math.random() * messages.length)];
  // optional flying text
  const flyer = document.createElement('div');
  flyer.classList.add('message');
  flyer.textContent = msg;
  document.body.appendChild(flyer);
  // after animation, stick as note
  setTimeout(() => {
    flyer.remove();
    stickMessage(msg);
  }, 1000);
}

envelope.addEventListener('click', handleLove);
// keyboard accessibility
envelope.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleLove();
  }
});

// Clear all notes
clearBtn.addEventListener('click', () => {
  notes.innerHTML = '';
});
