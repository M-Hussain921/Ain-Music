import { createContext, useState, useContext, useCallback } from "react";
import { AuthContext } from "./AuthContext";

export const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const requireAuth = useCallback(
    (callback) => {
      if (token) {
        callback();
        return;
      }
      setPendingAction(() => callback);
      setIsOpen(true);
    },
    [token],
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setPendingAction(null);
  }, []);

  const onAuthSuccess = useCallback(() => {
    setIsOpen(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  return (
    <AuthModalContext.Provider
      value={{ isOpen, requireAuth, closeModal, onAuthSuccess }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};