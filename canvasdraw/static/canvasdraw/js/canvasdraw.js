var draw_gui_settingsNP = (function(){

	return{

		getMousePos: function (canvas, evt) {
		    var rect = canvas.getBoundingClientRect();
		    return {
		      x: evt.clientX - rect.left,
		      y: evt.clientY - rect.top,

		    };
		}

	};

})();

var canvasdrawNP= (function(){

	return{

		drawclick: function(){

			$(".draw_tool_selector").on("click", function(){
			
				var ref_canvas_id = this.getAttribute("data-ref-canvas-id");
				var toolbox =document.getElementById(ref_canvas_id +"canvasdraw_toolbox");
				var toolbox_selected_tool = toolbox.setAttribute("data-selected-tool","draw");
				$(".layer").draggable({
					 disabled: true });


			});

		},

		moveclick: function(){

			$(".move").on("click", function(){
				var ref_canvas_id = this.getAttribute("data-ref-canvas-id");
				var toolbox =document.getElementById(ref_canvas_id +"canvasdraw_toolbox");
				var toolbox_selected_tool = toolbox.setAttribute("data-selected-tool","move");

				var toolbox_selected_toolget = toolbox.getAttribute("data-selected-tool");
				$(".layer").draggable({ 
					containment: $("#"+ref_canvas_id+"canvas"),
	                cancel:null ,
					disabled: false });  


			});
		},

		draw: function(){

			var last_mouse = {x: 0, y: 0};
			var mouse = {x: 0, y: 0};

			var ctx = null; 
			 
			/* Mouse Capturing Work */
			$(".layer").on('mousemove', function(event) {
				var canvas = document.getElementById(this.id);
				last_mouse.x = mouse.x;
			    last_mouse.y = mouse.y;
			 	mousePos = draw_gui_settingsNP.getMousePos(canvas, event);
				mouse.x = mousePos.x ; 
				mouse.y = mousePos.y; 
			  
			});

		

			$(".layer").on('mousedown', function(e) {
				var canvas = document.getElementById(this.id);
				ctx = canvas.getContext('2d');

				// canvas_dim = canvas.getBoundingClientRect();
				// alert(canvas.width);
				// canvas.width = canvas_dim.width;
				// canvas.height = canvas_dim.height;
				ref_canvas_id = this.getAttribute("data-ref-canvas-id");

				ctx.lineWidth = 5;
				ctx.lineJoin = 'round';
				ctx.lineCap = 'round';
				ctx.strokeStyle = create_gui_settingsNP.get_colour(ref_canvas_id);
				

				var toolbox =document.getElementById(ref_canvas_id +"canvasdraw_toolbox");
				var toolbox_selected_tool = toolbox.getAttribute("data-selected-tool");
			
    			
				if(toolbox_selected_tool== "draw"){

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

		},

		// selected_layer: function(ref_canvas_id){
		// 	var canvas_draw_div = document.getElementById(ref_canvas_id+"canvas_draw_div");
		// 	return canvas_draw_div.getAttribute("data-layer-selected");

		// },


	};

})();



$(document).ready(function(){  

	canvasdrawNP.moveclick();
	canvasdrawNP.drawclick();


	$(".add_layer").click(function(){

		// var ref_canvas_id =  this.getAttribute("data-ref-canvas-id");
		// console.log(canvasdrawNP.selected_layer(ref_canvas_id));
		canvasdrawNP.draw();
	 });

});

