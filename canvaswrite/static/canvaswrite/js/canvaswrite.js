



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


    function set_attributes(incanvas_input_elm,ref_canvas_id , canvas_layer){

        incanvas_input_elm.setAttribute('data-font-size',create_gui_settingsNP.get_size(ref_canvas_id) );
        incanvas_input_elm.setAttribute('data-font', create_gui_settingsNP.get_font(ref_canvas_id)  );
        incanvas_input_elm.setAttribute('data-color',create_gui_settingsNP.get_colour(ref_canvas_id) );        
        incanvas_input_elm.setAttribute('data-opacity',create_gui_settingsNP.get_opacity(ref_canvas_id) );
    

        var mousePos = create_gui_settingsNP.getMousePos_element(canvas_layer, incanvas_input_elm);

        incanvas_input_elm.setAttribute('data-x-pos', Math.round(mousePos.x) );
        incanvas_input_elm.setAttribute('data-y-pos',  Math.round(mousePos.y) );


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
                // might need it && n > 0
                if (txtWidth > maxWidth ){
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

   
        

        incanvas_input_write: function(incanvas_input_elm, canvas_layer , ref_canvas_id){
        
            // the new incanvas input meta datas gets stored in its elements
            set_attributes(incanvas_input_elm , ref_canvas_id, canvas_layer);

            //  here is where to cnavas gets picked for drawings  
            var canvas_content = canvas_layer.getContext('2d');
            // sets maximum line width, line height, and x /y coords for text
            var maxWidth = canvas_layer.width - 20;
            var lineHeight = 25;
            var pos = (canvas_layer.width - maxWidth) / 2;
            

            clearCanvas(canvas_layer); 

            //for(var i =0; i<canvas_create_div_incanvas_inputs.length; i++ ){

                var incanvas_input_font_size = $("#"+incanvas_input_elm.id).attr('data-font-size');
                var incanvas_input_font= $("#" + incanvas_input_elm.id).attr('data-font');
                var incanvas_input_color= $("#" + incanvas_input_elm.id).attr('data-color');
                var incanvas_input_opacity= $("#" + incanvas_input_elm.id).attr('data-opacity');
                
                // the text gets added with all the meta data specification to the canvas 
            
                var mousePos = create_gui_settingsNP.getMousePos_element(canvas_layer, incanvas_input_elm);
                
                this.addTextCnv(canvas_content, incanvas_input_elm.value, mousePos.x, mousePos.y, maxWidth, lineHeight, incanvas_input_font, 
                    incanvas_input_font_size, incanvas_input_color, incanvas_input_opacity);


           // }

        },


        in_canvas_input_hide: function(in_canvas_input){
            in_canvas_input.style.opacity= "0.0"; 
            return ;
        },


        in_canvas_input_show: function(in_canvas_input){
             in_canvas_input.style.opacity= "0.9";
             return ;  
        },

// when it is clicked multiple times id adds multiple documentaddlistiners
        show_incanvas_inputs: function(){
            $(".layer").on("click", function(){
                //alert("clicked"+ this.id);
                var layer_id= this.id;
                var div_layer_id = $(this).closest('div').attr('id');
                var div_layer= document.getElementById(div_layer_id);
               // alert(div_layer+"alerting divlayers");
                var div_layer_incanvas_inputs = div_layer.getElementsByClassName("in_canvas_input");
                
                for(var i=0; i<div_layer_incanvas_inputs.length ; i++){
                    div_layer_incanvas_inputs[i].style.opacity= "0.9";
                    //alert("showing opaticyt");
                }

                document.addEventListener("click", function clicked(event){
                    //alert("target_id"+event.target.id +"layerid" +layer_id);
                    if(event.target.id == layer_id){

                    }else{

                    for(var i=0; i<div_layer_incanvas_inputs.length ; i++){
                    div_layer_incanvas_inputs[i].style.opacity= "0.0";
                     }
                    // alert("clicked to trun off");
                     document.removeEventListener("click" , clicked,false);
                    }


                })


            })



        },

        add_text_to_layers : function(){
              
            var topElementArray = Array();
 
                $( ".layer").droppable({

                    over: function(){             
                        // this is layer id  
                        topElementArray.push($(this).attr('id'));
                        console.log("over"+this.id); 
                    },

                    accept: '.draggable',

                    drop: function( event, ui ) {
                        

                       // this.id is layer that is dropped on
                       
                        if(this.id == topElementArray[topElementArray.length-1]){

                
                            var input_layer =  $(ui.draggable).children(".input_layer").get(0); 
                                                 
                          
                            var ref_canvas_id=  this.getAttribute("data-ref-canvas-id");
                            var canvas_layer =document.getElementById(this.id);
                           

                            var div_layer_id = $(canvas_layer).closest('div').attr('id');
                            var div_layer= document.getElementById(div_layer_id);
                            var canvas_create_dim = canvas_layer.getBoundingClientRect(); 

                            // the event is called
                            if(ui.draggable.attr('class') !="div_layer ui-draggable ui-draggable-handle ui-draggable-dragging" ){

                                var incanvas_input_id =ui.draggable.attr('data-incanvas-input-id');
                                var incanvas_input_elm = document.getElementById(incanvas_input_id);
                                var incanvas_input_div_id = ui.draggable.attr('id');
                                var incanvas_input_div = document.getElementById(incanvas_input_div_id);                              

                                incanvas_input_div.style.zIndex = $(div_layer).css('zIndex') +1;
                                var check = $(incanvas_input_div).parent().attr("class");
                           
                                console.log(incanvas_input_elm.id + "the layer id "+ canvas_layer.id);
                            
                                if(check != "div_layer" && check !="div_layer ui-draggable ui-draggable-handle"){
                                  
                                    div_layer.appendChild(incanvas_input_div);
                    

                                       $(  incanvas_input_div).draggable({
                                    containment: $(this).parent(), 
                                    cancel:null ,

                                    });


                                    incanvas_input_elm.addEventListener('keyup', function(evt){
                                         canvaswriteNP.incanvas_input_write(incanvas_input_elm, input_layer, ref_canvas_id); 
                                    });


                                }
                            canvaswriteNP.incanvas_input_write(incanvas_input_elm, input_layer, ref_canvas_id );     
                            topElementArray = [];       
                                
                            }
                          
                        // ends the toparray if stament
                        }
                  
                        // ends drop 
                    }

                });
            

        }, 



        
          
        incanvas_input_setup: function ( addtexts_elm, ref_canvas_id){

            var id = $(addtexts_elm).attr("id");
            var click = $(addtexts_elm).data("clicked") || 0;
            $(addtexts_elm).data("clicked", ++click); 


            var incanvas_input_div = document.createElement("div");
            incanvas_input_div.className="draggable " +ref_canvas_id+"draggable";
            incanvas_input_div.id=ref_canvas_id +"draggable"+ click;
            incanvas_input_div.setAttribute( 'data-incanvas-input-id',ref_canvas_id +"in_canvas_input"+ click );

            //style
            incanvas_input_div.style.position="absolute";
            incanvas_input_div.style.left= "270px";
            

            var incanvas_input = document.createElement("input");
            incanvas_input.type = "text";
            incanvas_input.className = "in_canvas_input"; // set the CSS class
            incanvas_input.id=ref_canvas_id +"in_canvas_input"+ click;
            incanvas_input.setAttribute( "ref_canvas_id",ref_canvas_id );

            var input_layer=  document.createElement('canvas');
            input_layer.className = "input_layer";
            input_layer.id= "input_layer" +click //+ num
     

            incanvas_input_div.appendChild(input_layer);
            incanvas_input_div.appendChild(incanvas_input);

            var canvas_create_div = document.getElementById(ref_canvas_id+"canvas_layers");
            canvas_create_div.appendChild(incanvas_input_div);


             $( incanvas_input_div).draggable({
                containment: $("#"+ ref_canvas_id+"canvas_layers"),
                    cancel:null ,


             });



            $("."+ref_canvas_id+"draggable").on("click", function() {
                var input = $(this).children("input").focus() // get input inside div
         

            });

            
        }

    };

})();  



$(document).ready(function(){
 
    canvaswriteNP.add_text_to_layers();
    canvaswriteNP.show_incanvas_inputs();
    $(".add_texts").on("click", function(event) {    


        canvaswriteNP.incanvas_input_setup(this , this.getAttribute("ref_canvas_id"));

    });

    $(".add_layer").on("click" ,function(){
       
        canvaswriteNP.add_text_to_layers();
          canvaswriteNP.show_incanvas_inputs();

     });
    

});


