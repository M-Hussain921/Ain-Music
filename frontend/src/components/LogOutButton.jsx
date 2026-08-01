import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const LogoutButton=()=> {
  const { logout } = useContext(AuthContext);

  return (
    <button
    className="border border-brand-primary text-text-secondary text-sm flex justify-center font-semibold px-6 py-2 rounded-2xl hover:bg-brand-light hover:text-white hover:border-none transition-all">
      Logout
    </button>
  );
}