/* styles.css */
/* reset & full-viewport */
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; overflow: hidden; }

body {
  font-family: 'Comic Sans MS', cursive, sans-serif;
  background: linear-gradient(135deg, #ffe0f0 0%, #fff0e0 100%);
  color: #c2185b;
}

/* container in middle */
.container {
  position: relative;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 8px;
  width: 100%; height: 100%; text-align: center;
}

/* headline & envelope layering */
.headline { font-size: 1.4rem; z-index: 10; }
#envelope {
  background: none; border: none; cursor: pointer;
  perspective: 600px; transition: transform .3s;
  z-index: 10;
}
#envelope:hover { transform: scale(1.1) rotate(-2deg); }
#envelope:focus { outline: 2px dashed #f48fb1; }

/* clear button */
#clear-btn {
  position: absolute; bottom: 20px; right: 20px;
  padding: .5rem 1rem; border: none; background: #f48fb1; color: #fff;
  border-radius: 20px; cursor: pointer; z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,.2);
}
#clear-btn:hover { background: #e91e63; }
#clear-btn:focus { outline: 2px dashed #880e4f; }

/* notes container now full-viewport on top */
#notes {
  position: fixed;    /* cover entire screen */
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none; /* clicks pass through */
  z-index: 9999;        /* above everything */
}

/* each sticky note */
.note {
  position: absolute;
  width: 140px; padding: .6rem;
  background: #fffaf0;
  border: 1px solid #ffd180;
  border-left: 3px solid #ffb74d;
  border-top: 3px solid #ffb74d;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  font-family: 'Courier New', monospace;
  font-size: .8rem; line-height: 1.2;
  transform: rotate(var(--rotate,0deg));
  animation: stickFadeIn .5s ease-out;
  z-index: 10000;       /* above notes layer */
  pointer-events: auto; /* allow interacting */
}
.note::before {
  content: '';
  position: absolute; top: 0; right: 0;
  border-width: 0 12px 12px 0;
  border-style: solid;
  border-color: transparent #ffe0b2 transparent transparent;
}
@keyframes stickFadeIn {
  from { opacity: 0; transform: scale(0.5); }
  to   { opacity: 1; transform: scale(1); }
}

/* image inside note */
.note-img {
  display: block;
  max-width: 100%; height: auto;
  margin-bottom: .4rem;
  border-radius: 4px;
}

/* Heart burst */
.heart {
  position: absolute; width: 18px; height: 18px;
  background: #f06292; transform: rotate(45deg);
  animation: flyUp 1s ease-out forwards;
}
.heart::before, .heart::after {
  content: ''; position: absolute;
  width: 18px; height: 18px;
  background: #f06292; border-radius: 50%;
}
.heart::before { top: -9px; left: 0; }
.heart::after  { left: 9px; top: 0; }
@keyframes flyUp {
  to { transform: translateY(-150px) scale(0); opacity: 0; }
}

/* Floating background hearts */
.container::before {
  content: '💕';
  position: absolute;
  font-size: 2rem;
  opacity: 0.2;
  animation: floatHearts 6s infinite ease-in-out;
}
@keyframes floatHearts {
  0%   { transform: translate(-50vw, 50vh) rotate(0deg); opacity: 0.1; }
  50%  { opacity: 0.3; }
  100% { transform: translate(50vw, -50vh) rotate(360deg); opacity: 0.1; }
}

/* Flying message text */
.message {
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem; font-weight: bold; color: #880e4f;
  animation: slideOut 1.5s ease-in-out forwards;
}
@keyframes slideOut {
  0%   { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
  30%  { opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(1) rotate(var(--r,0deg)); opacity: 0; }
}

/* Envelope animations */
@keyframes envelopePop { 0%{transform:scale(1)}50%{transform:scale(1.3)}100%{transform:scale(1)} }
@keyframes flapOpen   { 0%{transform:rotateX(0deg)}50%{transform:rotateX(-60deg)}100%{transform:rotateX(0deg)} }
.animate-envelope svg   { animation: envelopePop .8s ease-out; }
.animate-envelope .flap { transform-origin: top center; animation: flapOpen 1.2s ease-out; }
