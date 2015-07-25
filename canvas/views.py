import json
from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse 
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from userprofile.models import UserProfile, UserMethods
from . models import Canvas
from django.contrib.auth.models import User
from django.utils import timezone  



@login_required(login_url='/humour/')
def home(request):
	
	user_canvas_ids = UserMethods.canvas_ids_list(request.user)
	user_canvas_set = request.user.canvas_set.all().order_by('-pub_date')
	data= {'user_canvas_set':user_canvas_set, 'user_canvas_ids':user_canvas_ids }
	return render(request, 'canvas/home.html' ,data)

# def create_canvas_post(request, canvas_id):
# 	if request.method == 'POST':
# 		canvas_post_text = request.POST.get('canvas_post')
# 		font_size = request.POST.get('font_size')
# 		post_font = request.POST.get('post_font')
# 		canvas_post_obj = request.user.canvas_set.create(canvas_post= canvas_post_text, 
# 		pub_date= timezone.now(), font_size= font_size, post_font= post_font)
# 		canvas_post_obj.save()

# 		data = {}
# 		data['something'] = 'useful'
    
# 		if canvas_id == '0' :
# 			pass	

		
# 		else:	
# 			parent_canvas_obj = Canvas.objects.get(id=canvas_id)
# 			parent_canvas_obj.children.add(canvas_post_obj)

# 	return HttpResponse(json.dumps(data), content_type = "application/json")

	
def create_canvas_post(request, canvas_id):
	if request.method == 'POST':
		
		data = {}
 		
		canvas_text = request.POST.getlist('canvas_text[]')
		text_size = request.POST.getlist('text_size[]')
		text_font = request.POST.getlist('text_font[]')
		text_color = request.POST.getlist('text_color[]')
		text_opacity = request.POST.getlist('text_opacity[]')
		text_y_pos= request.POST.getlist('text_y_pos[]')
		text_x_pos = request.POST.getlist('text_x_pos[]')


		

		data['text'] = text_size[0]

		canvas_obj = request.user.canvas_set.create(canvas_post= "man", 
  		pub_date= timezone.now())

		canvas_obj.save()
		
			
		for i  in range(len(canvas_text)):

			canvas_obj.texts_in_canvas_set.create(canvas_text= canvas_text[i], 
  			text_font= text_font[i], 
  			text_size= int(text_size[i]),
  			coordinates_x=int(text_x_pos[i]), coordinates_y=int(text_y_pos[i]),
  			text_color = text_color[i]
  			)  
  		

		
	
	return HttpResponse(json.dumps(data), content_type = "application/json")



def delete_canvas_post(request, canvas_id):
	Canvas().canvas_recursive_delete(canvas_id)

	
	return HttpResponseRedirect(reverse('canvas:home' )) 


def show_more_comments(request):
	pass