import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { User, Bell } from 'lucide-react';

const Navbar = () => {
  const { setShowLogin } = useContext(AppContext);
  const [showIcons, setShowIcons] = useState(false);

  const handleGetStarted = () => {
    setShowIcons(true);
    setShowLogin(true);
  };

  return (
    <nav id="navbar" className="fixed top-0 left-0 right-0 bg-transparent bg-opacity-50 backdrop-blur-md z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/">
              <span className="text-2xl font-bold text-primary dark:text-gray-200">
                Logo
              </span>
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {showIcons ? (
              <div className="flex items-center gap-4">
                <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
                <User className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
              </div>
            ) : (
              <InteractiveHoverButton onClick={handleGetStarted} className="bg-transparent">
                Get Started
              </InteractiveHoverButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;