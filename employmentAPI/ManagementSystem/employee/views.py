from django.shortcuts import render
from .serializers import EmployeeSerializer, EmployeeCheckSerializer
from .models import Employee
from rest_framework import generics
from accounts.permissions import IsAdminManagerOrEmployee
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Employee


class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated, IsAdminManagerOrEmployee]


class EmployeeRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated, IsAdminManagerOrEmployee]


class EmployeeCheckView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            employee = Employee.objects.get(user=user)
            return Response({"employee_id": employee.id})
        except Employee.DoesNotExist:
            return Response({"employee_id": None})
