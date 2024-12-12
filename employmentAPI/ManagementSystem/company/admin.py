from django.contrib import admin
from .models import Company, Department


class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "num_departments_display", "num_employess_display")

    def num_departments_display(self, obj):
        return obj.num_departments

    def num_employess_display(self, obj):
        return obj.num_employees

    num_departments_display.short_description = "Number of Depatrtments"

    num_employess_display.short_description = "Number of Employees"


class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("name", "company", "num_employees_display")

    def num_employees_display(self, obj):
        return obj.num_employees

    num_employees_display.short_description = "Number of Employees"


# Register your models here.
admin.site.register(Company, CompanyAdmin)
admin.site.register(Department, DepartmentAdmin)
