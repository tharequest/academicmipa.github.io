// === ANIMASI PIXEL TEKS BERGERAK ===
const canvas = document.getElementById('pixel-footer');
const ctx = canvas.getContext('2d');
const DPR = window.devicePixelRatio || 1;

function resizeCanvas() {
  canvas.width = canvas.clientWidth * DPR;
  canvas.height = canvas.clientHeight * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const fontMap = {
  'A':['01110','10001','11111','10001','10001','10001','10001'],
  'C':['01110','10001','10000','10000','10000','10001','01110'],
  'E':['11111','10000','11110','10000','10000','10000','11111'],
  'F':['11111','10000','11110','10000','10000','10000','10000'],
  'I':['11111','00100','00100','00100','00100','00100','11111'],
  'K':['10001','10010','10100','11000','10100','10010','10001'],
  'L':['10000','10000','10000','10000','10000','10000','11111'],
  'M':['10001','11011','10101','10101','10001','10001','10001'],
  'N':['10001','11001','10101','10011','10001','10001','10001'],
  'P':['11110','10001','11110','10000','10000','10000','10000'],
  'R':['11110','10001','11110','10100','10010','10001','10001'],
  'S':['01111','10000','10000','01110','00001','00001','11110'],
  'T':['11111','00100','00100','00100','00100','00100','00100'],
  'U':['10001','10001','10001','10001','10001','10001','01110'],
  ',':['00000','00000','00000','00000','00000','01100','01000'],
  '.':['00000','00000','00000','00000','00000','01100','01100'],
  ' ':['00000','00000','00000','00000','00000','00000','00000']
};

// Teks pixel yang berjalan
const text = "FAKULTAS, MIPA, UNTAN.";
const pixelSize = 5;
const spacing = 2;
const charSpacing = 10;
const grey = {r:180,g:180,b:180};
const colors = [
  {r:0,g:0,b:255},
  {r:237,g:103,b:255},
  {r:252,g:252,b:2},
  {r:107,g:202,b:9}
];

function randomColor(){return colors[Math.floor(Math.random()*colors.length)];}
function generatePixels(text){
  let offsetX = 0;
  const pixels = [];
  for(const ch of text){
    const pattern = fontMap[ch] || fontMap[' '];
    pattern.forEach((row,y)=>{
      row.split('').forEach((v,x)=>{
        if(v==='1'){
          pixels.push({x:offsetX+x*(pixelSize+spacing),y:y*(pixelSize+spacing),color:{...grey},target:{...grey},timer:0});
        }
      });
    });
    offsetX += 5*(pixelSize+spacing)+charSpacing;
  }
  return pixels;
}

const pixels = generatePixels(text);
const totalWidth = pixels[pixels.length-1].x + 100;
let scroll=0;

function lerp(a,b,t){return a+(b-a)*t;}
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const centerY = canvas.height/2 - 20;

  for(let rep=0;rep<2;rep++){
    for(const p of pixels){
      p.color.r = lerp(p.color.r,p.target.r,0.05);
      p.color.g = lerp(p.color.g,p.target.g,0.05);
      p.color.b = lerp(p.color.b,p.target.b,0.05);
      if(p.timer>0){p.timer-=0.02;if(p.timer<=0)p.target={...grey};}
      const x = (p.x+scroll+rep*totalWidth)%(totalWidth*2);
      const y = centerY+p.y;
      ctx.fillStyle=`rgb(${p.color.r},${p.color.g},${p.color.b})`;
      ctx.fillRect(x,y,pixelSize,pixelSize);
    }
  }

  scroll+=0.4;
  requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove',e=>{
  const rect=canvas.getBoundingClientRect();
  const mx=e.clientX-rect.left,my=e.clientY-rect.top;
  const centerY=canvas.height/2 - 20;
  for(const p of pixels){
    const vx=(p.x+scroll)%totalWidth,vy=centerY+p.y;
    const dx=mx-vx,dy=my-vy;
    if(dx*dx+dy*dy<2000){p.target=randomColor();p.timer=1.5;}
  }
});

draw();
