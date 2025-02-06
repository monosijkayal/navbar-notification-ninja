import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationDropdownProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAllRead: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  unreadCount,
  onMarkAllRead,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <DropdownMenuLabel className="text-base font-semibold m-0">
            Notifications
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-8 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={onMarkAllRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`px-4 py-3 cursor-default hover:bg-gray-50 dark:hover:bg-gray-800 border-b last:border-b-0 ${
                  !notification.read ? "bg-blue-50/50 dark:bg-blue-900/20" : ""
                }`}
              >
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {notification.message}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(notification.timestamp, {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};