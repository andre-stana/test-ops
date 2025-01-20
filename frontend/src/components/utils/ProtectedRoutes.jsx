import { Outlet, Navigate } from "react-router-dom"
import { useCookies } from "react-cookie"

export const ProtectedRoutes = () => {
  const [cookies] = useCookies();
  const token = cookies.token;
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
