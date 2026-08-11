import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const LogoutButton=()=> {
  const { logOut } = useContext(AuthContext);

  return (
    <button
    onClick={()=>logOut()}
    className="text-text-secondary text-xs xs:text-sm sm:text-base flex justify-center font-semibold px-2 xs:px-4 sm:px-6 py-1.5 sm:py-2 hover:text-brand-light hover:underline transition-all shrink-0 whitespace-nowrap">
      LogOut 
    </button>
  );
}