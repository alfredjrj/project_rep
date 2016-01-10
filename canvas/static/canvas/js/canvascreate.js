


var canvasNP= (function() {

	return{
        

            change_layer_order:function(ref_canvas_id, pre , i){

                  var moveto_layer_index_div = document.getElementById(ref_canvas_id+"layer_index_div"+pre);
                            var get_layer_index_div= document.getElementById(ref_canvas_id+"layer_index_div"+i);
                            var moved_down_index_layer = get_layer_index_div.childNodes; 
                            // alert(pre);
                            alert(moved_down_index_layer[0].id  + "herer"); 
                            // alert(moveto_layer_index_div.id);

                            moved_down_index_layer[0].setAttribute("data-layer-index-div", moveto_layer_index_div.id );

                            var layer_id= moved_down_index_layer[0].getAttribute("layer_id");
                            
                            var layer = document.getElementById(layer_id );
                            alert(layer.id);
                            layer.setAttribute("data-zindex", Number(pre)+2);
                            

                            moveto_layer_index_div.appendChild(moved_down_index_layer[0]);


            },

            arrange_div_layers_by_zindex: function(Adiv_layers){

              var div_layers_arranged = [];     
             var elements_to_remove = 0 ;

              for(var i =Adiv_layers.length-1 ;i>=0; i--){
                div_layers_arranged[(Adiv_layers[i].style.zIndex )-2]= Adiv_layers[i];
              }


              for(var i =div_layers_arranged.length-1 ;i>=0; i--){
   
                if(typeof div_layers_arranged[i] === 'undefined'){
                    //alert("undefined");
                    elements_to_remove =1;
                  
                    
                    var div_layer_moved= 0; 
                    var wi = i+1;
            
                    if (typeof div_layers_arranged[wi] === 'undefined' )
                     {  break; }

                     if(typeof div_layers_arranged[wi] ){
                    //     wi++  ;
                       div_layer_moved = div_layers_arranged[wi];

                        // alert(i + " wi " + wi + div_layer_moved.id); 

                        $(div_layer_moved).css('z-index',i+2);
                        $(div_layer_moved).children(".layer").css('z-index',i+2);
                        $(div_layer_moved).children(".layer").attr("data-zindex",i+2 )
                         div_layers_arranged[i]= div_layer_moved;
                       
                          div_layers_arranged[wi]=undefined ;
                          // makes first if statment true 
                     }
                    
                    //alert(typeof div_layers_arranged[wi] + " type"  + " wi " + wi); 
                   
                    i+=2;
                }
                   
              }

                for(var i  = 0 ; i< elements_to_remove; i++ ){
                    div_layers_arranged.pop(); 

                }

                // alert(div_layers_arranged.length-1);

                // for(var i =div_layers_arranged.length-1 ;i>=0; i--){
                //     alert(div_layers_arranged[i].id + "id"); 
                // }
              

              return div_layers_arranged ; 

            },

              delete_layer: function(canvas_div_layers, ref_canvas_id, Adiv_layers_arranged){
               $(".delete_layer").on("click tap", function(){
                var canvas_layers_div = document.getElementById(ref_canvas_id+"canvas_layers");

                    $("." + ref_canvas_id+"layer_index").each(function(){
                        this.style.border="2px solid black"; 
                    })
                    
                    $(this).parent().css("border" , "4px solid #4776F4");
                    $(canvas_layers_div).attr("data-selected-layer",$(this).parent().attr("data-layer-id") ); 
                    $(canvas_layers_div).attr("data-selected-index-layer", $(this).parent().attr("id"));
                  

              
                  
                    var delete_layer_with_id = $(this).parent().attr('layer_id');
                    $("#"+delete_layer_with_id).remove();
                 
                    for(var i=0;  i < canvas_div_layers.length; i++ ){
                    
                        $(canvas_div_layers[i]).attr("id", ref_canvas_id +"div_layer"+i);
                        $(canvas_div_layers[i]).children(".layer").attr("id", ref_canvas_id +"layer"+i);
                      
                    }

                    // var all_canvas_layers_arranged = [];
                    // all_canvas_layers_arranged=  canvasNP.arrange_div_layers_by_zindex(canvas_div_layers); 
                     canvasNP.display_layers(ref_canvas_id ); 
                        
                

                });

            
            },

            duplicate_layer: function(ref_canvas_id){

                 $(".duplicate_layer").on("click", function(){
                       var duplicate_layer_with_id = $(this).parent().attr('data-layer-id');

                    alert("hhelo" + duplicate_layer_with_id);
                   duplicate_layer_context = document.getElementById(duplicate_layer_with_id).getContext('2d');
                     $("#"+ref_canvas_id+"add_layer").click();


                      // get the added layer and change the canvas 
                    

                    });

            }, 

            refresh_layer_catalogue: function(Adiv_layers_arranged, ref_canvas_id ){

                var layer_catalogue_div = document.getElementById(ref_canvas_id+"layers" );
                $(layer_catalogue_div).empty();

             
              for(var i =Adiv_layers_arranged.length-1 ;i>=0; i--){
              

                // rename to div layers
                var layer_index = document.createElement('div');
                layer_index.className="layer_index "+ref_canvas_id+"layer_index";
                layer_index.id=ref_canvas_id+"layer_index"+i; 
                layer_index.setAttribute( "data-ref-canvas-id",ref_canvas_id );                
                layer_index.setAttribute("layer_id",Adiv_layers_arranged[i].id  );                   
                layer_index.setAttribute("data-layer-index-div", ref_canvas_id+"layer_index_div"+i);


                var canvas_div_items = Adiv_layers_arranged[i].getElementsByClassName("layer");
               for( var ii= 0 ; canvas_div_items.length > ii ; ii++ ){

                    if(canvas_div_items[ii].tagName == "IMG"){
                        alert(canvas_div_items[ii].src);
                        var layer_index_img = document.createElement('img');
                        layer_index_img.src = canvas_div_items[ii].src; 
                        layer_index_img.className = "layer_catalogue_element";                   
                        layer_index.appendChild(layer_index_img);

                    }


                    if(canvas_div_items[ii].tagName == "CANVAS"){
                        layer_index.setAttribute("data-layer-id", canvas_div_items[ii].id );                
                        var layer_index_canvas = document.createElement('canvas');
                        var context = layer_index_canvas.getContext('2d');
                        context.drawImage( canvas_div_items[ii], 0, 0, 300,150);
                        layer_index_canvas.className = "layer_catalogue_element";
                        layer_index.appendChild(layer_index_canvas);

                    } 

                 
               }


                var delete_icon = document.createElement("span");
                delete_icon.className = "delete_layer";
                layer_index.appendChild(delete_icon);

                var copy_icon = document.createElement('span'); 
                copy_icon.className = "duplicate_layer";
                layer_index.appendChild(copy_icon);

          

                var layer_index_div = document.createElement("div");
                layer_index_div.className= "layer_index_div";
                layer_index_div.id= ref_canvas_id+"layer_index_div"+i; 
                layer_index_div.setAttribute("data-layer_index_div-number", i);


                layer_index_div.appendChild(layer_index);             
                layer_catalogue_div.appendChild(layer_index_div);

                  

            }

                $( ".delete_layer" ).button({
                  icons:{
                    primary:"ui-icon-trash "
                  }

                 } );

                 $( ".duplicate_layer" ).button({
                  icons:{
                    primary:"ui-icon-newwin"
                  }

                 } );

                

            }, 


          display_layers: function(ref_canvas_id){

            // reman to main canvas
            var canvas_layers_div = document.getElementById(ref_canvas_id+"canvas_layers");
            var canvas_div_layers= canvas_layers_div.getElementsByClassName("div_layer");
            var layers_div = document.getElementById(ref_canvas_id+"layers" );
          
            //  rename layers_div to  layer_cataglue_div
            

            var all_canvas_layers_arranged = [];
            all_canvas_layers_arranged=  canvasNP.arrange_div_layers_by_zindex(canvas_div_layers); 
     
            canvasNP.refresh_layer_catalogue( all_canvas_layers_arranged, ref_canvas_id );
            
            canvasNP.delete_layer(canvas_div_layers, ref_canvas_id, all_canvas_layers_arranged);
            canvasNP.duplicate_layer(ref_canvas_id); 
    

            $("." + ref_canvas_id+"layer_index").draggable({ 
                    containment: $("#"+layers_div.id),
                    cursor: 'move', 
                    cancel:null ,
                    axis: "y",
        
            }); 

         
            $(".layer_index_div").droppable({
                accept:".layer_index",
                drop : function(event, ui){

                    
                    var layer_index_id = ui.draggable.attr('id');
                    var layer_index = document.getElementById(layer_index_id );
                    //alert(layer_index.id); 

                    var ref_canvas_id = layer_index.getAttribute("data-ref-canvas-id");   
                    console.log(layer_index.id);

                    
                    layer_index.style.top="0px";
                    layer_index.style.left="0px";
              
                    var layer_index_div_moved_id = layer_index.getAttribute("data-layer-index-div");
                    layer_index.setAttribute("data-layer-index-div", this.id)

                    var  layer_index_div_moved = document.getElementById(layer_index_div_moved_id);
                    var layer_index_div_droped = document.getElementById(this.id);


                    var layer_index_div_moved_number = layer_index_div_moved.getAttribute("data-layer_index_div-number");
                    var layer_index_div_droped_number = layer_index_div_droped.getAttribute("data-layer_index_div-number");

                    // alert(layer_index_div_moved_id);
                    // alert(layer_index_div_moved_number);
                    // alert(layer_index_div_droped_number);

                    // this loop is for if index_layer is moved up
                    // do one for when indexlayer is  moved down
                    // works if not over canvas because it donest cause the otherdrop
                    
                    if ( Number(layer_index_div_moved_number)< layer_index_div_droped_number) {
                        var pre=Number(layer_index_div_moved_number);     
                        for(var i= Number(layer_index_div_moved_number)+1; i<= layer_index_div_droped_number; i++,pre++)
                        {
                           
                          canvasNP.change_layer_order(ref_canvas_id, pre, i );

                        }
                    }



                    if ( Number(layer_index_div_moved_number)> layer_index_div_droped_number) {
                        // moved down 
                        var pre=Number(layer_index_div_moved_number);     
                        for(var i= Number(layer_index_div_moved_number)-1; i>= layer_index_div_droped_number; i--,pre--)
                        {
                             canvasNP.change_layer_order(ref_canvas_id, pre, i );
                 
                        }
                    }

                    var moved_layer_id = layer_index.getAttribute('layer_id');
                    moved_layer= document.getElementById(moved_layer_id);

                    moved_layer.setAttribute('data-zindex',Number(layer_index_div_droped_number)+2);
                    this.appendChild(layer_index);
                    


                     for(var i =all_canvas_layers_arranged.length-1 ;i>=0; i--){
             

                        all_canvas_layers_arranged[i].style.zIndex=all_canvas_layers_arranged[i].getAttribute("data-zindex"); 

                       


                     }
           
                
                }

            })


               // canvas_layers_div  main canvas 


            var selected_index_layer_id= canvas_layers_div.getAttribute("data-selected-index-layer");
            //alert(selected_index_layer_id);
            if(selected_index_layer_id == undefined){
                
            }else{
                
                //alert("else");
            var selected_index_layer= document.getElementById(selected_index_layer_id);
                if(selected_index_layer === null){
                     selected_index_layer =  document.getElementById(ref_canvas_id+"layer_index"+0 );  

                }

                selected_index_layer.style.border="4px solid #4776F4";
                
            
            }


           

            $("." + ref_canvas_id+"layer_index").on("click",function(){
                $("." + ref_canvas_id+"layer_index").each(function(){
                    this.style.border="2px solid black"; 
                })
                this.style.border="4px solid #4776F4";
                canvas_layers_div.setAttribute("data-selected-layer",this.getAttribute("data-layer-id") ); 
                canvas_layers_div.setAttribute("data-selected-index-layer", this.id);
                alert(this.id);


            })


             return ;  
        },

    
       // fuction used incanvas write render 
        define_canvas_dim: function(canvas_class){

			var canvas_create_array = document.getElementsByClassName(canvas_class);
           
			for(var i = 0 ; i< canvas_create_array.length ; i++){
	            var canvas_dim = canvas_create_array[i].getBoundingClientRect();
	            canvas_create_array[i].width = canvas_dim.width;
	            canvas_create_array[i].height = canvas_dim.height;
        	}
        },
             
      

        tab_zindex: function(buttonid){

        	var button = document.getElementById(buttonid);
			var ref_canvas_id = button.getAttribute("data-ref-canvas-id");
			var canvaswritetab = document.getElementById(ref_canvas_id + "canvaswritetab");
			var canvasdrawtab = document.getElementById(ref_canvas_id + "canvasdrawtab");
			var canvasimagetab = document.getElementById(ref_canvas_id + "canvasimagetab");
			var canvasvideotab = document.getElementById(ref_canvas_id + "canvasvideotab");
			var canvassoundtab = document.getElementById(ref_canvas_id + "canvassoundtab");

			var canvaswritetab_zindex = $(canvaswritetab).css('zIndex'); 
			var canvasimagetab_zindex = $(canvasimagetab).css('zIndex'); 
			var canvasdrawtab_zindex = $(canvasdrawtab).css('zIndex');

			var large_zindex = Math.max(canvaswritetab_zindex, canvasimagetab_zindex, canvasdrawtab_zindex ); 

			return {
		      largest_zindex: large_zindex,
		      canvaswritetab_zindex: canvaswritetab_zindex,
		      canvasimagetab_zindex:canvasimagetab_zindex,
		      canvasdrawtab_zindex:canvasdrawtab_zindex,
		      ref_canvas_id: ref_canvas_id ,

		    };
			
        } ,         

        switchtabs: function (thisitem, tabrequestedclass){

			var tab =  canvasNP.tab_zindex(thisitem.id);
			var tab_tobe_replaced_class = null;

				if(tab.canvaswritetab_zindex == tab.largest_zindex){   
					tab_tobe_replaced_class="canvaswritetab";

				}
				else if(tab.canvasimagetab_zindex == tab.largest_zindex ){
					tab_tobe_replaced_class="canvasimagetab";

				}
				else if(tab.canvasdrawtab_zindex == tab.largest_zindex){
					tab_tobe_replaced_class="canvasdrawtab";
				}

			
				var tab_totop_current_zindex = $("#" + tab.ref_canvas_id + tabrequestedclass).css('zIndex');

				console.log(tab_totop_current_zindex);

				tab_tobe_replaced = document.getElementById(tab.ref_canvas_id + tab_tobe_replaced_class); 

				tab_tobe_replaced.style.zIndex= tab_totop_current_zindex; 

				var tabrequested = document.getElementById(tab.ref_canvas_id+ tabrequestedclass);
				tabrequested.style.zIndex=  tab.largest_zindex;

		
			var toolboxshow_class = tabrequested.getAttribute("data-toolbox");
			toolbox_toshow= document.getElementById(tab.ref_canvas_id + toolboxshow_class); 
			toolbox_toshow.style.visibility= "visible";

			var toolboxhide_class = tab_tobe_replaced.getAttribute("data-toolbox");
			toolbox_tohide= document.getElementById(tab.ref_canvas_id + toolboxhide_class);
			toolbox_tohide.style.visibility="hidden";

			return ;

		},


		add_layer: function(addlayer_elm){
			var id = $(addlayer_elm).attr("id");
            var click = $(addlayer_elm).data("clicked") || 0;
            $(addlayer_elm).data("clicked", ++click); 

            var ref_canvas_id = addlayer_elm.getAttribute("data-ref-canvas-id");
            var canvas_layers_div = document.getElementById(ref_canvas_id+"canvas_layers");
            var canvas_div_layers= canvas_layers_div.getElementsByClassName("div_layer");
            // /// 
            // var click = 0 
            // for(var i = 0; canvas_div_layers.length > i ; i++  ){
            //     if(Number(canvas_div_layers[i].id.slice(-1)) >= click){
            //         click = Number(canvas_div_layers[i].id.slice(-1)) +1 ;
            //         alert(click); 
            //     }
            // }
            //alert(click + "length" + canvas_div_layers.length );

            if(click >canvas_div_layers.length ){
                alert("jaerawer"); 
                $(addlayer_elm).data("clicked", canvas_div_layers.length)
                click =  canvas_div_layers.length; 

            }

            var layer = document.createElement("canvas");
 
            layer.className = "layer"; 
      		layer.draggable="true" ;
            layer.id=ref_canvas_id +"layer"+ click;
            layer.setAttribute( "data-ref-canvas-id",ref_canvas_id );

            //style
            var zindex= click +2 ;
            console.log(zindex);
            layer.setAttribute("data-zindex", zindex);
            layer.style.zIndex= zindex ;

 
          
           	var div_layer = document.createElement("div");
            div_layer.className = "div_layer"; 
            div_layer.id=ref_canvas_id +"div_layer"+ click;
            div_layer.setAttribute("data-ref-canvas-id", ref_canvas_id);
            div_layer.style.zIndex= zindex ;

    
            canvasNP.resize_handles(div_layer);
     		 
  			div_layer.appendChild(layer);
  			// canvas_draw_div is actually canvas layers
            
            var canvas_draw_div = document.getElementById(ref_canvas_id+"canvas_layers");
         	canvas_draw_div.appendChild(div_layer);
         	var div_layer_incanvas_inputs = div_layer.getElementsByClassName("in_canvas_input");
         	
     
             canvasNP.display_layers(ref_canvas_id ); 

            return  layer.id
			      
		},

        moveclick: function(){

            $(".move").on("click tap", function(){
                var ref_canvas_id = this.getAttribute("data-ref-canvas-id");
                var toolbox =document.getElementById(ref_canvas_id +"canvasdraw_toolbox");
                var toolbox_selected_tool = toolbox.setAttribute("data-selected-tool","move");

                var toolbox_selected_toolget = toolbox.getAttribute("data-selected-tool");
                $(".div_layer").draggable({ 
                    containment: $("#"+ref_canvas_id+"canvas_layers"),
                    cursor: 'move',
                    cancel:null ,
                    disabled: false });  


            });
        },

        
        cutclick: function(){
            $(".cut").on("click tap", function(){
                var ref_canvas_id = this.getAttribute("data-ref-canvas-id");
                var toolbox =document.getElementById(ref_canvas_id +"canvasdraw_toolbox");
                var toolbox_selected_tool = toolbox.setAttribute("data-selected-tool","cut");

                var canvas_layers_div = document.getElementById(ref_canvas_id+"canvas_layers");
                var selected_layer_id= $(canvas_layers_div).attr("data-selected-layer");
                var selected_layer = document.getElementById(selected_layer_id);
                var selected_div_layer = $(selected_layer).parent();
                
                var crop_div = document.createElement('div'); 
                crop_div.id= "crop_div";
                crop_div.style.width = "300px"
                crop_div.style.height = "180px"
                //crop_div.style.position = "absolute";
                crop_div.style.border= "5px dashed black";
                crop_div.style.zIndex= selected_layer.style.zIndex;
                //crop_div.draggable="true" ;

                //selected_div_layer.appendChild(crop_div); 
                $(selected_div_layer).append(crop_div); 

                 $("#crop_div").draggable({ 
                    containment: $(selected_div_layer),
                    cursor: 'move',
                    cancel:null ,
                    disabled: false });  

                // make div movable 
                // make div 1 same index as canvas 
               // var layer = selected_layer;

                $(selected_layer ).on('dblclick', function(event){
                     var crop_div_dim = crop_div.getBoundingClientRect();
                     var selected_layer_dim = selected_layer.getBoundingClientRect();
                    console.log( crop_div_dim); 
                    console.log("break"); 
                     console.log( selected_layer_dim); 

                     var cropx = crop_div_dim.x - selected_layer_dim.x;
                     var cropy =  selected_layer_dim.y - crop_div_dim.y    ;
                    var context = selected_layer.getContext('2d');
                   


                   // var mousePos = create_gui_settingsNP.getMousePos_event(selected_layer,event);
                    var temp_canvas = document.createElement("canvas");
                    temp_canvas.style.zIndex= "4";
                     temp_canvas.style.width= selected_layer.style.width; 
                     temp_canvas.style.height= selected_layer.style.height;
                     temp_canvas.style.display= "none";
        
                    
                    var canvas_layer = document.getElementById("0canvas_layers");
                    canvas_layer.appendChild(temp_canvas); 
                    var temp_canvas_context = temp_canvas.getContext('2d');

                   
                    temp_canvas_context.drawImage(selected_layer , cropx, cropy);
                   
                    context.clearRect(0, 0, selected_layer.width, selected_layer.height);
                    context.drawImage(temp_canvas,0 ,0, selected_layer_dim.width, selected_layer_dim.height);
                    // console.log(selected_layer.width); 
                    // console.log(selected_layer.height); 

                    //,crop_div_dim.width, crop_div_dim.height, 0, 0, crop_div_dim.width, crop_div_dim.height
                    // console.log(mousePos.x);
                    // console.log(mousePos.y);
                   // alert("here"); 
                   $(temp_canvas).remove();
                   $(crop_div).remove();

                   // remove event listinter 

                });

            }); 
        }, 


        saveEventState: function(e, $container){
          // Save the initial event details and container state
            var event_state = {}; 
            event_state.container_width = $container.width();
            event_state.container_height = $container.height();
            event_state.container_left = $container.offset().left; 
            event_state.container_top = $container.offset().top;
            event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft(); 
            event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

            // This is a fix for mobile safari
            // For some reason it does not allow a direct copy of the touches property
            if(typeof e.originalEvent.touches !== 'undefined'){
                event_state.touches = [];
                $.each(e.originalEvent.touches, function(i, ob){
                  event_state.touches[i] = {};
                  event_state.touches[i].clientX = 0+ob.clientX;
                  event_state.touches[i].clientY = 0+ob.clientY;
                });
            }
            event_state.evnt = e;
            return event_state; 
        },

        resizeImage :function(layerimg_id, layer_id , div_layer_id, width, height){
            var resize_canvas = document.getElementById(layer_id);
            var resize_div = document.getElementById( div_layer_id);
            var resize_layerimg = document.getElementById(layerimg_id);

            resize_div.style.width= width + "px";
            resize_div.style.height= height + "px" ;
            resize_canvas.style.width = width + "px";
            resize_canvas.style.height = height + "px" ;
            resize_canvas.style.border = "2px solid black";
            resize_layerimg.style.width= width + "px";
            resize_layerimg.style.height= height + "px"; 
            // resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);   
            // $(image_target).attr('src', resize_canvas.toDataURL("image/png"));  
        },

        resizing :function( e, layerimg_id, layer_id , div_layer_id, event_state, $container ){ 
            var mouse={},width,height,left,top,offset=$container.offset();
            mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft(); 
            mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

            width = mouse.x - event_state.container_left;
            height = mouse.y  - event_state.container_top;
            left = event_state.container_left;
            top = event_state.container_top;

           // if(constrain || e.shiftKey){
               // height = width / orig_src.width * orig_src.height;
            //}

            //if(width > min_width && height > min_height && width < max_width && height < max_height){
              canvasNP.resizeImage(layerimg_id, layer_id , div_layer_id, width, height);  
              // Without this Firefox will not re-calculate the the image dimensions until drag end
              $container.offset({'left': left, 'top': top});        
           // }
        }, 


        endResize: function(e){
            e.preventDefault();
            $(document).off('mouseup touchend', this.endResize);
            $(document).off('mousemove touchmove', this.resizing);
        }, 

        startResize :function(e){
                e.preventDefault();
                e.stopPropagation();
           
                var div_layer_id = $(e.target).parent("div").attr("id"); 
                var layer_id = $("#"+div_layer_id).children(".layer").attr("id");
                var layerimg_id = $("#" +div_layer_id).children(".layerimg").attr("id");
                //alert(layerimg_id);
                // var layer_idd = $("#"+div_layer_id).children(".layer");
                // alert(layer_idd.length);

                var $div_layer = $("#" + div_layer_id); 
              

                var state =canvasNP.saveEventState(e, $div_layer );


                $(document).on('mousemove',  function(e){

                    canvasNP.resizing(e, layerimg_id, layer_id , div_layer_id, state, $div_layer  ); 
                });
                $(document).on('mouseup',  canvasNP.endResize);

            //alert("adfasdf"); 
        },


      

        resize_handles :function(div_layer){

       
            $(div_layer)
            .append('<span class="resize-handle resize-handle-nw"></span>')
            .append('<span class="resize-handle resize-handle-sw"></span>')
            .append('<span class="resize-handle resize-handle-ne"></span>')
            .append('<span class="resize-handle resize-handle-se"></span>');

             $(div_layer).on('mousedown', '.resize-handle', this.startResize);


        },

    

        select_main_layer :function(){

            $(".canvas_layers").each(function(){
                var ref_canvas_id = this.getAttribute("data-ref-canvas-id");

                this.setAttribute("data-selected-layer", ref_canvas_id+"layer0" );
                this.setAttribute("data-selected-index-layer", ref_canvas_id+"layer_index0" );


                });




        }


    };

})();  






