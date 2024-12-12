from django.urls import path
from .views import (
    EmployeeRetrieveUpdateDestroyView,
    EmployeeListCreateView,
    EmployeeCheckView,
)

urlpatterns = [
    path("employees/", EmployeeListCreateView.as_view(), name="employee-list-create"),
    path(
        "employees/<int:pk>/",
        EmployeeRetrieveUpdateDestroyView.as_view(),
        name="employee-detail",
    ),
    path(
        "employees/check-employee/", EmployeeCheckView.as_view(), name="check-employee"
    ),
]
