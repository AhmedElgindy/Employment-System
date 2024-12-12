import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEmployee: React.FC = () => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    mobile_number: "",
    address: "",
    designation: "",
    hired_on: "",
    status: "Pending",
    company: "",
    department: "",
    user: "",
    id: "",
  });
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const createEmployee = async () => {
    // Validate required fields before submission
    if (
      !newEmployee.name ||
      !newEmployee.email ||
      !newEmployee.mobile_number ||
      !newEmployee.company ||
      !newEmployee.department
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/employee/employees/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(newEmployee),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        // Handle specific error messages
        if (errorData.email) {
          toast.error(`Email error: ${errorData.email.join(", ")}`);
        }
        if (errorData.user) {
          toast.error(`Username error: ${errorData.user.join(", ")}`);
        }

        throw new Error("Error creating employee. Please check your data.");
      }

      if (role === "Admin" || role === "Manager") {
        navigate("/employees");
      } else {
        navigate(`/employees/employee/${newEmployee.id}`);
      }

      toast.success("Employee created successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(
          error.message || "Error creating employee. Please try again."
        );
      } else {
        toast.error("An unknown error occurred. Please try again.");
      }
    }
  };

  const fetchUser = async () => {
    try {
      const roleResponse = await fetch(
        "http://127.0.0.1:8000/accounts/auth/user/",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = await roleResponse.json();
      setNewEmployee((prevState) => ({
        ...prevState,
        user: data.username,
        id: data.id, // Ensure this is set before submission
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data. Please try again.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="text-center text-primary">Create Employee</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Employee Details</h5>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter employee name"
              value={newEmployee.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter employee email"
              value={newEmployee.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="text"
              name="mobile_number"
              className="form-control"
              placeholder="Enter employee mobile number"
              value={newEmployee.mobile_number}
              onChange={handleInputChange}
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              className="form-control"
              placeholder="Enter employee address"
              value={newEmployee.address}
              onChange={handleInputChange}
            />
          </div>

          {/* Designation */}
          <div className="mb-3">
            <label className="form-label">Designation</label>
            <input
              type="text"
              name="designation"
              className="form-control"
              placeholder="Enter employee designation"
              value={newEmployee.designation}
              onChange={handleInputChange}
            />
          </div>

          {/* Hired On */}
          <div className="mb-3">
            <label className="form-label">Hired On</label>
            <input
              type="date"
              name="hired_on"
              className="form-control"
              value={newEmployee.hired_on}
              onChange={handleInputChange}
            />
          </div>

          {/* Company */}
          <div className="mb-3">
            <label className="form-label">Company</label>
            <input
              type="text"
              name="company"
              className="form-control"
              placeholder="Enter company Name"
              value={newEmployee.company}
              onChange={handleInputChange}
            />
          </div>

          {/* Department */}
          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              type="text"
              name="department"
              className="form-control"
              placeholder="Enter department Name"
              value={newEmployee.department}
              onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-primary" onClick={createEmployee}>
            Create Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
