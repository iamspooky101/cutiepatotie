// script.js
const items = [
  { img: '', text: 'I love how you sometimes say “hey cutie” 💖' },
  { img: 'stickers/gn', text: 'I love how you spend time making those stickers that say “goodnight” and “IMY” 🌙✨' },
  { img: '', text: 'I love how you always fall asleep during movies 🎬😴' },
  { img: '', text: 'I love how you use random numbers to laugh, like “5454354325435345” 🤣' },
  { img: '', text: 'I love how cute you are, even when you’re far away 🌏💕' },
  { img: '', text: 'I love when you tell me about your day ☀️🗣' },
  { img: '', text: 'I love how good you are at drawing, and that you want to spend what little time you have making me that hoodie 🎨👕' },
  { img: '', text: 'I love that you spend time responding to all my TikToks 📱❤️' },
  { img: '', text: 'I love how you’re not an NPC 😂' },
  { img: '', text: 'I love when you open up to me' },
  { img: '', text: 'I love how you make me smile every second we’re on a call together 😄' },
  { img: '', text: 'I love how you always spend time making super cool stuff for me like the book, the clay animals, and the hoodie 🦖📚🧸' },
  { img: '', text: 'I love how we text all day and never run out of things to say 📱✨' },
  { img: 'stickers/cutie.jpg', text: 'I love how CUTIEEEE you are ૮ ˶ᵔ ᵕ ᵔ˶ ა 💕' },
  { img: 'stickers/handsome.jpg', text: 'I love how handsome you are 😍👌' },
  { img: 'stickers/finger.jpg', text: 'I love how you make all those random things ❤️❤️' },
  { img: 'stickers/image4.jpg', text: 'I love how good it feels to hug you 🤗❤️' },
  { img: '', text: 'I love how i love you ˃ ᵕ ་ ˂ 💗' },
  { img: '', text: 'I love when you send me voice messagesヽ(´▽｀)ノ' },
  { img: 'stickers/sleep', text: 'I love how cute you are when you got to sleep' },
  { img: 'stickers/nerdy.jpg', text: 'I love how nerdy you are 🤓📚' },
  { img: 'stickers/goodmorning.jpg', text: 'I love when you text me “good morning” ☀️💛' },
  { img: 'cake.jpg', text: 'I love how creative you are 🎨🌟' },
  { img: 'stickers/arr.jpg', text: 'I love being around you 🥰' },
  { img: 'stickers/flowers.jpg', text: 'I love the flowers you made me(=^･ω･^=)' },
  { img: '', text: 'I love watching romcoms with you＼(＾▽＾)／' },
  { img: '', text: 'I love how you rizzed me (*^‿^*)' }
];

document.addEventListener('DOMContentLoaded', () => {
  const envelope   = document.getElementById('envelope');
  const clearBtn   = document.getElementById('clear-btn');
  const notes      = document.getElementById('notes');
  const header     = document.querySelector('.headline');
  const bgMusic    = document.getElementById('bg-music');
  const clickSfx   = document.getElementById('click-sfx');
  let remaining    = items.slice();
  let musicStarted = false;

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

  function intersects(r1, r2) {
    return !(
      r2.left > r1.right ||
      r2.right < r1.left ||
      r2.top > r1.bottom ||
      r2.bottom < r1.top
    );
  }

  function handleLove() {
    // click SFX
    clickSfx.currentTime = 0;
    clickSfx.play().catch(() => {});

    // background music 
    if (!musicStarted) {
      bgMusic.play().catch(() => {});
      musicStarted = true;
    }

    if (!remaining.length) return;

    envelope.classList.add('animate-envelope');
    setTimeout(() => envelope.classList.remove('animate-envelope'), 1000);
    const er = envelope.getBoundingClientRect();
    burstHearts(er.left + er.width/2, er.top + er.height/2);

    const i = Math.floor(Math.random() * remaining.length);
    const { img, text } = remaining.splice(i, 1)[0];

    // flying message
    const flyer = document.createElement('div');
    flyer.classList.add('message');
    flyer.textContent = text;
    document.body.appendChild(flyer);
    const dx = (Math.random() - 0.5) * window.innerWidth;
    const dy = (Math.random() - 0.5) * (window.innerHeight - header.getBoundingClientRect().bottom);
    const r  = (Math.random() - 0.5) * 30;
    flyer.style.setProperty('--dx', `${dx}px`);
    flyer.style.setProperty('--dy', `${dy}px`);
    flyer.style.setProperty('--r',  `${r}deg`);
    setTimeout(() => flyer.remove(), 1500);

    // sticky note
    setTimeout(() => {
      const note = document.createElement('div');
      note.classList.add('note');
      note.style.visibility = 'hidden';
      notes.appendChild(note);

      if (img) {
        const imgEl = new Image();
        imgEl.crossOrigin = 'anonymous';
        imgEl.classList.add('note-img');
        imgEl.onload  = () => finalize(imgEl);
        imgEl.onerror = () => finalize(null);
        imgEl.src     = img;
      } else {
        finalize(null);
      }

      function finalize(imgEl) {
        if (imgEl) note.appendChild(imgEl);
        const p = document.createElement('p');
        p.textContent = text;
        note.appendChild(p);

        const W = note.offsetWidth, H = note.offsetHeight;
        const blockers = [
          header.getBoundingClientRect(),
          envelope.getBoundingClientRect(),
          clearBtn.getBoundingClientRect()
        ];
        let x, y, rNote;
        do {
          x = Math.random() * (window.innerWidth - W);
          y = Math.random() * (window.innerHeight - H);
          rNote = { left:x, right:x+W, top:y, bottom:y+H };
        } while (blockers.some(b => intersects(rNote, b)));

        note.style.left       = `${x}px`;
        note.style.top        = `${y}px`;
        note.style.visibility = 'visible';
      }
    }, 1600);
  }

  envelope.addEventListener('click', handleLove);
  envelope.addEventListener('keydown', e => {
    if (e.key==='Enter' || e.key===' ') {
      e.preventDefault();
      handleLove();
    }
  });

  clearBtn.addEventListener('click', () => notes.innerHTML = '');
});
