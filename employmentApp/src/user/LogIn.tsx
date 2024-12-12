import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkEmployee = async (token: string) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/employee/employees/check-employee/",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = await response.json();
      return data.employee_id;
    } catch (error) {
      console.error("Error checking employee record:", error);
      return null;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!formData.username || !formData.password) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/accounts/auth/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        // Check if error data contains specific error messages
        if (errorData.username) {
          errorData.username.forEach((message: string) => toast.error(message));
        }

        if (errorData.password) {
          errorData.password.forEach((message: string) => toast.error(message));
        }

        throw new Error(
          errorData.detail || "Login failed. Please check your data."
        );
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.key);
      console.log(data.key);

      // Fetch and store user role
      const roleResponse = await fetch(
        "http://127.0.0.1:8000/accounts/auth/user-role/",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${data.key}`,
          },
        }
      );

      if (roleResponse.ok) {
        const roleData = await roleResponse.json();
        sessionStorage.setItem("role", roleData.role);
      } else {
        throw new Error("Failed to fetch user role");
      }

      // Check if the user is an employee
      if (sessionStorage.getItem("role") === "Employee") {
        const employeeId = await checkEmployee(data.key);
        if (employeeId) {
          // Redirect to employee detail page
          navigate(`/employees/employee/${employeeId}`);
        } else {
          // Redirect to create employee page
          navigate("/employees/create");
        }
      } else {
        // Redirect to departments page for non-employees
        navigate("/departments");
      }

      toast.success("Login successful!");
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="mb-3">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
