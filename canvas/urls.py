from django.conf.urls import url

from . import views

urlpatterns = [
url(r'^$', views.home, name ='home'),
url(r'^create_canvas_post/(?P<canvas_id>[0-9]+)$', views.create_canvas_post , name ='create_canvas_post'),
url(r'^delete_canvas_post/(?P<canvas_id>[0-9]+)$', views.delete_canvas_post , name = 'delete_canvas_post'),
]