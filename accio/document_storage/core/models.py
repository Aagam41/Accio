from django.db import models

# Create your models here.
class Document(models.Model):
    document = models.FileField(upload_to="documents")
    path = models.CharField(max_length=4000)
    last_modified = models.DateTimeField()
    name = models.CharField(max_length=1000)
    size = models.PositiveBigIntegerField()
    mime_type = models.CharField(max_length=4000)
    user = models.CharField(max_length=4000)
    upload_datetime = models.DateTimeField()
