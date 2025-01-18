import Cookies from 'js-cookie';
import { API_PORT, API_URL } from '../../config/config';

export async function getActions() {
    const token = Cookies.get('token');
    if (!token) {
        return null;
    }
    const response = await fetch(`${API_URL}:${API_PORT}/api/actions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        return null;
    }
    const actions = await response.json();
    if (!actions) {
        return null;
    }
    return actions;
}