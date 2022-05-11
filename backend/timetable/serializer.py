from rest_framework import serializers
from timetable.models import *


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ['Classroom_no']


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['ID_Teacher', 'Name', 'Surname']


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['ID_Subject', 'Subject_name']


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['ID_Class', 'Year']


class LessonsProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonsProgram
        fields = ['ID_Lessons_program', 'FK_Class', 'FK_Subject', 'Hours_no']


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['ID_Lessons', 'FK_Teacher', 'FK_Subject', 'FK_Class', 'FK_Classroom', 'Weekday', 'Hour', 'Minute']


class BreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Break
        fields = ['ID_Break', 'Break_no', 'Start_hour', 'Start_minute', 'End_hour', 'End_minute']
