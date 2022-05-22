import ast
from calendar import weekday
from rest_framework import viewsets, filters, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Exists, OuterRef
from timetable.serializer import *
from timetable.utils import assign_color, find_class_no, find_position_in_schedule
import json


class ClassroomView(viewsets.ModelViewSet):
    serializer_class = ClassroomSerializer
    queryset = Classroom.objects.all()

    def destroy(self, request, *args, **kwargs):
        classroom = self.get_object()
        lessons = Lesson.objects.filter(FK_Classroom=classroom)
        if len(lessons) == 0:
            classroom.delete()
            return Response("Subject deleted!", status=status.HTTP_200_OK)
        else:
            return Response("Unable to delete " + str(classroom.Classroom_no) +
                            "! This classroom has assigned lessons.", status=status.HTTP_400_BAD_REQUEST)


class TeacherView(viewsets.ModelViewSet):
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()

    def destroy(self, request, *args, **kwargs):
        teacher = self.get_object()
        lessons = Lesson.objects.filter(FK_Teacher=teacher)
        if len(lessons) == 0:
            teacher.delete()
            return Response("Teacher deleted!", status=status.HTTP_200_OK)
        else:
            return Response("Unable to delete " + teacher.Name + " " + teacher.Surname +
                            "! This teacher has assigned lessons.", status=status.HTTP_400_BAD_REQUEST)


class SubjectView(viewsets.ModelViewSet):
    serializer_class = SubjectSerializer
    queryset = Subject.objects.all()

    def destroy(self, request, *args, **kwargs):
        subject = self.get_object()
        lessons = Lesson.objects.filter(FK_Subject=subject)
        if len(lessons) == 0:
            subject.delete()
            return Response("Subject deleted!", status=status.HTTP_200_OK)
        else:
            return Response("Unable to delete " + subject.Subject_name +
                            "! This subject has assigned lessons.", status=status.HTTP_400_BAD_REQUEST)


