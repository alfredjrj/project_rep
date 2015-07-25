# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('canvas', '0004_auto_20150630_0811'),
    ]

    operations = [
        migrations.RenameField(
            model_name='texts_in_canvas',
            old_name='canvas_texts',
            new_name='canvas_text',
        ),
        migrations.RenameField(
            model_name='texts_in_canvas',
            old_name='font_size',
            new_name='text_size',
        ),
        migrations.RemoveField(
            model_name='canvas',
            name='font_size',
        ),
        migrations.RemoveField(
            model_name='canvas',
            name='post_color',
        ),
        migrations.RemoveField(
            model_name='canvas',
            name='post_font',
        ),
    ]
