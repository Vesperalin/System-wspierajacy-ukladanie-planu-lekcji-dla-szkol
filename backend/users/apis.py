from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from timetable.mixins import ApiErrorsMixin, ApiAuthMixin

from users.selectors import user_get_me

class UserMeApi(ApiAuthMixin, ApiErrorsMixin, APIView):
    def get(self, request, *args, **kwargs):
        print(request.user)
        return Response(user_get_me(user=request.user))
