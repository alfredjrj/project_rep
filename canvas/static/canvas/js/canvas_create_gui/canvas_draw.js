



$(document).ready(function(){  

var canvas = document.getElementById('0canvas');
var ctx = canvas.getContext('2d');



canvas_dim = canvas.getBoundingClientRect();
canvas.width = canvas_dim.width;
canvas.height = canvas_dim.height;


var mouse = {x: 0, y: 0};
 
/* Mouse Capturing Work */
canvas.addEventListener('mousemove', function(event) {
 mousePos = create_gui_settingsNP.getMousePos(canvas, event);
  mouse.x = mousePos.x ; 
  mouse.y = mousePos.y; 
}, false);


/* Drawing on Paint App */
ctx.lineWidth = 5;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = 'blue';
 
canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
 
    canvas.addEventListener('mousemove', onPaint, false);
}, false);
 
canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);
 
var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

});
