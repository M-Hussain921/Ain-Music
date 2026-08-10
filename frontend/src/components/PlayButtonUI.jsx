import { FiPlay, FiPause, FiLoader } from "react-icons/fi";

export const PlayButtonUI = ({ isActive, isLoading, onClick }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
     className={`w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 flex items-center justify-center sm:hover:scale-105 sm:hover:bg-brand-dark  text-white rounded-full hover:scale-105 hover:bg-brand-dark transition-all disabled:opacity-60 ${isActive ? "bg-black/30 sm:bg-transparent" : "bg-brand-primary"}`}
  >
    {isLoading ? (
      <FiLoader className="text-sm sm:text-xl animate-spin" />
    ) : isActive ? (
      <FiPause className="text-lg sm:text-xl" />
    ) : (
      <FiPlay className="text-lg sm:text-2xl ml-[1px] sm:ml-1" />
    )}
  </button>
);