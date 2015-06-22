from django.db import models
from django.contrib.auth.models import User
from annoying.fields import AutoOneToOneField




class UserProfile(models.Model):
	user = AutoOneToOneField(User)
	follows = models.ManyToManyField('UserProfile', related_name='followed_by')

	def __str__(self):
		return self.user.username