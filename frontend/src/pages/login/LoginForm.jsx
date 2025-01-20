import React, { useState } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import "./css/login.css";

export function LoginForm() {
    const [login, logout, authError] = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        const email = formData.email;
        const password = formData.password;

        await login(email, password);

        if (authError) {
            setError("Invalid email or password.");
        } else {
            navigate("/");
        }
    };

    return (
        <form className="login-form_container" onSubmit={handleSubmit}>
            <p className="login-form-title">Email:</p>
            <input
                className="login-input login-input--email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email"
            />
            <p className="login-form-title">Password:</p>
            <input
                className="login-input login-input--password"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="login-button">Submit</button>
        </form>
    );
}
