from django.contrib import admin
from timetable.models import *

# Register your models here.
admin.site.register(Classroom)
admin.site.register(Teacher)
admin.site.register(Subject)
admin.site.register(Class)
admin.site.register(LessonsProgram)
admin.site.register(Lesson)
admin.site.register(LessonHour)
admin.site.register(Teacher_Subject)
