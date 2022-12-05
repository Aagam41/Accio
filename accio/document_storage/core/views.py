from rest_framework.views import APIView
from rest_framework import authentication, permissions
from rest_framework.response import Response
from core.serializers import DocumentSerializer


class DocumentAPI(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DocumentSerializer

    def get(self, request, *args, **kwargs):
        pass

    def post(self, request, *args, **kwargs):
        pass
