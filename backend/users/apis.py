from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from timetable.mixins import ApiErrorsMixin, ApiAuthMixin, PublicApiMixin

from auth.services import jwt_login, google_validate_id_token

from users.services import user_get_or_create
from users.selectors import user_get_me


class UserMeApi(ApiAuthMixin, ApiErrorsMixin, APIView):
    def get(self, request, *args, **kwargs):
        return Response(user_get_me(user=request.user))
