from django.db import models
from company.models import Company, Department
from django.contrib.auth import get_user_model


class Employee(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Active", "Active"),
        ("Inactive", "Inactive"),
    ]

    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="employees"
    )
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, related_name="employees"
    )
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="Pending")
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=15)
    address = models.TextField()
    designation = models.CharField(max_length=255)
    hired_on = models.DateField(null=True, blank=True)
    user = models.OneToOneField(
        get_user_model(), on_delete=models.SET_NULL, null=True, blank=True
    )

    @property
    def days_employed(self):
        if self.hired_on:
            from datetime import date

            return (date.today() - self.hired_on).days
        return None

    def __str__(self):
        return self.name

    def clean(self):
        if self.department.company != self.company:
            raise ValidationError(
                {
                    "department": "The selected department does not belong to the selected company."
                }
            )
        super().clean()

        if self.user and self.user.role != "Employee":
            raise ValidationError("The associated user must have the role 'Employee'.")


class Manger(models.Model):
    user = models.OneToOneField(
        get_user_model(), on_delete=models.SET_NULL, null=True, blank=True
    )
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=15)
    address = models.TextField()
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="departmentManger"
    )
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, related_name="departmentManger"
    )

    def clean(self):
        if self.department.company != self.company:
            raise ValidationError(
                {
                    "department": "The selected department does not belong to the selected company."
                }
            )
        super().clean()

        if self.user and self.user.role != "Manger":
            raise ValidationError("The associated user must have the role 'Manger'.")
