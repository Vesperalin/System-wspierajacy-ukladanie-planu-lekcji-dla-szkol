import ast

from django.core.exceptions import ValidationError
from rest_framework import viewsets, filters, status
from rest_framework.decorators import api_view
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

                    try:
                        lesson.full_clean()
                        lesson.save()

                    except ValidationError:
                        return Response("Invalid data for lesson starting: " + str(lesson.Weekday) + ', ' +
                                        str(lesson.Hour) + ':' + str(lesson.Minute) + '!!!',
                                        status=status.HTTP_400_BAD_REQUEST)
        return Response("Schedule successfully saved!", status=status.HTTP_200_OK)
