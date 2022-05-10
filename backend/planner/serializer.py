from rest_framework import serializers
from .models import *


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classrooms
        fields = ['Classroom_no']


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teachers
        fields = ['ID_Teacher', 'Name', 'Surname']


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subjects
        fields = ['ID_Subject', 'Subject_name']


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = ['ID_Class', 'Year']


class LessonsProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonsProgram
        fields = ['ID_Lessons_program', 'FK_Class', 'FK_Subject', 'Hours_no']


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lessons
        fields = ['ID_Lessons', 'FK_Teacher', 'FK_Subject', 'FK_Class', 'FK_Classroom', 'Weekday', 'Hour', 'Minute']


class BreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breaks
        fields = ['ID_Break', 'Break_no', 'Start_hour', 'Start_minute', 'End_hour', 'End_minute']
