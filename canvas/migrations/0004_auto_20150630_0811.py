# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('canvas', '0003_canvas_parent'),
    ]

    operations = [
        migrations.AddField(
            model_name='canvas',
            name='font_size',
            field=models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(6), django.core.validators.MaxValueValidator(100)], default=12),
        ),
        migrations.AddField(
            model_name='canvas',
            name='post_color',
            field=models.CharField(max_length=100, default='black'),
        ),
        migrations.AddField(
            model_name='canvas',
            name='post_font',
            field=models.CharField(max_length=100, default='Arial'),
        ),
        migrations.AddField(
            model_name='texts_in_canvas',
            name='font_size',
            field=models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(6), django.core.validators.MaxValueValidator(100)], default=12),
        ),
        migrations.AddField(
            model_name='texts_in_canvas',
            name='text_color',
            field=models.CharField(max_length=100, default='black'),
        ),
        migrations.AddField(
            model_name='texts_in_canvas',
            name='text_font',
            field=models.CharField(max_length=100, default='Arial'),
        ),
    ]
