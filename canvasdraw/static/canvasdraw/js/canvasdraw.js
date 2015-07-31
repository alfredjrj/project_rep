var draw_gui_settingsNP = (function(){

	return{

		getMousePos: function (canvas, evt) {
		    var rect = canvas.getBoundingClientRect();
		    return {
		      x: evt.clientX - rect.left,
		      y: evt.clientY - rect.top,

		    };
		}

	};

})();




$(document).ready(function(){  

var canvas = document.getElementById('0canvasdraw');
var ctx = canvas.getContext('2d');



canvas_dim = canvas.getBoundingClientRect();
canvas.width = canvas_dim.width;
canvas.height = canvas_dim.height;

var last_mouse = {x: 0, y: 0};
var mouse = {x: 0, y: 0};
 
/* Mouse Capturing Work */
canvas.addEventListener('mousemove', function(event) {
	last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;
 	mousePos = draw_gui_settingsNP.getMousePos(canvas, event);
	mouse.x = mousePos.x ; 
	mouse.y = mousePos.y; 
  
}, false);



/* Drawing on Paint App */
ctx.lineWidth = 5;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = 'blue';

 
canvas.addEventListener('mousedown', function(e) {
	console.log(mouse);
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
 
    canvas.addEventListener('mousemove', onPaint, false);
}, false);
 
canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);
 
var onPaint = function() {
  	ctx.beginPath();
    ctx.moveTo(last_mouse.x, last_mouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.closePath();
    ctx.stroke();
};

});
