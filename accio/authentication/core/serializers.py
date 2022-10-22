from rest_framework_simplejwt.serializers import TokenObtainPairSerializer as drfTokenObtainPairSerializer

class TokenObtainPairSerializer(drfTokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['fullname'] = user.get_full_name()
        token['email'] = user.email

        return token
