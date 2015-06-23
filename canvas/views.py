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

def create_canvas_post(request, canvas_id):
	if request.method == 'POST':
		canvas_post_text = request.POST.get('canvas_post')
		canvas_post_obj = request.user.canvas_set.create(canvas_post= canvas_post_text, 
			pub_date= timezone.now() )

		if canvas_id == '0' :		
			canvas_post_obj.save() 
			return HttpResponseRedirect(reverse('canvas:home' )) 
		else:		
			parent_canvas_obj = Canvas.objects.get(id=canvas_id)
			parent_canvas_obj.children.add(canvas_post_obj)

			return HttpResponseRedirect(reverse('canvas:home' )) 


def delete_canvas_post(request, canvas_id):
	Canvas().canvas_recursive_delete(canvas_id)

	
	return HttpResponseRedirect(reverse('canvas:home' )) 


def show_more_comments(request):
	pass