// script.js
const items = [
  { img: 'stickers/cutie1.png',    text: 'I love how you sometimes say "hey cutie"' },
  { img: 'stickers/goodnight.png', text: 'I love how you spend time making those stickers that say "goodnight" and "imy"' },
  { img: 'stickers/movie.png',     text: 'I love how you always fall asleep during movies' },
  { img: 'stickers/numbers.png',   text: 'I love how you use random numbers to laugh, like "5454354325435345"' },
  { img: 'stickers/faraway.png',   text: 'I love how cutie patootie you are, even so far away' },
  { img: 'stickers/day.png',       text: 'I love when you tell me about your day' },
  { img: 'stickers/drawing.png',   text: 'I love how good you are at drawing and that you want to spend what little time you have making me that hoodie' },
  { img: 'stickers/tiktok.png',    text: 'I love that you spend time responding to all my TikToks' },
  { img: 'stickers/notnpc.png',    text: 'I love how not NPC you are' },
  { img: 'stickers/openup.png',    text: 'I love when you open up to me' },
  { img: 'stickers/smile.png',     text: 'I love how you make me smile every second we are on a call together' },
  { img: 'stickers/coolstuff.png', text: 'I love how you always spend time making super cool stuff for me like the book, the clay animals, and the hooooddiiieee' },
  { img: 'stickers/texts.png',     text: 'I love how your texts instantly make my day better' }
];

document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const notes    = document.getElementById('notes');
  const clearBtn = document.getElementById('clear-btn');
  const header   = document.querySelector('.headline');

  function burstHearts(x,y) {
    for (let i=0; i<10; i++){
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.style.left = `${x}px`;
      heart.style.top  = `${y}px`;
      document.body.appendChild(heart);
      const dx = (Math.random()-0.5)*200, dy = (Math.random()-0.5)*200;
      setTimeout(()=>{ heart.style.transform = `translate(${dx}px,${dy}px) scale(0)`; heart.style.opacity='0'; }, 20);
      setTimeout(()=>heart.remove(), 1020);
    }
  }

  function handleLove() {
    envelope.classList.add('animate-envelope');
    setTimeout(()=> envelope.classList.remove('animate-envelope'), 1000);

    const rect = envelope.getBoundingClientRect();
    burstHearts(rect.left + rect.width/2, rect.top + rect.height/2);

    const idx = Math.floor(Math.random()*items.length);
    const { img, text } = items[idx];

    // flying message
    const flyer = document.createElement('div');
    flyer.classList.add('message');
    flyer.textContent = text;
    document.body.appendChild(flyer);
    const dx = (Math.random()-0.5)*window.innerWidth;
    const dy = (Math.random()-0.5)*(window.innerHeight - header.getBoundingClientRect().bottom);
    const r  = (Math.random()-0.5)*30;
    flyer.style.setProperty('--dx', `${dx}px`);
    flyer.style.setProperty('--dy', `${dy}px`);
    flyer.style.setProperty('--r',  `${r}deg`);
    setTimeout(()=> flyer.remove(), 1500);

    // after message flies, stick the note
    setTimeout(() => {
      const note = document.createElement('div');
      note.classList.add('note');
      note.innerHTML = `
        ${img ? `<img src="${img}" class="note-img" alt="">` : ''}
        <p>${text}</p>
      `;
      const NOTE_W = 140, NOTE_H = 60;
      const x = Math.random()*(window.innerWidth - NOTE_W);
      const y = Math.random()*(window.innerHeight - NOTE_H);
      const rot = (Math.random()-0.5)*30;
      note.style.left    = `${x}px`;
      note.style.top     = `${y}px`;
      note.style.setProperty('--rotate', `${rot}deg`);
      notes.appendChild(note);
    }, 1600);
  }

  envelope.addEventListener('click', handleLove);
  envelope.addEventListener('keydown', e => {
    if (e.key==='Enter' || e.key===' ') { e.preventDefault(); handleLove(); }
  });
  clearBtn.addEventListener('click', () => notes.innerHTML = '');
});
