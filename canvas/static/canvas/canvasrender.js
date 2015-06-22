var canvasrenderNP = {

canvaswrite: function (canvasid, canvas_text){
var c = document.getElementById(canvasid);
var ctx = c.getContext("2d");
ctx.font = "20px Arial";
ctx.fillText(canvas_text,10,50);
},

}
