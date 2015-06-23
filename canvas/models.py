from django.db import models
from django.contrib.auth.models import User

class Canvas(models.Model):
	user= models.ForeignKey(User)
	parent = models.ManyToManyField("self", symmetrical=False , related_name='children')
	canvas_post = models.CharField(max_length=400)
	pub_date = models.DateTimeField('date published')

	def __str__(self):
		return self.canvas_post

	def last_child_canvas(self):
		 return self.children.order_by('pub_date')[:1]

	def canvas_recursive_delete(self, canvas_id):
		""" Deltes the all of the children of the parent with 
		 the corrosponding canvas_id and then deletes the parent

		"""
		canvas_obj_to_del = Canvas.objects.filter(id=canvas_id)

		if canvas_obj_to_del[0].children.all() :
			canvas_obj_to_del[0].children.all().delete()
		
		canvas_obj_to_del.delete()

		return None




class Texts_In_Canvas(models.Model):
	canvas = models.ForeignKey(Canvas)
	canvas_texts = models.CharField(max_length=200)
	coordinates_x = models.IntegerField(default=0)
	coordinates_y = models.IntegerField(default=0)
	

	def __str__(self):
		return self.canvas_texts
