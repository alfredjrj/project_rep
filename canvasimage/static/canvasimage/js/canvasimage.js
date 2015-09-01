

var canvasimageNP= (function() {



    //function add_image_layer() {}


    return {

	    add_image_layer: function(ref_canvas_id, click, source, newWidth, newHeight ){

	    	var image_layer = document.createElement("img");
 
            image_layer.className = "layer"; 
      		image_layer.draggable="true" ;
            image_layer.id=ref_canvas_id +"layer"+ click;
            image_layer.setAttribute( "data-ref-canvas-id",ref_canvas_id );
            image_layer.src = source;
            image_layer.width= newWidth;
            image_layer.height=newHeight;
            image_layer.style.zIndex= click +2; 
            // $(image_layer).closest("div").css("zIndex")
            // image_layer.style.position="absolute"
             // image_layer.style.left = "0px";
             // image_layer.style.right ="0px";


            var div = document.getElementById(ref_canvas_id +"div_layer"+ click);
            div.style.width= newWidth+ "px";
            div.style.height= newHeight + "px"; 

            // only delete the canvas 
            $(div).empty(); 
          

            div.appendChild(image_layer);


	    }

    };

})();  


$(document).ready(function(){



	$(".add_image").on("click", function(){

		// if gif skipp all of it and att id to layer

		
		var ref_canvas_id = this.getAttribute("data-ref-canvas-id");
		$("#"+ref_canvas_id+"add_layer").click();
		var clicked =$("#"+ref_canvas_id+"add_layer").data("clicked");
		alert(clicked);


		var image_source = document.getElementById(ref_canvas_id+"image_source");

		var file_ext = image_source.value.split('.').pop();

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

			};


			img.src =image_source.value; 





		if(file_ext !== "gif"){	
			alert(clicked);
			
			var layer = document.getElementById(ref_canvas_id+"layer" + clicked); 
			var div_layer = document.getElementById(ref_canvas_id+"div_layer" + clicked); 
			var ctx = layer.getContext('2d');

			// var img = new Image;      // First create the image...
			// img.onload = function(){ 
			// 	//alert(img.width); // ...then set the onload handler...
			// 	var newWidth = img.width; 
			// 	var newHeight= img.height; 
			
			// 	while( newWidth>400) {
			// 		newWidth= newWidth/1.1; 
			// 		newHeight= newHeight/1.1;
			
			// 	}

			// 	while( newHeight>200) {
			// 		newWidth= newWidth/1.1; 
			// 		newHeight= newHeight/1.1;
				
				
				
			// 	}



				// img.width= newWidth;
				// img.height= newHeight; 
				layer.style.width=img.width + "px";
				layer.style.height=img.height  + "px";


				div_layer.style.width=img.width + "px";
				div_layer.style.height=img.height  + "px";
				


			  ctx.drawImage(img,0,0,img.width,img.height);
			// };


			// img.src =image_source.value; 
		}else{
			alert("its  a gif");

			canvasimageNP.add_image_layer(ref_canvas_id, clicked, image_source.value ,img.width,img.height );

		}




	});

});
