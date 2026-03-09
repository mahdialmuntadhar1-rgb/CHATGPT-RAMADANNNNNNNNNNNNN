import React from "react";
import { cn } from "./Button";

export const Card = ({ className, hover = true, children, ...props }: any) => (
  <div
    className={cn(
      "bg-white rounded-3xl border border-gray-100 shadow-sm",
      hover && "hover:border-black/10 transition-all duration-300",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-6 py-4 border-b border-gray-50", className)} {...props} />
);

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6", className)} {...props} />
);
