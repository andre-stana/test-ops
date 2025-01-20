import Cookies from 'js-cookie';
import { API_PORT, API_URL } from '../../config/config';

export async function sendArea(data) {
    const token = Cookies.get('token');
    if (!token) {
        return null;
    }
    const response = await fetch(`${API_URL}:${API_PORT}/api/areas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        return null;
    }
    const result = await response.json();
    return result;
}