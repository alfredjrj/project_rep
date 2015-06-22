from django.conf.urls import url

from . import views

urlpatterns = [
url(r'^$', views.loginpage, name ='loginpage'),
url(r'^userprofile/$', views.profile, name ='profile' ),
url(r'^logging_in/$', views.login_user, name ='login_user' ),
url(r'^logging_out/$', views.logout_user, name= 'logout_user'),
url(r'^(?P<user_id>[0-9]+)/users/$' ,views.other_userpofile, name= 'other_userpofile'),
]
