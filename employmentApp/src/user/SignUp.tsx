import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Form validation: Check if passwords match
    if (formData.password1 !== formData.password2) {
      toast.error("Passwords do not match.");
      return;
    }

    // Check if all fields are filled
    if (
      !formData.username ||
      !formData.email ||
      !formData.password1 ||
      !formData.password2
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/accounts/auth/registration/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        // Check if the error data contains specific error messages
        if (errorData.username) {
          errorData.username.forEach((message: string) => toast.error(message));
        }

        if (errorData.password1) {
          errorData.password1.forEach((message: string) =>
            toast.error(message)
          );
        }

        if (errorData.password2) {
          errorData.password2.forEach((message: string) =>
            toast.error(message)
          );
        }

        // Optionally handle any other errors
        if (errorData.email) {
          errorData.email.forEach((message: string) => toast.error(message));
        }

        throw new Error("Signup failed, please check your data.");
      }

      toast.success("Signup successful! Please log in.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <div className="mb-3">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
