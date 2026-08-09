import { FiPlay, FiPause, FiLoader } from "react-icons/fi";

export const PlayButtonUI = ({ isActive, isLoading, onClick }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-brand-primary text-white rounded-full hover:scale-105 hover:bg-brand-dark sm:hover:scale-105 sm:hover:bg-brand-dark transition-all shadow-sm sm:shadow-md shadow-brand-primary/20 sm:shadow-brand-primary/30 disabled:opacity-60"
  >
    {isLoading ? (
      <FiLoader className="text-base sm:text-xl animate-spin" />
    ) : isActive ? (
      <FiPause className="text-xl" />
    ) : (
      <FiPlay className="text-xl ml-[1px] sm:ml-1" />
    )}
  </button>
);