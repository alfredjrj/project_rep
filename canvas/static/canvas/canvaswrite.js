
function clearCanvas(cnv) {

  var ctx = cnv.getContext('2d');     // gets reference to canvas context
  ctx.beginPath();    // clear existing drawing paths
  ctx.save();         // store the current transformation matrix

  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  ctx.restore();        // restore the transform
}



function  addTextCnv(ctx, text, x, y, maxWidth, lineHeight) {
  // splits the text in words to can wrap it on new lie if exceds maxWidth
  var words = text.split(' ');
  var nr_w = words.length
  var addtxt = '';

  // sets to add the text and rows
  for(var n = 0; n < nr_w; n++) {
    var txtLine = addtxt + words[n] +" "   ;
    var metrics = ctx.measureText(txtLine);
    var txtWidth = metrics.width;
    if (txtWidth > maxWidth && n > 0) {
      ctx.fillText(addtxt, x, y);
      addtxt = words[n]   ;
      y  += lineHeight ;
    } else{ 
      addtxt = txtLine;
    }

  // adds the text in canvas (sets text color, font type and size)
  ctx.fillStyle = 'black';
  ctx.font = "20px Arial";
  ctx.fillText(addtxt, x, y);
  }

}


function canvas_write(elementinput){
  // get a reference to the canvas element, and its context
  var canvas_id = elementinput.id+"canvas";
  var canvas_with_id = document.getElementById(canvas_id);
  var canvas_content = canvas_with_id.getContext('2d');

// sets maximum line width, line height, and x /y coords for text
  var maxWidth = canvas_with_id.width - 10;
  var lineHeight = 23;
  var x_pos = (canvas_with_id.width - maxWidth) / 2;
  var y_pos = 15;
  
  clearCanvas(canvas_with_id); 
  addTextCnv(canvas_content, elementinput.value, x_pos, y_pos, maxWidth, lineHeight);

}



