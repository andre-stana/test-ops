import Cookies from 'js-cookie';
import { API_PORT, API_URL } from '../../config/config';

export async function getReactions() {
    const token = Cookies.get('token');
    if (!token) {
        return null;
    }

    const response = await fetch(`${API_URL}:${API_PORT}/api/reactions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        return null;
    }

    const reactions = await response.json();

    if (!reactions) {
        return null;
    }

    return reactions;
}
