


var canvasNP= (function() {

	return{
        // display_layers: function(ref_canvas_id){


        //     //var canvas_create_div = document.getElementById(ref_canvas_id+"canvas_create_div");
        //      var canvas_create_div = document.getElementById(ref_canvas_id+"canvas_layers");
        //     // var canvas_create_div_incanvas_inputs= canvas_create_div.getElementsByClassName("in_canvas_input");
        //      var canvas_create_div_incanvas_inputs= canvas_create_div.getElementsByClassName("layer");
        //     var layers_div = document.getElementById(ref_canvas_id+"layers" );
        //     $(layers_div).empty();

        //     for(var i =0 ;i<canvas_create_div_incanvas_inputs.length; i++ ){
        //         var layer_color = document.createElement("div");
        //             layer_color.className= "layer_colour";
        //             layer_color.style.background=  canvas_create_div_incanvas_inputs[i].getAttribute("data-color");
        //             layers_div.appendChild(layer_color);

        //         var layer_info = document.createElement("P");
        //             layer_info.className= "layer_info";
        //             layer_info.innerHTML= i + " " + canvas_create_div_incanvas_inputs[i].value ;
        //             layers_div.appendChild(layer_info);
        //     }
        //      return ;  
        // },


            change_layer_order:function(ref_canvas_id, pre , i){

                  var moveto_layer_index_div = document.getElementById(ref_canvas_id+"layer_index_div"+pre);
                            var get_layer_index_div= document.getElementById(ref_canvas_id+"layer_index_div"+i);
                            var moved_down_index_layer = get_layer_index_div.childNodes; 
                            // alert(pre);
                            // alert(moved_down_index_layer[0].id); 
                            // alert(moveto_layer_index_div.id);

                            moved_down_index_layer[0].setAttribute("data-layer-index-div", moveto_layer_index_div.id );

                            var layer_id= moved_down_index_layer[0].getAttribute("layer_id");
                            
                            var layer = document.getElementById(layer_id );
                            alert(layer.id);
                            layer.setAttribute("data-zindex", Number(pre)+2);
                            

                            moveto_layer_index_div.appendChild(moved_down_index_layer[0]);


            },

          display_layers: function(ref_canvas_id){


            //var canvas_create_div = document.getElementById(ref_canvas_id+"canvas_create_div");
             var canvas_layers_div = document.getElementById(ref_canvas_id+"canvas_layers");
            // var canvas_create_div_incanvas_inputs= canvas_create_div.getElementsByClassName("in_canvas_input");
            var all_canvas_layers= canvas_layers_div.getElementsByClassName("layer");
            var layers_div = document.getElementById(ref_canvas_id+"layers" );
            $(layers_div).empty();
         

            for(var i =all_canvas_layers.length-1 ;i>=0; i--){
                console.log(i);
             
                var layer_index = document.createElement('canvas');
                var context = layer_index.getContext('2d');

    
                layer_index.className="layer_index "+ref_canvas_id+"layer_index";
                layer_index.id=ref_canvas_id+"layer_index"+i; 
                layer_index.setAttribute( "data-ref-canvas-id",ref_canvas_id );
                layer_index.setAttribute("layer_id",all_canvas_layers[i].id ); 
                layer_index.setAttribute("data-layer-index-div", ref_canvas_id+"layer_index_div"+i); 
                var layer_index_div = document.createElement("div");

                layer_index_div.className= "layer_index_div";
                layer_index_div.id= ref_canvas_id+"layer_index_div"+i; 
                layer_index_div.style.width = "160px";
                layer_index_div.style.height = "70px";
                layer_index_div.style.border = "2px solid black";
                layer_index_div.setAttribute("data-layer_index_div-number", i);


                layer_index_div.appendChild(layer_index);

                //apply the old canvas to the new one
                // if(all_canvas_layers[i].style.zIndex > current_layer_zIndex && canvas_layers_div.getAttribute("selected_index_layer") ==null){
                   
                //      canvas_layers_div.setAttribute("selected_index_layer", layer_index.id);
                //      // layer_index.style.border="4px solid #4776F4";

                // }
               
                context.drawImage(all_canvas_layers[i], 0, 0, 300,150);
                layers_div.appendChild(layer_index_div);

                  

            }

            var selected_index_layer_id= canvas_layers_div.getAttribute("data-selected-index-layer");
            //alert(selected_index_layer_id);
            if(selected_index_layer_id == undefined){
                
            }else{
                //alert("else");
            var selected_index_layer= document.getElementById(selected_index_layer_id);
            selected_index_layer.style.border="4px solid #4776F4";
            }

            $("." + ref_canvas_id+"layer_index").draggable({ 
                    containment: $("#"+layers_div.id),
                    //cursor: 'move', 
                    cancel:null ,
                    axis: "y",
                    start: function(){

                        // layers_div.append(this);
                        // $(this).parent(".layer_index_div").empty(); 
                        // //

                    }
            }); 

            // make a drope able 
            $(".layer_index_div").droppable({
                drop : function(event, ui){

                    // if ui.dragable beling to layer_index_div
                    // fix style 
                  
                    console.log(this.id); 
                    //$(this).empty();
                    
                    var layer_index_id = ui.draggable.attr('id');
                    var layer_index = document.getElementById(layer_index_id );

                    var ref_canvas_id = layer_index.getAttribute("data-ref-canvas-id");

             

                    console.log(layer_index.id);

                    
                    layer_index.style.top="0px";
                    layer_index.style.left="0px";
              
                    var layer_index_div_moved_id = layer_index.getAttribute("data-layer-index-div");
                    layer_index.setAttribute("data-layer-index-div", this.id)

                    var  layer_index_div_moved = document.getElementById(layer_index_div_moved_id);
                    var layer_index_div_droped = document.getElementById(this.id);


                    var layer_index_div_moved_number = layer_index_div_moved.getAttribute("data-layer_index_div-number");
                    var layer_index_div_droped_number = layer_index_div_droped.getAttribute("data-layer_index_div-number");

                    // alert(layer_index_div_moved_id);
                    // alert(layer_index_div_moved_number);
                    // alert(layer_index_div_droped_number);

                    // this loop is for if index_layer is moved up
                    // do one for when indexlayer is  moved down
                    // works if not over canvas because it donest cause the otherdrop
                    
                    if ( Number(layer_index_div_moved_number)< layer_index_div_droped_number) {
                        var pre=Number(layer_index_div_moved_number);     
                        for(var i= Number(layer_index_div_moved_number)+1; i<= layer_index_div_droped_number; i++,pre++)
                        {
                           
                          canvasNP.change_layer_order(ref_canvas_id, pre, i );

                        }
                    }



                    if ( Number(layer_index_div_moved_number)> layer_index_div_droped_number) {
                        // moved down 
                        var pre=Number(layer_index_div_moved_number);     
                        for(var i= Number(layer_index_div_moved_number)-1; i>= layer_index_div_droped_number; i--,pre--)
                        {
                             canvasNP.change_layer_order(ref_canvas_id, pre, i );
                 
                        }
                    }

                    var moved_layer_id = layer_index.getAttribute('layer_id');
                    moved_layer= document.getElementById(moved_layer_id);

                    moved_layer.setAttribute('data-zindex',Number(layer_index_div_droped_number)+2);
                    this.appendChild(layer_index);
                    


                     for(var i =all_canvas_layers.length-1 ;i>=0; i--){
                        all_canvas_layers[i].style.zIndex=all_canvas_layers[i].getAttribute("data-zindex"); 

                        var all_canvas_layers_div = $(all_canvas_layers[i]).closest("div");
                        $(all_canvas_layers_div).css("z-index", all_canvas_layers[i].getAttribute("data-zindex"));


                     }
                    // rearagent the layer order accordin
                
                }

            })
           

            $("." + ref_canvas_id+"layer_index").on("click",function(){
                $("." + ref_canvas_id+"layer_index").each(function(){
                    this.style.border="2px solid black"; 
                })
                //alert("hello");
                this.style.border="4px solid #4776F4";
                canvas_layers_div.setAttribute("data-selected-layer",this.getAttribute("layer_id") ); 
                canvas_layers_div.setAttribute("data-selected-index-layer", this.id);
                alert(this.id);

            })



            



             return ;  
        },

        define_canvas_dim: function(canvas_class){

			var canvas_create_array = document.getElementsByClassName(canvas_class);
			for(var i = 0 ; i< canvas_create_array.length ; i++){
	            var canvas_dim = canvas_create_array[i].getBoundingClientRect();
	            canvas_create_array[i].width = canvas_dim.width;
	            canvas_create_array[i].height = canvas_dim.height;
        	}
        },
             
        define_canvas_dimen: function(){

        	var defined = false; 

       

        	var canvas_create_array = document.getElementsByTagName("CANVAS");
        	console.log(canvas_create_array.length);

        	var canvas_elements = null ; 

			for(var i = 0 ; i< canvas_create_array.length ; i++){
				console.log(canvas_create_array[i]);

	            var canvas_dim = canvas_create_array[i].getBoundingClientRect();
	            canvas_create_array[i].width = canvas_dim.width;
	            canvas_create_array[i].height = canvas_dim.height;
	            canvas_elements = i;
        	}
        		console.log(canvas_elements + "canvasele");
        		console.log(canvas_create_array.length);
        	if(canvas_elements +1 == canvas_create_array.length  ){
        		

        		defined = true; 
        	}

        	return defined; 

   //      	$("canvas").each(function(){
   //      		console.log(this.id);
   //      		canvas = document.getElementById(this.id);
   //      		if(canvas== null ){

   //      			return; 

   //      		}
   //      		else{

   //      			var canvas_dim = canvas.getBoundingClientRect();
	  //           	canvas.width = canvas_dim.width;
	  //           	canvas.height = canvas_dim.height;
   //      		}

        
       // 	});
	
			
        
        },  

        tab_zindex: function(buttonid){

        	var button = document.getElementById(buttonid);
			var ref_canvas_id = button.getAttribute("data-ref-canvas-id");
			var canvaswritetab = document.getElementById(ref_canvas_id + "canvaswritetab");
			var canvasdrawtab = document.getElementById(ref_canvas_id + "canvasdrawtab");
			var canvasimagetab = document.getElementById(ref_canvas_id + "canvasimagetab");
			var canvasvideotab = document.getElementById(ref_canvas_id + "canvasvideotab");
			var canvassoundtab = document.getElementById(ref_canvas_id + "canvassoundtab");

		

			var canvaswritetab_zindex = $(canvaswritetab).css('zIndex'); 
			var canvasimagetab_zindex = $(canvasimagetab).css('zIndex'); 
			var canvasdrawtab_zindex = $(canvasdrawtab).css('zIndex');

			var large_zindex = Math.max(canvaswritetab_zindex, canvasimagetab_zindex, canvasdrawtab_zindex ); 

			return {
		      largest_zindex: large_zindex,
		      canvaswritetab_zindex: canvaswritetab_zindex,
		      canvasimagetab_zindex:canvasimagetab_zindex,
		      canvasdrawtab_zindex:canvasdrawtab_zindex,
		      ref_canvas_id: ref_canvas_id ,

		    };
			
        } ,         

        switchtabs: function (thisitem, tabrequestedclass){

			var tab =  canvasNP.tab_zindex(thisitem.id);
			var tab_tobe_replaced_class = null;

				if(tab.canvaswritetab_zindex == tab.largest_zindex){   
					tab_tobe_replaced_class="canvaswritetab";

				}
				else if(tab.canvasimagetab_zindex == tab.largest_zindex ){
					tab_tobe_replaced_class="canvasimagetab";

				}
				else if(tab.canvasdrawtab_zindex == tab.largest_zindex){
					tab_tobe_replaced_class="canvasdrawtab";
				}

			
				var tab_totop_current_zindex = $("#" + tab.ref_canvas_id + tabrequestedclass).css('zIndex');

				console.log(tab_totop_current_zindex);

				tab_tobe_replaced = document.getElementById(tab.ref_canvas_id + tab_tobe_replaced_class); 

				tab_tobe_replaced.style.zIndex= tab_totop_current_zindex; 

				var tabrequested = document.getElementById(tab.ref_canvas_id+ tabrequestedclass);
				tabrequested.style.zIndex=  tab.largest_zindex;

		
			var toolboxshow_class = tabrequested.getAttribute("data-toolbox");
			toolbox_toshow= document.getElementById(tab.ref_canvas_id + toolboxshow_class); 
			toolbox_toshow.style.visibility= "visible";

			var toolboxhide_class = tab_tobe_replaced.getAttribute("data-toolbox");
			toolbox_tohide= document.getElementById(tab.ref_canvas_id + toolboxhide_class);
			toolbox_tohide.style.visibility="hidden";

			return ;

		},

        add_canvas_layer: function(){


        },

		add_layer: function(addlayer_elm){
			var id = $(addlayer_elm).attr("id");
            var click = $(addlayer_elm).data("clicked") || 0;
            $(addlayer_elm).data("clicked", ++click); 

            ref_canvas_id = addlayer_elm.getAttribute("data-ref-canvas-id");
            // shoud be outdated_
            //var canvas_create_elm = document.getElementById(ref_canvas_id+"canvas");
            var layer = document.createElement("canvas");
 
            layer.className = "layer"; 
      		layer.draggable="true" ;
            layer.id=ref_canvas_id +"layer"+ click;
            layer.setAttribute( "data-ref-canvas-id",ref_canvas_id );

            //style
            var zindex= click +2 ;
            console.log(zindex);
            layer.setAttribute("data-zindex", zindex);
            layer.style.zIndex= zindex ;
            layer.style.border= "2px solid black";
            layer.style.width= "400px" ;
            layer.style.height= "200px" ;
            layer.style.position="absolute";
            // layer.style.left= "200px";
            // layer.style.top="120px";
            //layer.style.background="lightgrey";
            //layer.style.opacity= "0.3"; 
  
           
          
           	var div_layer = document.createElement("div");
            div_layer.id=ref_canvas_id +"div_layer"+ click;
            //div_layer.style.background="red";
            div_layer.style.width= "400px"
            div_layer.style.height= "200px" ;
     		div_layer.className = "div_layer"; 
     		div_layer.style.left= "150px";
            div_layer.style.top="20px";
            div_layer.style.position="absolute";
            div_layer.style.zIndex= zindex ;
            //  shoudd  add the handles here  


            canvasNP.resize_handles(div_layer);
     		 
  			div_layer.appendChild(layer);
  			// canvas_draw_div is actually canvas layers
            
            var canvas_draw_div = document.getElementById(ref_canvas_id+"canvas_layers");
         	canvas_draw_div.appendChild(div_layer);
         	var div_layer_incanvas_inputs = div_layer.getElementsByClassName("in_canvas_input");
         	
         	// must move to canvaswrite becasue it hides and shows 
         	//text inpputs 
            //var topmostelements = Array(); 
          	// $(document).on('click', function(evt){    
           //      console.log(canvas_create_elm.getAttribute("id"));

           //      console.log(create_gui_settingsNP.ismouse_in_canvas(div_layer_incanvas_inputs, layer, evt));

           //  });
            // canvas_draw_div.setAttribute("data-layer-selected", layer.id );

            return  layer.id
			      
		},

        moveclick: function(){

            $(".move").on("click", function(){
                var ref_canvas_id = this.getAttribute("data-ref-canvas-id");
                var toolbox =document.getElementById(ref_canvas_id +"canvasdraw_toolbox");
                var toolbox_selected_tool = toolbox.setAttribute("data-selected-tool","move");

                var toolbox_selected_toolget = toolbox.getAttribute("data-selected-tool");
                $(".div_layer").draggable({ 
                    containment: $("#"+ref_canvas_id+"canvas_layers"),
                    cursor: 'move',
                    cancel:null ,
                    disabled: false });  


            });
        },




        resize_handles :function(div_layer){
            $(div_layer)
            .append('<span class="resize-handle resize-handle-nw"></span>')
            .append('<span class="resize-handle resize-handle-sw"></span>')
            .append('<span class="resize-handle resize-handle-ne"></span>')
            .append('<span class="resize-handle resize-handle-se"></span>')
            $(".resize-handle").on("mouseover",function(){
               // alert("over");

            })

            $(".resize_handler").draggable({


            })


        },

        select_main_layer :function(){

            $(".canvas_layers").each(function(){
                var ref_canvas_id = this.getAttribute("data-ref-canvas-id");

                this.setAttribute("data-selected-layer", ref_canvas_id+"layer0" );
                this.setAttribute("data-selected-index-layer", ref_canvas_id+"layer_index0" );


                });




        }


    };

})();  






