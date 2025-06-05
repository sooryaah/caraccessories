from django.urls import path, include
from rest_framework import routers
from .views import *  # make sure this is your custom viewset

router = routers.DefaultRouter()
router.register(r'create_users', RegisterViewSet, basename='create_users')

urlpatterns = [
    path('accounts', include(router.urls)),
]