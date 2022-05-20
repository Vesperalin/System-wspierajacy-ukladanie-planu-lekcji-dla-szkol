from django.core.exceptions import ValidationError
from django.db import models


# Create your models here.
from django.db.models import CheckConstraint, Q


class Classroom(models.Model):
    Classroom_no = models.IntegerField(primary_key=True)


class Teacher(models.Model):
    ID_Teacher = models.BigAutoField(primary_key=True)
    Name = models.CharField(max_length=40, default='name')
    Surname = models.CharField(max_length=40, default='surname')


class Subject(models.Model):
    ID_Subject = models.BigAutoField(primary_key=True)
    Subject_name = models.CharField(max_length=20)
    Color = models.CharField(max_length=10, blank=True, null=True)


class Class(models.Model):
    ID_Class = models.BigAutoField(primary_key=True)
    Class_no = models.CharField(max_length=20)
    Year = models.PositiveIntegerField()


class LessonsProgram(models.Model):
    FIRST = 'I'
    SECOND = 'II'
    THIRD = 'III'
    FOURTH = 'IV'
    FIFTH = 'V'
    SIXTH = 'VI'
    SEVENTH = 'VII'
    EIGHTH = 'VIII'

    CLASSES = (
        (FIRST, FIRST),
        (SECOND, SECOND),
        (THIRD, THIRD),
        (FOURTH, FOURTH),
        (FIFTH, FIFTH),
        (SIXTH, SIXTH),
        (SEVENTH, SEVENTH),
        (EIGHTH, EIGHTH),
    )

    ID_Lessons_program = models.BigAutoField(primary_key=True)
    Class = models.CharField(max_length=20, choices=CLASSES, default=FIRST)
    Subject = models.CharField(max_length=20, default="Subject")
    Hours_no = models.PositiveIntegerField(default=0)


def validate_hour(value):
    if 0 > value > 23:
        raise ValidationError(
            'Hour must be in range 0-23',
            params={'value': value},
        )


def validate_minute(value):
    if 0 > value > 59:
        raise ValidationError(
            'Minutes must be in range 0-59',
            params={'value': value},
        )


class Lesson(models.Model):
    MONDAY = 'mon'
    TUESDAY = 'tue'
    WEDNESDAY = 'wed'
    THURSDAY = 'thu'
    FRIDAY = 'fri'

    WEEKDAY = (
        (MONDAY, MONDAY),
        (TUESDAY, TUESDAY),
        (WEDNESDAY, WEDNESDAY),
        (THURSDAY, THURSDAY),
        (FRIDAY, FRIDAY),
    )

    ID_Lessons = models.BigAutoField(primary_key=True)
    FK_Teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)
    FK_Subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True)
    FK_Class = models.ForeignKey(Class, on_delete=models.SET_NULL, null=True, related_name='lessons')
    FK_Classroom = models.ForeignKey(Classroom, on_delete=models.SET_NULL, null=True)
    Weekday = models.CharField(max_length=40, choices=WEEKDAY, default=MONDAY)
    Hour = models.PositiveIntegerField(validators=[validate_hour])
    Minute = models.PositiveIntegerField(validators=[validate_minute])

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(Hour__lte=23),
                name='Hour_check',
            ),
            CheckConstraint(
                check=Q(Minute__lte=59),
                name='Minute_check',
            ),
        ]


class LessonHour(models.Model):
    ID_Lesson_hour = models.BigAutoField(primary_key=True)
    Lesson_no = models.PositiveIntegerField()
    Start_hour = models.PositiveIntegerField()
    Start_minute = models.PositiveIntegerField()
    End_hour = models.PositiveIntegerField()
    End_minute = models.PositiveIntegerField()

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(Start_hour__lte=23),
                name='Start_hour_check',
            ),
            CheckConstraint(
                check=Q(Start_minute__lte=59),
                name='Start_minute_check',
            ),
            CheckConstraint(
                check=Q(End_hour__lte=23),
                name='End_hour_check',
            ),
            CheckConstraint(
                check=Q(End_minute__lte=59),
                name='End_minute_check',
            ),
        ]

