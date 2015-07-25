

var canvasrenderNP = (function() {

	

	return {

		canvaswrit: function(){
			create_gui_settingsNP.define_canvas_dim("canvas");
			create_gui_settingsNP.define_canvas_dim("child_canvases");

			var incanvas_text_data_div= document.getElementsByClassName("incanvas_text_data");
          
            var lineHeight = 23;
            
            alert(incanvas_text_data_div.length)

          	for (var i =0 ; i <incanvas_text_data_div.length; i++ ){

          		var text_data =incanvas_text_data_div[i].getElementsByTagName("P");
          		var canvas_id =incanvas_text_data_div[i].getAttribute("data-ref-canvas-id");
          		var canvas = document.getElementById(canvas_id); 
          		var maxWidth = canvas.width - 20;

          		var canvas_content = canvas.getContext('2d');
          		alert(incanvas_text_data_div[i].getAttribute("class"));
          		
          		for(var a =0 ; a < text_data.length; a++ ){ 

          			var text =text_data[a].getAttribute("data-text");
          			var text_color =text_data[a].getAttribute("data-color");
          			var text_font =text_data[a].getAttribute("data-font");
          			var text_size =text_data[a].getAttribute("data-font-size");
          			var text_opacity =text_data[a].getAttribute("data-opacity");
          			var x_pos =text_data[a].getAttribute("data-x-pos");
          			var y_pos =text_data[a].getAttribute("data-y-pos");

					canvaswriteNP.addTextCnv(canvas_content, text, 
					x_pos, y_pos , maxWidth, lineHeight, text_font, text_size, text_color);

          			alert(text_data[a].getAttribute("data-text"));

          		}
          		

          	}
          	

		},



		canvaswrite: function (canvasid, canvas_text , font_size, post_font){


			
            

			var canvas_with_id = document.getElementById(canvasid);
            var canvas_content = canvas_with_id.getContext('2d');

            // sets maximum line width, line height, and x /y coords for text
            var maxWidth = canvas_with_id.width - 10;
            var lineHeight = 23;
            var x_pos = (canvas_with_id.width - maxWidth) / 2;
            var y_pos = 25;

		
			canvaswriteNP.addTextCnv(canvas_content, canvas_text, 
				x_pos, y_pos , maxWidth, lineHeight, post_font, font_size);
		
		},

		render_all_canvas: function(){
			create_gui_settingsNP.define_canvas_dim("canvas");
			create_gui_settingsNP.define_canvas_dim("child_canvases");
			
			user_string_of_ids = eval(user_canvas_ids).join(",");
			user_canvas_ids_js = user_string_of_ids.split(',');
			var canvas_element= [];
			
			for (i = 0; i < user_canvas_ids_js.length; i++){

				if (document.getElementById(user_canvas_ids_js[i])){ 
					canvas_element[i] = document.getElementById(user_canvas_ids_js[i]);
					this.canvaswrite(user_canvas_ids_js[i], canvas_element[i].getAttribute("canvas_post"),
					canvas_element[i].getAttribute("data-post-font-size"),
					canvas_element[i].getAttribute("data-post-font"));
					
				}
			}
			
		},
	
    };  
})();   

$(document).ready(function(){
 	//canvasrenderNP.render_all_canvas();
 	canvasrenderNP.canvaswrit();


});


