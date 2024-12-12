from rest_framework import serializers
from .models import Employee
from django.contrib.auth import get_user_model

from company.models import Company, Department


class EmployeeSerializer(serializers.ModelSerializer):
    company = serializers.SlugRelatedField(
        queryset=Company.objects.all(), slug_field="name"
    )
    department = serializers.SlugRelatedField(
        queryset=Department.objects.all(), slug_field="name"
    )
    user = serializers.SlugRelatedField(
        queryset=get_user_model().objects.all(), slug_field="username"
    )

    class Meta:
        model = Employee
        fields = [
            "id",
            "name",
            "email",
            "mobile_number",
            "address",
            "designation",
            "hired_on",
            "status",
            "company",
            "department",
            "user",
            "days_employed",
        ]


class EmployeeCheckSerializer(serializers.Serializer):
    employee_id = serializers.IntegerField(read_only=True)
