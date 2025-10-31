// === PIXEL ANIMASI BERGERAK DENGAN FADE-IN, PARALLAX, DAN ARAH BERBEDA ===
const DPR = window.devicePixelRatio || 1;

// Pola font 5x7
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

const pixelConfig = {
  text: "FAKULTAS, MIPA, UNTAN.",
  pixelSize: 5,
  spacing: 2,
  charSpacing: 10,
  grey: {r:180,g:180,b:180},
  colors: [
    {r:0,g:0,b:255},
    {r:237,g:103,b:255},
    {r:252,g:252,b:2},
    {r:107,g:202,b:9}
  ]
};

function randomColor(colors){return colors[Math.floor(Math.random()*colors.length)];}
function lerp(a,b,t){return a+(b-a)*t;}

// === Generate pixel dari teks ===
function generatePixels(text, cfg){
  let offsetX = 0;
  const pixels = [];
  for(const ch of text){
    const pattern = fontMap[ch] || fontMap[' '];
    pattern.forEach((row,y)=>{
      row.split('').forEach((v,x)=>{
        if(v==='1'){
          pixels.push({
            x:offsetX+x*(cfg.pixelSize+cfg.spacing),
            y:y*(cfg.pixelSize+cfg.spacing),
            color:{...cfg.grey}, target:{...cfg.grey}, timer:0, alpha:0
          });
        }
      });
    });
    offsetX += 5*(cfg.pixelSize+cfg.spacing)+cfg.charSpacing;
  }
  return pixels;
}

// === Inisialisasi dua kanvas animasi ===
initPixelCanvas("pixel-top", "left-to-right");
initPixelCanvas("pixel-footer", "right-to-left");

function initPixelCanvas(canvasId, direction="left-to-right"){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas(){
    canvas.width = canvas.clientWidth * DPR;
    canvas.height = canvas.clientHeight * DPR;
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const pixels = generatePixels(pixelConfig.text, pixelConfig);
  const totalWidth = pixels[pixels.length-1].x + 150;
  let scroll = 0;
  const baseSpeed = (direction === "left-to-right") ? 0.4 : -0.4;
  let currentSpeed = baseSpeed;
  let fadeIn = 0; // untuk efek muncul perlahan

  // Efek saat scroll: cepat lalu melambat
  window.addEventListener('scroll', ()=>{
    currentSpeed = baseSpeed * 4;
    setTimeout(()=>{ currentSpeed = baseSpeed; }, 600);
  });

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const centerY = canvas.height/2 - 20;

    // Fade in perlahan
    if(fadeIn < 1) fadeIn = Math.min(1, fadeIn + 0.01);

    for(let rep=-1; rep<=1; rep++){ // buat 3 repetisi agar aman arah negatif
      for(const p of pixels){
        p.color.r = lerp(p.color.r, p.target.r, 0.05);
        p.color.g = lerp(p.color.g, p.target.g, 0.05);
        p.color.b = lerp(p.color.b, p.target.b, 0.05);
        if(p.timer>0){ p.timer -= 0.02; if(p.timer<=0) p.target = {...pixelConfig.grey}; }

        let x;
        if(direction === "left-to-right") {
          x = (p.x + scroll + rep * totalWidth) % (totalWidth * 2);
        } else {
          x = ((p.x + scroll + rep * totalWidth) % (totalWidth * 2));
          if (x < -150) x += totalWidth * 2; // pastikan wrap untuk arah kanan->kiri
        }

        const y = centerY + p.y;
        ctx.globalAlpha = fadeIn;
        ctx.fillStyle = `rgb(${p.color.r},${p.color.g},${p.color.b})`;
        ctx.fillRect(x, y, pixelConfig.pixelSize, pixelConfig.pixelSize);
      }
    }

    scroll += currentSpeed;
    currentSpeed = lerp(currentSpeed, baseSpeed, 0.05);
    requestAnimationFrame(draw);
  }

  // Efek interaktif mouse
  canvas.addEventListener('mousemove', e=>{
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const centerY = canvas.height/2 - 20;
    for(const p of pixels){
      const vx = (p.x + scroll) % totalWidth;
      const vy = centerY + p.y;
      const dx = mx - vx, dy = my - vy;
      if(dx*dx + dy*dy < 350){
        p.target = randomColor(pixelConfig.colors);
        p.timer = 1.5;
      }
    }
  });

  draw();
}
