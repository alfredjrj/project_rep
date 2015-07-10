
var create_gui_settingsNP = (function(){

	return{

		get_font: function(ref_canvas_id){
			var font_selector = document.getElementById(ref_canvas_id+"font_selector");
			var fontpicked = font_selector.options[font_selector.selectedIndex].value;
			return fontpicked
		},

		get_size: function(ref_canvas_id){
			var font_brush_size_selector = document.getElementById(ref_canvas_id+"size_selector").value;
			return font_brush_size_selector
		},


		getMousePos: function (canvas, evt) {
		    var rect = canvas.getBoundingClientRect();
		    return {
		      x: evt.clientX - rect.left,
		      y: evt.clientY - rect.top,

		    };
		},

		define_canvas_dim: function(canvas_create_elm){
            var canvas_dim = canvas_create_elm.getBoundingClientRect();
            canvas_create_elm.width = canvas_dim.width;
            canvas_create_elm.height = canvas_dim.height;
        },
             

		ismouse_in_canvas: function(in_canvas_input ,canvas , evt){


			var rect = canvas.getBoundingClientRect();
		
			var istrue = null;
		    if (evt.clientX > rect.x &&  evt.clientX < rect.right &&  evt.clientY < rect.bottom  && evt.clientY > rect.top - 20)
		    {	
				istrue = true;
				in_canvas_input.style.opacity= "0.9";
		    }else{


		    	in_canvas_input.style.opacity= "0.0"; 
		    	 istrue = false;
		    }


			 
		    return istrue 
		}


		
	};

})();