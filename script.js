// Array of cute messages
const messages = [
  'I love how you sometimes say "hey cutie"',
  'I love how you spend time making those stickers that say "goodnight" and "imy"',
  'I love how you always fall asleep during movies',
  'I love how you use random numbers to laugh, like "5454354325435345"',
  'I love how cutie patootie you are, even so far away',
  'I love when you tell me about your day',
  'I love how good you are at drawing and that you want to spend what little time you have making me that hoodie',
  'I love that you spend time responding to all my TikToks',
  'I love how not NPC you are',
  'I love when you open up to me',
  'I love how you make me smile every second we are on a call together',
  'I love how you always spend time making super cool stuff for me like the book, the clay animals, and the hooooddiiieee',
  'I love how your texts instantly make my day better'
];


// DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const notes = document.getElementById('notes');
  const clearBtn = document.getElementById('clear-btn');
  const header = document.querySelector('.headline');

  function burstHearts(x, y) {
    for (let i = 0; i < 10; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      document.body.appendChild(heart);
      const dx = (Math.random() - 0.5) * 200;
      const dy = (Math.random() - 0.5) * 200;
      setTimeout(() => {
        heart.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
        heart.style.opacity = '0';
      }, 20);
      setTimeout(() => heart.remove(), 1020);
    }
  }

  function handleLove() {
    envelope.classList.add('animate-envelope');
    setTimeout(() => envelope.classList.remove('animate-envelope'), 1000);

    const rect = envelope.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    // Heart burst
    burstHearts(startX, startY);

    // Flying message
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const flyer = document.createElement('div');
    flyer.classList.add('message');
    flyer.textContent = msg;
    document.body.appendChild(flyer);

    const dx = (Math.random() - 0.5) * window.innerWidth;
    const dy = (Math.random() - 0.5) * (window.innerHeight - header.getBoundingClientRect().bottom);
    const r = (Math.random() - 0.5) * 30;
    flyer.style.setProperty('--dx', `${dx}px`);
    flyer.style.setProperty('--dy', `${dy}px`);
    flyer.style.setProperty('--r', `${r}deg`);

    setTimeout(() => {
      flyer.remove();
      // Stick note at a truly random position within full screen below header
      const note = document.createElement('div');
      note.classList.add('note');
      note.textContent = msg;
      const NOTE_WIDTH = 140;
      const NOTE_HEIGHT = 60;
      const minY = header.getBoundingClientRect().bottom;
      const maxX = window.innerWidth - NOTE_WIDTH;
      const maxY = window.innerHeight - NOTE_HEIGHT;
      const noteX = Math.random() * maxX;
      const noteY = minY + Math.random() * (maxY - minY);
      note.style.left = `${noteX}px`;
      note.style.top = `${noteY}px`;
      const rot = (Math.random() - 0.5) * 30;
      note.style.setProperty('--rotate', `${rot}deg`);
      notes.appendChild(note);
    }, 1500);
  }

  envelope.addEventListener('click', handleLove);
  envelope.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLove();
    }
  });

  clearBtn.addEventListener('click', () => notes.innerHTML = '');
});
