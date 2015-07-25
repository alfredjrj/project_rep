 $(".canvas_form").submit(function(event){
    event.preventDefault();


    var ref_canvas_id = this.getAttribute("data-ref-canvas-id");
     

    var canvas_create_div = document.getElementById(ref_canvas_id+"canvas_create_div");
    var canvas_create_div_incanvas_inputs= canvas_create_div.getElementsByClassName("in_canvas_input");
    
    //var arr = [].slice.call(canvas_create_div_incanvas_inputs);
    //console.log($("#"+arr[0].id).prop('outerHTML'));
    //console.log($('#'+ref_canvas_id+"canvas_create_div").prop('outerHTML'));


    var text_font  = [];  
    var canvas_text = [];
    var text_size = [];
    var text_color = [];
    var text_opacity = [];
    var text_x_pos = [];
    var text_y_pos= [];
   
   

   for(var i=0; i<canvas_create_div_incanvas_inputs.length; i++){

        text_font.push($('#'+canvas_create_div_incanvas_inputs[i].id).attr('data-font'));
        canvas_text.push($('#'+canvas_create_div_incanvas_inputs[i].id).val());
        text_size.push($('#'+canvas_create_div_incanvas_inputs[i].id).attr('data-font-size'));
        text_color.push($('#'+canvas_create_div_incanvas_inputs[i].id).attr('data-color'));
        text_opacity.push($('#'+canvas_create_div_incanvas_inputs[i].id).attr('data-opacity'));
        text_x_pos.push($('#'+canvas_create_div_incanvas_inputs[i].id).attr('data-x-pos'));
        text_y_pos.push($('#'+canvas_create_div_incanvas_inputs[i].id).attr('data-y-pos'));
        

   }
   

    function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');


  
var postdata={
      'canvas_text[]': canvas_text, 
      'text_font[]': text_font,
      'text_size[]': text_size,
      'text_color[]': text_color,
      'text_opacity[]': text_opacity,
      'text_x_pos[]': text_x_pos,
      'text_y_pos[]': text_y_pos, 

      'csrfmiddlewaretoken': csrftoken,     
    }


    

    console.log(canvas_text);
    console.log(text_font);
    console.log(text_size);
    console.log(text_color);
    console.log(text_opacity);
    console.log(text_x_pos);
    console.log(text_y_pos);

  $.post("/humour/home/create_canvas_post/0", postdata , function(data){
    console.log(data);
    //location.reload() ;
 

    }, "json")
   .fail(function() {
    alert( "error" );
  });


  })

