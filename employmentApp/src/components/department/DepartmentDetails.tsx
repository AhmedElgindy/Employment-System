import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DepartmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [department, setDepartment] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No authorization token found");
        setLoading(false);
        return;
      }

      fetch(`http://127.0.0.1:8000/departments/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch department details");
          }
          return response.json();
        })
        .then((data) => {
          setDepartment(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching department details:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!department) return <div>Department not found.</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">Department Details</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{department.name}</h5>
          <p>
            <strong>Company:</strong> {department.company}
          </p>
          <p>
            <strong>Number of Employees:</strong> {department.num_employees}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
