from django.shortcuts import render
from django.contrib.auth.models import User
from . serializers import *
from rest_framework import viewsets
from django.contrib.auth.models import Group
from .models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdmin, IsVendor


# Create your views here.

               # role = serializer.validated_data.get('role', "User")
               # try:
               #      group = Group.objects.get(name=role)

               # except Group.DoesNotExist:
               #      return Response({"error": "Role does not exist"}, status=status.HTTP_400_BAD_REQUEST)

               # user.groups.add(group)

class RegisterViewSet(viewsets.ViewSet):

     def create(self, request):
          serializer = CreateUserSerializer(data=request.data)
          if serializer.is_valid():
               user = serializer.save()

               print(user,".................................!!!!!")

               return Response(serializer.data, status=status.HTTP_201_CREATED)
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
