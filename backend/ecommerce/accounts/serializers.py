from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import *

class CreateUserSerializer(serializers.ModelSerializer):

     role = serializers.CharField(max_length=10, write_only=True)
     class Meta:
          model = User
          fields = ('id', 'username', 'email', 'password', 'role')
          extra_kwargs = {'password': {'write_only': True}}

     def create(self, validated_data):
        role = validated_data.pop('role', 'User')
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()

        # Assign group to User
        group = Group.objects.get(name=role)
        user.groups.add(group)

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']