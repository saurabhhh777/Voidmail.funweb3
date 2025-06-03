import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="backdrop-blur-lg bg-[#151517] sticky top-0 z-50 flex justify-between items-center px-8 py-4 border-b border-[#ffffff08] rounded-2xl ml-2 mr-2">
      <div className="text-2xl font-bold tracking-tight bg-gradient-to-r  bg-[#10B981] bg-clip-text text-transparent">
        VOIDMAIL
      </div>
      <div className="space-x-8 text-sm font-medium hidden md:flex uppercase tracking-wider">
        {["Home", "About", "Contact", "PrivacyPolicy"].map((item) => (
          <Link
            key={item}
            to={`/${item === "Home" ? "/" : item.toLowerCase()}`}
            className="hover:text-[#EF4444] transition-all duration-300"
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;