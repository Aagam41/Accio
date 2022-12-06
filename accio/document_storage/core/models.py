import uuid
from django.db import models

# Create your models here.
class Document(models.Model):
    def upload_to(instance, filename):
        return f'document_storage/documents/{uuid.uuid4()}_{filename}'

    document = models.FileField(upload_to=upload_to, max_length=4000)
    path = models.CharField(max_length=4000)
    last_modified = models.DateTimeField()
    name = models.CharField(max_length=1000)
    size = models.PositiveBigIntegerField()
    mime_type = models.CharField(max_length=4000)
    user = models.CharField(max_length=4000)
    upload_datetime = models.DateTimeField()
