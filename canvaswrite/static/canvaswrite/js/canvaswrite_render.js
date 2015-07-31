

var canvasrenderNP = (function() {

	

	return {

		canvaswrite: function(){
			create_gui_settingsNP.define_canvas_dim("canvas");
			create_gui_settingsNP.define_canvas_dim("child_canvases");

			var incanvas_text_data_div= document.getElementsByClassName("incanvas_text_data");
          
            var lineHeight = 23;


          	for (var i =0 ; i <incanvas_text_data_div.length; i++ ){

          		var text_data =incanvas_text_data_div[i].getElementsByTagName("P");
          		var canvas_id =incanvas_text_data_div[i].getAttribute("data-ref-canvas-id");
          		
          		var canvas = document.getElementById(canvas_id); 
          		var maxWidth = canvas.width - 20;


          		var canvas_content = canvas.getContext('2d');
      
          		
          		for(var a =0 ; a < text_data.length; a++ ){ 

          			var text =text_data[a].getAttribute("data-text");
          			var text_color =text_data[a].getAttribute("data-color");
          			var text_font =text_data[a].getAttribute("data-font");
          			var text_size =text_data[a].getAttribute("data-font-size");
          			var text_opacity =text_data[a].getAttribute("data-opacity");
          			var x_pos =text_data[a].getAttribute("data-x-pos");
          			var y_pos =text_data[a].getAttribute("data-y-pos");

					canvaswriteNP.addTextCnv(canvas_content, text, 
					x_pos, parseInt(y_pos) , maxWidth, lineHeight, text_font, text_size, text_color);

          		}
          		

          	}
          	

		},


	
    };  
})();   

$(document).ready(function(){

 	canvasrenderNP.canvaswrite();


});


