
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


		getMousePos: function (canvas, evt) {
		    var rect = canvas.getBoundingClientRect();
		    return {
		      x: evt.x - rect.left,
		      y: evt.y - rect.top,

		    };
		},

		

		define_canvas_dim: function(canvas_class){
			var canvas_create_array = document.getElementsByClassName(canvas_class);
			for(var i = 0 ; i< canvas_create_array.length ; i++){
	            var canvas_dim = canvas_create_array[i].getBoundingClientRect();
	            canvas_create_array[i].width = canvas_dim.width;
	            canvas_create_array[i].height = canvas_dim.height;
        	}
        },
             
             

		ismouse_in_canvas: function(in_canvas_input ,canvas , evt){

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