$(document).ready(function(){



    canvasNP.select_main_layer();
    canvasNP.moveclick();
    canvasNP.cutclick();
    canvasNP.define_canvas_dim("layer");
 

    $(".add_layer").on("click" ,function(){
        var ref_canvas_id = this.getAttribute("data-ref-canvas-id");
        var canvas_layers = document.getElementById(ref_canvas_id+"canvas_layers"); 
		var added_layer_id = canvasNP.add_layer(this);
   

        //canvasNP.resize_handles();

        var layer_number =  $(this).data("clicked" );


        canvas_layers.setAttribute("data-selected-layer", added_layer_id );
        canvas_layers.setAttribute("data-selected-index-layer", ref_canvas_id+"layer_index"+layer_number);


	 });
    

	$(".canvaswrite_but").on("click", function(event){ 

		canvasNP.switchtabs(this,"canvaswritetab");
		 event.preventDefault(); 

	}) ; 

	$(".canvasdraw_but").on("click", function(event){ 

		canvasNP.switchtabs(this,"canvasdrawtab");
		 event.preventDefault(); 


	}) ; 

	$(".canvasimage_but").on("click", function(event){ 

		canvasNP.switchtabs(this,"canvasimagetab");
		 event.preventDefault(); 


	}) ; 


	// layers 

	$(function() {
	    $( ".layers_dialog" ).dialog({
	        width: 232,
	        autoOpen: false

	     
	    });
	});
  


    $('.layers_button').click(function() {

  	
     var dialog_id = $(this).attr('data-layers-dialog-id');
     var ref_canvas_id = $(this).attr('data-ref-canvas-id');

     canvasNP.display_layers(ref_canvas_id);
     $('#'+ dialog_id).dialog({
        position:{ my: "left top", at: "left top", of: this }
      });
      $('#'+ dialog_id).dialog('open')

      
    });

});

