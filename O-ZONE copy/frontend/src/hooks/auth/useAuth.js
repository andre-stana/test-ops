import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { API_URL, API_PORT } from "../../config/config";

export function useAuth() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}:${API_PORT}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();

      if (!data) {
        throw new Error('Failed to login');
      }

      const user = data.user;
      const token = data.token;

      setCookie('token', token);
    } catch (error) {
      setError(error.message);
    }
  }

  const logout = () => {
    removeCookie('token');
    navigate("/login");
  };

  return [login, logout, error];
};

export default useAuth;
