# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Canvas',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('canvas_post', models.CharField(max_length=400)),
                ('pub_date', models.DateTimeField(verbose_name='date published')),
                ('parent_canvas', models.ForeignKey(to='canvas.Canvas')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Texts_In_Canvas',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('canvas_texts', models.CharField(max_length=200)),
                ('coordinates_x', models.IntegerField(default=0)),
                ('coordinates_y', models.IntegerField(default=0)),
                ('canvas', models.ForeignKey(to='canvas.Canvas')),
            ],
        ),
    ]
