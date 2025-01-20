import { useState } from "react";
import { API_PORT, API_URL } from "../../config/config";

export function useRegister() {
  const [error, setError] = useState(null);

  const register = async (username, email, password) => {
    try {
      const response = await fetch(`${API_URL}:${API_PORT}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: username,
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
        throw new Error('Failed to register');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return register;
};
