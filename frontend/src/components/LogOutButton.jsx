import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const LogoutButton=()=> {
  const { logout } = useContext(AuthContext);

  return (
    <button
    className="text-text-secondary text-sm sm:text-base flex justify-center font-semibold px-4 sm:px-6 py-1.5 sm:py-2  hover:text-brand-light hover:underline transition-all">
      LogOut 
    </button>
  );
}