

$(document).ready(function(){



	$(".add_image").on("click", function(){

		
		var ref_canvas_id = this.getAttribute("data-ref-canvas-id");
		$("#"+ref_canvas_id+"add_layer").click();
		var clicked =$("#"+ref_canvas_id+"add_layer").data("clicked");
		//alert(clicked);


		var image_source = document.getElementById(ref_canvas_id+"image_source");
		
		var layer = document.getElementById(ref_canvas_id+"layer" + clicked); 
		var div_layer = document.getElementById(ref_canvas_id+"div_layer" + clicked); 
		var ctx = layer.getContext('2d');

		var img = new Image;      // First create the image...
		img.onload = function(){ 
			//alert(img.width); // ...then set the onload handler...
			var newWidth = img.width; 
			var newHeight= img.height; 
		
			while( newWidth>400) {
				newWidth= newWidth/1.1; 
				newHeight= newHeight/1.1;
		
			}

			while( newHeight>200) {
				newWidth= newWidth/1.1; 
				newHeight= newHeight/1.1;
			
			
			
			}



			img.width= newWidth;
			img.height= newHeight; 
			layer.style.width=img.width + "px";
			layer.style.height=img.height +"px";

			div_layer.style.width=img.width + "px";
			div_layer.style.height=img.height +"px";


		  ctx.drawImage(img,0,0,img.width,img.height);
		};

		img.src =image_source.value; 



	});

});
