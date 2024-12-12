# Full-Stack Employment System

## Overview

This project is a full-stack employment management system built with Django (backend) and React (frontend). It allows users to manage companies, departments, employees, and their roles within an organization. The application features role-based access control, employee management, and an authentication system based on JSON Web Tokens (JWT). The backend is built using Django Rest Framework (DRF), and the frontend uses React.

## Technologies Used

- **Backend**: Django, Django Rest Framework (DRF), Django Allauth, Dj-REST-Auth, Token Authentication
- **Frontend**: React
- **Database**: SQLite (for development)
- **Virtual Environment**: Pipenv

## Features

- **User Authentication**: Token-based authentication using Django Rest Framework and Dj-REST-Auth.
- **Role-Based Access Control**: Admin, Manager, and Employee roles with restricted access.
- **Employee Management**: Ability to add, update, delete, and view employees and their details.
- **Company and Department Management**: Admin and Manager roles can manage companies and departments.
- **Custom API Endpoints**: For user roles, employee checks, and company statistics.

---

## Setup Instructions

### Prerequisites

- Python 3.x
- Node.js and npm (for React frontend)
- Pipenv (for managing Python dependencies)
- Postman (for testing API endpoints)

### Backend Setup (Django)

1. Clone the repository:
    ```bash
    git clone https://github.com/AhmedElgindy/Employment-System/
    cd employmentAPI
    ```

2. Install backend dependencies:
    ```bash
    pipenv install
    ```

3. Activate the virtual environment:
    ```bash
    pipenv shell
    cd ManagmentSystem
    ```
    

4. Apply migrations to set up the database:
    ```bash
    python manage.py migrate
    ```

5. Create a superuser for the Django admin:
    ```bash
    python manage.py createsuperuser
    ```

6. Run the Django development server:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup (React)

1. Navigate to the `employmentApp` directory:
    ```bash
    cd employmentApp
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Run the React development server:
    ```bash
    npm start
    ```

Your frontend should now be running at `http://localhost:5173`, and the backend at `http://localhost:8000`.

---

## API Documentation

### Authentication

- **POST /api/auth/login**: Logs in a user and returns a token for authentication.
  - **Request**: `{"username": "<username>", "password": "<password>"}`
  - **Response**: `{"token": "<JWT-token>"}`

### User Role

- **GET /api/user/role**: Get the role of the authenticated user.
  - **Response**: 
    ```json
    {
      "username": "<username>",
      "role": "<role>"
    }
    ```

### Company

- **GET /api/companies/**: List all companies.
- **POST /api/companies/**: Create a new company.
  - **Request**: `{"name": "<company-name>"}`
- **GET /api/companies/{id}/**: Retrieve a specific company.
- **PUT /api/companies/{id}/**: Update a specific company.
- **DELETE /api/companies/{id}/**: Delete a specific company.

### Department

- **GET /api/departments/**: List all departments.
- **POST /api/departments/**: Create a new department.
  - **Request**: `{"name": "<department-name>", "company": "<company-id>"}`
- **GET /api/departments/{id}/**: Retrieve a specific department.
- **PUT /api/departments/{id}/**: Update a specific department.
- **DELETE /api/departments/{id}/**: Delete a specific department.

### Employee

- **GET /api/employees/**: List all employees.
- **POST /api/employees/**: Create a new employee.    
- **GET /api/employees/{id}/**: Retrieve a specific employee.
- **PUT /api/employees/{id}/**: Update a specific employee.
- **DELETE /api/employees/{id}/**: Delete a specific employee.

---

## Security Measures

- **Token Authentication**: JWT is used for user authentication. The token should be included in the request header as `Authorization: Token <token>`.
- **Role-Based Access Control**: The system differentiates access based on roles (Admin, Manager, Employee).
  - Admin has full access to manage companies, departments, and employees.
  - Managers can manage departments and employees within their own department.
  - Employees can only view and update their own information.

---

## Task Completion Checklist

- [x] User authentication system (Token-based)
- [x] Role-based access control (Admin, Manager, Employee)
- [x] Company and department management (CRUD operations)
- [x] Employee management system (CRUD operations)
- [x] API documentation (Postman/Swagger)
- [x] Frontend (React) and backend (Django) setup completed
- [ ] API testing with Postman and Swagger UI
- [ ] Additional unit tests for views and models (if necessary)

---

## Additional Information

- For API testing, use **Postman** or **Swagger**  to interact with the endpoints.
- The frontend communicates with the backend using RESTful API endpoints and displays user data accordingly.
