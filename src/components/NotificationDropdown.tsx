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
import { Bell, ExternalLink, X } from "lucide-react";
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
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[420px] p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <DropdownMenuLabel className="text-base font-semibold m-0">
              Notifications
            </DropdownMenuLabel>
            <p className="text-sm text-muted-foreground">
              Stay Updated with Your Latest Notifications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-8 font-semibold"
            >
              All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-8"
            >
              Unread ({unreadCount})
            </Button>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-8 text-primary"
              onClick={onMarkAllRead}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <div className="py-2">
          {notifications.length > 0 && (
            <p className="px-4 py-1 text-sm font-medium text-muted-foreground">Today</p>
          )}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`px-4 py-3 cursor-default hover:bg-gray-50 dark:hover:bg-gray-800 border-b last:border-b-0 group`}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Bell className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex flex-col gap-1 flex-grow">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 pr-6">
                        {notification.message}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(notification.timestamp, {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-red-500 flex-shrink-0 group-hover:opacity-0 transition-opacity" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};