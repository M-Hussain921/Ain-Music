import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const ProtectedRoutes=({children})=>{
const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const decoded=jwtDecode(token);

  return children;
}