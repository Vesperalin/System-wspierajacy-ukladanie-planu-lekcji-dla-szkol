import ast
import json
import math
import random

from django.core.exceptions import ValidationError
from rest_framework import viewsets, filters, status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Exists, OuterRef

from timetable.models import Classroom
from timetable.serializer import *
from timetable.utils import assign_color, find_class_no


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


class LessonHourView(viewsets.ModelViewSet):
    serializer_class = LessonHourSerializer
    queryset = LessonHour.objects.all()
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['Start_hour', 'Start_minute']
    ordering = ['Start_hour', 'Start_minute']


class ClassWithLessonView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ClassSerializer
    queryset = Class.objects.filter(Exists(Lesson.objects.filter(FK_Class=OuterRef('pk'))))


class ClassWithoutLessonView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ClassSerializer
    queryset = Class.objects.exclude(lessons__isnull=False)


@api_view(['POST'])
def lessons_plan(request):
    days = Lesson._meta.get_field('Weekday').choices
    lesson_hours = LessonHour.objects.all()

    if request.method == 'POST':
        keys = request.data.items()
        lst = list(keys)[0][0]
        lesson_info = ast.literal_eval(lst)
        class_id = lesson_info['class']['value']['ID_Class']
        schedule = lesson_info['schedule']

        lessons_to_save = []

        for i in range(len(schedule)):
            for j in range(len(schedule[i])):
                if schedule[i][j] != {}:
                    teacher_id = schedule[i][j]['teacher']['ID_Teacher']
                    subject_id = schedule[i][j]['subject']['ID_Subject']
                    classroom_id = schedule[i][j]['classroom']['Classroom_no']
                    weekday = days[i][0]
                    hour = getattr(lesson_hours[j], 'Start_hour')
                    minute = getattr(lesson_hours[j], 'Start_minute')

                    lesson = Lesson(FK_Teacher=Teacher.objects.get(pk=teacher_id),
                                    FK_Subject=Subject.objects.get(pk=subject_id),
                                    FK_Class=Class.objects.get(pk=class_id),
                                    FK_Classroom=Classroom.objects.get(pk=classroom_id),
                                    Weekday=weekday, Hour=hour, Minute=minute)

                    lessons_to_save.append(lesson)

        class_no = find_class_no(class_id)
        program = LessonsProgram.objects.filter(Class=class_no)
        subjects_hours = {}
        subject_out_of_program = []

        for p in program:
            subjects_hours[p.Subject.lower()] = p.Hours_no

        for lesson in lessons_to_save:
            sub = lesson.FK_Subject
            try:
                subjects_hours[sub.Subject_name.lower()] -= 1
            except KeyError:
                subject_out_of_program.append(sub.Subject_name)

        warnings = []
        for subject in subjects_hours:
            if subjects_hours[subject] > 0:
                warnings.append("Insufficient number of hours for subject: " + subject + ". You need " +
                                str(subjects_hours[subject]) + " more hours to fulfill core curriculum!")
            if subjects_hours[subject] < 0:
                return Response("Too many hours of " + subject + " assigned! You need to remove " +
                                str(abs(subjects_hours[subject])) + " from plan.",
                                status=status.HTTP_400_BAD_REQUEST)

        for subject in subject_out_of_program:
            warnings.append(subject + " is not included in core curriculum!!!")

        for lesson in lessons_to_save:
            try:
                lesson.full_clean()
                lesson.save()

            except ValidationError:
                return Response("Invalid data for lesson starting: " + str(lesson.Weekday) + ', ' +
                                str(lesson.Hour) + ':' + str(lesson.Minute) + '!!!',
                                status=status.HTTP_400_BAD_REQUEST)
        if len(warnings) == 0:
            response = {
                'warning': False,
                'message': ["Schedule successfully saved!"]
            }
        else:
            response = {
                'warning': True,
                'message': warnings
            }
        return Response(response, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def subject_with_color(request):
    if request.method == 'GET':
        used_colors = []
        subjects = Subject.objects.all()
        for s in subjects:
            assign_color(s, used_colors)
            s.save()
        serializer = SubjectWithColorSerializer(subjects, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SubjectWithColorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def subject_with_color_detail(request, pk):
    try:
        subject = Subject.objects.get(pk=pk)
        if not subject.Color:
            used_colors = []
            subjects = Subject.objects.all()
            for s in subjects:
                assign_color(s, used_colors)
                s.save()
    except Subject.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SubjectWithColorSerializer(subject)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SubjectWithColorSerializer(subject, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        subject.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
