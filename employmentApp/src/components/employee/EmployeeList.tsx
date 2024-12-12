import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Employee {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  address: string;
  designation: string;
  hired_on: string;
  status: string;
  company: string;
  department: string;
  user: number | null;
  days_employed: number;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // Fetch employees from the API
  const fetchEmployees = async () => {
    const response = await fetch("http://127.0.0.1:8000/employee/employees/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.json();
    setEmployees(data);
  };

  // Delete an employee
  const deleteEmployee = (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      fetch(`http://127.0.0.1:8000/employee/employees/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setEmployees(employees.filter((employee) => employee.id !== id));
            toast.success("Employee deleted successfully.");
          } else {
            throw new Error("Error deleting employee");
          }
        })
        .catch((error) => {
          toast.error(error.message || "Error deleting employee.");
        });
    }
  };

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="text-center text-primary">Employees</h1>

      {/* Create Employee Button */}
      <div className="mb-3">
        <button
          className="btn btn-success"
          onClick={() => navigate("/employees/create")}
        >
          Create Employee
        </button>
      </div>

      <div>
        <h2>Employee List</h2>
        <div className="row">
          {employees.map((employee) => (
            <div key={employee.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{employee.name}</h5>
                  <p className="card-text">
                    <strong>Company:</strong> {employee.company}
                  </p>
                  <p className="card-text">
                    <strong>Department:</strong> {employee.department}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/employees/edit/${employee.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteEmployee(employee.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() =>
                        navigate(`/employees/employee/${employee.id}`)
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
    </div>
  );
};

export default EmployeeList;
