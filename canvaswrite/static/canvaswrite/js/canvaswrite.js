



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


    function set_attributes(in_canvas_input_elm,ref_canvas_id ,layer){

        in_canvas_input_elm.setAttribute('data-font-size',create_gui_settingsNP.get_size(ref_canvas_id) );
        in_canvas_input_elm.setAttribute('data-font', create_gui_settingsNP.get_font(ref_canvas_id)  );
        in_canvas_input_elm.setAttribute('data-color',create_gui_settingsNP.get_colour(ref_canvas_id) );
        in_canvas_input_elm.setAttribute('data-opacity',create_gui_settingsNP.get_opacity(ref_canvas_id) );
    

        var incanvas_input_dim = in_canvas_input_elm.getBoundingClientRect();
        var mousePos = create_gui_settingsNP.getMousePos(layer, incanvas_input_dim);

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

   
        

        incanvas_input_write: function(in_canvas_input_elm, layer , canvas_create_div_incanvas_inputs, ref_canvas_id){
        
            // the new incanvas input meta datas gets stored in its elements
            set_attributes(in_canvas_input_elm , ref_canvas_id, layer);

            //  here is where to cnavas gets picked for drawings  

            var canvas_content = layer.getContext('2d');
            // sets maximum line width, line height, and x /y coords for text
            var maxWidth = layer.width - 20;
            var lineHeight = 25;
            var pos = (layer.width - maxWidth) / 2;
            

            clearCanvas(layer); 

            for(var i =0; i<canvas_create_div_incanvas_inputs.length; i++ ){

                var incanvas_input_font_size = $("#"+canvas_create_div_incanvas_inputs[i].id).attr('data-font-size');
                var incanvas_input_font= $("#" + canvas_create_div_incanvas_inputs[i].id).attr('data-font');
                var incanvas_input_color= $("#" + canvas_create_div_incanvas_inputs[i].id).attr('data-color');
                var incanvas_input_opacity= $("#" + canvas_create_div_incanvas_inputs[i].id).attr('data-opacity');
                
                // the text gets added with all the meta data specification to the canvas 
                var incanvas_input_dim = canvas_create_div_incanvas_inputs[i].getBoundingClientRect();
                var mousePos = create_gui_settingsNP.getMousePos(layer, incanvas_input_dim);
                
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
            // selected layer 
                $( ".layer").droppable({

                    over: function(){
             
               
                        topElementArray.push($(this).attr('id'));
                    },

                    // out: function(){
                    //     alert(out);
                    //     topElementArray=[];

                    // },

                    accept: '.draggable',

                    drop: function( event, ui ) {
                        

                        // check its its the top element
                        //alert(topElementArray);
                        if(this.id == topElementArray[topElementArray.length-1]){



                            var ref_canvas_id=  this.getAttribute("data-ref-canvas-id");
                            
                            var   canvas_create_elm =document.getElementById(this.id);

                            var div_layer_id = $(canvas_create_elm).closest('div').attr('id');
                            var div_layer= document.getElementById(div_layer_id);
                            var div_layer_incanvas_inputs = div_layer.getElementsByClassName("in_canvas_input");
                            var canvas_create_dim = canvas_create_elm.getBoundingClientRect(); 

                            // the event is called
                            if(this.id != ref_canvas_id+"layer0" &&  ui.draggable.attr('class') !="div_layer ui-draggable ui-draggable-handle ui-draggable-dragging" ){

                                var incanvas_input_id =ui.draggable.attr('data-incanvas-input-id');
                                var in_canvas_input_elm = document.getElementById(incanvas_input_id);
                                var incanvas_input_div_id = ui.draggable.attr('id');
                                var incanvas_input_div = document.getElementById(incanvas_input_div_id);
                               

                              

                                incanvas_input_div.style.zIndex = $(div_layer).css('zIndex') +1;
                                var check = $(incanvas_input_div).parent().attr("class");
                                //alert(check);
            //                  get div_layer which is parent of canvas_create elem
                                 // 
                               // alert(div_layer.id); 
                                console.log(in_canvas_input_elm.id + "the layer id "+ canvas_create_elm.id);
                            
                                if(check != "div_layer" && check !="div_layer ui-draggable ui-draggable-handle"){
                                  
                                    div_layer.appendChild(incanvas_input_div);
                                    // so it doenst glitch when input is droped
                                    incanvas_input_div.style.top = this.style.top ; 
                                    incanvas_input_div.style.left = this.style.left;

                                       $(  incanvas_input_div).draggable({
                                    containment: $(this).parent(), 
                                    cancel:null ,

                                    });

                                    in_canvas_input_elm.addEventListener('keyup', function(evt){
                                         canvaswriteNP.incanvas_input_write(in_canvas_input_elm, canvas_create_elm, div_layer_incanvas_inputs, ref_canvas_id); 
                                    });


                                }
                            canvaswriteNP.incanvas_input_write(in_canvas_input_elm, canvas_create_elm, div_layer_incanvas_inputs, ref_canvas_id );     
                            topElementArray = [];
                          

                            // $(canvas_create_elm).draggable({
                            //     handle: $(canvas_create_elm),
                            //     cancel:null ,
                            //    // containment: $("#"+ main_canvas.id)
                            // });
                            }else{
                                topElementArray = [];


                                 if(this.id == ref_canvas_id+"layer0"  && ui.draggable.attr('class') !="div_layer ui-draggable ui-draggable-handle ui-draggable-dragging"){
                                    //ref_canvas_id+"canvas_layers"
                                    alert(canvas_create_elm.id);
                            
                                    var incanvas_input_id =ui.draggable.attr('data-incanvas-input-id');
                                    var in_canvas_input_elm = document.getElementById(incanvas_input_id);
                                    var incanvas_input_div_id = ui.draggable.attr('id');
                                    var incanvas_input_div = document.getElementById(incanvas_input_div_id);
                                   
                                    incanvas_input_div.style.zIndex = $(div_layer).css('zIndex') +1;
                                    var check = $(incanvas_input_div).parent().attr("class");



                                    if(check != "div_layer" && check !="div_layer ui-draggable ui-draggable-handle"){
                                  
                                        div_layer.appendChild(incanvas_input_div);

                                           $(  incanvas_input_div).draggable({
                                        containment: $(this).parent(), 
                                        cancel:null ,

                                        });

                                        in_canvas_input_elm.addEventListener('keyup', function(evt){
                                             canvaswriteNP.incanvas_input_write(in_canvas_input_elm, canvas_create_elm, div_layer_incanvas_inputs, ref_canvas_id); 
                                        });


                                    }

                                     canvaswriteNP.incanvas_input_write(in_canvas_input_elm, canvas_create_elm, div_layer_incanvas_inputs, ref_canvas_id ); 
                                }
                            // ends the else statment    

                            }
                            
                        // ends the toparray if stament
                        }

                        // ends drop 
                    }

                });
            

        }, 



        
          
        in_canvas_input_setup: function ( addtexts_elm, ref_canvas_id){

            var id = $(addtexts_elm).attr("id");
            var click = $(addtexts_elm).data("clicked") || 0;
            $(addtexts_elm).data("clicked", ++click); 


            var incanvas_input_div = document.createElement("div");
            incanvas_input_div.className="draggable " +ref_canvas_id+"draggable";
            //incanvas_input_div.style.top=  "150px";
            incanvas_input_div.id=ref_canvas_id +"draggable"+ click;
            incanvas_input_div.style.position="absolute";
            incanvas_input_div.style.left= "270px";
            incanvas_input_div.setAttribute( 'data-incanvas-input-id',ref_canvas_id +"in_canvas_input"+ click );
            //incavnas_input_div.style.zIndex= "20";
            var incanvas_input = document.createElement("input");
            incanvas_input.type = "text";
            incanvas_input.className = "in_canvas_input"; // set the CSS class
            incanvas_input.draggable="true" ;
            incanvas_input.id=ref_canvas_id +"in_canvas_input"+ click;
            incanvas_input.setAttribute( "ref_canvas_id",ref_canvas_id );

            
            incanvas_input_div.appendChild(incanvas_input);

            // canvas input is put in here must switch to cavnvas layyer div 

            var canvas_create_div = document.getElementById(ref_canvas_id+"canvas_layers");
            canvas_create_div.appendChild(incanvas_input_div);


            var in_canvas_input_elm = document.getElementById(ref_canvas_id+"in_canvas_input" + click);
            var canvas_create_div_incanvas_inputs= canvas_create_div.getElementsByClassName("in_canvas_input");
          
    
            //var main_canvas = document.getElementById(ref_canvas_id+"canvas");
            //var canvas_create_elm = document.getElementById(ref_canvas_id+"canvas");
            var  canvas_id = null; 
            // containmnet to div_layer0 
             $( incanvas_input_div).draggable({
                containment: $("#"+ ref_canvas_id+"canvas_layers"),
                    cancel:null ,


             });



            $("."+ref_canvas_id+"draggable input").on("click", function() {
                $(this).focus();

            });
          


            
        }

    };

})();  



$(document).ready(function(){
    // text for the defualt layer
      //canvaswriteNP.add_text_to_layers();

     //canvaswriteNP.show_incanvas_inputs();
      canvaswriteNP.add_text_to_layers();
          canvaswriteNP.show_incanvas_inputs();
    $(".add_texts").on("click", function(event) {    


        canvaswriteNP.in_canvas_input_setup(this , this.getAttribute("ref_canvas_id"));

    });

    $(".add_layer").on("click" ,function(){
       
        canvaswriteNP.add_text_to_layers();
          canvaswriteNP.show_incanvas_inputs();

     });
    

});


