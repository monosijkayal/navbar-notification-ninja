import * as React from "react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const InteractiveHoverButton: React.FC<InteractiveHoverButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all rounded-md hover:bg-white hover:text-black group",
        className
      )}
      {...props}
    >
      <span className="w-full h-full bg-gradient-to-br from-primary to-secondary absolute"></span>
      <span className="relative">{children}</span>
    </button>
  );
};