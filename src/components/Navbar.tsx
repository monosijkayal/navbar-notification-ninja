import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { User } from 'lucide-react';
import { NotificationDropdown, Notification } from "./NotificationDropdown";

const Navbar = () => {
  const { setShowLogin } = useContext(AppContext);
  const [showIcons, setShowIcons] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      message: "Welcome to our platform!",
      timestamp: new Date(),
      read: false,
    },
    {
      id: "2",
      message: "Your profile was successfully updated",
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleGetStarted = () => {
    setShowIcons(true);
    setShowLogin(true);
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
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
                <NotificationDropdown
                  notifications={notifications}
                  unreadCount={unreadCount}
                  onMarkAllRead={handleMarkAllRead}
                />
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