import Cookies from 'js-cookie';
import { API_PORT, API_URL } from '../../config/config';

export async function getConnectedServices() {
    const token = Cookies.get('token');
    if (!token) {
        return null;
    }
    const response = await fetch(`${API_URL}:${API_PORT}/api/services/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        return null;
    }
    const services = await response.json();
    if (!services) {
        return null;
    }
    return services;
}