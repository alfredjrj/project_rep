from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse 
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from .models import UserProfile
from django.contrib.auth.models import User


@login_required(login_url='/humour/')
def profile(request):
	user= request.user
	following = user.userprofile.follows.all()
	data = {'following':following}

	return render(request, 'userprofile/profile.html', data)
		
def other_userpofile(request, user_id):
    return HttpResponse(user_id)


def loginpage(request):
	if request.user.is_authenticated():
		return HttpResponseRedirect(reverse('userprofile:profile' )) 
		
	else:
		return render(request, 'userprofile/loginpage.html')


def logout_user(request):
    logout(request)
    return HttpResponseRedirect(reverse('userprofile:loginpage' ))     


def login_user(request):
	username = request.POST['username']
	password = request.POST['password'] 
	user = authenticate(username=username, password=password)
	if user is not None and user.is_active:
        	login(request, user)
        	return HttpResponseRedirect(reverse('userprofile:profile' ))        
	else:
		return HttpResponse("invald login")


	

	

