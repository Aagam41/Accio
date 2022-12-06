from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework_simplejwt import authentication
from core.models import Document
from core.serializers import DocumentSerializer
import json



# from rest_framework_simplejwt.authentication import JWTAuthentication
# JWT_authenticator = JWTAuthentication()

# # authenitcate() verifies and decode the token
# # if token is invalid, it raises an exception and returns 401
# response = JWT_authenticator.authenticate(request)
# if response is not None:
#     # unpacking
#     user , token = response
#     print("this is decoded token claims", token.payload)
# else:
#     print("no token is provided in the header or the header is missing")



class DocumentAPI(APIView):
    authentication_classes = [authentication.JWTStatelessUserAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    serializer_class = DocumentSerializer

    def get(self, request, *args, **kwargs):
        serializer = Document.objects.all().values()
        return Response(serializer, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
