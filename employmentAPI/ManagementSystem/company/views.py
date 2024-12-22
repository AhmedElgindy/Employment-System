from rest_framework import generics
from .models import Company, Department
from .serializers import CompanySerializer, DepartmentSerializer
from accounts.permissions import IsAdmin, IsManager
from rest_framework.permissions import IsAuthenticated, AllowAny


from rest_framework.viewsets import ModelViewSet


class CompanyViewSet(ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated, IsAdmin]


class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated, IsAdmin | IsManager]
