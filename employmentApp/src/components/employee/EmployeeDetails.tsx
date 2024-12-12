import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/employee/employees/${id}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setEmployee(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching employee details:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!employee) return <div>Employee not found.</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">Employee Details</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{employee.name}</h5>
          <p>
            <strong>Email:</strong> {employee.email}
          </p>
          <p>
            <strong>Mobile Number:</strong> {employee.mobile_number}
          </p>
          <p>
            <strong>Address:</strong> {employee.address}
          </p>
          <p>
            <strong>Designation:</strong> {employee.designation}
          </p>
          <p>
            <strong>Status:</strong> {employee.status}
          </p>
          <p>
            <strong>Hired On:</strong> {employee.hired_on}
          </p>
          <p>
            <strong>Days Employed:</strong> {employee.days_employed}
          </p>
          <p>
            <strong>Company:</strong> {employee.company}
          </p>
          <p>
            <strong>Department:</strong> {employee.department}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
