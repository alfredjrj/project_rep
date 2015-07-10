

var canvasrenderNP = (function() {

	

	return {



		canvaswrite: function (canvasid, canvas_text){


			var canvas_with_id = document.getElementById(canvasid);
			create_gui_settingsNP.define_canvas_dim(canvas_with_id);
            var canvas_content = canvas_with_id.getContext('2d');

            // sets maximum line width, line height, and x /y coords for text
            var maxWidth = canvas_with_id.width - 10;
            var lineHeight = 23;
            var x_pos = (canvas_with_id.width - maxWidth) / 2;
            var y_pos = 25;

		
			canvaswriteNP.addTextCnv(canvas_content, canvas_text, x_pos, y_pos , maxWidth, lineHeight, "Arial", "15");
		
		},

		render_all_canvas: function(){
			
			user_string_of_ids = eval(user_canvas_ids).join(",");
			user_canvas_ids_js = user_string_of_ids.split(',');
			var canvas_element= [];
			
			for (i = 0; i < user_canvas_ids_js.length; i++){

				if (document.getElementById(user_canvas_ids_js[i])){ 
					canvas_element[i] = document.getElementById(user_canvas_ids_js[i]);
					this.canvaswrite(user_canvas_ids_js[i], canvas_element[i].getAttribute("canvas_post"))
				}
			}
			
		},
	
    };  
})();   

$(document).ready(function(){
 	canvasrenderNP.render_all_canvas()


});


