from django.db import models

from django.apps import apps


class Company(models.Model):
    name = models.CharField(max_length=255)

    @property
    def num_departments(self):
        return self.departments.count()

    @property
    def num_employees(self):
        total_employees = 0
        for department in self.departments.all():
            total_employees += department.num_employees
        return total_employees

    def __str__(self):
        return self.name


class Department(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="departments"
    )
    name = models.CharField(max_length=255)

    @property
    def num_employees(self):
        Employee = apps.get_model("employee", "Employee")
        return Employee.objects.filter(department=self).count()

    def __str__(self):
        return self.name
