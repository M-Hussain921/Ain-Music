import brandLogo from "../assets/brand-logo2.png";
export const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between pt-6 pb-2 px-4 gap-2 md:gap-1">
      <div className="text-text-primary flex flex-row  items-center gap-1">
        <div>
          <img src={brandLogo} alt="Brand Logo" className="md:w-32 w-20 h-auto" />
        </div>
        <div>
          <p className="pt-5 text-[0.625rem] sm:text-sm">&copy; 2026 Ain Music. All rights reserved.</p>
        </div>
      </div>

     <div className="md:ml-auto text-[0.625rem] sm:text-sm px-1 mt-2 md:mt-0">
        <p>
          Designed & developed by{" "}
          <a
            href="https://mhansari.shop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-darkest font-bold  hover:underline">
            Mohammed Hussain
          </a>
        </p>
      </div>
    </footer>
  );
};
