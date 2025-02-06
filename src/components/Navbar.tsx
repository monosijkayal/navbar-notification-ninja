import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { User, LayoutDashboard, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { NotificationDropdown, Notification } from "./NotificationDropdown";

const Navbar = () => {
  const { setShowLogin, user, logout } = useContext(AppContext);
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
          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <NotificationDropdown
                  notifications={notifications}
                  unreadCount={unreadCount}
                  onMarkAllRead={handleMarkAllRead}
                />
                
                {/* User Profile Image */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="relative h-9 w-9 rounded-full cursor-pointer">
                      <img
                        className="w-9 border rounded-full"
                        src={user.image}
                        alt=""
                      />
                    </div>
                  </DropdownMenuTrigger>

                  {/* Dropdown Menu */}
                  <DropdownMenuContent className="w-60 p-4" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ModeToggle />
                        Appearance
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <InteractiveHoverButton onClick={() => setShowLogin(true)} className="bg-transparent">
                  Get Started
                </InteractiveHoverButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;