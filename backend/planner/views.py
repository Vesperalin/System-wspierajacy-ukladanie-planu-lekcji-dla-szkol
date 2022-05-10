from django.shortcuts import render

from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *


# Create your views here.

class ReactView(APIView):
    serializer_class = ClassroomSerializer

    def get(self, request):
        detail = [{"Classroom_no": detail.Classroom_no}
                  for detail in Classrooms.objects.all()]
        return Response(detail)

    def post(self, request):
        serializer = ClassroomSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


    # need to add endpoints for crud operations