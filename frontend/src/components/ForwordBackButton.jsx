import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const ForwardBackButton = () => {
    const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-4 flex items-center gap-2 text-text-secondary hover:text-text-primary"
    >
      <FiArrowLeft />
    </button>
  );
};
