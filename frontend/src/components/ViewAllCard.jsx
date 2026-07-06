import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

export const ViewAllCard = ({ to }) => {
  return (
    <Link to={to} className="flex flex-col items-center group">
      <div className="w-full aspect-square rounded-xl border-2 border-dashed border-brand-light/40 flex items-center justify-center group-hover:border-brand-primary transition-colors gap-2">
        <FiPlus className="text-3xl text-text-secondary group-hover:text-brand-primary" />
        <p className="mt-3 text-sm font-semibold text-zinc-400 group-hover:text-white transition-colors">
          View All
        </p>
      </div>
    </Link>
  );
};
