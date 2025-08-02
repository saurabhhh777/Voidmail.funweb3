import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Crown } from "lucide-react";
import WalletConnect from "./WalletConnect";

const Navbar = () => {
  const navigate = useNavigate();

  const handlePremiumClick = () => {
    console.log("Premium button clicked");
    navigate("/premium");
  };

  return (
    <nav className="backdrop-blur-lg bg-[#151517] sticky top-0 z-50 flex justify-between items-center px-8 py-4 border-b border-[#ffffff08] rounded-2xl ml-2 mr-2">
      <Link to="/">
        <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
          VOIDMAIL
        </div>
      </Link>
      
      <div className="flex items-center gap-6">
        <div className="space-x-8 text-sm font-medium hidden md:flex uppercase tracking-wider">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
            { name: "Privacy Policy", path: "/privacy" }
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-[#10B981] transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            Dashboard
          </Link>
          <button
            onClick={handlePremiumClick}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            <Crown className="h-4 w-4" />
            Premium
          </button>
          <WalletConnect />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;