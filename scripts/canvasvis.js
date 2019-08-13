console.clear();
// import framework
import Vis from '/modules/Vis.js';

// setup
const visEl = document.querySelector('#visual');
// setup 2D canvas plus resize
// set up dpr for  vis
const dpr = window.devicePixelRatio;
// get window dimensions & set canvas to fill window
function Dimensions() {
	this.width = (window.innerWidth - 100)*dpr;
	this.height = (window.innerHeight - 100)*dpr;
	this.centerX = this.width/2;
	this.centerY = this.height/2;

	this.setFullscreen = function(el) {
		el.width = this.width;
		el.height = this.height;
	}

	this.update = function() {
		this.width = (window.innerWidth)*dpr;
		this.height = (window.innerHeight)*dpr;
	}
}

let screenDim = new Dimensions();
screenDim.setFullscreen(visEl);
window.addEventListener("resize", function(e) {
	screenDim.update();
	screenDim.setFullscreen(visEl);
	init();
}, false);
const ctx = visEl.getContext('2d');
// set up canvas defaults
ctx.lineWidth = 0.0;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, screenDim.width, screenDim.height);

const binSize = 128;
const elAmount = Math.floor(binSize/3); // Returned frequncies is a third

// create a new vis
const vis = new Vis(binSize, '233305303');

// setup our draw loop: THIS IS WHERE THE MAGIC HAPPENS!!
vis.draw( () => {

  ctx.clearRect(0, 0, screenDim.width, screenDim.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, screenDim.width, screenDim.height);

	// loop over our frequencies and draw a shape for each one
	vis.frequencies.forEach((f, i) => {
		ctx.beginPath();
		ctx.fillStyle = `hsla(${i*(360 / elAmount)}, 50%, 50%, 1)`;
		ctx.arc(screenDim.width/elAmount * i, screenDim.height/elAmount * i, f, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
	})

} )


// ===================== CONTROLS edit here if you want to start/stop multiple vis
const controls = document.querySelector('#controls');

controls.querySelector('[data-control="play"]').addEventListener('click', function(e) {

	if (this.dataset.on === 'false') {
		this.dataset.on = "true";
    vis.start();
	} else {
    this.dataset.on = "false";
    vis.stop();
	}

})
