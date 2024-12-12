import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Department {
  id: number;
  name: string;
  company: string;
}

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [newDepartment, setNewDepartment] = useState({
    id: 0,
    name: "",
    company: "",
  });
  const navigate = useNavigate();

  // Fetch departments from the API
  const fetchDepartments = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/departments/", {
        method: "GET",
        headers: { Authorization: `Token ${token}` },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch departments. Status: ${response.status}`
        );
      }

      const data = await response.json();
      setDepartments(data);
    } catch (error: any) {
      toast.error(error.message || "Error fetching departments.");
    }
  };

  // Create a new department
  const createDepartment = async () => {
    if (!newDepartment.name.trim() || !newDepartment.company.trim()) {
      toast.warning("Both department name and company name are required.");
      return;
    }

    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/departments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(newDepartment),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create department. Status: ${response.status}`
        );
      }

      const createdDepartment: Department = await response.json();
      setDepartments((prevDepartments) => [
        ...prevDepartments,
        createdDepartment,
      ]);
      setNewDepartment({ id: 0, name: "", company: "" });
      toast.success("Department created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error creating department.");
    }
  };

  // Delete a department
  const deleteDepartment = async (id: number) => {
    const token = sessionStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/departments/${id}/`,
          {
            method: "DELETE",
            headers: { Authorization: `Token ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to delete department. Status: ${response.status}`
          );
        }

        setDepartments((prevDepartments) =>
          prevDepartments.filter((department) => department.id !== id)
        );
        toast.success("Department deleted successfully.");
      } catch (error: any) {
        toast.error(error.message || "Error deleting department.");
      }
    }
  };

  // Handle input changes for creating new department
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDepartment({ ...newDepartment, [name]: value });
  };

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="text-center mb-4 text-primary">Departments</h1>

      {/* Create Department Form */}
      <div className="card mb-4 shadow-sm bg-light">
        <div className="card-body">
          <h5 className="card-title text-secondary">Create Department</h5>
          <div className="input-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter department name"
              value={newDepartment.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="company"
              className="form-control ms-2"
              placeholder="Enter company name"
              value={newDepartment.company}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary ms-2" onClick={createDepartment}>
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Department List */}
      <div className="row">
        {departments.map((department) => (
          <div key={department.id} className="col-md-4 col-sm-6 col-xs-12 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{department.name}</h5>
                <p className="card-text text-muted">
                  Company: {department.company}
                </p>
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() =>
                      navigate(`/departments/edit/${department.id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteDepartment(department.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() =>
                      navigate(`/departments/department/${department.id}`)
                    }
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;
