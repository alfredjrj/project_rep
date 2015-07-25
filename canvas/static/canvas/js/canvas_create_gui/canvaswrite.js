



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


    function set_attributes(in_canvas_input_elm,ref_canvas_id ){

        in_canvas_input_elm.setAttribute('data-font-size',create_gui_settingsNP.get_size(ref_canvas_id) );
        in_canvas_input_elm.setAttribute('data-font', create_gui_settingsNP.get_font(ref_canvas_id)  );
        in_canvas_input_elm.setAttribute('data-color',create_gui_settingsNP.get_colour(ref_canvas_id) );
        in_canvas_input_elm.setAttribute('data-opacity',create_gui_settingsNP.get_opacity(ref_canvas_id) );
    


        var canvas_create_elm = document.getElementById(ref_canvas_id+"canvas");
        var incanvas_input_dim = in_canvas_input_elm.getBoundingClientRect();
        var mousePos = create_gui_settingsNP.getMousePos(canvas_create_elm, incanvas_input_dim);

        in_canvas_input_elm.setAttribute('data-x-pos', Math.round(mousePos.x) );
        in_canvas_input_elm.setAttribute('data-y-pos',  Math.round(mousePos.y) );


    }

  
    return {

        addTextCnv: function(ctx, text, x, y, maxWidth, lineHeight, font, size, colour, opacity) {
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
                ctx.fillStyle = colour;
                ctx.globalAlpha=opacity;
                var fontsize = size.concat("px ")
                ctx.font = fontsize.concat(font);
                console.log(ctx.font);
                ctx.fillText(addtxt, x, y);
            }

        },

   
        canvas_write: function(elementinput, masterkey, font, size){
            // get a reference to the canvas element, and its context

            var canvas_id =  masterkey +"canvas";
            var canvas_with_id = document.getElementById(canvas_id);



            var canvas_content = canvas_with_id.getContext('2d');

            var canvas_input_elm= document.getElementById(elementinput.id);
            canvas_input_elm.setAttribute('data-post-font-size',size );
            canvas_input_elm.setAttribute('data-post-font',font);

            // sets maximum line width, line height, and x /y coords for text
            var maxWidth = canvas_with_id.width - 10;
            var lineHeight = 23;
            var x_pos = (canvas_with_id.width - maxWidth) / 2;
            var y_pos = 25;

            clearCanvas(canvas_with_id); 
            this.addTextCnv(canvas_content, elementinput.value, x_pos, y_pos, maxWidth, lineHeight, font, size);

        },


        incanvas_input_write: function(in_canvas_input_elm, canvas_create_elm , canvas_create_div_incanvas_inputs, ref_canvas_id){
        

            set_attributes(in_canvas_input_elm , ref_canvas_id); 

            var canvas_content = canvas_create_elm.getContext('2d');
            // sets maximum line width, line height, and x /y coords for text
            var maxWidth = canvas_create_elm.width - 20;
            var lineHeight = 23;
            var pos = (canvas_create_elm.width - maxWidth) / 2;
            

            clearCanvas(canvas_create_elm); 

            for(var i =0; i<canvas_create_div_incanvas_inputs.length; i++ ){

                var incanvas_input_font_size = $("#"+canvas_create_div_incanvas_inputs[i].id).attr('data-font-size');
                var incanvas_input_font= $("#" + canvas_create_div_incanvas_inputs[i].id).attr('data-font');
                var incanvas_input_color= $("#" + canvas_create_div_incanvas_inputs[i].id).attr('data-color');
                var incanvas_input_opacity= $("#" + canvas_create_div_incanvas_inputs[i].id).attr('data-opacity');
                
                var incanvas_input_dim = canvas_create_div_incanvas_inputs[i].getBoundingClientRect();
                var mousePos = create_gui_settingsNP.getMousePos(canvas_create_elm, incanvas_input_dim);
                this.addTextCnv(canvas_content, canvas_create_div_incanvas_inputs[i].value, mousePos.x, mousePos.y, maxWidth, lineHeight, incanvas_input_font, 
                    incanvas_input_font_size, incanvas_input_color, incanvas_input_opacity);


            }

        },


        in_canvas_input_hide: function(in_canvas_input){
            in_canvas_input.style.opacity= "0.0"; 
            return ;
        },


        in_canvas_input_show: function(in_canvas_input){
             in_canvas_input.style.opacity= "0.9";
             return ;  
        },



        display_layers: function(ref_canvas_id){


            var canvas_create_div = document.getElementById(ref_canvas_id+"canvas_create_div");
            var canvas_create_div_incanvas_inputs= canvas_create_div.getElementsByClassName("in_canvas_input");
            var layers_div = document.getElementById(ref_canvas_id+"layers" );
            $(layers_div).empty();

            for(var i =0 ;i<canvas_create_div_incanvas_inputs.length; i++ ){
                var layer_color = document.createElement("div");
                    layer_color.className= "layer_colour";
                    layer_color.style.background=  canvas_create_div_incanvas_inputs[i].getAttribute("data-color");
                    layers_div.appendChild(layer_color);

                var layer_info = document.createElement("P");
                    layer_info.className= "layer_info";
                    layer_info.innerHTML= i + " " + canvas_create_div_incanvas_inputs[i].value ;
                    layers_div.appendChild(layer_info);
            }
             return ;  
        },


        
          
        in_canvas_input_setup: function ( addtexts_elm, ref_canvas_id){

            var id = $(addtexts_elm).attr("id");
            var click = $(addtexts_elm).data("clicked") || 0;
            $(addtexts_elm).data("clicked", ++click); 
            
            var incanvas_input_div = document.createElement("div");
            incanvas_input_div.className=ref_canvas_id+"draggable";
            incanvas_input_div.style.top= "150px";
            incanvas_input_div.style.position="absolute";
            incanvas_input_div.style.left= "270px";

            var incanvas_input = document.createElement("input");
            incanvas_input.type = "text";
            incanvas_input.className = "in_canvas_input"; // set the CSS class
            incanvas_input.draggable="true" ;
            incanvas_input.id=ref_canvas_id +"in_canvas_input"+ click;
            incanvas_input.setAttribute( "ref_canvas_id",ref_canvas_id );
            
            incanvas_input_div.appendChild(incanvas_input);

            var canvas_create_div = document.getElementById(ref_canvas_id+"canvas_create_div");
            canvas_create_div.appendChild(incanvas_input_div);


            var in_canvas_input_elm = document.getElementById(ref_canvas_id+"in_canvas_input" + click);
            var canvas_create_elm = document.getElementById(ref_canvas_id+"canvas");
            var canvas_create_div_incanvas_inputs= canvas_create_div.getElementsByClassName("in_canvas_input");
          
                    

            document.addEventListener('click', function(evt){
                
                console.log(canvas_create_elm.getAttribute("id"));
                console.log(create_gui_settingsNP.ismouse_in_canvas(canvas_create_div_incanvas_inputs, canvas_create_elm, evt));
            });

      
            document.addEventListener("mousemove" , function(event){
                var mousePos = create_gui_settingsNP.getMousePos(canvas_create_elm, event);
                console.log(mousePos);
                console.log("x" + event.clientX +"" + "y" + event.clientY   );
            });   


            $("."+ref_canvas_id+"draggable").draggable({
                containment: $("#"+ canvas_create_elm.id),
                cancel:null ,
              
                stop: function( event, ui ){

                        canvaswriteNP.display_layers(ref_canvas_id);

                        canvaswriteNP.incanvas_input_write(in_canvas_input_elm, canvas_create_elm, canvas_create_div_incanvas_inputs, ref_canvas_id );     
                 
                }
            });


            $("."+ref_canvas_id+"draggable input").click(function() {
                $(this).focus();
            });


            in_canvas_input_elm.addEventListener('keyup', function(evt){
                 canvaswriteNP.incanvas_input_write(in_canvas_input_elm, canvas_create_elm, canvas_create_div_incanvas_inputs, ref_canvas_id); 
            });
            
        }

    };

})();  



$(document).ready(function(){




    create_gui_settingsNP.define_canvas_dim("canvas_create");


    $(".add_texts").click(function(event) {     
        canvaswriteNP.in_canvas_input_setup(this , this.getAttribute("ref_canvas_id"));

    });

    $(".create_canvas_post").keyup(function(event){
        var masterkey = document.getElementById(this.id).getAttribute("ref_canvas_id");
        canvaswriteNP.canvas_write(this, masterkey, create_gui_settingsNP.get_font(masterkey) , create_gui_settingsNP.get_size(masterkey))  

    });
      

});


