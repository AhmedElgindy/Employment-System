from django.urls import path, include
from .views import UserRoleView

urlpatterns = [
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
    path("auth/user-role/", UserRoleView.as_view(), name="user-role"),
]
