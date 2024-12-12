import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDepartment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [department, setDepartment] = useState({ id, name: "", company: "" });
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const fetchDepartment = () => {
    if (id) {
      fetch(`http://127.0.0.1:8000/departments/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setDepartment(data))
        .catch((error) =>
          console.error("Error fetching department details:", error)
        );
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/departments/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(department),
    })
      .then((response) => {
        if (response.ok) navigate("/departments");
        else throw new Error("Error updating department");
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  return (
    <form onSubmit={handleSave}>
      <div className="mb-3">
        <label className="form-label">Department Name</label>
        <input
          type="text"
          className="form-control"
          value={department.name}
          onChange={(e) =>
            setDepartment({ ...department, name: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Company Name</label>
        <input
          type="text"
          className="form-control"
          value={department.company}
          onChange={(e) =>
            setDepartment({ ...department, company: e.target.value })
          }
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default EditDepartment;
