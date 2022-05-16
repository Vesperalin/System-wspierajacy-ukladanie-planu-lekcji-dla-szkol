from rest_framework import viewsets, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Exists, OuterRef

from timetable.models import Classroom
from timetable.serializer import *


# Create your views here.

class ClassroomView(viewsets.ModelViewSet):
    serializer_class = ClassroomSerializer
    queryset = Classroom.objects.all()


class TeacherView(viewsets.ModelViewSet):
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()


class SubjectView(viewsets.ModelViewSet):
    serializer_class = SubjectSerializer
    queryset = Subject.objects.all()


class ClassView(viewsets.ModelViewSet):
    serializer_class = ClassSerializer
    queryset = Class.objects.all()


class LessonsProgramView(viewsets.ModelViewSet):
    serializer_class = LessonsProgramSerializer
    queryset = LessonsProgram.objects.all()


class LessonView(viewsets.ModelViewSet):
    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()


class BreakView(viewsets.ModelViewSet):
    serializer_class = BreakSerializer
    queryset = Break.objects.all()

class ClassWithLessonView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ClassSerializer
    queryset = Class.objects.filter(Exists(Lesson.objects.filter(FK_Class=OuterRef('pk'))))
