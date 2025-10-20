/* v21 — requested copy & logic */
const SETTINGS={herName:"Belle:3",myName:"Pink Niple",sinceText:"Written on {today}",reasons: [
  "I love your smile",
  "I love holding hands with you",
  "I love how you make boring days feel special",
  "I love how you always find a way to make me smile",
  "I love the long calls with you",
  "I love your selfies (yes, the beard-filter ones)",
  "I love your voice",
  "I love how we can talk about anything for hours",
  "I love how you listen to me without judging",
  "I love going on movie dates with youuuu",
  "I love your eyes",
  "I love how you make me excited to wake up each day",
  "I love watching movies with you",
  "I love how you randomly send me cute pictures of yourself",
  "I love how you make even texting feel special",
  "I love your cute little necklace that says \"Belle\"",
  "I love your morning \"gm\" texts",
  "I love your laugh",
  "I love when you get excited to tell me something",
  "I love how you remember the little things I tell you",
  "I love your cute tongue-out face",
  "I love how you make the distance feel worth it",
  "I love how we can be silly together with no embarrassment",
  "I love when you send me songs",
  "I love how you bring out the best in me",
  "I love your kindness",
  "I love how you make me feel lucky every single day",
  "I love when we stay up late just talking",
  "I love how you choose me again and again",
  "I love your hair",
  "I love when you send me voice messages",
  "I love when you tell me all about your day",
  "I love how you texted me first",
  "I love your night \"gn\" texts",
  "I love when you give me gifts",
  "I love the warmth you give me",
  "I love how you turn my mood around so quickly",
  "I love how you let me be myself",
  "I love how you make everything feel so comfortable and easy",
  "I love how you make me laugh even through text",
  "I love your smile in selfies",
  "I love how you always make me feel like I matter",
  "I love how you understand my sense of humor",
  "I love your beautiful eyes",
  "I love when you make those cute \"GN\" and \"ily\" stickers",
  "I love how you call me cute even when I look like a mess",
  "I love how you make time for me",
  "I love walking next to you",
  "I love how much I love you",
  "I love how you share your snacks",
  "I love how you look forward to every message from me",
  "I love how we can have fun doing absolutely nothing together",
  "I love how you remember tiny details I’ve forgotten",
  "I love your laugh when you try not to laugh",
  "I love how you make me feel like I’m never alone",
  "I love when you’re happy",
  "I love when you take photos of us",
  "I love building Lego with youuu",
  "I love how you make me feel cared for",
  "I love your energy when you’re excited",
  "I love how you laugh at my dumb jokes",
  "I love how we stay close no matter what",
  "I love when you talk about your dreams",
  "I love how you make the little things feel magical",
  "I love when you look at me with that smile",
  "I love how you make everything feel right",
  "I love everything about you"
]};
function formatToday(){const d=new Date();return d.toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'})}
function bindBasics(){const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();const s=document.getElementById('since');if(s)s.textContent=SETTINGS.sinceText.replace("{today}",formatToday())}

// Delays
const STEP_DELAY = 1000;      // ms between steps so the hint can be read
const YES_PAUSE  = 1600;      // ms pause on final YES before hearts


/* ---------- TREND ---------- */
const STEPS=[
 {line:"excuse me sir, are you breathing?", options:[
   {label:"Uh yeah", ok:true, hint:"perfect ✨"},
   {label:"No", ok:false, hint:"hmm… are you a ghost? 😅"}
 ]},
 {line:"hey bro, are you gay?", options:[
   {label:"Am I what? gay?", ok:true, hint:":)"},
   {label:"Yes", ok:false, hint:"ermm.... so Ayna not me....."}
 ]},
 {line:"Um no", options:[{label:"Continue", ok:true}]},
 {line:"oh, I meant GUY", options:[{label:"Guy approved ✅", ok:true}]},
 {line:"do you think I’m funny?", options:[
   {label:"Yes", ok:true, hint:"thanks erm you to!"},
   {label:"Nah, you’re cool", ok:true, hint:"cool > funny, we take those"}
 ]},
 {line:"what brand’s your microwave?", options:[
   {label:"Samsung", ok:true, hint:"great 🔥"},
   {label:"LG", ok:true, hint:"solid choice"},
   {label:"Panasonic", ok:true, hint:"perfect"},
   {label:"Whirlpool", ok:true, hint:"nice"},
   {label:"GE", ok:true, hint:"classic"},
   {label:"Bosch", ok:true, hint:"fancy"},
   {label:"Other", ok:true, hint:"hmm okay!"}
 ]},
 {line:"10/10 nostrils (would enter politely, say thank you on the way out)", options:[
   {label:"Um… thanks?", ok:true, hint:"so cute"}
 ]},
 {line:"Belle:3… will you be my girlfriend again?", options:[
   {label:"yesss ✨", ok:true, effect:"yes"},
   {label:"No 🙃", ok:true, effect:"no"}
 ]}
];

function initTrend(){
  try{
    const line=document.getElementById('line'); if(!line) return;
    const hint=document.getElementById('trendHint');
    const btns=document.getElementById('trendBtns');
    if(!hint||!btns) return;
    // step dots & typewriter
    const dotsWrap = document.getElementById('trendDots');
    const buildDots = ()=>{ if(!dotsWrap) return; dotsWrap.innerHTML=''; for(let k=0;k<STEPS.length;k++){ const d=document.createElement('i'); d.className='dot'; dotsWrap.appendChild(d); } };
    const setDots = (idx)=>{ if(!dotsWrap) return; const ds=[...dotsWrap.children]; ds.forEach((d,n)=> d.classList.toggle('active', n===idx)); };
    const typeLine = async (el, text)=>{ el.textContent=''; const chars=[...text]; for(let c of chars){ el.textContent += c; await new Promise(r=>setTimeout(r, 10)); } };

    // pretty hint helpers
    const setHint=(t)=>{ hint.textContent=t; hint.classList.remove('pop'); void hint.offsetWidth; hint.classList.add('pop'); };
    const setHintHTML=(html)=>{ hint.innerHTML=html; hint.classList.remove('pop'); void hint.offsetWidth; hint.classList.add('pop'); };
    let i=0, noClicks=0;

    function render(){
      const s=STEPS[i];
      line.textContent=s.line;
      hint.textContent="";
      btns.innerHTML="";

      s.options.forEach(opt=>{
        const b=document.createElement('button');
        b.className=(opt.effect==='yes')?'btn':'btn btn-ghost';
        b.textContent=opt.label;

        // On final step, make "No" very slippery and roaming
        if (i===STEPS.length-1 && /No/.test(opt.label)){
          btns.style.position='relative';
          btns.style.minHeight='220px';
          b.style.position='absolute';
          const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
          const place=()=>{
            const bw=b.offsetWidth||880, bh=b.offsetHeight||400;
            const W=btns.clientWidth||320, H=btns.clientHeight||220;
            const x=clamp(Math.random()*(W-bw), 0, Math.max(0,W-bw));
            const y=clamp(Math.random()*(H-bh), 0, Math.max(0,H-bh));
            b.style.left=x+'px'; b.style.top=y+'px';
          };
          const dodge=()=>{ place(); };
          place();
          b.addEventListener('pointerenter', dodge);
          b.addEventListener('pointermove', dodge);
          b.addEventListener('touchstart', (e)=>{ e.preventDefault(); dodge(); }, {passive:false});
        }

        b.addEventListener('click',()=>{
          // Final step logic
          if(i===STEPS.length-1){
            if(opt.effect==="yes"){
              setHint("i love you baebbbbbbbbebebebebebebebeb 💗");
              setTimeout(()=>{ confetti(); disableAll(); }, YES_PAUSE); Music.onEvent('finalYes');
            }else{ // "No"
              noClicks++;
              if(noClicks===1){ hint.textContent="I respect your answer and your space 💗"; }
              else if(noClicks===2){ hint.textContent="I care about you either way. If you want, you can answer again."; }
              else { hint.textContent="okay, last try — your turn :)"; btns.innerHTML=''; ["yesss ✨","No 🙃"].forEach(lbl=>{ const r=document.createElement('button'); r.className=(lbl==='yesss ✨')?'btn':'btn btn-ghost'; r.textContent=lbl; r.addEventListener('click',()=>{ if(lbl==='No 🙃'){ hint.textContent="okay, noted. still adore you."; } else { setHint("i love you baebbbbbbbbebebebebebebebeb 💗"); setTimeout(()=>{ confetti(); disableAll(); }, YES_PAUSE); Music.onEvent('finalYes'); } }); btns.appendChild(r); }); }
            }
            return;
          }

          // Earlier steps
          if(opt.ok){
            if(opt.hint) setHint(opt.hint);
            i=Math.min(i+1,STEPS.length-1); Music.onEvent('stepChange');
            setTimeout(render,STEP_DELAY);
          }else{
            setHint(opt.hint||"Try the other one 😅");
            wiggle(b);
          }
        });

        btns.appendChild(b);
      });
    }

    function wiggle(el){ el.animate([{transform:'translateX(0)'},{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],{duration:280}); }
    function disableAll(){ btns.querySelectorAll('button').forEach(x=>x.disabled=true); }

    render();
  }catch(e){/* ignore */}
}

/* ---------- REASONS ---------- */
function buildReasons(){try{ const list=document.getElementById('reasonsList'); if(!list) return;
  let arr=(SETTINGS&&Array.isArray(SETTINGS.reasons))?SETTINGS.reasons:[]; if(!arr||arr.length===0) arr=Array.from({length:100},(_,i)=>`Reason #${i+1} — because you’re wonderfully you.`);
  const frag=document.createDocumentFragment();
  arr.forEach((txt,i)=>{ const li=document.createElement('li'); const inner=document.createElement('div'); inner.className='card-inner';
    const front=document.createElement('div'); front.className='face front'; front.innerHTML = `<span class="card-num">${i+1}</span>`;
    const back=document.createElement('div'); back.className='face back'; back.textContent=txt;
    inner.appendChild(front); inner.appendChild(back); li.appendChild(inner);
    li.addEventListener('click',()=> { li.classList.toggle('flipped'); window.__flipCount=(window.__flipCount||0)+1; if(window.__flipCount%10===0) Music.onEvent('reasons10'); }); frag.appendChild(li);
  });
  list.appendChild(frag);
  const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.12});
  document.querySelectorAll('#reasonsList li').forEach(li=>io.observe(li));
  window.addEventListener('scroll',updateProgress); updateProgress();
}catch(e){ const box=document.getElementById('errorBox'); if(box){ box.style.display='block'; box.textContent='Could not load reasons: '+e.message; } }}

