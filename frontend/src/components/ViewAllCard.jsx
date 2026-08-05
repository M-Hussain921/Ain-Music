import { Link } from "react-router-dom";

export const ViewAllCard = ({ to }) => {
  return (
    <Link to={to} className="flex flex-col items-center group cursor-pointer">
      <div className="w-full  rounded-xl border-2 border-dashed border-brand-light/40 flex items-center justify-center group-hover:border-brand-primary transition-colors gap-2">
        <p className="px-2 py-1 text-sm font-semibold text-zinc-400 group-hover:text-brand-primary transition-colors">
          View All
        </p>
      </div>
    </Link>
  );
};
