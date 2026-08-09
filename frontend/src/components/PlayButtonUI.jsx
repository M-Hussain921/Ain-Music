import { FiPlayCircle, FiPauseCircle, FiLoader } from "react-icons/fi";

export const PlayButtonUI = ({ isActive, isLoading, onClick }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center  text-brand-primary rounded-full hover:scale-105 hover:text-brand-dark sm:hover:scale-105 sm:hover:text-brand-dark transition-all  disabled:opacity-60 "
  >
    {isLoading ? (
      <FiLoader className="text-sm sm:text-xl animate-spin" />
    ) : isActive ? (
      <FiPauseCircle className="text-lg sm:text-xl" />
    ) : (
      <FiPlayCircle className="text-lg sm:text-2xl ml-[1px] sm:ml-1" />
    )}
  </button>
);