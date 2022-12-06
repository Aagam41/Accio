from django.contrib import admin
from django.urls import path, include

from core.views import DocumentAPI

urlpatterns = [
    path('document/', DocumentAPI.as_view(), name="document"),
]
