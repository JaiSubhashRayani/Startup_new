import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-primary/10 text-primary": variant === "default",
          "bg-secondary text-secondary-foreground": variant === "secondary",
          "bg-success/10 text-success": variant === "success",
          "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400": variant === "warning",
          "bg-destructive/10 text-destructive": variant === "destructive",
        },
        className
      )}
      {...props}
    />
  )
);

Badge.displayName = "Badge";
export { Badge };
