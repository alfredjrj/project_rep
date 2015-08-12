


var canvasNP= (function() {

	return{
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

		add_layer: function(addlayer_elm){
			var id = $(addlayer_elm).attr("id");
            var click = $(addlayer_elm).data("clicked") || 0;
            $(addlayer_elm).data("clicked", ++click); 

            ref_canvas_id = addlayer_elm.getAttribute("data-ref-canvas-id");
            var canvas_create_elm = document.getElementById(ref_canvas_id+"canvas");
            var layer = document.createElement("canvas");
 
            layer.className = "layer"; 
      		layer.draggable="true" ;
            layer.id=ref_canvas_id +"layer"+ click;
            layer.setAttribute( "data-ref-canvas-id",ref_canvas_id );

            //style
            var zindex= click +5 ;
            console.log(zindex);
            // layer.style.zIndex= zindex ;
            layer.style.border= "2px solid black";
            layer.style.width= "300px" ;
            layer.style.height= "150px" ;
            layer.style.position="absolute";
            // layer.style.left= "200px";
            // layer.style.top="120px";
            layer.style.background="lightgrey";
            layer.style.opacity= "0.3"; 
  
           
          
           	var div_layer = document.createElement("div");
            div_layer.id=ref_canvas_id +"div_layer"+ click;
            //div_layer.style.background="red";
            div_layer.style.width= "300px"
            div_layer.style.height= "150px" ;
     		div_layer.className = "div_layer"; 
     		div_layer.style.left= "200px";
            div_layer.style.top="120px";
            div_layer.style.position="absolute";
            div_layer.style.zIndex= zindex ;
     		 
  			div_layer.appendChild(layer);
  			// canvas_draw_div is actually canvas layers
            
            var canvas_draw_div = document.getElementById(ref_canvas_id+"canvas_layers");
         	canvas_draw_div.appendChild(div_layer);
         	var div_layer_incanvas_inputs = div_layer.getElementsByClassName("in_canvas_input");
         	
         	// must move to canvaswrite becasue it hides and shows 
         	//text inpputs 
          	$(document).on('click', function(evt){    
                console.log(canvas_create_elm.getAttribute("id"));

                console.log(create_gui_settingsNP.ismouse_in_canvas(div_layer_incanvas_inputs, layer, evt));

            });
            // canvas_draw_div.setAttribute("data-layer-selected", layer.id );

			      
		}


    };

})();  






$(document).ready(function(){




    canvasNP.define_canvas_dim("canvas_create");

    $(".add_layer").on("click" ,function(){

		canvasNP.add_layer(this);

	 });
    

	$(".canvaswrite_but").click(function(event){ 

		canvasNP.switchtabs(this,"canvaswritetab");
		 event.preventDefault(); 

	}) ; 


	$(".canvasdraw_but").click(function(event){ 

		canvasNP.switchtabs(this,"canvasdrawtab");
		 event.preventDefault(); 


	}) ; 

	$(".canvasimage_but").click(function(event){ 

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