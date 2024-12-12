import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompanyList from "./components/company/CompanyList";
import EditCompany from "./components/company/EditCompany";
import CompanyDetails from "./components/company/CompanyDetails";
import NavBar from "./components/NavBar";
import DepartmentList from "./components/department/DepartmentList";
import DepartmentDetails from "./components/department/DepartmentDetails";
import EditDepartment from "./components/department/EditDepartment";
import EmployeeList from "./components/employee/EmployeeList";
import CreateEmployee from "./components/employee/CreateEmployee";
import EditEmployee from "./components/employee/EditEmployee";
import EmployeeDetails from "./components/employee/EmployeeDetails";
import SignUp from "./user/SignUp";
import Login from "./user/LogIn";
import "./App.css";
const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/edit/:id" element={<EditCompany />} />
        <Route path="/companies/company/:id" element={<CompanyDetails />} />

        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/departments/edit/:id" element={<EditDepartment />} />
        <Route
          path="/departments/department/:id"
          element={<DepartmentDetails />}
        />

        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/create" element={<CreateEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
        <Route path="/employees/employee/:id" element={<EmployeeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
