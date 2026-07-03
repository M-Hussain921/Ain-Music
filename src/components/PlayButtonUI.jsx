import { FiPlay, FiPause, FiLoader } from "react-icons/fi";

export const PlayButtonUI = ({ isActive, isLoading, onClick }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className="w-10 h-10 flex items-center justify-center bg-brand-primary text-white rounded-full hover:scale-105 hover:bg-brand-dark transition-all shadow-md shadow-brand-primary/30 disabled:opacity-60"
  >
    {isLoading ? (
      <FiLoader className="text-xl animate-spin" />
    ) : isActive ? (
      <FiPause className="text-xl" />
    ) : (
      <FiPlay className="text-xl ml-1" />
    )}
  </button>
);