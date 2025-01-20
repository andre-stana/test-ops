import Cookies from 'js-cookie';
import { API_PORT, API_URL } from '../../config/config';

export async function getUser() {
  const token = Cookies.get('token');
  if (!token) {
    return null;
  }

  const response = await fetch(`${API_URL}:${API_PORT}/api/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return null;
  }

  const user = await response.json();

  if (!user) {
    return null;
  }

  return user;
}
