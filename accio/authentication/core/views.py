from rest_framework_simplejwt.views import TokenObtainPairView as drfTokenObtainPairView
from core.serializers import TokenObtainPairSerializer

class TokenObtainPairView(drfTokenObtainPairView):
    serializer_class = TokenObtainPairSerializer
