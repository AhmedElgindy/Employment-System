from rest_framework import serializers
from .models import Company, Department


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name", "num_departments", "num_employees"]


class DepartmentSerializer(serializers.ModelSerializer):
    company = serializers.SlugRelatedField(
        queryset=Company.objects.all(), slug_field="name"
    )

    class Meta:
        model = Department
        fields = ["id", "name", "company", "num_employees"]
