import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Company {
  id: number;
  name: string;
}

const EditCompany: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get company ID from URL
  const [company, setCompany] = useState({ id: id, name: "" });
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage

  // Fetch company details by ID
  const fetchCompany = () => {
    if (id) {
      fetch(`http://127.0.0.1:8000/companies/${id}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch company details");
          }
          return response.json();
        })
        .then((data) => {
          setCompany({ ...company, name: data.name });
        })
        .catch((error) => {
          console.error("Error fetching company details:", error);
        });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (company) {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(company),
      };

      fetch(`http://127.0.0.1:8000/companies/${company.id}/`, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.text(); // You can also use `.json()` if the response returns JSON
          } else {
            throw new Error("Error updating company");
          }
        })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error in PUT request:", error);
        });
    } else {
      console.error("Company or name is missing");
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <form onSubmit={handleSave}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="name"
          className="form-control"
          id="exampleInputname1"
          aria-describedby="nameHelp"
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
        ></input>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default EditCompany;
