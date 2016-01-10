
var create_gui_settingsNP = (function(){

	return{

		get_font: function(ref_canvas_id){
			var font_selector = document.getElementById(ref_canvas_id+"font_selector");
			var fontpicked = font_selector.options[font_selector.selectedIndex].value;
			return fontpicked
		},
		// site wide function 

		get_colour: function(ref_canvas_id){	
			var colour  = document.getElementById(ref_canvas_id+"colour").value;
			return colour
		},

		get_opacity: function(ref_canvas_id){	
			var opacity  = document.getElementById(ref_canvas_id+"colour").getAttribute('data-opacity');	
			return opacity
		},


		get_size: function(ref_canvas_id){
			var font_brush_size_selector = document.getElementById(ref_canvas_id+"size_selector").value;
			return font_brush_size_selector
		},

// u are passing  the canvas input here 
		getMousePos_element: function (canvas_layer, element) {
		    var canvas_layer_dim = canvas_layer.getBoundingClientRect();
		    var  element_dim =  element.getBoundingClientRect();
		    return {
		      x:  element_dim.x - canvas_layer_dim.left,
		      y: element_dim.y - canvas_layer_dim.top,

		    };
		},

		getMousePos_event: function (canvas_layer, event) {
		    var canvas_layer_dim = canvas_layer.getBoundingClientRect();
		    return {
		      x:  event.clientX - canvas_layer_dim.left,
		      y:  event.clientY - canvas_layer_dim.top,

		    };
		 },

		
             

		ismouse_in_canvas: function(in_canvas_input ,canvas , evt){
			// an array higher up in the scope  that can hold all the bublled up ids
			// pick the id with the largest zIndex
			//document.getElementsByClassName()
			
			var rect = canvas.getBoundingClientRect();
		
			var istrue = null;
		    if (evt.clientX > rect.x &&  evt.clientX < rect.right &&  evt.clientY < rect.bottom  && evt.clientY > rect.top - 20)
		    {	
				istrue = true;
				for(var i=0; i<in_canvas_input.length ; i++){
					in_canvas_input[i].style.opacity= "0.9";
				}
		    }else{


		    	for(var i=0; i<in_canvas_input.length ; i++){
					in_canvas_input[i].style.opacity= "0.0";
				}
		    	 istrue = false;
		    }


			 
		    return istrue 
		}


		
	};

})();

$(document).ready(function(){
	// $(".add_texts").button();
	// $( ".font_selector" ).selectmenu();
	$("input[type=submit]").button();
	
	


});
