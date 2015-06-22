# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('canvas', '0002_remove_canvas_parent_canvas'),
    ]

    operations = [
        migrations.AddField(
            model_name='canvas',
            name='parent',
            field=models.ManyToManyField(to='canvas.Canvas', related_name='children'),
        ),
    ]
