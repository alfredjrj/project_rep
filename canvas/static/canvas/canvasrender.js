


var canvasrenderNP = (function() {

	var canvas_ids = "{{user_canvas_ids}}";

	return {

		canvaswrite: function (canvasid, canvas_text){
			var c = document.getElementById(canvasid);
			var ctx = c.getContext("2d");
			ctx.font = "20px Arial";
			ctx.fillText(canvas_text,10,50);
		},

		render_all_canvas: function(){
			var canvas_element= [];
			
			for (i = 0; i < canvas_ids.length; i++){
				canvas_element[i] = document.getElementById( canvas_ids[i]);
				this.canvaswrite(canvas_element[i],canvas_element[i].getAttribute("canvas_post"))
			}
			alert(canvas_element)
		},

		canvas_ids

    };  
})();   




