from rest_framework import serializers
from .models import User


class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "role",
        ]
