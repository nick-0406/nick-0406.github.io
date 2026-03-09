const canvas=document.createElement("canvas");
document.body.appendChild(canvas);

canvas.style.position="fixed";
canvas.style.top="0";
canvas.style.left="0";
canvas.style.zIndex="-3";

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let nodes=[];

for(let i=0;i<90;i++){

nodes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.4,
vy:(Math.random()-0.5)*0.4

});

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

nodes.forEach(n=>{

n.x+=n.vx;
n.y+=n.vy;

if(n.x<0||n.x>canvas.width) n.vx*=-1;
if(n.y<0||n.y>canvas.height) n.vy*=-1;

ctx.beginPath();
ctx.arc(n.x,n.y,2,0,Math.PI*2);
ctx.fillStyle="#6fa8ff";
ctx.fill();

nodes.forEach(m=>{

let dx=n.x-m.x;
let dy=n.y-m.y;
let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<120){

ctx.beginPath();
ctx.moveTo(n.x,n.y);
ctx.lineTo(m.x,m.y);

ctx.strokeStyle="rgba(120,160,255,"+(1-dist/120)+")";
ctx.lineWidth=0.5;
ctx.stroke();

}

});

});

requestAnimationFrame(draw);

}

draw();

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

});