import React, { useState } from "react";
import { useRegister } from "../../hooks/auth/useRegister";
import { useAuth } from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import "./css/registration.css";

export function RegisterForm() {
  const register = useRegister();
  const [login, ,] = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username) {
      setError("Username is required.");
      return;
    }
    if (!formData.email) {
      setError("Email is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.password) {
      setError("Password is required.");
      return;
    }
    if (!formData.confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    const username = formData.username;
    const email = formData.email;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    await register(username, email, password);

    await login(email, password);

    const user = sessionStorage.getItem("user");

    if (!user) {
      setError("Failed to register.");
    }

    navigate("/");
  };

  return (
    <form className="registration-form_container red" onSubmit={handleSubmit}>
      <p className="registration-form-title">Username</p>
      <input
        type="username"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className="registration-input registration-input--confirm-password"
        placeholder="username"
      />
      <p className="registration-form-title">Email</p>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="registration-input registration-input--email"
        placeholder="exemple@gmail.com"
      />
      <p className="registration-form-title">Password</p>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="registration-input registration-input--password"
        placeholder="Password"
      />
      <p className="registration-form-title">Confirm Password</p>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="registration-input registration-input--confirm-password"
        placeholder="Confirm password"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" className="registration-button">Register</button>
    </form>
  );
}
