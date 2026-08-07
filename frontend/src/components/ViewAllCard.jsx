import { Link } from "react-router-dom";

export const ViewAllCard = ({ to }) => {
  return (
    <Link to={to} className="flex flex-col items-center group cursor-pointer">
      <div className="w-full flex items-center justify-center group-hover:underline transition-colors gap-2">
        <p className="px-2 py-1 text-xs sm:text-sm font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">
          View All
        </p>
      </div>
    </Link>
  );
};
