from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.documentation import include_docs_urls

schema_view = get_schema_view(
    openapi.Info(
        title="Employment System API",
        default_version="v1",
        description="API documentation for the Employment System",
        contact=openapi.Contact(email="contact@myapi.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("accounts.urls")),
    path("employee/", include("employee.urls")),
    path("", include("company.urls")),
    # Swagger UI documentation route
    path(
        "swagger-docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="swagger-ui",
    ),
    # Raw schema route (docs)
    path("docs/", schema_view.with_ui("redoc", cache_timeout=0), name="redoc-ui"),
]
