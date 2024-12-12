import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Company {
  id: number;
  name: string;
}

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [newCompany, setNewCompany] = useState<Company>({ id: 0, name: "" });
  const navigate = useNavigate();

  // Fetch companies from API
  const fetchCompanies = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/companies/", {
        method: "GET",
        headers: { Authorization: `Token ${token}` },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch companies. Status: ${response.status}`
        );
      }

      const data = await response.json();
      setCompanies(data);
    } catch (error: any) {
      toast.error(error.message || "Error fetching companies.");
    }
  };

  // Create a new company
  const createCompany = async () => {
    if (!newCompany.name.trim()) {
      toast.warning("Company name cannot be empty!");
      return;
    }

    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/companies/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ name: newCompany.name }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create company. Status: ${response.status}`);
      }

      const createdCompany: Company = await response.json();
      setCompanies((prevCompanies) => [...prevCompanies, createdCompany]);
      setNewCompany({ id: 0, name: "" });
      toast.success("Company created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error creating company.");
    }
  };

  // Delete a company
  const deleteCompany = async (id: number) => {
    const token = sessionStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/companies/${id}/`, {
          method: "DELETE",
          headers: { Authorization: `Token ${token}` },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to delete company. Status: ${response.status}`
          );
        }

        setCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company.id !== id)
        );
        toast.success("Company deleted successfully.");
      } catch (error: any) {
        toast.error(error.message || "Error deleting company.");
      }
    }
  };

  // Handle input change for the company form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="text-center mb-4">Companies</h1>

      {/* Create Company */}
      <div className="card mb-4 shadow-sm bg-light">
        <div className="card-body">
          <h5 className="card-title text-secondary">Create Company</h5>
          <div className="input-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter company name"
              value={newCompany.name}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary ms-2" onClick={createCompany}>
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Company List */}
      <div className="row">
        {companies.map((company) => (
          <div key={company.id} className="col-md-4 col-sm-6 col-xs-12 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{company.name}</h5>
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => navigate(`edit/${company.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCompany(company.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => navigate(`company/${company.id}`)}
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

export default CompanyList;
