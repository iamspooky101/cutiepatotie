// Array of cute messages
const messages = [
  'You make my heart flutter!',
  'Love is in the air!',
  'Sending you hugs!',
  'You are my sunshine!',
  'My heart beats for you!'
];

// DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const notes = document.getElementById('notes');
  const clearBtn = document.getElementById('clear-btn');

  function burstHearts(x, y) {
    for (let i = 0; i < 10; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      document.body.appendChild(heart);
      const dx = (Math.random() - 0.5) * 200;
      const dy = (Math.random() - 1) * 200;
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      setTimeout(() => {
        heart.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
        heart.style.opacity = '0';
      }, 20);
      setTimeout(() => heart.remove(), 1020);
    }
  }

  function handleLove() {
    // animate envelope
    envelope.classList.add('animate-envelope');
    setTimeout(() => envelope.classList.remove('animate-envelope'), 1000);

    const rect = envelope.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    // burst hearts
    burstHearts(startX, startY);

    // flying message
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const flyer = document.createElement('div');
    flyer.classList.add('message');
    flyer.textContent = msg;
    document.body.appendChild(flyer);

    const dx = (Math.random() - 0.5) * 300;
    const dy = (Math.random() - 1) * 300;
    const r = (Math.random() - 0.5) * 30;
    flyer.style.setProperty('--dx', `${dx}px`);
    flyer.style.setProperty('--dy', `${dy}px`);
    flyer.style.setProperty('--r', `${r}deg`);

    // after animation, stick note at flyer end
    setTimeout(() => {
      flyer.remove();
      const note = document.createElement('div');
      note.classList.add('note');
      note.textContent = msg;
      // clamp within viewport
      const noteW = 140, noteH = 50;
      let noteX = startX + dx - noteW/2;
      let noteY = startY + dy - noteH/2;
      noteX = Math.max(0, Math.min(window.innerWidth - noteW, noteX));
      noteY = Math.max(0, Math.min(window.innerHeight - noteH, noteY));
      note.style.left = `${noteX}px`;
      note.style.top = `${noteY}px`;
      // rotation
      const rot = (Math.random() - 0.5) * 20;
      note.style.setProperty('--rotate', `${rot}deg`);
      notes.appendChild(note);
    }, 1500);
  }

  envelope.addEventListener('click', handleLove);
  envelope.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleLove(); }
  });

  clearBtn.addEventListener('click', () => notes.innerHTML = '');
});
