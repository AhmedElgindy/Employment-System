from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Company, Department

# Get the custom user model
User = get_user_model()


class CompanyViewSetTestCase(APITestCase):
    def setUp(self):
        # Create a test admin user and authenticate
        self.admin_user = User.objects.create_user(
            username="admin",
            password="admin123",
            email="admin@example.com",
        )
        self.admin_user.role = "Admin"  # Set custom role if applicable
        self.admin_user.is_staff = True  # Set as admin/staff if required
        self.admin_user.save()

        self.client = APIClient()
        self.client.login(username="admin", password="admin123")

        # Create test companies
        self.company1 = Company.objects.create(
            name="company A",
        )
        self.company2 = Company.objects.create(
            name="company B",
        )

        # Endpoint URLs
        self.list_url = "/companies/"
        self.detail_url = f"/companies/{self.company1.id}/"

    def test_list_companies(self):
        # Test retrieving a list of companies
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Check the number of companies

    def test_retrieve_company(self):
        # Test retrieving a single company
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.company1.name)

    def test_create_company(self):
        # Test creating a new company
        data = {
            "name": "company C",
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Company.objects.count(), 3)  # Ensure a new company is created

    def test_update_company(self):
        # Test updating an existing company
        data = {
            "name": "Updated company A",
        }
        response = self.client.put(self.detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.company1.refresh_from_db()  # Refresh the instance from the database
        self.assertEqual(self.company1.name, "Updated company A")

    def test_delete_company(self):
        # Test deleting a company
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Company.objects.count(), 1)  # Ensure one company remains


class DepartmentViewSetTestCase(APITestCase):
    def setUp(self):
        # Create a test admin user and authenticate
        self.admin_user = User.objects.create_user(
            username="admin",
            password="admin123",
            email="admin@example.com",
        )
        self.admin_user.role = "Admin"
        self.admin_user.is_staff = True
        self.admin_user.save()

        self.client = APIClient()
        self.client.login(username="admin", password="admin123")

        self.company = Company.objects.create(name="comany A")

        self.department1 = Department.objects.create(
            name="department A", company=self.company
        )
        self.department2 = Department.objects.create(
            name="department B", company=self.company
        )

        # Endpoint URLs
        self.list_url = "/departments/"
        self.detail_url = f"/departments/{self.department1.id}/"

    def test_list_departments(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_retrive_department(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_department(self):
        data = {
            "name": "create department",
            "company": self.company.id,  # Use the ID instead of the object
        }
        response = self.client.post(self.list_url, data)
        print("POST Response Data:", response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Verify the department is created in the database
        self.assertEqual(Department.objects.count(), 3)

        # Retrieve all departments and verify the count
        response = self.client.get(self.list_url)
        print("GET Response Data:", response.data)
        self.assertEqual(len(response.data), 3)
