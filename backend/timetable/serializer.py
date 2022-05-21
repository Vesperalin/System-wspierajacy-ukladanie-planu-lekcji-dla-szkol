from email import message
from rest_framework import serializers
from timetable.models import *
from rest_framework.validators import UniqueTogetherValidator
from rest_framework.exceptions import APIException
from django.utils.encoding import force_str

from timetable.utils import validate_class_no


class CustomValidation(APIException):
    def __init__(self, message, field, status_code) -> None:
        self.status_code = status_code
        self.detail = {field: force_str(message)}


class ClassroomSerializer(serializers.ModelSerializer):
    Classroom_no = serializers.IntegerField()

    class Meta:
        model = Classroom
        fields = ['Classroom_no', ]

    def validate_Classroom_no(self, value):
        if Classroom.objects.filter(Classroom_no__iexact=value).exists():
            raise CustomValidation('Classroom with specified number already exists.', 'message', 400)
        return value


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['ID_Teacher', 'Name', 'Surname']


class SubjectSerializer(serializers.ModelSerializer):
    Subject_name = serializers.CharField()

    class Meta:
        model = Subject
        fields = ['ID_Subject', 'Subject_name']

    def validate_Subject_name(self, value):
        subject_name = value.lower()
        if Subject.objects.filter(Subject_name__iexact=subject_name).exists():
            raise CustomValidation('Subject with specified name already exists.', 'message', 400)
        return value

    def update(self, instance, validated_data):
        lessons = Lesson.objects.filter(FK_Class=instance)
        if len(lessons) == 0:
            return super().update(instance, validated_data)
        else:
            raise CustomValidation('Unable to update subject. This subject has assigned lessons.', 'message', 400)


class SubjectWithColorSerializer(serializers.ModelSerializer):
    Subject_name = serializers.CharField()

    class Meta:
        model = Subject
        fields = ['ID_Subject', 'Subject_name', 'Color']

    def validate_Subject_name(self, value):
        subject_name = value.lower()
        if Subject.objects.filter(Subject_name__iexact=subject_name).exists():
            raise CustomValidation('Subject with specified name already exists.', 'message', 400)
        return value
    
    def update(self, instance, validated_data):
        lessons = Lesson.objects.filter(FK_Class=instance)
        if len(lessons) == 0:
            return super().update(instance, validated_data)
        else:
            raise CustomValidation('Unable to update subject. This subject has assigned lessons.', 'message', 400)


class ClassSerializer(serializers.ModelSerializer):
    Class_no = serializers.CharField()

    class Meta:
        model = Class
        fields = ['ID_Class', 'Class_no', 'Year']
        validators = [
            UniqueTogetherValidator(
                queryset=Class.objects.all(),
                fields=['Class_no', 'Year'],
                message="You already have class with specified number and year."
            )
        ]

    def validate_Class_no(self, value):
        class_no = validate_class_no(value)
        if not class_no:
            raise CustomValidation('Invalid class name!', 'message', 400)
        return value

    def update(self, instance, validated_data):
        lessons = Lesson.objects.filter(FK_Class=instance)
        if len(lessons) == 0:
            return super().update(instance, validated_data)
        else:
            raise CustomValidation('Unable to update class. This class has assigned lessons.', 'message', 400)


class LessonsProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonsProgram
        fields = ['ID_Lessons_program', 'FK_Class', 'FK_Subject', 'Hours_no']


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['ID_Lessons', 'FK_Teacher', 'FK_Subject', 'FK_Class', 'FK_Classroom', 'Weekday', 'Hour', 'Minute']


class LessonHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonHour
        fields = ['ID_Lesson_hour', 'Lesson_no', 'Start_hour', 'Start_minute', 'End_hour', 'End_minute']
