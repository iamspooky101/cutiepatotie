// Pair each image with its exact text:
const items = [
  { img:'stickers/cutie1.png',     text:'I love how you sometimes say "hey cutie"' },
  { img:'stickers/goodnight.png',  text:'I love how you spend time making those stickers that say "goodnight" and "imy"' },
  { img:'stickers/movie.png',      text:'I love how you always fall asleep during movies' },
  { img:'stickers/numbers.png',    text:'I love how you use random numbers to laugh, like "5454354325435345"' },
  { img:'stickers/faraway.png',    text:'I love how cutie patootie you are, even so far away' },
  { img:'stickers/day.png',        text:'I love when you tell me about your day' },
  { img:'stickers/drawing.png',    text:'I love how good you are at drawing and that you want to spend what little time you have making me that hoodie' },
  { img:'stickers/tiktok.png',     text:'I love that you spend time responding to all my TikToks' },
  { img:'stickers/notnpc.png',     text:'I love how not NPC you are' },
  { img:'stickers/openup.png',     text:'I love when you open up to me' },
  { img:'stickers/smile.png',      text:'I love how you make me smile every second we are on a call together' },
  { img:'stickers/coolstuff.png',  text:'I love how you always spend time making super cool stuff for me like the book, the clay animals, and the hooooddiiieee' },
  { img:'stickers/texts.png',      text:'I love how your texts instantly make my day better' }
];

document.addEventListener('DOMContentLoaded', ()=>{
  const envelope = document.getElementById('envelope');
  const clearBtn = document.getElementById('clear-btn');
  const notes    = document.getElementById('notes');
  const header   = document.querySelector('.headline');

  function burstHearts(x,y){
    for(let i=0;i<10;i++){
      const heart=document.createElement('div');
      heart.classList.add('heart');
      heart.style.left=`${x}px`;
      heart.style.top=`${y}px`;
      document.body.appendChild(heart);
      const dx=(Math.random()-0.5)*200;
      const dy=(Math.random()-0.5)*200;
      setTimeout(()=>{
        heart.style.transform=`translate(${dx}px,${dy}px) scale(0)`;
        heart.style.opacity='0';
      },20);
      setTimeout(()=>heart.remove(),1020);
    }
  }

  function intersects(r1,r2){
    return !(r2.left   > r1.right ||
             r2.right  < r1.left  ||
             r2.top    > r1.bottom||
             r2.bottom < r1.top);
  }

  function handleLove(){
    // Envelope pop + hearts
    envelope.classList.add('animate-envelope');
    setTimeout(()=>envelope.classList.remove('animate-envelope'),1000);
    const er= envelope.getBoundingClientRect();
    burstHearts(er.left+er.width/2, er.top+er.height/2);

    // Pick one item
    const idx = Math.floor(Math.random()*items.length);
    const {img,text}=items[idx];

    // Flying message
    const flyer=document.createElement('div');
    flyer.classList.add('message');
    flyer.textContent=text;
    document.body.appendChild(flyer);
    const dx=(Math.random()-0.5)*window.innerWidth;
    const dy=(Math.random()-0.5)*(window.innerHeight-header.getBoundingClientRect().bottom);
    const r=(Math.random()-0.5)*30;
    flyer.style.setProperty('--dx',`${dx}px`);
    flyer.style.setProperty('--dy',`${dy}px`);
    flyer.style.setProperty('--r', `${r}deg`);
    setTimeout(()=>flyer.remove(),1500);

    // After fly‑away, place sticky note avoiding header/envelope/clear-btn
    setTimeout(()=>{
      const note=document.createElement('div');
      note.classList.add('note');
      note.innerHTML=`
        ${img?`<img src="${img}" class="note-img" alt="">`:''}
        <p>${text}</p>
      `;
      // hide to measure
      note.style.visibility='hidden';
      notes.appendChild(note);
      const W=note.offsetWidth, H=note.offsetHeight;
      const rHeader=header.getBoundingClientRect();
      const rEnv=envelope.getBoundingClientRect();
      const rClear=clearBtn.getBoundingClientRect();
      let x,y;
      // loop until outside all three
      do{
        x = Math.random()*(window.innerWidth - W);
        y = Math.random()*(window.innerHeight - H);
        var rNote = {left:x, right:x+W, top:y, bottom:y+H};
      } while(
        intersects(rNote,rHeader) ||
        intersects(rNote,rEnv)    ||
        intersects(rNote,rClear)
      );
      note.style.left=`${x}px`;
      note.style.top=`${y}px`;
      note.style.visibility='visible';
    },1600);
  }

  envelope.addEventListener('click',handleLove);
  envelope.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){ e.preventDefault(); handleLove(); }
  });
  clearBtn.addEventListener('click',()=>notes.innerHTML='');
});
