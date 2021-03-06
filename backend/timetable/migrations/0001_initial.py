# Generated by Django 4.0.4 on 2022-06-04 12:12

from django.db import migrations, models
import django.db.models.deletion
import timetable.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('ID_Class', models.BigAutoField(primary_key=True, serialize=False)),
                ('Class_no', models.CharField(max_length=20)),
                ('Year', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Classroom',
            fields=[
                ('Classroom_no', models.IntegerField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('ID_Lessons', models.BigAutoField(primary_key=True, serialize=False)),
                ('Weekday', models.CharField(choices=[('mon', 'mon'), ('tue', 'tue'), ('wed', 'wed'), ('thu', 'thu'), ('fri', 'fri')], default='mon', max_length=40)),
                ('Hour', models.PositiveIntegerField(validators=[timetable.models.validate_hour])),
                ('Minute', models.PositiveIntegerField(validators=[timetable.models.validate_minute])),
            ],
        ),
        migrations.CreateModel(
            name='LessonHour',
            fields=[
                ('ID_Lesson_hour', models.BigAutoField(primary_key=True, serialize=False)),
                ('Lesson_no', models.PositiveIntegerField()),
                ('Start_hour', models.PositiveIntegerField()),
                ('Start_minute', models.PositiveIntegerField()),
                ('End_hour', models.PositiveIntegerField()),
                ('End_minute', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='LessonsProgram',
            fields=[
                ('ID_Lessons_program', models.BigAutoField(primary_key=True, serialize=False)),
                ('Class', models.CharField(choices=[('I', 'I'), ('II', 'II'), ('III', 'III'), ('IV', 'IV'), ('V', 'V'), ('VI', 'VI'), ('VII', 'VII'), ('VIII', 'VIII')], default='I', max_length=20)),
                ('Subject', models.CharField(default='Subject', max_length=20)),
                ('Hours_no', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('ID_Subject', models.BigAutoField(primary_key=True, serialize=False)),
                ('Subject_name', models.CharField(max_length=20)),
                ('Color', models.CharField(blank=True, max_length=10, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('ID_Teacher', models.BigAutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(default='name', max_length=40)),
                ('Surname', models.CharField(default='surname', max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Teacher_Subject',
            fields=[
                ('ID_Teacher_Subject', models.BigAutoField(primary_key=True, serialize=False)),
                ('FK_Subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='timetable.subject')),
                ('FK_Teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='timetable.teacher')),
            ],
        ),
        migrations.AddConstraint(
            model_name='lessonhour',
            constraint=models.CheckConstraint(check=models.Q(('Start_hour__lte', 23)), name='Start_hour_check'),
        ),
        migrations.AddConstraint(
            model_name='lessonhour',
            constraint=models.CheckConstraint(check=models.Q(('Start_minute__lte', 59)), name='Start_minute_check'),
        ),
        migrations.AddConstraint(
            model_name='lessonhour',
            constraint=models.CheckConstraint(check=models.Q(('End_hour__lte', 23)), name='End_hour_check'),
        ),
        migrations.AddConstraint(
            model_name='lessonhour',
            constraint=models.CheckConstraint(check=models.Q(('End_minute__lte', 59)), name='End_minute_check'),
        ),
        migrations.AddField(
            model_name='lesson',
            name='FK_Class',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='lessons', to='timetable.class'),
        ),
        migrations.AddField(
            model_name='lesson',
            name='FK_Classroom',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='timetable.classroom'),
        ),
        migrations.AddField(
            model_name='lesson',
            name='FK_Subject',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='timetable.subject'),
        ),
        migrations.AddField(
            model_name='lesson',
            name='FK_Teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='timetable.teacher'),
        ),
        migrations.AddConstraint(
            model_name='lesson',
            constraint=models.CheckConstraint(check=models.Q(('Hour__lte', 23)), name='Hour_check'),
        ),
        migrations.AddConstraint(
            model_name='lesson',
            constraint=models.CheckConstraint(check=models.Q(('Minute__lte', 59)), name='Minute_check'),
        ),
    ]