class ClassView(viewsets.ModelViewSet):
    serializer_class = ClassSerializer
    queryset = Class.objects.all()

    def destroy(self, request, *args, **kwargs):
        _class = self.get_object()
        lessons = Lesson.objects.filter(FK_Class=_class)
        if len(lessons) == 0:
            _class.delete()
            return Response("Class deleted!", status=status.HTTP_200_OK)
        else:
            return Response("Unable to delete " + _class.Class_no + " - " + str(_class.Year) +
                            "! This class has assigned lessons.", status=status.HTTP_400_BAD_REQUEST)


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
        print(lst)
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
                response = {
                    'warning': False,
                    'message': ["Too many hours of " + subject + " assigned! You need to remove " +
                                str(abs(subjects_hours[subject])) + " from plan."]
                }
                return Response(response, status=status.HTTP_400_BAD_REQUEST)

        for subject in subject_out_of_program:
            warnings.append(subject + " is not included in core curriculum!!!")

        for lesson in lessons_to_save:
            try:
                lesson.full_clean()
                lesson.save()

            except ValidationError:
                response = {
                    'warning': False,
                    'message': ["Invalid data for lesson starting: " + str(lesson.Weekday) + ', ' +
                                str(lesson.Hour) + ':' + str(lesson.Minute) + '!!!']
                }
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        if len(warnings) == 0:
            response = {
                'warning': False,
                'message': ["Schedule successfully saved!"]
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {
                'warning': True,
                'message': warnings
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def lessons_plan_detail(request, pk):
    try:
        _class = Class.objects.get(pk=pk)
        lessons = Lesson.objects.filter(FK_Class=_class)

    except Class.DoesNotExist:
        return Response("Requested class doesn't exist!", status=status.HTTP_404_NOT_FOUND)

    days = Lesson._meta.get_field('Weekday').choices
    lesson_hours = LessonHour.objects.all()

    if request.method == 'GET':
        id_counter = 0
        schedule = [[], [], [], [], []]
        for _ in lesson_hours:
            for lst in schedule:
                lst.append({})

        for lesson in lessons:
            position = find_position_in_schedule(lesson)
            if position[0] is None or position[1] is None:
                return Response("Lesson position in schedule doesn't exist!", status=status.HTTP_400_BAD_REQUEST)

            teacher_serializer = TeacherSerializer(lesson.FK_Teacher)
            schedule[position[0]][position[1]]['teacher'] = teacher_serializer.data
            subject_serializer = SubjectSerializer(lesson.FK_Subject)
            schedule[position[0]][position[1]]['subject'] = subject_serializer.data
            classroom_serializer = ClassroomSerializer(lesson.FK_Classroom)
            schedule[position[0]][position[1]]['classroom'] = classroom_serializer.data
            schedule[position[0]][position[1]]['id'] = id_counter
            id_counter += 1
        return Response(schedule, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        keys = request.data.items()
        lst = list(keys)[0][0]
        lesson_info = ast.literal_eval(lst)
        class_id = _class.ID_Class
        schedule = lesson_info['schedule']

        lessons_to_save = []

        teachers_to_validate = set()

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
                    teachers_to_validate.add(Teacher.objects.get(pk=teacher_id))

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
                response = {
                    'warning': False,
                    'message': ["Too many hours of " + subject + " assigned! You need to remove " +
                                str(abs(subjects_hours[subject])) + " from plan."]
                }
                return Response(response, status=status.HTTP_400_BAD_REQUEST)

        for subject in subject_out_of_program:
            warnings.append(subject + " is not included in core curriculum!!!")

        # !Do obgadania z Moniką 
        deleted = Lesson.objects.filter(FK_Class=_class).delete()
        # !Do obgadania z Moniką

        for lesson in lessons_to_save:
            try:
                lesson.full_clean()
                lesson.save()

            except ValidationError:
                response = {
                    'warning': False,
                    'message': ["Invalid data for lesson starting: " + str(lesson.Weekday) + ', ' +
                                str(lesson.Hour) + ':' + str(lesson.Minute) + '!!!']
                }
                return Response(response, status=status.HTTP_400_BAD_REQUEST)

        for teacher in teachers_to_validate:
            hours_assigned = len(Lesson.objects.filter(FK_Teacher=teacher))
            if hours_assigned > 20:
                warnings.append(f'{teacher.Name} {teacher.Surname} has assigned more than 20 hours per week')

        if len(warnings) == 0:
            response = {
                'warning': False,
                'message': ["Schedule successfully saved!"]
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {
                'warning': True,
                'message': list(set(warnings))
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        deleted = Lesson.objects.filter(FK_Class=_class).delete()
        if deleted[0] == 0:
            return Response("Lessons to delete not found!", status=status.HTTP_400_BAD_REQUEST)
        return Response("Deleted " + str(deleted[0]) + " lessons.", status=status.HTTP_200_OK)


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


@api_view(['POST'])
def tile_validation(request):
    request_data = request.data
    print(request_data)
    teacher_serializer = TeacherSerializer(request_data['teacher'])
    classroom_serializer = ClassroomSerializer(request_data['classroom'])
    class_serializer = ClassSerializer(request_data['class'])

    days = Lesson._meta.get_field('Weekday').choices
    lesson_hours = LessonHour.objects.all()

    weekday = days[request_data['column']]
    start_hour = getattr(lesson_hours[request_data['row']], 'Start_hour')
    start_minute = getattr(lesson_hours[request_data['row']], 'Start_minute')

    teacher_lessons = Lesson.objects.filter(FK_Teacher=teacher_serializer['ID_Teacher'].value).filter(Weekday=weekday[0]).filter(Hour=start_hour).filter(Minute=start_minute)
    classroom_lessons = Lesson.objects.filter(FK_Classroom=classroom_serializer['Classroom_no'].value).filter(Weekday=weekday[0]).filter(Hour=start_hour).filter(Minute=start_minute)

    if request.method == 'POST':
        if len(teacher_lessons) > 0:
            for teacher_lesson in teacher_lessons:
                if teacher_lesson.FK_Class.ID_Class != class_serializer['ID_Class'].value:
                    return Response("Teacher has already lesson at specified time", status=status.HTTP_400_BAD_REQUEST)
        
        if len(classroom_lessons) > 0:
            for classroom_lesson in classroom_lessons:
                if classroom_lesson.FK_Class.ID_Class != class_serializer['ID_Class'].value:
                    return Response("Classroom is taken at specified time", status=status.HTTP_400_BAD_REQUEST)

        return Response("OK", status=status.HTTP_200_OK)
