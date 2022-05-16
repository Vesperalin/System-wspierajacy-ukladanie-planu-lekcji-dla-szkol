"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from timetable import views
from timetable.views import *

router = routers.DefaultRouter()

router.register(r'classrooms', views.ClassroomView, 'classroom')
router.register(r'teachers', views.TeacherView, 'teacher')
router.register(r'subjects', views.SubjectView, 'subject')
router.register(r'classes', views.ClassView, 'class')
router.register(r'lessons', views.LessonView, 'lesson')
router.register(r'lesson_programs', views.LessonsProgramView, 'lesson_program')
router.register(r'breaks', views.BreakView, 'break')
router.register(r'classes_lesson', views.ClassWithLessonView, 'class_with_lesson')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
