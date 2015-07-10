



var canvaswriteNP= (function() {



    function clearCanvas(cnv) {

        var ctx = cnv.getContext('2d');     // gets reference to canvas context
        ctx.beginPath();    // clear existing drawing paths
        ctx.save();         // store the current transformation matrix

        // Use the identity matrix while clearing the canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, cnv.width, cnv.height);

        ctx.restore();        // restore the transform
    } 

  
    return {

        addTextCnv: function(ctx, text, x, y, maxWidth, lineHeight, font, size) {
        // splits the text in words to can wrap it on new lie if exceds maxWidth
            var words = text.split(' ');
            var nr_w = words.length
            var addtxt = '';

            // sets to add the text and rows
            for(var n = 0; n < nr_w; n++) {
                var txtLine = addtxt + words[n] +" "   ;
                var metrics = ctx.measureText(txtLine);
                var txtWidth = metrics.width;
                if (txtWidth > maxWidth && n > 0){
                    ctx.fillText(addtxt, x, y);
                    addtxt = words[n]   ;
                    y  += lineHeight ;
                }else{ 
                    addtxt = txtLine;
                }

                // adds the text in canvas (sets text color, font type and size)
                ctx.fillStyle = 'black';
                var fontsize = size.concat("px ")
                ctx.font = fontsize.concat(font);
                console.log(ctx.font);
                ctx.fillText(addtxt, x, y);
            }

        },

   
        canvas_write: function(elementinput, font, size){
            // get a reference to the canvas element, and its context
            var canvas_id = elementinput.id+"canvas";
            var canvas_with_id = document.getElementById(canvas_id);
            create_gui_settingsNP.define_canvas_dim(canvas_with_id);



            var canvas_content = canvas_with_id.getContext('2d');

            // sets maximum line width, line height, and x /y coords for text
            var maxWidth = canvas_with_id.width - 10;
            var lineHeight = 23;
            var x_pos = (canvas_with_id.width - maxWidth) / 2;
            var y_pos = 25;

            clearCanvas(canvas_with_id); 
            this.addTextCnv(canvas_content, elementinput.value, x_pos, y_pos, maxWidth, lineHeight, font, size);

        },

        incanvas_input_write: function(incanvas_input_elm , ref_canvas_id, font , size, x_pos, y_pos){
            var canvas_id = ref_canvas_id+"canvas";
            var canvas_with_id = document.getElementById(canvas_id);
            var canvas_content = canvas_with_id.getContext('2d');

            // sets maximum line width, line height, and x /y coords for text
            var maxWidth = canvas_with_id.width - 10;
            var lineHeight = 23;
            var pos = (canvas_with_id.width - maxWidth) / 2;
            

            clearCanvas(canvas_with_id); 
            this.addTextCnv(canvas_content, incanvas_input_elm.value, x_pos, y_pos, maxWidth, lineHeight, font, size);


        },


        in_canvas_input_position: function (ref_canvas_id , x,y){
            var in_canvas_input = document.getElementById(ref_canvas_id +"in_canvas_input");
            in_canvas_input.style.left= String(x).concat("px");
            in_canvas_input.style.top= String(y).concat("px");

            return ;

        },

        in_canvas_input_hide: function(in_canvas_input){
            in_canvas_input.style.opacity= "0.0"; 
            return ;
        },


        in_canvas_input_show: function(in_canvas_input){
             in_canvas_input.style.opacity= "0.9";
             return ;  
        },

        
          

        in_canvas_input_setup: function (ref_canvas_id){

            var in_canvas_input_elm = document.getElementById(ref_canvas_id+"in_canvas_input");
            var canvas_create_elm = document.getElementById(ref_canvas_id+"canvas");
  

            create_gui_settingsNP.define_canvas_dim(canvas_create_elm);
            

            document.addEventListener('click', function(evt){
                console.log(canvas_create_elm.getAttribute("id"))
                console.log(create_gui_settingsNP.ismouse_in_canvas(in_canvas_input_elm, canvas_create_elm, evt));
            });
      

           


             in_canvas_input_elm.addEventListener("dragstart", function(evt){
            
                 evt.dataTransfer.setData("Text", evt.target.id);

             })


        


             canvas_create_elm.addEventListener("dragover", function(event){
         
                    event.preventDefault();


              });
           
           var mousePos = null;

            canvas_create_elm.addEventListener("drop", function(event){
                 mousePos = create_gui_settingsNP.getMousePos(canvas_create_elm, event);                    

                canvaswriteNP.in_canvas_input_position(ref_canvas_id, mousePos.x, mousePos.y);
                canvaswriteNP.incanvas_input_write(in_canvas_input_elm, ref_canvas_id , create_gui_settingsNP.get_font(ref_canvas_id) 
               , create_gui_settingsNP.get_size(ref_canvas_id),mousePos.x ,mousePos.y);     

                event.preventDefault();
                return false;
              }, false);


  

            in_canvas_input_elm.addEventListener('keyup', function(evt){

                canvaswriteNP.incanvas_input_write(in_canvas_input_elm, ref_canvas_id , create_gui_settingsNP.get_font(ref_canvas_id) 
                , create_gui_settingsNP.get_size(ref_canvas_id),mousePos.x ,mousePos.y);

            });
    
    
         
        }


    };

})();  



$(document).ready(function(){
    $(".add_texts").click(function(event) {       
        canvaswriteNP.in_canvas_input_setup(this.getAttribute("ref_canvas_id"));

    });

    $(".create_canvas_post").keyup(function(event){
        canvaswriteNP.canvas_write(this, create_gui_settingsNP.get_font(this.id) , create_gui_settingsNP.get_size(this.id))  

    });
      

});


