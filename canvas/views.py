from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse 
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from userprofile.models import UserProfile
from . models import Canvas
from django.contrib.auth.models import User
from django.utils import timezone  



@login_required(login_url='/humour/')
def home(request):
	user_canvas_set = request.user.canvas_set.all().order_by('-pub_date')

	
	data= {'user_canvas_set':user_canvas_set }
	return render(request, 'canvas/home.html' ,data)

def create_canvas_post(request):
	if request.method == 'POST':
		canvas_post_text = request.POST.get('canvas_post')
		canvas_post_obj = request.user.canvas_set.create(canvas_post= canvas_post_text, 
		pub_date= timezone.now() )
		canvas_post_obj.save() 


		return HttpResponse("hello")

def delete_canvas_post(request, canvas_id):
	canvas_obj_to_del = Canvas.objects.filter(id=canvas_id)
	canvas_obj_to_del.delete()

	return HttpResponseRedirect(reverse('canvas:home' )) 

def canvas_create_gui(request):
	
	canvas_html_input_id = "text_cnv"
	default_ids= { 'canvas_html_input_id':canvas_html_input_id }

	return render(request, 'canvas/canvas_create_gui.html', default_ids)
