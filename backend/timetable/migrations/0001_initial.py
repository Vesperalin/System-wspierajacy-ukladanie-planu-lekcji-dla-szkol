# Generated by Django 4.0.4 on 2022-05-11 19:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Break',
            fields=[
                ('ID_Break', models.BigAutoField(primary_key=True, serialize=False)),
                ('Break_no', models.PositiveIntegerField()),
                ('Start_hour', models.PositiveIntegerField()),
                ('Start_minute', models.PositiveIntegerField()),
                ('End_hour', models.PositiveIntegerField()),
                ('End_minute', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Class',
            fields=[
                ('ID_Class', models.CharField(max_length=20, primary_key=True, serialize=False)),
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
            name='Subject',
            fields=[
                ('ID_Subject', models.BigAutoField(primary_key=True, serialize=False)),
                ('Subject_name', models.CharField(max_length=50)),
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
            name='LessonsProgram',
            fields=[
                ('ID_Lessons_program', models.BigAutoField(primary_key=True, serialize=False)),
                ('Hours_no', models.PositiveIntegerField()),
                ('FK_Class', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='timetable.class')),
                ('FK_Subject', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='timetable.subject')),
            ],
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('ID_Lessons', models.BigAutoField(primary_key=True, serialize=False)),
                ('Weekday', models.CharField(choices=[('mon', 'mon'), ('tue', 'tue'), ('wed', 'wed'), ('thu', 'thu'), ('fri', 'fri'), ('sat', 'sat'), ('sun', 'sun')], default='mon', max_length=40)),
                ('Hour', models.PositiveIntegerField()),
                ('Minute', models.PositiveIntegerField()),
                ('FK_Class', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='timetable.class')),
                ('FK_Classroom', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='timetable.classroom')),
                ('FK_Subject', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='timetable.subject')),
                ('FK_Teacher', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='timetable.teacher')),
            ],
        ),
        migrations.AddConstraint(
            model_name='break',
            constraint=models.CheckConstraint(check=models.Q(('Start_hour__lte', 23)), name='Start_hour_check'),
        ),
        migrations.AddConstraint(
            model_name='break',
            constraint=models.CheckConstraint(check=models.Q(('Start_minute__lte', 59)), name='Start_minute_check'),
        ),
        migrations.AddConstraint(
            model_name='break',
            constraint=models.CheckConstraint(check=models.Q(('End_hour__lte', 23)), name='End_hour_check'),
        ),
        migrations.AddConstraint(
            model_name='break',
            constraint=models.CheckConstraint(check=models.Q(('End_minute__lte', 59)), name='End_minute_check'),
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
