const gameArea = document.getElementById('gameArea');
const mario = document.getElementById('mario');
const obstaclesRoot = document.getElementById('obstacles');
const overlay = document.getElementById('overlay');
const btnStart = document.getElementById('btnStart');
const gameOverPanel = document.getElementById('gameOver');
const btnRestart = document.getElementById('btnRestart');
const scoreEl = document.getElementById('score');
const highEl = document.getElementById('high');
const finalScoreEl = document.getElementById('finalScore');
const bg = document.getElementById('bg');
const sJump = document.getElementById('sJump');
const sDie = document.getElementById('sDie');
const sPower = document.getElementById('sPower');

let running = false;
let jumping = false;
let jumpStart = 0;
let score = 0;
let high = Number(localStorage.getItem('marioHigh')||0);
highEl.textContent = high;
let obstacles = [];
let lastTime=0;
let spawnTimer=0;
let spawnInterval=1500;

function setMarioByScore(n){
  if(n>=11) mario.src = 'images/mario-pro.gif';
  else if(n>=6) mario.src = 'images/mario-beginner.gif';
  else mario.src = 'images/mario-starter.gif';
}

function start(){
  if(running) return;
  running=true;
  score=0;
  scoreEl.textContent=score;
  overlay.style.display='none';
  gameOverPanel.style.display='none';
  obstaclesRoot.innerHTML='';
  obstacles=[];
  spawnTimer=0;
  lastTime=performance.now();
  try{bg.currentTime=0;bg.volume=0.45;bg.play()}catch(e){}
  requestAnimationFrame(loop);
}

function spawn(){
  const t = Math.random()<0.5?'pipe':'bullet';
  const el = document.createElement('div');
  el.className='obstacle '+t;
  obstaclesRoot.appendChild(el);
  const startX = gameArea.clientWidth + 40;
  const speed = 3 + Math.random()*1.8 + score/40;
  obstacles.push({el,x:startX,speed,type:t});
}

function loop(ts){
  if(!running) return;
  const dt=ts-lastTime;
  lastTime=ts;
  spawnTimer+=dt;
  if(spawnTimer>spawnInterval){
    spawnTimer=0;
    spawn();
    spawnInterval=Math.max(800,spawnInterval-6);
  }
  for(let i=obstacles.length-1;i>=0;i--){
    const o=obstacles[i];
    o.x -= o.speed*(dt/16.67);
    o.el.style.transform = `translateX(${o.x}px)`;
    if(o.x < -220){ o.el.remove(); obstacles.splice(i,1); score++; scoreEl.textContent=score; setMarioByScore(score); continue }
    if(collide(mario,o.el)){
      die();
      return;
    }
  }
  if(jumping){
    const t = (ts-jumpStart)/1000;
    const v0 = 0.65;
    const g = 1.9;
    const y = (v0*t - 0.5*g*t*t)*420;
    const bottom = Math.max(72,72 + y);
    mario.style.bottom = bottom+'px';
    if(bottom===72 && (ts-jumpStart)>80) {
      jumping=false;
      mario.style.bottom='72px';
      if(getMarioLevel()>=11) {
        mario.classList.remove('fly');
      }
    } else {
      if(getMarioLevel()>=11) mario.classList.add('fly');
    }
  }
  requestAnimationFrame(loop);
}

function doJump(){
  if(!running) start();
  if(jumping) return;
  jumping=true;
  jumpStart=performance.now();
  try{sJump.currentTime=0;sJump.play()}catch(e){}
}

function collide(el1, el2){
  const r1 = el1.getBoundingClientRect();
  const r2 = el2.getBoundingClientRect();
  const pad=10;
  return !(r1.right-pad < r2.left+pad || r1.left+pad > r2.right-pad || r1.bottom-pad < r2.top+pad || r1.top+pad > r2.bottom-pad);
}

function die(){
  running=false;
  try{bg.pause(); bg.currentTime=0}catch(e){}
  try{sDie.currentTime=0; sDie.play()}catch(e){}
  obstacles.forEach(o=>o.el.style.animation='none');
  mario.src='images/mario-dead.png';
  finalScoreEl.textContent = score;
  gameOverPanel.style.display='block';
  if(score>high){ high=score; localStorage.setItem('marioHigh',String(high)); highEl.textContent=high; }
  setTimeout(()=>{},300);
}

function getMarioLevel(){
  if(score>=11) return 11;
  if(score>=6) return 6;
  return 1;
}

document.addEventListener('keydown',e=>{
  if(e.code==='Space' || e.code==='ArrowUp'){ e.preventDefault(); doJump() }
  if(e.code==='Enter' && !running) start();
});
gameArea.addEventListener('click',()=> doJump());
btnStart.addEventListener('click',start);
btnRestart.addEventListener('click',()=>{
  mario.src='images/mario-starter.gif';
  mario.style.bottom='72px';
  spawnInterval=1500;
  try{sPower.currentTime=0;sPower.play()}catch(e){}
  start();
});
setMarioByScore(0);
