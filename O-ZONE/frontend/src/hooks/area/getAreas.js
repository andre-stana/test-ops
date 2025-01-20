import Cookies from 'js-cookie';
import { API_PORT, API_URL } from '../../config/config';

export async function getAreas() {
    const token = Cookies.get('token');
    if (!token) {
        return null;
    }
    const response = await fetch(`${API_URL}:${API_PORT}/api/areas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        return null;
    }
    const areas = await response.json();
    if (!areas) {
        return null;
    }
    return areas;
}
