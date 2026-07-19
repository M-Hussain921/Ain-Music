import { useState, createContext } from "react";

export const AuthContext = createContext();

const API_BASE = "http://localhost:6000/api/auth";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(()=>localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendOTP = async (phoneNumber) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/send-otp`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (phoneNumber, OTP) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/verify-otp`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, OTP }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("token",data.token);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        error,
        sendOTP,
        verifyOTP,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