$(document).ready(function(){



    canvasNP.select_main_layer();





    canvasNP.moveclick();
    //canvasNP.define_canvas_dim("canvas_create");
     canvasNP.define_canvas_dim("layer");

    $(".add_layer").on("click" ,function(){
         var ref_canvas_id = this.getAttribute("data-ref-canvas-id");
        var canvas_layers = document.getElementById(ref_canvas_id+"canvas_layers");
       
		var added_layer_id = canvasNP.add_layer(this);
        //canvasNP.resize_handles();

        var layer_number =  $(this).data("clicked" );


        canvas_layers.setAttribute("data-selected-layer", added_layer_id );
        canvas_layers.setAttribute("data-selected-index-layer", ref_canvas_id+"layer_index"+layer_number);
        // main_div_layer = document.getElementById("0div_layer0");
        // var canvas_dim = main_div_layer.getBoundingClientRect();
        // main_div_layer.width = canvas_dim.width;
        // main_div_layer.height = canvas_dim.height;




	 });
    

	$(".canvaswrite_but").on("click", function(event){ 

		canvasNP.switchtabs(this,"canvaswritetab");
		 event.preventDefault(); 

	}) ; 






	$(".canvasdraw_but").on("click", function(event){ 

		canvasNP.switchtabs(this,"canvasdrawtab");
		 event.preventDefault(); 


	}) ; 

	$(".canvasimage_but").on("click", function(event){ 

		canvasNP.switchtabs(this,"canvasimagetab");
		 event.preventDefault(); 


	}) ; 



	// layers 

	$(function() {
	    $( ".layers_dialog" ).dialog({
	        width: 232,
	        autoOpen: false

	     
	    });
	});
  



    $('.layers_button').click(function() {

  	
     var dialog_id = $(this).attr('data-layers-dialog-id');
     var ref_canvas_id = $(this).attr('data-ref-canvas-id');

     canvasNP.display_layers(ref_canvas_id);
     $('#'+ dialog_id).dialog({
        position:{ my: "left top", at: "left top", of: this }
      });
      $('#'+ dialog_id).dialog('open')

      
    });


});