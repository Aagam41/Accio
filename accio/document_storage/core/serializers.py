from rest_framework.serializers import ModelSerializer
from core import models

# Serializers define the API representation.
class DocumentSerializer(ModelSerializer):
    class Meta:
        model = models.Document
        fields = '__all__'
