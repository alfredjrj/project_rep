from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse 




def base(request):
	h = "what"

	return render(request, 'humour/base.html' )