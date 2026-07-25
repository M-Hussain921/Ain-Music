import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createPortal } from "react-dom";

export const AuthForm = ({ onClose }) => {
  const { sendOTP, verifyOTP, loading, error } = useContext(AuthContext);

  const [step, setStep] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    const success = await sendOTP(phoneNumber);
    if (success) {
      setStep("otp");
    }N
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim() || !otp.trim()) return;
    const success = await verifyOTP(phoneNumber, otp);
    if (success) {
      onClose();
    }
  };

  return createPortal(
     <div className="fixed inset-0  bg-black/60 flex items-center justify-center z-2000">
      <div className="bg-surface p-6 rounded-xl w-96 border border-brand-light/40">
        <h2 className="text-xl font-bold text-text-primary mb-4">
          {step === "phone" ? "Login" : "Enter OTP"}
        </h2>
        {step === "phone" ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-3">
            <input
              type="tel"
              placeholder="+91XXXXXXXXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-bg text-text-primary px-4 py-2.5 rounded-lg border border-brand-light/40 outline-none focus:border-brand-primary"
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
          onClick={onClose}
          className="text-text-secondary text-sm mt-4 hover:text-text-primary"
        >
          Cancel
        </button>
      </div>
    </div>,
     document.body
  );
};
