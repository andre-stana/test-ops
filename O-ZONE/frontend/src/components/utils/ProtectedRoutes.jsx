import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

function isJwtValid(token) {
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      Cookies.remove('token');
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Invalid token:", error.message);
    return false;
  }
};

export const ProtectedRoutes = () => {
  const [cookies] = useCookies();
  const token = cookies.token;

  const isValid = token && isJwtValid(token);

  return isValid ? <Outlet /> : <Navigate to="/login" replace />;
};