function updateProgress(){ const grid=document.querySelector('.section-reasons'); const bar=document.getElementById('progress'); if(!grid||!bar)return; const r=grid.getBoundingClientRect(); const tot=r.height-window.innerHeight; const sc=Math.min(Math.max(0,-r.top),tot); bar.style.width=(tot>0?(sc/tot)*100:0)+'%'; }

/* ---------- Effects ---------- */
function confetti(){const n=140;for(let i=0;i<n;i++){const d=document.createElement('i');d.style.position='fixed';d.style.left=Math.random()*100+'vw';d.style.top='-10px';d.style.width=d.style.height=(4+Math.random()*6)+'px';d.style.background='hsl('+(Math.random()*360)+',90%,70%)';d.style.borderRadius='50%';d.style.pointerEvents='none';d.style.zIndex=999;document.body.appendChild(d);const fall=900+Math.random()*1400;d.animate([{transform:'translateY(0)'},{transform:'translateY('+(window.innerHeight+40)+'px)'}],{duration:fall,easing:'cubic-bezier(.2,.8,.2,1)',iterations:1}).onfinish=()=>d.remove()}}

/* ---------- MUSIC (background-only) ---------- */
const Music = (()=>{
  let audio = null;
  let playlist = [];
  let i = 0;
  let isReady = false;
  let userInteracted = false;

  function resolve(src){ try{ return new URL(src, location.href).toString(); } catch{ return src; } }
  function current(){ return playlist[i] || null; }

  function ensureSrc(){
    const c = current(); if(!c) return false;
    const url = resolve(c.src);
    if (audio.src !== url) audio.src = url;
    return true;
  }

  function play(){
    if(!isReady || !audio) return;
    if(!ensureSrc()) return;
    audio.play().catch(()=>{ /* waits for first gesture */ });
  }

  function next(){
    if(!playlist.length) return;
    i = (i + 1) % playlist.length;
    play();
  }

  function unlock(){
    userInteracted = true;
    if (isReady) play();
  }

  function load(){
    audio = new Audio();
    audio.preload = 'auto';
    audio.volume = 0.7;          // set your background volume here
    audio.addEventListener('ended', next);

    // autoplay after the first gesture anywhere on the page
    ['pointerdown','keydown','touchstart'].forEach(ev=>{
      document.addEventListener(ev, unlock, { once:true, passive:true, capture:true });
    });

    // try to load a playlist.json, otherwise fall back to hardcoded files
    const jsonURL = 'assets/music/playlist.json';
    fetch(jsonURL)
      .then(r=>{ if(!r.ok) throw new Error('no playlist'); return r.json(); })
      .then(data=>{
        const tracks = Array.isArray(data?.tracks) ? data.tracks : [];
        if (!tracks.length) throw new Error('empty playlist');
        playlist = tracks;
        isReady = true;
        if (userInteracted) play();
      })
      .catch(()=>{
        // Fallback: edit these paths to your real files
        playlist = [
          { src: 'assets/music/song1.mp3', title: 'Song 1' },
          { src: 'assets/music/song2.mp3', title: 'Song 2' }
        ];
        isReady = true;
        if (userInteracted) play();
      });
  }

  // stays for compatibility with your existing calls; does nothing visible
  function onEvent(kind){
    if(kind === 'finalYes' && userInteracted && audio?.paused) play();
  }

  return { load, onEvent };
})();

// keep this at the bottom of your script
window.addEventListener('DOMContentLoaded', ()=>{
  bindBasics();
  buildReasons();
  initTrend();
  Music.load();    // background music, no UI
});
