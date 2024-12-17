from django.db import models

# Create your models here.
class UploadedFile(models.Model):
    file = models.FileField() #add upload_to as a parameter if you want to upload files locally
    uploaded_at = models.DateTimeField(auto_now_add=True)