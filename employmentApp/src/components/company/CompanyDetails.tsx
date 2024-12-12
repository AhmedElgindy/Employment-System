import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CompanyDetails: React.FC = () => {
  const { id } = useParams(); // Get the company ID from the URL params
  const [company, setCompany] = useState<any>(null); // State to store company details
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Authorization token is missing.");
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/companies/${id}/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch company details.");
        }

        const data = await response.json();
        setCompany(data); // Set the company details in state
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching company details:", error);
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>; // Show loading message while data is being fetched
  }

  if (!company) {
    return <div className="not-found">Company not found.</div>; // Handle case where company doesn't exist
  }

  return (
    <div className="container fade-in">
      <div className="card">
        <h1 className="text-primary">Company Details</h1>
        <div className="card-body">
          <h5 className="card-title">{company.name}</h5>
          <p>
            <strong>ID:</strong> {company.id}
          </p>
          <p>
            <strong>Number of Departments:</strong>{" "}
            {company.num_departments || "0"}
          </p>
          <p>
            <strong>Number of Employees:</strong> {company.num_employees || "0"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
