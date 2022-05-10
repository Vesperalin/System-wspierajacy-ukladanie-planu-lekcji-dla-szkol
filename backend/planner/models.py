from django.db import models


# Create your models here.
from django.db.models import CheckConstraint, Q, F


class Classrooms(models.Model):
    Classroom_no = models.IntegerField(primary_key=True)


class Teachers(models.Model):
    ID_Teacher = models.BigAutoField(primary_key=True)
    Name = models.CharField(max_length=40, default='name')
    Surname = models.CharField(max_length=40, default='surname')


class Subjects(models.Model):
    ID_Subject = models.BigAutoField(primary_key=True)
    Subject_name = models.CharField(max_length=50)


class Classes(models.Model):
    ID_Class = models.TextField(primary_key=True)
    Year = models.PositiveIntegerField()


class LessonsProgram(models.Model):
    ID_Lessons_program = models.BigAutoField(primary_key=True)
    FK_Class = models.ForeignKey(Classes, on_delete=models.SET_NULL, null=True)
    FK_Subject = models.ForeignKey(Subjects, on_delete=models.SET_NULL, null=True)
    Hours_no = models.PositiveIntegerField()


class Lessons(models.Model):
    MONDAY = 'mon'
    TUESDAY = 'tue'
    WEDNESDAY = 'wed'
    THURSDAY = 'thu'
    FRIDAY = 'fri'
    SATURDAY = 'sat'
    SUNDAY = 'sun'

    WEEKDAY = (
        (MONDAY, MONDAY),
        (TUESDAY, TUESDAY),
        (WEDNESDAY, WEDNESDAY),
        (THURSDAY, THURSDAY),
        (FRIDAY, FRIDAY),
        (SATURDAY, SATURDAY),
        (SUNDAY, SUNDAY),
    )

    ID_Lessons = models.BigAutoField(primary_key=True)
    FK_Teacher = models.ForeignKey(Teachers, on_delete=models.SET_NULL, null=True)
    FK_Subject = models.ForeignKey(Subjects, on_delete=models.SET_NULL, null=True)
    FK_Class = models.ForeignKey(Classes, on_delete=models.SET_NULL, null=True)
    FK_Classroom = models.ForeignKey(Classrooms, on_delete=models.SET_NULL, null=True)
    Weekday = models.CharField(max_length=40, choices=WEEKDAY, default=MONDAY)
    Hour = models.PositiveIntegerField()
    Minute = models.PositiveIntegerField()

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(Hour__lse=23),
                name='Hour_check',
            ),
            CheckConstraint(
                check=Q(Minute__lse=59),
                name='Minute_check',
            ),
        ]


class Breaks(models.Model):
    ID_Break = models.BigAutoField(primary_key=True)
    Break_no = models.PositiveIntegerField()
    Start_hour = models.PositiveIntegerField()
    Start_minute = models.PositiveIntegerField()
    End_hour = models.PositiveIntegerField()
    End_minute = models.PositiveIntegerField()

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(Start_hour__lse=23),
                name='Start_hour_check',
            ),
            CheckConstraint(
                check=Q(Start_minute__lse=59),
                name='Start_minute_check',
            ),
            CheckConstraint(
                check=Q(End_hour__lse=23),
                name='End_hour_check',
            ),
            CheckConstraint(
                check=Q(End_minute__lse=59),
                name='End_minute_check',
            ),
        ]
