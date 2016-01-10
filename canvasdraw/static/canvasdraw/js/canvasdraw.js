

var canvasdrawNP= (function(){

	return{

		drawclick: function(){

			$(".draw_tool_selector").on("click", function(){
			
				var ref_canvas_id = this.getAttribute("data-ref-canvas-id");
				var toolbox =document.getElementById(ref_canvas_id +"canvasdraw_toolbox");
				var toolbox_selected_tool = toolbox.setAttribute("data-selected-tool","draw");
				$(".div_layer").draggable({
					 disabled: true });


			});

		},



		

		define_ctx: function(layerid){

			var canvas = document.getElementById(layerid);
			//alert(canvas.id);
			var canvas_dim =canvas.getBoundingClientRect();
			//canvas.width= canvas_dim.width;
			//canvas.height= canvas_dim.height;
			var ref_canvas_id = canvas.getAttribute("data-ref-canvas-id");
			var ctx = canvas.getContext('2d');
			
			ctx.lineWidth = 5;
			ctx.lineJoin = 'round';
			ctx.lineCap = 'round';
			ctx.strokeStyle = create_gui_settingsNP.get_colour(ref_canvas_id);

			return ctx; 


		},

		draw: function(){

			var last_mouse = {x: 0, y: 0};
			var mouse = {x: 0, y: 0};
			var ctx = null; 
			 
			/* Mouse Capturing Work */
			
//  sepficlay selected alyer 
			$(".layer").on('mousemove', function(event) {
				var canvas_layer = document.getElementById(this.id);
				last_mouse.x = mouse.x;
			    last_mouse.y = mouse.y;
			 	mousePos = create_gui_settingsNP.getMousePos_event(canvas_layer, event);
				mouse.x = mousePos.x ; 
				mouse.y = mousePos.y; 

			
			});

		

			$(".layer").on('mousedown', function(e) {
				// changes to div shoudl be layer
				var selected_layer = $(this).closest(".canvas_layers").attr("data-selected-layer");

				//alert(selected_layer);

				//var selected_canvas_layer= $(selected_layer).children("canvas");

				
				ctx = canvasdrawNP.define_ctx(selected_layer);
		
				var ref_canvas_id = this.getAttribute("data-ref-canvas-id");
				var toolbox =document.getElementById(ref_canvas_id +"canvasdraw_toolbox");
				var toolbox_selected_tool = toolbox.getAttribute("data-selected-tool");
				var tab =  canvasNP.tab_zindex(this.id);
				
    			
				if(toolbox_selected_tool == "draw" && tab.canvasdrawtab_zindex == tab.largest_zindex){

					console.log("moysedown");
				    ctx.beginPath();
				    ctx.moveTo(mouse.x, mouse.y);
				 
				    $("#"+this.id).on('mousemove', onPaint);

				}else{

					return;
				}
			});
			 

		    $(".layer").on('mouseup', function() {
		
		    		$("#"+this.id).off('mousemove', onPaint);
		 
			});

		
			 
			var onPaint = function() {
	
					console.log("paiining");
				  	ctx.beginPath();
				    ctx.moveTo(last_mouse.x, last_mouse.y);
				    ctx.lineTo(mouse.x, mouse.y);
				    ctx.closePath();
				    ctx.stroke();
				
			};

		}



	};

})();



$(document).ready(function(){  

	//canvasdrawNP.moveclick();
	canvasdrawNP.drawclick();
	canvasdrawNP.draw();


	$(".add_layer").on("click", function(){

		// var selected_layer= canvas_layers.getAttribute("selected_layer"); 


		// var ref_canvas_id =  this.getAttribute("data-ref-canvas-id");
		// console.log(canvasdrawNP.selected_layer(ref_canvas_id));
		canvasdrawNP.draw();


	 });




});

