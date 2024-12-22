# urls.py (company app)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CompanyViewSet,
    DepartmentViewSet,
)

router = DefaultRouter()
router.register(r"companies", CompanyViewSet, basename="company")
router.register(r"departments", DepartmentViewSet, basename="department")

urlpatterns = [
    path("", include(router.urls)),
]
