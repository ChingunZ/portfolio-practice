window.addEventListener(
  "scroll",
  () => {
    document.body.style.setProperty(
      "--scroll",
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
    );
  },
  false
);
var html = document.documentElement;
var body = document.body;

var scroller = {
  target: document.querySelector("#scroll-container"),
  ease: 0.05, // <= scroll speed
  endY: 0,
  y: 0,
  resizeRequest: 1,
  scrollRequest: 0,
};

var requestId = null;

// TweenLite.set(scroller.target, {
//   rotation: 0.01,
//   force3D: true
// });

window.addEventListener("load", onLoad);

function onLoad() {    
  updateScroller();  
  window.focus();
  window.addEventListener("resize", onResize);
  document.addEventListener("scroll", onScroll); 
}

function updateScroller() {
  
  var resized = scroller.resizeRequest > 0;
    
  if (resized) {    
    var height = scroller.target.clientHeight;
    body.style.height = height + "px";
    scroller.resizeRequest = 0;
  }
      
  var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

  scroller.endY = scrollY;
  scroller.y += (scrollY - scroller.y) * scroller.ease;

  if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    scroller.y = scrollY;
    scroller.scrollRequest = 0;
  }
  
  // TweenLite.set(scroller.target, { 
  //   y: -scroller.y 
  // });
  
  requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
  scroller.scrollRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

function onResize() {
  scroller.resizeRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

gsap.set('.main', {position:'fixed', background:'#fff', width:'100%', maxWidth:'1200px', height:'100%', top:0, left:'50%', x:'-50%'})
gsap.set('.scrollDist', {width:'100%', height:'200%'})
gsap.timeline({scrollTrigger:{trigger:'.scrollDist', start:'top top', end:'bottom bottom', scrub:1}})
    .fromTo('.sky', {y:0},{y:-200}, 0)
    .fromTo('.cloud1', {y:100},{y:-800}, 0)
    .fromTo('.cloud2', {y:-150},{y:-500}, 0)
    .fromTo('.cloud3', {y:-50},{y:-650}, 0)
    .fromTo('.mountBg', {y:-10},{y:-100}, 0)
    .fromTo('.mountMg', {y:-30},{y:-250}, 0)
    .fromTo('.mountFg', {y:-50},{y:-600}, 0)

$('#arrowBtn').on('mouseenter', (e)=>{ gsap.to('.arrow', {y:10, duration:0.8, ease:'back.inOut(3)', overwrite:'auto'}); })
$('#arrowBtn').on('mouseleave', (e)=>{ gsap.to('.arrow', {y:0, duration:0.5, ease:'power3.out', overwrite:'auto'}); })
$('#arrowBtn').on('click', (e)=>{ gsap.to(window, {scrollTo:innerHeight, duration:1.5, ease:'power1.inOut'}); })

// mouse cursor
const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor__circle');

const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

window.addEventListener('mousemove', updateCoordinates);


function getAngle(diffX, diffY) {
  return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(
    Math.pow(diffX, 2) + Math.pow(diffY, 2)
  );
  const maxSqueeze = 0.15;
  const accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}


const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);
  
  pos.x += diffX * speed;
  pos.y += diffY * speed;
  
  const angle = getAngle(diffX, diffY);
  const squeeze = getSqueeze(diffX, diffY);
  
  const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
  const rotate = 'rotate(' + angle +'deg)';
  const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);