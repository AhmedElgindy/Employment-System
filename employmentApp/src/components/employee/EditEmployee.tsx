import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get employee ID from URL
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile_number: "",
    address: "",
    designation: "",
    hired_on: "",
    status: "Pending",
    company: "",
    department: "",
  });
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  // Fetch employee details by ID
  const fetchEmployee = () => {
    fetch(`http://127.0.0.1:8000/employee/employees/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setEmployee(data))
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );
  };

  // Save updated employee details
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(employee),
    };

    fetch(`http://127.0.0.1:8000/employee/employees/${id}/`, requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate("/employees"); // Redirect to employees list
        } else {
          throw new Error("Error updating employee");
        }
      })
      .catch((error) => console.error("Error in PUT request:", error));
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  return (
    <form onSubmit={handleSave}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={employee.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={employee.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Mobile Number</label>
        <input
          type="text"
          name="mobile_number"
          className="form-control"
          value={employee.mobile_number}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <textarea
          name="address"
          className="form-control"
          value={employee.address}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Designation</label>
        <input
          type="text"
          name="designation"
          className="form-control"
          value={employee.designation}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Hired On</label>
        <input
          type="date"
          name="hired_on"
          className="form-control"
          value={employee.hired_on}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          name="status"
          className="form-select"
          value={employee.status}
          onChange={handleInputChange}
        >
          <option value="Pending">Pending</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Company</label>
        <input
          type="text"
          name="company"
          className="form-control"
          value={employee.company}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Department</label>
        <input
          type="text"
          name="department"
          className="form-control"
          value={employee.department}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default EditEmployee;
