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

// Parallel array of image URLs (one per message).  
// Replace these with your own image paths.
const images = [
  'https://cdn.discordapp.com/attachments/1012075816047366267/1397680956055486595/image.jpg?ex=68834413&is=6881f293&hm=62479c9e02d4355cfd2ad3832a631c1abb44627b0c2b5bde21d3fd782d6c9ff2&',
  'https://cdn.discordapp.com/attachments/1012075816047366267/1397680955891908608/image.jpg?ex=68834413&is=6881f293&hm=74b4d71cef1cf34bbcc7fc9c997d12b5648700fe5dc85a2ab4d4b6645921de41&',
  'stickers/movie.png',
  'stickers/numbers.png',
  'stickers/faraway.png',
  'stickers/day.png',
  'stickers/drawing.png',
  'stickers/tiktok.png',
  'stickers/notnpc.png',
  'stickers/openup.png',
  'stickers/smile.png',
  'stickers/coolstuff.png',
  'stickers/texts.png'
];

// DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const notes    = document.getElementById('notes');
  const clearBtn = document.getElementById('clear-btn');
  const header   = document.querySelector('.headline');

  function burstHearts(x, y) {
    for (let i = 0; i < 10; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.style.left = `${x}px`;
      heart.style.top  = `${y}px`;
      document.body.appendChild(heart);
      const dx = (Math.random() - 0.5) * 200;
      const dy = (Math.random() - 0.5) * 200;
      setTimeout(() => {
        heart.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
        heart.style.opacity   = '0';
      }, 20);
      setTimeout(() => heart.remove(), 1020);
    }
  }

  function handleLove() {
    envelope.classList.add('animate-envelope');
    setTimeout(() => envelope.classList.remove('animate-envelope'), 1000);

    const rect   = envelope.getBoundingClientRect();
    const startX = rect.left + rect.width  / 2;
    const startY = rect.top  + rect.height / 2;

    // Heart burst
    burstHearts(startX, startY);

    // Flying message
    const idx   = Math.floor(Math.random() * messages.length);
    const msg   = messages[idx];
    const flyer = document.createElement('div');
    flyer.classList.add('message');
    flyer.textContent = msg;
    document.body.appendChild(flyer);

    const dx = (Math.random() - 0.5) * window.innerWidth;
    const dy = (Math.random() - 0.5) * (window.innerHeight - header.getBoundingClientRect().bottom);
    const r  = (Math.random() - 0.5) * 30;
    flyer.style.setProperty('--dx', `${dx}px`);
    flyer.style.setProperty('--dy', `${dy}px`);
    flyer.style.setProperty('--r',  `${r}deg`);

    setTimeout(() => {
      flyer.remove();

      // Stick note at a random position below the header, with image
      const note     = document.createElement('div');
      note.classList.add('note');
      const imgUrl   = images[idx];
      note.innerHTML = `
        ${imgUrl ? `<img src="${imgUrl}" class="note-img" alt="">` : ''}
        <p>${msg}</p>
      `;

      const NOTE_W = 140, NOTE_H = 60;
      const minY   = header.getBoundingClientRect().bottom;
      const maxX   = window.innerWidth  - NOTE_W;
      const maxY   = window.innerHeight - NOTE_H;
      const x      = Math.random() * maxX;
      const y      = minY + Math.random() * (maxY - minY);
      const rot    = (Math.random() - 0.5) * 30;

      note.style.left = `${x}px`;
      note.style.top  = `${y}px`;
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
