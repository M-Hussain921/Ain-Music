import { useContext } from "react";
import { AuthModalContext } from "../context/AuthModalContext";
import { AuthForm } from "./AuthForm";

export const GlobalAuthModal = () => {
  const { isOpen, closeModal, onAuthSuccess } = useContext(AuthModalContext);
  if (!isOpen) return null;
  return <AuthForm onClose={closeModal} onSuccess={onAuthSuccess} />;
};