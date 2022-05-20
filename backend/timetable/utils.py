import random
from timetable.models import Class, LessonHour

COLORS = ['#baffc9', '#ffffba', '#ffdfba', '#ffb3ba', '#bae1ff', '#dac5b3', 'e6f5fb', '#ffdaec', '#fafe92', '#ffb066',
          '#ff9191', '#e679c8', '#f2bbad', '#afdfdb', '#e4b784', '#fcff85', '#f06e9a', '#7d6060', '#a0b395', '#ffcd94']


def assign_color(subject, used_colors):
    color = random.choice(COLORS)
    if color in used_colors:
        assign_color(subject, used_colors)
    else:
        subject.Color = color
        used_colors.append(color)


def find_class_no(class_id):
    class_no = None
    curr_class_no = Class.objects.get(pk=class_id).Class_no
    if curr_class_no.startswith('III'):
        class_no = 'III'
    elif curr_class_no.startswith('II'):
        class_no = 'II'
    elif curr_class_no.startswith('IV'):
        class_no = 'IV'
    elif curr_class_no.startswith('I'):
        class_no = 'I'
    elif curr_class_no.startswith('VIII'):
        class_no = 'VIII'
    elif curr_class_no.startswith('VII'):
        class_no = 'VII'
    elif curr_class_no.startswith('VI'):
        class_no = 'VI'
    elif curr_class_no.startswith('V'):
        class_no = 'V'
    return class_no


def validate_class_no(_class):
    class_no = None
    if _class.startswith('III'):
        class_no = 'III'
    elif _class.startswith('II'):
        class_no = 'II'
    elif _class.startswith('IV'):
        class_no = 'IV'
    elif _class.startswith('I'):
        class_no = 'I'
    elif _class.startswith('VIII'):
        class_no = 'VIII'
    elif _class.startswith('VII'):
        class_no = 'VII'
    elif _class.startswith('VI'):
        class_no = 'VI'
    elif _class.startswith('V'):
        class_no = 'V'
    return class_no


def find_position_in_schedule(lesson):
    lesson_hours = LessonHour.objects.all()
    lesson_no = None
    weekday = None
    for hour in lesson_hours:
        if hour.Start_hour == lesson.Hour and hour.Start_minute == lesson.Minute:
            lesson_no = hour.Lesson_no
    if lesson.Weekday == 'mon':
        weekday = 0
    if lesson.Weekday == 'tue':
        weekday = 1
    if lesson.Weekday == 'wed':
        weekday = 2
    if lesson.Weekday == 'thu':
        weekday = 3
    if lesson.Weekday == 'fri':
        weekday = 4

    return weekday, lesson_no
