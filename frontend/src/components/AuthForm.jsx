import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export const AuthForm = ({ onClose }) => {
  const { sendOTP, verifyOTP, loading, error } = useContext(AuthContext);

  const navigate = useNavigate();
 const handleOnclose = onClose || (() => navigate("/", { replace: true }));

  const [step, setStep] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    const success = await sendOTP(phoneNumber);
    if (success) {
      setStep("otp");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim() || !otp.trim()) return;
    const success = await verifyOTP(phoneNumber, otp);
    if (success) {
      handleOnclose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-[2000] ">
      <div className="bg-surface p-4 sm:p-6 rounded-xl backdrop-blur-xl border-white/20 shadow-2xl shadow-black/20 w-[90%] max-w-96 bg-surface  ">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-3 sm:mb-4">
          {step === "phone" ? "Login" : "Enter OTP"}
        </h2>
        {step === "phone" ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-3">
            <input
              type="tel"
              placeholder="+91XXXXXXXXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-white/10 backdrop-blur-sm text-text-primary px-4 py-2.5 rounded-lg border border-white/20 outline-none focus:border-brand-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-primary text-white py-2.5 rounded-lg font-semibold disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="bg-bg text-text-primary px-4 py-2.5 rounded-lg border border-brand-light/40 outline-none focus:border-brand-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-primary text-white py-2.5 rounded-lg font-semibold disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <button
          onClick={handleOnclose}
          className="text-text-secondary text-sm mt-4 hover:text-text-primary"
        >
          Cancel
        </button>
      </div>
    </div>,
    document.body,
  );
};
