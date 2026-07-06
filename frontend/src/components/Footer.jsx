import brandLogo from "../assets/brand-logo2.png";
export const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between pt-6">
      <div className="text-text-primary py-1 px-1 flex flex-col md:flex-row  items-center gap-4">
        <div>
          <img src={brandLogo} alt="Brand Logo" className="w-32 h-auto" />
        </div>
        <div>
          <p className="pt-5">&copy; 2026 Ain Music. All rights reserved.</p>
        </div>
      </div>

      <div className="ml-auto px-1">
        <p className="pt-5">
          Designed and developed by{" "}
          <a
            href="https://mhansari.shop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-darkest font-bold hover:underline">
            Mohammed Hussain
          </a>
        </p>
      </div>
    </footer>
  );
};
